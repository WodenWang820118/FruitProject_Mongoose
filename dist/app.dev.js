"use strict";

var mongoose = require('mongoose'); // to connect the mongoose database
// if not existed, create new one
// issues: https://bit.ly/3gJOR3f 


mongoose.connect('mongodb://localhost:27017/fruitsDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}); //define schema

var fruitsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  score: {
    type: Number,
    min: 0,
    max: 10
  },
  review: String
}); // the schema name needs to be sigular
// the database will render it to the plural

var Fruit = mongoose.model("Fruit", fruitsSchema); // const kiwi = new Fruit({
//     name:"kiwi",
//     score:5,
//     review:"not bad"
// });
// const apple = new Fruit({
//     name:"apple",
//     score:7,
//     review: "solid"
// });
// const banana = new Fruit({
//     name:"banana",
//     score:4,
//     review: "good starch source"
// });
// Fruit.insertMany([kiwi, apple, banana], function(err){
//     if (err){ console.log(err);} else {console.log("upload successfully");}
// });
// delete operation in the CRUD
// Fruit.deleteOne({name:"apple"}, function(err){
//     if(err) {console.log(err);} else {console.log("succcessfully delete the document");}
// });

var peach = new Fruit({
  name: "peach",
  score: 8,
  review: "sweet"
}); //peach.save();
//define another schema connected to the fruitsSchema

var personsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  favoriteFruit: fruitsSchema
});
var Person = mongoose.model("Person", personsSchema);
var john = new Person({
  name: "John",
  age: 37,
  favoriteFruit: peach
});
john.save();
Fruit.find(function (err, fruits) {
  if (err) {
    console.log(err);
  } else {
    // good practice to close the connection
    mongoose.connection.close();
    fruits.forEach(function (fruit) {
      console.log(fruit.name);
    });
  }
});