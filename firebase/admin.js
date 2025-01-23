import admin from 'firebase-admin';
import { readFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

// Helper to get __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to the service account JSON file
const serviceAccountPath = path.join(__dirname, 'peaz-os-firebase-adminsdk-fbsvc-c20f1f880b.json');

// Function to load and parse the service account JSON
const loadServiceAccount = async () => {
  try {
    const data = await readFile(serviceAccountPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading the service account JSON file:', error);
    throw error;
  }
};

// Initialize Firebase Admin SDK
const initializeAdmin = async () => {
  const serviceAccount = await loadServiceAccount();
  
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }

  return admin.auth();
};

// Export a promise that resolves to the auth instance
const authPromise = initializeAdmin();

export { authPromise };