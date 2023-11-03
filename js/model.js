axios({
  url: "https://6537454fbb226bb85dd303d6.mockapi.io/product",
  method: "GET",
})
  .then(function (res) {
    renderProductList(res.data);
  })
  .catch(function (err) {
    console.log("err > ", err);
  });

const renderCarts = () => {
  axios({
    url: "https://6537454fbb226bb85dd303d6.mockapi.io/cart",
    method: "GET",
  })
    .then(function (res) {
      renderCart(res.data);
      cart = 1;
    })
    .catch(function (err) {
      console.log("lỗi > ", err);
    });
};
renderCarts();
const updateCart = (id) => {
  const inputElement = document.getElementById(`cart${id}`);
  if (inputElement) {
    const quantity = inputElement.value;
    const data = {
      id: id,
      quantity: quantity,
    };
    axios({
      method: "PUT",
      url: `https://6537454fbb226bb85dd303d6.mockapi.io/cart/${id}`,
      data: data,
    })
      .then(function (response) {
        Swal.fire(
          `Thành Công Cập Nhật Số Lượng Lên Thành ${response.data.quantity}`
        );
        renderCarts();
      })
      .catch(function (error) {
        console.log("Lỗi khi cập nhật sản phẩm vào giỏ hàng: ", error);
      });
  } else {
    console.error(`Không tìm thấy phần tử với ID "cart${id}"`);
  }
};

const getApi = (url) => {
  return axios({
    url: url,
    method: "GET",
  });
};

const addCart = (product, price, name) => {
  const data = {
    id: product,
    productId: product,
    price: price,
    quantity: 1,
    uid: uid, // uid tạo ở core
    name: name,
  };

  // check giỏ hàng
  getApi("https://6537454fbb226bb85dd303d6.mockapi.io/cart")
    .then((getApiCart) => {
      if (getApiCart.data.length === 0) {
        // Nếu không có dữ liệu trong cart, thêm vào cart luôn
        axios({
          method: "POST",
          url: "https://6537454fbb226bb85dd303d6.mockapi.io/cart",
          data: data,
        })
          .then(function (response) {
            Swal.fire(`Thêm thành công ${response.data.name} vào giỏ hàng`);
          })
          .catch(function (error) {
            Swal.fire("Lỗi khi thêm sản phẩm vào giỏ hàng: ", error);
          });
      } else {
        let found = false;
        for (let index = 0; index < getApiCart.data.length; index++) {
          if (
            getApiCart.data[index].productId === product &&
            uid === getApiCart.data[index].uid
          ) {
            found = true;
            const dataPut = {
              id: product,
              quantity: 1 + getApiCart.data[index].quantity,
            };
            axios({
              method: "PUT",
              url: `https://6537454fbb226bb85dd303d6.mockapi.io/cart/${product}`,
              data: dataPut,
            })
              .then(function (response) {
                Swal.fire(`Thêm thành công vào giỏ hàng`);
              })
              .catch(function (error) {
                console.log("Lỗi khi cập nhật sản phẩm vào giỏ hàng: ", error);
              });

            break; // Thoát khỏi vòng lặp khi tìm thấy một kết quả trùng
          }
        }

        if (!found) {
          // Nếu không tìm thấy sản phẩm trùng, thêm vào cart
          axios({
            method: "POST",
            url: "https://6537454fbb226bb85dd303d6.mockapi.io/cart",
            data: data,
          })
            .then(function (response) {
              Swal.fire(`Thêm thành công ${response.data.name} vào giỏ hàng`);
            })
            .catch(function (error) {
              Swal.fire("Lỗi khi thêm sản phẩm vào giỏ hàng: ", error);
            });
        }
      }
    })
    .catch((err) => {
      console.log("err > ", err);
    });
};
