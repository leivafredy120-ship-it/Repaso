package com.repaso.vehiculo.repository;

import com.repaso.vehiculo.entity.Vehiculo;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VehiculoRepository extends JpaRepository<Vehiculo, Integer> {

    List<Vehiculo> findByEstadoTrueOrderByIdVehiculoDesc();

}
