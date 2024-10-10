const display = document.querySelector(".value");

// For Percentage Calculation
function calculatePercentage(expression) {
  //There is X% is Y format
  const match = expression.match(/([\d.]+)%\s*of\s*([\d.]+)/);
  if (match) {
    const percentage = parseFloat(match[1]) / 100;
    const baseNumber = parseFloat(match[2]);
    return percentage * baseNumber;
  }

  //There is X%Y format
  const percentMatch = expression.match(/([\d.]+)%([\d.]+)/);
  if (percentMatch) {
    const percentage = parseFloat(percentMatch[1]) / 100;
    const baseNumber = parseFloat(percentMatch[2]);
    return percentage * baseNumber;
  }

  return null; // If there is no valid match
}

// Eventlistener for Each Buttons
document.querySelectorAll(".num").forEach((button) => {
  button.addEventListener("click", (e) => {
    const value = button.textContent;
    if (value === "C") {
      display.value = "";
    } else if (value === "Del") {
      display.value = display.value.slice(0, -1);
    } else if (value === "=" || value === "Enter") {
      const result = calculatePercentage(display.value);
      if (result !== null) {
        // here is Percent Value

        display.value = result;
      } else {
        try {
          display.value = eval(display.value);
        } catch (error) {
          display.value = "Error";
        }
      }
    } else if (value === "%") {
      display.value += value;
    } else {
      display.value += value;
    }
  });
});

// For Keyboard  Support
document.addEventListener("keydown", function (event) {
  event.preventDefault();

  //  keys For Digit and Operators
  if (
    !isNaN(event.key) ||
    ["+", "-", "*", "/", "%", "o", "f"].includes(event.key)
  ) {
    if (event.key === "%") {
      display.value += event.key;
    } else {
      display.value += event.key;
    }
  }

  // For Special Keys like Enter, C, Del

  switch (event.key) {
    case "Enter":
      const enterResult = calculatePercentage(display.value);
      if (enterResult !== null) {
        display.value = enterResult;
      } else {
        try {
          display.value = eval(display.value);
        } catch (error) {
          display.value = "Error";
        }
      }
      break;
    case "Backspace":
      display.value = display.value.slice(0, -1);
      break;
    case "Delete":
      display.value = "";
      break;
    case ".":
      if (!display.value.includes(".")) {
        display.value += ".";
      }
      break;
  }

  // For same operator input handling
  const lastChar = display.value[display.value.length - 1];
  if (
    ["+", "-", "*", "/", "%"].includes(event.key) &&
    ["+", "-", "*", "/", "%"].includes(lastChar)
  ) {
    display.value = display.value.slice(0, -1) + event.key; // Replace last operator
  }
});