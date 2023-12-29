import {useLocation, useNavigate} from "react-router-dom";
import {useState} from "react";
import FormItem from "../../../components/Form/FormItem/FormItem";
import FormButton from "../../../components/Form/Button/FormButton";
import axiosInstance, {axiosInstanceUnAuthorized} from "../../../API/Axios/AxiosConfig";
import URLS from "../../../API/Axios/URLS";
import {HTTP_400_BAD_REQUEST, is_success} from "../../../API/Axios/Status";
import {toast} from "react-toastify";
import FormNoneFieldErrors from "../../../components/Form/FormNoneFieldErrors";


export default function NewPassword({...props}) {
    const {state} = useLocation();
    const [form, setForm] = useState({
        password: "",
        confirmPassword: "",
        ...state
    });
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    function handleSubmit(event) {
        event.preventDefault();
        if (form.password !== form.confirmPassword) {
            setError({
                confirmPassword: ["Passwords do not match."]
            })
            return;
        }
        setLoading(true);
        axiosInstanceUnAuthorized.post(URLS.SetNewPassword, {
            ...state,
            password: form.password
        }).then((res) => {
            if (is_success(res?.status)) {
                toast("Password Reset!", {type: "success"})
                navigate('/')
            }

        }).catch((err) => {
            toast("Please check the form", {type: "error"})
            if (err?.response?.status === HTTP_400_BAD_REQUEST) {
                setError(err?.response?.data);
            } else {
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
            className="mt-[10px]  w-full max-w-full gap-0 flex-col items-start  md:pl-4 lg:pl-0 xl:max-w-[480px]">
            <h4 className="mb-2.5 text-3xl  font-bold text-navy-700 dark:text-white">
                Reset Password
            </h4>
            <p className="mb-4 ml-1 text-sm   text-gray-400">
                Enter your new password. Make sure it's at least 8 characters including a number and a lowercase
            </p>


            <FormItem
                type={"error"}
                label={"Password*"}
                message={error?.password}
                className={"mb-3"}
                variant={"auth"}
            >
                <input
                    type="password"
                    name={"password"}
                    id={"password"}
                    placeholder="**********"
                    pattern="(?=.*\d)(?=.*[a-z]).{8,}"
                    title="Make sure it's at least 8 characters including a number and a lowercase and symbol"
                    value={form.password}
                    onChange={(e) => {
                        setForm({
                            ...form,
                            password: e.target.value
                        })
                    }}
                />

            </FormItem>

            <FormItem
                type={"error"}
                label={"Confirm Password*"}
                message={error?.confirmPassword}
                className={"mb-3"}
                variant={"auth"}
            >
                <input
                    type="password"
                    name={"password"}
                    id={"password"}
                    placeholder="**********"
                    pattern="(?=.*\d)(?=.*[a-z]).{8,}"
                    title="Make sure it's at least 8 characters including a number and a lowercase and symbol"
                    value={form.confirmPassword}
                    onChange={(e) => {
                        setForm({
                            ...form,
                            confirmPassword: e.target.value
                        })
                    }}
                />

            </FormItem>


            <FormNoneFieldErrors errors={error?.non_field_errors} className={"mt-2"}/>


            <FormButton
                loading={loading}
                type={"submit"}
            >


                Change Password
            </FormButton>

        </form>
    )
}