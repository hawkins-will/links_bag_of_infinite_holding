const mongoose = require('mongoose');
const ItemSchema = new mongoose.Schema(
  {
    name: String,
    type: String,
    photoUrl: String,
    rupees: Number
  }
)

mongoose.model("Item", ItemSchema)
mongoose.connect("mongodb://localhost/linkbag")

module.exports = mongoose
