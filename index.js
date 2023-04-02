const express = require("express");
const app = express();
const dotenv = require("dotenv");
const userRoute = require("./routes/users");
const promptCategoriesRoute = require("./routes/promptCategory");
const promptRoute = require("./routes/prompt");
const responseRoute = require("./routes/response");
const authRoute = require("./routes/auth");
const cors = require('cors');
const cookieParser = require('cookie-parser')
const corsOptions = require('./config/corsOptions');

app.use(cors(corsOptions));

dotenv.config();

app.use(express.json());

app.use(cookieParser())

// ROUTES PRISMA
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/promptCategories", promptCategoriesRoute);
app.use("/api/prompts", promptRoute);
app.use("/api/responses", responseRoute);

// LISTEN TO PORT
app.listen("5000", () => {
  console.log("Backend is running.");
});

module.exports = app
