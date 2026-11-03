const express = require("express");
const router = express.Router();

const { register } = require("./controller");
const { login } = require("./controller");                  

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fullName
 *               - email
 *               - phone
 *               - password
 *               - confirmPassword
 *             properties:
 *               fullName:
 *                 type: string
 *                 example: Ahmed Ezz
 *               email:
 *                 type: string
 *                 example: ahmed@example.com
 *               phone:
 *                 type: string
 *                 example: "01012345678"
 *               password:
 *                 type: string
 *                 example: Ahmed12345
 *               confirmPassword:
 *                 type: string
 *                 example: Ahmed12345
 *     responses:
 *       201:
 *         description: Account created successfully
 *       400:
 *         description: Invalid input or passwords do not match
 *       409:
 *         description: Email or phone already exists
 *       500:
 *         description: Server error
 */
router.post("/register", register);
/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login user using email or phone
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - identifier
 *               - password
 *             properties:
 *               identifier:
 *                 type: string
 *                 example: ahmed@example.com
 *               password:
 *                 type: string
 *                 example: Ahmed12345
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Missing required fields
 *       401:
 *         description: Invalid email/phone or password
 *       500:
 *         description: Server error
 */
router.post("/login", login);
module.exports = router;