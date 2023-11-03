axios ({
  url: "https://6537454fbb226bb85dd303d6.mockapi.io/product",
  method: "GET",
}).then(function (res) {
  renderProductList(res.data)
}).catch(function (err) {
  console.log('err > ', err)
  
})

const renderCarts = () => { 
  axios({
    url: "https://6537454fbb226bb85dd303d6.mockapi.io/cart",
    method: "GET",
  }).then(function (res) {
    renderCart(res.data)
  }).catch(function (err) {
    console.log('lỗi > ', err)
  })
}

renderCarts()

const updateCart = (id) => {
  const inputElement = document.getElementById(`cart${id}`);
  if (inputElement) {
    const quantity = inputElement.value;
    const data = {
      id: id,
      quantity: quantity,
    };
    axios({
      method: 'PUT',
      url: `https://6537454fbb226bb85dd303d6.mockapi.io/cart/${id}`,
      data: data,
    })
      .then(function (response) {
        Swal.fire (`Thành Công Cập Nhật Số Lượng Lên Thành ${response.data.quantity}`)
        renderCarts()
      })
      .catch(function (error) {
        console.log('Lỗi khi cập nhật sản phẩm vào giỏ hàng: ', error);
      });
  } else {
    console.error(`Không tìm thấy phần tử với ID "cart${id}"`);
  }
}  


const addCart = (product,price,name) => {
    const data = {
      id: product,
      price: price,
      quantity: 1,
      uid: uid, // uid tạo ở core 
      name: name,
    };
    axios({
      method: 'POST', 
      url: 'https://6537454fbb226bb85dd303d6.mockapi.io/cart',
      data: data, 
    })
      .then(function (response) {
        // Xử lý kết quả thành công ở đây, ví dụ:
        Swal.fire(`Thêm thành công ${response.data.name} vào giỏ hàng`);
      })
      .catch(function (error) {
        // Xử lý lỗi ở đây, ví dụ:
        Swal.fire('Lỗi khi thêm sản phẩm vào giỏ hàng: ', error);
      });
};