import React, { useState } from 'react';
import { GoogleLogin, CredentialResponse } from '@react-oauth/google';

const SignIn: React.FC = () => {
  const [error, setError] = useState<string | null>(null);

  const handleSuccess = (cred: CredentialResponse) => {
    try {
      // Persist a simple auth flag; in a real app you'd verify the token server-side
      localStorage.setItem('auth.google', 'true');
      if (cred.credential) {
        localStorage.setItem('auth.google.credential', cred.credential);
      }
      // Notify the app that login succeeded
      window.dispatchEvent(new Event('google:login_success'));
    } catch (e) {
      setError('Failed to process login locally.');
      console.error(e);
    }
  };

  const handleError = () => {
    setError('Google Sign-In failed. Please try again.');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-sm bg-white rounded-xl shadow-md p-6 text-center">
        <h1 className="text-2xl font-bold mb-2">Welcome</h1>
        <p className="text-gray-600 mb-6">Sign in to continue to Funnel of Vibes</p>
        <div className="flex justify-center">
          <GoogleLogin onSuccess={handleSuccess} onError={handleError} useOneTap />
        </div>
        {error && (
          <p className="text-red-600 text-sm mt-4" role="alert">
            {error}
          </p>
        )}
        <p className="text-xs text-gray-400 mt-6">Protected by Google reCAPTCHA • Privacy • Terms</p>
      </div>
    </div>
  );
};

export default SignIn;
