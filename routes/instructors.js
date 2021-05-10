var express = require("express");
var router = express.Router();
const bodyParser = require("body-parser");
const db = require("../model/helper");
var fs = require("fs/promises");
var path = require("path");
const mime = require("mime-types");
const { v4: uuidv4 } = require("uuid");

router.use(bodyParser.json());

// get everything from instructors
router.get("/", async function (req, res) {
  try {
    const response = await db("SELECT * FROM instructors;");
    res.send(response.data);
  } catch (err) {
    res.send(err);
  }
});

// add a new instructor
router.post("/", async function (req, res) {
  const name = req.body.name;
  const introduction = req.body.introduction;
  const email = req.body.email;
  const imagefile = req.files;
  const extension = mime.extension(imagefile.mimetype);
  const filename = uuidv4() + "." + extension;
  const tmp_path = imagefile.tempFilePath;
  const target_path = path.join(__dirname, "../public/img") + filename;

  try {
    await fs.rename(tmp_path, target_path);
    await db(
      `INSERT INTO instructors (name, introduction, email, photo) VALUES ("${name}", "${introduction}", "${email}", "${filename}");`
    );
    getImages(req, res);
    res.send({ message: "Instructor added successfully" });
  } catch (err) {
    res.send(err);
  }
});

// update an existing instructor
router.put("/:id", async function (req, res) {
  try {
    const { id } = req.params;
    const currRecord = await db(`SELECT * FROM instructors WHERE id="${id}";`);
    const newRecord = { ...currRecord, ...req.body };
    const response = await db(
      `UPDATE instructors SET name="${newRecord.name}", introduction="${newRecord.introduction}", email="${newRecord.email}", photo="${newRecord.photo}" WHERE id="${id}";`
    );
    res.send({ message: "Record updated successfully" });
  } catch (err) {
    res.send(err);
  }
});

// delete an instructor
router.delete("/:id", async function (req, res) {
  const { id } = req.params;
  try {
    const response = await db(`DELETE FROM instructors WHERE id="${id}";`);
    res.send({ message: "Record deleted successfully." });
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;
