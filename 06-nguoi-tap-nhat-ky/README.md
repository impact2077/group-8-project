# FitPlan Studio – Trang Nhật ký tập

## Tên đề tài
FitPlan Studio (BTL-29) – website lập kế hoạch tập luyện và duy trì thói quen với 4 vai trò: người tập, huấn luyện viên, điều phối cộng đồng, quản trị viên.

## Trang đã thực hiện
**Nhật ký tập** (Người tập).

## Mục đích
Cho người tập ghi lại các buổi đã tập và xem lại lịch sử, làm dữ liệu cho dashboard và nhận xét của huấn luyện viên.

## Chức năng chính
- Thêm, sửa, xóa buổi tập với ngày, bài tập và kết quả (Xong hoặc Bỏ dở).
- Kiểm tra dữ liệu: ngày và bài tập không được để trống, báo lỗi ngay dưới từng ô.
- Bảng danh sách có nhãn trạng thái; xác nhận trước khi xóa.
- Các trạng thái: đang tải, lỗi tải (bật bằng ô "Giả lập lỗi tải" ở chân trang), chưa có buổi tập nào.
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
- Figma: https://www.figma.com/design/HeCymv5xs6QMeUSsBWLHk0/Untitled?node-id=0-1&t=clBn2w0PGP7DlGU7-1
- Video: https://youtu.be/b649j--2WOs
- GitHub: https://github.com/impact2077/group-8-project
