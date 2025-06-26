import { User as FirebaseUser } from 'firebase/auth';
import { User, InsertUser } from '../../shared/schema';

const API_BASE = '/api';

export class UserService {
  static async createOrUpdateUser(firebaseUser: FirebaseUser): Promise<User> {
    const userData: InsertUser = {
      email: firebaseUser.email!,
      username: firebaseUser.email!.split('@')[0],
      displayName: firebaseUser.displayName,
      photoURL: firebaseUser.photoURL,
      firebaseUID: firebaseUser.uid,
    };

    const response = await fetch(`${API_BASE}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error('Failed to create or update user');
    }

    return response.json();
  }

  static async getUserByFirebaseUID(firebaseUID: string): Promise<User | null> {
    const response = await fetch(`${API_BASE}/users/firebase/${firebaseUID}`);
    
    if (response.status === 404) {
      return null;
    }
    
    if (!response.ok) {
      throw new Error('Failed to fetch user');
    }

    return response.json();
  }
}