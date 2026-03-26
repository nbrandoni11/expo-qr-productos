'use client';

import React, { useEffect, useState } from 'react';
import EmailGate from './EmailGate';
import { saveLead } from '@/services/db';

type ClientViewerProps = {
  productId: string;
};

export default function ClientViewer({ productId }: ClientViewerProps) {
  // 3 states: 'loading' to prevent hydration flashing, 'gated' showing form, 'granted' showing image.
  const [accessState, setAccessState] = useState<'loading' | 'gated' | 'granted'>('loading');
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    // On mount, check if the user has already provided their email in this device
    const hasAccess = localStorage.getItem('expo_email_verified');
    if (hasAccess === 'true') {
      setAccessState('granted');
    } else {
      setAccessState('gated');
    }
  }, []);

  const handleEmailSuccess = async (email: string) => {
    // Here we use the db.ts service to simulate saving the lead
    const success = await saveLead(email, productId);
    if (success) {
      localStorage.setItem('expo_email_verified', 'true');
      setAccessState('granted');
    } else {
      alert("Hubo un error al guardar el correo. Intenta de nuevo.");
    }
  };

  if (accessState === 'loading') {
    // Minimal loading state matching the black background
    return <div className="w-full h-screen bg-black" />;
  }

  if (accessState === 'gated') {
    // Show the minimal Email Gate
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-black">
        <EmailGate onSuccess={handleEmailSuccess} productId={productId} />
      </div>
    );
  }

  // Once access is granted, show the full screen image or fallback error
  if (imageError) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-black">
        <p className="text-neutral-500 tracking-widest uppercase text-sm">Imagen no disponible</p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-black flex items-center justify-center overflow-hidden">
      {/* 
        Using standard HTML img tag instead of Next.js Image component to keep things 
        simple for dynamically loading unoptimized local mass-assets 
      */}
      <img
        src={`/productos/${productId}.jpg`}
        alt={`Producto ${productId}`}
        className="w-full max-w-screen-md max-h-screen object-contain"
        onError={() => setImageError(true)}
      />
    </div>
  );
}
