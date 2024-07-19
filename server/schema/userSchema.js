import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    profileImage: {
        type: String,
       default:'https://picsum.photos/200'
    },
    password: {
        type: String,
        required: true
    },

    docids:[ {
        type: String,
        
    }],
    codocids:[ {
        type: String, 
    }],
    documents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Document' }]
}
,{ timestamps: true });

const User = mongoose.model('User', userSchema);
export default User;