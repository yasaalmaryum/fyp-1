import {useLocation, useNavigate} from "react-router-dom";
import {useState} from "react";
import OtpInput from "../../../components/fields/OtpInput/OtpInput";
import FormButton from "../../../components/Form/Button/FormButton";
import axiosInstance, {axiosInstanceUnAuthorized} from "../../../API/Axios/AxiosConfig";
import URLS from "../../../API/Axios/URLS";
import {toast} from "react-toastify";
import {HTTP_400_BAD_REQUEST, is_success} from "../../../API/Axios/Status";
import FormNoneFieldErrors from "../../../components/Form/FormNoneFieldErrors";


export default function OTP({...props}) {
    const {state} = useLocation();
    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({
        otp: null
    });

    const navigate = useNavigate();

    if (!state?.email) {
        navigate("/auth/forget-password")
    }

    function handleSubmit(event) {
        event.preventDefault();
        setLoading(true);
        setError({})

        axiosInstanceUnAuthorized.post(URLS.ValidateOtp, {
            email: state?.email,
            otp: otp
        }).then((res) => {
            if (is_success(res?.status)) {
               toast("OTP Verified!", {type: "success"})
                navigate("/auth/new-password", {state: {email: state?.email, otp: otp}})
            }
            setLoading(false);
        }).catch((err) => {
            toast("Invalid OTP", {type: "error"})
            if (err?.response?.status === HTTP_400_BAD_REQUEST) {
                setError(err?.response?.data);
            } else {
                setError({
                    non_field_errors: ["Something went wrong, please try again later."]
                })
            }
            setLoading(false)
        }).finally(() => {
            setLoading(false)
        })

    }

    return (
        <div className="mt-[10px]  w-full max-w-full gap-0 flex-col items-center flex md:pl-4 lg:pl-0 xl:max-w-[480px]">
            <h4 className="mb-2.5 text-3xl  font-bold text-navy-700 dark:text-white">
                Otp Verification
            </h4>
            <p className="mb-4 ml-1 text-sm   text-gray-400">
                Enter the OTP sent to your email address.
            </p>

            <OtpInput
                value={otp}
                onChange={setOtp}
                error={error?.otp}
                numInputs={4}
                shouldAutoFocus={true}
                placeholder={'-'}

            />

            <FormNoneFieldErrors errors={error?.non_field_errors} className={"mt-2"}/>
           <FormButton
            loading={loading}
            type={"submit"}
            onClick={handleSubmit}
           >
               Verify
           </FormButton>

        </div>
    )
}