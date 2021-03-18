package com.kfzconfig.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Component;

import com.kfzconfig.entity.Users;
import com.kfzconfig.repository.UsersRepository;

@Component
public class UsersService {

	private UsersRepository usersRepository;

	public UsersService(UsersRepository usersRepository) {
		this.usersRepository = usersRepository;
	}

	public List<Users> getUsers() {
		return usersRepository.findAll();
	}

	public Users saveUser(Users users) {
		return usersRepository.save(users);
	}

	public void deleteUser(Long id) {
	usersRepository.deleteById(id.intValue());
	}

}
