import { storage } from '../storage';
import { InsertUser } from '../../shared/schema';

export async function handleUsersAPI(method: string, path: string, body?: any) {
  if (method === 'POST' && path === '/api/users') {
    return await createOrUpdateUser(body);
  }
  
  if (method === 'GET' && path.startsWith('/api/users/firebase/')) {
    const firebaseUID = path.split('/').pop();
    return await getUserByFirebaseUID(firebaseUID!);
  }
  
  throw new Error('Not found');
}

async function createOrUpdateUser(userData: InsertUser) {
  try {
    // Check if user already exists
    if (userData.firebaseUID) {
      const existingUser = await storage.getUserByFirebaseUID(userData.firebaseUID);
      if (existingUser) {
        // Update existing user
        return await storage.updateUser(existingUser.id, userData);
      }
    }
    
    // Create new user
    return await storage.createUser(userData);
  } catch (error) {
    console.error('Error creating/updating user:', error);
    throw error;
  }
}

async function getUserByFirebaseUID(firebaseUID: string) {
  try {
    const user = await storage.getUserByFirebaseUID(firebaseUID);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
}