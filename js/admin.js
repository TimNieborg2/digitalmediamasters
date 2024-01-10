const parentOfProductTable = document.querySelector("#parent-of-table-of-products");
const parentOfOrdersTable = document.querySelector("#parent-of-table-of-orders");
const noOrdersMsg = document.querySelector("#no-orders-msg");
const orderTableParent = document.querySelector("#orders-table-parent");

const resetProductsBtn = document.querySelector("#reset-products-btn");

noOrdersMsg.style.display = "none";

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
        parentOfProductTable.append(div);
        editProduct(productData, i);
        deleteProduct(productData, i);
    });
}

function createProductDiv(product, i) {
    const tr = document.createElement("tr");
    tr.setAttribute("id", i);
    tr.classList.add(
        "bg-white",
        "border-b",
        "dark:bg-gray-800",
        "dark:border-gray-700",
        "hover:bg-gray-50",
        "dark:hover:bg-gray-600");

    tr.innerHTML = `<th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        ${product.name}
    </th>
    <td class="px-6 py-4">
        ${product.img}
    </td>
    <td class="px-6 py-4">
        ${product.description}
    </td>
    <td class="px-6 py-4">
        €${product.price}
    </td>
    <td class="px-6 py-4">
        ${product.popular}
    </td>
    <td class="px-6 py-4">
        ${product.type}
    </td>
    <td class="px-6 py-4">
        ${product.releaseYear}
    </td>
    <td class="px-6 py-4">
        ${product.numberOfReviews}
    </td>
    <td class="pr-3 text-right">
        <a id="edit-product-btn-${i}" 
            class="px-4 
            py-2 
            text-white 
            bg-secondarycolor 
            hover:bg-tertiarycolor 
            font-medium 
            rounded-lg 
            text-sm 
            px-2 
            py-2 
            dark:bg-blue-600" 
        href="#modal">Edit</a>
    </td>
    <td class="pr-3 text-right">
        <button id="delete-product-btn-${i}" 
            class="
            px-2 
            py-2 
            text-white 
            bg-tertiarycolor 
            hover:bg-blue-400 
            font-medium 
            rounded-lg 
            text-sm 
            px-2 
            py-2 
            dark:bg-red-600 
            dark:hover:bg-red-700"
        >Delete</button>
    </td>`;
    return tr;
}

function addProductModal() {
    const modalParent = document.querySelector("#modal-parent");

    const div = document.createElement("div");
    div.classList.add(
        "py-12",
        "mt-10",
        "transition",
        "duration-150",
        "ease-in-out",
        "z-10",
        "absolute",
        "top-0",
        "right-0",
        "bottom-0",
        "left-0");
    div.setAttribute("id", "modal");

    div.innerHTML = `<div role="alert" class="container mx-auto w-11/12 md:w-2/3 max-w-lg">
        <div class="relative py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400">
            <div class="w-full flex justify-start text-gray-600 mb-3">
            </div>
            <h1 class="font-4xl text-secondarycolor font-bold text-center tracking-normal leading-tight mb-4">
                Add product
            </h1>
            <label for="product-name"
                class="text-gray-800 text-sm font-bold leading-tight tracking-normal">Productname</label>
            <input id="product-name"
                class="
                mb-5 
                mt-2 
                text-gray-600 
                focus:outline-none 
                focus:border 
                focus:border-indigo-700 
                font-normal 
                w-full h-10 
                flex 
                items-center 
                pl-3 
                text-sm 
                border-gray-300 
                rounded border"
                placeholder="The godfather" value="">
            <label for="product-image"
                class="text-gray-800 text-sm font-bold leading-tight tracking-normal">Picture</label>
            <input id="product-image"
                class="
                mb-5 
                mt-2 
                text-gray-600 
                focus:outline-none 
                focus:border 
                focus:border-indigo-700 
                font-normal 
                w-full 
                h-10 
                flex 
                items-center 
                pl-3 
                text-sm 
                border-gray-300 
                rounded border"
                placeholder="img/products/img.jpg" value="">
            <label for="product-description"
                class="text-gray-800 text-sm font-bold leading-tight tracking-normal">Description (max 40 words)</label>
            <input id="product-description"
                class="
                mb-5 
                mt-2 
                text-gray-600 
                focus:outline-none 
                focus:border 
                focus:border-indigo-700 
                font-normal 
                w-full 
                h-10 
                flex 
                items-center 
                pl-3 
                text-sm 
                border-gray-300 
                rounded 
                border"
                placeholder="The Godfather is een klassiek misdaaddrama." value="">
            <label for="product-price"
                class="text-gray-800 text-sm font-bold leading-tight tracking-normal">Price</label>
            <div class="relative mb-5 mt-2">
                <div class="absolute text-gray-600 flex items-center px-4 border-r h-full">
                    <div>€</div>
                </div>
                <input id="product-price"
                    class="
                    text-gray-600 
                    focus:outline-none 
                    focus:border 
                    focus:border-indigo-700 
                    font-normal 
                    w-full 
                    h-10 
                    flex 
                    items-center 
                    pl-12 
                    text-sm 
                    border-gray-300 
                    rounded border"
                    placeholder="270" value="">
            </div>
            <label for="product-popular"
                class="text-gray-800 text-sm font-bold leading-tight tracking-normal">Popular</label>
            <div class="relative mb-5 mt-2">
                <select id="product-popular" name="boolean">
                    <option value="true">True</option>
                    <option value="false">False</option>
                </select>
            </div>
            <label for="product-type"
                class="text-gray-800 text-sm font-bold leading-tight tracking-normal">Type</label>
            <input id="product-type"
                class="
                mb-5 
                mt-2 
                text-gray-600 
                focus:outline-none 
                focus:border 
                focus:border-indigo-700 
                font-normal 
                w-full 
                h-10 
                flex 
                items-center 
                pl-3 
                text-sm 
                border-gray-300 
                rounded border"
                placeholder="Film" value="">
            <label for="product-release-year"
                class="text-gray-800 text-sm font-bold leading-tight tracking-normal">Release year</label>
            <input id="product-release-year" type="number"
                class="
                mb-5 
                mt-2 
                text-gray-600 
                focus:outline-none 
                focus:border 
                focus:border-indigo-700 
                font-normal 
                w-full 
                h-10 flex 
                items-center 
                pl-3 
                text-sm 
                border-gray-300 
                rounded 
                border"
                placeholder="1939" value="">
            <label for="product-reviews"
                class="text-gray-800 text-sm font-bold leading-tight tracking-normal">Reviews</label>
            <input id="product-reviews" type="number"
                class="
                mb-5
                mt-2 
                text-gray-600 
                focus:outline-none 
                focus:border 
                focus:border-indigo-700 
                font-normal 
                w-full 
                h-10 
                flex 
                items-center 
                pl-3 
                text-sm 
                border-gray-300 
                rounded border"
                placeholder="689" value="">
            <div class="flex items-center justify-start w-full">
                <button
                    id="submit-btn" 
                        class="
                        transition 
                        duration-150 
                        ease-in-out 
                        hover:bg-gray-600 
                        bg-secondarycolor 
                        rounded 
                        text-white 
                        px-8 
                        py-2 
                        text-sm"
                    >Submit</button>
                <button
                    id="cancel-btn" 
                        class="
                        ml-3 
                        bg-gray-100 
                        transition 
                        duration-150 
                        text-gray-600 
                        ease-in-out 
                        hover:border-gray-400 
                        hover:bg-gray-300 
                        border 
                        rounded 
                        px-8 
                        py-2 
                        text-sm"
                    >Cancel</button>
            </div>
            <button
                id="cross-btn" 
                class="
                cursor-pointer 
                absolute 
                top-0 
                right-0 
                mt-4 
                mr-5 
                text-gray-400 
                hover:text-gray-600 
                transition 
                duration-150 
                ease-in-out 
                rounded 
                focus:ring-2 
                focus:outline-none 
                focus:ring-gray-600" 
                aria-label="close modal" role="button">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-x" width="20"
                    height="20" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" fill="none"
                    stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" />
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
            </button>
        </div>
    </div>
</div>`;
    modalParent.append(div);
}

const addProductButton = document.querySelector(`#add-product-btn`);

addProductButton.addEventListener("click", () => {
    addProductModal();
    getAddModalButtons();
});

function getAddModalButtons() {
    const crossButton = document.querySelector("#cross-btn");
    const submitButton = document.querySelector("#submit-btn");
    const cancelButton = document.querySelector("#cancel-btn");
    const modal = document.querySelector("#modal");

    crossButton.addEventListener("click", () => {
        modal.remove();
    });
    cancelButton.addEventListener("click", () => {
        modal.remove();
    });
    submitButton.addEventListener("click", async () => {
        const products = await getProducts();
        createProduct(products);
        modal.remove();
        parentOfProductTable.innerHTML = "";
        displayProducts();
    });
}

function createProduct(productData) {
    const productImgInput = document.querySelector("#product-image");
    const productPopularInput = document.querySelector("#product-popular");
    const productNameInput = document.querySelector("#product-name");
    const productDescriptionInput = document.querySelector("#product-description");
    const productPriceInput = document.querySelector("#product-price");
    const productTypeInput = document.querySelector("#product-type");
    const productReleaseYearInput = document.querySelector("#product-release-year");
    const productReviewsInput = document.querySelector("#product-reviews");

    const id = productData ? productData.length + 1 : 0;
    const img = productImgInput.value;
    const popular = productPopularInput.value;
    const name = productNameInput.value;
    const description = productDescriptionInput.value;
    const price = productPriceInput.value;
    const type = productTypeInput.value;
    const productAmount = 1;
    const releaseYear = productReleaseYearInput.value;
    const numberOfReviews = productReviewsInput.value;

    const newProduct = {
        id,
        img,
        popular,
        name,
        description,
        price,
        type,
        productAmount,
        releaseYear,
        numberOfReviews,
    };

    if (productData) {
        productData.push(newProduct);
        setProducts(productData);
    } else {
        setProducts([newProduct]);
    }
}

function editProductModal(product, i) {
    const modalParent = document.querySelector("#modal-parent");

    const div = document.createElement("div");
    div.classList.add(
        "py-12",
        "mt-10",
        "transition",
        "duration-150",
        "ease-in-out",
        "z-10",
        "absolute",
        "top-0",
        "right-0",
        "bottom-0",
        "left-0");
    div.setAttribute("id", "modal");

    div.innerHTML = `<div role="alert" class="container mx-auto w-11/12 md:w-2/3 max-w-lg">
        <div class="relative py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400">
            <div class="w-full flex justify-start text-gray-600 mb-3">
            </div>
            <h1 class="font-4xl text-secondarycolor font-bold text-center tracking-normal leading-tight mb-4">
                Edit product
            </h1>
            <label for="product-name"
                class="text-gray-800 text-sm font-bold leading-tight tracking-normal">Productname</label>
            <input id="product-name"
                class="
                mb-5 
                mt-2 
                text-gray-600 
                focus:outline-none 
                focus:border 
                focus:border-indigo-700 
                font-normal 
                w-full 
                h-10 
                flex 
                items-center 
                pl-3 
                text-sm 
                border-gray-300 
                rounded border"
                placeholder="The godfather" value="${product.name}">
            <label for="product-image"
                class="text-gray-800 text-sm font-bold leading-tight tracking-normal">Picture</label>
            <input id="product-image"
                class="
                mb-5 
                mt-2 
                text-gray-600 
                focus:outline-none 
                focus:border 
                focus:border-indigo-700 
                font-normal 
                w-full 
                h-10 
                flex 
                items-center 
                pl-3 
                text-sm 
                border-gray-300 
                rounded border"
                placeholder="img/products/img.jpg" value="${product.img}">
            <label for="product-description"
                class="
                text-gray-800 
                text-sm 
                leading-tight 
                tracking-normal"><span class="font-bold">Description</span> (max 40 words)</label>
            <input id="product-description"
                class="
                mb-5 
                mt-2 
                text-gray-600 
                focus:outline-none 
                focus:border 
                focus:border-indigo-700 
                font-normal 
                w-full 
                h-10 
                flex 
                items-center 
                pl-3 
                text-sm 
                border-gray-300 
                rounded border"
                placeholder="The Godfather is een klassiek misdaaddrama." value="${product.description}">
            <label for="product-price"
                class="text-gray-800 text-sm font-bold leading-tight tracking-normal">Price</label>
            <div class="relative mb-5 mt-2">
                <div class="absolute text-gray-600 flex items-center px-4 border-r h-full">
                    <div>€</div>
                </div>
                <input id="product-price"
                    class="
                    text-gray-600 
                    focus:outline-none 
                    focus:border 
                    focus:border-indigo-700 
                    font-normal 
                    w-full 
                    h-10 
                    flex 
                    items-center 
                    pl-12 
                    text-sm 
                    border-gray-300 
                    rounded 
                    border"
                    placeholder="270" value="${product.price}">
            </div>
            <label for="product-popular"
                class="text-gray-800 text-sm font-bold leading-tight tracking-normal">Popular</label>
            <div class="relative mb-5 mt-2">
                <select id="product-popular" name="boolean">
                    <option value="true" selected="${product.type ? "true" : "false"}" >True</option>
                    <option value="false" selected="">False</option>
                </select>
            </div>
            <label for="product-type"
                class="text-gray-800 text-sm font-bold leading-tight tracking-normal">Type</label>
            <input id="product-type"
                class="
                mb-5 
                mt-2 
                text-gray-600 
                focus:outline-none 
                focus:border 
                focus:border-indigo-700 
                font-normal 
                w-full 
                h-10 
                flex 
                items-center 
                pl-3 
                text-sm 
                border-gray-300 
                rounded 
                border"
                placeholder="Film" value="${product.type}">
            <label for="product-release-year"
                class="text-gray-800 text-sm font-bold leading-tight tracking-normal">Release year</label>
            <input id="product-release-year" type="number"
                class="
                mb-5 
                mt-2 
                text-gray-600 
                focus:outline-none 
                focus:border 
                focus:border-indigo-700 
                font-normal
                w-full 
                h-10 
                flex 
                items-center 
                pl-3 
                text-sm 
                border-gray-300 
                rounded 
                border"
                placeholder="1939" value="${product.releaseYear}">
            <label for="product-reviews"
                class="text-gray-800 text-sm font-bold leading-tight tracking-normal">Reviews</label>
            <input id="product-reviews" type="number"
                class="
                mb-5 
                mt-2 
                text-gray-600 
                focus:outline-none 
                focus:border 
                focus:border-indigo-700 
                font-normal w-full h-10 
                flex 
                items-center 
                pl-3 
                text-sm 
                border-gray-300 
                rounded 
                border"
                placeholder="689" value="${product.numberOfReviews}">
            <div class="flex items-center justify-start w-full">
                <button
                    id="submit-btn" 
                    class="
                        transition
                        duration-150 
                        ease-in-out 
                        hover:bg-gray-600 
                        bg-secondarycolor 
                        rounded text-white 
                        px-8 
                        py-2 
                        text-sm"
                    >Submit</button>
                <button
                    id="cancel-btn" 
                    class="
                    ml-3 
                    bg-gray-100 
                    transition 
                    duration-150 
                    text-gray-600 
                    ease-in-out 
                    hover:border-gray-400 
                    hover:bg-gray-300 
                    border 
                    rounded 
                    px-8 
                    py-2 
                    text-sm"
                    >Cancel</button>
            </div>
            <button
                id="cross-btn" 
                class="
                cursor-pointer 
                absolute 
                top-0 
                right-0 
                mt-4 
                mr-5 
                text-gray-400 
                hover:text-gray-600 
                transition duration-150 
                ease-in-out 
                rounded focus:ring-2 
                focus:outline-none 
                focus:ring-gray-600" 
                aria-label="close modal" role="button">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-x" width="20"
                    height="20" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" fill="none"
                    stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" />
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
            </button>
        </div>
    </div>
</div>`;
    modalParent.append(div);
}

function getEditModalButtons(productData, i) {
    const crossButton = document.querySelector("#cross-btn");
    const submitButton = document.querySelector("#submit-btn");
    const cancelButton = document.querySelector("#cancel-btn");
    const modal = document.querySelector("#modal");

    crossButton.addEventListener("click", () => {
        modal.remove();
    });
    cancelButton.addEventListener("click", () => {
        modal.remove();
    });
    submitButton.addEventListener("click", () => {
        submitEditproduct(productData, i);
        modal.remove();
        parentOfProductTable.innerHTML = "";
        displayProducts();
    });
}

function submitEditproduct(productData, i) {
    const productNameInput = document.querySelector("#product-name");
    const productImgInput = document.querySelector("#product-image");
    const productDescriptionInput = document.querySelector("#product-description");
    const productPriceInput = document.querySelector("#product-price");
    const productPopularInput = document.querySelector("#product-popular");
    const productTypeInput = document.querySelector("#product-type");
    const productReleaseYearInput = document.querySelector("#product-release-year");
    const productReviewsInput = document.querySelector("#product-reviews");

    productData[i].name = productNameInput.value;
    productData[i].img = productImgInput.value;
    productData[i].description = productDescriptionInput.value;
    productData[i].price = productPriceInput.value;
    productData[i].popular = productPopularInput.value;
    productData[i].type = productTypeInput.value;
    productData[i].releaseYear = productReleaseYearInput.value;
    productData[i].numberOfReviews = productReviewsInput.value;

    setProducts(productData);
}

function editProduct(productData, i) {
    const editProductButton = document.querySelector(`#edit-product-btn-${i}`);
    const product = productData[i];
    editProductButton.addEventListener("click", () => {
        editProductModal(product);
        getEditModalButtons(productData, i);
    });
}

function deleteProduct(productData, i) {
    const deleteButton = document.querySelector(`#delete-product-btn-${i}`);
    deleteButton.addEventListener("click", () => {
        productData.splice(i, 1);

        if (productData.length > 0) {
            parentOfProductTable.innerHTML = "";
            setProducts(productData);
            displayProducts();
        } else {
            localStorage.removeItem("producten");
        }
    });
}

function getOrders() {
    if (localStorage.getItem('orders') == null) {
        noOrdersMsg.style.display = "block";
        orderTableParent.remove();
    }
    return JSON.parse(localStorage.getItem('orders'));
}

function setOrders(orders) {
    localStorage.setItem('orders', JSON.stringify(orders));
}

function displayOrders() {
    const orders = getOrders();

    if (orders != null) {
        orders.forEach((order, i) => {
            const div = createOrderDiv(order, i);
            parentOfOrdersTable.append(div);
            deleteOrder(orders, i);
        });
    }
}

function createOrderDiv(order, i) {
    const tr = document.createElement("tr");
    tr.setAttribute("id", i);
    tr.classList.add("bg-white", "border-b", "dark:bg-gray-800", "dark:border-gray-700");

    tr.innerHTML = `<th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        ${order.id}
    </th>
    <td class="px-6 py-4">
        €${order.total}
    </td>
    <td class="px-6 py-4">
        ${order.time}
    </td>
    <td class="px-6 py-4"></td>
    <td class="px-6 py-4"></td>
    <td class="px-6 py-4"></td>
    <td>
        <button
            id="delete-order-btn-${i}" 
            class="text-white 
            bg-tertiarycolor 
            hover:bg-blue-400 
            font-medium 
            rounded-lg 
            text-sm 
            px-2 
            py-2 
            dark:bg-red-600"
            >Delete</button>
    </td>`;
    return tr;
}

resetProductsBtn.addEventListener("click", async () => {
    const products = await fetchProducts();
    localStorage.removeItem('producten');
    parentOfProductTable.innerHTML = "";
    setProducts(products);
    displayProducts();
});

function deleteOrder(orders, i) {
    const deleteButton = document.querySelector(`#delete-order-btn-${i}`);

    deleteButton.addEventListener("click", () => {
        orders.splice(i, 1);
        parentOfOrdersTable.innerHTML = "";
        setOrders(orders);
        displayOrders();

        if (orders.length > 0) {
            setOrders(orders);
        } else {
            localStorage.removeItem("orders");
        }
    });
}

displayProducts();
displayOrders();