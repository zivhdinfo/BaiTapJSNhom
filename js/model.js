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
        // nếu nhỏ hơn 0 thì xóa luôn
        if (response.data.quantity <= 0) {
          axios({
            method: "DELETE",
            url: `https://6537454fbb226bb85dd303d6.mockapi.io/cart/${id}`,
          })
            .then(function (res) {
              Swal.fire(`Cập thật thành công`);
              renderCarts();
            })
            .catch(function (err) {
              Swal.fire(err);
            });
        }
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
              Swal.fire("Lỗi khi thêm sản phẩm vào giỏ hàng: ", error.code);
            });
        }
      }
    })
    .catch((err) => {
      console.log("Lỗi Giỏ Hàng  ", err);
    });
};

function deleteAll() {
  let dataID = [];

  axios({
    method: "GET",
    url: "https://6537454fbb226bb85dd303d6.mockapi.io/cart",
  })
    .then(function (res) {
      let listRes = res.data;
      // Kiểm tra nếu giỏ hàng trống
      if (listRes.length === 0) {
        Swal.fire("Giỏ hàng của bạn đang trống");
        return; // Dừng việc xóa và hiển thị thông báo
      }

      for (let i = 0; i < listRes.length; i++) {
        if (listRes[i].uid == uid) {
          dataID.push(listRes[i].id);
        }
      }

      // Tạo mảng chứa các yêu cầu xóa
      let deletePromises = dataID.map((id) => {
        return axios({
          method: "delete",
          url: `https://6537454fbb226bb85dd303d6.mockapi.io/cart/${id}`,
        });
      });

      Promise.all(deletePromises)
        .then(function () {
          Swal.fire("Thanh Toán Thành Công");
          renderCarts();
        })
        .catch(function (err) {
          console.log(err);
        });
    })
    .catch(function (err) {
      console.log(err);
    });
}

getApi("https://6537454fbb226bb85dd303d6.mockapi.io/product")
  .then(function (res) {
    let data = res.data;
    let selectElement = document.getElementById("mySelect");
    for (let i = 0; i < data.length; i++) {
      let dataList = document.createElement("option");
      dataList.value = data[i].type; // Loại sản phẩm được gán vào value của option
      dataList.textContent = data[i].name;
      selectElement.appendChild(dataList);
    }
  })
  .catch(function (err) {
    console.log(err);
  });
