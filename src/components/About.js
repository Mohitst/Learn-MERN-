import React, { useState, useContext } from "react";
import AboutContext from "../context/notes/aboutContext";

const About = (props) => {
  const addcontext = useContext(AboutContext);
  const { addAbout } = addcontext;

  const [about, setabout] = useState({
    title: "",
    description: "",
    tag: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addAbout(about.title, about.description, about.tag);
    setabout({ title: "", description: "", tag: "" });
    props.showAlert("About Added successfully", "success");
  };

  const onChange = (e) => {
    setabout({ ...about, [e.target.name]: e.target.value });
  };

  return (
    <div className="container my-5">
      <h1>Page</h1>
      <form onSubmit={handleSubmit} className="my-3">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={about.title}
            onChange={onChange}
            name="title"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            value={about.description}
            onChange={onChange}
            name="description"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            URL
          </label>
          <input
            type="text"
            className="form-control"
            id="tag"
            value={about.tag}
            onChange={onChange}
            name="tag"
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={
            about.title.length < 5 ||
            about.description.length < 5 ||
            about.tag.length < 1
          }
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default About;
