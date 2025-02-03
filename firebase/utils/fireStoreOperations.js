import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

const sanitizeFileSystem = (fileSystem) => {
    if (!fileSystem || !fileSystem['~']) {
        console.error('Invalid file system structure');
        return null;
    }

    const sanitize = (obj) => {
        // Base case for non-objects
        if (typeof obj !== 'object' || obj === null) return obj;
        
        const clean = {};
        // Preserve all properties of files and directories
        for (const [key, value] of Object.entries(obj)) {
            // Keep all properties for files and directories
            if (value && typeof value === 'object') {
                clean[key] = sanitize(value);
            } else {
                clean[key] = value;
            }
        }
        return clean;
    };

    return sanitize(fileSystem);
};

export const saveFileSystem = async (fileSystem) => {
    try {
        // Validate structure
        if (!fileSystem || !fileSystem['~']) {
            throw new Error('Invalid file system structure');
        }

        // Deep clone to avoid reference issues
        const fileSystemToSave = JSON.parse(JSON.stringify(fileSystem));
        
        // Save to Firestore
        await setDoc(doc(db, "fileSystems", "default"), fileSystemToSave);
        
      
        return fileSystemToSave;
    } catch (error) {
        console.error('Error saving to Firestore:', error);
        throw error;
    }
};

export const fetchFileSystem = async () => {
    try {
        const docRef = doc(db, "fileSystems", "default");
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
            const data = docSnap.data();
            if (!data || !data['~']) {
                throw new Error('Invalid file system data');
            }
            return data;
        }
        return null;
    } catch (error) {
        console.error("Error fetching file system:", error);
        return null;
    }
};