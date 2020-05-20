var mongoose = require('mongoose');
// define schema
var Schema = mongoose.Schema;
var studentschema = new Schema({
	id:{type: Number, min: 1,max: 20,required: true},
	name:{type:String, lowercase:true,uppercase:true,required:true,array:[]
}

});
module.exports={student:mongoose.model('student',studentschema)}