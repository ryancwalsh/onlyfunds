import {BlockContext} from "./BlockHandler"
import {useContext} from "react"

export default function Connect() {
    const {address, connect} = useContext(BlockContext)

    let buttonContent = "Connect"

    if (address !== null) {
        buttonContent = "0x..." + address.substring(address.length - 6, address.length)
    }

    return (
        <button
            type="button"
            className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            onClick={connect}
        >
            {buttonContent}
        </button>
    )
}