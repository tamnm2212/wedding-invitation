# wedding-invitation

## Bước 1: Tạo Google Sheet

Vào Google Drive → New → Google Sheets.

Đặt tên (ví dụ): RSVP_TranHoang_LanAnh.

Ở dòng 1, tạo header:

| A         | B    | C     | D         | E          | F       |
| --------- | ---- | ----- | --------- | ---------- | ------- |
| Timestamp | Name | Phone | GuestType | Attendance | Message |

## Bước 2: Mở Apps Script

Trong Google Sheet → menu Extensions (Tiện ích mở rộng) → Apps Script.

Nó mở một project mới, xóa hết code mặc định trong file Code.gs, thay bằng đoạn dưới:

~~~
const SHEET_NAME = 'Sheet1';

function doPost(e) {
  const sheet = SpreadsheetApp.getActive().getSheetByName(SHEET_NAME);
  const data = JSON.parse(e.postData.contents);

  const now = new Date();

  // 💥 BỎ HẾT IF LỌC "attending" – LƯU TẤT CẢ
  sheet.appendRow([
    now,                    // Timestamp
    data.name || '',        // Họ tên
    data.phone || '',       // SĐT
    data.guestType || '',   // Nhà trai / Nhà gái / Bạn chung / Khác
    data.attendance || '',  // attending / not-attending / maybe
    data.message || ''      // Lời nhắn
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ success: true }))
    .setMimeType(ContentService.MimeType.JSON);
}

// API lấy toàn bộ RSVP để hiển thị
function doGet(e) {
  const sheet = SpreadsheetApp.getActive().getSheetByName(SHEET_NAME);
  const values = sheet.getDataRange().getValues();
  
  const headers = values[0];
  const rows = values.slice(1);

  const data = rows.map(row => ({
    timestamp: row[0],
    name: row[1],
    phone: row[2],
    guestType: row[3],
    attendance: row[4],
    message: row[5]
  }));

  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
~~~

## Bước 3: Deploy thành web app

Trong Apps Script → bấm nút Deploy (Triển khai) → New deployment (Triển khai mới).

Chọn loại: Web app.

Description: RSVP Webhook.

Execute as: Me (bạn).

Who has access / Ai được truy cập: chọn Anyone hoặc Anyone with the link (Ai có link).

Bấm Deploy → nó hỏi quyền → Authorize → chọn tài khoản → Allow.

Sau khi deploy xong, nó sẽ cho bạn 1 cái Web app URL, ví dụ:

https://script.google.com/macros/s/AKfycbx......../exec

Copy URL này lại – lát nữa dán vào file .js của bạn.