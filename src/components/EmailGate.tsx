'use client';

import React, { useState } from 'react';

type EmailGateProps = {
  onSuccess: (email: string) => void;
  productId: string;
};

export default function EmailGate({ onSuccess, productId }: EmailGateProps) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError('Por favor, ingresa un correo válido.');
      return;
    }

    setError('');
    setLoading(true);
    // Passing the email out. The wrapper handles the DB saving Simulation.
    await onSuccess(email);
    setLoading(false);
  };

  return (
    <div className="w-full max-w-sm px-6 py-8 flex flex-col gap-6">
      <div className="text-center">
        <h1 className="text-2xl font-light mb-2 tracking-wide">Acceso al Producto</h1>
        <p className="text-sm text-neutral-400">Ingresa tu correo para continuar</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="correo@ejemplo.com"
            className="w-full bg-neutral-900 border border-neutral-800 rounded-md px-4 py-3 text-white placeholder-neutral-500 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-colors"
            required
            disabled={loading}
          />
          {error && <p className="text-red-400 text-sm">{error}</p>}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-white text-black font-medium py-3 rounded-md hover:bg-neutral-200 transition-colors disabled:opacity-50"
        >
          {loading ? 'Verificando...' : 'Continuar'}
        </button>
      </form>
    </div>
  );
}
