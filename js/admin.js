// Function để lấy danh sách sản phẩm từ API sử dụng Axios
function layDanhSachSanPham() {
    axios.get('https://your-api-url/products')
      .then(response => {
        const danhSachSanPham = response.data;
        hienThiDanhSachSanPham(danhSachSanPham);
      })
      .catch(error => {
        console.error('Lỗi khi lấy danh sách sản phẩm:', error);
      });
  }
  
  // Function để hiển thị danh sách sản phẩm trên giao diện
  function hienThiDanhSachSanPham(danhSachSanPham) {
    // Code để cập nhật giao diện với danh sách sản phẩm
  }
  
  // Function để thêm sản phẩm mới sử dụng Axios
  function themSanPham(sanPhamMoi) {
    axios.post('https://your-api-url/products', sanPhamMoi)
      .then(response => {
        // Xử lý khi thành công, có thể cập nhật giao diện hoặc hiển thị thông báo thành công
      })
      .catch(error => {
        console.error('Lỗi khi thêm sản phẩm:', error);
      });
  }
  
  // Function để xóa sản phẩm sử dụng Axios
  function xoaSanPham(idSanPham) {
    axios.delete(`https://your-api-url/products/${idSanPham}`)
      .then(response => {
        // Xử lý khi thành công, có thể cập nhật giao diện hoặc hiển thị thông báo thành công
      })
      .catch(error => {
        console.error('Lỗi khi xóa sản phẩm:', error);
      });
  }
  
  // Function để cập nhật sản phẩm sử dụng Axios
  function capNhatSanPham(idSanPham, sanPhamCapNhat) {
    axios.put(`https://your-api-url/products/${idSanPham}`, sanPhamCapNhat)
      .then(response => {
        // Xử lý khi thành công, có thể cập nhật giao diện hoặc hiển thị thông báo thành công
      })
      .catch(error => {
        console.error('Lỗi khi cập nhật sản phẩm:', error);
      });
  }
  
  // Function để kiểm tra validation
  function kiemTraSanPham(sanPham) {
    // Thực hiện kiểm tra validation cho đối tượng sanPham
    // Trả về true nếu hợp lệ, false nếu không hợp lệ
  }
  
  // Function để tìm kiếm sản phẩm theo tên
  function timKiemSanPhamTheoTen(tenSanPham) {
    axios.get(`https://your-api-url/products?name=${tenSanPham}`)
      .then(response => {
        const ketQuaTimKiem = response.data;
        // Xử lý và hiển thị kết quả tìm kiếm
      })
      .catch(error => {
        console.error('Lỗi khi tìm kiếm sản phẩm:', error);
      });
  }
  
  // Function để sắp xếp sản phẩm theo giá tiền
  function sapXepSanPhamTheoGia(loaiSapXep) {
    axios.get(`https://your-api-url/products?sort=price&order=${loaiSapXep}`)
      .then(response => {
        const danhSachSanPhamDaSapXep = response.data;
        // Xử lý và hiển thị danh sách sản phẩm đã được sắp xếp
      })
      .catch(error => {
        console.error('Lỗi khi sắp xếp sản phẩm:', error);
      });
  }
  // JavaScript code để xử lý các chức năng
document.addEventListener("DOMContentLoaded", function() {
    // Xử lý khi trang web đã tải hoàn tất
  
    // Lấy các phần tử từ DOM
    const btnOpenAddProductForm = document.getElementById('btnOpenAddProductForm');
    const addProductForm = document.getElementById('addProductForm');
    const btnCloseAddProductForm = document.getElementById('btnCloseAddProductForm');
    const btnAddProduct = document.getElementById('btnAddProduct');
    const btnSearchProduct = document.getElementById('btnSearchProduct');
  
    // Hiển thị form thêm sản phẩm khi nhấn nút
    btnOpenAddProductForm.addEventListener('click', function() {
      addProductForm.style.display = 'block';
    });
  
    // Ẩn form thêm sản phẩm khi nhấn nút đóng
    btnCloseAddProductForm.addEventListener('click', function() {
      addProductForm.style.display = 'none';
    });
  
    // Xử lý khi nhấn nút Thêm Sản Phẩm
    btnAddProduct.addEventListener('click', function() {
      // Lấy thông tin sản phẩm từ các ô nhập liệu
      const productName = document.getElementById('productName').value;
      const productPrice = document.getElementById('productPrice').value;
  
      // Gọi hàm để thêm sản phẩm (sử dụng AJAX/Axios)
      themSanPham({ name: productName, price: productPrice });
    });
  
    // Xử lý khi nhấn nút Tìm Kiếm
    btnSearchProduct.addEventListener('click', function() {
      // Lấy thông tin tên sản phẩm cần tìm kiếm
      const searchProductName = document.getElementById('searchProductName').value;
  
      // Gọi hàm để tìm kiếm sản phẩm theo tên (sử dụng AJAX/Axios)
      timKiemSanPhamTheoTen(searchProductName);
    });
  
    // Định nghĩa các hàm themSanPham và timKiemSanPhamTheoTen
    function themSanPham(sanPhamMoi) {
      // Thực hiện logic để gọi API để thêm sản phẩm mới
      // Sử dụng Axios hoặc các phương thức AJAX khác
    }
  
    function timKiemSanPhamTheoTen(tenSanPham) {
      // Thực hiện logic để gọi API để tìm kiếm sản phẩm theo tên
      // Sử dụng Axios hoặc các phương thức AJAX khác
    }
  
    // Các chức năng khác (xóa, cập nhật...) cũng có thể được thêm vào đây
  });
  