// target the hamburger menu
let hamburger = document.querySelector(".hamburger>i");

// target the close sign for the hamburger menu
let closeHamburger = document.querySelector(".close-sign-for-hamburger-menu>i");

// target the Overall Tint
let overallTint = document.querySelector(".overall-tint");

// Add on click event to open the hamburger menu
hamburger.addEventListener("click", () => {
  document.querySelector(".hamburger-menu").style.left = "0%";
  overallTint.style.display = "block";
});

// Add on click event to close the hamburger menu
closeHamburger.addEventListener("click", () => {
  document.querySelector(".hamburger-menu").style.left = "-100%";
  overallTint.style.display = "none";
});

// go to index.html page and scroll to the hero section function
function gotoHome() {
  window.location.href = "index.html#heroSection";
}

// go to index.html page and scroll to the top selling section function
function gotoTopSelling() {
  window.location.href = "index.html#topSelling";
}

// go to index.html page and scroll to the new arrivals section function
function gotoArrival() {
  window.location.href = "index.html#newArrivals";
}

// add event listener to the go to home and prevent refresh
document.querySelector(".goToHome").addEventListener("click", (e) => {
  e.preventDefault();
  gotoHome();
});

// add event listener to the go to top selling and prevent refresh
document.querySelector(".goToTopSelling").addEventListener("click", (e) => {
  e.preventDefault();
  gotoTopSelling();
});

// add event listener to the go to new arrivals and prevent refresh
document.querySelector(".goToNewArrivals").addEventListener("click", (e) => {
  e.preventDefault();
  gotoArrival();
});

// add event listener to the go to home and prevent refresh
document.querySelector(".goToHome2").addEventListener("click", (e) => {
  e.preventDefault();
  gotoHome();
});

// add event listener to the go to top selling and prevent refresh
document.querySelector(".goToTopSelling2").addEventListener("click", (e) => {
  e.preventDefault();
  gotoTopSelling();
});

// add event listener to the go to new arrivals and prevent refresh
document.querySelector(".goToNewArrivals2").addEventListener("click", (e) => {
  e.preventDefault();
  gotoArrival();
});

// Add event listener to the "Go to Top" arrow button
document.querySelector(".go-to-top-arrow").addEventListener("click", (e) => {
  e.preventDefault();

  // Scroll to the top of the page
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Target the payment buttons
let paymentButtons = document.querySelectorAll(".payment-method img");

// Add click event listeners to each payment button
paymentButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    let imgUrl = e.target.src;
    document.querySelector(".selected-payment-method img").src = imgUrl;
    e.target.parentElement.style.transform = "scale(0.9)";
    setTimeout(() => {
      e.target.parentElement.style.transform = "scale(1)";
    }, 200);
  });
});

// target the billing form inputs
let billingFormInputs = document.querySelectorAll(".billing-form input");

// Add input event listeners to each billing form input
billingFormInputs.forEach((input) => {
  input.addEventListener("input", (e) => {
    // Get the id and value of the input field
    let inputId = e.target.id;
    let inputValue = e.target.value;

    // Update the corresponding value in the billing summary
    if (inputId === "fullName") {
      document.querySelector(".name-value").textContent = inputValue;
    } else if (inputId === "email") {
      document.querySelector(".email-value").textContent = inputValue;
    } else if (inputId === "phoneNumber") {
      document.querySelector(".phone-value").textContent = inputValue;
    } else if (inputId === "address") {
      document.querySelector(".address-value").textContent = inputValue;
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  // Initialize the billing form inputs with empty values
  billingFormInputs.forEach((input) => {
    if (!(input.id === "confirmOrder")) {
      input.value = "";
    }
  });

  // Set the initial values in the billing summary
  document.querySelector(".name-value").textContent = "";
  document.querySelector(".email-value").textContent = "";
  document.querySelector(".phone-value").textContent = "";
  document.querySelector(".address-value").textContent = "";
});

// target the form
let billingForm = document.querySelector(".billing-form");

// Add submit event listener to the billing form
billingForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Validate the form inputs
  if (!fullName || !email || !phoneNumber || !address) {
    alert("Please fill in all fields.");
    return;
  }

  // Show a toast message
  showToast();
});

// Function to show a toast message
function showToast(message = "Order placed successfully!") {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.remove("hidden");

  setTimeout(() => {
    toast.classList.add("hidden");
  }, 3000); // hide after 3 seconds
}
