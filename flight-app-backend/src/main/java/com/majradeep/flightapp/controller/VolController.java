package com.majradeep.flightapp.controller;

import com.majradeep.flightapp.model.Vol;
import com.majradeep.flightapp.service.VolService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/vols")
@CrossOrigin(origins = "http://localhost:4200")
public class VolController {

    private final VolService volService;

    public VolController(VolService volService) {
        this.volService = volService;
    }

    
    @PostMapping
    public Vol addVol(@RequestBody @Valid Vol vol) {
        return volService.addVol(vol);
    }

    
    @PostMapping("/batch")
    public List<Vol> addVols(@RequestBody @Valid List<Vol> vols) {
        return volService.addVols(vols);
    }


    @GetMapping
    public List<Vol> searchVols(
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime dateDepart,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime dateArrivee,
            @RequestParam(required = false) String villeDepart,
            @RequestParam(required = false) String villeArrivee,
            @RequestParam(required = false) String tri
    ) {
        return volService.searchVols(dateDepart, dateArrivee, villeDepart, villeArrivee, tri);
    }

 
    @GetMapping("/{id}")
    public Vol getVolById(@PathVariable UUID id) {
        return volService.getVolById(id);
    }

   
    @DeleteMapping("/{id}")
    public void deleteVol(@PathVariable UUID id) {
        volService.deleteVol(id);
    }
}
