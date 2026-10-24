# FitPlan Studio – Trang Leaderboard

## Tên đề tài
FitPlan Studio (BTL-29) – website lập kế hoạch tập luyện và duy trì thói quen với 4 vai trò: người tập, huấn luyện viên, điều phối cộng đồng, quản trị viên.

## Trang đã thực hiện
**Leaderboard** (Điều phối cộng đồng).

## Mục đích
Cho điều phối cộng đồng theo dõi bảng xếp hạng, chỉnh điểm khi cần và ẩn thành viên không hợp lệ.

## Chức năng chính
- Bảng xếp hạng tự sắp theo điểm giảm dần, cập nhật thứ hạng sau khi sửa điểm.
- Sửa điểm trực tiếp trong bảng, báo lỗi khi để trống hoặc nhập số âm.
- Ẩn hoặc hiện thành viên, nhãn trạng thái Hợp lệ hoặc Đã ẩn.
- Các trạng thái: đang tải, lỗi tải (bật bằng ô "Giả lập lỗi tải" ở chân trang), bảng trống.
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
