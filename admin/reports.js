const fetchAdmin = (url) => {
    fetch(url, {
      method: "GET",
      credentials: "include"
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.message == "login first") {
          console.log(res)
         alert("login first. Redirecting you now")
         setTimeout(()=>{
            window.location.href = "http://127.0.0.1:5500/christo_energy-lpg/admin";
         }, 1000)
          localStorage.setItem("adminloggedin", "false")
        } else {
          console.log(res)
         localStorage.setItem("adminloggedin", "true")
         fetch("http://127.0.0.1:8080/api/getAllEvents", {
            method: "GET",
            credentials: "include"
          })
            .then((res) => res.json())
            .then((res) => {
               renderNotifications(sortByTime(res))
              //  renderNotifications(res)
              //  console.log(sortByTime(res))
               updateSeen('http://127.0.0.1:8080/api/updateEventsSeen')
              //  console.log(res)
            })
         }
      });
  };

  const notifications = [
    'No new notifications',
    'You have received a new report',
    'Reminder: Meeting at 3 PM',
    'No new notifications',
    'You have received a new report',
    'Reminder: Meeting at 3 PM',
    'No new notifications',
    'You have received a new report',
    'Reminder: Meeting at 3 PM',
    'No new notifications',
    'You have received a new report',
    'Reminder: Meeting at 3 PM',
    'No new notifications',
    'You have received a new report',
    'Reminder: Meeting at 3 PM',
    'No new notifications',
    'You have received a new report',
    'Reminder: Meeting at 3 PM',
    'No new notifications',
    'You have received a new report',
    'Reminder: Meeting at 3 PM',
    'No new notifications',
    'You have received a new report',
    'Reminder: Meeting at 3 PM',
    'No new notifications',
    'You have received a new report',
    'Reminder: Meeting at 3 PM',
    // Add more notifications...
  ];

  function renderNotifications(notifications) {
    const notificationDiv = document.getElementById('notification');
    

    if(notifications.length===0){
      const noReportsRow = document.createElement('span');
      noReportsRow.style.textAlign="center"
      noReportsRow.style.background="inherit"
      noReportsRow.innerHTML = `
      <b>No reports available</b>
       `;
      notificationDiv.appendChild(noReportsRow);
    }else{
      notifications.forEach(notification => {
      let color = '';
      switch (notification.event_type) {
        case 'New user':
          color = 'rgb(0, 162, 255)';    //blue
          break;
        case 'New visitor':
          color = ' rgb(255, 196, 0)';    //orange
          break;
        case 'New delivery':
          color = 'black';
          break;
        case 'New order':
          color = 'yellowgreen';
          break;
        default:
          color = 'gray'; // Default color for other types
          break;
      }
      notificationDiv.innerHTML += `<span style="background:${color};color:white;" class="yourClassName">${notification.event_data}  <b style="font-size:14px; float:right; background:black; border-radius:3px; padding:3px">${new Date(notification.event_time).toISOString().split('T')[0]}</b></span><br>`;
    });
    }
    
  }
  

  function updateSeen(url){
    fetch(url, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json', // Set the content type if sending JSON data
      },
      credentials: 'include', // Include credentials such as cookies, authorization headers
    })
    .then((res) => {
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      return res.json(); // Return the parsed JSON promise
    })
    .then((data) => {
      console.log(data); // Access and handle the parsed JSON data
      // Perform actions with the data received from the server
    })
    .catch((error) => {
      console.error('There was a problem with the fetch operation:', error);
      // Handle errors or show error messages to the user
    });
  }

  
  function sortByTime(arrayOfObjects) {
   arrayOfObjects.sort((a, b) => {
      return new Date(b.event_time) - new Date(a.event_time);
    });
  
    return arrayOfObjects;
  }




    // Call the function to generate orders list on page load
window.onload = function () {
    fetchAdmin("http://127.0.0.1:8080/api/adminside")
}