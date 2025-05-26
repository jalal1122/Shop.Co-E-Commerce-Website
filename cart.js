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

function getCartItemsFromLocalStorage() {
  // Retrieve cart items from local storage
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  return cartItems;
}

function renderCartItems() {
  // Get the cart items from local storage
  const cartItems = getCartItemsFromLocalStorage();

  // Target the cart items container
  const cartItemsContainer = document.querySelector(".cart-items");

  // Clear the container before rendering
  cartItemsContainer.innerHTML = "";

  // Check if there are any items in the cart
  if (cartItems.length === 0) {
    cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
    return;
  }

  let cartItemsHTML = "";

  // Render each item in the cart
  cartItems.forEach((item) => {
    cartItemsHTML += `<div
              class="cart-item w-full flex items-center justify-center gap-5 p-5 bg-white border-2 border-[#f0f0f0] rounded-lg shadow-md"
            >
              <!-- Image -->
              <div class="left-image w-fit h-fit flex items-center justify-center p-2 shadow-lg rounded-lg">
                <img
                  src="${item.image}"
                  alt="Product Image"
                  class="aspect-auto w-60 rounded-lg"
                />
              </div>
              <!-- Right Side Details -->
              <div class="right-details w-full flex flex-col gap-5 justify-center">
                <div class="div flex flex-col gap-3">
                  <!-- Product Title -->
                  <h2 class="font-bold text-black text-2xl">${item.title}</h2>
                  <!-- Product Size -->
                  <p class="font-semibold text-lg text-black">Size : ${item.size}</p>
                </div>
                <div class="div flex gap-3 justify-between items-center">
                  <!-- Product Price -->
                  <h2 class="font-bold text-2xl text-black">$${item.price}</h2>
                  <!-- Product Quantity Selector -->
                  <div
                    class="quantity-selector bg-[#f0f0f0] flex gap-5 items-center justify-between px-3 py-1 rounded-full"
                  >
                    <button
                      class="decrease-quantity hover:cursor-pointer hover:bg-gray-300 rounded-full text-xl sm:text-2xl"
                    >
                      -
                    </button>
                    <span class="quantity font-bold text-md sm:text-lg">${item.quantity}</span>
                    <button
                      class="increase-quantity hover:cursor-pointer hover:bg-gray-300 rounded-full text-xl sm:text-2xl"
                    >
                      +
                    </button>
                  </div>
                </div>
                <!-- remove button -->
                <div class="remove-button flex justify-center items-center">
                  <button
                    class="remove-item bg-black w-3/4 text-white px-4 py-2 rounded-full hover:cursor-pointer active:scale-95 hover:bg-red-600"
                  >
                    <i class="fa-solid fa-trash"></i>
                  </button>
                </div>
              </div>
            </div>`;
  });

  // Insert the generated HTML into the cart items container
  cartItemsContainer.innerHTML = cartItemsHTML;

  let plusButtons = document.querySelectorAll(".increase-quantity");
  let minusButtons = document.querySelectorAll(".decrease-quantity");
  let quantitySpans = document.querySelectorAll(".quantity");

  let removeButtons = document.querySelectorAll(".remove-item");

  // Add event listeners to the remove buttons
  removeButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      // Remove the item from the cart
      const itemId = cartItems[index].id;
      const itemSize = cartItems[index].size;

      // Filter out the item to be removed
      const updatedCartItems = cartItems.filter(
        (item) => !(item.id === itemId && item.size === itemSize)
      );

      // Update local storage with the new cart items
      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));

      // Re-render the cart items
      renderCartItems();
      calculateSummary(); // Recalculate the summary
    });
  });

  // Add event listeners to the plus buttons
  plusButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      let quantity = parseInt(quantitySpans[index].textContent);
      quantity++;
      quantitySpans[index].textContent = quantity;
      updateCartItemQuantity(
        cartItems[index].id,
        cartItems[index].size,
        quantity
      );
    });
  });

  // Add event listeners to the minus buttons
  minusButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      let quantity = parseInt(quantitySpans[index].textContent);
      if (quantity > 1) {
        quantity--;
        quantitySpans[index].textContent = quantity;
        updateCartItemQuantity(
          cartItems[index].id,
          cartItems[index].size,
          quantity
        );
      }
    });
  });
}

// Function to update the quantity of an item in the cart
function updateCartItemQuantity(itemId, itemSize, newQuantity) {
  // Get the cart items from local storage
  const cartItems = getCartItemsFromLocalStorage();

  // Find the item in the cart and update its quantity
  const itemIndex = cartItems.findIndex(
    (item) => item.id === itemId && item.size === itemSize
  );
  if (itemIndex !== -1) {
    cartItems[itemIndex].quantity = newQuantity;
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    renderCartItems(); // Re-render the cart items
    calculateSummary(); // Recalculate the summary
  }
}

// on DOMContentLoaded, render the cart items
document.addEventListener("DOMContentLoaded", () => {
  renderCartItems();
  calculateSummary();
});

function calculateSummary() {
  // Get the cart items from local storage
  const cartItems = getCartItemsFromLocalStorage();

  // Calculate total price and total quantity
  let subtotalPrice = 0;
  let totalQuantity = 0;

  cartItems.forEach((item) => {
    subtotalPrice += item.price * item.quantity;
    totalQuantity += item.quantity;
  });

  // add delivery Fee
  let totalPrice = subtotalPrice + 15;

  // Target the summary elements
  const totalPriceElement = document.querySelector(".total-price");
  const subtotalPriceElement = document.querySelector(".subTotal");

  // Update the summary elements
  totalPriceElement.textContent = `$${totalPrice.toFixed(2)}`;
  subtotalPriceElement.textContent = `${subtotalPrice.toFixed(2)}`;
}
