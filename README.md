# Mediflix+ – Doctor Appointment Web App

**Mediflix+** is a full-stack web application that streamlines doctor appointment booking for patients, doctors, and admins. Built using the **MERN stack**, it supports **secure online payments** via **Stripe** and **Razorpay**.

---

## 🚀 Tech Stack

- **Frontend**: React.js  
- **Backend**: Node.js, Express.js  
- **Database**: MongoDB  
- **Authentication**: JWT  
- **Payments**: Stripe & Razorpay

---

## 🔐 User Roles & Features

### 👤 Patient
- Register, login, and manage appointments
- Book appointments and pay via cash, Stripe, or Razorpay
- View and edit profile details

### 🩺 Doctor
- View and manage patient appointments
- Update profile and availability
- Dashboard with earnings and appointments overview

### 🛠️ Admin
- Create/edit/delete doctor profiles
- View all appointments and users
- Dashboard with key analytics

---

## 📱 Key Pages

- **Home**: Search doctors by specialty, view top doctors  
- **Doctors**: Filter doctors and view details  
- **Appointment**: Book appointments with selected doctors  
- **About & Contact**: Info about the platform and office details  
- **Admin & Doctor Dashboards**: Role-specific analytics and tools

---

## 💳 Payments

Supports multiple payment modes:
- Cash  
- Stripe  
- Razorpay

---

## ⚙️ Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/mediflix-plus.git
   cd mediflix-plus
   ```

2. **Install Dependencies**
   ```bash
   npm install
   cd client
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env` file in the root:
   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   STRIPE_API_KEY=your_stripe_api_key
   RAZORPAY_API_KEY=your_razorpay_api_key
   ```

4. **Run the App**
   ```bash
   npm run dev
   ```

---

## 📁 Folder Structure

```
mediflix-plus/
├── client/        # React frontend
├── server/        # Node backend
├── models/        # MongoDB schemas
├── routes/        # API endpoints
├── controllers/   # API logic
├── middleware/    # Auth and error handling
├── config/        # Env and DB config
└── .env           # Secrets and keys
```

---

## 🤝 Contributing

Pull requests and contributions are welcome!
