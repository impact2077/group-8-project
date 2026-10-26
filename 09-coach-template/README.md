# FitPlan Studio – Trang Quản lý template bài tập

## Tên đề tài
FitPlan Studio (BTL-29) – website lập kế hoạch tập luyện và duy trì thói quen với 4 vai trò: người tập, huấn luyện viên, điều phối cộng đồng, quản trị viên.

## Trang đã thực hiện
**Quản lý template bài tập** (Huấn luyện viên).

## Mục đích
Cho huấn luyện viên quản lý thư viện bài tập mẫu, là nguồn để AI gợi ý kế hoạch cho người tập.

## Chức năng chính
- Thêm, sửa, xóa template gồm tên bài tập, nhóm cơ, số hiệp và số lần.
- Kiểm tra dữ liệu: tên không được để trống, số hiệp và số lần phải là số dương.
- Bảng danh sách; xác nhận trước khi xóa.
- Các trạng thái: đang tải, lỗi tải (bật bằng ô "Giả lập lỗi tải" ở chân trang), chưa có template nào.
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
