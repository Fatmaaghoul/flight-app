package com.majradeep.flightapp.service;

import com.majradeep.flightapp.model.Vol;
import com.majradeep.flightapp.repository.VolRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class VolService {

    private final VolRepository volRepository;

    public VolService(VolRepository volRepository) {
        this.volRepository = volRepository;
    }

   
    public Vol addVol(Vol vol) {
       
        if (vol.getPlacesDisponibles() > vol.getCapacite()) {
            throw new RuntimeException("Les places disponibles ne peuvent pas dépasser la capacité du vol");
        }
        return volRepository.save(vol);
    }

   
    public List<Vol> addVols(List<Vol> vols) {
        vols.forEach(v -> {
            if (v.getPlacesDisponibles() > v.getCapacite()) {
                throw new RuntimeException("Les places disponibles ne peuvent pas dépasser la capacité du vol : " + v.getVilleDepart() + " -> " + v.getVilleArrivee());
            }
        });
        return volRepository.saveAll(vols);
    }

    
    public List<Vol> getAllVols() {
        return volRepository.findAll();
    }

    
    public void deleteVol(UUID id) {
        if (!volRepository.existsById(id)) {
            throw new RuntimeException("Impossible de supprimer : vol introuvable avec l'ID " + id);
        }
        volRepository.deleteById(id);
    }

    
    public List<Vol> searchVols(
            LocalDateTime dateDepart,
            LocalDateTime dateArrivee,
            String villeDepart,
            String villeArrivee,
            String tri
    ) {
        List<Vol> vols = volRepository.findAll();

        return vols.stream()
                .filter(v -> dateDepart == null || !v.getDateDepart().isBefore(dateDepart))
                .filter(v -> dateArrivee == null || !v.getDateArrivee().isAfter(dateArrivee))
                .filter(v -> villeDepart == null || v.getVilleDepart().equalsIgnoreCase(villeDepart))
                .filter(v -> villeArrivee == null || v.getVilleArrivee().equalsIgnoreCase(villeArrivee))
                .sorted((v1, v2) -> {
                    if ("prix".equalsIgnoreCase(tri)) {
                        return Double.compare(v1.getPrix(), v2.getPrix());
                    } else if ("temps".equalsIgnoreCase(tri)) {
                        return Integer.compare(v1.getTempsTrajet(), v2.getTempsTrajet());
                    }
                    return 0; 
                })
                .collect(Collectors.toList());
    }

    
    public Vol getVolById(UUID id) {
        return volRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Vol introuvable avec l'ID : " + id));
    }
}
