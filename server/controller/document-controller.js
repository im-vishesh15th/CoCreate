import Document from '../schema/documentSchema.js';
import User from '../schema/userSchema.js';

export const getDocument = async (data) => {
    if (data.id === null) return;

    const user=User.findById(data.user && data.user._id);

    const document = await Document.findById(data.id);
    if (document) return document;
else{
    await data.user && User.findByIdAndUpdate(data.user._id, { $push: { docids: data.id }})
    return await Document.create({ _id: data.id, data: "" });
}
};

export const getnewDocument = async (req,res) => {
    const {id,user,coverpageno}=req.body;
    if (id === null)
        res.status(500).json({ error: 'Failed to create document' });

   
    const document = await Document.findById(id);
    
    if (document) 
    res.status(500).json({ error: 'Failed to create document' });
    else{
    await User.findByIdAndUpdate(user._id, { $push: { docids: id }})
   
     await Document.create({ _id: id, data:"" ,user,coverpageno});
     res.status(201).json({message:"success"});


}
};




export const updateDocument = async (_id, dat) => {
   
    return await Document.findByIdAndUpdate(_id,{ data: dat.data});
};


    
       export const addCollaborator = async (req, res) => {
        const { documentId, collaboratorEmail } = req.body;
        try {
          
            
            const document = await Document.findById(documentId);
           
            const collaborator = await User.findOne({ email: collaboratorEmail });
            if (!document) {
                return res.status(404).json({ message: "Document not found" });
            }
             else if (!collaborator) {
                return res.status(404).json({ message: "User not found" });
            }
            else if (document.user.toString() === collaborator._id.toString()) {
                return res.status(409).json({ message: "Collaborator is the owner of the document" });
            }
            else if (document.collaborators.includes(collaborator._id)) {
                return res.status(400).json({ message: "User is already a collaborator" });
            }
    
            document.collaborators.push(collaborator._id);
            await document.save();
       
            collaborator.codocids.push(documentId);
            await collaborator.save();
          
    
            res.status(200).json({ message: "Collaborator added successfully" });
        } catch (error) {
            console.log("Error adding collaborator:", error);
            res.status(500).json({ message: "Something went wrong" });
        }
    };

   
        export const getUserDocuments = async (req, res) => {
            const { userId } = req.params;
            try {
               
                const user = await User.findById(userId);
        
                if (!user) {
                    return res.status(404).json({ message: 'User not found' });
                }
        
                // Fetch documents for both docids and codocids
                const docidsData = await Promise.all(user.docids.map(async (doc) => {
                    const document = await Document.findById(doc).select('title _id updatedAt coverpageno ');
                    return document;

                }));
       
        
                const codocidsData = await Promise.all(user.codocids.map(async (codoc) => {
                    const document = await Document.findById(codoc).select('title _id updatedAt coverpageno');
                    return document;
                }));
        
                // Combine both arrays into a single array of documents
                const allDocuments = {docids:[...docidsData],codocids:[ ...codocidsData]};
             
                res.status(200).json(allDocuments);
            } catch (error) {
                console.error('Error fetching user documents:', error);
                res.status(500).json({ message: 'Error fetching documents', error });
            }
        };
export const getDoc = async (req, res) => {
    const { id } = req.params;
    try {
        const docs = await Document.findById(id);
      
        res.status(200).json(docs);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching documents', error });
    }
};


export const getDocumentCollaborators = async (req, res) => {
    const { documentId } = req.body;

    try {
     
        const document = await Document.findById(documentId);

        if (!document) {
            return res.status(404).json({ message: "Document not found" });
        }


        const collaboratorsInfo = await Promise.all(document.collaborators.map(async(collaborator) => {
          const collaber=await User.findById(collaborator.toString()).select('profileImage username')
        return collaber;
        }));

        res.status(200).json({collabers:[...collaboratorsInfo]});
    } catch (error) {
       
        res.status(500).json({ message: "Something went wrong" });
    }
};
