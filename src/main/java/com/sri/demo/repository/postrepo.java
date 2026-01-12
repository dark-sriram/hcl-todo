package com.sri.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sri.demo.entity.post;

public interface  postrepo extends JpaRepository<post, Integer>{
    
}
