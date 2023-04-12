package com.autonomous.nuribom.domain.entity;

import com.autonomous.nuribom.domain.entity.type.IsVisited;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class Visit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "visit_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "worker_id")
    private Worker worker;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    // 방문 일자
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm", timezone = "Asia/Seoul")
    private LocalDateTime visitDate;

    // 방문 내용
    private String contents;

    // 방문 여부
    @NotNull
    @Enumerated(EnumType.STRING)
    private IsVisited isVisited;

    @Builder(builderMethodName = "createVisit")
    public Visit(Worker worker, User user, LocalDateTime visitDate, String contents) {
        this.worker = worker;
        this.user = user;
        this.visitDate = visitDate;
        this.contents = contents;
        this.isVisited = IsVisited.UNVISITED;
    }

    public void update(LocalDateTime visitDate, String contents) {
        this.visitDate = visitDate;
        this.contents = contents;
    }

    public void visitUser() {
        this.isVisited = IsVisited.VISITED;
    }
}
