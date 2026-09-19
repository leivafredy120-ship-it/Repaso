import { useEffect, useState } from 'react';
import type { Vehiculo, VehiculoFormState } from '../types/Vehiculo';
import { vehiculoFormInicial } from '../types/Vehiculo';
import {
  anularVehiculo,
  guardarVehiculo,
  modificarVehiculo,
  mostrarActivos,
} from '../services/vehiculoService';
import './VehiculosPage.css';

// Encabezado del catedratico
const NOMBRE_ALUMNO = 'Fredy Lopez';
const CARNET_ALUMNO = '96';

function VehiculosPage() {
  const [vehiculos, setVehiculos] = useState<Vehiculo[]>([]);
  const [form, setForm] = useState<VehiculoFormState>(vehiculoFormInicial);
  const [modoEdicion, setModoEdicion] = useState<boolean>(false);
  const [mensaje, setMensaje] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [cargando, setCargando] = useState<boolean>(false);

  const cargarVehiculos = async () => {
    try {
      setCargando(true);
      const datos = await mostrarActivos();
      setVehiculos(datos);
    } catch (err) {
      console.error(err);
      setError('No se pudo cargar el listado de vehiculos.');
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarVehiculos();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const limpiarFormulario = () => {
    setForm(vehiculoFormInicial);
    setModoEdicion(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMensaje('');
    setError('');

    // precioDia llega como texto del input; se convierte a numero antes de enviarlo.
    const precioDiaNumerico = parseFloat(form.precioDia);

    if (isNaN(precioDiaNumerico)) {
      setError('El precio por dia debe ser un numero valido.');
      return;
    }

    const vehiculoAEnviar: Vehiculo = {
      placa: form.placa,
      marca: form.marca,
      modelo: form.modelo,
      color: form.color,
      precioDia: precioDiaNumerico,
    };

    try {
      if (modoEdicion && form.idVehiculo) {
        const respuesta = await modificarVehiculo(form.idVehiculo, vehiculoAEnviar);
        setMensaje(respuesta.mensaje);
      } else {
        const respuesta = await guardarVehiculo(vehiculoAEnviar);
        setMensaje(respuesta.mensaje);
      }
      limpiarFormulario();
      await cargarVehiculos();
    } catch (err) {
      console.error(err);
      setError(
        modoEdicion ? 'Error al actualizar el vehiculo.' : 'Error al crear el vehiculo.',
      );
    }
  };

  const handleModificar = (vehiculo: Vehiculo) => {
    setModoEdicion(true);
    setMensaje('');
    setError('');
    setForm({
      idVehiculo: vehiculo.idVehiculo,
      placa: vehiculo.placa,
      marca: vehiculo.marca,
      modelo: vehiculo.modelo,
      color: vehiculo.color,
      precioDia: String(vehiculo.precioDia),
    });
  };

  const handleAnular = async (idVehiculo?: number) => {
    if (!idVehiculo) return;

    const confirmado = window.confirm(
      '¿Esta seguro que desea anular este vehiculo? El registro no se eliminara de la base de datos.',
    );
    if (!confirmado) return;

    setMensaje('');
    setError('');

    try {
      const respuesta = await anularVehiculo(idVehiculo);
      setMensaje(respuesta.mensaje);
      await cargarVehiculos();
    } catch (err) {
      console.error(err);
      setError('Error al anular el vehiculo.');
    }
  };

  return (
    <div className="contenedor">
      <header className="encabezado">
        <h1>Repaso Programacion II - Vehiculos</h1>
        <p>
          {NOMBRE_ALUMNO} &mdash; Carne: {CARNET_ALUMNO}
        </p>
      </header>

      <section className="tarjeta">
        <h2>{modoEdicion ? 'Modificar vehiculo' : 'Nuevo vehiculo'}</h2>
        <form className="formulario" onSubmit={handleSubmit}>
          <div className="campo">
            <label htmlFor="placa">Placa</label>
            <input
              id="placa"
              name="placa"
              value={form.placa}
              onChange={handleChange}
              required
              maxLength={10}
            />
          </div>

          <div className="campo">
            <label htmlFor="marca">Marca</label>
            <input
              id="marca"
              name="marca"
              value={form.marca}
              onChange={handleChange}
              required
              maxLength={50}
            />
          </div>

          <div className="campo">
            <label htmlFor="modelo">Modelo</label>
            <input
              id="modelo"
              name="modelo"
              value={form.modelo}
              onChange={handleChange}
              maxLength={50}
            />
          </div>

          <div className="campo">
            <label htmlFor="color">Color</label>
            <input
              id="color"
              name="color"
              value={form.color}
              onChange={handleChange}
              maxLength={30}
            />
          </div>

          <div className="campo">
            <label htmlFor="precioDia">Precio por dia (Q)</label>
            <input
              id="precioDia"
              name="precioDia"
              type="number"
              step="0.01"
              min="0"
              value={form.precioDia}
              onChange={handleChange}
              required
            />
          </div>

          <div className="acciones-formulario">
            <button type="submit" className="boton boton-primario">
              {modoEdicion ? 'Guardar cambios' : 'Guardar'}
            </button>
            {modoEdicion && (
              <button type="button" className="boton boton-secundario" onClick={limpiarFormulario}>
                Cancelar
              </button>
            )}
          </div>
        </form>

        {mensaje && <p className="mensaje mensaje-exito">{mensaje}</p>}
        {error && <p className="mensaje mensaje-error">{error}</p>}
      </section>

      <section className="tarjeta">
        <h2>Listado de vehiculos activos</h2>
        {cargando ? (
          <p>Cargando...</p>
        ) : (
          <table className="tabla">
            <thead>
              <tr>
                <th>ID</th>
                <th>Placa</th>
                <th>Marca</th>
                <th>Modelo</th>
                <th>Color</th>
                <th>Precio/dia</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {vehiculos.length === 0 ? (
                <tr>
                  <td colSpan={7} className="tabla-vacia">
                    No hay vehiculos activos registrados.
                  </td>
                </tr>
              ) : (
                vehiculos.map((v) => (
                  <tr key={v.idVehiculo}>
                    <td>{v.idVehiculo}</td>
                    <td>{v.placa}</td>
                    <td>{v.marca}</td>
                    <td>{v.modelo}</td>
                    <td>{v.color}</td>
                    <td>Q{v.precioDia.toFixed(2)}</td>
                    <td className="acciones-tabla">
                      <button className="boton boton-editar" onClick={() => handleModificar(v)}>
                        Modificar
                      </button>
                      <button
                        className="boton boton-anular"
                        onClick={() => handleAnular(v.idVehiculo)}
                      >
                        Anular
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}

export default VehiculosPage;
