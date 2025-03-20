import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { LoginForm } from './index';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { loginRequest } from '../../store/reducers/authReducer';
import { vi, describe, it, expect, beforeEach, beforeAll } from 'vitest';

// Mock Redux store
const mockStore = configureStore([]);

// Mock theme object
const theme = {
  colors: {
    primaryGradient: 'linear-gradient(to right, #4facfe 0%, #00f2fe 100%)'
  }
};

// Mock matchMedia for Ant Design
beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(), // Deprecated
      removeListener: vi.fn(), // Deprecated
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
});

describe('LoginForm Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      auth: {
        loading: false,
        error: null,
        isAuthenticated: false,
        user: null
      }
    });
    store.dispatch = vi.fn();
  });

  const renderLoginForm = () => {
    return render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <LoginForm />
        </ThemeProvider>
      </Provider>
    );
  };

  it('renders the login form correctly', () => {
    renderLoginForm();
    
    // Check that form elements are displayed
    expect(screen.getByRole('heading', { name: 'Login' })).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
    expect(screen.getByText('Demo credentials: user@example.com / password')).toBeInTheDocument();
  });

  it('displays validation errors when submitting an empty form', async () => {
    renderLoginForm();
    
    // Get submit button and click it
    const submitButton = screen.getByRole('button', { name: /login/i });
    fireEvent.click(submitButton);
    
    // Check for validation errors
    await waitFor(() => {
      expect(screen.getAllByText('Please input your email!')[0]).toBeInTheDocument();
      expect(screen.getAllByText('Please input your password!')[0]).toBeInTheDocument();
    });
    
    // Verify that the store dispatch was not called
    expect(store.dispatch).not.toHaveBeenCalled();
  });

  it('dispatches loginRequest action when form is submitted with valid data', async () => {
    renderLoginForm();
    
    // Fill out the form
    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const submitButton = screen.getByRole('button', { name: /login/i });
    
    fireEvent.change(emailInput, { target: { value: 'user@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    fireEvent.click(submitButton);
    
    // Check that dispatch was called with the correct action
    await waitFor(() => {
      expect(store.dispatch).toHaveBeenCalledWith(
        loginRequest({ email: 'user@example.com', password: 'password' })
      );
    });
  });

  it('displays error message when login fails', () => {
    // Setup store with error
    store = mockStore({
      auth: {
        loading: false,
        error: 'Invalid credentials',
        isAuthenticated: false,
        user: null
      }
    });
    store.dispatch = vi.fn();
    
    renderLoginForm();
    
    // Check that error message is displayed
    expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
  });

  it('displays welcome message when user is authenticated', () => {
    // Setup store with authenticated user
    store = mockStore({
      auth: {
        loading: false,
        error: null,
        isAuthenticated: true,
        user: { name: 'John Doe' }
      }
    });
    
    renderLoginForm();
    
    // Check that welcome message is displayed
    expect(screen.getByText('Welcome, John Doe!')).toBeInTheDocument();
    expect(screen.getByText('You are successfully logged in.')).toBeInTheDocument();
    
    // Form should not be displayed
    expect(screen.queryByLabelText('Email')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Password')).not.toBeInTheDocument();
  });
}); 