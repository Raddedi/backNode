var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const connectDB = require("./db");
connectDB();

const authRoutes = require('./routes/authRoutes');
var userRoutes = require("./routes/userRoutes");
const boutiqueRoutes = require("./routes/boutiqueRoutes");
const publicationRoutes = require("./routes/publicationRoutes");
const achatRoutes = require('./routes/achatRoutes');
const reclamationRoutes = require("./routes/reclamationRoutes");



const cors = require("cors");

var app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use('/api/auth', authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/boutiques", boutiqueRoutes);
app.use("/api/publication", publicationRoutes);
app.use('/api/achats', achatRoutes);
app.use("/api/reclamations", reclamationRoutes);


module.exports = app;
