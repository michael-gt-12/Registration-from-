// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  
  // ----- Helper: clear error messages -----
  function clearErrors(errorContainer) {
    if (errorContainer) errorContainer.innerHTML = '';
  }
  
  // ----- LOGIN VALIDATION -----
  const loginForm = document.getElementById('loginForm');
  const loginErrorDiv = document.getElementById('loginError');
  
  if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
      e.preventDefault();
      clearErrors(loginErrorDiv);
      
      const username = document.getElementById('loginUsername').value.trim();
      const password = document.getElementById('loginPassword').value.trim();
      
      let errors = [];
      if (username === '') errors.push('❌ Username is required.');
      if (password === '') errors.push('❌ Password is required.');
      
      if (errors.length > 0) {
        loginErrorDiv.innerHTML = errors.join('<br>');
      } else {
        // Successful login (demo)
        alert('✨ Welcome ' + username + '! Login successful (demo). ✨');
        loginForm.reset();    // optional: clear fields after success
        loginErrorDiv.innerHTML = '';
      }
    });
    
    // Clear error when reset button is clicked
    loginForm.addEventListener('reset', function() {
      clearErrors(loginErrorDiv);
    });
  }
  
  // ----- REGISTRATION VALIDATION -----
  const registerForm = document.getElementById('registerForm');
  const registerErrorDiv = document.getElementById('registerError');
  
  if (registerForm) {
    registerForm.addEventListener('submit', function(e) {
      e.preventDefault();
      clearErrors(registerErrorDiv);
      
      // Get values
      const firstName = document.getElementById('regFirstName').value.trim();
      const lastName = document.getElementById('regLastName').value.trim();
      const department = document.getElementById('regDepartment').value;
      
      // Gender validation (at least one radio checked)
      const genderRadios = document.querySelectorAll('input[name="gender"]');
      let genderSelected = false;
      for (let radio of genderRadios) {
        if (radio.checked) {
          genderSelected = true;
          break;
        }
      }
      
      // Hobbies validation (at least one checkbox checked)
      const hobbyCheckboxes = document.querySelectorAll('#hobbiesGroup input[type="checkbox"]');
      let hobbySelected = false;
      for (let cb of hobbyCheckboxes) {
        if (cb.checked) {
          hobbySelected = true;
          break;
        }
      }
      
      let errors = [];
      if (firstName === '') errors.push('❌ First name is required.');
      if (lastName === '') errors.push('❌ Last name is required.');
      if (!genderSelected) errors.push('❌ Please select a gender.');
      if (!hobbySelected) errors.push('❌ Please select at least one hobby.');
      
      if (errors.length > 0) {
        registerErrorDiv.innerHTML = errors.join('<br>');
      } else {
        // Build success message
        const selectedGender = document.querySelector('input[name="gender"]:checked').value;
        const selectedHobbies = [];
        hobbyCheckboxes.forEach(cb => {
          if (cb.checked) selectedHobbies.push(cb.value);
        });
        
        alert(`🎉 Registration Successful! 🎉\n\nName: ${firstName} ${lastName}\nDepartment: ${department}\nGender: ${selectedGender}\nHobbies: ${selectedHobbies.join(', ') || 'None'}`);
        
        registerForm.reset();  // clear all fields (resets radio, checkboxes, inputs)
        registerErrorDiv.innerHTML = '';
      }
    });
    
    // Clear error when reset button is clicked
    registerForm.addEventListener('reset', function() {
      clearErrors(registerErrorDiv);
    });
  }
  
  // Optional: clear errors when toggling between forms (when radio changes)
  const loginRadio = document.getElementById('loginToggle');
  const registerRadio = document.getElementById('registerToggle');
  
  if (loginRadio && registerRadio) {
    loginRadio.addEventListener('change', function() {
      if (loginRadio.checked) {
        clearErrors(loginErrorDiv);
      }
    });
    registerRadio.addEventListener('change', function() {
      if (registerRadio.checked) {
        clearErrors(registerErrorDiv);
      }
    });
  }
});