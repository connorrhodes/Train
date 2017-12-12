
// Initialize Firebase
var config = {
    apiKey: "AIzaSyD9akS9Ux1fmnz9k5bBtqW5x53IScR3KCU",
    authDomain: "fir-1-f3c4f.firebaseapp.com",
    databaseURL: "https://fir-1-f3c4f.firebaseio.com",
    projectId: "fir-1-f3c4f",
    storageBucket: "fir-1-f3c4f.appspot.com",
    messagingSenderId: "64732880523"
  };
  // <th>Train Name</th>
  // <th>Destination</th>
  // <th>Start Time</th>
  // <th>Frequency</th>
  // <th>Minutes</th>
  
  firebase.initializeApp(config);
  
  var database = firebase.database();
  
  // 2. Button for adding Employees
  $("#add-employee-btn").on("click", function(event) {
    event.preventDefault();
  
    // Grabs user input
    var trainName = $("#employee-name-input").val().trim();
    var destination = $("#role-input").val().trim();
    var startTime = moment($("#start-input").val().trim(), "DD/MM/YY").format("X");
    var frequency = $("#rate-input").val().trim();
  
    // Creates local "temporary" object for holding employee data
    var newTrain = {
      name: trainName,
      role: destination,
      start: startTime,
      rate: frequency
    };
  
    // Uploads employee data to the database
    database.ref().push(newTrain);
  
    // Logs everything to console
    console.log(newTrain.name);
    console.log(newTrain.role);
    console.log(newTrain.start);
    console.log(newTrain.rate);
  
    // Alert
    alert("Employee successfully added");
  
    // Clears all of the text-boxes
    $("#employee-name-input").val("");
    $("#role-input").val("");
    $("#start-input").val("");
    $("#rate-input").val("");
  });
  
  // 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
  database.ref().on("child_added", function(childSnapshot, prevChildKey) {

    // Determine the current time in military time
    var calculatedCurrentTime = moment.utc(moment().format("HH:mm"));
    
    // convert the frequency to a number
    var frequency = parseInt(snapshot.val().frequency);
    
    // Convert the first train time to a moment object so we can run calculations
    var firstTrainTime = snapshot.val().firstTrain;
    var firstTrainTimeCalculated = moment(firstTrainTime, "HH:mm").subtract(1, "years");
    
    // Calculate the difference from the current time to the time the first train left
    var diffTime = moment().diff(moment(firstTrainTimeCalculated), "minutes");
   
    // Time apart (remainder)
    var timeRemainder = diffTime % frequency;
    
    // Minutes until next train arrives
    var minutesNextTrain = frequency - timeRemainder;
   

    // Next Train
    var nextArrival = moment().add(minutesNextTrain, "minutes");

    
    // Write values from database to the html document
    $(output.newTrain).find("tbody").append($("<tr>").append
        ($("<td>").append(snapshot.val().trainName),
        $("<td>").append(snapshot.val().destination),
        $("<td>").append(snapshot.val().frequency),
        $("<td>").append(moment(nextArrival).format("HH:mm")),
        $("<td>").append(minutesNextTrain)
       
        )
      );
  
    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var destination = childSnapshot.val().role;
    var startTime = childSnapshot.val().start;
    var frequency = childSnapshot.val().rate;
  
    // Employee Info
    console.log(trainName);
    console.log(destination);
    console.log(startTime);
    console.log(frequency);
  
    // Prettify the employee start
    var startTimePretty = moment.unix(startTime).format("MM/DD/YY");
  
    // // Calculate the months worked using hardcore math
    // // To calculate the months worked
    // var empMonths = moment().diff(moment.unix(startTime, "X"), "months");
    // console.log(empMonths);
  
    // // Calculate the total billed rate
    // var empBilled = empMonths * frequency;
    // console.log(empBilled);
  
    // Add each train's data into the table
    $("#employee-table > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" +
    startTimePretty + "</td><td>" + empMonths + "</td><td>" + frequency + "</td><td>" + empBilled + "</td></tr>");
  });
  
 