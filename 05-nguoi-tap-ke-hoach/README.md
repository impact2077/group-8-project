# FitPlan Studio – Trang Kế hoạch tập

## Tên đề tài
FitPlan Studio (BTL-29) – website lập kế hoạch tập luyện và duy trì thói quen với 4 vai trò: người tập, huấn luyện viên, điều phối cộng đồng, quản trị viên.

## Trang đã thực hiện
**Kế hoạch tập** (Người tập).

## Mục đích
Giúp người tập chọn mục tiêu, nhận gợi ý bài tập từ AI theo luật, chỉnh sửa rồi gửi huấn luyện viên duyệt.

## Chức năng chính
- Biểu mẫu mục tiêu và số buổi/tuần, có báo lỗi từng ô.
- AI gợi ý kế hoạch theo luật (AI-1): lọc bài tập mẫu theo nhóm cơ phù hợp mục tiêu.
- Các trạng thái của AI: chưa chọn, đang xử lý, không đủ dữ liệu (thử lại hoặc dùng thủ công), có gợi ý (chấp nhận, chỉnh sửa, thử lại).
- Chỉnh sửa thủ công mỗi dòng một bài tập, bắt buộc có ít nhất 1 bài; lưu và gửi duyệt.
- Hiển thị kế hoạch hiện tại và trạng thái chờ duyệt; trạng thái đang tải, lỗi tải, chưa có kế hoạch.
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
- Video: https://youtu.be/MT9TRl2c0gI
- GitHub: https://github.com/impact2077/group-8-project
