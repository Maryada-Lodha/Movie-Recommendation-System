// Add your API endpoint here
var API_ENDPOINT = "https://kglp45qha6.execute-api.ap-south-1.amazonaws.com/post-rs-users";

// AJAX POST request for registration
function handleRegister(event) {
    event.preventDefault(); // Prevent the default form submission

    // Gather the form input data
    var inputData = {
        "userId": $('#email').val(),
        "email": $('#email').val(),
        "mobile": $('#mobileno').val(),
        "name": $('#username').val(),
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

            // If registration is successful, redirect to home.html
            if (response.statusCode === 200) {
                alert("Registration successful!"); 
                window.location.href = "home.html"; 
            } else {
                // If registration fails, show an alert with the reason
                alert("Registration failed: " + responseData.reason);
            }
        },
        error: function() {
            alert("Error during registration.");
        }
    });

    return false; // Prevent the default form submission
}
