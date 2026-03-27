'use client';

import React, { useState } from 'react';

type EmailGateProps = {
  onSuccess: (email: string) => void;
  productId: string; // Left here for the type definition even if unused in UI
};

export default function EmailGate({ onSuccess }: EmailGateProps) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setError('');
    setLoading(true);
    await onSuccess(email);
    setLoading(false);
  };

  return (
    <div className="w-full max-w-[320px] px-6 flex flex-col items-center">
      <img
        src="/logo.png"
        alt="SPL Logo"
        className="h-10 w-auto object-contain mb-6"
      />

      <p className="text-[13px] font-light text-center text-neutral-300 mb-8 tracking-wide">
        Enter your email once to unlock the exhibition
      </p>

      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (error) setError('');
            }}
            placeholder="your@email.com"
            className="w-full bg-transparent border-b border-neutral-700 py-3 text-white placeholder-neutral-600 focus:outline-none focus:border-white transition-colors text-center text-sm rounded-none"
            required
            disabled={loading}
          />
          {error && <p className="text-red-500 text-xs text-center">{error}</p>}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-white text-black text-sm font-medium py-3 rounded hover:bg-neutral-200 transition-colors disabled:opacity-50 mt-2"
        >
          {loading ? 'Verifying...' : 'Continue'}
        </button>
      </form>
    </div>
  );
}
