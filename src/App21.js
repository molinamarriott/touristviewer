import { useState } from 'react';
import { FlightService } from './services/flightService';

function App() {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    try {
      // Ejemplo: Vuelos de Madrid a Barcelona en septiembre 2024
      const results = await FlightService.searchFlights('MAD', 'BCN', '2024-09-01');
      setFlights(results);
    } catch (err) {
      setError('Error al buscar vuelos. Por favor, inténtalo de nuevo.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App" style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>TouristViewer</h1>
      <div style={{ marginBottom: '20px' }}>
        <button 
          onClick={handleSearch} 
          disabled={loading}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: loading ? '#ccc' : '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? 'Buscando...' : 'Buscar vuelos de ejemplo (MAD-BCN)'}
        </button>
      </div>
      
      {error && (
        <div style={{ color: 'red', margin: '10px 0', padding: '10px', border: '1px solid red' }}>
          {error}
        </div>
      )}
      
      {flights.length > 0 && (
        <div>
          <h2>Resultados de vuelos:</h2>
          <div style={{ 
            marginTop: '20px',
            padding: '15px',
            backgroundColor: '#f8f9fa',
            borderRadius: '4px',
            overflowX: 'auto'
          }}>
            <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
              {JSON.stringify(flights, null, 2)}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;