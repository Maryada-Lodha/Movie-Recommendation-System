// Add your API endpoint here
var API_ENDPOINT = "https://cpa5dezyp9.execute-api.ap-south-1.amazonaws.com/check-rs-user";

// AJAX POST request for login
document.getElementById("loginForm").onsubmit = function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Gather the form input data
    var inputData = {
        "email": $('#text').val(),
        "password": $('#password').val()
    };

    // Make AJAX request
    $.ajax({
        url: API_ENDPOINT,
        type: 'POST',
        data: JSON.stringify(inputData),
        contentType: 'application/json; charset=utf-8',
        success: function(response) {
            var responseData = JSON.parse(response.body); // Parse the response body

            // If login is successful, redirect to home.html
            if (responseData.message) {
                window.location.href = "home.html";
            } else {
                // If login fails, show an alert with the reason
                alert("Login failed: " + responseData.reason);
            }
        },
        error: function() {
            alert("Error during login.");
        }
    });

    return false;
};
