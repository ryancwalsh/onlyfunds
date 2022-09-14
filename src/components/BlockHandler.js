import {createContext, Component} from "react";
import {ethers} from 'ethers'
import {initiateFirestore} from "./FireStore"
import { collection, getDocs, addDoc} from "firebase/firestore"
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import toast from 'react-hot-toast'
import {factoryABI, projectABI} from "../data/ABI";

const BlockContext = createContext(null)

class BlockProvider extends Component {
    constructor(props) {
        super(props)

        this.db = initiateFirestore()

        this.state = {
            address: null,
            projects: [1,2,3],
            personalProjects: []
        }

        const {ethereum} = window
        this.ethereum = ethereum

        if (this.ethereum) {
            this.provider = new ethers.providers.Web3Provider(ethereum)
        } else {
            this.provider = new ethers.providers.JsonRpcProvider("https://testnet.aurora.dev/")
        }

        this.factoryAddress = "0x5044873f6dD465E84380d0f581D7Cd003eE12b54"
        this.factory = new ethers.Contract(this.factoryAddress, factoryABI, this.provider);
    }

    async activeMetaMaskWallet() {
        const accounts = await this.provider.listAccounts()
        return (accounts.length > 0) ? accounts[0] : null
    }

    async componentDidMount() {
        const address = await this.activeMetaMaskWallet()
        if (address !== null) {
            this.setState({address: address})
        }

        this.ethereum.on('accountsChanged', async (wallets) => {
            this.setState({address: wallets[0]})
        })

        const projectsRef = collection(this.db, "projects");
        const response = await getDocs(projectsRef)

        const projects = []
        response.forEach((projectDoc) => {
            const projectData = projectDoc.data()
            projectData.contract = new ethers.Contract(projectData.id, projectABI, this.provider)
            projects.push(projectData)
        })

        this.setState({projects: projects})
    }

    connect = async () => {
        if (this.state.address === null) {
            await this.provider.send("eth_requestAccounts", [])
            const signer = this.provider.getSigner()
            const address = await signer.getAddress()

            this.setState({
                address: address
            })
        }
    }

    toBigNumber = (amount) => {
        return ethers.BigNumber.from(amount).mul(ethers.BigNumber.from(10).pow(18))
    }

    createProject = async (data) => {
        const startDate = new Date(data.startDate)
        const endDate = new Date(data.endDate)

        console.log(data)

        const toastID = toast.loading("Waiting for Confirmation...")
        const url = await this.uploadPhoto(data.photo)
        const signer = this.factory.connect(this.provider.getSigner())

        signer.createProject(
            data.title, // name
            data.title + "_DAO", // symbol
            this.state.address,
            this.toBigNumber(data.softCap), // softcap with decimals
            this.toBigNumber(data.hardCap), // hardcap with decimals
            Math.round(startDate.getTime() / 1000),
            Math.round(endDate.getTime() / 1000)
        ).then(async (response) => {
            await response.wait()

            const contracts = await signer.getProject(this.state.address)
            const mostRecentAddress = contracts[contracts.length - 1]

            await addDoc(collection(this.db, "projects"), {
                backers: 0,
                createdAt: Date.now(),
                description: data.description,
                startDate: data.startDate,
                endDate: data.endDate,
                hardCap: parseInt(data.hardCap),
                softCap: parseInt(data.softCap),
                minimumContribution: parseInt(data.minimumContribution),
                maximumContribution: parseInt(data.maximumContribution),
                subtitle: data.subtitle,
                title: data.title,
                id: mostRecentAddress,
                photoUrl: url,
                owner: this.state.address,
                pledged: 0
            });

            toast.dismiss(toastID)
            toast.success("Project created!")
        }).catch((error) => {
            toast.dismiss(toastID)
            toast.error("Something went wrong :/")
            console.log(error)
        })
    }

    donate = async (projectID, amount) => {
        const toastID = toast.loading("Waiting for Confirmation...")

        let project = null;
        for (const iterProject of this.state.projects) {
            if (iterProject.id === projectID) {
                project = iterProject
            }
        }

        if (project === null) {
            toast.dismiss(toastID)
            toast.error("Something went wrong")
            return
        }

        const signer = project.contract.connect(this.provider.getSigner())
        signer.donate({value: this.toBigNumber(amount)}).then(async (response) => {
            await response.wait()
            toast.dismiss(toastID)
            toast.success("Successfully funded!")

        }).catch((error) => {
            toast.dismiss(toastID)
            toast.error("Something went wrong :/")
            console.log(error)
        })


    }

    uploadPhoto = async (file) => {
        const storage = getStorage();
        const metadata = {
            contentType: 'image/jpeg'
        };

        const storageRef = ref(storage, 'images/' + file.name);
        const uploadTask = uploadBytesResumable(storageRef, file, metadata);
        return new Promise(
            (resolve) => {
                uploadTask.on('state_changed',
                    (snapshot) => {
                        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                        switch (snapshot.state) {
                            case 'paused':
                                console.log('Upload is paused');
                                break;
                            case 'running':
                                console.log('Upload is running');
                                break;
                        }
                    },
                    (error) => {
                        // A full list of error codes is available at
                        // https://firebase.google.com/docs/storage/web/handle-errors
                        switch (error.code) {
                            case 'storage/unauthorized':
                                // User doesn't have permission to access the object
                                break;
                            case 'storage/canceled':
                                // User canceled the upload
                                break;

                            // ...

                            case 'storage/unknown':
                                // Unknown error occurred, inspect error.serverResponse
                                break;
                        }
                    },
                    () => {
                        // Upload completed successfully, now we can get the download URL
                        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                            console.log('File available at', downloadURL);
                            resolve(downloadURL);
                        });
                    }
                );
            }
        )
    }

    render() {
        return (
            <BlockContext.Provider  value={{
                address: this.state.address,
                connect: this.connect,
                projects: this.state.projects,
                personalProjects: this.state.projects,
                createProject: this.createProject,
                donate: this.donate
            }}>
                {this.props.children}
            </BlockContext.Provider>
        )
    }
}

export {
    BlockContext,
    BlockProvider
}