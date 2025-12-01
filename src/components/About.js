import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function About() {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      return (
        <div>
          <h1>This is About Page.</h1>
        </div>
      );
    } else {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);
}

export default About;
