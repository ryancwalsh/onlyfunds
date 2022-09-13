import {Component} from "react"
import {BlockContext} from "./BlockHandler";

class Explorer extends Component {
    static contextType = BlockContext

    constructor(props) {
        super(props);
        this.index = 0
    }

    createProjects = () => {
        const sub = this.context.projects.slice(0, 3)
        return sub.map((project) => {

            return (
                <div className="flex flex-1 overflow-hidden rounded-lg bg-white shadow max-w-lg">
                    <div className="px-4 py-5 sm:p-6">
                        <p className="text-lg font-medium">{project.title}</p>
                        <p className="text-sm">{project.subtitle}</p>
                        <div className="border-b-2 h-2 w-full"/>
                    </div>
                </div>
            )
        })
    }

    render() {
        return (
            <div className="max-w-4xl flex-1 flex flex-col gap-4">
                <div className="w-full h-12 bg-white shadow rounded-lg">
                    {/*Sort and Shit*/}
                </div>
                <div className="w-full h-full flex justify-between flex-wrap gap-4">
                    {this.createProjects()}
                </div>
            </div>
        )
    }
}

export default Explorer