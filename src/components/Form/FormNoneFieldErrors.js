import {useEffect, useState} from "react";
import React from "react";

export default function FormNoneFieldErrors({
                                                className, errors, ...props
                                            }) {


    return (
        <div className={`${className} pl-7  `}>
            <ul className={'list-disc'}>
                {
                    errors?.map((error, index) => {
                        return (
                            <li key={index} className={'text-red-500'}>{error}</li>
                        )
                    })
                }
            </ul>
        </div>
    )
}