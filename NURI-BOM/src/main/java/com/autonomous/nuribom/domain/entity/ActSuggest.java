package com.autonomous.nuribom.domain.entity;

import com.autonomous.nuribom.domain.entity.type.Activity;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class ActSuggest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "act_suggest_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    // 활동 종류
    @NotNull
    @Enumerated(EnumType.STRING)
    private Activity activity;

    // 활동 시간 (시)
    @NotNull
    @Column(length = 2)
    private String activity_hour;

    // 활동 시간 (분)
    @NotNull
    @Column(length = 2)
    private String activity_minutes;

    @Builder(builderMethodName = "createActSuggest")
    public ActSuggest(User user, Activity activity, String activity_hour, String activity_minutes) {
        this.user = user;
        this.activity = activity;
        this.activity_hour = activity_hour;
        this.activity_minutes = activity_minutes;
    }

    public void update(Activity activity, String activity_hour, String activity_minutes) {
        this.activity = activity;
        this.activity_hour = activity_hour;
        this.activity_minutes = activity_minutes;
    }
}
