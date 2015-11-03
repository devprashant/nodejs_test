var mongoose = require("mongoose");
var Schedule = mongoose.model("Schedule");
var Subject = mongoose.model("Subject");

function getCurrentTimeUTC(){
    //RETURN:
    //      = number of milliseconds between current UTC time and midnight of January 1, 1970
    var tmLoc = new Date();
    //The offset is in minutes -- convert it to ms
    return tmLoc.getTime() + tmLoc.getTimezoneOffset() * 60000;
}

function getDayToday(){
//Convert time to Indian Standard Time
var IST = new Date(getCurrentTimeUTC()); // Clone UTC Timestamp
IST.setHours(IST.getHours() + 5); // set Hours to 5 hours later
IST.setMinutes(IST.getMinutes() + 30); // set Minutes to be 30 minutes later

var day = IST.getDay();
//update day at 5 pm each day
// for distributing next day schedule
console.log("day:", day);
if (IST.getHours() > 16 ) {
    day = day + 1;
    if (day == 7) day = 1;
    console.log('processed day value:',day);
}

if (day == 0) day = 1;

console.log("day now for data processing:", day);
console.log("IST Time:", IST.getDay() + " " + IST.getHours() + " " + IST.getMinutes());
console.log("server time: ", (new Date()).getDay() + " " + (new Date()).getHours() + " " + (new Date()).getMinutes());
return day;
}
function getTodayName(day){
    var dayToday = "Monday";
    
    switch(day){
    case 1:
        dayToday = "Monday";
        break;
    case 2:
        dayToday = "Tuesday";
        break;
    case 3:
        dayToday = "Wednesday";
        break;
    case 4:
        dayToday = "Thursday";
        break;
    case 5:
        dayToday = "Friday";
        break;
    case 6:
        dayToday = "Saturday";
        break;
    case 7:
        dayToday = "Monday";
        break;
    default:
        //readFile(path.normalize(__dirname + '/cse/exam.json'));
        break;
    }
    return dayToday;
}

function serveSchedule(Schedule, typeofSchedule,res){
    console.log(typeofSchedule + " " + Schedule);
          //return res.end(JSON.stringify(subjects));
          res.send(JSON.parse(JSON.stringify(Schedule)));
}

exports.doCreate= function(req, res){
    Schedule.create({
        department: req.body.department
        ,branch: req.body.branch
        ,semester: req.body.semester
        ,group: req.body.group
        ,subject_name: req.body.subjectName
        ,room_no: req.body.roomNumber
        ,lecturer: req.body.lecturer
        ,day: req.body.day
        ,slot: req.body.slot
        ,lecturer: req.body.lecturer
        ,modified_on: Date.now()
    }, function(err, schedule){
        if (err){
            console.log(err);
            if(err.code === 11000){
                res.redirect('/schedule/new?exists=true');
            } else {
                res.redirect('/?error=true');
            }
        } else {
            //Success
            console.log("Schedule created and saved: " + schedule);
            res.redirect('/schedule/new'); // Redirect user to add new subject
        }
    });
};

exports.create = function(req, res){
    Subject.find(
    {}
    ,'_id subject_name subject_code'
    ,function(err, allSubjects){
        if (!err){
          //console.log('All subjects:' + allSubjects);
          res.render('schedule-form', {
             title: 'Add Schedule'
             ,buttonText: 'Thats it!'
             ,days: ['Monday', 'Tuesday','Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
             ,subjects: allSubjects
          });
        } else {
          res.redirect('/subject/all?404=error');
        }
    });
    
};

exports.doList= function(req, res){
   Schedule.find(
    {}
    ,function(err, fullSchedule){
        if (!err){
          serveSchedule(fullSchedule, "Full Schedule", res);
        } else {
          res.redirect('/schedule/all?404=error');
        }
    });
};

exports.doListToday =function (req, res){
   Schedule.find(
    {day: getTodayName(getDayToday())}
    ,function(err, todaySchedule){
        if (!err){
          serveSchedule(todaySchedule, "Today\'s Schedule", res);
        } else {
          res.redirect('/schedule/me?404=error');
        }
    });
};

exports.doListTodayByName = function (req, res){
   
   Schedule.find(
    { day: getTodayName(getDayToday())
      ,lecturer: req.query.lecturer  
    }
    ,function(err, todaySchedule){
        if (!err){
          serveSchedule(todaySchedule, "Today\'s  Schedule", res);
        } else {
          res.redirect('/schedule/today?404=error');
        }
    });
};

exports.doListNextByName = function (req, res){
    
   Schedule.find(
    { day: getTodayName(getDayToday() + 1)
      ,lecturer: req.query.lecturer  
    }
    ,function(err, nextDaySchedule){
        if (!err){
          serveSchedule(nextDaySchedule, "Next day\'s Schedule", res);
        } else {
          res.redirect('/schedule/nextday?404=error');
        }
    });
};

exports.doListLaterByName = function (req, res){
    
   Schedule.find(
    { day: getTodayName(getDayToday() + 2) 
      ,lecturer: req.query.lecturer  
    }
    ,function(err, laterDaySchedule){
        if (!err){
          serveSchedule(laterDaySchedule, "Later Day\'s Schedule", res);
        } else {
          res.redirect('/schedule/later?404=error');
        }
    });
};


exports.doListTodayByRoom = function (req, res){
   Schedule.find(
    { day: getTodayName(getDayToday())
      ,room_no: req.query.room_no 
    }
    ,function(err, todayScheduleByRoom){
        if (!err){
          serveSchedule(todayScheduleByRoom, "Today\'s  Schedule by room", res);
        } else {
          res.redirect('/schedule/today?404=error');
        }
    });
};

exports.doListTodayByClass = function (req, res){
   Schedule.find(
    { day: getTodayName(getDayToday())
      ,semester: req.query.semester
      ,branch: req.query.branch
      ,group: req.query.group
    }
    ,function(err, todayScheduleByClass){
        if (!err){
          serveSchedule(todayScheduleByClass, "Today\'s  Schedule by class", res);
        } else {
          res.redirect('/schedule/today?404=error');
        }
    });
};

exports.doListTodayByExamType = function (req, res){
   Schedule.find(
    { day: getTodayName(getDayToday())
      ,semester: req.query.semester
      ,branch: req.query.branch
      ,class_type: req.query.class_type
    }
    ,function(err, todayScheduleByExamType){
        if (!err){
          serveSchedule(todayScheduleByExamType, "Today\'s  Schedule by class", res);
        } else {
          res.redirect('/schedule/today?404=error');
        }
    });
};