const renderProductList = (productarr) => {
    var listProduct = ``;
    for (var index = 0; index < productarr.length; index++) {

        const Card = `
        <div class="col-md-4 pt-2 ">
        <div class="card">
            <img src="${productarr[index].img}" class="card-img-top" alt="${productarr[index].name}" />
            <div class="card-body">
                <h5 class="card-title">${productarr[index].name}</h5>
                <p class="card-text">${productarr[index].desc}</p>
                <p class="card-text">Giá: ${productarr[index].price} VND</p>
                <a href="#" onclick ="addCart(${productarr[index].id},${productarr[index].price},'${productarr[index].name}')" class="btn btn-primary">Thêm vào Giỏ Hàng</a>
            </div>
        </div>
        </div>
       `;
        listProduct += Card;
    }
    document.getElementById("loadProduct").innerHTML = listProduct;
}


const renderCart = (cartArr) => {
    var listCart = ``;
    for (var index = 0; index < cartArr.length; index++) {
      const cart = cartArr[index];
      if (localStorage.getItem('uid') == cart.uid) {
        const table = `
            <tr>
                <td>${cart.name}</td>
                <td><input type="number" id="cart${cart.id}" value="${cart.quantity}"></td>
                <td>${new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(cart.price)} </td>
                <td>${new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(cart.price * cart.quantity)} </td>
                <td><button class="btn btn-primary" onclick="updateCart(${cart.id})">Cập Nhật</button></td>
            </tr>
        `;
        listCart += table;
      }
    }
    document.getElementById("listCart").innerHTML = listCart;
  };
  