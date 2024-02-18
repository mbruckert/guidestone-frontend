import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AuthRedirect() {
  const navigate = useNavigate();

  //get url params
  const urlParams = new URLSearchParams(window.location.search);
  console.log(urlParams.get("code"));

  useEffect(() => {
    console.log(urlParams.get("code"));
    fetch("https://guidestone-functions.azurewebsites.net/api/exchangeToken", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code: urlParams.get("code"),
        redirect_uri: "http://localhost:5173/auth/redirect",
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${data.access_token}`,
            "Content-Type": "application/json",
          },
        })
          .then((res) => {
            return res.json();
          })
          .then((userInfo) => {
            console.log(userInfo);
            localStorage.setItem("userInfo", JSON.stringify(userInfo));
            navigate("/eye-tracking");
          });
      });
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <p>You will be automatically redirected to onboarding...</p>
    </div>
  );
}
