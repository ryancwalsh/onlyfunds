import {Component} from "react"
import {BlockContext} from "./BlockHandler";
import Chart from "./Chart";

class Explorer extends Component {
    static contextType = BlockContext

    constructor(props) {
        super(props);
        this.index = 0

        this.state = {
            currentModal: null
        }
    }

    createProjects = () => {
        const sub = this.context.projects;
        return sub.map((project, index) => {

            return (
                /*<div className="flex flex-1 overflow-hidden rounded-lg bg-white shadow max-w-lg">
                    <div className="px-4 py-5 sm:p-6">
                        <p className="text-lg font-medium">{project.title}</p>
                        <p className="text-sm">{project.subtitle}</p>
                        <div className="border-b-2 h-2 w-full"/>
                    </div>
                </div>*/
                <div className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                    <a href="#">
                        <img align="middle" className="rounded-t-lg" src={project.photoUrl} alt=""/>
                    </a>
                    <div className="px-4 py-5 sm:p-6">
                        <a href="#">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{project.title}</h5>
                        </a>
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{project.description}</p>
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Pledged <span
                            className="text-3xl font-bold text-gray-900 dark:text-white">${project.pledged}</span> out of {project.softCap}</p>
                        <button onClick={() => { this.setState({currentModal: index}) }}
                           className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Contribute
                            <svg aria-hidden="true" className="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd"
                                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                      clip-rule="evenodd"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            )
        })
    }

    renderModal = () => {
        if (this.state.currentModal !== null) {
            return (
                <div id="small-modal" tabIndex="-1" data-modal-placement="center-center" className="overflow-y-auto overflow-x-hidden fixed z-50 w-full md:inset-0 h-modal md:h-full">
                    <div className="relative p-4 w-full max-w-md h-full md:h-auto">
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            <div className="flex justify-between items-center p-5 rounded-t border-b dark:border-gray-600">
                                <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                                    Small modal
                                </h3>
                                <button type="button"
                                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                        data-modal-toggle="small-modal">
                                    <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd"
                                              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                              clip-rule="evenodd"></path>
                                    </svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>
                            <div className="p-6 space-y-6">
                                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                    With less than a month to go before the European Union enacts new consumer privacy laws
                                    for its citizens, companies around the world are updating their terms of service
                                    agreements to comply.
                                </p>
                                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                    The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on
                                    May 25 and is meant to ensure a common set of data rights in the European Union. It
                                    requires organizations to notify users as soon as possible of high-risk data breaches
                                    that could personally affect them.
                                </p>
                            </div>
                            <div
                                className="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
                                <button data-modal-toggle="small-modal" type="button"
                                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">I
                                    accept
                                </button>
                                <button data-modal-toggle="small-modal" type="button"
                                        className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Decline
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }

    render() {
        return (
            <div className="max-w-4xl flex-1 flex flex-col gap-4">
                {this.renderModal()}
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