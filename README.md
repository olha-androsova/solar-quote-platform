# 🌞 Solar Quote Platform

A simple full-stack app for estimating solar savings and submitting quote requests.

---

## 🚀 Tech Stack

- **Frontend:** React, TypeScript (Vite)
- **Backend:** Django, Django REST Framework
- **Database:** SQLite

---

## ✨ Features

- Calculate estimated savings (30% of monthly energy bill)
- Submit quote request (name, email, phone, address)
- Backend stores and returns quote requests
- Dashboard displays submitted requests

---

## 🛠️ Run Locally

### Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt

python manage.py migrate
python manage.py runserver
```
### Frontend

```bash
cd frontend
npm install
npm run dev
```
---
## 🔌 API

`POST /api/quotes/` – create quote request

`GET /api/quotes/` – list quote requests

---
## 🔐 Environment
Create `backend/.env`:
```
SECRET_KEY=your-secret-key
```

## 🧪 Tests
```bash
python manage.py test
```

---
## 💬 Notes
- Savings are calculated on both frontend (UI) and backend (source of truth)
- Validation handled via Django REST Framework serializers