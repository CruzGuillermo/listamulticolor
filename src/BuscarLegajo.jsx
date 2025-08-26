import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_KEY
);

function LoadingSpinner() {
  return (
    <div className="d-flex flex-column align-items-center my-4">
      <div
        className="spinner-border"
        style={{
          width: "3rem",
          height: "3rem",
          color: "#06b6d4"
        }}
        role="status"
      >
        <span className="visually-hidden">Buscando...</span>
      </div>
      <div style={{ color: "#06b6d4", fontWeight: 600, marginTop: 10, fontSize: "1.1rem" }}>
        Buscando...
      </div>
    </div>
  );
}

export default function BuscarLegajo() {
  const [legajo, setLegajo] = useState('');
  const [resultado, setResultado] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const buscar = async (e) => {
    e.preventDefault();
    setError('');
    setResultado(null);
    setLoading(true);
    const { data, error } = await supabase
      .from('padron')
      .select('*')
      .eq('leg', Number(legajo));
    setLoading(false);
    if (error) {
      setError('Error en la consulta: ' + error.message);
    } else if (data && data.length > 0) {
      setResultado(data[0]);
    } else {
      setError('No se encontró ningún registro con ese legajo.');
    }
  };

  return (
    <div className="container-fluid px-2 px-sm-0">
      <div
        className="card shadow-lg p-3 p-sm-4 mx-auto"
        style={{
          maxWidth: 500,
          margin: '2rem auto',
          borderRadius: 18,
          background: 'linear-gradient(135deg, #e0e7ff 0%, #f0fdfa 100%)',
          boxShadow: '0 4px 24px 0 rgba(0,0,0,0.10)'
        }}
      >
        <h2 className="text-center mb-4" style={{ color: '#4f46e5', fontWeight: 700, fontSize: '1.6rem' }}>Buscar por Legajo</h2>
        <form onSubmit={buscar} autoComplete="off">
          <div className="mb-3">
            <input
              type="number"
              className="form-control form-control-lg border-primary text-center"
              placeholder="Ingrese legajo"
              value={legajo}
              onChange={e => setLegajo(e.target.value)}
              required
              style={{ background: '#fffbe6', fontWeight: 500, fontSize: '1.2rem' }}
              inputMode="numeric"
              min="0"
            />
          </div>
          <button
            type="submit"
            className="btn w-100 py-2"
            style={{ background: 'linear-gradient(90deg, #4f46e5 0%, #06b6d4 100%)', color: 'white', fontWeight: 600, fontSize: '1.1rem', borderRadius: 12 }}
            disabled={loading}
          >
            {loading ? 'Buscando...' : 'Buscar'}
          </button>
        </form>
        {loading && <LoadingSpinner />}
        {error && !loading && <div className="alert alert-danger mt-3 text-center" style={{ fontSize: '1rem' }}>{error}</div>}
        {resultado && !loading && (
          <div
            className="mt-4 p-3 rounded text-center shadow-sm"
            style={{
              background: 'linear-gradient(135deg, #e0e7ff 0%, #bae6fd 100%)',
              color: '#1e293b',
              fontWeight: 500,
              fontSize: '1.1rem',
              borderRadius: 14,
              border: '1px solid #38bdf8'
            }}
          >
            <div><b>Apellido y Nombre:</b> {resultado.apellido_nombre}</div>
            <div><b>Legajo:</b> {resultado.leg}</div>
            <div><b>Unidad Presupuestaria:</b> {resultado.up}</div>
            <div><b>Categoria:</b> {resultado.cat}</div>
            <div><b>Efectivo o Contrato:</b> {resultado.crv}</div>
          </div>
        )}
      </div>
    </div>
  );
}
