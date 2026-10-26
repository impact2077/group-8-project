# FitPlan Studio – Trang Dashboard

## Tên đề tài
FitPlan Studio (BTL-29) – website lập kế hoạch tập luyện và duy trì thói quen với 4 vai trò: người tập, huấn luyện viên, điều phối cộng đồng, quản trị viên.

## Trang đã thực hiện
**Dashboard** (Người tập).

## Mục đích
Giúp người tập xem nhanh chuỗi ngày tập, số buổi trong tuần, tỉ lệ hoàn thành, kế hoạch hôm nay và nhận xét từ AI theo luật.

## Chức năng chính
- Thẻ thống kê: streak hiện tại, số buổi tuần này so với mục tiêu, tỉ lệ hoàn thành.
- Hộp thoại thiết lập mục tiêu lần đầu (kiểm tra dữ liệu, có thể chọn Để sau); sau khi lưu sẽ tạo kế hoạch hôm nay.
- Insight AI theo luật (AI-2): đang xử lý, nhận xét theo tỉ lệ hoàn thành, chưa đủ log, bỏ qua và thử lại.
- Các trạng thái: đang tải, lỗi tải (bật bằng ô "Giả lập lỗi tải" ở chân trang), chưa có kế hoạch.
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
- Video: https://youtu.be/3Ee-2upvi7A
- GitHub: https://github.com/impact2077/group-8-project
