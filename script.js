// All references for code included in reference list

// Function 1: For lightbox viewing for image gallery
document.addEventListener("DOMContentLoaded", function() {
    console.log("Script loaded");

    const galleryItems = document.querySelectorAll(".gallery-item img");
    const lightbox = document.getElementById("lightbox");
    const lightboxImage = document.getElementById("lightbox-image");

    console.log("Gallery items found:", galleryItems.length);

    galleryItems.forEach(item => {
        item.addEventListener("click", function() {
            console.log("Image clicked:", this.src);
            lightbox.style.display = "flex";
            lightboxImage.src = this.src;
        });
    });

    lightbox.addEventListener("click", function(event) {
        if (event.target === lightbox) {
            console.log("Lightbox background clicked");
            lightbox.style.display = "none";
        }
    });
});

// Function 2: For pop-up message for Socials Page
window.onload = function() { 
    
    var currentPageURL = window.location.href;

    if (currentPageURL.endsWith("socials.html")) {
      
        alert("Welcome to Pink Panther Photography. Follow us on social media to see our quality services! Get 10% off if you follow us on all our social media platforms!");
    }
};

// Contact Page functions

// Function 3: to validate the form before submission (form sanitation)
function validateForm(event) {
   
    var fullName = document.getElementById('form-full-name').value.trim();
    var service = document.querySelector('select[name="form-service"]').value;
    var postcode = document.getElementById('form-postcode').value;
    var phone = document.getElementById('form-phone').value;
    var email = document.getElementById('form-email').value;
    var serviceTime = document.querySelector('input[name="time"]:checked');
    var features = document.querySelectorAll('input[name="feature[]"]:checked');
    var comments = document.getElementById('form-comments').value;

    var phoneRegex = /^\d{10}$/; // 10 digits phone number
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Email format

 
    if (fullName.trim() === '' || fullName.split(' ').length < 2) {
        alert('Please enter your full name.');
        return false;
    }

    if (service === '') {
        alert('Please select a service.');
        return false;
    }

    if (postcode.trim() === '' || !/^\d{4}$/.test(postcode)) {
        alert('Please enter a valid 4-digit postcode.');
        return false;
    }

    if (!phoneRegex.test(phone)) {
        alert('Please enter a valid 10-digit phone number that starts with (04)');
        return false;
    }

    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return false;
    }

    if (!serviceTime) {
        alert('Please select a service time.');
        return false;
    }

    if (features.length === 0) {
        alert('Please select at least one feature.');
        return false;
    }

    if (comments.trim() === '') {
        alert('Please enter your enquiry.');
        return false;
    }

    return true;
}


function displaySuccessMessage() {
    alert("Thank you for your enquiry! Your form has been submitted successfully. It will be reviewed by a team member shortly.");
}

function handleSubmit(event) {
    event.preventDefault(); 

    var confirmation = confirm("Are you sure you want to submit the form?");
    
    if (confirmation) {
        if (validateForm(event)) {
            // Gather form data
            var formData = {
                fullName: document.getElementById('form-full-name').value.trim(),
                service: document.querySelector('select[name="form-service"]').value,
                postcode: document.getElementById('form-postcode').value,
                phone: document.getElementById('form-phone').value,
                email: document.getElementById('form-email').value,
                serviceTime: document.querySelector('input[name="time"]:checked')?.value, // Use optional chaining
                features: Array.from(document.querySelectorAll('input[name="feature[]"]:checked')).map(el => el.value),
                comments: document.getElementById('form-comments').value
            };

            // Send the data to the server
            fetch('http://localhost:3000/submit-form', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData) // Convert the data to JSON
            })
            .then(response => {
                if (response.ok) {
                    displaySuccessMessage();
                    // Optionally reset the form or redirect
                    document.querySelector('form').reset(); // Reset form fields
                } else {
                    alert('Error submitting form. Please try again.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('There was a problem with the submission. Please try again later.');
            });
        }
    }
}
            
      
  

// Add an event listener to the form for the submit event
document.querySelector('form').addEventListener('submit', handleSubmit);
