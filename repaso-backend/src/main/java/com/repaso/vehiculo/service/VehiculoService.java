package com.repaso.vehiculo.service;

import com.repaso.vehiculo.dto.VehiculoDTO;
import com.repaso.vehiculo.entity.Vehiculo;
import com.repaso.vehiculo.repository.VehiculoRepository;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class VehiculoService {

    @Autowired
    private VehiculoRepository vehiculoRepository;

    
    public List<VehiculoDTO> findAll() {
        return vehiculoRepository.findAll()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

   
    public List<VehiculoDTO> mostrarActivos() {
        return vehiculoRepository.findByEstadoTrueOrderByIdVehiculoDesc()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

   
    public VehiculoDTO crearVehiculo(VehiculoDTO dto) {
        Vehiculo vehiculo = convertToEntity(dto);
        Vehiculo guardado = vehiculoRepository.save(vehiculo);
        return convertToDTO(guardado);
    }

  
    public VehiculoDTO modificarVehiculo(Integer idVehiculo, VehiculoDTO dto) {
        Vehiculo vehiculo = vehiculoRepository.findById(idVehiculo)
                .orElseThrow(() -> new RuntimeException("El vehiculo no existe con id " + idVehiculo));

        vehiculo.setPlaca(dto.getPlaca());
        vehiculo.setMarca(dto.getMarca());
        vehiculo.setModelo(dto.getModelo());
        vehiculo.setColor(dto.getColor());
        vehiculo.setPrecioDia(dto.getPrecioDia());

        Vehiculo actualizado = vehiculoRepository.save(vehiculo);
        return convertToDTO(actualizado);
    }

   
    public VehiculoDTO anularVehiculo(Integer idVehiculo) {
        Vehiculo vehiculo = vehiculoRepository.findById(idVehiculo)
                .orElseThrow(() -> new RuntimeException("El vehiculo no existe con id " + idVehiculo));

        vehiculo.setEstado(false);
        Vehiculo anulado = vehiculoRepository.save(vehiculo);
        return convertToDTO(anulado);
    }

   
    private VehiculoDTO convertToDTO(Vehiculo v) {
        VehiculoDTO dto = new VehiculoDTO();
        dto.setIdVehiculo(v.getIdVehiculo());
        dto.setEstado(v.getEstado());
        dto.setPlaca(v.getPlaca());
        dto.setMarca(v.getMarca());
        dto.setModelo(v.getModelo());
        dto.setColor(v.getColor());
        dto.setPrecioDia(v.getPrecioDia());
        return dto;
    }

    private Vehiculo convertToEntity(VehiculoDTO dto) {
        Vehiculo vehiculo = new Vehiculo();
        vehiculo.setPlaca(dto.getPlaca());
        vehiculo.setMarca(dto.getMarca());
        vehiculo.setModelo(dto.getModelo());
        vehiculo.setColor(dto.getColor());
        vehiculo.setPrecioDia(dto.getPrecioDia());
        vehiculo.setEstado(true);
        return vehiculo;
    }

}
