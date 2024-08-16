var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors()); //allow all origin(domain/port)

//public path
app.use(express.static(path.join(__dirname, "public")));

//using routes
app.use("/api/todos", require("./routes/todos"));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  console.log(res.locals.message);
  // send the error page
  res.status(err.status || 500).json({
    status: err.status || 500,
    message: err.message,
    error: res.locals.error,
  });
});

module.exports = app;
