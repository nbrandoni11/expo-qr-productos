'use client';

import React, { useEffect, useState } from 'react';
import EmailGate from './EmailGate';
import { saveLead } from '@/services/db';

type ClientViewerProps = {
  productId: string;
};

export default function ClientViewer({ productId }: ClientViewerProps) {
  const [accessState, setAccessState] = useState<'loading' | 'gated' | 'granted'>('loading');
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const hasAccess = localStorage.getItem('expo_email_verified');
    if (hasAccess === 'true') {
      setAccessState('granted');
    } else {
      setAccessState('gated');
    }
  }, []);

  const handleEmailSuccess = async (email: string) => {
    const success = await saveLead(email, productId);
    if (success) {
      localStorage.setItem('expo_email_verified', 'true');
      setAccessState('granted');
    } else {
      alert("An error occurred. Please try again.");
    }
  };

  if (accessState === 'loading') {
    return <div className="w-full h-[100dvh] bg-black" />;
  }

  if (accessState === 'gated') {
    return (
      <div className="w-full h-[100dvh] bg-black overflow-hidden flex items-center justify-center">
        <EmailGate onSuccess={handleEmailSuccess} productId={productId} />
      </div>
    );
  }

  if (imageError) {
    return (
      <div className="w-full h-[100dvh] bg-black overflow-hidden flex items-center justify-center">
        <p className="text-neutral-500 tracking-widest uppercase text-sm">Image not available</p>
      </div>
    );
  }

  return (
    <div className="w-full h-[100dvh] bg-black flex items-center justify-center overflow-hidden">
      <img
        src={`/productos/${productId}.jpg`}
        alt={`Product ${productId}`}
        className="w-full h-full object-contain"
        onError={() => setImageError(true)}
      />
    </div>
  );
}
