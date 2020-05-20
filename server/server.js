'use strict';

const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
let students = require('./students').publicstudents;
//models
const modelstudents = require('./modelstudents').student;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var corsOption={
  orgin:'http://localhost:4200',
  optionSuccessStatus:200
}
app.use(cors(corsOption));
//models
const detail = mongoose.model('detail',{id:Number,name:String});
//db connection
mongoose.connect('mongodb://localhost:27017/studentdetails',{useNewUrlParser:true})

/*app.listen(3001, () => {
  console.log('Server started!');
});*/
// ===== Public Routes =====
//Get all public students
app.get(`/api/students`, (req, res) => {
  modelstudents.collection.createIndex({id:1, name:1})
  modelstudents.collection.insertMany(students,{upsert:true},function(err){
 res.json(students);
console.log('students are here',err);
});
})

// Get an individual public student
app.get(`/api/students/:id`, (req, res) => {
  const student = students.find(student => student.id == req.params.id);
  if (!student) {
    res.json({ message: 'No student found!' });
  }
  res.json(student);
});

// Save a new Student
app.post(`/api/students/add`, (req, res) => {
  const lastStudent = students[students.length - 1].id;

  const student = {
    id: lastStudent + 1,
    name: req.body.name
  }
  modelstudents.collection.insertOne(student,function(err){
//if(err) throw err;
  students.push(student);

  res.json(student);
})
});
// Update a public student
app.put(`/api/students/update`, (req, res) => {
  //let student = students.find(student => student.id == req.params.id);
  modelstudents.findoneUpdate(
  {"id":req.body.id},
  {$set:{"name":req.body.name}},{new: true},function(err,result){
    if(err){
      res.status(500).json(err)
    }else
    res.json(result);

  })
  //student.name = req.body.name;
  //res.json({ message: 'student saved!' });
});

// Delete a public student
app.delete(`/api/students/delete`, (req, res) => {
  const student = students.find(student => student.id == req.params.id);
  const index = students.indexOf(student);
  students.splice(index, 1);
  res.json({ message: 'student deleted' });
});
//search student
app.get('api/students/search/:term',function(req,res){
  const one=req.body.name;
//  const student = students.find(student => student.name == req.params.term);
  console.log("search"+req.params.term);
  students.findone({name: req.params.term},function(err,doc){
//  const index = students.indexOf(student);
    if (err) throw err;
    console.log(" data search"+doc);
    res.json(doc);
  })
});

app.listen(3001, ()=> {
console.log('Listening on localhost:3001');
});