/**
 * db.ts
 *
 * This service handles saving leads to the Google Sheets backend.
 */

export async function saveLead(email: string, productId: string): Promise<boolean> {
  try {
    const payload = {
      email,
      productId,
      route: window.location.pathname,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
    };

    const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbx8X_deaqmHqLd2VQ3Fz_3MV2pTQWTf6DnTW_-gkNtiYjIPBG7sP158WzzxrdjBTdBI/exec";

    // We send a POST request to Google Apps Script. 
    // Defaulting to text/plain (no headers) bypasses CORS preflight options blocks.
    await fetch(SCRIPT_URL, {
      method: 'POST',
      body: JSON.stringify(payload)
    });

    return true;
  } catch (error) {
    // If the request fails (e.g., ad blocker, network error), log it.
    console.error('Failed to save lead to Google Sheets:', error);
    
    // Always return true so we don't block access to the product image
    return true;
  }
}
