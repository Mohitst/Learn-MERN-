import React, { useContext, useEffect } from "react";
import noteContext from "../context/notes/noteContext";

const About = () => {
  const a = useContext(noteContext);

  useEffect(() => {
    a.update();
  }, [a]);

  return (
    <div>
      This is About {a.state.name} & he is in Class {a.state.class}th.
    </div>
  );
};

export default About;
