import {createContext, Component} from "react";
import {ethers} from 'ethers'
import {initiateFirestore} from "./FireStore"
import { collection, getDocs, addDoc} from "firebase/firestore"
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {type} from "@testing-library/user-event/dist/type";
import uuid from 'react-uuid';

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

        // this.contract = new ethers.Contract(daiAddress, daiAbi, this.provider);
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
            projects.push(projectDoc.data())
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

    createProject = async (data) => {
        await addDoc(collection(this.db, "projects"), {
            backers: 0,
            createdAt: Date.now(),
            description: data.description,
            startDate: data.startDate,
            endDate: data.endDate,
            hardCap: data.hardCap,
            softCap: data.softCap,
            minimumContribution: data.minimumContribution,
            maximumContribution: data.maximumContribution,
            subtitle: data.subtitle,
            title: data.title,
            id: uuid(),
            photoUrl: data.photoUrl
        });
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
                personalProjects: this.state.personalProjects,
                createProject: this.createProject,
                uploadPhoto: this.uploadPhoto
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