const express = require("express");
const app = express();
const dotenv = require("dotenv");
const userRoute = require("./routes/users");
const promptCategoriesRoute = require("./routes/promptCategory");
const promptRoute = require("./routes/prompt");
const responseRoute = require("./routes/response");
const authRoute = require("./routes/auth");
const testRoute = require("./routes/test");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const corsOptions = require("./config/corsOptions");

app.use(cors(corsOptions));

dotenv.config();

app.use(express.json());

app.use(cookieParser());

// Swagger documentation
require("./swagger")(app);

// ROUTES PRISMA
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/promptCategories", promptCategoriesRoute);
app.use("/api/prompts", promptRoute);
app.use("/api/responses", responseRoute);
app.use("/api/test", testRoute);

// LISTEN TO PORT
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running at PORT ${PORT} | http://localhost:${PORT}/`);
});

module.exports = app;
