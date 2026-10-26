# Phân công nhóm – FitPlan Studio

## 1. Thành viên

| Ký hiệu | Họ tên | MSSV |
|---|---|---|
| SV1 | (điền) | (điền) |
| SV2 | (điền) | (điền) |
| SV3 | (điền) | (điền) |

## 2. Phân công chính

| Thành viên | Vai trò phụ trách | Màn hình | Số màn hình |
|---|---|---|---:|
| SV1 | Người tập + trang dùng chung | 01 Trang chủ, 02 Đăng nhập, 03 Đăng ký, 04 Dashboard, 05 Kế hoạch tập, 06 Nhật ký tập | 6 |
| SV2 | Huấn luyện viên | 07 Danh sách học viên, 08 Duyệt kế hoạch, 09 Template bài tập | 3 |
| SV3 | Điều phối cộng đồng + Quản trị viên | 10 Challenge, 11 Leaderboard, 12 Nội dung wellness, 13 Thư viện bài tập, 14 Quản lý người dùng, 15 Analytics | 6 |

Mỗi thành viên tự làm đủ HTML, CSS, JavaScript, Git và video OBS cho các màn hình của mình.

## 3. Trách nhiệm xuyên suốt

| Thành viên | Trách nhiệm | Nội dung |
|---|---|---|
| SV1 | Responsive, tích hợp và kiểm tra giao diện | Kiểm tra desktop, tablet, mobile cho toàn bộ trang; đồng phụ trách trang dùng chung. |
| SV2 | JavaScript, dữ liệu và tương tác AI | Mô-đun dùng chung (hiển thị trạng thái, thông báo, dữ liệu mẫu); ba luồng AI-1, AI-2, AI-3; đánh giá PR của SV1 và SV3. |
| SV3 | Điều hướng, hệ thống thiết kế, phát hành | Thanh điều hướng và bố cục thống nhất; kiểm tra tính nhất quán giữa các vai trò; gộp `dev` vào `main`. |

## 4. Lát cắt dọc của từng thành viên

Mỗi thành viên hoàn thành ít nhất một luồng: Figma → HTML → CSS → JavaScript → dữ liệu → responsive → nhánh Git → commit → PR → OBS.

| Thành viên | Luồng chính |
|---|---|
| SV1 | Dashboard và Kế hoạch tập (AI-1, AI-2) |
| SV2 | Danh sách học viên (AI-3) |
| SV3 | Challenge và Quản lý người dùng |

## 5. Quy trình Git

```text
main
dev
feature/<tên-màn-hình>
fix/<tên-lỗi>
docs/<tên-tài-liệu>
```

Quy trình: Task trên Trello → tạo nhánh → viết mã → commit → push → pull request → review chéo → merge vào `dev` → test tích hợp → merge `main`.

| Người tạo PR | Người review |
|---|---|
| SV1 | SV2 |
| SV2 | SV3 |
| SV3 | SV1 |

Quy ước commit: `feat:`, `fix:`, `style:`, `refactor:`, `docs:`. Không dùng các câu như `update`, `done`, `final`, `fix code`.

## 6. Bảng công việc Trello

Cột: Tồn đọng → Cần làm → Đang làm → Chờ duyệt → Hoàn thành.

Mỗi task ghi: mã công việc, màn hình, người thực hiện, hạn, nhánh, link PR/commit, link video OBS.

| Mã | Công việc |
|---|---|
| TASK-01 | Khung dây và mockup màn hình |
| TASK-02 | HTML semantic |
| TASK-03 | CSS responsive |
| TASK-04 | JavaScript tìm kiếm, lọc, biểu mẫu |
| TASK-05 | Dữ liệu giả lập |
| TASK-06 | Trải nghiệm AI |
| TASK-07 | Kiểm thử trình duyệt và mobile |
| TASK-08 | Video OBS, commit, README |

## 7. Lịch làm việc

Cả nhóm học kín lịch trong tuần nên công việc được chia theo từng màn hình nhỏ, làm xong và merge từng trang một thay vì làm dồn.

| Giai đoạn | Nội dung |
|---|---|
| 1 | Hoàn thiện bảng kiểm kê, luồng người dùng, Figma/Canva và nộp duyệt |
| 2 | HTML semantic cho các màn hình |
| 3 | CSS và responsive |
| 4 | JavaScript, dữ liệu giả lập, AI |
| 5 | Kiểm thử, README, video OBS, tổng hợp lên `main` |

## 8. Bảng đối chiếu bàn giao

| Hạng mục | SV1 | SV2 | SV3 |
|---|:--:|:--:|:--:|
| HTML | ✓ | ✓ | ✓ |
| CSS | ✓ | ✓ | ✓ |
| JavaScript | ✓ | ✓ | ✓ |
| Git / PR | ✓ | ✓ | ✓ |
| Video OBS | ✓ | ✓ | ✓ |
| Trách nhiệm xuyên suốt | ✓ | ✓ | ✓ |
