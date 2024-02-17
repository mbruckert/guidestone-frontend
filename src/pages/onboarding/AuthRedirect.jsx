import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AuthRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://guidestone-functions.azurewebsites.net/api/getToken", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code: window.location.search.split("=")[1],
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        async function fetchGoogleUserInfo(accessToken) {
          fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${data["accessToken"]}`,
              "Content-Type": "application/json",
            },
          })
            .then((res) => {
              return res.json();
            })
            .then((userInfo) => {
              localStorage.setItem("userInfo", JSON.stringify(userInfo));
              navigate("/eye-tracking");
            });
        }
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
