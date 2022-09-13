import {Component} from "react"
import {BlockContext} from "./BlockHandler"
import toast, { Toaster } from 'react-hot-toast';

class Creator extends Component {
    static contextType = BlockContext

    constructor(props) {
        super(props);

        this.state = {
            title: "",
            subtitle: "",
            description: "",
            startDate: null,
            endDate: null,
            softCap: null,
            hardCap: null,
            minimumContribution: null,
            maximumContribution: null,
            photo: null,
            photoUrl: null
        }
    }

    parseInput = async event => {
        event.preventDefault()
        let url = null
        if (this.state.photo !== null) {
            url = await this.context.uploadPhoto(this.state.photo)
        }
        this.setState({photoUrl: url}, async() => {
            await this.context.createProject(this.state)
        })
        window.location.reload();
        toast.success('Successfully created!');
    }

    render() {
        return (
            <form onSubmit={this.parseInput}>
                <div>
                    <div>
                        <div>
                            <h3 className="text-lg font-medium leading-6 text-gray-900">Project information</h3>
                        </div>

                        <div className="mt-6">

                            {/* Title */}
                            <div className="">
                                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                                    Title
                                </label>
                                <div className="mt-1 flex rounded-md shadow-sm">
                                    <input
                                        type="text"
                                        name="title"
                                        id="title"
                                        autoComplete="title"
                                        onChange={(e) => {
                                            this.setState({title: e.target.value})
                                        }}
                                        className="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>
                            </div>

                            {/* Description */}
                            <div className="sm:col-span-6">
                                <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                                    Description
                                </label>
                                <div className="mt-1">
                                <textarea
                                    id="about"
                                    name="about"
                                    rows={7}
                                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    defaultValue={''}
                                    onChange={(e) => {
                                        this.setState({description: e.target.value})
                                    }}
                                />
                                </div>
                                <p className="mt-2 text-sm text-gray-500">Write a few sentences about the project.</p>
                            </div>
                        </div>
                    </div>

                    {/* Project photo */}
                    <div className="mt-6">
                        <label className="text-sm font-medium text-gray-900 dark:text-gray-300"
                               htmlFor="file_input">Project photo</label>
                        <input
                            className="mt-1 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                            id="file_input" type="file"
                            onChange={(e) => {
                                this.setState({photo: e.target.files[0]})
                            }}
                        />
                    </div>

                    <div className="pt-8">
                        <h3 className="text-lg font-medium leading-6 text-gray-900">Contribution requirements</h3>
                        <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">

                            {/* Soft cap */}
                            <div className="sm:col-span-3">
                                <label htmlFor="soft-cap" className="block text-sm font-medium text-gray-700">
                                    Soft cap
                                </label>
                                <div className="mt-1">
                                    <input
                                        type="number"
                                        name="soft-cap"
                                        id="soft-cap"
                                        autoComplete="0"
                                        min="0"
                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        onChange={(e) => {
                                            this.setState({softCap: e.target.value})
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Hard cap */}
                            <div className="sm:col-span-3">
                                <label htmlFor="hard-cap" className="block text-sm font-medium text-gray-700">
                                    Hard cap
                                </label>
                                <div className="mt-1">
                                    <input
                                        type="number"
                                        name="hard-cap"
                                        id="hard-cap"
                                        autoComplete="0"
                                        min="0"
                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        onChange={(e) => {
                                            this.setState({hardCap: e.target.value})
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Minimum contribution */}
                            <div className="sm:col-span-3">
                                <label htmlFor="min-contribution" className="block text-sm font-medium text-gray-700">
                                    Minimum contribution
                                </label>
                                <div className="mt-1">
                                    <input
                                        type="number"
                                        name="min-contribution"
                                        id="min-contribution"
                                        autoComplete="0"
                                        min="0"
                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        onChange={(e) => {
                                            this.setState({minimumContribution: e.target.value})
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Maximum contribution */}
                            <div className="sm:col-span-3">
                                <label htmlFor="max-contribution" className="block text-sm font-medium text-gray-700">
                                    Maximum contribution
                                </label>
                                <div className="mt-1">
                                    <input
                                        type="number"
                                        name="max-contribution"
                                        id="max-contribution"
                                        autoComplete="0"
                                        min="0"
                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        onChange={(e) => {
                                            this.setState({maximumContribution: e.target.value})
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Fundraising start date */}
                            <div className="sm:col-span-3">
                                <label htmlFor="start-date" className="block text-sm font-medium text-gray-700">
                                    Fundraising start date
                                </label>
                                <div className="datepicker relative form-floating mb-3 xl:w-96">
                                    <input type="text"
                                           className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                           placeholder="YY/MM/DD"
                                           onChange={(e) => {
                                               this.setState({startDate: e.target.value})
                                           }}
                                    />
                                </div>
                            </div>

                            {/* Fundraising end date */}
                            <div className="sm:col-span-3">
                                <label htmlFor="end-date" className="block text-sm font-medium text-gray-700">
                                    Fundraising end date
                                </label>
                                <div className="datepicker relative form-floating mb-3 xl:w-96">
                                    <input type="text"
                                           className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                           placeholder="YY/MM/DD"
                                           onChange={(e) => {
                                               this.setState({endDate: e.target.value})
                                           }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pt-5">
                    <div className="flex justify-end">
                        <button
                            type="button"
                            className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                            Save
                        </button>
                    </div>
                </div>
            </form>
        )
    }
}

export default Creator