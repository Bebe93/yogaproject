var express = require("express");
var router = express.Router();
const bodyParser = require("body-parser");
const db = require("../model/helper");

router.use(bodyParser.json());

// get yoga style by id from yoga_styles
router.get("/:id", async function (req, res) {
  const { id } = req.params;
  console.log(id);
  try {
    const response = await db(`SELECT * FROM yoga_styles WHERE id=${id};`);
    res.send(response.data);
  } catch (err) {
    res.send(err);
  }
});

// get everything from yoga_styles
router.get("/", async function (req, res) {
  try {
    const response = await db("SELECT * FROM yoga_styles;");
    res.send(response.data);
  } catch (err) {
    res.send(err);
  }
});

// add a new dance style
router.post("/", async function (req, res) {
  console.log("here?");
  const name = req.body.name;
  const description = req.body.description;
  const image = req.body.image;

  try {
    const response = await db(
      `INSERT INTO yoga_styles (name, description, image) VALUES ("${name}", "${description}", "${image}");`
    );
    res.send({ message: "style added successfully" });
  } catch (err) {
    res.send(err);
  }
});

// update an existing dance style
router.put("/:id", async function (req, res) {
  try {
    const { id } = req.params;
    const currRecord = await db(`SELECT * FROM yoga_styles WHERE id="${id}";`);
    const newRecord = { ...currRecord, ...req.body };
    const response = await db(
      `UPDATE yoga_styles SET name="${newRecord.name}", description="${newRecord.description}", image="${newRecord.image}" WHERE id="${id}";`
    );
    res.send({ message: "Record updated successfully" });
  } catch (err) {
    res.send(err);
  }
});

// delete a dance style
router.delete("/:id", async function (req, res) {
  const { id } = req.params;
  try {
    const response = await db(`DELETE FROM yoga_styles WHERE id="${id}";`);
    res.send({ message: "Record deleted successfully." });
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;
