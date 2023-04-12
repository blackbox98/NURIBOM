package com.autonomous.nuribom.domain.entity;

import com.autonomous.nuribom.domain.entity.type.IsRead;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class Notification extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "notification_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "worker_id")
    private Worker worker;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    // 알림 내용
    @NotNull
    private String contents;

    // 읽기 여부
    @NotNull
    @Enumerated(EnumType.STRING)
    private IsRead isRead;

    @Builder(builderMethodName = "createNotification")
    public Notification(Worker worker, User user, String contents) {
        this.worker = worker;
        this.user = user;
        this.contents = contents;
        this.isRead = IsRead.NOT_READ;
    }

    public void readNotification() {
        this.isRead = IsRead.READ;
    }
}
