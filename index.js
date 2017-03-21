const express = require("express")
const parser = require('body-parser')
const mongoose = require('./db/connection');

const app = express()

const Item = mongoose.model("Item")

app.set("port", process.env.PORT || 3001)
app.use("/assets", express.static("public"))
app.use(parser.json({extended: true}))

app.get("/", function(req, res){
  res.render("welcome")
})

app.listen(app.get("port"), function(){
  console.log("It's dangerous to go alone. Take this.");
})
