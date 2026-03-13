package com.loanzy.user_service.controller;

import com.loanzy.user_service.entity.User;
import com.loanzy.user_service.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    private final UserRepository userRepository;

    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userRepository.findAll();
        users.forEach(u -> u.setPassword(null));
        return ResponseEntity.ok(users);
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        return userRepository.findById(id)
                .map(user -> {
                    user.setPassword(null);
                    return ResponseEntity.ok(user);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User userDetails) {
        return userRepository.findById(id)
                .map(user -> {
                    if (userDetails.getPhone() != null)
                        user.setPhone(userDetails.getPhone());
                    if (userDetails.getAddress() != null)
                        user.setAddress(userDetails.getAddress());
                    if (userDetails.getAnnualIncome() != null)
                        user.setAnnualIncome(userDetails.getAnnualIncome());
                    if (userDetails.getEmploymentType() != null)
                        user.setEmploymentType(userDetails.getEmploymentType());

                    User updatedUser = userRepository.save(user);
                    updatedUser.setPassword(null);
                    return ResponseEntity.ok(updatedUser);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}
