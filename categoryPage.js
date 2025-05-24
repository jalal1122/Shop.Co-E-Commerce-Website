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

// current page variable
let currentPage = 1;
// total number of products per page variable
const perPage = 8;

// target the men Clothing checkbox to filter products
let menClothingCheckbox = document.getElementById("menclothing");

// target the women Clothing checkbox to filter products
let womenClothingCheckbox = document.getElementById("womenclothing");

// target the jewelry checkbox to filter products
let jewelryCheckbox = document.getElementById("jewelry");

// target the electronics checkbox to filter products
let electronicsCheckbox = document.getElementById("electronics");

// target the price min input to filter products
let priceMinInput = document.getElementById("minPrice");
// target the price max input to filter products
let priceMaxInput = document.getElementById("maxPrice");

// Initialize an empty array to store all products
let allProducts = [];
// Initialize an empty array to store filtered and current page products
let products = [];

// on document load, do the following
document.addEventListener("DOMContentLoaded", () => {
  // Fetch products from the localStorage
  const stored = localStorage.getItem("products");
  // If products are stored, parse them; otherwise, initialize an empty array
  allProducts = stored ? JSON.parse(stored) : [];
  // store the all products in the products array
  products = [...allProducts];
  // Render the products for the first page
  renderProducts(products, currentPage);
  // Render the pagination for the products
  renderPagination(products);
});

// Add event listener to the price min input to filter products
priceMinInput.addEventListener("input", () => {
  checkfilters();
});

// Add event listener to the price max input to filter products
priceMaxInput.addEventListener("input", () => {
  checkfilters();
});

// Add event listeners to the checkboxes to filter products
menClothingCheckbox.addEventListener("change", () => {
  checkfilters();
});
womenClothingCheckbox.addEventListener("change", () => {
  checkfilters();
});
jewelryCheckbox.addEventListener("change", () => {
  checkfilters();
});
electronicsCheckbox.addEventListener("change", () => {
  checkfilters();
});

// Function to check the selected filters and update the products array
function checkfilters() {
  // create a new array to store the selected categories
  let selectedCategories = [];

  // check if the checkboxes are checked and push the corresponding category to the selectedCategories array
  if (menClothingCheckbox.checked) selectedCategories.push("men's clothing");
  if (womenClothingCheckbox.checked)
    selectedCategories.push("women's clothing");
  if (jewelryCheckbox.checked) selectedCategories.push("jewelery");
  if (electronicsCheckbox.checked) selectedCategories.push("electronics");

  // Get the minimum price value from the input
  const minPrice = parseFloat(priceMinInput.value) || 0; // Default to 0 if input is empty

  // Get the maximum price value from the input
  const maxPrice = parseFloat(priceMaxInput.value) || Infinity; // Default to Infinity if input is empty

  // If no checkboxes are selected, show all products
  if (selectedCategories.length === 0) {
    products = [...allProducts]; // If no category is selected, show all products
  }
  // If checkboxes are selected, filter products based on the selected categories
  else {
    products = allProducts.filter((product) =>
      selectedCategories.includes(product.category)
    );
    // Filter products based on the minimum price
    // This ensures that only products with a price greater than or equal to the minimum price are shown
    products = [...products.filter((product) => product.price >= minPrice)];

    // Filter products based on the maximum price
    // This ensures that only products with a price less than or equal to the maximum price are shown
    products = [...products.filter((product) => product.price <= maxPrice)];
  }

  // Reset the current page to 1 and re-render products and pagination
  // This ensures that the user sees the first page of the filtered products
  currentPage = 1;
  renderProducts(products, currentPage);
  renderPagination(products);
}

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

// Function to render pagination buttons
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
      pageButton.classList.add("bg-gray-200", "text-black");
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

// Function to retrieve products from local storage
function getProductsFromLocalStorage() {
  const products = localStorage.getItem("products");
  // Check if products exist in local storage
  // If they do, parse and return them
  // If not, return null
  return products ? JSON.parse(products) : null;
}

// Function to render products on the page
function renderProducts(products, page) {
  if (products.length === 0) {
    // If no products are found, display a message
    document.getElementById("products").innerHTML = `
      <div class="no-products-found text-center text-2xl font-bold mt-10">
        No products found for the selected filters.
      </div>
    `;
    return;
  }

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

  let productsString = "";

  //   iterate through the sliced products and add them to the product container
  slicedProducts.forEach((product) => {
    productsString += `
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

  productContainer.innerHTML = productsString; // Update the product container with the new products

  // Adding click event listeners to each product in the arrival section
  const productDivs = productContainer.querySelectorAll(".product");
  productDivs.forEach((div) => {
    div.addEventListener("click", productClick);
  });
}

// Function to handle product click event
function productClick(e) {
  // Get the clicked product element
  const productElement = e.currentTarget;

  // Get the product title from the clicked element
  const productTitle = productElement.querySelector("h2").innerText.trim();

  // Retrieve products from local storage
  const products = getProductsFromLocalStorage();

  // Find the clicked product in the products array
  const clickedProduct = products.find(
    (product) => product.title.trim() === productTitle
  );

  // If the clicked product is found, redirect to the product details page
  if (clickedProduct) {
    localStorage.setItem("clickedProduct", JSON.stringify(clickedProduct));
    window.location.href = "./productDetail.html";
  }
}
