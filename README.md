# Appointment-Management-System
Front-end web application written in JS to allow customer booking and management of availability/appointments by a business. This is being designed as a project for an existing website so small modifications might be required for implementation on other websites.

# Screenshots
1. Initial user view of the booking panel:
![Image of Booking Panel](https://i.imgur.com/L8AFdkV.png)

2. View when a reservation time is clicked by user:
![Image of Booking Selection](https://i.imgur.com/sSg97mi.png)

3. View when user enters reservation information:
![Image of Booking Dialog](https://i.imgur.com/oEtZzTK.png)

4. View logging in to management panel:
![Image of Management Login](https://i.imgur.com/jW2kL9W.png)

5. View management panel:
![Image of Management Panel](https://i.imgur.com/z46ZDgE.png)

# Installation
* Download the zip file and unpack into a folder at the directory level your html page is located at.
1. Add the following lines of code to the head to reference the CSS styles:

     `<link rel="stylesheet" href="/stylesheet/jsCalender.css">`

     `<link rel="stylesheet" href="/stylesheet/jsCalenderclean.css">`

     `<script type="text/javascript" src="/js/jscalender.js"></script>`

2. Add the following lines of code to the body to reference the JS scripts:

     `<script src="/later-master/later.min.js" type="text/javascript"></script>`
     
     `<script src="/schedule-master/schedule.min.js" type="text/javascript"></script>`
     
* The appointment management tool utilizes an SQL database on the localhost to post/get appintment time data. The following configuration is how your SQL database should be configured:
  1. Create tables 'Availability', 'Bookings', and 'Credentials':
![Image of Tables](https://i.imgur.com/tX3IF9J.png)
  2. Populate columns in 'Availability' as depicted:
![Image of Availability Table](https://i.imgur.com/SLiQobl.png)
  3. Populate columns in 'Bookings' as depicted:
![Image of Bookings Table](https://i.imgur.com/bqqCuUd.png)
  4. Populate columns in 'Credentials' as depicted:
![Image of Credentials Table](https://i.imgur.com/TlM6KjE.png)
