import React, { useState} from "react";
import "./NoArrowInput.css"

function CustomInput({ref, error, ...props}) {


    return (
        <input
            ref={ref}

            type="number"
            min={0}
            max={9}
            maxLength={1}

            className={`
            w-14 h-14 md:w-16 text-2xl md:text-2xl md:h-16  
            bg-transparent 
            border-[1px] 
            dark:text-white 
             rounded-xl  appearance-none 
            focus:placeholder:text-transparent    text-center   
             ${error ? "border-red-500 placeholder:text-red-200 text-red-500" : "border-gray-400 placeholder:text-gray-300 text-black"}`}
            {...props}


        />
    )

}


export default function OtpInput({numInputs, error, onChange, inputProps, placeholder, ...props}) {
    const [otp, setOtp] = useState(Array(numInputs).fill(""));


    const handleChange = (e, index) => {
        const newOtp = [...otp];
        newOtp[index] = e.target.value;
        setOtp(newOtp);
        onChange(newOtp.join(""));
        setTimeout(() => {
            let nextInput = e.target.nextElementSibling;
            if (nextInput) {
                nextInput.focus();
            }
        }, 10)

    };
    return (
        <div className={"flex flex-col justify-center items-center gap-4"}>
            <div className={"flex flex-row gap-2"}>

                {
                    Array(numInputs).fill().map((_, index) => (
                        <CustomInput
                            {...inputProps}
                            id={"otp" + index}
                            onFocus={(e) => {

                                otp[index] = "";
                                setOtp([...otp]);
                            }}


                            error={error}
                            key={index}

                            placeholder={placeholder}
                            value={otp[index]}
                            onChange={(e) => handleChange(e, index)}
                        />
                    ))
                }

            </div>

            <p className={"text-red-400"}>{error}</p>
        </div>
    )
}