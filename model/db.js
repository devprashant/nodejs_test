var mongoose = require("mongoose");
var dbURI ="mongodb://test:test123@ds031601.mongolab.com:31601/nodejs_mongodb";

mongoose.connect(dbURI);

//Catching the connection events
mongoose.connection.on('connected', function(){
   console.log('Mongoose connected to ' + dbURI); 
});

mongoose.connection.on('error', function(err) {
   console.log('Mongoose connection error:' + err);
});

mongoose.connection.on('disconnected', function() {
   console.log('Mongoose disconnected') ;
});

process.on('SIGINT', function(){
   mongoose.connection.close(function(){
      console.log('Mongoose disconnected through app termination');
      process.exit(0);
   }); 
});


/*************************************************************************
                Schedule Schema
**************************************************************************/

var ScheduleSchema = new mongoose.Schema({
   department: String
   ,branch: String
   ,semester: Number
   ,group: Number
   ,subject_name: String
   ,class_type: String
   ,room_no: String
   ,lecturer: String
   ,day: String
   ,slot: Number
   ,created_on: { type: Date, default: Date.now }
   ,modified_on: Date
});

mongoose.model('Schedule', ScheduleSchema);

/*************************************************************************
            Subject Schema
**************************************************************************/

var SubjectSchema = new mongoose.Schema({
      subject_name: String
      ,subject_code: { type:String, unique: true }
      ,created_on: { type: Date, default: Date.now }
      ,modified_on: Date
      
});

mongoose.model('Subject', SubjectSchema);

/**************************************************************************
               Member Schema
**************************************************************************/

var UserSchema = new mongoose.Schema({
   email: String
   ,name: String
   ,semester: Number
   ,branch: String
   ,group: String
   ,roll_no: String
   ,gcm_id: String
   ,department: String
});

mongoose.model('User', UserSchema);


