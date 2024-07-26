import {
  emailValidator,
  passwordValidator,
} from "../validations/auth.validation.js";

const validateRegistrationBody = (req, res, next) => {
  const { name, email, password } = req.body;

  // Validate Name
  if (!name || name.length < 3) {
    return res.status(400).json({
      message: "Name must be at least of 3 characters",
    });
  }

  // Validate Email
  if (!email) {
    return res.status(400).json({
      message: "Email is required!",
    });
  } else {
    if (!emailValidator(email)) {
      return res.status(400).json({
        message: "Invalid email!",
      });
    }
  }

  // Validate password
  if (!password) {
    return res.status(400).json({
      message: "Password is required!",
    });
  } else {
    if (!passwordValidator(password)) {
      return res.status(400).json({
        message:
          "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character",
      });
    }
  }

  next();
};

const validateLoginBody = (req, res, next) => {
  const { email, password } = req.body;

  // Validate Email
  if (!email) {
    return res.status(400).json({
      message: "Email is required!",
    });
  }

  // Validate password
  if (!password) {
    return res.status(400).json({
      message: "Password is required!",
    });
  }

  next();
};

export { validateRegistrationBody, validateLoginBody };
