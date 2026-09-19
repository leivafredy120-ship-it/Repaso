export interface Vehiculo {
  idVehiculo?: number;
  estado?: boolean;
  placa: string;
  marca: string;
  modelo: string;
  color: string;
  precioDia: number;
}

export interface MessageResponse {
  mensaje: string;
}

// Estado del formulario controlado: precioDia se maneja como texto
// mientras el usuario escribe y se convierte a numero antes de enviarlo.
export interface VehiculoFormState {
  idVehiculo?: number;
  placa: string;
  marca: string;
  modelo: string;
  color: string;
  precioDia: string;
}

export const vehiculoFormInicial: VehiculoFormState = {
  placa: '',
  marca: '',
  modelo: '',
  color: '',
  precioDia: '',
};
