const express = require("express");
const Notes = require("../models/Notes");
const userInfo = require("../middleware/userInfo");
const router = express.Router();
const { body, validationResult } = require("express-validator");

// Route 4: Get All notes for logged In User using: get (api/notes/getAllNotes)
// Require Login

router.get("/getAllNotes", userInfo, async (req, res) => {
  try {
    const allNotes = await Notes.find({ user: req.user.id });
    res.json(allNotes);
  } catch (error) {
    console.error("Error creating user:", error.message);
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
});

// Route 5: Add notes for logged In User post (api/notes/addNote)
// Require Login

router.post(
  "/addNote",
  userInfo,
  [
    body("title", "title Can't be Empty").isLength({ min: 1 }),
    body("description", "Description Can't be Empty").isLength({ min: 1 }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
      }

      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });

      const savenote = await note.save();

      res.json(savenote);
    } catch (error) {
      console.error("Error creating user:", error.message);
      res.status(500).json({
        success: false,
        error: "Internal Server Error",
      });
    }
  }
);

// Route 6: Update notes for logged In User put (api/notes/updateNote)
// Require Login

router.put("/updateNote/:id", userInfo, async (req, res) => {
  try {
    const { title, description, tag } = req.body;

    // Build updated note object
    const newNote = {};
    if (title) newNote.title = title;
    if (description) newNote.description = description;
    if (tag) newNote.tag = tag;

    // Find the note to be updated
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Note Not Found");
    }

    // Ensure the user owns this note
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Authorized");
    }

    // Update the note
    note = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );

    res.json({ success: true, note });
  } catch (error) {
    console.error("Error updating note:", error.message);
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
});

// Route 7: Delete notes for logged In User: delete (api/notes/deleteNote)
// Require Login

router.delete("/deleteNote/:id", userInfo, async (req, res) => {
  try {
    // Find the note by ID
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ error: "Note Not Found" });
    }

    // Check if the note belongs to the logged-in user
    if (note.user.toString() !== req.user.id) {
      return res.status(401).json({ error: "Not Authorized" });
    }

    // Delete the note
    await Notes.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Note has been deleted successfully",
      note: note,
    });
  } catch (error) {
    console.error("Error deleting note:", error.message);
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
});

module.exports = router;
