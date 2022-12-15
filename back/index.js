const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors")
const db = require("./db/config");
const cookieParser = require("cookie-parser");
const models = require("./models/index");
const routes = require("./routes/index");

const port = 3001;

app.use(express.json());
app.use(cookieParser());
app.use(morgan("tiny"));
app.use(express.static("src"));
app.use(cors())

app.use("/api", routes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Se ha producido un error');
});

db.sync({ force: false }).then(() => {
  app.listen(port, () => {
    console.log("Escuchando en el puerto ", port);
  });
});
