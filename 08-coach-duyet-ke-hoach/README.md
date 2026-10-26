# FitPlan Studio – Trang Duyệt kế hoạch tập

## Tên đề tài
FitPlan Studio (BTL-29) – website lập kế hoạch tập luyện và duy trì thói quen với 4 vai trò: người tập, huấn luyện viên, điều phối cộng đồng, quản trị viên.

## Trang đã thực hiện
**Duyệt kế hoạch tập** (Huấn luyện viên).

## Mục đích
Giúp huấn luyện viên xem kế hoạch học viên gửi lên, chấp nhận, từ chối hoặc yêu cầu sửa kèm nhận xét.

## Chức năng chính
- Danh sách thẻ kế hoạch gồm học viên, tên kế hoạch, bài tập và nhãn trạng thái (Đang chờ, Bị từ chối, Hoàn thành, Đã hủy).
- Lọc theo trạng thái và hiển thị số kết quả.
- Với kế hoạch đang chờ: Chấp nhận, Từ chối hoặc Yêu cầu sửa (mở ô nhận xét, bắt buộc nhập trước khi gửi).
- Các trạng thái: đang tải, lỗi tải (bật bằng ô "Giả lập lỗi tải" ở chân trang), chưa có kế hoạch, không có kết quả.
- Responsive cho Desktop, Tablet và Mobile.

## Công nghệ sử dụng
HTML5 (semantic), CSS3 (Flexbox, Grid, Media Query), JavaScript thuần (DOM, Event). Không dùng framework.

## Cách chạy
Mở trực tiếp file `index.html` bằng trình duyệt. Dữ liệu mẫu nằm trong mảng JavaScript ở đầu file `js/main.js`, không cần máy chủ.

## Cấu trúc thư mục
```
├── index.html
├── css/style.css
├── js/main.js
├── assets/
└── README.md
```

## Liên kết
- Figma: (dán link)
- Video: (dán link)
- GitHub: (dán link)
