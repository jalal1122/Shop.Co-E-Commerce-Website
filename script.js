// Fetch data from the API and log the category of each product
fetch('https://fakestoreapi.com/products')
  .then(response => response.json())
  .then(data => data.forEach(element => {
    console.log(element.category);
    
  }));

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
})

// Add on click event to close the hamburger menu
closeHamburger.addEventListener("click", () => {
    document.querySelector(".hamburger-menu").style.left = "-100%";
    overallTint.style.display = "none";
})
