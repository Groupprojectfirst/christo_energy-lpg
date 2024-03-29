
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
         fetch("http://127.0.0.1:8080/api/allBuyers", {
            method: "GET",
            credentials: "include"
          })
            .then((res) => res.json())
            .then((res) => {
               console.log(res)
               generateCustomerTable(sortByTime(res));
               updateSeen("http://127.0.0.1:8080/api/updateBuyerSeen")
            })
         }
      });
  };


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



const customers = [
  // An array of 30 customers for testing
  // You can populate this array with your customer data
  // Format: { name: 'Customer Name', email: 'customer@email.com' }
  // Example data below
  { name: 'John Doe', email: 'john@example.com' },
  { name: 'Jane Smith', email: 'jane@example.com' },
  { name: 'John Doe', email: 'john@example.com' },
  { name: 'Jane Smith', email: 'jane@example.com' },
  { name: 'John Doe', email: 'john@example.com' },
  { name: 'Jane Smith', email: 'jane@example.com' },
  { name: 'John Doe', email: 'john@example.com' },
  { name: 'Jane Smith', email: 'jane@example.com' },
  { name: 'John Doe', email: 'john@example.com' },
  { name: 'Jane Smith', email: 'jane@example.com' }
  // Add more customers here...
]; 

// Function to generate customer table rows
function generateCustomerTable(customers) {
  const customerTable = document.getElementById('customer-table');
  const tbody = customerTable.querySelector('tbody');

  tbody.innerHTML = ''; // Clear any previous rows

  if (customers.length === 0) {
    // If no customers, display a message
    const noCustomersRow = document.createElement('tr');
    noCustomersRow.innerHTML = `
      <td colspan="2" style="text-align:center; background:whitesmoke; font-weight:bold">No customers available</td>
    `;
    tbody.appendChild(noCustomersRow);
  } else {
    customers.forEach(customer => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${customer.fullname}</td>
        <td>${customer.email}</td>
        <td>${new Date(customer.created_at).toISOString().split('T')[0]}</td>
      `;
      tbody.appendChild(row);
    });
  }
}


  
function sortByTime(arrayOfObjects) {
  arrayOfObjects.sort((a, b) => {
     return new Date(b.created_at) - new Date(a.created_at);
   });
 
   return arrayOfObjects;
 }


window.onload = function () {
    fetchAdmin("http://127.0.0.1:8080/api/adminside")
}
