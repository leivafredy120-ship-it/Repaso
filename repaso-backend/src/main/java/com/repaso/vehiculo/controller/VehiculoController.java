package com.repaso.vehiculo.controller;

import com.repaso.vehiculo.dto.MessageResponse;
import com.repaso.vehiculo.dto.VehiculoDTO;
import com.repaso.vehiculo.service.VehiculoService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/vehiculos")
@CrossOrigin(origins = "*")
public class VehiculoController {

    @Autowired
    private VehiculoService vehiculoService;


    @GetMapping
    public List<VehiculoDTO> getAllVehiculos() {
        return vehiculoService.findAll();
    }

   
    @GetMapping("/mostrarActivos")
    public List<VehiculoDTO> mostrarActivos() {
        return vehiculoService.mostrarActivos();
    }

    @PostMapping
    public ResponseEntity<MessageResponse> crearVehiculo(@RequestBody VehiculoDTO vehiculoDTO) {
        try {
            vehiculoService.crearVehiculo(vehiculoDTO);
            return ResponseEntity.ok(new MessageResponse("Vehiculo creado con exito"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new MessageResponse("Error al crear el vehiculo"));
        }
    }

   
    @PutMapping("/{idVehiculo}")
    public ResponseEntity<MessageResponse> actualizarVehiculo(@PathVariable Integer idVehiculo,
                                                               @RequestBody VehiculoDTO vehiculoDTO) {
        try {
            vehiculoService.modificarVehiculo(idVehiculo, vehiculoDTO);
            return ResponseEntity.ok(new MessageResponse("Vehiculo actualizado con exito"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new MessageResponse("Error al actualizar el vehiculo"));
        }
    }


    @PutMapping("/anular/{idVehiculo}")
    public ResponseEntity<MessageResponse> anularVehiculo(@PathVariable Integer idVehiculo) {
        try {
            vehiculoService.anularVehiculo(idVehiculo);
            return ResponseEntity.ok(new MessageResponse("Vehiculo anulado con exito"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new MessageResponse("Error al anular el vehiculo"));
        }
    }

}
