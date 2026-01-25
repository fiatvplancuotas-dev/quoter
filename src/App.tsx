import { useState } from 'react'
import './App.css'
import vehiculosData from './data/vehiculos.json'
import fiatLogo from './assets/fiat-logo-rojo-w.png'

type MetodoPago = 'tarjeta_credito' | 'cbu'

interface Vehiculo {
  tarjeta_credito: number
  cbu: number
}

function App() {
  const [vehiculoSeleccionado, setVehiculoSeleccionado] = useState<string>('')
  const [dni, setDni] = useState<string>('')
  const [metodoPago, setMetodoPago] = useState<MetodoPago>('tarjeta_credito')
  const [loading, setLoading] = useState<boolean>(false)
  const [resultado, setResultado] = useState<number | null>(null)

  const vehiculos = vehiculosData as Record<string, Vehiculo>

  const handleCalcular = () => {
    if (!vehiculoSeleccionado || !dni) {
      alert('Por favor seleccione un vehículo e ingrese el DNI')
      return
    }

    window.scrollTo({ top: 0, behavior: 'smooth' })
    setLoading(true)
    setResultado(null)

    setTimeout(() => {
      const precio = vehiculos[vehiculoSeleccionado][metodoPago]
      setResultado(precio)
      setLoading(false)
    }, 7000)
  }

  const handleReset = () => {
    setVehiculoSeleccionado('')
    setDni('')
    setMetodoPago('tarjeta_credito')
    setResultado(null)
  }

  return (
    <div className="app-container">
      <header className="header">
        <div className="logo-fiat">
          <img src={fiatLogo} alt="FIAT Logo" className="logo-fiat-img" />
        </div>
      </header>

      <div className="content-container">
        {loading ? (
          <div className="loading-container">
            <div className="spinner"></div>
            <p className="loading-text">Calculando tu cotización...</p>
          </div>
        ) : resultado !== null ? (
          <div className="resultado-container">
            <div className="resultado-card">
              <h2 className="resultado-title">¡Tu Oferta Especial!</h2>
              <div className="resultado-vehiculo">{vehiculoSeleccionado}</div>
              <div className="resultado-precio">
                <span className="precio-label">Primera Cuota</span>
                <span className="precio-valor">
                  ${resultado.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
              <div className="resultado-metodo">
                Método: {metodoPago === 'tarjeta_credito' ? 'Tarjeta de Crédito' : 'CBU'}
              </div>
              <button className="btn-reset" onClick={handleReset}>
                Nueva Cotización
              </button>
            </div>
          </div>
        ) : (
          <>
            <h1 className="title">Cotizador</h1>

            <div className="section">
              <h2 className="section-title">Selecciona tu vehículo</h2>
              <div className="vehiculos-grid">
                {Object.keys(vehiculos).map((vehiculo) => (
                  <div
                    key={vehiculo}
                    className={`vehiculo-card ${vehiculoSeleccionado === vehiculo ? 'selected' : ''}`}
                    onClick={() => setVehiculoSeleccionado(vehiculo)}
                  >
                    <div className="vehiculo-name">{vehiculo}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="section">
              <h2 className="section-title">DNI del Cliente</h2>
              <input
                type="text"
                className="dni-input"
                placeholder="Ingrese DNI"
                value={dni}
                onChange={(e) => setDni(e.target.value.replace(/\D/g, ''))}
                maxLength={8}
              />
            </div>

            <div className="section">
              <h2 className="section-title">Método de Pago</h2>
              <div className="metodo-pago-container">
                <span className={metodoPago === 'cbu' ? 'active' : ''}>CBU</span>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={metodoPago === 'tarjeta_credito'}
                    onChange={() => setMetodoPago(metodoPago === 'tarjeta_credito' ? 'cbu' : 'tarjeta_credito')}
                  />
                  <span className="slider"></span>
                </label>
                <span className={metodoPago === 'tarjeta_credito' ? 'active' : ''}>Tarjeta de Crédito</span>
              </div>
            </div>

            <button className="btn-calcular" onClick={handleCalcular}>
              Calcular Cotización
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default App
