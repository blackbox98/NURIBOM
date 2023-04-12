package com.autonomous.nuribom.domain.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class CareList {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "care_list_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "worker_id")
    private Worker worker;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @Builder(builderMethodName = "createCareList")
    public CareList(Worker worker, User user) {
        this.worker = worker;
        this.user = user;
    }
}
