import express from 'express';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import Document from './schema/documentSchema.js';
import cors from 'cors';
import Connection from './database/db.js';
import authRoutes from './routes/authRoutes.js';
import { getDocument, updateDocument } from './controller/document-controller.js'; // Ensure this is correctly imported
import documentRoutes from './routes/documentRoutes.js';
dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

console.log("IO PORT=",PORT);
Connection();

const corsOptions = {
    origin: ['https://co-create-create-2.vercel.app','https://co-create-ui-vishesh-guptas-projects.vercel.app','https://co-create-ui-git-main-vishesh-guptas-projects.vercel.app'], // Your frontend's origin
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // Allow cookies to be sent
    allowedHeaders: "Content-Type, Authorization", // Specify the allowed headers
    optionsSuccessStatus: 200
};



app.use(cors(corsOptions));
app.use(express.json());

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});
app.use('/api/auth', authRoutes);
app.use('/documents/user', documentRoutes);


const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Initialize Socket.IO with the server
const io = new Server(server, {
    cors: {
        origin: '*', // Your frontend's URL
        methods: ['GET', 'POST']
    }
});


io.on('connection', socket => {
   
    socket.on('get-document', async data => {
      
        const document = await getDocument(data);
        const documentId = data.id;
        socket.join(documentId);
        socket.emit('load-document', document.data);

        socket.on('send-changes', delta => {
           
            socket.broadcast.to(documentId).emit('receive-changes', delta);
        });
       

        socket.on('save-document', async data => {
          
            await updateDocument(documentId, data);
        });
        socket.on('save-title', async ({ id, title }) => {
            await Document.findByIdAndUpdate(id, { title });
            socket.broadcast.to(data.id).emit('update-title', title); // Notify other clients
          });
        

        socket.on('send-cursor', ({ userId, index, length, name }) => {
           
            socket.broadcast.to(documentId).emit('receive-cursor', { userId, index, length, name });
        });
    });
});

