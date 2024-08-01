"use client";
import LoaderComponent from "@/app/client/component/Partners/LoaderComponent/LoaderComponent";
import { AUTHUSER, BASE_URL } from "@/utils/alljsonfile/service";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const AuthUserClient = () => {
  const router = useRouter();
  const paramsurl = useParams()
  const token = paramsurl?.token?.replace(" ", "+");
  const decodedToken = token ? decodeURIComponent(token) : null;
  const [showLoader, setShowLoader] = useState(true);
  const callVerifyApi = () => {
    const params = {
      token: decodedToken,
    };
    axios
      .post(BASE_URL + AUTHUSER.authVerifyToken, params)
      .then((response) => {
        setShowLoader(false);
        if (response?.data?.data) {
          localStorage.setItem(
            "@alternatdata",
            response?.data?.data?.alternate_product
          );
          localStorage.setItem(
            "@eligibleproduct",
            response?.data?.data?.eligible_product
          );
          localStorage.setItem("token", response?.data?.data?.access_token);
          localStorage.setItem(
            "leadprofileid",
            response?.data?.data?.lead_profile_id
          );
          router.push("/my-profile/my-offer");
        }
      })
      .catch((error) => {
        if (error) {
          toast.error("Invalid Token!");
          router.push("/404");
          setShowLoader(false);
        }
      });
  };
  useEffect(() => {
    if (decodedToken) {
      callVerifyApi();
    }
  }, [decodedToken]);
  return <div>{showLoader && <LoaderComponent />}</div>;
};
export default AuthUserClient;