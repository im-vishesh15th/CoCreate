
# CoCreate - Real-Time Collaborative Document Editor

<p align="center">
  <img src="https://img.shields.io/badge/React-17.0.2-61DAFB?style=for-the-badge&logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/Socket.IO-4.4.1-010101?style=for-the-badge&logo=socket.io&logoColor=white" />
  <img src="https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=for-the-badge&logo=mongodb&logoColor=white" />
</p>

CoCreate is a modern, real-time collaborative document editing platform that enables seamless teamwork with live synchronization, rich text editing, and integrated communication features. [1](#2-0) 

## 🚀 Key Features

- **Real-Time Synergy**: Collaborate with your team in real-time, witnessing changes as they unfold before your eyes [1](#2-0) 
- **Integrated Discourse**: Engage in meaningful discussions directly within your documents with built-in chat [2](#2-1) 
- **Rich Text Editing**: Advanced formatting with Quill.js editor
- **Document Export**: Export to PDF and DOCX formats [3](#2-2) 
- **User Authentication**: Secure registration and login system
- **Live Cursors**: See collaborators' cursors in real-time

## 🏗️ System Architecture

```mermaid
graph TB
    subgraph "Client Layer"
        UI["React Frontend"]
        Editor["Quill.js Editor"]
        Auth["Authentication"]
        Export["Document Export"]
    end
    
    subgraph "Communication Layer"
        WS["WebSocket (Socket.IO)"]
        HTTP["HTTP/REST API"]
    end
    
    subgraph "Server Layer"
        Express["Express.js Server"]
        SocketServer["Socket.IO Server"]
        JWT["JWT Authentication"]
    end
    
    subgraph "Data Layer"
        MongoDB[("MongoDB Database")]
        Schemas["Document Schemas"]
    end
    
    UI --> WS
    UI --> HTTP
    Editor --> WS
    Auth --> HTTP
    Export --> HTTP
    
    WS --> SocketServer
    HTTP --> Express
    
    Express --> JWT
    Express --> MongoDB
    SocketServer --> MongoDB
    MongoDB --> Schemas
```

## 🛠️ Technology Stack

### Frontend Architecture

```mermaid
graph LR
    subgraph "React Ecosystem"
        React["React 17.0.2"]
        ReactDOM["React DOM"]
        ReactRouter["React Router 6.2.1"]
    end
    
    subgraph "UI Framework"
        MUI["Material-UI 5.16.1"]
        MUIIcons["MUI Icons"]
        Emotion["Emotion Styling"]
        StyledComponents["Styled Components"]
        FramerMotion["Framer Motion"]
    end
    
    subgraph "Editor & Collaboration"
        Quill["Quill.js 1.3.7"]
        ReactQuill["React Quill"]
        QuillCursors["Quill Cursors"]
        QuillToWord["Quill to Word"]
    end
    
    subgraph "Communication"
        SocketIOClient["Socket.IO Client"]
        Axios["Axios HTTP Client"]
        Firebase["Firebase SDK"]
    end
    
    subgraph "Utilities"
        JSPDF["jsPDF"]
        FileSaver["File Saver"]
        UUID["UUID Generator"]
        LucideReact["Lucide Icons"]
    end
    
    React --> ReactDOM
    React --> ReactRouter
    React --> MUI
    React --> ReactQuill
    ReactQuill --> Quill
    Quill --> QuillCursors
    React --> SocketIOClient
    React --> Axios
```

### Backend Architecture

```mermaid
graph TB
    subgraph "Server Core"
        NodeJS["Node.js Runtime"]
        Express["Express.js Framework"]
        SocketIO["Socket.IO Server"]
    end
    
    subgraph "Database Layer"
        Mongoose["Mongoose ODM"]
        MongoDB[("MongoDB Database")]
        DocumentSchema["Document Schema"]
    end
    
    subgraph "Authentication"
        JWT["JWT Tokens"]
        BCrypt["Password Hashing"]
    end
    
    subgraph "Middleware"
        CORS["CORS Configuration"]
        DotEnv["Environment Variables"]
    end
    
    NodeJS --> Express
    NodeJS --> SocketIO
    Express --> Mongoose
    Express --> JWT
    Express --> CORS
    Mongoose --> MongoDB
    MongoDB --> DocumentSchema
    JWT --> BCrypt
    Express --> DotEnv
```

## 📊 Data Flow Diagram

```mermaid
sequenceDiagram
    participant User1 as User 1
    participant Client1 as React Client 1
    participant Server as Express/Socket.IO Server
    participant DB as MongoDB
    participant Client2 as React Client 2
    participant User2 as User 2
    
    User1->>Client1: Edit Document
    Client1->>Server: Send Delta via WebSocket
    Server->>DB: Save Document Changes
    Server->>Client2: Broadcast Delta
    Client2->>User2: Display Real-time Changes
    
    Note over Client1,Client2: Real-time Collaboration
    
    User1->>Client1: Export Document
    Client1->>Server: Request Export (HTTP)
    Server->>DB: Fetch Document
    Server->>Client1: Return PDF/DOCX
```

## 🔧 Technology Stack Details

### Frontend Dependencies [4](#2-3) 

| Category | Technology | Version | Purpose |
|----------|------------|---------|---------|
| **Core Framework** | React | 17.0.2 | UI Framework |
| **UI Library** | Material-UI | 5.16.1 | Component Library |
| **Text Editor** | Quill.js | 1.3.7 | Rich Text Editing |
| **Real-time** | Socket.IO Client | 4.4.1 | WebSocket Communication |
| **Styling** | Styled Components | 6.1.11 | CSS-in-JS |
| **HTTP Client** | Axios | 1.6.7 | API Requests |
| **Export** | jsPDF | 2.5.1 | PDF Generation |
| **Authentication** | Firebase | 10.12.3 | User Management |

### Backend Dependencies

| Category | Technology | Purpose |
|----------|------------|---------|
| **Server** | Express.js | HTTP Server Framework |
| **Real-time** | Socket.IO | WebSocket Server |
| **Database** | MongoDB + Mongoose | Data Persistence |
| **Authentication** | JWT + bcryptjs | Secure Authentication |
| **Environment** | dotenv | Configuration Management |

## 📁 Project Structure

```
CoCreate/
├── client/                          # React Frontend
│   ├── public/                      # Static Assets
│   ├── src/
│   │   ├── components/              # Reusable Components
│   │   ├── pages/                   # Application Pages
│   │   │   ├── Home.jsx            # Landing Page
│   │   │   ├── Register.jsx        # User Registration
│   │   │   └── Login.jsx           # User Login
│   │   ├── utils/                   # Utility Functions
│   │   └── App.js                  # Main App Component
│   ├── package.json                # Frontend Dependencies
│   └── README.md                   # Client Documentation
├── server/                          # Node.js Backend
│   ├── controller/                  # Business Logic
│   ├── routes/                      # API Routes
│   ├── schema/                      # Database Schemas
│   ├── database/                    # Database Configuration
│   ├── index.js                    # Server Entry Point
│   └── package.json                # Backend Dependencies
└── README.md                       # Project Documentation
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v14+)
- MongoDB
- npm/yarn

### Installation & Setup

1. **Clone Repository**
   ```bash
   git clone https://github.com/im-vishesh15th/CoCreate.git
   cd CoCreate
   ```

2. **Backend Setup**
   ```bash
   cd server
   npm install
   
   # Create .env file
   echo "MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   PORT=5000" > .env
   
   npm start
   ```

3. **Frontend Setup** [5](#2-4) 
   ```bash
   cd ../client
   npm install
   npm start
   ```

### Available Scripts

#### Frontend [5](#2-4) 
- `npm start` - Development server
- `npm run build` - Production build
- `npm test` - Run tests
- `npm run eject` - Eject from CRA

#### Backend
- `npm start` - Start server
- `npm run dev` - Development with nodemon

## 🌐 Deployment Architecture

```mermaid
graph TB
    subgraph "Production Environment"
        CDN["CDN (Static Assets)"]
        LoadBalancer["Load Balancer"]
        
        subgraph "Frontend Deployment"
            Vercel["Vercel Hosting"]
            ReactBuild["React Build"]
        end
        
        subgraph "Backend Deployment"
            ServerHost["Node.js Hosting"]
            ExpressApp["Express Application"]
            SocketIOServer["Socket.IO Server"]
        end
        
        subgraph "Database"
            MongoAtlas["MongoDB Atlas"]
        end
    end
    
    CDN --> Vercel
    Vercel --> ReactBuild
    LoadBalancer --> ServerHost
    ServerHost --> ExpressApp
    ServerHost --> SocketIOServer
    ExpressApp --> MongoAtlas
    SocketIOServer --> MongoAtlas
```

### Deployment URLs [6](#2-5) 
- Production: `https://co-create-create-2.vercel.app`
- Staging: `https://co-create-ui-vishesh-guptas-projects.vercel.app`

## 🔄 Real-Time Collaboration Flow

```mermaid
graph LR
    subgraph "User Actions"
        Type["User Types"]
        Cursor["Cursor Movement"]
        Format["Text Formatting"]
    end
    
    subgraph "Client Processing"
        Delta["Generate Delta"]
        Emit["Emit to Server"]
        Apply["Apply Changes"]
    end
    
    subgraph "Server Processing"
        Receive["Receive Delta"]
        Validate["Validate Changes"]
        Broadcast["Broadcast to Others"]
        Save["Save to Database"]
    end
    
    subgraph "Other Clients"
        Listen["Listen for Changes"]
        Update["Update Editor"]
        ShowCursor["Show Cursors"]
    end
    
    Type --> Delta
    Cursor --> Delta
    Format --> Delta
    Delta --> Emit
    Emit --> Receive
    Receive --> Validate
    Validate --> Broadcast
    Validate --> Save
    Broadcast --> Listen
    Listen --> Update
    Listen --> ShowCursor
    Update --> Apply
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License.

---

**CoCreate** - Crafting the future of collaboration. ✨


