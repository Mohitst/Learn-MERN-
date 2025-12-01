const express = require("express");
const About = require("../models/About");
const userInfo = require("../middleware/userInfo");
const router = express.Router();
const { body, validationResult } = require("express-validator");

// Route 8: Add About Page Content for logged In User post (api/page/about)
// Require Login

router.post(
  "/about",
  userInfo,
  [
    body("title", "title Can't be Empty").isLength({ min: 1 }),
    body("description", "Description Can't be Empty").isLength({ min: 1 }),
    body("url", "url Can't be Empty").isLength({ min: 1 }),
  ],
  async (req, res) => {
    try {
      const { title, description, url } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
      }

      const about = new About({
        title,
        description,
        url,
        user: req.user.id,
      });

      const saveabout = await about.save();

      res.json(saveabout);
    } catch (error) {
      console.error("Error creating user:", error.message);
      res.status(500).json({
        success: false,
        error: "Internal Server Error",
      });
    }
  }
);

module.exports = router;
