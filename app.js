var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var fileUpload = require("express-fileupload");

var indexRouter = require("./routes/index");
var yogaStylesRouter = require("./routes/yoga-styles");
var instructorsRouter = require("./routes/instructors");
var classesRouter = require("./routes/classes");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "./tmp/",
  })
);
// app.use(express.static(path.join(__dirname, 'public')));
// not too sure why - ask
app.use(express.static(path.join(__dirname, "client/build")));
app.use(express.static("public"));

app.use("/", indexRouter);
app.use("/yogastyles", yogaStylesRouter);
app.use("/instructors", instructorsRouter);
app.use("/classes", classesRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send("error");
});

module.exports = app;
