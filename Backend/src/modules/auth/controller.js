const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { fullName, email, phone, password, confirmPassword } = req.body;

   
    if (!fullName || !email || !phone || !password || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }


    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters",
      });
    }

    
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match",
      });
    }

   
    const existingUser = await User.findOne({
      $or: [{ email }, { phone }],
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email or phone number already exists",
      });
    }

    
    const hashedPassword = await bcrypt.hash(password, 10);

    
    const user = await User.create({
      fullName,
      email,
      phone,
      password: hashedPassword,
    });

    
    return res.status(201).json({
      success: true,
      message: "Account created successfully",
      data: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
      },
    });
  } catch (error) {
                    console.error("Registration error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
// Login
const login = async (req, res) => {
try {
const { identifier, password } = req.body;

// 1. Check required fields
if (!identifier || !password) {
  return res.status(400).json({
    success: false,
    message: "Email/Phone and password are required",
  });
}

// 2. Find user by email or phone
const user = await User.findOne({
  $or: [
    { email: identifier.toLowerCase().trim() },
    { phone: identifier.trim() },
  ],
});

if (!user) {
  return res.status(401).json({
    success: false,
    message: "Invalid email/phone or password",
  });
}

// 3. Compare passwords
const isPasswordCorrect = await bcrypt.compare(
  password,
  user.password
);

if (!isPasswordCorrect) {
  return res.status(401).json({
    success: false,
    message: "Invalid email/phone or password",
  });
}

// 4. Generate JWT Token
const token = jwt.sign(
  { userId: user._id },
  process.env.JWT_SECRET,
  { expiresIn: "7d" }
);

// 5. Send response
return res.status(200).json({
  success: true,
  message: "Login successful",
  data: {
    token,
    user: {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      phone: user.phone,
    },
  },
});

} catch (error) {
                    console.error("Login error:", error);
return res.status(500).json({
success: false,
message: "Server error",
});
}
};

module.exports = {
  register,
                    login,
};