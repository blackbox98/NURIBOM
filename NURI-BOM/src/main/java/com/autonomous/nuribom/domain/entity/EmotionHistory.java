package com.autonomous.nuribom.domain.entity;

import com.autonomous.nuribom.domain.entity.type.Emotion;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class EmotionHistory extends EmotionHistoryDate {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "emotion_hisroty_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    // 오늘 기분
    @NotNull
    @Enumerated(EnumType.STRING)
    private Emotion emotion;

    // 기분 좋음
    @NotNull
    private int good;

    // 기분 보통
    @NotNull
    private int normal;

    // 기분 안좋음
    @NotNull
    private int bad;

    @Builder(builderMethodName = "createEmotionHistory")
    public EmotionHistory(User user) {
        this.emotion = Emotion.NORMAL;
        this.user = user;
        this.good = 0;
        this.normal = 0;
        this.bad = 0;
    }

    public void update(Emotion emotion, int good, int normal, int bad) {
        this.emotion = emotion;
        this.good = good;
        this.normal = normal;
        this.bad = bad;
    }
}
