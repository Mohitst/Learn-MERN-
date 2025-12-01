import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesIntial = [];

  const [notes, setnotes] = useState(notesIntial);

  //Get All Note api call
  const getNote = async () => {
    try {
      const response = await fetch(`${host}/api/notes/getAllNotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("auth_token"),
        },
      });
      const result = await response.json();
      // console.log(result);
      setnotes(result);
    } catch (error) {
      console.error(error.message);
    }
  };

  //Add Note
  const addNote = async (title, description, tag) => {
    let result = null;

    try {
      const response = await fetch(`${host}/api/notes/addNote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("auth_token"),
        },
        body: JSON.stringify({ title, description, tag }),
      });

      result = await response.json();
    } catch (error) {
      console.error(error.message);
      return; // exit early if API fails
    }

    setnotes(notes.concat(result));
  };

  //Delete Note
  const deleteNote = async (id) => {
    // Api call
    try {
      const response = await fetch(`${host}/api/notes/deleteNote/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("auth_token"),
        },
      });
      // const result = await response.json();
      // console.log(result);
    } catch (error) {
      console.error(error.message);
    }

    // Api Call
    const newNote = notes.filter((note) => {
      return note._id !== id;
    });
    setnotes(newNote);
    // console.log("Deleting the note with id", id);
  };

  //Edit Note
  const editNote = async (id, title, description, tag) => {
    // Api call

    try {
      const response = await fetch(`${host}/api/notes/updateNote/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("auth_token"),
        },
        body: JSON.stringify({ title, description, tag }),
      });
      // const result = await response.json();
      // console.log(result);
    } catch (error) {
      console.error(error.message);
    }

    let newNotes = JSON.parse(JSON.stringify(notes));
    //logic to edit note
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }

    setnotes(newNotes);
  };

  return (
    <NoteContext.Provider
      value={{ notes, setnotes, addNote, deleteNote, editNote, getNote }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
