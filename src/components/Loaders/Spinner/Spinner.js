import CircularLoader from "../../Animaiton/CircularLoader/CircularLoader";


export default function Spinner({className,...props}) {
 
     return (
         <div className={` ${className}`}>
             <CircularLoader className={"w-2 h-2"} />
         </div>
         
     )
 }