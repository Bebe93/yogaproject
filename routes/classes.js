var express = require("express");
var router = express.Router();
const bodyParser = require("body-parser");
const db = require("../model/helper");

router.use(bodyParser.json());

// get all info or user selection from classes
router.get("/", async function (req, res) {
  console.log("I am here.");
  let searchStmt = [];

  if (req.query) {
    console.log(req.query);

    const { id, style, day } = req.query;
    if (id) {
      if (searchStmt.length > 0) searchStmt.push(`AND id="${id}"`);
      else {
        searchStmt.push(`WHERE id="${id}"`);
      }
    }

    if (style) {
      if (searchStmt.length > 0) searchStmt.push(`AND style="${style}"`);
      else {
        searchStmt.push(`WHERE style="${style}"`);
      }
    }
    if (day) {
      if (searchStmt.length > 0) searchStmt.push(`AND day="${day}"`);
      else {
        searchStmt.push(`WHERE day="${day}"`);
      }
    }
    if (partner) {
      if (searchStmt.length > 0) searchStmt.push(`AND partner="${partner}"`);
      else {
        searchStmt.push(`WHERE partner="${partner}"`);
      }
    }
  }

  try {
    console.log("inside try");
    // const response = await db(`SELECT * FROM classes ${searchStmt.join("")};`);

    const response = await db(
      `SELECT c.id, c.name, d.name AS style, c.day, c.time, c.address, c.price, c.image, i.name AS instructor, i.photo FROM classes AS c LEFT JOIN dance_styles AS d ON c.style=d.id LEFT JOIN instructors AS i ON c.instructor=i.id ${searchStmt.join(
        ""
      )};`
    );

    console.log(response.data);
    res.send(response.data);
  } catch (err) {
    res.send(err);
  }
});

//Testing LEFT JOIN
// router.get('/', async function(req, res) {

//     try{

//     //works
//     // const response = await db(`SELECT c.id, d.name, d.video_url, d.description, c.day, c.time FROM classes AS c INNER JOIN dance_styles AS d ON c.style=d.id`);

//     //also works
//     const response = await db(`SELECT c.id, c.name, d.name AS style, c.day, c.time, c.address, c.partner, c.price, i.name AS instructor FROM classes AS c LEFT JOIN dance_styles AS d ON c.style=d.id LEFT JOIN instructors AS i ON c.instructor=i.id`);

//     console.log(response.data)
//     res.send(response.data);
//   }catch(err){
//     res.send(err);
//   }
// })

// INNER JOIN:
// --From your example, IdTableA is the foreign key in Table B which relates it to a record
// --in Table A, you would want to Inner Join on that to link it to Table A
// --Alias your table''s with a and b and then select the appropriate columns from each

// select a.[Id], a.[Name], b.[NickName], b.[DateStart]
// from [Table_A] AS a
// LEFT JOIN [Table_B] AS b    //changed from inner to left
// ON b.[IdTableA] = a.[Id]

// https://stackoverflow.com/questions/53528044/join-two-tables-on-express-api

// add a new class
router.post("/", async function (req, res) {
  const name = req.body.name;
  const day = req.body.day;
  const time = req.body.time;
  const address = req.body.address;
  const price = req.body.price;
  const style = req.body.style;
  const instructor = req.body.instructor;
  const image = req.body.image;

  try {
    const response = await db(
      `INSERT INTO classes (name, day, time, address, price, style, instructor, image) VALUES ("${name}", "${day}", "${time}", "${address}", "${price}", "${style}", "${instructor}", "${image}");`
    );
    res.send({ message: "Class added successfully" });
  } catch (err) {
    res.send(err);
  }
});

// update an existing class
router.put("/:id", async function (req, res) {
  try {
    const { id } = req.params;
    const currRecord = await db(`SELECT * FROM classes WHERE id="${id}";`);
    const newRecord = { ...currRecord, ...req.body };
    const response = await db(
      `UPDATE classes SET name="${newRecord.name}", day="${newRecord.day}", time="${newRecord.time}", address="${newRecord.address}", price="${newRecord.price}", style="${newRecord.style}", instructor="${newRecord.instructor}", image="${newRecord.image}" WHERE id="${id}";`
    );
    res.send({ message: "Record updated successfully" });
  } catch (err) {
    res.send(err);
  }
});

// delete a class
router.delete("/:id", async function (req, res) {
  const { id } = req.params;
  try {
    const response = await db(`DELETE FROM classes WHERE id="${id}";`);
    res.send({ message: "Class deleted successfully." });
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;
