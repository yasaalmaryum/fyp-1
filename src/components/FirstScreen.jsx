import { useNavigate } from "react-router-dom";
import main from "../assests/main.jpg";
import logo from "../assests/logo.png";
import MainNavbar from "../pages/MainNavbar";
import { Button } from "@mui/material";

function FirstScreen() {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };
  return (
    <div>
      <MainNavbar />
      <div className="flex items-center justify-center h-screen">
        {/* Background image with blur effect */}
        <img
          src={main}
          alt="Background"
          className="fixed inset-0 w-full h-full object-cover blur-lg"
        />

        {/* Card container for logo and buttons */}
        <div className="bg-white bg-opacity-60 backdrop-filter backdrop-blur-lg rounded-xl shadow-xl p-12 text-center">
          {/* Logo */}
          <img
            src={logo}
            alt="University Logo"
            className="mx-auto w-32 h-32 mb-6"
          />

          {/* Vertical buttons */}

          <div className="flex flex-col items-center space-y-4">
            <Button
              style={{ backgroundColor: "#0d74b4", color: "#ffffff" }}
              className="font-bold py-3 px-6 rounded w-40"
              onClick={() => handleNavigation("/login")}
            >
              Student
            </Button>
            <Button
              style={{ backgroundColor: "#0d74b4", color: "#ffffff" }}
              className="font-bold py-3 px-6 rounded w-40"
              onClick={() => handleNavigation("/facultylogin")}
            >
              Faculty
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FirstScreen;
