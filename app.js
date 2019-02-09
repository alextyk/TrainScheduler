// 1. Initialize Firebase
var config = {
    apiKey: "AIzaSyAyTQWzu77AmJN78P5oZSL4zMcCyBu8s4A",
    authDomain: "trainscheduler-ce4e8.firebaseapp.com",
    databaseURL: "https://trainscheduler-ce4e8.firebaseio.com",
    projectId: "trainscheduler-ce4e8",
    storageBucket: "trainscheduler-ce4e8.appspot.com",
    messagingSenderId: "256295333702"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  // 2. Button for adding train
  $("#submit").on("click", function(event) {
    event.preventDefault();
    var trainName = $("#trainname").val().trim();
    var destination = $("#destination").val().trim();
    var firstTime = $("#firsttime").val().trim();
    var frequency = $("#frequency").val().trim();

    var newTrain = {
        name: trainName,
        destination: destination,
        firsttime: firstTime,
        frequency: frequency
    };
    database.ref().push(newTrain);

    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.firsttime);
    console.log(newTrain.frequency);

  });

  database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
  
    
    var trainName = childSnapshot.val().name;
    var destination = childSnapshot.val().destination;
    var firstTime = childSnapshot.val().firsttime;
    var frequency = childSnapshot.val().frequency;
  
    
    console.log(trainName);
    console.log(destination);
    console.log(firstTime);
    console.log(frequency);
    
    
    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    var minutesAway = frequency - (moment().diff(moment(firstTimeConverted), "minutes") % frequency);
    var nextArrival = moment().add(minutesAway, "minutes").format("hh:mm");
    
    

    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(destination),
        $("<td>").text(frequency),
        $("<td>").text(nextArrival),
        $("<td>").text(minutesAway),
      );
    
      // Append the new row to the table
      $(".table > tbody").append(newRow);
  });