📌 Django + React (Vite) Full Setup Guide
⚡ Requirements

Python ≥ 3.9

Node.js ≥ 18

npm (Node.js ke saath aata hai)

Git (optional, repo clone ke liye)

🛠 Backend (Django API)
1️⃣ Virtual Environment banao aur activate karo
# Windows
python -m venv venv
venv\Scripts\activate

# Mac/Linux
# python3 -m venv venv
# source venv/bin/activate

2️⃣ Django dependencies install karo
pip install django djangorestframework django-cors-headers

3️⃣ Django project aur app banao
django-admin startproject backend
cd backend
python manage.py startapp api

4️⃣ settings.py me update karo
INSTALLED_APPS = [
    ...,
    "rest_framework",
    "corsheaders",
    "api",
]

MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
    ...,
]

CORS_ALLOW_ALL_ORIGINS = True

5️⃣ Test API banao (api/views.py)
from django.http import JsonResponse

def ping(request):
    return JsonResponse({"status": "ok", "service": "django", "version": 1})

6️⃣ URLs me add karo (backend/urls.py)
from django.contrib import admin
from django.urls import path
from api.views import ping

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/ping/", ping),
]

7️⃣ Server run karo
python manage.py runserver

➡️ Open: http://127.0.0.1:8000/api/ping/

Response:
{
  "status": "ok",
  "service": "django",
  "version": 1
}

🎨 Frontend (React + Vite)
1️⃣ Vite project banao
cd ..   # backend se project root me aao
npm create vite@latest client
cd client
npm install
npm install axios

2️⃣ src/App.jsx update karo
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [status, setStatus] = useState(null);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/ping/")
      .then(res => setStatus(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h1>React ↔ Django Health Check</h1>
      {status ? (
        <p>Backend status: {status.status} ({status.service}) v{status.version}</p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;

3️⃣ React server run karo
npm run dev

➡️ Open: http://localhost:5173

Browser me dikhega:
React ↔ Django Health Check
Backend status: ok (django) v1

🚀 Folder Structure
project-root/
│── backend/        # Django backend
│── client/         # React frontend
│── venv/           # Python virtual environment

✅ Next Steps

Backend me apne models, serializers, views banao

React me axios se data fetch aur display karo

Deployment ke liye: Django → Gunicorn/Uvicorn, React → npm run build

