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
const router = express.Router();
const PORT = process.env.PORT || 9000;
const PORT2 = process.env.PORT || 3000;

Connection();

const corsOptions = {
    origin: 'http://localhost:3001', // Allow only your frontend's origin
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // Allow cookies to be sent
    optionsSuccessStatus: 204
};

router.get('/',(req,res)=>{
res.send('App is Running..');
});

app.use(cors(corsOptions));
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/documents/user', documentRoutes);



const io = new Server(PORT, {
    cors: {
        origin: 'http://localhost:3001',
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
app.listen(PORT2, () => {
    console.log(`Backend server is running on port ${PORT2}!`);
});