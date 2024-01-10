inBasketIcons();

function inBasketIcons() {
    const inBasketIcon1 = document.querySelector(".in-basket-circle1");
    const inBasketIcon2 = document.querySelector(".in-basket-circle2");

    inBasketIcon1.style.display = "block";
    inBasketIcon2.style.display = "block";

    if (localStorage.getItem('inWinkelwagen') == null) {
        inBasketIcon1.style.display = "none";
        inBasketIcon2.style.display = "none";
    }
}

