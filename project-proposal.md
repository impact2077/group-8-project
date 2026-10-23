# Đề xuất dự án – FitPlan Studio

**Học phần:** Phát triển ứng dụng web cơ bản – CSE122
**Mã đề:** BTL-29
**Nhóm:** 3 sinh viên (SV1, SV2, SV3)

## 1. Lĩnh vực

Fitness / Wellness Coaching.

## 2. Tóm tắt sản phẩm

FitPlan Studio là website frontend (nguyên mẫu) giúp người mới tập lập kế hoạch luyện tập và duy trì thói quen. Hệ thống có 4 vai trò: Người tập, Huấn luyện viên, Điều phối cộng đồng và Quản trị viên. Sản phẩm chỉ tập trung vào lập kế hoạch và theo dõi thói quen, không thay thế tư vấn y tế.

## 3. Ngữ cảnh

Người mới tập thường gặp nhiều nội dung rời rạc trên mạng và khó duy trì lịch tập đều đặn. Huấn luyện viên thì khó theo dõi log tập của học viên từ xa. Vì vậy cần một nơi tập trung để lập kế hoạch, ghi log, xem tiến độ và nhận phản hồi.

## 4. Phát biểu vấn đề

| Mã | Vấn đề |
|---|---|
| P1 | Người mới không biết bắt đầu từ đâu. |
| P2 | Khó theo dõi mức độ duy trì (consistency). |
| P3 | Huấn luyện viên khó xem log từ xa. |
| P4 | Dashboard thiếu nhận xét dễ hiểu. |

## 5. Mục tiêu

| Mã | Mục tiêu | Giải quyết |
|---|---|---|
| O1 | Biến bài toán thực tế thành sản phẩm frontend có hành trình người dùng rõ ràng. | P1–P4 |
| O2 | Mỗi vai trò có ít nhất 3 màn hình. | P1, P3 |
| O3 | Có CRUD hoặc trạng thái nghiệp vụ có ý nghĩa (thêm, sửa, xóa/lưu trữ/khóa). | P2, P3 |
| O4 | Dùng JavaScript/DOM cho tìm kiếm, lọc, kiểm tra hợp lệ, modal và render dữ liệu. | P2, P3 |
| O5 | Dùng dữ liệu giả lập (mảng JavaScript) thay cho máy chủ thật. | – |
| O6 | Có 3 trải nghiệm AI mô phỏng theo luật ở frontend. | P1, P2, P4 |
| O7 | Làm việc nhóm bằng Trello và Git/GitHub theo nhánh + pull request. | – |

## 6. Hành trình người dùng

```text
Trang chủ / Đăng nhập
↓
Thực hiện nghiệp vụ chính theo vai trò
↓
Xem trạng thái, dữ liệu, phản hồi
↓
AI gợi ý hoặc tóm tắt
↓
Người dùng chấp nhận / sửa / thử lại / bỏ qua
↓
Vai trò vận hành duyệt hoặc xử lý
↓
Dashboard / báo cáo
```

Luồng chính giữa các vai trò: Người tập tạo kế hoạch (có AI gợi ý) và gửi duyệt → Huấn luyện viên duyệt hoặc yêu cầu sửa → Người tập ghi log → Dashboard và Analytics tổng hợp số liệu.

## 7. Phạm vi

Nhóm chọn phạm vi gọn để hoàn thành chắc chắn: **15 màn hình** gồm 3 màn hình dùng chung và 12 màn hình theo 4 vai trò (3 màn hình mỗi vai trò). Các nhu cầu phụ như thiết lập mục tiêu lần đầu, chi tiết học viên, insight được làm dưới dạng modal hoặc phần trong trang thay vì tách thêm trang riêng.

Chi tiết xem [screen-list.md](screen-list.md).

## 8. Công nghệ

- HTML5 semantic
- CSS3 (Flexbox, Grid, Media Query) để responsive
- JavaScript thuần (DOM, sự kiện, kiểm tra form), không dùng framework
- Dữ liệu mẫu nằm trong mảng JavaScript ở đầu mỗi `js/main.js`, không cần máy chủ
- Git/GitHub, Trello, OBS, Figma/Canva

## 9. Tính năng AI

| Mã | Tính năng | Trang |
|---|---|---|
| AI-1 | Workout Plan Generator | Người tập – Kế hoạch tập |
| AI-2 | Consistency Insight | Người tập – Dashboard |
| AI-3 | Coach Summary | Huấn luyện viên – Danh sách học viên |

Cả ba đều mô phỏng bằng luật trong JavaScript, không gọi API thật. Chi tiết xem [roles-and-features.md](roles-and-features.md) và [ai-usage-report.md](ai-usage-report.md).

## 10. Kết quả mong đợi

- 15 trang chạy được độc lập, mở `index.html` là dùng được.
- Mỗi trang có kiểm tra hợp lệ, trạng thái đang tải / lỗi / rỗng và giao diện responsive.
- Mỗi trang có 1 video OBS, 1 commit/PR tương ứng.
- Mỗi thành viên hoàn thành ít nhất một luồng từ thiết kế đến PR.
