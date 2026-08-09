# 💬 Chat-Lingual

> A real-time chat application built with **React, Node.js, Express, MongoDB, and Socket.IO**.

Chat-Lingual is a full-stack real-time messaging application that enables users to authenticate, communicate through conversations, and exchange messages instantly using WebSocket-based communication.

The project combines a **React + Vite frontend** with a **Node.js + Express backend**, **MongoDB persistence**, and **Socket.IO** for real-time messaging and notifications.

---

## ✨ Features

* 🔐 User authentication
* 👤 User management
* 💬 Real-time messaging
* 👥 One-to-one and group conversations
* ⚡ Instant message delivery using Socket.IO
* 🔔 Real-time notifications/events
* 💾 Persistent message storage
* 🗄️ MongoDB database integration
* 🔑 JWT-based authentication
* 🍪 Cookie-based session/token support
* 🌐 RESTful backend APIs
* ⚛️ React-based responsive frontend
* 🔄 Axios-based API communication
* 🛠️ Nodemon development workflow

---

# 🛠️ Tech Stack

| Layer           | Technologies            |
| --------------- | ----------------------- |
| Frontend        | React, Vite, JavaScript |
| Backend         | Node.js, Express        |
| Database        | MongoDB                 |
| ODM             | Mongoose                |
| Real-Time       | Socket.IO               |
| Authentication  | JWT, Cookie Parser      |
| HTTP Client     | Axios                   |
| Development     | Nodemon                 |
| Version Control | Git, GitHub             |

---

# 🏗️ Application Architecture

Chat-Lingual follows a client-server architecture where the frontend communicates with the backend through both **REST APIs** and **Socket.IO**.

```text
                         ┌──────────────────┐
                         │      User        │
                         │    Browser       │
                         └────────┬─────────┘
                                  │
                     ┌────────────┴────────────┐
                     │                         │
                     ▼                         ▼
              ┌──────────────┐         ┌──────────────┐
              │ REST / Axios │         │  Socket.IO   │
              │     API      │         │  Real-time   │
              └──────┬───────┘         └──────┬───────┘
                     │                        │
                     └───────────┬────────────┘
                                 ▼
                       ┌──────────────────┐
                       │ Node.js + Express│
                       │     Backend      │
                       └────────┬─────────┘
                                │
                 ┌──────────────┼──────────────┐
                 │              │              │
                 ▼              ▼              ▼
          ┌────────────┐ ┌────────────┐ ┌────────────┐
          │   Routes   │ │ Controllers│ │  Socket.IO │
          └─────┬──────┘ └─────┬──────┘ └────────────┘
                │              │
                └──────┬───────┘
                       ▼
                ┌──────────────┐
                │   Mongoose   │
                │    Models    │
                └──────┬───────┘
                       ▼
                ┌──────────────┐
                │   MongoDB    │
                └──────────────┘
```

---

# 📂 Project Structure

```text
chatbox/
│
├── backend/
│   │
│   ├── DB/
│   │   └── dbConnect.js
│   │
│   ├── Models/
│   │   ├── user.model.js
│   │   ├── message.model.js
│   │   ├── conversation.model.js
│   │   └── ...
│   │
│   ├── Socket/
│   │   └── Socket.IO configuration
│   │
│   ├── route/
│   │   ├── auth.routes.js
│   │   ├── message.routes.js
│   │   ├── user.routes.js
│   │   └── ...
│   │
│   ├── routeControlers/
│   │   ├── auth.controller.js
│   │   ├── message.controller.js
│   │   ├── user.controller.js
│   │   └── ...
│   │
│   ├── middleWare/
│   │   ├── auth.middleware.js
│   │   └── ...
│   │
│   ├── utils/
│   │   └── utility helpers
│   │
│   └── index.js
│
├── frontend/
│   │
│   ├── public/
│   │   └── static assets
│   │
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── stores/
│   │   └── ...
│   │
│   ├── package.json
│   └── vite.config.js
│
├── package.json
├── .gitignore
└── README.md
```

> File names may vary slightly depending on the current implementation. Refer to the repository for the exact structure.

---

# 🔄 How It Works

## Authentication Flow

```text
User
 │
 ▼
React Login / Register Form
 │
 ▼
Axios Request
 │
 ▼
/api/auth
 │
 ▼
Authentication Controller
 │
 ├── Validate credentials
 ├── Create / verify user
 └── Generate JWT
 │
 ▼
Cookie / Token
 │
 ▼
Authenticated User
```

The backend uses JWT-based authentication to identify authenticated users and protect routes.

---

## Messaging Flow

Messages are persisted in MongoDB while Socket.IO provides real-time delivery.

```text
User A
  │
  │ Send Message
  ▼
React Frontend
  │
  ├──────────────► REST API
  │                    │
  │                    ▼
  │                MongoDB
  │
  └──────────────► Socket.IO
                       │
                       ▼
                    User B
                       │
                       ▼
                 Message appears
                  instantly
```

This allows the application to combine **persistent data storage** with **real-time communication**.

---

# ⚡ Real-Time Communication

Socket.IO is responsible for real-time functionality.

The Socket.IO server is initialized by the backend and communicates with the React client through `socket.io-client`.

It can be used for:

* Sending messages
* Receiving messages
* Real-time notifications
* Conversation events
* User connection/disconnection events
* Other live application events

The primary Socket.IO implementation is located under:

```text
backend/Socket/
```

---

# 🗄️ Database

Chat-Lingual uses **MongoDB** with **Mongoose** as the ODM.

The application stores information such as:

### Users

```text
User
├── Authentication information
├── Profile information
└── User-related metadata
```

### Conversations

```text
Conversation
├── Participants
├── Conversation information
└── Message references / relationships
```

### Messages

```text
Message
├── Sender
├── Conversation
├── Message content
└── Timestamp
```

The database connection is handled through:

```text
backend/DB/dbConnect.js
```

---

# 🔐 Environment Variables

Create a `.env` file in the project root.

At minimum:

```env
MONGODB_CONNECT=your_mongodb_connection_string
PORT=3000
```

Depending on the authentication implementation, you may also need:

```env
JWT_SECRET=your_jwt_secret
```

or:

```env
ACCESS_TOKEN_SECRET=your_access_token_secret
```

> The exact authentication environment variable names are determined by the backend authentication implementation. Check the authentication controllers/middleware before configuring production environments.

### Example `.env`

```env
MONGODB_CONNECT=mongodb+srv://username:password@cluster.mongodb.net/chatlingual
PORT=3000
JWT_SECRET=your_secure_secret
```

### ⚠️ Never commit `.env`

Make sure `.env` is included in `.gitignore`:

```gitignore
.env
.env.local
node_modules/
frontend/node_modules/
frontend/dist/
```

---

# 🚀 Getting Started

## Prerequisites

Install the following before running the project:

* Node.js
* npm
* MongoDB / MongoDB Atlas
* Git

Verify Node.js:

```bash
node --version
```

Verify npm:

```bash
npm --version
```

---

# 📥 Installation

## 1. Clone the repository

```bash
git clone https://github.com/harshparadk25/chatbox.git
cd chatbox
```

---

## 2. Install Backend Dependencies

From the project root:

```bash
npm install
```

---

## 3. Install Frontend Dependencies

```bash
npm install --prefix frontend
```

Alternatively:

```bash
cd frontend
npm install
cd ..
```

---

## 4. Configure Environment Variables

Create:

```text
.env
```

in the project root.

Add:

```env
MONGODB_CONNECT=your_mongodb_connection_string
PORT=3000
JWT_SECRET=your_jwt_secret
```

---

# ▶️ Running the Application

## Start Backend

From the project root:

```bash
npm run dev
```

This runs:

```bash
nodemon backend/index.js
```

The backend will normally be available at:

```text
http://localhost:3000
```

---

## Start Frontend

Open a second terminal:

```bash
npm run dev --prefix frontend
```

Or:

```bash
cd frontend
npm run dev
```

Vite will normally start the frontend at:

```text
http://localhost:5173
```

The exact URL will be displayed in the terminal.

---

# 🏃 Running Both Servers

You need two terminal windows during development.

### Terminal 1 — Backend

```bash
npm run dev
```

### Terminal 2 — Frontend

```bash
npm run dev --prefix frontend
```

Then open:

```text
http://localhost:5173
```

---

# 📡 API Routes

The backend exposes REST APIs under `/api`.

## Authentication

```text
/api/auth
```

Responsible for:

* User registration
* User login
* Authentication
* Token/session handling

---

## Messages

```text
/api/message
```

Responsible for:

* Sending messages
* Retrieving messages
* Message-related operations

---

## Users

```text
/api/user
```

Responsible for:

* User lookup
* User information
* User-related operations

---

# 🔌 Socket.IO

The Socket.IO server provides real-time communication between connected clients.

The general architecture is:

```text
React Client
     │
     │ socket.io-client
     ▼
Socket.IO Server
     │
     ├── Connection events
     ├── Message events
     ├── Notification events
     └── Conversation events
```

The Socket.IO implementation can be found under:

```text
backend/Socket/
```

---

# 🏭 Production Build

## Build Frontend

From the project root:

```bash
npm run build --prefix frontend
```

Or:

```bash
cd frontend
npm run build
```

This generates the production build inside:

```text
frontend/dist/
```

---

# 🚀 Production Deployment

The application can be deployed by hosting the frontend and backend separately or by serving the frontend build through the Express server.

### Frontend hosting options

* Vercel
* Netlify
* Cloudflare Pages
* Static hosting platforms

### Backend hosting options

* Render
* Railway
* AWS
* DigitalOcean
* Docker
* VPS

For production deployment:

1. Configure production environment variables.
2. Configure MongoDB network access.
3. Update frontend API URLs.
4. Configure CORS for the production frontend domain.
5. Configure Socket.IO for the production backend.
6. Build and deploy the frontend.
7. Deploy the Node.js backend.

---

# 🐛 Troubleshooting

## MongoDB connection error

Verify:

```env
MONGODB_CONNECT=...
```

Also check:

* MongoDB cluster is running.
* Database credentials are correct.
* Your IP is allowed by MongoDB Atlas.
* The connection string is valid.

---

## CORS error

If the frontend cannot communicate with the backend, verify the backend CORS configuration.

The frontend typically runs on:

```text
http://localhost:5173
```

while the backend runs on:

```text
http://localhost:3000
```

The backend must allow requests from the frontend origin.

---

## Socket.IO connection failure

Check:

* Backend server is running.
* Frontend is connecting to the correct backend URL.
* CORS configuration allows Socket.IO connections.
* Socket.IO versions are compatible.
* Authentication information is being passed correctly if required.

---

## Authentication problems

Check:

* JWT secret configuration.
* Cookie configuration.
* Token generation.
* Authentication middleware.
* Browser cookie settings.
* Frontend request configuration.

Because the project uses `cookie-parser`, authentication may involve cookies for token/session transport.

---

# 🧑‍💻 Development Workflow

A typical development workflow looks like:

```text
Create / Login User
        │
        ▼
Create / Join Conversation
        │
        ▼
Connect Socket
        │
        ▼
Send Message
        │
        ├──────────────► MongoDB
        │
        └──────────────► Socket.IO
                              │
                              ▼
                         Other Users
```

The combination of REST APIs and WebSockets allows the application to separate **persistent operations** from **real-time events**.

---

# 🎯 Key Files to Understand

If you're presenting this project in an interview, focus on these files first:

| File / Directory           | What to Explain                             |
| -------------------------- | ------------------------------------------- |
| `backend/index.js`         | Server startup and Socket.IO initialization |
| `backend/DB/dbConnect.js`  | MongoDB connection                          |
| `backend/route/`           | API route definitions                       |
| `backend/routeControlers/` | Business logic                              |
| `backend/Models/`          | Mongoose schemas                            |
| `backend/middleWare/`      | Authentication and request middleware       |
| `backend/Socket/`          | Real-time communication                     |
| `frontend/src/`            | React application                           |
| `frontend/src/components/` | Reusable UI components                      |
| `frontend/src/pages/`      | Application pages                           |
| `frontend/src/stores/`     | Frontend state management                   |

---

# 💡 Important Concepts Demonstrated

This project demonstrates practical experience with:

* Full-stack JavaScript development
* React component architecture
* REST API development
* Express.js
* MongoDB
* Mongoose
* JWT authentication
* Middleware
* Cookie-based authentication
* WebSockets
* Socket.IO
* Real-time messaging
* Client-server architecture
* Axios
* State management
* Environment variables
* CORS
* Vite
* Git/GitHub
* Production deployment concepts

---

# 🔮 Future Improvements

Possible improvements include:

* [ ] Read receipts
* [ ] Typing indicators
* [ ] Online/offline presence
* [ ] Message reactions
* [ ] Message editing and deletion
* [ ] File and image sharing
* [ ] Voice messages
* [ ] Push notifications
* [ ] Message search
* [ ] Conversation search
* [ ] Pagination / infinite scrolling
* [ ] End-to-end encryption
* [ ] Better mobile responsiveness
* [ ] Docker support
* [ ] CI/CD pipeline
* [ ] Automated testing
* [ ] Production monitoring and logging

---

# 🤝 Contributing

Contributions are welcome.

### 1. Fork the repository

```bash
git fork https://github.com/harshparadk25/chatbox.git
```

### 2. Create a branch

```bash
git checkout -b feature/your-feature
```

### 3. Make your changes

Implement your feature or fix.

### 4. Commit your changes

```bash
git add .
git commit -m "Add: your feature"
```

### 5. Push the branch

```bash
git push origin feature/your-feature
```

### 6. Open a Pull Request

Provide a clear description of:

* What changed
* Why it was changed
* How it was tested

---

# 📄 License

This project is licensed under the **ISC License**, as defined in the project's `package.json`.

---

# 👨‍💻 Author

**Harsh Paradkar**

GitHub: **[@harshparadk25](https://github.com/harshparadk25)**

---

## ⭐ Support

If you found this project useful or interesting, consider giving the repository a ⭐ on GitHub.
