# FitPlan Studio – Trang Danh sách học viên

## Tên đề tài
FitPlan Studio (BTL-29) – website lập kế hoạch tập luyện và duy trì thói quen, gồm 4 vai trò: người tập, huấn luyện viên, điều phối cộng đồng và quản trị viên.

## Tên trang đã thực hiện
**Danh sách học viên** – trang dành cho vai trò **Huấn luyện viên**.

## Mục đích của trang
Giúp huấn luyện viên xem nhanh danh sách học viên mình phụ trách, tìm kiếm và lọc theo mục tiêu tập luyện, xem lịch sử log tập và tóm tắt mức độ hoàn thành của từng học viên.

## Các chức năng chính
- Hiển thị danh sách học viên từ mảng JavaScript.
- Tìm kiếm học viên theo tên (không phân biệt hoa thường, có dấu hoặc không dấu).
- Lọc học viên theo mục tiêu: Giảm cân, Tăng cơ, Duy trì.
- Xem chi tiết học viên bằng modal: lịch sử log tập và tóm tắt mức độ hoàn thành (đóng modal bằng nút ×, phím Esc hoặc bấm ra ngoài).
- Hiển thị số kế hoạch đang chờ duyệt.
- Xử lý các trạng thái: đang tải, lỗi tải (bật bằng ô "Giả lập lỗi tải" ở chân trang), không tìm thấy kết quả, không đủ dữ liệu để tóm tắt.
- Giao diện responsive cho Desktop, Tablet và Mobile.

## Công nghệ sử dụng
- HTML5 (semantic HTML)
- CSS3 (Flexbox, Grid, Media Query)
- JavaScript thuần (DOM, Event), không dùng framework

## Cấu trúc thư mục
```
├── index.html
├── css/
│   └── style.css
├── js/
│   └── main.js
├── assets/
└── README.md
```

## Cách chạy
Tải mã nguồn về và mở file `index.html` bằng trình duyệt, không cần cài đặt thêm.

## Liên kết
- Figma: https://www.figma.com/design/abSUKf6sJZJKRza0ydnts2/Untitled?node-id=0-1&m=dev&t=iRQ68bHLCfzcg9aj-1
- Video: https://youtu.be/sCQYQAmc_Q8
- GitHub: https://github.com/VuNangKy/V-N-ng-K--fitplan-studio-coach
