// Add event listener for the form submission
document.getElementById("estimate-form").addEventListener("submit", async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Collect form data
    const formData = {
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        source: document.getElementById("source").value
    };

    // Send the form data to the server
    try {
        // Send the form data to the server
        const response = await fetch('http://localhost:3000/submit-lead', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        if (response.ok) {
            alert('Success! Your info was sent to the database.');
            document.getElementById('estimate-form').reset(); // Clear form fields
        } else {
            alert('Server error, please try again.');
        }
    } 
    catch (error) {
        console.error('Error submitting response:', error);
        alert('Error submitting response, please try again.');
    }
});
