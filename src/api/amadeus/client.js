import { AMADEUS_CONFIG } from './config';

class AmadeusClient {
  constructor() {
    this.accessToken = null;
    this.tokenExpiry = null;
  }

  async authenticate() {
    const params = new URLSearchParams();
    params.append('grant_type', 'client_credentials');
    params.append('client_id', AMADEUS_CONFIG.clientId);
    params.append('client_secret', AMADEUS_CONFIG.clientSecret);

    try {
      const response = await fetch('https://test.api.amadeus.com/v1/security/oauth2/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params,
      });

      const data = await response.json();
      this.accessToken = data.access_token;
      this.tokenExpiry = Date.now() + (data.expires_in * 1000);
      return this.accessToken;
    } catch (error) {
      console.error('Error autenticando con Amadeus:', error);
      throw error;
    }
  }

  async getFlightOffers(origin, destination, departureDate, returnDate = null) {
    if (!this.accessToken || Date.now() >= this.tokenExpiry) {
      await this.authenticate();
    }

    const params = new URLSearchParams({
      originLocationCode: origin,
      destinationLocationCode: destination,
      departureDate: departureDate,
      adults: '1',
      currencyCode: 'EUR',
      max: '5'
    });

    if (returnDate) {
      params.append('returnDate', returnDate);
    }

    try {
      const response = await fetch(`https://test.api.amadeus.com/v2/shopping/flight-offers?${params}`, {
        headers: {
          'Authorization': `Bearer ${this.accessToken}`
        }
      });

      if (!response.ok) {
        throw new Error(`Error en la petición: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error obteniendo ofertas de vuelo:', error);
      throw error;
    }
  }
}

export const amadeusClient = new AmadeusClient();