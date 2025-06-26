import { FC, useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, loginWithGoogle, logoutFromGoogle } from '../firebase';
import { UserService } from '../services/userService';
import { User } from '../../shared/schema';

export const LoginButton: FC = () => {
  const [firebaseUser] = useAuthState(auth);
  const [dbUser, setDbUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (firebaseUser) {
      setIsLoading(true);
      UserService.createOrUpdateUser(firebaseUser)
        .then(user => {
          setDbUser(user);
        })
        .catch(error => {
          console.error('Error syncing user with database:', error);
          // For development, we'll just show Firebase user data
          setDbUser({
            id: 0,
            email: firebaseUser.email!,
            username: firebaseUser.email!.split('@')[0],
            displayName: firebaseUser.displayName,
            photoURL: firebaseUser.photoURL,
            firebaseUID: firebaseUser.uid,
            isActive: true,
            createdAt: new Date(),
            updatedAt: new Date(),
          });
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setDbUser(null);
    }
  }, [firebaseUser]);

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      await loginWithGoogle();
    } catch (error) {
      console.error('Login failed:', error);
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await logoutFromGoogle();
      setDbUser(null);
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex gap-3 items-center">
        <div className="w-8 h-8 bg-brand-blue/30 rounded-full animate-pulse border border-brand-blue/50"></div>
        <span className="text-brand-gray animate-pulse">Loading...</span>
      </div>
    );
  }

  return dbUser ? (
    <div className="flex gap-3 items-center">
      <img 
        src={dbUser.photoURL || '/default-avatar.png'} 
        className="w-8 h-8 rounded-full border-2 border-brand-blue/50 shadow-brand-blue/30 shadow-sm" 
        alt="User avatar" 
      />
      <span className="text-sm text-brand-lime font-medium">
        Welcome, {dbUser.displayName || dbUser.username}!
      </span>
      <button onClick={handleLogout} className="btn btn-secondary">
        Disconnect
      </button>
    </div>
  ) : (
    <button onClick={handleLogin} className="btn btn-primary">
      Connect Cosmic Wallet
    </button>
  );
};