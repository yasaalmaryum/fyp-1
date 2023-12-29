import  "./ThreeDotsLoader.css"
export default function ThreeDotsLoader({className, ...props}) {

    return (
        <div className={` flex justify-center items-center ${className}`}>
            <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
        </div>

    )
}