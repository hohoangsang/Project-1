// let req = new XMLHttpRequest();
let dataProductsPerPage = [];
let products = document.querySelector(".grid__content__product");
let pagination = document.querySelector(".grid__content__pagination .pagination .pagination__num");
let totalPrice = JSON.parse(localStorage.getItem("totals"));
let categoryProduct = document.getElementsByClassName("accordion-item");
let urlAPI = `http://localhost:3004/${category}?_page=1&_limit=6`;

localStorage.setItem("indexPagination", JSON.stringify(1));

// req.open("get", "http://localhost:3004/products?_page=1&_limit=6", true);
// req.send();
// req.onreadystatechange = function () {
//     if (req.readyState == 4 && req.status == 200) {
//         dataProductsPerPage = JSON.parse(req.responseText);
//         showProduct(dataProductsPerPage);
//     }
// };

//create Loading animation
const loadingAnimation = () => {
    products.innerHTML = "";
    let loader = document.createElement('div');
    loader.classList.add("loading");
    return products.appendChild(loader);
}

const fetchProducts = (url) => {
    loadingAnimation();
    setTimeout(() => {
        fetch(url)
        .then(function(response){
            return response.json();
        })
        .then(function(products){ 
            showProduct(products);
            dataProductsPerPage = [...products];
        })
        .catch(function(){
            fetchProducts(urlAPI);
        })
    }, 500);
}

//Promise that load product by category when user reload
const loadByURL = new Promise(
    function(resolve){
        let category = JSON.parse(localStorage.getItem("categories"));
        let url = `http://localhost:3004/${category}?_page=1&_limit=6`;
        resolve(url);
    }
);
loadByURL
    .then(function(url) {
        fetchProducts(url)
    })
    .catch(function() {
        alert("Không load được sản phẩm từ server!")
    })

const handlePagination = (id, array) => {
    localStorage.setItem("indexPagination", JSON.stringify(id));
    let paginationFake = [...array];
    paginationFake = paginationFake.filter(function(item){
        return paginationFake.indexOf(item) !== id-1;
    })
    paginationFake.forEach(item => item.classList.remove("active"));

    array[id-1].classList.add("active");

    let nameCategory = JSON.parse(localStorage.getItem("categories")) || "products";
    let urlPerPage = `http://localhost:3004/${nameCategory}?_page=${id}&_limit=6`;
    fetchProducts(urlPerPage);
}

// Event load product per page
const loadProductPerPage = (page) => {
    let paginationNum = document.querySelectorAll(".pagination .pagination__num span");
    let paginationSide = document.querySelectorAll(".pagination .pagination__num i");

    //handle Number
    for (let i = 0; i < paginationNum.length; i++){
        paginationNum[i].addEventListener("click", function () {
            let index = i+1;
            handlePagination(index, paginationNum, i);
        });
    }

    //handle Side
    for(let i = 0; i < paginationSide.length; i++){
        paginationSide[i].addEventListener("click", function () {
            let index = JSON.parse(localStorage.getItem("indexPagination"))
            if (i===0){
                if(index > 1 ){
                    index--;
                    handlePagination(index, paginationNum);
                }
            } else {
                if(index < 3){
                    index++;
                    handlePagination(index, paginationNum);
                }
            }
        })
    }
}

const showProduct = (data) => {
    products.innerHTML = "";
    return data.map(function (item, index) {
        return (products.innerHTML += `<div class = "grid__content__product__item grid-product${index + 1}">
                <img src= "${item.img}" alt = "image product ${index + 1}">
                <a href = "detail_product.html" class = "viewMore">Xem chi tiết</a>
                <div class = "product__item__info">
                    <h4>${item.nameManufacturer}</h4>
                    <a href = "detail.html">
                        <p>${item.nameProduct}</p>
                        <p class = "underline"></p>
                    </a>
                    <div class="price_info">
                        <span class="price">${item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                            <sup>đ</sup>
                        <span class="price old ${item.show}">${item.oldPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                            <sup>đ</sup>
                    </div>
                </div>  
                <div class="product__item__icon">
                    <div class = "item-buying">
                        <button onclick = "addToCart(${index})">MUA HÀNG</button>
                        <a href="#" class="heart">
                            <i class="fas fa-heart"></i>
                        </a>
                        <a href="#" class="alt">
                            <i class="fas fa-sync-alt"></i>
                        </a>
                    </div>
                </div>  
            </div>`);
    });
};

const addToCart = (index) => {
    let cartStore = JSON.parse(localStorage.getItem("carts"));
    let cart = dataProductsPerPage[index];

    if (cartStore !== null) {
        let indexProduct = cartStore.findIndex(function (item) {
            return item.id === cart.id;
        });

        if (indexProduct !== -1) {
            carts[indexProduct].inCart = parseInt(carts[indexProduct].inCart) + 1;
            alert(
                `Đã thêm 1 sản phẩm vào mặt hàng ${carts[indexProduct].name} - ${carts[indexProduct].nameManufacturer} đã có`
            );
        } else {
            carts.unshift(cart);
            alert("Đã thêm 1 sản phẩm mới vào giỏ hàng");
            getProductInfo(cart);
        }
    } else {
        carts.unshift(cart);
        alert("Đã thêm 1 sản phẩm mới vào giỏ hàng");
        getProductInfo(cart);
    }

    iconCart.innerHTML = carts.length;
    localStorage.setItem("carts", JSON.stringify(carts));
}

const getProductInfo = (cart) => {
    let productInfo = {
        id: cart.id,
        img: cart.img,
        name: cart.nameProduct,
        price: cart.price,
    };
    addToMegaMenu(productInfo);
}

const addToMegaMenu = (cart) => {
    let megaMenuCart = document.querySelector(".mega_menu_cart");
    let cartTotalPrice = document.querySelector(".cart_total_price");
    let cartList = document.querySelector(".mega_menu_cart .menu_cart .cart_list"); 
    if (carts.length === 0){
        megaMenuCart.innerHTML = `<div class = "menu-content-nothing">
            <p>Chưa có sản phẩm nào</p>
            <a href = "grid_product.html">Mua sắm ngay!</a>
        </div>`
    } else{
        totalPrice += cart.price;
        cartTotalPrice.innerHTML = totalPrice.toString() + "<sup>đ</sup>"
        return (cartList.innerHTML += `<li class="cart_item">
            <div class="cart_client_avatar">
                <img src=${cart.img} alt="product avatar">
            </div>
            <div class="cart_item_info">
                <p class="cart_product_name">${cart.nameProduct}</p>
                <p class="cart_product_price">${cart.price.toString()}<sup>đ</sup></p>
            </div>
        </li>`)
    }
}

// Load products by product category
const handleCategory = () => {
    for (let i = 0; i<categoryProduct.length; i++){
        categoryProduct[i].addEventListener("click", function(){
            let categoryId =  categoryProduct[i].getAttribute("id");
            setTimeout(() => {
                fetchProducts(`http://localhost:3004/${categoryId}?_page=1&_limit=6`);
                // location.reload();
            }, 1000);
        })
    }
}

window.onload = function () {
    loadProductPerPage();
    handleCategory();
}