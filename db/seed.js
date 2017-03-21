const mongoose = require('./connection');
const seedData = require('seedData');

var Item = mongoose.model("Item")

Item.remove({}, () => {
  Item.collection.insert(seedData).then(function(){
    process.exit()
  })
})
