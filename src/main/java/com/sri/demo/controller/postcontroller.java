package com.sri.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sri.demo.entity.post;
import com.sri.demo.service.postservice;

@RestController
@RequestMapping("/todo")
public class postcontroller {

    @Autowired
    private postservice service;

    @PostMapping("/add")
    public String addDetails(@RequestBody post s) {
        return service.addDetails(s);
    }

    @GetMapping("/get")
    public List<post> getDetails() {
        return service.getDetails();
    }

    @DeleteMapping("/del/{id}")
    public String deletepost(@PathVariable Integer id){
        return service.deletepost(id);
    }

    @PutMapping("/put/{id}")
    public post updatepost(@PathVariable Integer id,@RequestBody post s) {
        return service.updatepost(id, s);
    }
}
