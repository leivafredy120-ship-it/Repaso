import api from '../api/axios';
import type { MessageResponse, Vehiculo } from '../types/Vehiculo';

// GET /vehiculos/mostrarActivos
export const mostrarActivos = async (): Promise<Vehiculo[]> => {
  const response = await api.get<Vehiculo[]>('/vehiculos/mostrarActivos');
  return response.data;
};

// POST /vehiculos
export const guardarVehiculo = async (vehiculo: Vehiculo): Promise<MessageResponse> => {
  const response = await api.post<MessageResponse>('/vehiculos', vehiculo);
  return response.data;
};

// PUT /vehiculos/{idVehiculo}
export const modificarVehiculo = async (
  idVehiculo: number,
  vehiculo: Vehiculo,
): Promise<MessageResponse> => {
  const response = await api.put<MessageResponse>(`/vehiculos/${idVehiculo}`, vehiculo);
  return response.data;
};

// PUT /vehiculos/anular/{idVehiculo}
export const anularVehiculo = async (idVehiculo: number): Promise<MessageResponse> => {
  const response = await api.put<MessageResponse>(`/vehiculos/anular/${idVehiculo}`);
  return response.data;
};
