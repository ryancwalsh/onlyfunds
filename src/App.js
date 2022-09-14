import './App.css'
import {Fragment, useState} from "react"
import Header from "./components/Header"
import Explorer from "./components/Explorer"
import Creator from "./components/Creator"
import PersonalExplorer from "./PersonalExplorer";
import ChainController from './components/ChainController'


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
        <ChainController/>
    );
}

export default App;
