/*
 Verificar un token de Google reCAPTCHA v3 del lado del servidor.
 token - Token generado en el cliente por google reCAPTCHA.
*/
export async function reCAPTCHA(token: string): Promise<boolean> {
    // Clave secreta dada por google reCAPTCHA
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;

  if (!secretKey) {
    return false;
  }

  try {
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        secret: secretKey, // Clave secreta del servidor.
        response: token, // Token que viene del cliente (frontend).
      }),
    });
    const data = await response.json();
    return data.success === true;
  } catch (error) {
    console.error('Error al verificar reCAPTCHA:', error);
    return false;
  }
}
