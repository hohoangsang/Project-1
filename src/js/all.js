"use strict";

let iconCart = document.querySelector(".number-cart span");
let carts = JSON.parse(localStorage.getItem("carts")) || [];
let category = JSON.parse(localStorage.getItem("categories")) || "products";

iconCart.innerHTML = carts.length;

const scrollBody = () => {
    const headerOverlay = document.querySelector(".header>.overlay");
    headerOverlay.style.setProperty("opacity", (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) 
    ? "1" 
    : ".4");
};

window.onscroll = function(){
    scrollBody();
};