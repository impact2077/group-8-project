# Báo cáo sử dụng AI – FitPlan Studio

## 1. Công cụ AI đã dùng

| Công cụ | Mục đích |
|---|---|
| Claude | Hỗ trợ tách mã thành từng trang (HTML, CSS, JavaScript), viết README và tài liệu trong `docs/`, tạo khung cơ bản cho web và 1 số tính năng|

## 2. Prompt chính

| # | Mục đích | Prompt (tóm tắt) |
|---:|---|---|
| 1 | Chốt phạm vi | Nhóm chỉ học HTML và một ít CSS, cần phạm vi tối thiểu 15 màn hình, phần phụ làm bằng modal. |
| 2 | HTML trước | Viết HTML semantic cho từng màn hình, chưa có CSS hoặc JavaScript, có sẵn id và class để gắn sau. |
| 3 | Tách trang | Tách thành từng thư mục gồm `index.html`, `css/style.css`, `js/main.js`, `assets/`, `README.md`. |
| 4 | Tài liệu | Viết 5 file trong `docs/` từ đề BTL-29 và mã nguồn của 15 trang. |

## 3. Phần AI sinh ra

| Phần | Mô tả |
|---|---|
| Cấu trúc 15 trang | HTML, CSS, JavaScript cho từng trang |
| Logic AI-1, AI-2, AI-3 | Luật mô phỏng trong JavaScript |
| Dữ liệu mẫu | Mảng JavaScript ở đầu `js/main.js` |
| README từng trang | Mô tả mục đích và chức năng |
| Tài liệu `docs/` | Bản nháp 5 file |

## 4. Phần sinh viên chỉnh sửa

| Thành viên | Trang | Chỉnh sửa |
|---|---|---|
| SV1 | 6 | Thêm tính năng kiểm tra ngày có tồn tại không (ví dụ như ngày 30/2 ko tồn tại) |
| SV2 | 2,3,4,8,9,14 | Tối ưu lại giao diện |
| SV3 | 13,14,15 | Sửa lại responsive bị tràn màn hình |

## 5. Lỗi AI gặp phải

| Loại lỗi | Cách phát hiện |
|---|---|
| Liên kết giữa các trang chưa nối được vì mỗi trang là một thư mục riêng | Bấm thử menu; hiện tại các liên kết sang trang khác hiển thị thông báo "sắp có" |
| Kiểm tra form thiếu trường hợp biên (ô trống, toàn dấu cách, số âm) | Thử nhập các giá trị biên |
| Nhãn trạng thái không khớp với dữ liệu | So sánh nhãn với mảng dữ liệu |
| Giao diện vỡ ở màn hình hẹp | Thu nhỏ cửa sổ trình duyệt, dùng chế độ thiết bị di động |

## 6. Cách sinh viên kiểm chứng

- Mở từng `index.html` trực tiếp bằng trình duyệt và chạy thử mọi nút.
- Bật ô "Giả lập lỗi tải" để kiểm tra trạng thái lỗi và nút Thử lại.
- Nhập dữ liệu sai vào mọi form để xem thông báo lỗi.
- Thử ở 3 kích thước: desktop, tablet, mobile.
- Đọc mã và giải thích lại từng hàm khi quay video OBS.

## 7. Điều sinh viên học được

Cách dùng DOM và sự kiện, cách kiểm tra form, tách dữ liệu khỏi giao diện, cách dùng Git theo nhánh và pull request.

## 8. Mock và API thật

Chưa có API thật.

## 9. Cam kết

Nhóm hiểu và giải thích được toàn bộ mã nguồn, kể cả phần do AI hỗ trợ viết, và sẵn sàng sửa nhỏ trực tiếp khi bảo vệ.
