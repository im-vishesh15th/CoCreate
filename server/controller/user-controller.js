import User from '../schema/userSchema.js';

export const getUserDocuments = async (req, res) => {
    try {
        const user = await User.findById(req.userId).populate('documents');
        res.status(200).json(user.documents);
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
};