package com.autonomous.nuribom.common.config.security.service;

import com.autonomous.nuribom.common.exception.NotFoundException;
import com.autonomous.nuribom.domain.entity.Worker;
import com.autonomous.nuribom.domain.repository.WorkerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class AuthService implements UserDetailsService {
    private final WorkerRepository workerRepository;

    @Override
    public UserDetails loadUserByUsername(String workerId) throws UsernameNotFoundException {
        Worker findWorker = workerRepository.findById(Long.valueOf(workerId)).orElseThrow(() -> new NotFoundException("WORKER_NOT_FOUND"));

        List<SimpleGrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority(String.valueOf(findWorker.getRole())));

        LoginWorkerDetails loginWorkerDetails = new LoginWorkerDetails(findWorker.getWorkerName(), authorities);
        loginWorkerDetails.setWorker(findWorker);

        return loginWorkerDetails;
    }
}
