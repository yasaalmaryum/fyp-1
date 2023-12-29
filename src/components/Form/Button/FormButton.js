import Spinner from "../../Loaders/Spinner/Spinner";

export default function FormButton({className,loading,text, ...props}) {

    return (
        <button

            disabled={loading}
            className={`${className} flex  justify-center items-center linear mt-2 w-full cursor-pointer rounded-xl bg-blue-500 hover:bg-blue-600 py-[8px] text-base font-medium text-white transition duration-200  dark:text-white `}
            {...props}>
            {
                loading ? <Spinner aria-label="Default status example"/> : props.children
            }
        </button>

    )
}