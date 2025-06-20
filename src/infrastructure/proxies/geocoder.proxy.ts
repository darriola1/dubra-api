import dotenv from 'dotenv';

dotenv.config();

export async function geocodeAddress(address: string) {
  const userAgent = process.env.NOMINATIM_USER_AGENT;

  if (!userAgent) {
    throw new Error('NOMINATIM_USER_AGENT no está definida en el archivo .env');
  }

  const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json`;

  const response = await fetch(url, {
    headers: {
      'User-Agent': userAgent
    }
  });

  if (!response.ok) {
    throw new Error(`Error en geocodificación: ${response.status} - ${response.statusText}`);
  }

  const data = await response.json();
  return data;
}
