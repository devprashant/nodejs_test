var mongoose = require("mongoose");
var Schedule = mongoose.model("Schedule");
var Subject = mongoose.model("Subject");



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
          console.log('Full Schedule' + fullSchedule);
          //return res.end(JSON.stringify(subjects));
          res.send(JSON.parse(JSON.stringify(fullSchedule)));
        } else {
          res.redirect('/subject/all?404=error');
        }
    });
};