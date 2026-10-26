# Bảng kiểm kê màn hình – FitPlan Studio

Tổng cộng **15 màn hình**: 3 dùng chung + 12 theo vai trò. Mỗi thư mục là một trang độc lập gồm `index.html`, `css/style.css`, `js/main.js`, `assets/`, `README.md`.

Tên tệp trong đề bài (cột "Tên đề bài") được ánh xạ sang thư mục thực tế của nhóm (cột "Thư mục").

## 1. Bảng kiểm kê

| # | Vai trò | Màn hình | Thư mục | Tên đề bài | CRUD / Trạng thái | AI | Phụ trách |
|---:|---|---|---|---|---|---|---|
| 1 | Dùng chung | Trang chủ | `01-trang-chu` | `index.html` | Đọc | – | SV1 |
| 2 | Dùng chung | Đăng nhập | `02-dang-nhap` | `login.html` | Kiểm tra form, đang đăng nhập | – | SV1 |
| 3 | Dùng chung | Đăng ký | `03-dang-ky` | `register.html` | Kiểm tra form, thành công | – | SV1 |
| 4 | Người tập | Dashboard | `04-nguoi-tap-dashboard` | `member-fitness-dashboard.html` | R | AI-2 | SV1 |
| 5 | Người tập | Kế hoạch tập | `05-nguoi-tap-ke-hoach` | `member-workout-plan.html` | C/R/U, chờ duyệt | AI-1 | SV1 |
| 6 | Người tập | Nhật ký tập | `06-nguoi-tap-nhat-ky` | `member-workout-log.html` | C/R/U/D | – | SV1 |
| 7 | Huấn luyện viên | Danh sách học viên | `07-coach-hoc-vien` | `coach-member-list.html` | R | AI-3 | SV2 |
| 8 | Huấn luyện viên | Duyệt kế hoạch | `08-coach-duyet-ke-hoach` | `coach-plan-review.html` | R/U, duyệt / từ chối | – | SV2 |
| 9 | Huấn luyện viên | Template bài tập | `09-coach-template` | `coach-workout-template-management.html` | C/R/U/D | – | SV2 |
| 10 | Điều phối cộng đồng | Challenge | `10-cong-dong-challenge` | `community-challenge-management.html` | C/R/U, lưu trữ | – | SV3 |
| 11 | Điều phối cộng đồng | Leaderboard | `11-cong-dong-leaderboard` | `community-leaderboard.html` | R/U, ẩn | – | SV3 |
| 12 | Điều phối cộng đồng | Nội dung wellness | `12-cong-dong-noi-dung` | `community-wellness-content.html` | C/R/U/D | – | SV3 |
| 13 | Quản trị viên | Thư viện bài tập | `13-admin-bai-tap` | `admin-exercise-management.html` | C/R/U, lưu trữ | – | SV3 |
| 14 | Quản trị viên | Quản lý người dùng | `14-admin-nguoi-dung` | `admin-user-management.html` | C/R/U, khóa | – | SV3 |
| 15 | Quản trị viên | Analytics | `15-admin-analytics` | `admin-fitness-analytics.html` | R, lọc | – | SV3 |

## 2. Mục tiêu và nhiệm vụ theo màn hình

| # | Mục tiêu người dùng | Nhiệm vụ chính |
|---:|---|---|
| 1 | Hiểu sản phẩm | Xem giới thiệu, đi tới đăng nhập hoặc đăng ký |
| 2 | Vào đúng khu vực theo vai trò | Nhập email, mật khẩu, chọn vai trò |
| 3 | Có tài khoản mới | Nhập họ tên, email, mật khẩu |
| 4 | Nắm nhanh tiến độ | Xem streak, số buổi, tỉ lệ hoàn thành, nhận xét AI |
| 5 | Có kế hoạch tập phù hợp | Chọn mục tiêu, nhận gợi ý, chỉnh sửa, gửi duyệt |
| 6 | Ghi lại buổi tập | Thêm, sửa, xóa buổi tập |
| 7 | Theo dõi học viên | Tìm, lọc, xem log và tóm tắt |
| 8 | Duyệt kế hoạch nhanh | Chấp nhận, từ chối hoặc yêu cầu sửa kèm nhận xét |
| 9 | Có thư viện bài tập mẫu | Thêm, sửa, xóa template |
| 10 | Tạo động lực cộng đồng | Tạo, sửa, lưu trữ challenge |
| 11 | Giữ bảng xếp hạng công bằng | Sửa điểm, ẩn thành viên không hợp lệ |
| 12 | Chia sẻ kiến thức | Đăng, sửa, xóa bài viết |
| 13 | Dữ liệu bài tập gốc chính xác | Thêm, sửa, lưu trữ bài tập |
| 14 | Quản lý tài khoản | Thêm, sửa, phân vai trò, khóa/mở khóa |
| 15 | Nắm số liệu hệ thống | Xem thẻ thống kê, biểu đồ, lọc thời gian |

## 3. Bao phủ trạng thái

Ký hiệu: ✓ có, – không áp dụng.

| # | Đang tải | Lỗi tải | Rỗng | Thành công | Khác |
|---:|:--:|:--:|:--:|:--:|---|
| 1 | – | – | – | – | Thông báo khi bấm liên kết sang trang khác |
| 2 | – | – | – | ✓ | Đang đăng nhập (khóa nút), lỗi mật khẩu |
| 3 | – | – | – | ✓ | Lỗi email đã tồn tại |
| 4 | ✓ | ✓ | ✓ | ✓ | AI: đang xử lý, chưa đủ log |
| 5 | ✓ | ✓ | ✓ | ✓ | Đang chờ duyệt; AI: không đủ dữ liệu |
| 6 | ✓ | ✓ | ✓ | ✓ | Xong / Bỏ dở |
| 7 | ✓ | ✓ | ✓ | – | Không có kết quả tìm; AI không đủ dữ liệu / chưa chắc chắn |
| 8 | ✓ | ✓ | ✓ | ✓ | Đang chờ, Bị từ chối, Hoàn thành, Đã hủy |
| 9 | ✓ | ✓ | ✓ | ✓ | – |
| 10 | ✓ | ✓ | ✓ | ✓ | Đang chạy / Lưu trữ |
| 11 | ✓ | ✓ | ✓ | ✓ | Hợp lệ / Đã ẩn |
| 12 | ✓ | ✓ | ✓ | ✓ | – |
| 13 | ✓ | ✓ | ✓ | ✓ | Hoạt động / Lưu trữ |
| 14 | ✓ | ✓ | ✓ | ✓ | Hoạt động / Bị khóa |
| 15 | ✓ | ✓ | ✓ | – | – |

## 4. Màn hình không làm riêng

| Màn hình | Cách xử lý |
|---|---|
| `forgot-password.html`, `profile.html`, `settings.html`, `notifications.html`, `403.html`, `404.html` | Không làm trong phạm vi này vì nhóm ưu tiên hoàn thiện luồng nghiệp vụ chính của 4 vai trò. |
| Thiết lập mục tiêu lần đầu | Modal trong Dashboard người tập. |
| Chi tiết học viên | Modal trong Danh sách học viên. |
| Nhận xét khi yêu cầu sửa kế hoạch | Ô nhập trong Duyệt kế hoạch. |
| Insight tuần của người tập | Khối AI-2 trong Dashboard. |

## 5. Video OBS và PR

| # | Màn hình | Nhánh | Link PR / commit | Video OBS |
|---:|---|---|---|---|
| 1 | Trang chủ | `feature/home` | (dán link) | `SV1-01-trang-chu.mp4` |
| 2 | Đăng nhập | `feature/login` | (dán link) | `SV1-02-dang-nhap.mp4` |
| 3 | Đăng ký | `feature/register` | (dán link) | `SV1-03-dang-ky.mp4` |
| 4 | Dashboard | `feature/member-fitness-dashboard` | (dán link) | `SV1-04-dashboard.mp4` |
| 5 | Kế hoạch tập | `feature/member-workout-plan` | (dán link) | `SV1-05-ke-hoach.mp4` |
| 6 | Nhật ký tập | `feature/member-workout-log` | (dán link) | `SV1-06-nhat-ky.mp4` |
| 7 | Danh sách học viên | `feature/coach-member-list` | (dán link) | `SV2-01-hoc-vien.mp4` |
| 8 | Duyệt kế hoạch | `feature/coach-plan-review` | (dán link) | `SV2-02-duyet-ke-hoach.mp4` |
| 9 | Template bài tập | `feature/coach-workout-template-management` | (dán link) | `SV2-03-template.mp4` |
| 10 | Challenge | `feature/community-challenge-management` | (dán link) | `SV3-01-challenge.mp4` |
| 11 | Leaderboard | `feature/community-leaderboard` | (dán link) | `SV3-02-leaderboard.mp4` |
| 12 | Nội dung wellness | `feature/community-wellness-content` | (dán link) | `SV3-03-noi-dung.mp4` |
| 13 | Thư viện bài tập | `feature/admin-exercise-management` | (dán link) | `SV3-04-bai-tap.mp4` |
| 14 | Quản lý người dùng | `feature/admin-user-management` | (dán link) | `SV3-05-nguoi-dung.mp4` |
| 15 | Analytics | `feature/admin-fitness-analytics` | (dán link) | `SV3-06-analytics.mp4` |
