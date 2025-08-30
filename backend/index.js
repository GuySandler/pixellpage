const express = require('express');
const app = express();

const {hotReloadMiddleware} = require("@devmade/express-hot-reload");
app.use(
	hotReloadMiddleware({
		watchFolders: ["./"],
		ignorePatterns: ["node_modules/**", ".git/**", "**database.db"],
		verbose: true,
	})
);

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;

app.use(cors());
app.use(bodyParser.json());

const db = require("better-sqlite3")("database.db")

const rateLimit = require("express-rate-limit");
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	max: 200,
});
app.use(limiter);

app.get("/api/ping", (req, res) => {
	res.json({ message: "pong" });
});
app.post("/api/newdb", (req, res) => {
	db.exec("DROP TABLE IF EXISTS users");
	db.exec("DROP TABLE IF EXISTS ysws");

	db.exec(`
		CREATE TABLE IF NOT EXISTS users (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		username TEXT UNIQUE NOT NULL,
		passwordHash TEXT NOT NULL,
		rank INTEGER DEFAULT 0,
		created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
		)
  	`);
	// db.exec(`
	// 	CREATE TABLE IF NOT EXISTS ysws (
	// 	id INTEGER PRIMARY KEY AUTOINCREMENT,
	// 	name TEXT NOT NULL,
	// 	description TEXT,
	// 	startdate TEXT,
	// 	enddate TEXT,
	// 	owner INTEGER NOT NULL,
	// 	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
	// 	)
  	// `);
	res.sendStatus(200);
});
app.post("/api/register", (req, res) => {
	if (!req.body) {
		return res.status(400).json({ message: "No request body received" });
	}
	const { username, password } = req.body;

	if (!username || !password) {
		return res.status(400).json({ message: "Username and password are required" });
	}

	const existingUser = db.prepare("SELECT * FROM users WHERE username = ?").get(username);
	if (existingUser) {
		return res.status(400).json({ message: "User already exists" });
	}

	const passwordHash = bcrypt.hashSync(password, 10);
	db.prepare("INSERT INTO users (username, passwordHash) VALUES (?, ?)").run(username, passwordHash);
	res.sendStatus(201).json({ message: "User registered successfully" });
});
app.post("/api/login", (req, res) => {
	if (!req.body) {
		return res.status(400).json({ message: "No request body received" });
	}

	const { username, password } = req.body;
	if (!username || !password) {
		return res.status(400).json({ message: "Username and password are required" });
	}

	const user = db.prepare("SELECT * FROM users WHERE username = ?").get(username);
	if (!user) {
		return res.status(401).json({ message: "Invalid username or password" });
	}

	if (!bcrypt.compareSync(password, user.passwordHash)) {
		return res.status(401).json({ message: "Invalid username or password" });
	}

	const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "1h" });
	res.json({ token: token, message: "Login successful"});
});

app.listen(3000, () => {
	console.log("Server is running on http://localhost:3000");
});
