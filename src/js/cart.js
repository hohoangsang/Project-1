let showProductCart = document.querySelector(".cart__content");
let valueTotals = document.querySelector(".cart__content__total span");
let process = document.querySelector(".box__process");
let table = document.querySelector(".cart__content__table table");
let delAllProduct_btn = document.querySelector(".cart__content__btn .delete");
let buyMore_btn = document.querySelector(".cart__content__btn .buying");
let payment_btn = document.querySelector(".cart__content__btn .payment");
let updateTotals = JSON.parse(localStorage.getItem("totals")) || 0;

const showCart = (data) => {
    var totals = 0;
    if (carts.length === 0) {
        process.innerHTML = "";
        showProductCart.innerHTML = `<div class = "cart__content__nothing">
            <img class = "cart-empty" src = "./assets/images/cart-empty.png" alt = "Cart empty"></img>
            <a class = "buyNow" href = "grid_product.html">Mua sắm ngay!</a>
        </div>`
    }
    return data.map(function (item) {
        var total = item.inCart * item.price;
        totals += total;
        valueTotals.innerHTML = totals.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "<sup>đ</sup>";
        localStorage.setItem("totals", JSON.stringify(totals));

        return (table.innerHTML += `<tr>
            <td>
                <img src=${item.img} alt="Product image">
            </td>
            <td>
                ${item.nameProduct}
            </td>
            <td>
                <span class = "price">
                    ${item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                        <sup>đ</sup>
                </span>
            <td class = "num">
                <form>
                    <input type="button" value="-" class="btn-minus" action = "minus"></input>
                    <input type ="number" value = ${item.inCart}
                        id = "product__quantity-${item.id}"
                        class = "num-product"
                        onChange = "onChangeNumber()">
                    <input type="button" value="+" class="btn-plus" action = "plus"></input>
                </form>
            </td>
            <td class = "price total">${total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}<sup>đ</sup></td>
            <td>
                <div class = "del-product" onclick= "delProductCart(${item.id})">
                    <i class="fas fa-trash-alt"></i>
                </div>
            </td>
        </tr>`);
    });
};

const onChangeNumber = () => {
    let valueInput = document.querySelectorAll(".num .num-product");
    let valueTotal = document.querySelector(".cart__content__table td .total");
    let updateTotals = 0;

    for (let i = 0; i < valueInput.length; i++) {
        if (valueInput[i].value >= 1) {
            valueTotals[i].innerHTML = (parseInt(valueInput[i].value) * carts[i].price).toString();
        } else {
            valueInput[i].value = 1;
            valueTotal[i].innerHTML = carts[i].price.toString();
        }

        updateTotals += parseInt(valueInput[i].value) * carts[i].price;

        valueTotals.innerHTML = updateTotals.toString() + "<sup>đ</sup>";

        carts[i].inCart = valueInput[i].value;
        localStorage.setItem("carts", JSON.stringify(carts));
        localStorage.setItem("totals", JSON.stringify(updateTotals));
    }
}

const reloadCart = () => {
    updateTotals = parseInt(valueTotals);
    localStorage.setItem("totals", JSON.stringify(updateTotals));
    localStorage.setItem("carts", JSON.stringify(carts));
    showCart(carts);
    location.reload();
}

const delProductCart = (id) => {
    if (window.confirm("Bạn có chắc rằng muốn xóa sản phẩm này không?")) {
        carts = carts.filter(function (item) {
            return item.id !== id
        })
        reloadCart();
    }
}

const delAllProduct = () => {
    if (window.confirm("Bạn có chắc muốn xóa hết sản phẩm không?") == true) {
        carts = [];
        updateTotals = 0;
        iconCart.innerHTML = 0;
        localStorage.setItem("carts", JSON.stringify(carts));
        localStorage.setItem("totals", JSON.stringify(updateTotals));
        location.reload();
    }
}

const buyMore = () => {
    location.assign("grid_product.html");
}

const payment = () => {
    location.assign("infomation.html");
}

const handleQuantity = () => {
    let plusBtn = document.getElementsByClassName("btn-plus");
    let minusBtn = document.getElementsByClassName("btn-minus");
    let inputValue = document.querySelectorAll(".num .num-product")
    for(let i=0; i<plusBtn.length; i++){
        plusBtn[i].addEventListener("click", function(){
            let cart = carts.filter(function(item){
                return carts.indexOf(item) == i;
            })
            inputValue[i].value++;
            cart[0].inCart = inputValue[i].value;
            setTimeout(() => {
                reloadCart();
            }, 1000)
        })
    }

    for(let i=0; i<minusBtn.length; i++){
        minusBtn[i].addEventListener("click", function(){
            let cart = carts.filter(function(item){
                return carts.indexOf(item) == i;
            })
            let inputNewValue = inputValue[i].value--;
            if (inputNewValue <= 1){
                if (window.confirm('Bạn có chắc muốn xóa sản phẩm này không?')) {
                    carts = carts.filter(function (item) {
                        return item.id !== cart[0].id;
                    })
                    reloadCart();
                } else {
                    inputValue[i].value++;
                }
            } else {
                cart[0].inCart = inputValue[i].value;
                setTimeout(() => {
                    reloadCart();
                }, 1000)
            }
        })
    }
}

window.onload = function () {
    delAllProduct_btn.onclick = delAllProduct;
    buyMore_btn.onclick = buyMore;
    payment_btn.onclick = payment;
    showCart(carts);
    handleQuantity();
}