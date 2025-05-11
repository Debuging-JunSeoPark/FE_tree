import Cookies from "js-cookie";
import { redirect } from "react-router-dom";

export const checkAuth = () => {
  const token = Cookies.get("accessToken");
  if (!token) {
    throw redirect("/start"); 
  }
};