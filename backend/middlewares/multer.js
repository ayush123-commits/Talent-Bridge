import multer from "multer";

const storage = multer.memoryStorage();

// Keeps support for any legacy components processing single uploads
export const singleUpload = multer({ storage: storage }).single('file');

// NEW: Combined middleware configured explicitly for multiple distinct upload fields
export const profileUploads = multer({ storage: storage }).fields([
    { name: 'file', maxCount: 1 },         // Maps to req.files.file
    { name: 'profilePhoto', maxCount: 1 }  // Maps to req.files.profilePhoto
]);