
import React, {useEffect, useState} from "react";
import cuiwah from '../../assests/cuiwah.jpg';
import logo from '../../assests/logo.png';
import {useNavigate} from "react-router-dom";

import {toast} from "react-toastify";

const AuthLayout = ({...props}) => {
    
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 h-screen w-full">
            <div className="hidden sm:block">
                <img className="w-full h-full object-cover" src={cuiwah} alt=""/>
            </div>

            <div className="flex flex-col justify-center bg-gradient-to-r from-blue-100 via-blue-200 to-blue-300">
                <div
                    className="max-w-[350px] w-full mx-auto bg-white p-7 rounded-lg shadow-md"
                >
                    <img className="mx-auto mb-0.5 w-40 h-40 " src={logo} alt=""/>


                        <div className="">
                            {
                                props.children
                            }
                        </div>

                    


                </div>
            </div>
        </div>
    );
};

export default AuthLayout;