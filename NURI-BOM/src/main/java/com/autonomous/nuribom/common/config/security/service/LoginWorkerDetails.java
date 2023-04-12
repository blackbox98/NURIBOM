package com.autonomous.nuribom.common.config.security.service;

import com.autonomous.nuribom.domain.entity.Worker;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;

import java.util.Collection;

@Setter
@Getter
public class LoginWorkerDetails extends User {
    private Worker worker;

    public LoginWorkerDetails(String workerName, Collection<? extends GrantedAuthority> authorities) {
        super(workerName, "", authorities);
    }
}