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
    // Finds the parent div (.input-group or .dob-section)
    const container = input.closest('.input-group') || input.closest('.dob-section');
    
    if (container) {
        if (isValid) {
            container.style.border = "1px solid #1d9bf0"; // Blue
        } else {
            container.style.border = "1px solid #f4212e"; // Red
        }
    }
}
// Attach listeners for real-time color change


function isValidBasicInfo() {
    let valid = true;

    // 1. Name check
    const name = document.getElementById('name');
    if (name.value.trim() === "") {
        validateField(name, false);
        valid = false;
    } else {
        validateField(name, true);
    }

    // 2. Email/Phone check
    const emailDiv = document.getElementById('email');
    const emailInput = document.getElementById('userEmail');
    const phoneInput = document.getElementById('userPhoneNumber');

    if (emailDiv.style.display !== 'none') {
        const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value);
        validateField(emailInput, isEmailValid);
        if (!isEmailValid) valid = false;
    } else {
        const isPhoneValid = /^\d{10}$/.test(phoneInput.value);
        validateField(phoneInput, isPhoneValid);
        if (!isPhoneValid) valid = false;
    }

    // 3. DOB check
    const dob = document.querySelector('input[name="userDateOfBirth"]');
    if (dob.value === "") {
        validateField(dob, false);
        valid = false;
    } else {
        validateField(dob, true);
    }
    if(isEmailTaken){
        valid=false;
    }

    return valid;
}


let isEmailTaken=false;
// check userEmail is database
async function checkEmail(value) {
    const emailInput = document.getElementById('userEmail');
    
    // 1. Local Regex Check
    const isFormatValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    if (!isFormatValid) {
        applyError(emailInput, "Please enter a valid email.");
        return false;
    }

    try {
        const res = await fetch("http://localhost:8080/auth/isEmailExist", {
            method: 'post',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({ userEmail: value })
        });

        const data = await res.json();

        // 2. Fix logic: if res.ok and data is false, email is available
        if (res.ok && data === true) {
            isEmailTaken=true;
            applyError(emailInput, "Email has already been taken.");
            return false;
        } else {
            isEmailTaken=false;
            applySuccess(emailInput);
            return true;
        }
    } catch (error) {
        console.error("Validation error:", error);
        return false;
    }
}

function applyError(input, message) {
    const container = input.closest('.input-group');
    container.style.border = "2px solid #f4212e"; // Use 'border' instead of 'borderColor' to be safe
    
    // To show text error, we can add/update a small span
    let errorSpan = container.querySelector('.error-text');
    if (!errorSpan) {
        errorSpan = document.createElement('span');
        errorSpan.className = 'error-text';
        errorSpan.style.cssText = "color: #f4212e; font-size: 13px; position: absolute; bottom: -20px; left: 0;";
        container.appendChild(errorSpan);
    }
    errorSpan.innerText = message;
}

function applySuccess(input) {
    const container = input.closest('.input-group');
    container.style.border = "2px solid #1d9bf0"; // Twitter Blue
    
    const errorSpan = container.querySelector('.error-text');
    if (errorSpan) errorSpan.innerText = "";
}



let debounceTimer;
let isUserNameExists=false;

document.getElementById('newName').addEventListener('input', (e) => {
    const value = e.target.value.trim();
    const inputElement = e.target;
    const container = inputElement.closest('.input-group');

    // Clear the timer every time the user types
    clearTimeout(debounceTimer);

    if (value.length < 3) {
        applyError(inputElement, "Username must be at least 3 characters.");
        return;
    }

    // Set a new timer to call the API after 500ms of no typing
    debounceTimer = setTimeout(async () => {
        try {
            const res = await fetch("http://localhost:8080/auth/isUserNameExist", {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams({ userName: value })
            });

            const data = await res.json();

            if (res.ok && data.exists) {
                isUserNameExists=true;
                userNameError(inputElement, "Username has already been taken.");
            } else if (res.ok) {
                isUserNameExists=false;
                userNameSucces(inputElement);
            }
        } catch (error) {
            console.error("Error checking username:", error);
        }
    }, 500);
});

// Helper functions for UI feedback
function userNameError(input, message) {
    const container = input.closest('.input-group');
    container.style.border = "2px solid #f4212e"; // Red
    
    let errorText = container.querySelector('.error-msg');
    if (!errorText) {
        errorText = document.createElement('div');
        errorText.className = 'error-msg';
        errorText.style.cssText = "color: #f4212e; font-size: 13px; margin-top: 5px; position: absolute; bottom: -22px;";
        container.appendChild(errorText);
    }
    errorText.innerText = message;
}

function userNameSucces(input) {
    const container = input.closest('.input-group');
    container.style.border = "2px solid #1d9bf0"; // Twitter Blue
    const errorText = container.querySelector('.error-msg');
    if (errorText) errorText.innerText = "";
}


function passwordValidation(value){
        document.getElementById('ePassword').innerHTML=""

    let valid=true;
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if(!valid){
        document.getElementById('ePassword').innerHTML="please select your  password"
        valid=false
    }else if(!strongPasswordRegex.test(value)){
        document.getElementById('ePassword').innerHTML="please select strong password"
        valid=false;
    }
    return valid;
}


function userNameValidation(){
   const userName= document.getElementById('newName').value.trim()
   if(!userName){
    document.getElementById('eUserName').innerHTML='please choose userName'
    return false;
   }else if(isUserNameExists){
    document.getElementById('eUserName').innerHTML='userName all ready taken'
    return false
   }else{
    return true;
   }
   
}