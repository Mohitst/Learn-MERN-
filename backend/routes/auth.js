const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userInfo = require("../middleware/userInfo");

const JWT_secret = "mohitstealthtechnocrats@1313";

// Route 1 : Create a user using: POST /api/auth/createUser
// Doesn't require Auth. no login required
router.post(
  "/createUser",
  [
    body("name", "Name must be at least 3 characters").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be at least 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    // Validate request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      // Check if user with this email already exists
      let existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          error:
            "A user with this email already exists. Please enter a unique email.",
        });
      }

      // Hash password before saving
      const salt = await bcrypt.genSalt(10);
      const securedPassword = await bcrypt.hash(password, salt);

      // Create new user
      const user = await User.create({
        name,
        email,
        password: securedPassword, // ✅ store hashed password properly
      });
      const data = {
        user: {
          id: user.id,
        },
      };
      // const auth_token = jwt.sign(data, JWT_secret);

      res.status(201).json({
        success: true,
        message: "User created successfully",
        //   auth_token,
      });
    } catch (error) {
      console.error("Error creating user:", error.message);
      res.status(500).json({
        success: false,
        error: "Internal Server Error",
      });
    }
  }
);

// Route 2: Authenticate a user using: POST /api/auth/login
// Doesn't require Auth. no login required

router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    // Validate request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ error: "Try to Login with Correct Credentials." });
      }

      const comparePassword = await bcrypt.compare(password, user.password);
      if (!comparePassword) {
        return res
          .status(400)
          .json({ error: "Try to Login with Correct Credentials." });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };
      const auth_token = jwt.sign(payload, JWT_secret);

      res.status(201).json({
        success: true,
        message: "User Exists",
        auth_token,
      });
    } catch (error) {
      console.error("Error creating user:", error.message);
      res.status(500).json({
        success: false,
        error: "Internal Server Error",
      });
    }
  }
);

// Route 3: Get loggedin User Detail: POST /api/auth/userDetail
// Require Auth. login required

router.post("/userDetail", userInfo, async (req, res) => {
  // Validate request body
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   return res.status(400).json({ success: false, errors: errors.array() });
  // }

  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.error("Error creating user:", error.message);
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
});
module.exports = router;
