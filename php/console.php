<?php
// Initialize the session
session_start();

// Check if the user is logged in, if not then redirect him to login page
if(!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true){
    header("location: login.php");
    exit;
}


// Include config file
require_once "config.php";

// Define variables and initialize with empty values
$date = $time = "";
$date_err = $time_err = "";

// Processing form data when form is submitted
if($_SERVER["REQUEST_METHOD"] == "POST"){

    // Check if username is empty
    if(empty(trim($_POST["date"]))){
        $username_err = "Please enter date.";
    } else{
        $date = trim($_POST["date"]);
    }

    // Check if password is empty
    if(empty(trim($_POST["time"]))){
        $time_err = "Please enter time.";
    } else{
        $time = trim($_POST["time"]);
    }
    $datetype = new DateTime($date);
    $timetype = new DateTime($time);
    $formatdate = date_format($datetype, 'Y-m-d');
    $formattime = date_format($timetype, 'H:i:s');
    $available = '1';
    $taken = '1';
    $formattime1 = "01:00:00";
    $formatdate1 = "2019-05-07";
    // Validate credentials
    if(empty($date_err) && empty($time_err)){
        // Insert statement
        if(mysqli_query($link,"INSERT INTO availability (id, date, time_section, spots_available, spots_taken)
        VALUES ('','$formatdate','$formattime',$available,$taken)")or die(mysqli_error($link))){
            header("location: console.php");
        } else {
        header("location: console.php");
        }
        }
        }


?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Welcome</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.css">
    <style type="text/css">
        body{ font: 14px sans-serif; text-align: center; }
    </style>
    <link rel="stylesheet" href="/stylesheet/style.css">
    <script src="/js/script.js"></script>
    <script src="/js/schedulemain.js"></script>
    <link rel="stylesheet" href="/stylesheet/jsCalender.css">
    <link rel="stylesheet" href="/stylesheet/jsCalenderclean.css">
</head>
<body>
    <div class="page-header">
        <h1>Hi, <b><?php
        echo htmlspecialchars($_SESSION["username"]); ?></b>.</h1>
    </div>
    <h2>Create Appointment Times</h2>

    <form id="addappt" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>" method="post" style="text-align: left; margin: 40px 0px 40px 50%; transform: translateX(-50%);">
            <div class="form-group <?php echo (!empty($date_err)) ? 'has-error' : ''; ?>">
                <label>Date</label>
                <input type="date" name="date" id="inputdate" class="form-control" value="<?php echo $currdate; ?>">
                <span class="help-block"><?php echo $date_err; ?></span>
            </div>
            <div class="form-group <?php echo (!empty($time_err)) ? 'has-error' : ''; ?>">
                <label>Time</label>
                <input type="time" name="time" id="inputtime" class="form-control">
                <span class="help-block"><?php echo $time_err; ?></span>
            </div>
            <div class="form-group" style="display: flex; height: 35px; padding-left: 5px; padding-right: 5px;">
            </script>
                <input type="submit" class="btn btn-primary" value="Add Appointment" style="margin-right: 10px;">
                <p style="margin: 0px 5px 10px;">
                    <a href="logout.php" class="btn btn-danger">Sign Out</a>
                </p>
            </div>
            <style>
                [type="date"] {
                  background:#fff url(https://cdn1.iconfinder.com/data/icons/cc_mono_icon_set/blacks/16x16/calendar_2.png)  97% 50% no-repeat ;
                }
                [type="date"]::-webkit-inner-spin-button {
                  display: none;
                }
                [type="date"]::-webkit-calendar-picker-indicator {
                  opacity: 0;
                }

                /* custom styles */
                label {
                  display: block;
                }
                input {
                  border: 1px solid #c4c4c4;
                  border-radius: 5px;
                  background-color: #fff;
                  padding: 3px 5px;
                  box-shadow: inset 0 3px 6px rgba(0,0,0,0.1);
                  width: 190px;
                }
            </style>
    </form>

    <div id="schedule">
    </div>
    <script src="/later-master/later.min.js" type="text/javascript"></script>
    <script src="/schedule-master/schedule.min.js" type="text/javascript"></script>
    <script>

        var tasks = [
    {id:1, duration: 30, resources: ['A']},
    {id:2, duration: 60, resources: ['B']}
    ],
    resources = [
    {id: 'A'},
    {id: 'B'}
    ];

    let sch = schedule.create(tasks, resources, null, new Date());

    console.log(sch);
    </script><script type="text/javascript" src="/js/jscalender.js"></script><style>html, body {
    	font-family: "Century Gothic", CenturyGothic, AppleGothic, sans-serif;
    }
    .jsCalendar.clean-theme tbody td.jsCalendar-previous, .jsCalendar.clean-theme tbody td.jsCalendar-next {
    	color: #000;
    	opacity: 0.2;
    }
    #addappt {
        width: fit-content;
    }
    #bookit {
    	float: left;
    	padding-left: 20px;
    }
    #wrapper {
    	margin: 0 auto;
    width: 800px;
    	box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.4);
    }
    #wrapper .jsCalendar table {
    	box-shadow: none;
    }
    .clear {
    	clear: both;
    }
    #events-calendar {
    	float: left;
    }
    #events {
    	float: left;
    	width: 435px;
    	margin: 10px 20px 10px 10px;
    }
    #events .title {
    	padding: 5px 0px;
    	text-align: center;
    	font-weight: bold;
    	border-bottom: 1px solid rgba(0, 0, 0, 0.4);
        clear: right;
    }
    #events .subtitle {
    	padding: 5px 0px;
    	font-size: 14px;
    	text-align: center;
    	color: black;
    }
    #events .list {
    	height: auto;
    	overflow-y: auto;
    	border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    	display: inline-flex;
    	flex-wrap: wrap;
    }
    #events .list .event-item {
    	line-height: 24px;
    	height: 24px;
    	padding: 2px 5px 2px 5px;
    	background-color: green;
    	width: 120px;
    	font-size: 22px;
    	font-style: normal;
    	border: 1px solid black;
    	margin: 5px;
    	cursor: pointer;
    }
    #events .list .event-item .close {
    	font-family: Tahoma, Geneva, sans-serif;
    	font-weight: bold;
    	font-size: 12px;
    	color: #000;
    	border-radius: 8px;
    	height: 14px;
    	width: 14px;
    	line-height: 12px;
    	text-align: center;
    	float: right;
    	border: 1px solid rgba(0, 0, 0, 0.5);
    	padding: 0px;
    	margin: 5px;
    	display: block;
    	overflow: hidden;
    	background: #F44336;
    	cursor: pointer;
    }
    #events .action {
    	text-align: right;
    }
    #events .action input {
    	padding: 0px 5px;
    	font-size: 12px;
    	margin: 10px 5px;
    	border: 1px solid #999999;
    	height: 28px;
    	line-height: 28px;
    	width: 120px;
    	background: #f8f8f8;
    	color: black;
    	cursor: pointer;
    	transition: all 0.2s;
    }
    #events .action input:hover {
    	background: #eee;
    	border: 1px solid #000;
    	box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.2);
    }
    .loginbutton {
        width: fit-content;
        height: auto;
        float: right;
    }
    .version {
    	font-size: 12px;
    	width: 800px;
    	margin: 0 auto;
    text-align: right;
    }</style><div class="description"></div><div id='returndb'></div><div id="calender"><div id="wrapper"></div><div id="events-calendar"></div><div id="events"></div><div class="clear"></div><div class="clear"></div></div><script>
    			var hasSynced = false;
			// Get elements
			var elements = {
				// Calendar element
				calendar : document.getElementById("events-calendar"),
				// Input element
				events : document.getElementById("events")
			}

			// Create the calendar
			elements.calendar.className = "clean-theme";
			var calendar = jsCalendar.new(elements.calendar);

			// Create events elements
            elements.loginbutton = document.createElement("input");
            elements.loginbutton.type = "button";
            elements.loginbutton.value = "Public View";
            elements.loginbutton.className = "loginbutton";
            elements.events.appendChild(elements.loginbutton);
			elements.title = document.createElement("div");
			elements.title.className = "title";
			elements.events.appendChild(elements.title);
			elements.subtitle = document.createElement("div");
			elements.subtitle.className = "subtitle";
			elements.events.appendChild(elements.subtitle);
			elements.list = document.createElement("div");
			elements.list.className = "list";
			elements.events.appendChild(elements.list);
			elements.actions = document.createElement("div");
			elements.actions.className = "action";
			elements.events.appendChild(elements.actions);
			//elements.selectButton = document.createElement("input");
			//elements.selectButton.type = "button";
			//elements.selectButton.value = "Event Test";
			//elements.actions.appendChild(elements.selectButton);

			var events = {};
			var date_format = "MM/DD/YYYY";
			var current = null;
            var globalAvailArray;
            var globalDate;
            var globalIndex;

			var showEvents = function(date){
				// Date string
				var id = jsCalendar.tools.dateToString(date, date_format, "en");
				// Set date
			current = new Date(date.getTime());
			// Set title
			elements.title.textContent = id;
			// Clear old events
			elements.list.innerHTML = "";

			if (hasSynced == false) {
    			// Get availability through database
    			if (window.XMLHttpRequest) {
    				// code for IE7+, Firefox, Chrome, Opera, Safari
    				xmlhttp = new XMLHttpRequest();
    			} else { // code for IE6, IE5
    				xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    			}
    			xmlhttp.onreadystatechange = function () {
    				if (this.readyState == 4 && this.status == 200) {
    					var availablespaces = this.responseText;
    					var arl = availablespaces.split('|');
    					var availarray = [];
    					for (var z = 0; z < arl.length; z++) {
    						if (arl[z].length > 0) {
    							var temparray = arl[z].split(',');
    							availarray.push(temparray);
    						}
    					}
    					globalAvailArray = availarray;
    					//sync db
    					if (availarray.length > 0) {
    						for (var e = 0; e < availarray.length; e++) {
    							var date1 = availarray[e][1].split('-');
    							var date2 = '' + date1[1] + '/' + date1[2] + '/' + date1[0];
    							var date3 = date2.slice(0, 5) + date2.slice(6);
    							var date4 = date3.slice(0, 6) + date3.slice(7);

    							if (!events.hasOwnProperty(date4)) {
    								// Create list
    								events[date4] = [];
    							} else {

    							}
                                var computertime = new Date('January 1, 2000 ' + availarray[e][2].slice(1,9));
                                function formatAMPM(computertime) {
                                    var hours = computertime.getHours();
                                    var minutes = computertime.getMinutes();
                                    var ampm = hours >= 12 ? 'PM' : 'AM';
                                    hours = hours % 12;
                                    hours = hours ? hours : 12; // the hour '0' should be '12'
                                    minutes = minutes < 10 ? '0'+minutes : minutes;
                                    var strTime = hours + ':' + minutes + ' ' + ampm;
                                    return strTime;
                                }
                                events[date4].push({name: formatAMPM(computertime)});
    							showEvents(current);
    							dbDate = new Date(date4);
                                calendar.select(dbDate);
    						}
    					}
    				}
    			}
    			xmlhttp.open("GET", "/php/availability.php", true);
    			xmlhttp.send();
    			//showEvents(current);
    			hasSynced = true;
			}

			// Add events on list
			if (events.hasOwnProperty(id) && events[id].length) {
				// Number of events
				elements.subtitle.textContent = events[id].length + " " + ((events[id].length > 1) ? "appointments listed, click one to modify or delete." : "appointment listed, click to modify or delete.");

				var div;
				var book;
				// For each event
				for (var i = 0; i < events[id].length; i++) {
					div = document.createElement("div");
					div.className = "event-item";
					div.textContent = events[id][i].name;
					elements.list.appendChild(div);
					div.addEventListener("click", (function (date, index) {
					return function () {
                    globalDate = date;
					bookAppointment(date, index);
					}
					})(date, i), false);
			}
			} else {
			elements.subtitle.textContent = "No Created Appointments on " + id;
			}
			};

			elements.bookit = document.createElement("p");
			elements.bookit.className = "bookit";
			elements.bookit.innerHTML = "";
            elements.reminderButton = document.createElement("input");
            elements.reminderButton.type = "button";
            elements.reminderButton.value = "Delete Appointment";


            elements.reminderButton.addEventListener("click", function(date, index){
                if (window.XMLHttpRequest) {
                    // code for IE7+, Firefox, Chrome, Opera, Safari
                    xmlhttp = new XMLHttpRequest();
                } else { // code for IE6, IE5
                    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
                }
                xmlhttp.onreadystatechange = function () {
                    if (this.readyState == 4 && this.status == 200) {
                        elements.bookit.innerHTML = this.responseText;
                        window.location.href = "/php/console.php"
                    }
                }
                console.log(globalAvailArray);
                var uniqueid;
                for(let q = 0; q < globalAvailArray.length; q++) {
                    var date = jsCalendar.tools.dateToString(globalDate, date_format, "en");
                    var date1 = date.slice(6,10) + "-" + date.slice(0,2) + "-" + date.slice(3,5);
                    var globalIndex1;
                    if (globalIndex[5] === "P" || globalIndex[6] === "P"){
                        if(globalIndex.slice(0,2) === "10" || globalIndex.slice(0,2) === "11"){
                            globalIndex1 = (globalIndex.slice(0,1) + 12) + ":" + globalIndex.slice(3,5) + ":00";
                        }
                        if(globalIndex.slice(0,2) === "12"){
                            globalIndex1 = globalIndex.slice(0,5) + ":00";
                        } else {
                            var hours = parseInt(globalIndex.slice(0,1)) + 12;
                            globalIndex1 = hours + ":" + globalIndex.slice(2,4) + ":00";
                        }
                    } else {
                        if(globalIndex.slice(0,2) === "12"){
                            globalIndex1 = "00:00:00";
                        } else {
                            globalIndex1 = "0" + globalIndex.slice(0, 4) + ":00";
                        }
                        if(globalIndex.slice(0,2) === "10" || globalIndex.slice(0,2) === "11"){
                            globalIndex1 = globalIndex.slice(0,5) + ":00";
                        }
                    }
                    console.log(globalIndex1);
                    if (globalAvailArray[q][1].slice(1,globalAvailArray[q][1].length-1) === date1 && globalAvailArray[q][2].slice(1,globalAvailArray[q][2].length-1) === globalIndex1) {
                        uniqueid = globalAvailArray[q][0];
                        console.log(uniqueid.slice(1,uniqueid.length-1));
                    }
                }
                xmlhttp.open("POST", "/php/delete.php?id=" + uniqueid, true);
                xmlhttp.send();
            }, false);

            elements.loginbutton.addEventListener("click", function(){
                window.location.href = "/schedule.html";
            }, false);

			var bookAppointment = function (date, index) {
			/*
				// Date string
				var id = jsCalendar.tools.dateToString(date, date_format, "en");

				// If no events return
				if (!events.hasOwnProperty(id)) {
					return;
			}
			// If not found
			if (events[id].length <= index) {
				return;
			}

			// Remove event
			events[id].splice(index, 1);

			// Refresh events
			showEvents(current);

			// If no events uncheck date
			if (events[id].length === 0) {
				calendar.unselect(date);
			}
			*/
			var id = jsCalendar.tools.dateToString(date, date_format, "en");
			globalIndex = events[id][index].name;
			if(elements.bookit.innerHTML == "") {
				elements.bookit.innerHTML = "You have selected " + events[id][index].name + " on " + id;
				elements.events.appendChild(elements.bookit);
                elements.events.appendChild(elements.reminderButton);
			} else {
				elements.bookit.innerHTML = "You have selected " + events[id][index].name + " on " + id;
			}

			}

			// Show current date events
			showEvents(new Date());

			// Add events
			calendar.onDateClick(function(event, date){
			// Update calendar date
			calendar.set(date);
				// Show events
				showEvents(date);
				// Remove any old selections
				elements.bookit.innerHTML = "";
				elements.events.removeChild(elements.reminderButton);
			});
            /*
			elements.selectButton.addEventListener("click", function(){
				// Get event name
				var addEvent = prompt(
			"Test Add Event Feature",
			"10:30 AM"
			);

			//Return on cancel
			if (addEvent === null || addEvent === "") {
				return;
			}

			// Date string
			var id = jsCalendar.tools.dateToString(current, date_format, "en");

			// If no events, create list
			if (!events.hasOwnProperty(id)) {
				// Create list
				events[id] = [];
			}

			// If where were no events
			if (events[id].length === 0) {
				// Select date
				calendar.select(current);
			}

			// Add event
			events[id].push({name : addEvent});

			// Refresh events
			showEvents(current);
			}, false);
			*/
</script>
</body>
</html>