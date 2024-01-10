const checkoutPage = document.querySelector(".checkout-page");
const shoppingCartEmpty = document.querySelector(".shopping-cart-empty");
const orderPlacedText = document.querySelector(".order-placed");
const parentOfDiv = document.querySelector("main > div > div > div");

shoppingCartEmpty.style.display = "none";
orderPlacedText.style.display = "none";
checkoutPage.style.display = "none";

function getShoppingCardItems() {
    if (localStorage.getItem('inWinkelwagen') == null) {
        shoppingCartEmpty.style.display = "block";
    }
    return JSON.parse(localStorage.getItem('inWinkelwagen'));
}

function setProducts(product) {
    localStorage.setItem('inWinkelwagen', JSON.stringify(product));
}

function displayShoppingCardProducts() {
    const productData = getShoppingCardItems();

    if (productData != null) {
        productData.forEach((product, i) => {
            const div = createShoppingCardProductDiv(product, i);
            parentOfDiv.append(div);
            plusQuantityButton(productData, i);
            minQuantityButton(productData, i);
            deleteProductFromBasket(productData, i);
        });
    }
    placeOrder(productData);
    calculateOrderPrice(productData);
}

function createShoppingCardProductDiv(product, i) {
    const div = document.createElement("div");
    div.setAttribute("id", i);

    div.innerHTML = `<div class="justify-between mt-5 mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
    <img src="${product.img}" alt="${product.name}-image" class="w-full w-36 h-20 md:w-44 h-20 rounded-lg sm:w-40" />
    <div class="sm:ml-4 sm:flex sm:w-full sm:justify-between">
        <div class="mt-5 sm:mt-0">
            <h2 class="text-lg font-bold text-gray-900">${product.name}</h2>
            <p class="mt-1 text-xs text-gray-700">${product.type}</p>
        </div>
        <div class="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
            <div class="flex items-center border-gray-100">
                <span id="minbutton-${i}"
                    class="
                    cursor-pointer 
                    rounded-l 
                    bg-gray-100 
                    py-1 
                    px-3.5 
                    duration-100 
                    hover:bg-secondarycolor 
                    hover:text-blue-50">
                    - </span>
                <input id="input-${i}" class="appearance-none h-8 w-8 border bg-white text-center text-xs outline-none"
                    type="bedrag" value="${product.productAmount}" min="1" disabled>
                
                
                    <span id="plusbutton-${i}"
                    class="
                    cursor-pointer 
                    rounded-r 
                    bg-gray-100 
                    py-1 
                    px-3 
                    duration-100 
                    hover:bg-secondarycolor 
                    hover:text-blue-50">
                    + </span>
            </div>
            <div class="flex items-center space-x-4">
                <p class="text-md font-bold ">€ 
                <span id="price-product-${i}">${(product.price * product.productAmount).toFixed(2)}</span></p>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                    stroke-width="1.5" stroke="currentColor"
                    id="cross-${i}" class="h-5 w-5 cursor-pointer duration-150 hover:text-red-500">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </div>
        </div>
    </div>
</div>`;
    return div;
}

function createCheckoutPageDiv() {
    const div = document.createElement("div");

    div.innerHTML = `<div class="mb-2 flex justify-between">
        <p class="text-gray-700">Btw 21%</p>
        <p class="text-gray-700">€ <span id="tax-amount">0</span></p>
    </div>
    <hr class="my-4">
    <div class="flex justify-between">
        <p class="text-lg font-bold">Totaal</p>
        <div class="">
            <p id="prijs" class="mb-1 text-lg font-bold">€ <span id="total-amount">0</span></p>
            <p class="text-sm text-gray-700">Inclusief btw</p>
        </div>
    </div>
        <button
            id="checkout-button" 
                class="
                mt-6 
                w-full 
                rounded-md 
                bg-secondarycolor 
                py-1.5 font-medium 
                text-blue-50 
                hover:bg-test"
                >Afrekenen</button>`;
    return div;
}

function plusQuantityButton(productData, i) {
    const input = document.querySelector(`#input-${i}`);
    const priceProduct = document.querySelector(`#price-product-${i}`);
    const plusButton = document.querySelector(`#plusbutton-${i}`);

    plusButton.addEventListener("click", () => {
        productData[i].productAmount += 1;
        input.value = parseInt(input.value) + 1;
        priceProduct.innerHTML = (productData[i].productAmount * productData[i].price).toFixed(2);
        calculateOrderPrice(productData);
        setProducts(productData);
    });
}

function minQuantityButton(productData, i) {
    const input = document.querySelector(`#input-${i}`);
    const priceProduct = document.querySelector(`#price-product-${i}`);
    const minButton = document.querySelector(`#minbutton-${i}`);

    minButton.addEventListener("click", () => {
        if (input.value > 1) {
            productData[i].productAmount -= 1;
            input.value = parseInt(input.value) - 1;
            priceProduct.innerHTML = (productData[i].productAmount * productData[i].price).toFixed(2);
            calculateOrderPrice(productData);
            setProducts(productData);
        }
    });
}

function deleteProductFromBasket(productData, i) {
    const deleteButton = document.querySelector(`#cross-${i}`);
    const inBasketIcon1 = document.querySelector(".in-basket-circle1");
    const inBasketIcon2 = document.querySelector(".in-basket-circle2");

    deleteButton.addEventListener("click", () => {
        productData.splice(i, 1);

        if (productData.length > 0) {
            parentOfDiv.innerHTML = "";
            setProducts(productData);
            displayShoppingCardProducts();
        } else {
            checkoutPage.style.display = "none";
            parentOfDiv.style.display = "none";
            inBasketIcon1.style.display = "none";
            inBasketIcon2.style.display = "none";
            shoppingCartEmpty.style.display = "block";
            localStorage.removeItem("inWinkelwagen");
        }
    });
}

function test() {
    if (localStorage.getItem('inWinkelwagen') == null) {
        console.log("werkt");
    }
}

function checkIfShoppingCartIsNotEmpty() {
    const shoppingCartArray = JSON.parse(localStorage.getItem('inWinkelwagen'));
    if (shoppingCartArray != null) {
        const checkoutItem = createCheckoutPageDiv();
        checkoutPage.append(checkoutItem);
        checkoutPage.style.display = "block";
    }
}

function calculateOrderPrice(productData) {
    const taxAmount = document.querySelector("#tax-amount");
    const totalAmount = document.querySelector("#total-amount");
    const shoppingCartArray = JSON.parse(localStorage.getItem('inWinkelwagen'));
    let totalPrice = 0;

    if (shoppingCartArray != null) {
        for (let index = 0; index < productData.length; index++) {
            totalPrice += productData[index].productAmount * productData[index].price;
        }
        taxAmount.innerHTML = ((totalPrice / 100) * 21).toFixed(2);
        totalAmount.innerHTML = (totalPrice).toFixed(2);
    }
}

function placeOrder(products) {
    const checkoutButton = document.querySelector("#checkout-button");
    const inBasketIcon1 = document.querySelector(".in-basket-circle1");
    const inBasketIcon2 = document.querySelector(".in-basket-circle2");

    if (products != null) {
        checkoutButton.addEventListener("click", () => {
            createOrder(products);
            localStorage.removeItem("inWinkelwagen");
            checkoutPage.style.display = "none";
            parentOfDiv.style.display = "none";
            inBasketIcon1.style.display = "none";
            inBasketIcon2.style.display = "none";
            orderPlacedText.style.display = "block";
        });
    }
}

function createOrder(products) {
    const totalAmount = document.querySelector("#total-amount");
    const orders = getOrders();
    const id = orders ? orders.length : 0;
    const total = totalAmount.innerHTML;
    const time = new Date();

    const newOrder = {
        id,
        products,
        total,
        time,
    };

    if (orders) {
        orders.push(newOrder);
        setOrders(orders);
    } else {
        setOrders([newOrder]);
    }
}

function getOrders() {
    return JSON.parse(localStorage.getItem("orders"));
}

function setOrders(orders) {
    return localStorage.setItem("orders", JSON.stringify(orders));
}

checkIfShoppingCartIsNotEmpty();
getShoppingCardItems();
displayShoppingCardProducts();