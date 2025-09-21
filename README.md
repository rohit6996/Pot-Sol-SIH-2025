# 🚀 PotSol - Civic Complaint & Parking Management System

PotSol is a platform that allows citizens to raise civic complaints (like potholes, garbage, etc.) and check parking availability in real time.  
It connects with Twitter, Google Maps, Gmail, and PostgreSQL to provide smooth communication between users and administrators.

---

## 📌 What the Project Does

- Citizens can raise complaints with our app & also through twitter.
- Citizen just have to tag our hashtag "#PotSol" and post their complaint. 
- Complaints raised on the same issue/address are categorized together to avoid duplicates.  
- Admins can send quick reply messages (e.g., "Already registered", "Invalid complaint").  
- Complaints are linked with Google Maps for easy visualization.  
- Parking slot availability can be tracked and displayed to users.  
- Notifications are sent to users through email for updates.  

---

## ✨ Features Available Now

- 📝 Raise complaints with app & Twitter. 
- 🔄 Duplicate complaint detection and categorization  
- 📩 Admin quick-reply templates via email  
- 📍 Map integration for complaints  
- 🚗 Parking availability dashboard  

---

## ⚙️ Required Credentials

- **Google Maps API Key**
- **Twitter API Key + Secret + Bearer Token**
- **Gmail App Password** (for sending emails)
- **PostgreSQL Username + Password**

## ▶️ How to Run

1. **Backend Setup**
   cd tweet/backend
   npm install
   npm start
   Runs server on: http://localhost:5000

2. **Frontend Setup**
    cd src
    npm install
    npm run dev
    Opens app on: http://localhost:8080
