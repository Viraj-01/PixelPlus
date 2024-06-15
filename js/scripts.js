document.addEventListener('DOMContentLoaded', function () {
    // Add custom JavaScript here
    document.querySelector('form').addEventListener('submit', function (e) {
        e.preventDefault();
        // Add form submission handling code here
        alert('Form submitted!');
    });
});
