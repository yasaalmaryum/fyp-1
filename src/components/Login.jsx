import React, { useEffect, useState } from "react";
import cuiwah from "../assests/cuiwah.jpg";
import logo from "../assests/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useSession } from "../redux/Reducers/AuthReducer";
import axiosInstance, {
  axiosInstanceUnAuthorized,
} from "../API/Axios/AxiosConfig";
import URLS from "../API/Axios/URLS";
import { HTTP_400_BAD_REQUEST, is_success } from "../API/Axios/Status";
import { toast } from "react-toastify";
import FormItem from "./Form/FormItem/FormItem";
import FormNoneFieldErrors from "./Form/FormNoneFieldErrors";
import FormButton from "./Form/Button/FormButton";
import LoginNavbar from "../pages/LoginNavbar";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [error, setError] = useState({});

  const [loading, setLoading] = useState(false);
  const { authActions, SESSION_STORAGE_KEY } = useSession();

  console.log("session key ", SESSION_STORAGE_KEY);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError({});

    axiosInstance
      .post(URLS.login, formData)
      .then((res) => {
        console.log("response is ", res);
        let data = res?.data;

        if (is_success(res?.status)) {
          if (data?.profile?.is_student === false) {
            toast("You are not authorized to login here", {
              type: "error",
            });
            return;
          }
          toast("Login Success", {
            type: "success",
          });
          authActions.setSession(data, formData.rememberMe);
          navigate("/home");
        }
        setLoading(false);
      })
      .catch((err) => {
        toast("Login Failed", {
          type: "error",
        });
        if (err?.response?.status === HTTP_400_BAD_REQUEST) {
          setError(err?.response?.data);
        } else {
          setError({
            non_field_errors: ["Something went wrong, please try again later."],
          });
        }
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    authActions.clearSession();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 h-screen w-full">
      <LoginNavbar />
      <div className="hidden sm:block">
        <img className="w-full h-full object-cover" src={cuiwah} alt="" />
      </div>

      <div className="flex flex-col justify-center bg-gradient-to-r from-blue-100 via-blue-200 to-blue-300">
        <form
          className="max-w-[350px] w-full mx-auto bg-white p-7 rounded-lg shadow-md"
          onSubmit={handleSubmit}
        >
          <img className="mx-auto mb-0.5 w-40 h-40 " src={logo} alt="" />
          <h2 className="text-4xl text-gray-800 font-bold text-center">
            Student Portal
          </h2>
          <FormItem
            label={"Email"}
            type={"error"}
            className={"mb-2"}
            message={error?.email}
            variant={"auth"}
          >
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  email: e.target.value,
                });
              }}
              required
              placeholder="Email"
            />
          </FormItem>
          <FormItem
            label={"Password"}
            type={"error"}
            message={error?.password}
            variant={"auth"}
          >
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  password: e.target.value,
                });
              }}
              required
              placeholder="********"
            />
          </FormItem>

          <FormNoneFieldErrors
            errors={error?.non_field_errors}
            className={"mb-4 mt-2"}
          />

          <div className="flex items-center mt-3 mb-4">
            <input
              type="checkbox"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleChange}
              className="mr-2"
            />
            <label>Remember Me</label>
          </div>
          <div className="text-left mb-4">
            <Link
              to={"/auth/forget-password"}
              className="text-blue-700 hover:text-blue-800"
            >
              Forgot password?
            </Link>
          </div>

          <FormButton loading={loading} type={"submit"}>
            Login
          </FormButton>
        </form>
      </div>
    </div>
  );
};

export default Login;
