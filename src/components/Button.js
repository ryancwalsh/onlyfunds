export default function Button(props) {
    return (
        <button
            type="button"
            className={"inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 " +
            "text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 " +
            "focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-slate-300 disabled:text-black " +
            "disabled:opacity-50 "}
            onClick={props.onClick}
            disabled={Boolean(props.disabled)}
        >
            {props.children}
        </button>
    )
}