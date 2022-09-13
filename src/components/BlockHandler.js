import {createContext, Component} from "react";
import {ethers} from 'ethers'
import {initiateFirestore} from "./FireStore"
import { collection, getDocs, addDoc} from "firebase/firestore"
import {type} from "@testing-library/user-event/dist/type";

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
        const projectRef = await addDoc(collection(this.db, 'projects'), data)
    }

    render() {
        return (
            <BlockContext.Provider  value={{
                address: this.state.address,
                connect: this.connect,
                projects: this.state.projects,
                personalProjects: this.state.personalProjects
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