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


<img width="2394" height="1496" alt="Screenshot 2025-08-19 165504" src="https://github.com/user-attachments/assets/d63bd96e-b496-4bac-ad90-ed5bdad02bc3" />

<img width="434" alt="Screenshot 2025-08-19 165727" src="https://github.com/user-attachments/assets/66e88a63-b984-453a-b5dd-56d8ca8da4e3" />

**Example request (PowerShell):**

```powershell
curl.exe -X POST http://localhost:3000/upload -F "file=@sample.csv"
```
