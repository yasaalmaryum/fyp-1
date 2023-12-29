import {useEffect, useState} from "react";
import React from "react";

export default function FormItem({
                                     label, id, type,
                                     message, variant,
                                     className, LeftIcon, RightIcon,
                                     children, ...props
                                 }) {

    const [sytleClass, setStyleClass] = useState({
        border: "border-gray-200 dark:!border-white/10",
        text: "text-gray-500 dark:text-white",
    });


    function updateStyleClass() {
        if (message?.length === 0 || !message) {
            setStyleClass({
                border: "border-gray-200 dark:!border-white/10",
                text: "text-gray-500 dark:text-white",
            });
            return;
        }
        switch (type) {
            case "success":
                setStyleClass({
                    border: "border-green-500  dark:!border-green-400 dark:!text-green-400 ",
                    text: "text-green-500 dark:text-green-500",

                });
                break;
            case "error":
                setStyleClass({
                    border: "border-red-500  dark:!border-red-400 dark:!text-red-400 ",
                    text: "text-red-500 dark:text-red-500",
                });
                break;
            case "hint":
                setStyleClass({
                    border: "border-yellow-500 dark:!border-yellow-300",
                    text: "text-yellow-500 dark:text-yellow-300",
                });
                break;
            default:
                setStyleClass({
                    border: "border-gray-200 dark:!border-white/10",
                    text: "text-gray-500 dark:text-white",
                });


        }
    }

    useEffect(() => {
        updateStyleClass()
    }, [type, message])


    return (
        <div className={`${sytleClass.text} ${className} `}>
            {
                label ? <label
                    htmlFor={id}
                    className={`\
                    text-sm  ${variant === "auth" ? "ml-1.5 font-medium" : "ml-3 font-bold"}
                    `}
                >
                    {label}
                </label> : null
            }
            <div className={`
            border mt-2 rounded-xl flex flex-row justify-center items-center gap-3  
             ${sytleClass.border} 
             px-2
            `}>

                {
                    LeftIcon ? LeftIcon : null
                }
                {
                    //     adding default class for input

                    children ? React.cloneElement(children, {
                        className: `${children?.props.className} flex-1  outline-none rounded-xl   py-3 ${sytleClass.text} bg-transparent text-sm `,
                        id: id,
                        ...props
                    }) : null
                }
                {
                    RightIcon ? RightIcon : null
                }

            </div>


            {
                message?.length > 0 ? <p className="text-xs mt-1 ml-2 ">{message}</p> : null
            }
        </div>

    )
}