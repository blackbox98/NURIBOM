package com.autonomous.nuribom.domain.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QWorker is a Querydsl query type for Worker
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QWorker extends EntityPathBase<Worker> {

    private static final long serialVersionUID = -247999908L;

    public static final QWorker worker = new QWorker("worker");

    public final ListPath<CareList, QCareList> careLists = this.<CareList, QCareList>createList("careLists", CareList.class, QCareList.class, PathInits.DIRECT2);

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final ListPath<Notification, QNotification> notifications = this.<Notification, QNotification>createList("notifications", Notification.class, QNotification.class, PathInits.DIRECT2);

    public final EnumPath<com.autonomous.nuribom.domain.entity.type.Role> role = createEnum("role", com.autonomous.nuribom.domain.entity.type.Role.class);

    public final ListPath<Visit, QVisit> visits = this.<Visit, QVisit>createList("visits", Visit.class, QVisit.class, PathInits.DIRECT2);

    public final StringPath workerName = createString("workerName");

    public final StringPath workerPhone = createString("workerPhone");

    public final StringPath workerProfileImg = createString("workerProfileImg");

    public final StringPath workerWebId = createString("workerWebId");

    public final StringPath workerWebPwd = createString("workerWebPwd");

    public QWorker(String variable) {
        super(Worker.class, forVariable(variable));
    }

    public QWorker(Path<? extends Worker> path) {
        super(path.getType(), path.getMetadata());
    }

    public QWorker(PathMetadata metadata) {
        super(Worker.class, metadata);
    }

}

