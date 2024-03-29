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
         fetch("http://127.0.0.1:8080/api/fetchAllOrders", {
            method: "GET",
            credentials: "include"
          })
            .then((res) => res.json())
            .then((res) => {
               generatePaymentsTable(sortByTime(res));
            })
         }
      });
  };

    const payments = [
      { date: '2023-01-01', amount: 100, recipient: 'Company A', status: 'Completed', method: 'Credit Card' },
      { date: '2023-02-05', amount: 150, recipient: 'Company B', status: 'Pending', method: 'PayPal' },
      { date: '2023-01-01', amount: 100, recipient: 'Company A', status: 'Completed', method: 'Credit Card' },
      // Add more payment entries...
    ];

    function generatePaymentsTable(payments) {
      const paymentsBody = document.getElementById('payments-body');
      let totalAmount = 0;
    
      if (payments.length === 0) {
        const noPaymentsRow = document.createElement('tr');
        noPaymentsRow.innerHTML = `
          <td colspan="4" style="text-align:center; background:gray; color:white;font-weight:bold">No Payments available</td>
        `;
        paymentsBody.appendChild(noPaymentsRow);
      } else {
        payments.forEach(payment => {
          totalAmount += parseFloat(Number(payment.amountPaid));
    
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${new Date(payment.createdAt).toISOString().split('T')[0]}</td>
            <td>&#x20A6;${addCommasToNumber(payment.amountPaid)}</td>
            <td>${payment.buyer}</td>
            <td>${payment.status}</td>
          `;
          paymentsBody.appendChild(row);
        });
    
        // Adding the div for total amount after displaying payments
        const totalRow = document.createElement('tr');
        totalRow.innerHTML = `
          <td colspan="3" style="text-align:right; font-weight:bold;">Total amount received:</td>
          <td style="font-weight:bold;">&#x20A6;${addCommasToNumber(totalAmount.toFixed(2))}</td>
        `;
        paymentsBody.appendChild(totalRow);
      }
    }



    
function sortByTime(arrayOfObjects) {
  arrayOfObjects.sort((a, b) => {
     return new Date(b.createdAt) - new Date(a.createdAt);
   });
 
   return arrayOfObjects;
 }

 
function addCommasToNumber(num) {
  // Convert the number to a string
  let numString = num.toString();

  // Split the integer and decimal parts
  let parts = numString.split('.');

  // Add commas to the integer part
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  // Join the integer and decimal parts back together
  let result = parts.join('.');

  return result;
}

    
  // Call the function to generate orders list on page load
window.onload = function () {
    fetchAdmin("http://127.0.0.1:8080/api/adminside")
}