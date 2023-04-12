package com.autonomous.nuribom.domain.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QCareList is a Querydsl query type for CareList
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QCareList extends EntityPathBase<CareList> {

    private static final long serialVersionUID = 2147348141L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QCareList careList = new QCareList("careList");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final QUser user;

    public final QWorker worker;

    public QCareList(String variable) {
        this(CareList.class, forVariable(variable), INITS);
    }

    public QCareList(Path<? extends CareList> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QCareList(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QCareList(PathMetadata metadata, PathInits inits) {
        this(CareList.class, metadata, inits);
    }

    public QCareList(Class<? extends CareList> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.user = inits.isInitialized("user") ? new QUser(forProperty("user"), inits.get("user")) : null;
        this.worker = inits.isInitialized("worker") ? new QWorker(forProperty("worker")) : null;
    }

}

