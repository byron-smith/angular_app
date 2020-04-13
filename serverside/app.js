const express = require('express');
const mongoose = require('mongoose');
//specify where to find the schema
const Student = require('./models/student.js')
const app = express();
const bodyParser  = require('body-parser');

// connect and display the status

mongoose.connect('mongodb://localhost:27017/IT6203', { useNewUrlParser: true })
  .then(() => { console.log("connected"); })
  .catch(() => { console.log("error connecting"); });


// use the following code on any request that matches the specified mount path
app.use((req, res, next) => {
   console.log('This line is always called');
   res.setHeader('Access-Control-Allow-Origin', '*'); //can connect from any host
   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS, DELETE'); //allowable methods
   res.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
   next();
});
app.get('/students', (req, res, next) => {
  //call mongoose method find (MongoDB db.Students.find())
  Student.find() 
    //if data is returned, send data as a response 
    .then(data => res.status(200).json(data))
    //if error, send internal server error
    .catch(err => {
    console.log('Error: ${err}');
    res.status(500).json(err);
  });
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

// serve incoming post requests to /students
app.post('/students', (req, res, next) => {
  // create a new student variable and save request’s fields 
  const student = new Student({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    inquiry: req.body.inquiry
  });
  //send the document to the database 
  student.save()
    //in case of success
    .then(() => { console.log('Success');})
    //if error
    .catch(err => {console.log('Error:' + err);});
  });

//:id is a dynamic parameter that will be extracted from the URL
app.delete("/students/:id", (req, res, next) => {
  Student.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    res.status(200).json("Deleted!");
  });
});

// serve incoming put requests to /students
app.put('/students/:id', (req, res, next) => {
  console.log("id: " + req.params.id)
  // check that the parameter id is valid 
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    //find a document and set new first and last names
    Student.findOneAndUpdate({_id: req.params.id},
      {$set:{
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        inquiry : req.body.inquiry
      }},{new:true}) 
     .then((student) => {
        if (student) { //what was updated
          console.log(student);
        } else {
          console.log("no data exist for this id");
        }
     })
    .catch((err) => {
      console.log(err);
     });
 } else {
   console.log("please provide correct id");
 }
  
});  

  
//to use this middleware in other parts of the application
module.exports=app;
