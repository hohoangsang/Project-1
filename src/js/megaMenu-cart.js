let megaMenuCart = document.querySelector(".mega_menu_cart");
let cartTotalPrice = document.querySelector(".cart_total_price");
let cartList = document.querySelector(".mega_menu_cart .menu_cart .cart_list"); 
let totals = 0;

const showList = (data) => {
        return data.map(function(item){
            totals += item.price;
            cartTotalPrice.innerHTML = totals.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "<sup>đ</sup>";
            return (cartList.innerHTML += `<li class="cart_item">
                <div class="cart_client_avatar"><img src=${item.img} alt="product avatar"></div>
                <div class="cart_item_info">
                    <p class="cart_product_name">${item.nameProduct}</p>
                    <p class="cart_product_price">${item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}<sup>đ</sup></p>
                </div>
            </li>`)
        })
}

showList(carts);