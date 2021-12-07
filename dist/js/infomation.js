// show list product in cart

let infomation_list = document.querySelector(".information-cart__content__list-product");
let infomation_totals = document.querySelector(".information-cart__content__list-product--total .list-product--total__price span");
let totals_cart = JSON.parse(localStorage.getItem("totals")) || 0;

const showInfomation = (data) => {
    return data.map(function(item){
        infomation_totals.innerHTML = totals_cart.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "<sup>đ</sup>";
        let price = Number(item.price) * Number(item.inCart);
        return (infomation_list.innerHTML += `<div class="information-cart__content__list-product--item">
            <div class="list-product--item__img">
                <img src=${item.img} alt="">
            </div>
            <div class="list-product--item__info">
                <a class="item__info__name" href="#">${item.nameProduct}</a>
                <p class="item__info__number">Số lượng: <span>${item.inCart}</span></p>
                <p class="item__info__price">${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}<sup>đ</sup></p>
            </div>
        </div>`)
    })
}
showInfomation(carts);

// validate infomation of customer

let form = document.getElementById("formCheckout");
let name = document.forms["infoForm"]["name"];
let address = document.forms["infoForm"]["address"];
let email = document.forms["infoForm"]["email"];
let phone = document.forms["infoForm"]["telephone"];
let errName = document.getElementById("errorName");
let errAddress = document.getElementById("errorAddress");
let errEmail = document.getElementById("errorEmail");
let errPhone = document.getElementById("errorTelephone");

form.addEventListener("submit", function(e){
    console.log("e", e)
    e.preventDefault();

    checkInput();
})

const checkInput = () => {
    let infomation = {};
    let nameValue = name.value.trim();
    let addressValue = address.value.trim();
    let emailValue = email.value.trim();
    let phoneValue = phone.value.trim();
    let testInput = true;

    if (nameValue === ""){
        errName.innerHTML = "Bạn chưa nhập tên khách hàng";
        testInput = false;
    } else {
        errName.innerHTML = "";
        testInput = true;
    }

    if (addressValue === ""){
        errAddress.innerHTML = "Bạn chưa nhập địa chỉ";
        testInput = false;
    } else {
        errAddress.innerHTML = "";
        testInput = true;
    }
    
    if (emailValue === ""){
        errEmail.innerHTML = "Bạn chưa nhập email";
        testInput = false;
    } else if (!isEmail(emailValue)) {
        errEmail.innerHTML = "email không hợp lệ";
        testInput = false;
    } else{
        errEmail.innerHTML = "";
        testInput = true;
    }

    if (phoneValue === ""){
        errPhone.innerHTML = "Bạn chưa nhập số điện thoại";
        testInput = false;
    } else if (!isPhone(phoneValue)){
        errPhone.innerHTML = "số điện thoại không hợp lệ";
        testInput = false;
    } else {
        errPhone.innerHTML = "";
        testInput = true;
    }

    if (testInput){
        infomation = {
            nameCustomer: nameValue,
            address: addressValue,
            email: emailValue,
            phone: phoneValue
        };
        localStorage.setItem("customerInfo", JSON.stringify(infomation));
        location.assign("payment.html");
    }
}

function isEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
}
  
function isPhone(phone) {
    return /^[0-9]{10}$/.test(phone);
}