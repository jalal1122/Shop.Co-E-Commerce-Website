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

// Function to get product details from local storage
function getProductFromLocalStorage() {
  const product = localStorage.getItem("clickedProduct");
  // Check if the product exists in local storage
  if (product) {
    return JSON.parse(product);
  }
  return null;
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

// When the DOM is fully loaded, execute the following code
document.addEventListener("DOMContentLoaded", () => {
  // Retrieve the product from local storage
  const product = getProductFromLocalStorage();

  // Check if the product exists
  if (product) {
    // target the product image element and update the image src
    document.querySelector(".product-img").src = product.image;
    // target the product price element and update the price text
    document.querySelector(".product-title").textContent = product.title;

    // target the product rating element and update the rating text
    document.querySelector(
      ".rating-stars"
    ).textContent = `Rating: ${ratingStars(product.rating.rate)}`;
  }

  // target the product description element and update the description text
  document.querySelector(".product-description").textContent =
    product.description;

  // target the product price element and update the price text
  document.querySelector(".product-price").textContent = `$${product.price}`;

  //   render the recommended products
  renderRecommendedProducts(getProductsFromLocalStorage());
});

// function to render the recommended products
function renderRecommendedProducts(products) {
  // retrieve the current page product
  const product = getProductFromLocalStorage();

  console.log(`Current product:`, product);
  console.log(`All products:`, products);

  // target the recommended products section
  const recommendedSection = document.querySelector(".recommended-products");

  // clear the recommended section
  recommendedSection.innerHTML = "";

  // filter the recommended products based on the current product category
  const recommendedProducts = products.filter((productItem) => {
    return (productItem.category === product.category && productItem.id !== product.id)
  });

  let recommendedProductsHTML = "";

  // iterate through the recommended products and create HTML for each
  recommendedProducts.forEach((productItem) => {
    recommendedProductsHTML += `
      <div class="product flex justify-center flex-col gap-2 bg-white p-5 rounded-3xl shadow-lg">
            <img src="${
              productItem.image
            }" class="w-50 self-center aspect-square" alt="">
            <h2 class="w-40 text-2xl font-semibold">${productItem.title}</h2>
            <span>${ratingStars(productItem.rating.rate)}</span>
            <p class="text-lg font-bold">Price : ${productItem.price} $</p>
          </div>
    `;
  });

  // set the inner HTML of the recommended section
  recommendedSection.innerHTML = recommendedProductsHTML;

  // Adding click event listeners to each product in the recommended section
  const productDivs = recommendedSection.querySelectorAll(".product");
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

// Function to retrieve products from local storage
function getProductsFromLocalStorage() {
  const products = localStorage.getItem("products");
  // Check if products exist in local storage
  // If they do, parse and return them
  // If not, return null
  return products ? JSON.parse(products) : null;
}
