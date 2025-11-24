import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const s1 = {
    name: "mohit",
    class: "12",
  };

  const [state, setState] = useState(s1);

  const update = () => {
    setTimeout(() => {
      setState({
        name: "raj",
        class: "10",
      });
    }, 3000);
  };

  return (
    <NoteContext.Provider value={{ state, update }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
