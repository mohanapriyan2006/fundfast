<div align="center">

# 💰 FundFast - E-Wallet Application

[![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-1B1F23?style=for-the-badge&logo=expo&logoColor=white)](https://expo.dev/)
[![Spring Boot](https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white)](https://spring.io/projects/spring-boot)
[![MySQL](https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white)](https://www.mysql.com/)
[![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white)](https://jwt.io/)

**A modern, secure, and feature-rich digital wallet solution for seamless money management**

[Features](#-features) • [Tech Stack](#-tech-stack) • [Getting Started](#-getting-started) • [API Docs](#-api-documentation) • [Screenshots](#-screenshots)

</div>

---

## 🌟 Features

### 💳 Core Wallet Features
- **Multi-Wallet Management** - Create and manage multiple wallets (Personal, Business, etc.)
- **Instant Transfers** - Send money between wallets with real-time balance updates
- **Secure Deposits** - Add funds to wallets securely
- **Transaction History** - Detailed transaction logs with filtering and pagination
- **QR Code Scanner** - Quick wallet-to-wallet transfers via QR scanning

### 🔐 Security & Authentication
- **JWT Authentication** - Secure token-based authentication
- **PIN Protection** - 4-digit PIN for sensitive transactions
- **Password Encryption** - BCrypt hashing for maximum security
- **Role-Based Access** - User and Admin roles with different permissions

### 📊 Analytics & Insights
- **Monthly Statistics** - Visual charts showing income vs expenses
- **Wallet-Specific Reports** - Track performance per wallet
- **Real-Time Balance** - Live balance updates across all wallets

### 🎨 User Experience
- **Beautiful UI** - Modern, intuitive interface with smooth animations
- **Dark/Light Themes** - Customizable color schemes
- **Push Notifications** - Transaction alerts and promotional offers
- **Responsive Design** - Works seamlessly on Android, iOS, and Web

### 🎁 Promotions & Rewards
- **Cashback Offers** - Daily and weekly promotional deals
- **Referral System** - Earn rewards by referring friends
- **Payment List** - Quick access to electricity, recharge, vouchers, DTH

---

## 🛠️ Tech Stack

### Frontend (React Native + Expo)
```
📱 React Native 0.81.5
🚀 Expo SDK 54
🧭 React Navigation (Stack + Bottom Tabs)
📊 React Native Chart Kit
✅ Yup (Form Validation)
📷 Expo Camera (QR Scanning)
🔔 Expo Notifications
💾 AsyncStorage
🌐 Axios
```

### Backend (Spring Boot)
```
☕ Java 21
🍃 Spring Boot 3.5.7
🔒 Spring Security + JWT
🗄️ Spring Data JPA
🐬 MySQL Database
📝 SpringDoc OpenAPI (Swagger)
🔐 BCrypt Password Encoding
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v18+)
- **Java** (JDK 21)
- **MySQL** (v8+)
- **Expo CLI** (`npm install -g expo-cli`)
- **Maven** (for backend)

### 📦 Installation

#### 1️⃣ Clone the Repository
```bash
git clone https://github.com/mohanapriyan2006/fundfast.git
cd fundfast
```

#### 2️⃣ Backend Setup
```bash
cd backend

# Configure database in src/main/resources/application.properties
spring.datasource.url=jdbc:mysql://localhost:3306/fundfast
spring.datasource.username=your_username
spring.datasource.password=your_password

# Run the application
mvn spring-boot:run
```
Backend will start at `http://localhost:8080`

#### 3️⃣ Frontend Setup
```bash
cd frontend

# Install dependencies
npm install

# Start Expo development server
npx expo start

# Run on Android
npx expo run:android

# Run on iOS
npx expo run:ios

# Run on Web
npx expo start --web
```

---

## 📚 API Documentation

Once the backend is running, access the interactive API documentation:

- **Swagger UI**: `http://localhost:8080/swagger-ui.html`
- **OpenAPI JSON**: `http://localhost:8080/v3/api-docs`

### Key Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/auth/register` | Register new user |
| `POST` | `/api/auth/login` | Login user |
| `GET` | `/api/wallet/ownerId/{id}` | Get user's wallets |
| `POST` | `/api/wallet/{userId}` | Create wallet |
| `POST` | `/api/wallet/{id}/deposit` | Deposit to wallet |
| `POST` | `/api/wallet/{from}/transfer/{to}` | Transfer money |
| `GET` | `/api/transaction/walletId/{id}` | Get transactions |
| `GET` | `/api/user/{id}` | Get user details |
| `PUT` | `/api/user/{id}` | Update user |

---

## 📱 Screenshots

<div align="center">

| Login | Home | Wallets |
|-------|------|---------|
| ![Login](assets/screenshots/login.png) | ![Home](assets/screenshots/home.png) | ![Wallets](assets/screenshots/wallets.png) |

| Transfer | Statistics | Profile |
|----------|-----------|---------|
| ![Transfer](assets/screenshots/transfer.png) | ![Stats](assets/screenshots/stats.png) | ![Profile](assets/screenshots/profile.png) |

</div>

---

## 📁 Project Structure

```
fundfast/
├── backend/                    # Spring Boot backend
│   ├── src/main/java/
│   │   └── com/e_wallet/fundfast/
│   │       ├── config/         # Security, CORS, JWT
│   │       ├── controller/     # REST Controllers
│   │       ├── entity/         # JPA Entities
│   │       ├── repository/     # Data Access Layer
│   │       ├── service/        # Business Logic
│   │       └── util/           # JWT utilities
│   └── pom.xml
│
└── frontend/                   # React Native app
    ├── app/                    # Navigation & Routing
    ├── assets/                 # Images, icons
    ├── components/             # Reusable components
    │   ├── HomeComponents/
    │   ├── ProfileComponents/
    │   └── RoundMenuComponents/
    ├── context/                # Global state (Auth, Data)
    ├── screens/                # Main screens
    ├── service/                # API integration
    └── theme/                  # Colors, styles
```

---

## 🔑 Key Features Explained

### 🔐 Authentication Flow
1. User registers with name, email, username, password, and 4-digit PIN
2. Yup validation ensures strong passwords (min 6 chars, uppercase, lowercase, number)
3. Backend encrypts password with BCrypt
4. Login returns JWT token stored in AsyncStorage
5. All protected routes require valid JWT in `Authorization: Bearer <token>`

### 💸 Transaction Flow
1. User selects source wallet
2. Enters amount and destination wallet
3. PIN verification for security
4. Backend validates balance and performs atomic transfer
5. Transaction record created with timestamp
6. Real-time balance updates
7. Push notification sent to both parties

### 📊 Statistics Generation
- Transactions grouped by month (DEPOSIT, TRANSFER in/out)
- Income = DEPOSIT + incoming TRANSFER
- Expense = outgoing TRANSFER
- Chart displays monthly trends with bar graphs
- Wallet-specific filtering

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Mohanapriyan M**

- GitHub: [@mohanapriyan2006](https://github.com/mohanapriyan2006)
- Email: mohanapriyan.m2006@email.com

---

## 🙏 Acknowledgments

- [Expo](https://expo.dev/) - Amazing React Native tooling
- [Spring Boot](https://spring.io/projects/spring-boot) - Powerful Java framework
- [React Native Chart Kit](https://github.com/indiespirit/react-native-chart-kit) - Beautiful charts
- [SpringDoc OpenAPI](https://springdoc.org/) - API documentation

---

<div align="center">

**⭐ Star this repo if you find it helpful!**

Made with ❤️ by Mohan M

</div>
