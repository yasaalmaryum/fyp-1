export default function Icon({className,name, src, ...props}) {

    return (
        <img src={name?`/icons/${name}.svg`:src} className={`${className}`} alt={"icon"}/>

    )
}