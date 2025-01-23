import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

export const saveFileSystem = async (fileSystem) => {
    try {
        await setDoc(doc(db, "fileSystems", "default"), fileSystem);
        // console.log("File system saved successfully.");
    } catch (e) {
        console.error("Error saving file system: ", e);
    }
};


export const fetchFileSystem = async () => {
    const docRef = doc(db, "fileSystems", "default");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return docSnap.data();
    } else {
        // console.log("No such document!");
        return null;
    }
};