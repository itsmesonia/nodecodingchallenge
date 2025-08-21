# Node.js File Upload API Challenge

## 📌 Overview

This project is a Node.js/Express API built for a coding challenge.  
It allows uploading a **CSV file of user data** (`name, email`) and performs **asynchronous email validation** for each record.

The API simulates calling an external email validation service, limits concurrent requests, and provides a **status tracking endpoint** so you can check progress after upload.

The project also includes:

- ✅ **Rate limiting** on the upload endpoint
- ✅ **CSV streaming parser** (handles large files efficiently)
- ✅ **Concurrency control** (`p-limit`, max 5 validations at once)
- ✅ **Detailed JSON response** (processed vs failed records)
- ✅ **Logging** with Winston
- ✅ **Error handling** (invalid files, timeouts, unexpected errors)
- ✅ **Unit tests** with Jest & Supertest

---

## 🚀 API Endpoints

### 1. Upload File

**POST** `/upload`

- Accepts a `.csv` file with columns: `name,email`
- Returns an `uploadId` to track progress

1️⃣ Upload a file (POST)

Method: POST

URL: http://localhost:3000/upload

Body → form-data

Key: file (type = File)

Value: pick a CSV file (e.g. your sample.csv)

👉 Response should look like:

```
{
"uploadId": "a7f6c8c9-9c7e-4c1a-8d83-57a29c24f6b2",
"message": "File uploaded successfully. Processing started."
}
```

<p align="center">
<img width="800" height="1501" alt="Screenshot 2025-08-19 165906" src="https://github.com/user-attachments/assets/d775aef7-6f2d-413a-a725-452f38d1097e" />
</p>

<p align="center">
<img width="400" alt="Screenshot 2025-08-19 165727" src="https://github.com/user-attachments/assets/66e88a63-b984-453a-b5dd-56d8ca8da4e3" />
</p>

_Screenshot: Uploading a CSV file and receiving `uploadId` response_

**Example request (PowerShell):**

### 2. Check Status

**GET** `/status/:uploadId`

- Returns the current progress of the upload, or the final results once processing is complete.
- If the `uploadId` is invalid, returns a `404`.

2️⃣ Check status (GET)

Method: GET

URL:

http://localhost:3000/upload/<uploadId>

Replace <uploadId> with the one you just got back from a post request.

Example:

http://localhost:3000/upload/a7f6c8c9-9c7e-4c1a-8d83-57a29c24f6b2

<p align="center">
  <img width="800" alt="Check status request in Postman" src="" />
</p>

<p align="center">
  <img width="800" alt="Status final response" src="" />
</p>

_Screenshot: Polling `/status/:uploadId` in Postman — first shows progress, then final JSON result._

```powershell
curl.exe -X POST http://localhost:3000/upload -F "file=@sample.csv"
```
