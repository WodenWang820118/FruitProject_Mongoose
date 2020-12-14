const mongoose = require('mongoose');

// to connect the mongoose database
// if not existed, create new one
// issues: https://bit.ly/3gJOR3f 
mongoose.connect('mongodb://localhost:27017/fruitsDB', {useNewUrlParser: true, useUnifiedTopology: true});

const fruitsSchema = new mongoose.Schema({
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
});

// the schema name needs to be sigular
// the database will render it to the plural
const Fruit = mongoose.model("Fruit", fruitsSchema);

const kiwi = new Fruit({
    name:"kiwi",
    score:5,
    review:"not bad"
});

const apple = new Fruit({
    name:"apple",
    score:7,
    review: "solid"
});

const banana = new Fruit({
    name:"banana",
    score:4,
    review: "good starch source"
});

// Fruit.insertMany([kiwi, apple, banana], function(err){
//     if (err){ console.log(err);} else {console.log("upload successfully");}
// });

const fruit = new Fruit({
    score:8,
    review:"sweet"
});

//fruit.save();

Fruit.deleteOne({name:"apple"}, function(err){
    if(err) {console.log(err);} else {console.log("succcessfully delete the document");}
});

Fruit.find(function(err, fruits){
    if (err){
        console.log(err);
    } else {
        // good practice to close the connection
        mongoose.connection.close();
        fruits.forEach(function(fruit){
            console.log(fruit.name);
        });
    }
});