package com.autonomous.nuribom.domain.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QEmotionHistory is a Querydsl query type for EmotionHistory
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QEmotionHistory extends EntityPathBase<EmotionHistory> {

    private static final long serialVersionUID = -305721193L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QEmotionHistory emotionHistory = new QEmotionHistory("emotionHistory");

    public final QEmotionHistoryDate _super = new QEmotionHistoryDate(this);

    public final NumberPath<Integer> bad = createNumber("bad", Integer.class);

    public final EnumPath<com.autonomous.nuribom.domain.entity.type.Emotion> emotion = createEnum("emotion", com.autonomous.nuribom.domain.entity.type.Emotion.class);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> emotionHistoryDate = _super.emotionHistoryDate;

    public final NumberPath<Integer> good = createNumber("good", Integer.class);

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final NumberPath<Integer> normal = createNumber("normal", Integer.class);

    public final QUser user;

    public QEmotionHistory(String variable) {
        this(EmotionHistory.class, forVariable(variable), INITS);
    }

    public QEmotionHistory(Path<? extends EmotionHistory> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QEmotionHistory(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QEmotionHistory(PathMetadata metadata, PathInits inits) {
        this(EmotionHistory.class, metadata, inits);
    }

    public QEmotionHistory(Class<? extends EmotionHistory> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.user = inits.isInitialized("user") ? new QUser(forProperty("user"), inits.get("user")) : null;
    }

}

