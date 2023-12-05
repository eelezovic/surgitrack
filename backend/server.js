const express = require("express");
const session = require("express-session");
const path = require("path");
const app = express();

app.use(express.json({ limit: "2000mb" }));
app.use(express.static(__dirname + "../dist"));

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: {
      path: "/",
      _expires: null,
      originalMaxAge: null,
      httpOnly: true,
      sameSite: true,
    },
  })
);

//Api route handlers
const instrumentSetsApi = require("./views/SetView.js");
const singleInstrumentsApi = require("./views/InstrumentsViews.js");
const userRoutes = require("./views/users.js");

instrumentSetsApi(app);
singleInstrumentsApi(app);
userRoutes(app);

app.get("*", function (request, response) {
  response.sendFile(path.resolve(__dirname, "../index.html"));
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
