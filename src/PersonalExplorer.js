import {useContext} from "react";
import {BlockContext} from "./components/BlockHandler";
import Explorer from "./components/Explorer";
import {PlusCircleIcon, FaceFrownIcon} from '@heroicons/react/20/solid'

export default function PersonalExplorer() {
    const {personalProjects} = useContext(BlockContext)

    if (personalProjects.length > 0) {
        return <Explorer/>
    } else {
        return (
            <div className="w-96 overflow-hidden rounded-lg bg-white shadow">
                <div className="text-center">
                    <div className="px-4 py-5 sm:p-6">
                        <FaceFrownIcon className="h-8 w-8 m-auto" aria-hidden="true"/>
                        <h3 className="mt-2 text-sm font-medium text-gray-900">No Projects</h3>
                        <p className="mt-1 text-sm text-gray-500">Get started by creating a new project.</p>
                        <div className="mt-6">
                            <button type="button"
                                className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                <PlusCircleIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true"/>
                                New Project
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
