package com.autonomous.nuribom.domain.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QUser is a Querydsl query type for User
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QUser extends EntityPathBase<User> {

    private static final long serialVersionUID = -1569027543L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QUser user = new QUser("user");

    public final ListPath<ActSuggest, QActSuggest> actSuggests = this.<ActSuggest, QActSuggest>createList("actSuggests", ActSuggest.class, QActSuggest.class, PathInits.DIRECT2);

    public final QCareList careList;

    public final ListPath<EmotionHistory, QEmotionHistory> emotionHistories = this.<EmotionHistory, QEmotionHistory>createList("emotionHistories", EmotionHistory.class, QEmotionHistory.class, PathInits.DIRECT2);

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final DateTimePath<java.time.LocalDateTime> lastVisit = createDateTime("lastVisit", java.time.LocalDateTime.class);

    public final ListPath<Medication, QMedication> medications = this.<Medication, QMedication>createList("medications", Medication.class, QMedication.class, PathInits.DIRECT2);

    public final ListPath<Notification, QNotification> notifications = this.<Notification, QNotification>createList("notifications", Notification.class, QNotification.class, PathInits.DIRECT2);

    public final EnumPath<com.autonomous.nuribom.domain.entity.type.Role> role = createEnum("role", com.autonomous.nuribom.domain.entity.type.Role.class);

    public final StringPath serialNo = createString("serialNo");

    public final StringPath userAddress = createString("userAddress");

    public final StringPath userBirthDate = createString("userBirthDate");

    public final StringPath userBirthMonth = createString("userBirthMonth");

    public final StringPath userBirthYear = createString("userBirthYear");

    public final StringPath userName = createString("userName");

    public final StringPath userProfileImg = createString("userProfileImg");

    public final ListPath<Visit, QVisit> visits = this.<Visit, QVisit>createList("visits", Visit.class, QVisit.class, PathInits.DIRECT2);

    public QUser(String variable) {
        this(User.class, forVariable(variable), INITS);
    }

    public QUser(Path<? extends User> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QUser(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QUser(PathMetadata metadata, PathInits inits) {
        this(User.class, metadata, inits);
    }

    public QUser(Class<? extends User> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.careList = inits.isInitialized("careList") ? new QCareList(forProperty("careList"), inits.get("careList")) : null;
    }

}

