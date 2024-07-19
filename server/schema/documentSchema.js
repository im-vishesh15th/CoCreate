import mongoose from 'mongoose';

const documentSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        default:"Untitled"
    },
    coverpageno:{
        type:Number,
        required:true,
        default:9

    },

    _id: {
        type: String,
        required: true
    },
    data: {
        type: Object,
        required: true
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    collaborators: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
   
},
{ timestamps: true }
);

const Document = mongoose.model('Document', documentSchema);
export default Document;