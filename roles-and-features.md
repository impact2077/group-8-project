# Vai trò và tính năng – FitPlan Studio

## 1. Các vai trò

| Vai trò | Trách nhiệm chính | Mục tiêu người dùng |
|---|---|---|
| Người tập | Quản lý kế hoạch và log | Biết tập gì, tập đều và thấy tiến độ |
| Huấn luyện viên | Review kế hoạch, tạo template | Theo dõi học viên và duyệt kế hoạch nhanh |
| Điều phối cộng đồng | Challenge và nội dung | Tạo động lực cho cộng đồng |
| Quản trị viên | Bài tập, người dùng, analytics | Giữ dữ liệu hệ thống đúng và nắm số liệu chung |

## 2. Tính năng theo vai trò

### Dùng chung

| Trang | Tính năng |
|---|---|
| Trang chủ | Giới thiệu, nút Bắt đầu ngay và Đăng nhập, 4 thẻ tính năng. |
| Đăng nhập | Nhập email, mật khẩu, chọn vai trò; kiểm tra dữ liệu; trạng thái đang đăng nhập; báo lỗi khi mật khẩu dưới 6 ký tự. |
| Đăng ký | Họ tên, email, mật khẩu; kiểm tra từng ô; báo lỗi email đã tồn tại; thông báo thành công. |

### Người tập

| Trang | Tính năng | CRUD / trạng thái |
|---|---|---|
| Dashboard | Streak, số buổi tuần này so với mục tiêu, tỉ lệ hoàn thành, kế hoạch hôm nay, insight AI-2, hộp thoại thiết lập mục tiêu lần đầu. | R |
| Kế hoạch tập | Chọn mục tiêu và số buổi/tuần, AI-1 gợi ý, chỉnh sửa thủ công, gửi duyệt. | C/R/U, trạng thái chờ duyệt |
| Nhật ký tập | Thêm, sửa, xóa buổi tập (ngày, bài tập, kết quả Xong/Bỏ dở), xác nhận trước khi xóa. | C/R/U/D |

### Huấn luyện viên

| Trang | Tính năng | CRUD / trạng thái |
|---|---|---|
| Danh sách học viên | Tìm theo tên (không phân biệt hoa thường, dấu), lọc theo mục tiêu, modal chi tiết với lịch sử log và tóm tắt AI-3, số kế hoạch chờ duyệt. | R |
| Duyệt kế hoạch | Lọc theo trạng thái; Chấp nhận, Từ chối hoặc Yêu cầu sửa kèm nhận xét bắt buộc. | R/U, trạng thái Đang chờ / Bị từ chối / Hoàn thành / Đã hủy |
| Template bài tập | Thêm, sửa, xóa template (tên, nhóm cơ, số hiệp, số lần), xác nhận trước khi xóa. | C/R/U/D |

### Điều phối cộng đồng

| Trang | Tính năng | CRUD / trạng thái |
|---|---|---|
| Challenge | Thêm, sửa challenge; lưu trữ hoặc khôi phục; thẻ thống kê tự cập nhật. | C/R/U, lưu trữ |
| Leaderboard | Xếp hạng tự sắp theo điểm, sửa điểm trực tiếp, ẩn hoặc hiện thành viên. | R/U, ẩn |
| Nội dung wellness | Thêm, sửa, xóa bài viết (tiêu đề, nội dung). | C/R/U/D |

### Quản trị viên

| Trang | Tính năng | CRUD / trạng thái |
|---|---|---|
| Thư viện bài tập | Thêm, sửa bài tập; lưu trữ hoặc khôi phục. | C/R/U, lưu trữ |
| Quản lý người dùng | Thêm, sửa người dùng (họ tên, email, vai trò); khóa hoặc mở khóa. | C/R/U, khóa |
| Analytics | 3 thẻ thống kê, biểu đồ thanh theo thứ trong tuần (HTML/CSS), lọc tất cả hoặc 7 ngày gần nhất. | R |

## 3. Tính năng AI

Mỗi tính năng AI đi theo luồng: nhập → kiểm tra hợp lệ → đang xử lý → kết quả → giải thích → người dùng quyết định.

| Mã | Tên | Vị trí | Đầu vào | Kết quả | Thao tác người dùng |
|---|---|---|---|---|---|
| AI-1 | Workout Plan Generator | Người tập – Kế hoạch tập | Mục tiêu, số buổi/tuần | Danh sách bài tập lọc từ bài mẫu theo nhóm cơ phù hợp mục tiêu | Chấp nhận, Chỉnh sửa, Thử lại |
| AI-2 | Consistency Insight | Người tập – Dashboard | Log tập, tỉ lệ hoàn thành | Nhận xét theo tỉ lệ hoàn thành | Bỏ qua, Thử lại |
| AI-3 | Coach Summary | Huấn luyện viên – Danh sách học viên | Lịch sử log của học viên | Tóm tắt mức độ hoàn thành | Thử lại |

**Trạng thái thất bại hoặc không chắc chắn:**

| Mã | Tình huống | Thông báo / thao tác |
|---|---|---|
| AI-1 | Không đủ dữ liệu | Thử lại hoặc dùng thủ công |
| AI-2 | Chưa đủ log | Hiển thị thông báo, cho bỏ qua hoặc thử lại |
| AI-3 | Dưới 3 buổi tập | "Không đủ dữ liệu để tóm tắt (cần ít nhất 3 buổi)." kèm Thử lại |
| AI-3 | Kết quả không chắc chắn | "AI chưa chắc chắn về tóm tắt này." kèm Thử lại |

Cả ba chỉ mô phỏng theo luật, không gọi API thật.

## 4. Thực thể dữ liệu

Dữ liệu giả lập nằm trong mảng JavaScript, không dùng LocalStorage hay máy chủ.

| Thực thể | Dùng ở trang |
|---|---|
| `exercises` | Thư viện bài tập (admin), Template bài tập (coach), gợi ý AI-1 |
| `plans` | Kế hoạch tập, Duyệt kế hoạch, Dashboard |
| `workoutLogs` | Nhật ký tập, Dashboard, Danh sách học viên, Analytics |
| `challenges` | Challenge |
| `members` | Danh sách học viên, Leaderboard, Quản lý người dùng |
| `coachNotes` | Nhận xét khi yêu cầu sửa kế hoạch |

## 5. Trạng thái giao diện

Hầu hết các trang quản lý dữ liệu đều có: đang tải, lỗi tải (bật bằng ô "Giả lập lỗi tải" ở chân trang, có nút Thử lại) và trạng thái rỗng. Các form đều báo lỗi ngay dưới từng ô.
