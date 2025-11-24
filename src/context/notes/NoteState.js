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
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjkwZGRjZTdhZmExMDEyNWNiMzIxZDRlIn0sImlhdCI6MTc2MjUxNjIzMn0.AuEfHoLtO0ISYG6EwVKnqLgSFY92Rreb3HOu4nSKqG8",
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
    // Api call
    // console.log("Adding a new Note");
    try {
      const response = await fetch(`${host}/api/notes/addNote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjkwZGRjZTdhZmExMDEyNWNiMzIxZDRlIn0sImlhdCI6MTc2MjUxNjIzMn0.AuEfHoLtO0ISYG6EwVKnqLgSFY92Rreb3HOu4nSKqG8",
        },
        body: JSON.stringify({ title, description, tag }),
      });
      const result = await response.json();
      // console.log(result);
    } catch (error) {
      console.error(error.message);
    }

    const note = {
      _id: "69240ceac5b4ed718edsdfggdfbd9d04",
      user: "69240b8ac5b4ed718ebd9cff",
      title: title,
      description: description,
      tag: tag,
      date: "2025-11-24T07:44:42.889Z",
      __v: 0,
    };
    setnotes(notes.concat(note));
  };

  //Delete Note
  const deleteNote = async (id) => {
    // Api call
    try {
      const response = await fetch(`${host}/api/notes/deleteNote/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjkwZGRjZTdhZmExMDEyNWNiMzIxZDRlIn0sImlhdCI6MTc2MjUxNjIzMn0.AuEfHoLtO0ISYG6EwVKnqLgSFY92Rreb3HOu4nSKqG8",
        },
      });
      const result = await response.json();
      // console.log(result);
    } catch (error) {
      console.error(error.message);
    }

    // Api Call
    const newNote = notes.filter((note) => {
      return note._id !== id;
    });
    setnotes(newNote);
    console.log("Deleting the note with id", id);
  };

  //Edit Note
  const editNote = async (id, title, description, tag) => {
    // Api call

    try {
      const response = await fetch(`${host}/api/notes/updateNote/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjkwZGRjZTdhZmExMDEyNWNiMzIxZDRlIn0sImlhdCI6MTc2MjUxNjIzMn0.AuEfHoLtO0ISYG6EwVKnqLgSFY92Rreb3HOu4nSKqG8",
        },
        body: JSON.stringify({ title, description, tag }),
      });
      const result = await response.json();
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
