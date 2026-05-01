const nameInput = document.getElementById('name');
const emailInput = document.getElementById('userEmail');
const phoneInput = document.getElementById('userPhoneNumber');
const counter = document.getElementById('counter');
const changeBtn = document.getElementById('change');
const emailDiv = document.getElementById('email');
const phoneDiv = document.getElementById('phoneNumber');

// 1. Character Counter for Name
nameInput.addEventListener('input', () => {
    const length = nameInput.value.length;
    counter.innerText = `${length} / 50`;
    validateField(nameInput, length > 0 && length <= 50);
});

// 2. Toggle Email/Phone logic
changeBtn.addEventListener('click', () => {
    if (emailDiv.style.display === 'none') {
        emailDiv.style.display = 'block';
        phoneDiv.style.display = 'none';
        changeBtn.innerText = "Use phone instead";
    } else {
        emailDiv.style.display = 'none';
        phoneDiv.style.display = 'block';
        changeBtn.innerText = "Use email instead";
    }
});

// 3. Regex Validations
function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePhone(phone) {
    return /^\d{10}$/.test(phone); // Basic 10-digit check
}

// 4. Visual Feedback Function
function validateField(input, isValid) {
    if (isValid) {
        input.parentElement.style.borderColor = "#1d9bf0"; // Twitter Blue
    } else {
        input.parentElement.style.borderColor = "#f4212e"; // Error Red
    }
}

// Attach listeners for real-time color change
emailInput.addEventListener('blur', () => validateField(emailInput, validateEmail(emailInput.value)));
phoneInput.addEventListener('blur', () => validateField(phoneInput, validatePhone(phoneInput.value)));

function isFormValid() {
    const isNameValid = nameInput.value.trim().length > 0;
    const isEmailVisible = emailDiv.style.display !== 'none';
    
    let isContactValid = false;
    if (isEmailVisible) {
        isContactValid = validateEmail(emailInput.value);
    } else {
        isContactValid = validatePhone(phoneInput.value);
    }

    const dobValue = document.querySelector('input[name="userDateOfBirth"]').value;
    const isDobValid = dobValue !== "";

    return isNameValid && isContactValid && isDobValid;
}
