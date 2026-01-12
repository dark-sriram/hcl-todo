package com.sri.demo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sri.demo.entity.post;
import com.sri.demo.repository.postrepo;

@Service
public class postservice {
    

    @Autowired
    private postrepo repo;

        public String addDetails(post s) {
        repo.save(s);
        return "Post added";
    }

    public List<post> getDetails() {
        return repo.findAll();
    }

    public String deletepost(Integer id){
        if (repo.existsById(id)) {
            repo.deleteById(id);
            return "Post deleted";
        } else {
            return "Post not found";
        }
    }

    public Optional<post> findById(int id) {
        return repo.findById(id);
    }

    public post updatepost(Integer id, post updatedPost) {
        post existingPost = repo.findById(id).orElseThrow(() -> new RuntimeException("Post not found"));

        existingPost.setPostname(updatedPost.getPostname());
        existingPost.setDescription(updatedPost.getDescription());

        return repo.save(existingPost);
    }

}
