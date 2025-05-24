// This function fetches products from the API and returns them as a JSON object
async function fetchProducts() {
  // using try and catch to handle errors
  try {
    // Fetching data from the API
    const response = await fetch("https://fakestoreapi.com/products");
    // Checking if the response is ok
    if (!response.ok) {
      // If not, throw an error
      throw new Error("Network response was not ok");
    }
    // Parsing the response data as JSON
    const data = await response.json();
    // return the data in object format
    return data;
  } catch (error) {
    // Catching any errors that occur during the fetch
    // Logging the error to the console
    console.error("Error fetching products:", error);
  }
}

// Function to go to home page top
function gotoHOmeTop() {
  window.location.href = "./index.html";
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

// Function to store products in local storage
function storeProductsInLocalStorage(products) {
  localStorage.setItem("products", JSON.stringify(products));
}

// Function to retrieve products from local storage
function getProductsFromLocalStorage() {
  const products = localStorage.getItem("products");
  // Check if products exist in local storage
  // If they do, parse and return them
  // If not, return null
  return products ? JSON.parse(products) : null;
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

// Function to display Arrival products in arrival section
function displayArrivalProducts(products) {
  // target the arrival section
  let arrivalSection = document.querySelector(".arrival-products");

  // declare a variable to store the arrival products
  let arrivalProducts = [];

  // using the find method to find the first product in each category
  const menClothing = products.find(
    (product) => product.category === "men's clothing"
  );
  const womenClothing = products.find(
    (product) => product.category === "women's clothing"
  );
  const jewelery = products.find((product) => product.category === "jewelery");
  const electronics = products.find(
    (product) => product.category === "electronics"
  );

  // pushing the products to the arrivalProducts array
  arrivalProducts.push(menClothing);
  arrivalProducts.push(womenClothing);
  arrivalProducts.push(jewelery);
  arrivalProducts.push(electronics);

  console.log(arrivalProducts);

  arrivalSection.innerHTML = ""; // Clear the section before adding new products

  // using forEach to iterate through the arrivalProducts array
  // and adding the products to the arrival section
  arrivalProducts.forEach((product) => {
    arrivalSection.innerHTML += `
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

  // Adding click event listeners to each product in the arrival section
  const productDivs = arrivalSection.querySelectorAll(".product");
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

  console.log(`Clicked product title: ${productTitle}`);

  // Retrieve products from local storage
  const products = getProductsFromLocalStorage();

  // Find the clicked product in the products array
  const clickedProduct = products.find(
    (product) => product.title.trim() === productTitle
  );

  console.log(`Clicked product:`, clickedProduct);

  // If the clicked product is found, redirect to the product details page
  if (clickedProduct) {
    localStorage.setItem("clickedProduct", JSON.stringify(clickedProduct));
    window.location.href = "./productDetail.html";
  }
}

// Function to display Top Selling products in top selling section
function displayTopSellingProducts(products) {
  // target the top selling section
  let topSellingSection = document.querySelector(".topSellingProducts");

  // declare a variable to store the top selling products
  let topSellingProducts = [];

  // using the find method to find the first product in each category
  const menClothing = products.filter(
    (product) => product.category === "men's clothing"
  );
  const womenClothing = products.filter(
    (product) => product.category === "women's clothing"
  );
  const jewelery = products.filter(
    (product) => product.category === "jewelery"
  );
  const electronics = products.filter(
    (product) => product.category === "electronics"
  );

  topSellingProducts.push(menClothing[2]);
  topSellingProducts.push(womenClothing[2]);
  topSellingProducts.push(jewelery[2]);
  topSellingProducts.push(electronics[2]);

  topSellingSection.innerHTML = ""; // Clear the section before adding new products

  // using forEach to iterate through the Top Selling products array
  // and adding the products to the top selling section
  topSellingProducts.forEach((product) => {
    topSellingSection.innerHTML += `
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

  // Adding click event listeners to each product in the top selling section
  const productDivs = topSellingSection.querySelectorAll(".product");
  productDivs.forEach((div) => {
    div.addEventListener("click", productClick);
  });
}

async function main() {
  // fetching products from the API
  let products = await fetchProducts();
  // checking if products exist in local storage
  if (!products) {
    console.error("No products found");
    return;
  }
  // if they do then store them in local storage
  else {
    storeProductsInLocalStorage(products);
  }

  // display the products in the arrival section
  displayArrivalProducts(products);

  // display the products in the top selling section
  displayTopSellingProducts(products);

  // add click event listener to the go to top arrow button
  document.querySelector(".go-to-top-arrow").addEventListener("click", (e) => {
    e.preventDefault();

    // Scroll to the top of the page
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // target the hamburger menu
  let hamburger = document.querySelector(".hamburger>i");

  // target the close sign for the hamburger menu
  let closeHamburger = document.querySelector(
    ".close-sign-for-hamburger-menu>i"
  );

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

  const swiper = new Swiper(".swiper", {
    // Optional parameters
    direction: "horizontal",
    speed: 400,
    spaceBetween: 100,
    slidesPerView: 1,
    spaceBetween: 10,
    // Navigation arrows
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    // Responsive breakpoints
    breakpoints: {
      // when window width is >= 320px
      320: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      // when window width is >= 640px
      768: {
        slidesPerView: 2,
        spaceBetween: 30,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 40,
      },
      1440: {
        slidesPerView: 4,
        spaceBetween: 50,
      },
    },
  });
}

// Call the main function to execute the code
main();
