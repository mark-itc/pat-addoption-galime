const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const dotenv = require("dotenv");
const cors = require("cors");
const tokenValidation = require("./middleware/tokenValidation");
const dbConnection = require("./database/conection");
const petRoutes = require("./routes/petRoutes");
const userRoutes = require("./routes/userRoutes");
const cookiesMiddleware = require("universal-cookie-express");

dotenv.config();

const app = express();

dbConnection();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer({ dest: "images" }).single("img"));

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

var upload = multer({ storage: storage });

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Method", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.get("/helloworls", (req, res) => {
  var username = req.body.userName;
  res.send("the resived value of user name is" + username);
});

app.post("/getData", tokenValidation.validateToken, (req, res) => {
  var username = req.body.userName;
  res.send("the resived value of user name is" + username);
});

app.get("/", (req, res, next) => {
  res.send("Hello you all!");
});
app.use("/pet", petRoutes);
app.use("/user", userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT);
