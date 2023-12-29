import {Route, Routes} from "react-router-dom";
import ForgetPassword from "./ForgetPassoword/ForgetPassword";
import AuthLayout from "../../layout/auth/authLayout";
import OTP from "./ForgetPassoword/OTP";
import NewPassword from "./ForgetPassoword/NewPassword";


export default function AuthRoot({className, ...props}) {

    return (
        <div className={"h-[100vh]"}>
            <AuthLayout>
                <Routes>
                    <Route path="/forget-password" element={<ForgetPassword/>}/>
                    <Route path="/otp" element={<OTP/>}/>
                    <Route path="/new-password" element={<NewPassword/>}/>
                </Routes>
            </AuthLayout>
        </div>

    )
}