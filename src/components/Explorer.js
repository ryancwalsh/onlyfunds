import {Component, Fragment, useState} from "react"
import {BlockContext} from "./BlockHandler";
import Example from "../template/SlideOver";
import {Dialog, Menu, Transition} from "@headlessui/react";
import {XMarkIcon} from "@heroicons/react/24/outline";
import {EllipsisVerticalIcon} from "@heroicons/react/20/solid";
import Chart from "./Chart";
import { FaRegThumbsUp, FaRegThumbsDown } from 'react-icons/fa';

class Explorer extends Component {
    static contextType = BlockContext

    constructor(props) {
        super(props);
        this.index = 0

        this.state = {
            selectedProjectIndex: null,
            selectedAmount: 0
        }
    }

    createProjects = () => {
        const sub = this.context.projects.slice(0, 3)

        return sub.map((project, index) => {

            return (
                <div className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                    <a onClick={() => { this.setState({selectedProjectIndex: index}) }}>
                        <img align="middle" className="rounded-t-lg" src={project.photoUrl} alt=""/>
                    </a>
                    <div className="px-4 py-5 sm:p-6">
                        <a onClick={() => { this.setState({selectedProjectIndex: index}) }}>
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{project.title}</h5>
                        </a>
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{project.description}</p>
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Pledged <span
                            // className="text-3xl font-bold text-gray-900 dark:text-white">{project.pledged}</span> out of {project.softCap}<img src="icon_nm.svg" width="10" height="10" alt="Near logo"/></p>
                            className="text-3xl font-bold text-gray-900 dark:text-white">{project.pledged}</span> out of {project.softCap} $NEAR</p>
                        <button onClick={() => { this.setState({selectedProjectIndex: index}) }}
                           className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-indigo-700 rounded-lg hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800">
                            Donate
                            <svg aria-hidden="true" className="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd"
                                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                      clipRule="evenodd"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            )
        })
    }

    renderSlideOver = () => {
        if (this.state.selectedProjectIndex !== null) {
            let currentProject = this.context.projects[this.state.selectedProjectIndex]

            console.log('DATES')
            console.log(currentProject.startDate)
            let startDate = new Date(1970, 1, 1)
            startDate.setSeconds(currentProject.startDate.seconds)
            console.log(startDate)
            let endDate = new Date(1970, 1, 1)
            endDate.setSeconds(currentProject.endDate.seconds)
            console.log(endDate)

            return (
                <Transition.Root show={true} as={Fragment}>
                    <Dialog as="div" className="relative z-10" onClose={() => {this.setState({selectedProjectIndex: null})}}>
                        <div className="fixed inset-0" />

                        <div className="fixed inset-0 overflow-hidden">
                            <div className="absolute inset-0 overflow-hidden">
                                <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
                                    <Transition.Child
                                        as={Fragment}
                                        enter="transform transition ease-in-out duration-500 sm:duration-700"
                                        enterFrom="translate-x-full"
                                        enterTo="translate-x-0"
                                        leave="transform transition ease-in-out duration-500 sm:duration-700"
                                        leaveFrom="translate-x-0"
                                        leaveTo="translate-x-full"
                                    >
                                        <Dialog.Panel className="pointer-events-auto w-screen max-w-2xl">
                                            <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                                                <div className="px-4 py-6 sm:px-6">
                                                    <div className="flex items-start justify-between">
                                                        <Dialog.Title className="text-lg font-medium text-gray-900">Project</Dialog.Title>
                                                        <div className="ml-3 flex h-7 items-center">
                                                            <button
                                                                type="button"
                                                                className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:ring-2 focus:ring-indigo-500"
                                                                onClick={() => this.setState({selectedProjectIndex: null})}
                                                            >
                                                                <span className="sr-only">Close panel</span>
                                                                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="divide-y divide-gray-200">
                                                    <div className="pb-6">
                                                        <div className="h-24 bg-indigo-700 sm:h-20 lg:h-28" />
                                                        <div className="lg:-mt-15 -mt-12 flow-root px-4 sm:-mt-8 sm:flex sm:items-end sm:px-6">
                                                            <div>
                                                                <div className="-m-1 flex">
                                                                    <div className="inline-flex overflow-hidden rounded-lg border-4 border-white">
                                                                        <img
                                                                            className="h-24 w-24 flex-shrink-0 sm:h-40 sm:w-40 lg:h-48 lg:w-48"
                                                                            src={currentProject.photoUrl}
                                                                            alt=""
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="mt-6 sm:ml-6 sm:flex-1">
                                                                <div>
                                                                    <div className="flex items-center">
                                                                        <h3 className="text-xl font-bold text-gray-900 sm:text-2xl">{currentProject.title}</h3>
                                                                    </div>
                                                                    <p className="text-sm text-gray-500">{currentProject.twitter}</p>
                                                                </div>
                                                                <div className="mt-5 flex flex-wrap space-y-3 sm:space-y-0 sm:space-x-3">
                                                                    <button
                                                                        type="button"
                                                                        onClick={async () => {
                                                                            await this.context.donate(currentProject.id, this.state.selectedAmount)
                                                                        }}
                                                                        className="inline-flex w-full flex-shrink-0 items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:flex-1"
                                                                    >
                                                                        Donate
                                                                    </button>
                                                                    <button
                                                                        type="button"
                                                                        style={{display: currentProject.invested ? 'block' : 'none'}}
                                                                        className="inline-flex w-full flex-1 items-center justify-center rounded-md border border-green-300 bg-green px-4 py-2 text-sm font-medium text-green-700 shadow-sm hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                                                                    >
                                                                        <FaRegThumbsUp color="green" />
                                                                    </button>
                                                                    <button
                                                                        type="button"
                                                                        style={{display: currentProject.invested ? 'block' : 'none'}}
                                                                        className="inline-flex w-full flex-1 items-center justify-center rounded-md border border-red-300 bg-red px-4 py-2 text-sm font-medium text-red-700 shadow-sm hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                                                                    >
                                                                        <FaRegThumbsDown color="red" />
                                                                    </button>

                                                                    <input type="text"
                                                                           onChange={(e) => this.setState({selectedAmount: parseFloat(e.target.value)})}>
                                                                    </input>

                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="px-4 py-5 sm:px-0 sm:py-0">
                                                        <dl className="space-y-8 sm:space-y-0 sm:divide-y sm:divide-gray-200">
                                                            <div className="sm:flex sm:px-6 sm:py-5">
                                                                <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0 lg:w-48">About the project</dt>
                                                                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 sm:ml-6">
                                                                    <p>{currentProject.description}</p>
                                                                </dd>
                                                            </div>
                                                            <div className="sm:flex sm:px-6 sm:py-5">
                                                                <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0 lg:w-48">
                                                                    Website
                                                                </dt>
                                                                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 sm:ml-6">
                                                                    <a href={currentProject.website}>{currentProject.website}</a>
                                                                </dd>
                                                            </div>
                                                            <div className="sm:flex sm:px-6 sm:py-5">
                                                                <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0 lg:w-48">
                                                                    Start date
                                                                </dt>
                                                                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 sm:ml-6">
                                                                    <time dateTime={currentProject.startDate}>{startDate.toDateString()}</time>
                                                                </dd>
                                                            </div>
                                                            <div className="sm:flex sm:px-6 sm:py-5">
                                                                <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0 lg:w-48">
                                                                    End date
                                                                </dt>
                                                                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 sm:ml-6">
                                                                    <time dateTime={currentProject.endDate}>{endDate.toDateString()}</time>
                                                                </dd>
                                                            </div>
                                                            <div className="sm:flex sm:px-6 sm:py-5">
                                                                <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0 lg:w-48">
                                                                    Minimum contribution
                                                                </dt>
                                                                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 sm:ml-6">
                                                                    <p>{currentProject.minimumContribution}</p>
                                                                </dd>
                                                            </div>
                                                            <div className="sm:flex sm:px-6 sm:py-5">
                                                                <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0 lg:w-48">
                                                                    Maximum contribution
                                                                </dt>
                                                                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 sm:ml-6">
                                                                    <p>{currentProject.maximumContribution}</p>
                                                                </dd>
                                                            </div>
                                                            <div className="sm:flex sm:px-6 sm:py-5">
                                                                <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0 lg:w-48">
                                                                    Soft cap
                                                                </dt>
                                                                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 sm:ml-6">
                                                                    <p>{currentProject.softCap}</p>
                                                                </dd>
                                                            </div>
                                                            <div className="sm:flex sm:px-6 sm:py-5">
                                                                <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0 lg:w-48">
                                                                    Hard cap
                                                                </dt>
                                                                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 sm:ml-6">
                                                                    <p>{currentProject.hardCap}</p>
                                                                </dd>
                                                            </div>
                                                            <div className="sm:flex sm:px-6 sm:py-5">
                                                                <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0 lg:w-48">
                                                                    Pledged
                                                                </dt>
                                                                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 sm:ml-6">
                                                                    <p>{currentProject.pledged}</p>
                                                                </dd>
                                                                <Chart project={currentProject} />
                                                            </div>
                                                        </dl>
                                                    </div>
                                                </div>
                                            </div>
                                        </Dialog.Panel>
                                    </Transition.Child>
                                </div>
                            </div>
                        </div>
                    </Dialog>
                </Transition.Root>
            )
        }
    }

    render() {
        return (
            <div className="max-w-4xl flex-1 flex flex-col gap-4">
                {this.renderSlideOver()}
                <div className="w-full h-full flex justify-between flex-wrap gap-4">
                    {this.createProjects()}
                </div>
            </div>
        )
    }
}

export default Explorer