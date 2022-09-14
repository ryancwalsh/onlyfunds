import './App.css'
import {Fragment, useState} from "react"
import Header from "./components/Header"
import Explorer from "./components/Explorer"
import Creator from "./components/Creator"
import PersonalExplorer from "./PersonalExplorer";
import ChainController from './components/ChainController'
import { Toaster } from 'react-hot-toast';


function App() {
    const [currentTab, setCurrentTab] = useState("explorer")

    const switchTab = (page) => {
        setCurrentTab(page)
    }

    const displayCurrentTab = () => {
        if (currentTab === "explorer") {
            return <Explorer/>
        } else if (currentTab === "creator") {
            return <Creator/>
        } else if (currentTab === "manager") {
            return <PersonalExplorer/>
        } else {
            return <Explorer/>
        }
    }

    return (
        <Fragment>
            <Toaster/>
            <Header switchTab={switchTab} currentTab={currentTab} />
            <div className="flex justify-center items-center p-4 flex-1">
                {displayCurrentTab()}
            </div>
        </Fragment>
    );
}

export default App;
