import axios from 'axios';

/*
 Verificar un token de Google reCAPTCHA v3 del lado del servidor.
 token - Token generado en el cliente por google reCAPTCHA.
*/
export async function reCAPTCHA(token: string): Promise<boolean> {
  // Clave secreta proporcionada por google reCAPTCHA
  const secretKey = process.env.RECAPTCHA_SECRET_KEY!;

  try {
    const res = await axios.post(
      'https://www.google.com/recaptcha/api/siteverify',
      null, // No se envía body, ya que los datos van como parametros.
      {
        params: {
          secret: secretKey,   // Clave secreta del servidor.
          response: token,     // Token que viene del cliente (frontend).
        },
      }
    );
    return res.data.success === true;
  } catch (error) {
    return false;
  }
}