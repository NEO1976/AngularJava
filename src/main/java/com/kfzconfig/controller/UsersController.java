package com.kfzconfig.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kfzconfig.entity.Users;
import com.kfzconfig.links.UserLinks;
import com.kfzconfig.repository.UsersRepository;
import com.kfzconfig.service.UsersService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api/")
public class UsersController {
	
	@Autowired
	UsersRepository usersRepository;
	
	@GetMapping(path = UserLinks.LIST_USERS)
    public ResponseEntity<?> listUsers() {
        log.info("UsersController:  list users");
//        List<Users> resource = usersService.getUsers();
        List<Users> resource = usersRepository.findAll();
        return ResponseEntity.ok(resource);
    }
	
	@PostMapping(path = UserLinks.ADD_USER)
	public ResponseEntity<?> saveUser(@RequestBody Users user) {
        log.info("UsersController:  list users");
       // Users resource = usersService.saveUser(user);
        Users resource = usersRepository.save(user);
        return ResponseEntity.ok(resource);
    }
	
	@DeleteMapping(path = UserLinks.DELETE_USER + "{id}")
	public void deleteUser(@PathVariable("id") Long id) {
        log.info("UsersController:  list users");
        usersRepository.deleteById(id.intValue());
        //usersService.deleteUser(id);
    }
	
	@GetMapping(path= UserLinks.GET_USER + "{id}")
	public Optional<Users> getSelectedUser(@PathVariable("id") Long id) {
		log.info("UsersController: get selected user");
		return usersRepository.findById(id.intValue());
	}
}
