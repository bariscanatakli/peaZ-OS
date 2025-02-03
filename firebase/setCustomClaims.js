import { authPromise } from './admin.js';

// Function to set user role
const setUserRole = async (uid, role) => {
  try {
    const auth = await authPromise; // Await the auth instance
    await auth.setCustomUserClaims(uid, { role });
 
  } catch (error) {
    console.error('Error setting custom claims:', error);
  }
};

setUserRole('ppVj4E8bCxg1qWjtVkgPIx2IM5u2', 'admin');
setUserRole('QHo4FYblLTha6v4Ep9ZOdkz79CJ3', 'guest');