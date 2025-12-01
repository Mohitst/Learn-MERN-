import React, { useState } from "react";
import AboutContext from "./aboutContext";

const AboutState = (props) => {
  const host = "http://localhost:5000";

  const aboutIntial = [];

  const [about, setAbout] = useState(aboutIntial);

  //Add About content
  const addAbout = async (title, description, url) => {
    let result = null;

    try {
      const response = await fetch(`${host}/api/page/about`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("auth_token"),
        },
        body: JSON.stringify({ title, description, url }),
      });

      result = await response.json();
    } catch (error) {
      console.error(error.message);
      return; // exit early if API fails
    }

    setAbout(about.concat(result));
  };

  return (
    <AboutContext.Provider value={{ about, addAbout }}>
      {props.children}
    </AboutContext.Provider>
  );
};
export default AboutState;
