import { amadeusClient } from '../api/amadeus/client';

export const FlightService = {
  async searchFlights(origin, destination, departureDate, returnDate = null) {
    try {
      const response = await amadeusClient.getFlightOffers(
        origin,
        destination,
        departureDate,
        returnDate
      );
      return response.data || [];
    } catch (error) {
      console.error('Error en el servicio de vuelos:', error);
      throw error;
    }
  },

  async getCheapestFlights(origin, destination, startDate, endDate) {
    try {
      const response = await amadeusClient.getFlightOffers(
        origin,
        destination,
        startDate,
        endDate
      );
      
      if (!response.data || response.data.length === 0) {
        return { message: 'No se encontraron vuelos para esta ruta' };
      }

      // Ordenar por precio (más barato primero)
      const sortedFlights = [...response.data].sort((a, b) => {
        return parseFloat(a.price.total) - parseFloat(b.price.total);
      });

      return {
        cheapestFlight: sortedFlights[0],
        price: sortedFlights[0].price,
        totalResults: sortedFlights.length
      };
    } catch (error) {
      console.error('Error buscando vuelos más baratos:', error);
      throw error;
    }
  }
};