const express = require("express")
const parser = require('body-parser')
const hbs = require("express-handlebars")
const mongoose = require('./db/connection')
mongoose.connect(process.env.MONGODB_URI || process.env.MONGOHQ_URL || process.env.MONGOLAB_URI || "mongodb://localhost/linkbag")

const app = express()

const Item = mongoose.model("Item")

app.set("port", process.env.PORT || 3001)
app.set("view engine", "hbs")
app.engine(".hbs", hbs({
  extname:        ".hbs",
  partialsDir:    "views/",
  layoutsDir:     "views/",
  defaultLayout:  "layout"
}))
app.use("/assets", express.static("public"))
app.use(parser.json({extended: true}))

app.get("/", function(req, res){
  res.render("main")
})

app.get("/api/items", function(req, res){
  Item.find({}).then(function(items){
    res.json(items)
  })
})

app.get("/api/items/:name", function(req, res){
  Item.findOne({ name: req.params.name }).then(function(item){
    res.json(item)
  })
})

app.post("/api/items", function(req, res){
  Item.create(req.body).then(function(item){
    res.json(item)
  })
})

app.delete("/api/items/:name", function(req, res){
  Item.findOneAndRemove({ name: req.params.name }).then(function(){
    res.json({ success: true })
  })
})

app.put("/api/items/:name", function(req, res){
  Item.findOneAndUpdate({ name: req.params.name }, req.body, { new: true }).then(function(item){
    res.json(item)
  })
})

app.listen(app.get("port"), function(){
  console.log("It's dangerous to go alone. Take this.");
})
