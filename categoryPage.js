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

document.addEventListener("DOMContentLoaded", () => {
  const products = JSON.parse(localStorage.getItem("products"));
  console.log(products);
  renderProducts(products, currentPage);
  renderPagination(products);
});

// current page variable
let currentPage = 1;
// total number of products per page variable
const perPage = 8;

// Function to display rating stars based on the rating value
function ratingStars(rating) {
  // declare a variable to store the stars
  let stars = "";
  // using a for loop to iterate through the rating value
  for (let i = 0; i < Math.floor(rating); i++) {
    // adding a star to the stars variable
    stars += "⭐";
  }
  // checking if the rating value is a decimal
  // if it is, add a half star to the stars variable
  if (rating % 1 !== 0) {
    stars += "⭐";
  }
  // returning the stars variable
  return stars;
}

function renderPagination(products) {
  // target the pagination container
  let paginationContainer = document.querySelector(".number-pages");

  // calculate the total number of pages
  const totalPages = Math.ceil(products.length / perPage);

  // clear the pagination container
  paginationContainer.innerHTML = "";

  // target the next button
  let nextBtn = document.querySelector(".next-button");
  // target the previous button
  let prevBtn = document.querySelector(".prev-button");

  // Remove all event listeners by cloning
  let newNextBtn = nextBtn.cloneNode(true);
  let newPrevBtn = prevBtn.cloneNode(true);
  nextBtn.parentNode.replaceChild(newNextBtn, nextBtn);
  prevBtn.parentNode.replaceChild(newPrevBtn, prevBtn);
  nextBtn = newNextBtn;
  prevBtn = newPrevBtn;

  // Next button event
  nextBtn.addEventListener("click", () => {
    if (currentPage < totalPages) {
      currentPage++;
      renderProducts(products, currentPage);
      renderPagination(products);
      window.scrollTo(0, 0);
    }
  });

  // Prev button event
  prevBtn.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      renderProducts(products, currentPage);
      renderPagination(products);
      window.scrollTo(0, 0);
    }
  });

  // Set button states and classes
  if (currentPage === totalPages) {
    nextBtn.disabled = true;
    nextBtn.classList.remove(
      "bg-white",
      "hover:cursor-pointer",
      "hover:text-white",
      "hover:bg-black",
      "hover:scale-105"
    );
    nextBtn.classList.add("bg-gray-300", "cursor-not-allowed");
  } else {
    nextBtn.disabled = false;
    nextBtn.classList.remove("bg-gray-300", "cursor-not-allowed");
    nextBtn.classList.add(
      "bg-white",
      "hover:cursor-pointer",
      "hover:text-white",
      "hover:bg-black",
      "hover:scale-105"
    );
  }

  if (currentPage === 1) {
    prevBtn.disabled = true;
    prevBtn.classList.remove(
      "bg-white",
      "hover:cursor-pointer",
      "hover:text-white",
      "hover:bg-black",
      "hover:scale-105"
    );
    prevBtn.classList.add("bg-gray-300", "cursor-not-allowed");
  } else {
    prevBtn.disabled = false;
    prevBtn.classList.remove("bg-gray-300", "cursor-not-allowed");
    prevBtn.classList.add(
      "bg-white",
      "hover:cursor-pointer",
      "hover:text-white",
      "hover:bg-black",
      "hover:scale-105"
    );
  }

  for (let i = 1; i <= totalPages; i++) {
    // create a button for each page
    let pageButton = document.createElement("button");
    pageButton.innerText = i;
    pageButton.className =
      "page-number  font-semibold px-4 py-2 rounded-md hover:bg-gray-300 hover:cursor-pointer";

    //   if the page number is the current page, add a class to it
    // which is background black and text white
    // else add a class to it which is background gray
    // and text black
    if (i === currentPage) {
      pageButton.classList.add("bg-black", "text-white");
    } else {
      pageButton.classList.add("bg-gray-200","text-black");
    }

    // add an event listener to the pagination button
    pageButton.addEventListener("click", () => {
      // make the current page the clicked page
      currentPage = i;
      // render the products for the current page
      renderProducts(products, i);
      //   render the pagination buttons
      renderPagination(products);

      // Scroll to the top of the page
      window.scrollTo(0, 0);
    });

    // append the button to the pagination container
    paginationContainer.appendChild(pageButton);
  }
}

// Function to render products on the page
function renderProducts(products, page) {
  // variable of index to start the product from the list of products
  const startIndex = (page - 1) * perPage;
  // variable of index to end the product from the list of products
  const endIndex = startIndex + perPage;

  // slice the products array to get the products for the current page
  let slicedProducts = products.slice(startIndex, endIndex);

    // target the showing total products and udpate it with real time product lenghts and current page products etc
  document.querySelector(".showing-total-products").innerHTML = `showing ${
    startIndex + 1
  }-${Math.min(endIndex, products.length)} of ${products.length} Products`;

  // target the products container
  let productContainer = document.getElementById("products");

  productContainer.innerHTML = ""; // Clear the container before adding new products

  //   iterate through the sliced products and add them to the product container
  slicedProducts.map((product) => {
    productContainer.innerHTML += `
        <div class="product flex justify-center flex-col gap-2 bg-white p-5 rounded-3xl shadow-lg">
            <img src="${
              product.image
            }" class="w-50 self-center aspect-square" alt="">
            <h2 class="w-40 text-2xl font-semibold">${product.title}</h2>
            <span>${ratingStars(product.rating.rate)}</span>
            <p class="text-lg font-bold">Price : ${product.price} $</p>
        </div>  
          `;
  });
}
