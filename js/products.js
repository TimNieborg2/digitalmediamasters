const parentOfDiv = document.querySelector("main > div > div");

async function fetchProducts() {
    const response = await fetch("./products.json");
    const data = await response.json();
    return data;
}

async function getProducts() {
    if (localStorage.getItem('producten') == null) {
        const products = await fetchProducts();
        setProducts(products);
    }
    return JSON.parse(localStorage.getItem('producten'));
}

function setProducts(products) {
    localStorage.setItem('producten', JSON.stringify(products));
}

async function displayProducts() {
    const productData = await getProducts();

    productData.forEach((product, i) => {
        const div = createProductDiv(product, i);

        parentOfDiv.append(div);
        productInShoppingcart(product, i);
    });
}

function createProductDiv(product, i) {
    const div = document.createElement("div");
    div.classList.add("sm:w-1/2", "md:w-1/2", "xl:w-1/4", "p-4");
    div.setAttribute("id", product.id);

    div.innerHTML = `<div class="c-card block bg-white shadow-md hover:shadow-xl rounded-lg overflow-hidden">
    <div class="relative pb-48 overflow-hidden">
        <img class="absolute inset-0 h-full w-full object-cover"
            src="${product.img}" alt="${product.name}-logo">
    </div>
    <div class="p-4 h-58 md:h-64">
     <div>
        <span
            class="
                ${(product.popular === "true") ? "inline-block" : "hidden"} 
                px-2 
                py-1 
                leading-none 
                bg-secondarycolor 
                text-white rounded-full 
                font-semibold 
                uppercase 
                tracking-wide 
                text-xs"
            >Populair</span>
        <div>
            <h2 class="mt-2 mb-2 font-bold">${product.name}</h2>
            <p class="text-sm">${product.description}</p>
        </div>
     </div>
    </div>
        <div class="p-4 border-t text-gray-700">
        <div class="grid grid-cols-6 gap-4 flex items-center">
        <div class="col-start-1 col-end-3">
        <span class="font-bold text-lg md:text-xl">€ ${product.price}</span>
        </div>
        <div class="col-end-7 col-span-1">
        <button class="
        flex 
        items-center 
        hover:bg-test 
        bg-tertiarycolor 
        p-2 
        rounded-lg 
        shoppingcart-button" id="shoppingcart-button-${product.id}">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none"
                viewBox="0 0 24 24" stroke="white">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="
                    M3 3h2l.4 2M7 
                    13h10l4-8H5.4M7 
                    13L5.4 5M7 
                    13l-2.293 
                    2.293c-.63.63-.184
                    1.707.707 
                    1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z">
            </svg>
        </button>
        </div>
     </div>
        </div>
        <div class="p-4 border-t border-b text-xs text-gray-700">
        <span class="flex items-center mb-1 font-bold">
            ${product.type}
        </span>
        <span class="flex items-center font-bold">
            ${product.releaseYear}
        </span>
    </div>
    <div class="p-4 flex items-center text-sm text-gray-600"><svg viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 fill-current text-yellow-500">
            <path
                d="M8.128 
                19.825a1.586 
                1.586 0 0 1-1.643-.117 1.543 1.543 
                0 0 1-.53-.662 1.515 1.515 0 0 
                1-.096-.837l.736-4.247-3.13-3a1.514 1.514 0 0 
                1-.39-1.569c.09-.271.254-.513.475-.698.22-.185.49-.306.776-.35L8.66 
                7.73l1.925-3.862c.128-.26.328-.48.577-.633a1.584 
                1.584 0 0 1 1.662 0c.25.153.45.373.577.633l1.925 3.847 
                4.334.615c.29.042.562.162.785.348.224.186.39.43.48.704a1.514 
                1.514 0 0 1-.404 1.58l-3.13 3 .736 4.247c.047.282.014.572-.096.837-.111.265-.294.494-.53.662a1.582 
                1.582 0 0 1-1.643.117l-3.865-2-3.865 2z">
            </path>
        </svg><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 fill-current text-yellow-500">
            <path
                d="M8.128 
                19.825a1.586 
                1.586 0 0 1-1.643-.117 
                1.543 1.543 0 0 1-.53-.662 1.515 1.515 0 0 
                1-.096-.837l.736-4.247-3.13-3a1.514 1.514 0 0 
                1-.39-1.569c.09-.271.254-.513.475-.698.22-.185.49-.306.776-.35L8.66 
                7.73l1.925-3.862c.128-.26.328-.48.577-.633a1.584 1.584 0 0 1 
                1.662 0c.25.153.45.373.577.633l1.925 
                3.847 4.334.615c.29.042.562.162.785.348.224.186.39.43.48.704a1.514 
                1.514 0 0 1-.404 1.58l-3.13 3 .736 4.247c.047.282.014.572-.096.837-.111.265-.294.494-.53.662a1.582 
                1.582 0 0 1-1.643.117l-3.865-2-3.865 2z">
            </path>
        </svg><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 fill-current text-yellow-500">
            <path
                d="M8.128 
                19.825a1.586 
                1.586 0 0 1-1.643-.117 
                1.543 
                1.543 0 0 1-.53-.662 1.515 1.515 0 0 
                1-.096-.837l.736-4.247-3.13-3a1.514 1.514 0 0 
                1-.39-1.569c.09-.271.254-.513.475-.698.22-.185.49-.306.776-.35L8.66 
                7.73l1.925-3.862c.128-.26.328-.48.577-.633a1.584 1.584 0 0 1 1.662 
                0c.25.153.45.373.577.633l1.925 3.847 
                4.334.615c.29.042.562.162.785.348.224.186.39.43.48.704a1.514 
                1.514 0 0 1-.404 1.58l-3.13 3 
                .736 4.247c.047.282.014.572-.096.837-.111.265-.294.494-.53.662a1.582 1.582 
                0 0 1-1.643.117l-3.865-2-3.865 2z">
            </path>
        </svg><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 fill-current text-yellow-500">
            <path
                d="M8.128 
                19.825a1.586 
                1.586 0 0 1-1.643-.117 
                1.543 1.543 0 0 
                1-.53-.662 1.515 1.515 0 0 
                1-.096-.837l.736-4.247-3.13-3a1.514 1.514 0 0 
                1-.39-1.569c.09-.271.254-.513.475-.698.22-.185.49-.306.776-.35L8.66 
                7.73l1.925-3.862c.128-.26.328-.48.577-.633a1.584 1.584 
                0 0 1 1.662 0c.25.153.45.373.577.633l1.925 3.847 
                4.334.615c.29.042.562.162.785.348.224.186.39.43.48.704a1.514 1.514 
                0 0 1-.404 1.58l-3.13 3 .736 
                4.247c.047.282.014.572-.096.837-.111.265-.294.494-.53.662a1.582 
                1.582 0 0 1-1.643.117l-3.865-2-3.865 2z">
            </path>
        </svg><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 fill-current text-gray-400">
            <path
                d="M8.128 
                19.825a1.586 
                1.586 0 0 1-1.643-.117 
                1.543 
                1.543 
                0 
                0 1-.53-.662 
                1.515 1.515 0 0 
                1-.096-.837l.736-4.247-3.13-3a1.514 1.514 
                0 0 
                1-.39-1.569c.09-.271.254-.513.475-.698.22-.185.49-.306.776-.35L8.66 
                7.73l1.925-3.862c.128-.26.328-.48.577-.633a1.584 1.584 
                0 0 1 1.662 
                0c.25.153.45.373.577.633l1.925 
                3.847 
                4.334.615c.29.042.562.162.785.348.224.186.39.43.48.704a1.514 
                1.514 0 0 1-.404 1.58l-3.13 3 
                .736 4.247c.047.282.014.572-.096.837-.111.265-.294.494-.53.662a1.582 
                1.582 0 0 1-1.643.117l-3.865-2-3.865 2z">
            </path>
        </svg><span class="ml-2">${product.numberOfReviews} reviews</span></div>
</div>`;
    return div;
}

function productInShoppingcart(product, i) {
    const inBasketIcon1 = document.querySelector(".in-basket-circle1");
    const inBasketIcon2 = document.querySelector(".in-basket-circle2");
    const button = document.querySelector(`#shoppingcart-button-${i + 1}`);
    let shoppingCart = [];

    button.addEventListener("click", () => {
        let shoppingCartArray = JSON.parse(localStorage.getItem('inWinkelwagen'));

        if (shoppingCartArray != null) {
            shoppingCart = shoppingCartArray;

            if (shoppingCartArray.find(obj => obj.id === product.id)) {
                shoppingCartArray[i].productAmount += 1;
                shoppingCart = JSON.stringify(shoppingCart);
            } else {
                shoppingCart = JSON.stringify([...shoppingCart, product]);
            }
        } else {
            shoppingCart = JSON.stringify([...shoppingCart, product]);
        }
        inBasketIcon1.style.display = "block";
        inBasketIcon2.style.display = "block";
        localStorage.setItem('inWinkelwagen', shoppingCart);
    });
}

displayProducts();