// Lưu uid của người dùng khi vào website 
if (!localStorage.getItem('uid')) {
    // Tạo chuỗi 6 số ngẫu nhiên
    const randomNumber = Math.floor(Math.random() * 11000000).toString().padStart(10, '0');
    localStorage.setItem('uid', randomNumber);
  }
// Lấy ra uid để check giỏ hàng từng khách 
const uid = localStorage.getItem('uid');
console.log('uid > ', uid)
// khởi tạo cart với null 
const cart = null;
