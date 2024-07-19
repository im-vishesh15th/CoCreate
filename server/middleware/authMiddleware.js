import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SEC);
        req.userId = decoded.id;
        next();
    } catch (error) {
        res.status(401).json({ message: "Unauthenticated" });
    }
}

 export default authMiddleware;