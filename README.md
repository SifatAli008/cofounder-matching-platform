# Co-founder Matching Platform

A modern web application to help startup founders connect with the right partners. Built with React.js, Material UI (MUI)/shadcn/ui, Tailwind CSS, and advanced UI/UX best practices.

## 🚀 Features

- Beautiful, responsive profile pages for founders
- Drag-and-drop, chip-style skills field
- Project, experience, and academic record management
- Profile completeness, endorsements, and social/contact links
- "Looking for" badge and co-founder vision field
- Modern animations, glassmorphism, and microinteractions
- Accessibility and mobile-first design
- Secure authentication with JWT
- Email verification system
- Real-time notifications

## 🛠️ Tech Stack

### Frontend
- React.js (Vite)
- Material UI (MUI) / shadcn/ui
- Tailwind CSS
- Framer Motion (animations)
- dnd-kit (drag-and-drop)
- react-toastify (toasts)
- Lucide React (icons)
- React Router DOM
- Custom hooks (e.g., use-toast, use-mobile)
- Axios for API calls

### Backend
- Node.js with Express
- PostgreSQL database
- Prisma ORM
- JWT for authentication
- Nodemailer for email services
- Winston for logging

## 📦 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- PostgreSQL database
- Git

### Setup

1. **Clone the repo:**

```sh
git clone https://github.com/SifatAli008/cofounder-matching-platform.git
cd cofounder-matching-platform
```

2. **Install dependencies:**

```sh
npm install
```

3. **Start the dev server:**

```sh
npm run dev
```

4. **Open in your browser:**

Visit [http://localhost:5173](http://localhost:5173)

### Backend Setup

1. **Navigate to backend directory:**

```sh
cd backend
```

2. **Install dependencies:**

```sh
npm install
```

3. **Configure environment variables:**

Create a `.env` file in the backend directory with:

```
DATABASE_URL="your_postgresql_connection_string"
JWT_SECRET="your_jwt_secret"
PORT=3000
NODE_ENV=development
```

4. **Run database migrations:**

```sh
npx prisma migrate deploy
```

5. **Start the server:**

```sh
npm run dev
```

## 🔧 Environment Variables

### Frontend
- `VITE_API_URL`: Backend API URL (default: http://localhost:3000)

### Backend
- `DATABASE_URL`: PostgreSQL connection string
- `JWT_SECRET`: Secret key for JWT tokens
- `PORT`: Server port (default: 3000)
- `NODE_ENV`: Environment (development/production)

## 🤝 Contributing

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Sifat Ali** - _Initial work_ - [SifatAli008](https://github.com/SifatAli008)

## 🙏 Acknowledgments

- Thanks to all contributors who have helped shape this project
- Inspired by the need for better founder matching in the startup ecosystem

---

**Made with ❤️ for the startup community.**
