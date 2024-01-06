
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
               generateCustomerTable(res);
            })
         }
      });
  };



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

  customers.forEach(customer => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${customer.fullname}</td>
      <td>${customer.email}</td>
    `;
    tbody.appendChild(row);
  });
}

window.onload = function () {
    fetchAdmin("http://127.0.0.1:8080/api/adminside")
}
