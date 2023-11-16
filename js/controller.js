const renderProductList = (productarr) => {
  let listProduct = ``;
  for (let index = 0; index < productarr.length; index++) {
    const Card = `
    <div class="col-lg-4 col-sm-6 col-xl-3 pt-2 col-12 mt-3 mb-3 ">
    <div class="card border-0 rounded-0 shadow"">
    <img src="${productarr[index].img}" class="card-img-top rounded-0 " alt="${productarr[index].name}" />
    <div class="card-body mt-3 mb-3">
      <div class="row">
        <div class="col-10">
          <h4 class="card-title">${productarr[index].name}</h4>
          <p class="card-text">
            <i class="bi bi-star-fill text-warning"></i>
            <i class="bi bi-star-fill text-warning"></i>
            <i class="bi bi-star-fill text-warning"></i>
            <i class="bi bi-star-fill text-warning"></i>
           
          </p>
        </div>
        <div class="col-2">
          <i class="bi bi-bookmark-plus fs-2"></i>
        </div>
      </div>
    </div>
    <div class="row align-items-center text-center g-0">
      <div class="col-4">
        <h5>${productarr[index].price} VND</h5>
      </div>
      <div class="col-8">
        <a href="#"   onclick ="addCart(${productarr[index].id},${productarr[index].price},'${productarr[index].name}')"class="btn btn-dark w-100 p-3 rounded-0 text-warning">ADD TO CART</a>
      </div>
    </div>
  </div>
</div>

      
       `;
    listProduct += Card;
  }
  document.getElementById("loadProduct").innerHTML = listProduct;
};

const renderCart = (cartArr) => {
  let listCart = ``;
  let totalPrice = 0;
  let found = false; // Sử dụng biến này để kiểm tra xem có món hàng nào trong giỏ hàng không

  for (let index = 0; index < cartArr.length; index++) {
    const cart = cartArr[index];
    if (localStorage.getItem("uid") == cart.uid) {
      found = true; // Đánh dấu là đã tìm thấy món hàng cho `uid` hiện tại
      const price = cart.price * cart.quantity;
      const table = `
                <tr>
                    <td>${cart.name}</td>
                    <td><input type="number" id="cart${cart.id}" value="${
        cart.quantity
      }"></td>
                    <td>${new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(cart.price)} </td>
                    <td>${new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(cart.price * cart.quantity)} </td>
                    <td><button class="btn btn-primary" onclick="updateCart(${
                      cart.id
                    })">Cập Nhật</button></td>
                </tr>
            `;

      totalPrice += price;
      listCart += table;
    }
  }

  // Kiểm tra xem có món hàng nào trong giỏ hàng không, nếu không thì in thông báo
  if (!found) {
    listCart =
      '<tr><td colspan="5">Bạn không có món hàng nào trong giỏ hàng</td></tr>';
  }

  document.getElementById("listCart").innerHTML = listCart;
  document.getElementById(
    "totalPrice"
  ).innerHTML = `Tổng Tiền:${new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(totalPrice)}`;
};

function selectProduct() {
  const selectedType = document.getElementById("mySelect").value;
  const url = `https://6537454fbb226bb85dd303d6.mockapi.io/product?type=${selectedType}`;
  axios({
    url: url,
    method: "GET",
  })
    .then(function (res) {
      console.log("res > ", res.data);
      renderProductList(res.data);
    })
    .catch(function (err) {
      console.log("err > ", err);
    });
}
