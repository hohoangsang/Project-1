let infoName = document.querySelector(".customer-name span");
let infoAddress = document.querySelector(".customer-address span");
let infoEmail = document.querySelector(".customer-email span");
let infoPhone = document.querySelector(".customer-phone span");
let tableCustomer = document.querySelector(".payment-complete__content__info__product table");
let totalText = document.querySelector(".payment-complete__content__info__product__total .price");

let infoCustomer = JSON.parse(localStorage.getItem("customerInfo")) || {};
let infoTotals = JSON.parse(localStorage.getItem("totals")) || 0;

const showCustomer = (data) => {
    infoName.innerHTML = data.nameCustomer;
    infoAddress.innerHTML = data.address;
    infoEmail.innerHTML = data.email;
    infoPhone.innerHTML = data.phone;
}

const showInfoCart = (data) => {
    let totals = 0;
    return data.map(function(item) {
        let totalCustomer = Number(item.price) * Number(item.inCart);
        totals += totalCustomer;
        totalText.innerHTML = totals.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "<sup>đ</sup>";
        return (tableCustomer.innerHTML += `<tr>
            <td>
                <img src=${item.img} alt="Product image">
            </td>
            <td>
                ${item.nameProduct}
            </td>
            <td>
                <span class="price">
                    ${item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}<sup>đ</sup>
                </span>
            </td>
            <td class= "num">
                <span class="price">
                    ${item.inCart}
                </span> 
            </td>
            <td>
                <span class="price total">
                    ${totalCustomer.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                    <sup>đ</sup>
                </span>
            </td>
        <tr>`)
    })
} 

const onBackInfoPage = () => {
    location.href = "infomation.html";
} 

let inputPayment = document.getElementsByClassName("form-check-input");
let errPayment = document.querySelector(".errPayment");

console.log(inputPayment[0]);

const onCheckout = () => {
    if(inputPayment[0].checked == true
        || inputPayment[1].checked == true
        || inputPayment[2].checked == true
        || inputPayment[3].checked == true
        || inputPayment[4].checked == true){
        alert("Thanh toán thành công");
        carts = [];
        infoCustomer = {};
        iconCart.innerHTML = 0;
        localStorage.setItem("carts", JSON.stringify(carts));
        localStorage.setItem("customerInfo", JSON.stringify(infoCustomer));
        location.href = "index.html";
    } else {
        errPayment.innerHTML = "Bạn chưa chọn phương thức thanh toán!"
    }

}

showCustomer(infoCustomer);
showInfoCart(carts);