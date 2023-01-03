import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { URL_PATHS } from "../utils/constant";
import { getAccessToken } from "../utils/helpers";

interface IPropsProtectedComponent {
  element: any;
}
const ProtectedComponent = (props: IPropsProtectedComponent) => {
  const navigate = useNavigate();
  useEffect(() => {
    const authToken: string | null = getAccessToken();
    if (!authToken) {
      navigate(URL_PATHS.LOGIN);
    }
  }, []);
  return <>{props.element}</>;
};

export default ProtectedComponent;
