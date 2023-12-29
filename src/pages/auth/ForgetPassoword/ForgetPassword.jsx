import {useState} from "react";
import {useNavigate} from 'react-router-dom';
import FormItem from "../../../components/Form/FormItem/FormItem";
import FormButton from "../../../components/Form/Button/FormButton";
import axiosInstance, {axiosInstanceUnAuthorized} from "../../../API/Axios/AxiosConfig";
import URLS from "../../../API/Axios/URLS";
import {toast} from "react-toastify";
import {HTTP_400_BAD_REQUEST} from "../../../API/Axios/Status";
import FormNoneFieldErrors from "../../../components/Form/FormNoneFieldErrors";
import Icon from "../../../components/Icon/Icon";

export default function ForgetPassword() {
    const [error, setError] = useState({});
    const [form, setForm] = useState({})
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();


    function handleSubmit(event) {
        event.preventDefault();
        setLoading(true);
        setError({})
        axiosInstanceUnAuthorized.post(URLS.ResetPassword, form).then((res) => {
            toast("Otp sent to your email address", {
                type: "success"
            })
            navigate("/auth/otp", {
                state: form
            })
        }).catch((err) => {
            toast(err?.response?.data?.error || err?.message || "Invalid Email", {
                type: "error"
            });
            if (err?.response?.status === HTTP_400_BAD_REQUEST) {
                setError(err?.response?.data);
            }else {
                setError({
                    non_field_errors: ["Something went wrong, please try again later."]
                })
            }

        }).finally(() => {
            setLoading(false)
        })

    }

    return (

        <form
            onSubmit={handleSubmit}
            className="mt-[10px]  w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[480px]">

            <h4 className="mb-2.5 text-2xl  font-bold text-navy-700 dark:text-white">
                Forgot your password?
            </h4>
            <p className="mb-4 ml-1 text-xs text-gray-400">
                No problem. Just let us know your email address and we'll email you a Otp to reset your password.
            </p>

            <FormItem
                LeftIcon={<Icon src={"/icons/email.svg"} className={"w-5 h-5"}/>}
                type={"error"}
                label={"Email*"}
                message={error?.email}
                className={"mb-3"}
                variant={"auth"}
            >
                <input
                    type={"email"}
                    name={"email"}
                    id={"email"}

                    placeholder="mail@simmmple.com"
                    value={form.email}
                    onChange={(e) => {
                        setForm({
                            ...form,
                            email: e.target.value
                        })
                    }}
                />

            </FormItem>

            <FormNoneFieldErrors  className={"mt-2"} errors={error?.non_field_errors}/>

            <FormButton
                className={"mt-4"}
                loading={loading}
            >
                Send Otp
            </FormButton>
        </form>

    )
}