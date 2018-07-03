
// Initialize Firebase
var config = {
    apiKey: "AIzaSyADwauZYhjCNRoNH6nktTj2Dq4wrHGSfTs",
    authDomain: "train-scheduler-89f2d.firebaseapp.com",
    databaseURL: "https://train-scheduler-89f2d.firebaseio.com",
    projectId: "train-scheduler-89f2d",
    storageBucket: "train-scheduler-89f2d.appspot.com",
    messagingSenderId: "505188290778"
  };

  firebase.initializeApp(config);

var database = firebase.database();

var name = "";
var destination = "";
var firstArrival = "";
var frequency = "";

// snapshot.forEach(function(child) {
//   $(".table").append("<tr><td>" + sv.name + "</td><td>" + sv.destination + "</td><td>" + sv.frequency + "</td><td>" + next + "</td><td>" + mAway + "</td></tr>") ;
// })

$(document).on("click", "#add", function(){
    event.preventDefault();

      name = $("#train-name").val().trim();
      destination = $("#destination").val().trim();
      firstArrival = $("#first-arrival").val().trim() + ":00";
      frequency = $("#frequency").val().trim();

    // console.log(name);
    // console.log(destination);
    // console.log(firstArrival);
    // console.log(frequency);

    database.ref().push({
        name: name,
        destination: destination,
        firstArrival: firstArrival,
        frequency: frequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
  });

  database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {
    var sv = snapshot.val();
    
    var arrive = moment(firstArrival, 'HH:mm');
    var currentTime = moment().format("HH:mm");
    console.log(currentTime);

    console.log(arrive);
    
    var duration = moment().diff(moment(arrive), 'minutes');

    console.log(duration);

    var next = duration % frequency;
    
    var mAway = frequency - duration;

    console.log(next);

    var nextTrain = moment().add(mAway, 'minutes').format('HH:mm');

      $(".table").append("<tr><td>" + sv.name + "</td><td>" + sv.destination + "</td><td>" + sv.frequency + "</td><td>" + nextTrain + "</td><td>" + mAway + "</td></tr>") ;

    //   console.log(snapshot.val());
      
    })