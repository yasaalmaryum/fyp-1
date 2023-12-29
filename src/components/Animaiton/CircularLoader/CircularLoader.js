import "./CircularLoader.css"

export default function CircularLoader({className, ...props}) {

    return (
        <div className={`loader ${className?className:"w-10 h-10"}`}></div>


    )
}