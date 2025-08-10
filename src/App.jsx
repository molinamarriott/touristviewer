import { useState } from 'react';
import { FlightService } from './services/flightService';

function App() {
  const [origin, setOrigin] = useState('MAD');
  const [destination, setDestination] = useState('BCN');
  const [departureDate, setDepartureDate] = useState('2024-09-01');
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const results = await FlightService.searchFlights(origin, destination, departureDate);
      setFlights(Array.isArray(results) ? results : [results]);
    } catch (err) {
      setError('Error al buscar vuelos. Por favor, inténtalo de nuevo.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>TouristViewer ✈️</h1>
      
      <form onSubmit={handleSearch} style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 1fr 1fr auto',
        gap: '10px',
        marginBottom: '30px'
      }}>
        <input
          type="text"
          value={origin}
          onChange={(e) => setOrigin(e.target.value.toUpperCase())}
          placeholder="Origen (ej. MAD)"
          style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }}
        />
        <input
          type="text"
          value={destination}
          onChange={(e) => setDestination(e.target.value.toUpperCase())}
          placeholder="Destino (ej. BCN)"
          style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }}
        />
        <input
          type="date"
          value={departureDate}
          onChange={(e) => setDepartureDate(e.target.value)}
          style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }}
        />
        <button 
          type="submit" 
          disabled={loading}
          style={{
            padding: '10px 20px',
            backgroundColor: loading ? '#ccc' : '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? 'Buscando...' : 'Buscar Vuelos'}
        </button>
      </form>

      {error && (
        <div style={{ 
          padding: '15px', 
          backgroundColor: '#ffebee', 
          color: '#c62828',
          borderRadius: '4px',
          marginBottom: '20px'
        }}>
          {error}
        </div>
      )}

      <div>
        {flights.map((flight, index) => (
          <div key={index} style={{
            border: '1px solid #e0e0e0',
            borderRadius: '8px',
            padding: '20px',
            marginBottom: '20px',
            backgroundColor: 'white',
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
          }}>
            <h3>Vuelo {index + 1}</h3>
            <pre style={{ 
              whiteSpace: 'pre-wrap',
              backgroundColor: '#f8f9fa',
              padding: '15px',
              borderRadius: '4px',
              overflowX: 'auto'
            }}>
              {JSON.stringify(flight, null, 2)}
            </pre>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;