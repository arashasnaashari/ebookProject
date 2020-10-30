const express = require("express");
// const monk = require("monk");
// const graphHTTP = require("express-graphql");
const monk = require("monk");
const Joi = require("@hapi/joi");
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
//Connection DB
const db = monk(
  "mongodb+srv://admin:admin@cluster0.dcr08.mongodb.net/test?retryWrites=true&w=majority"
);
const coll = db.get("test");

// schema;
const schema = Joi.object({
  name: Joi.string().trim().required(),
});

app.get("/", async (req, res) => {
  try {
    const items = await coll.find({});
    res.json(items);
  } catch (error) {
    console.log(error);
  }
});

app.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const item = await coll.findOne({
      _id: id,
    });
    if (!item) {
      res.json({ msg: "nnnnn" });
    }
    if (item) {
      res.json(item);
    }
  } catch (error) {}
});

app.post("/", async (req, res) => {
  try {
    console.log(req.body.name);
    const value = await schema.validateAsync(req.body);
    const inserted = await coll.insert(value);

    res.json(inserted);
  } catch (error) {
    console.log(error);
    res.end();
  }
});

app.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    // const value = await schema.validateAsync(req.body);
    const updated = await coll.update(
      {
        _id: id,
      },
      {
        $set: { name: req.body },
      }
    );

    res.json(updated);
  } catch (error) {
    console.log(error);
    res.end();
  }
});

app.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await coll.remove({ _id: id });

    res.json({ msg: "Succ" });
  } catch (error) {
    console.log(error);
    res.end();
  }
});

app.listen(5000, console.log("!!!!!!!!!!!"));

// router.route('/update').post(function(req,res){

//   kennels.findByIdAndUpdate({"5db6b26730f133b65dbbe459"},{"breed": "Great Dane"}, function(err, result){

//       if(err){
//           res.send(err)
//       }
//       else{
//           res.send(result)
//       }

//   })
// })
