# FitPlan Studio

FitPlan Studio là giao diện mẫu cho một nền tảng lập kế hoạch tập luyện và xây dựng thói quen. Dự án gồm 15 trang riêng, phục vụ bốn nhóm vai trò: người tập, huấn luyện viên, điều phối cộng đồng và quản trị viên.

Đây là bản giao diện demo chạy bằng dữ liệu mẫu ở phía trình duyệt. Dự án hiện chưa kết nối backend hay cơ sở dữ liệu; các gợi ý được gọi là AI trong giao diện là logic mô phỏng theo luật.


## Các trang trong dự án

| Nhóm người dùng | Trang | Thư mục |
|---|---|---|
| Dùng chung | Trang chủ | [`01-trang-chu`](./01-trang-chu/) |
| Dùng chung | Đăng nhập | [`02-dang-nhap`](./02-dang-nhap/) |
| Dùng chung | Đăng ký | [`03-dang-ky`](./03-dang-ky/) |
| Người tập | Dashboard | [`04-nguoi-tap-dashboard`](./04-nguoi-tap-dashboard/) |
| Người tập | Kế hoạch tập luyện và gợi ý theo luật | [`05-nguoi-tap-ke-hoach`](./05-nguoi-tap-ke-hoach/) |
| Người tập | Nhật ký tập luyện | [`06-nguoi-tap-nhat-ky`](./06-nguoi-tap-nhat-ky/) |
| Huấn luyện viên | Danh sách và theo dõi học viên | [`07-coach-hoc-vien`](./07-coach-hoc-vien/) |
| Huấn luyện viên | Duyệt kế hoạch tập | [`08-coach-duyet-ke-hoach`](./08-coach-duyet-ke-hoach/) |
| Huấn luyện viên | Quản lý template bài tập | [`09-coach-template`](./09-coach-template/) |
| Điều phối cộng đồng | Quản lý challenge | [`10-cong-dong-challenge`](./10-cong-dong-challenge/) |
| Điều phối cộng đồng | Bảng xếp hạng | [`11-cong-dong-leaderboard`](./11-cong-dong-leaderboard/) |
| Điều phối cộng đồng | Nội dung wellness | [`12-cong-dong-noi-dung`](./12-cong-dong-noi-dung/) |
| Quản trị viên | Thư viện bài tập | [`13-admin-bai-tap`](./13-admin-bai-tap/) |
| Quản trị viên | Quản lý người dùng | [`14-admin-nguoi-dung`](./14-admin-nguoi-dung/) |
| Quản trị viên | Analytics | [`15-admin-analytics`](./15-admin-analytics/) |

## Chức năng tiêu biểu

- *Người tập:* xem tiến độ, tạo hoặc chỉnh sửa kế hoạch, ghi nhật ký tập luyện.
- *Huấn luyện viên:* tìm kiếm và theo dõi học viên, duyệt kế hoạch, quản lý mẫu bài tập.
- *Điều phối cộng đồng:* tạo challenge, quản lý bảng xếp hạng và bài viết wellness.
- *Quản trị viên:* quản lý bài tập và tài khoản, xem thống kê hoạt động.
- *Giao diện:* có bố cục responsive cho desktop, máy tính bảng và điện thoại; một số trang có trạng thái tải, dữ liệu trống và lỗi mô phỏng.

## Công nghệ

- HTML5
- CSS3: Flexbox, Grid và Media Queries
- JavaScript thuần: thao tác DOM và xử lý sự kiện
- JavaScript thuần: thao tác DOM và xử lý sự kiện
link figma: https://www.figma.com/design/HeCymv5xs6QMeUSsBWLHk0/Untitled?node-id=0-1&t=clBn2w0PGP7DlGU7-1
