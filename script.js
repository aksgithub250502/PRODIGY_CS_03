const passwordInput = document.getElementById("password");
const strengthBar = document.getElementById("strength-bar");
const strengthText = document.getElementById("strength-text");
const feedbackList = document.getElementById("feedback-list");

passwordInput.addEventListener("input", () => {
  const password = passwordInput.value;
  const result = checkPasswordStrength(password);
  updateUI(result);
});

function checkPasswordStrength(password) {
  let score = 0;
  const feedback = [];

  const lengthCheck = password.length >= 8;
  const lowercaseCheck = /[a-z]/.test(password);
  const uppercaseCheck = /[A-Z]/.test(password);
  const numberCheck = /[0-9]/.test(password);
  const specialCharCheck = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  if (lengthCheck) score++;
  else feedback.push("Use at least 8 characters.");

  if (lowercaseCheck) score++;
  else feedback.push("Add lowercase letters.");

  if (uppercaseCheck) score++;
  else feedback.push("Add uppercase letters.");

  if (numberCheck) score++;
  else feedback.push("Include numbers.");

  if (specialCharCheck) score++;
  else feedback.push("Include special characters.");

  let strength = "";
  let color = "";

  switch (score) {
    case 0:
    case 1:
      strength = "Very Weak";
      color = "red";
      break;
    case 2:
      strength = "Weak";
      color = "orangered";
      break;
    case 3:
      strength = "Moderate";
      color = "orange";
      break;
    case 4:
      strength = "Strong";
      color = "#00e676";
      break;
    case 5:
      strength = "Very Strong";
      color = "#00c853";
      break;
  }

  return {
    score,
    percentage: (score / 5) * 100,
    strength,
    color,
    feedback
  };
}

function updateUI(result) {
  strengthBar.style.width = `${result.percentage}%`;
  strengthBar.style.backgroundColor = result.color;
  strengthText.textContent = result.strength;

  feedbackList.innerHTML = "";
  result.feedback.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    feedbackList.appendChild(li);
  });
}
