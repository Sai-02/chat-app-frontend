import React, { useEffect } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { URL_PATHS } from "../utils/constant";
import { getAccessToken } from "../utils/helpers";

const GuestComponent = (props: any) => {
  const navigate = useNavigate();
  useEffect(() => {
    const authToken: string | null = getAccessToken();
    if (authToken) {
      toast("User already loggedin");
      navigate(URL_PATHS.DASHBOARD);
    }
  }, []);
  return <>{props.element}</>;
};

export default GuestComponent;
