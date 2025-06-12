function validateForm() {
    const fname = document.getElementById('fname').value.trim();
    const lname = document.getElementById('lname').value.trim();
    const email = document.getElementById('email').value.trim();
    const contact = document.getElementById('contact-number').value.trim();
    const message = document.getElementById('message');
    
    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!fname || !lname || !email || !contact) {
        message.style.color = 'red';
        message.textContent = 'All fields are required!';
        return;
    }

    if (!emailRegex.test(email)) {
        message.style.color = 'red';
        message.textContent = 'Invalid email format!';
        return;
    }

    message.style.color = 'green';
    message.style.textDecoration = 'underline';
    message.textContent = 'Form submitted successfully!';
}