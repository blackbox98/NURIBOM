package com.autonomous.nuribom.domain.repository;

import com.autonomous.nuribom.domain.entity.ActSuggest;
import com.autonomous.nuribom.domain.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ActSuggestRepository extends JpaRepository<ActSuggest, Long> {
    List<ActSuggest> findByUser(User user);
}
