import React from 'react';
import { render, screen } from '@testing-library/react';
import { LoginButton } from '../src/components/LoginButton';

// Mock Firebase auth
jest.mock('../src/firebase', () => ({
  auth: {},
  loginWithGoogle: jest.fn(),
  logoutFromGoogle: jest.fn(),
}));

// Mock react-firebase-hooks
jest.mock('react-firebase-hooks/auth', () => ({
  useAuthState: () => [null, false, null], // [user, loading, error]
}));

// Mock UserService
jest.mock('../src/services/userService', () => ({
  UserService: {
    createOrUpdateUser: jest.fn(),
    getUserByFirebaseUID: jest.fn(),
  },
}));

test('renders sign in button when user is not authenticated', () => {
  render(<LoginButton />);
  expect(screen.getByText(/sign in with google/i)).toBeInTheDocument();
});

test('button has proper CSS classes', () => {
  render(<LoginButton />);
  const button = screen.getByText(/sign in with google/i);
  expect(button).toHaveClass('btn', 'btn-primary');
});