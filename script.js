//product element array
let fetchedProducts = [];
const productItems = [];

//dom elements
const productsWrapper = document.getElementById("product-wrapper");
const checkboxes = document.querySelectorAll(".check");
const filtersContainder = document.getElementById("filters-container");
const searchInput = document.getElementById("search");
const cartCount = document.getElementById("cart-count");

//cart item count

let cartItemsCount = 0;

fetch("altered_books_data.json")
  .then((res) => res.json())
  .then((products) => {
    fetchedProducts = products;

    //Event listeners for filters
    filtersContainder.addEventListener("change", filterProducts);
    searchInput.addEventListener("input", filterProducts);

    //loop over product and create element
    products.forEach((product) => {
      const productElement = createProduct(product);
      productItems.push(productElement);
      productsWrapper.appendChild(productElement);
    });

    //Create product element
    function createProduct(product) {
      const productElement = document.createElement("div");

      productElement.className = "item space-y-2";
      console.log(productElement);

      productElement.innerHTML = `
    
    <div class="bg-gray-100 flex justify-center relative overflow-hidden group 
                cursor-pointer border rounded-xl">

                    <img 
                    src="${product.imageUrl}" 
                    alt="${product.title}" 
                    class="w-auto object-cover"
                    >
                    <button class="status bg-cyan-900 text-white absolute bottom-0 left-0 right-0 
                    text-center py-2 translate-y-full transition group-hover:translate-y-0 ">
                        Add to Cart
                    </button>
                </div>
                <p class="text-xl line-clamp-2">${product.title}</p>
                <strong>Rs.${product.price.toLocaleString()}</strong>
    
    `;

      productElement
        .querySelector(".status")
        .addEventListener("click", updateCart);

      return productElement;
    }
  });

//updateCart function
function updateCart(e) {
  const statusEl = e.target;

  if (statusEl.classList.contains("added")) {
    //remove from cart list
    statusEl.classList.remove("added");
    statusEl.innerText = "Add To Cart";
    statusEl.classList.remove("bg-red-800");
    statusEl.classList.add("bg-cyan-900");
    cartItemsCount--;
  } else {
    //add to cart list
    statusEl.classList.add("added");
    statusEl.innerText = "Remove From Cart";
    statusEl.classList.remove("bg-cyan-900");
    statusEl.classList.add("bg-red-800");

    cartItemsCount++;
  }

  //update cart item count
  cartCount.innerText = cartItemsCount.toString();
}

//filter products
function filterProducts() {
  //search
  const searchValue = searchInput.value.trim().toLowerCase();
  //checkbox
  const checkbox = Array.from(checkboxes)
    .filter((check) => check.checked)
    .map((check) => check.id);

  console.log("Checkbox Values: ", checkbox);

  productItems.forEach((productElement, index) => {
    const product = fetchedProducts[index];

    //if product matches checkbox or search
    const matches = product.title.toLowerCase().includes(searchValue);
    const incheckbox =
      checkbox.length === 0 || checkbox.includes(product.category);
      
    
    //show or hide product
    if (matches && incheckbox) {
      productElement.classList.remove("hidden");
    } else {
      productElement.classList.add("hidden");
    }
    
  });
}
