package com.gabrielfu.cryptoportfoliotracker.tracking;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("api/v1/tracking")
public class TrackingController {
    @Autowired
    private TrackingService trackingService;

    @GetMapping
    public Map<String, Position> getAll() {
        return trackingService.getAll();
    }
}
