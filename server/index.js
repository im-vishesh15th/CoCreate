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

const PORT = process.env.PORT || 9000;
const PORT2 = process.env.PORT2 || 3000;
console.log("IO PORT=",PORT);
Connection();

const corsOptions = {
    origin: '*', // Your frontend's origin
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // Allow cookies to be sent
    allowedHeaders: "Content-Type, Authorization", // Specify the allowed headers
    optionsSuccessStatus: 200
};



app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); 
app.use(express.json());
app.post('/api/auth/login', (req, res) => {
    // Your login logic here
    res.status(200).json({ message: 'Login successful' });
});
app.use('/documents/user', documentRoutes);
app.all('*', function(req, res, next) {
    if (req.method === 'OPTIONS') {
      // Handle pre-flight requests
      res.header('Access-Control-Allow-Origin', corsOptions.origin);
      res.header('Access-Control-Allow-Methods', corsOptions.methods);
      res.header('Access-Control-Allow-Headers', req.headers['access-control-request-headers']);
      res.status(200).send();
    } else {
      next();
    }
  });



const io = new Server(PORT, {
    cors: {
        origin: '*',
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
