import React from "react";
import Sidenav from "../pages/Sidenav";
import Navbar from "../pages/Navbar";
import Box from "@mui/material/Box";
import Cards from "../pages/Cards";
import { useSession } from "../redux/Reducers/AuthReducer";

export default function Home() {
  const { SESSION_STORAGE_KEY } = useSession();

  const token = JSON.parse(localStorage.getItem(SESSION_STORAGE_KEY)).token;

  console.log("token is ", token);
  return (
    <>
      <Sidenav />
      <Navbar />
      <Box sx={{ display: "flex" }}>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <div style={{ marginLeft: "50px" }}>
            <Cards />
          </div>
        </Box>
      </Box>
    </>
  );
}
