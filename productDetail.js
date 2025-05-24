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
});
