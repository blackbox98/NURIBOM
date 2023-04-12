package com.autonomous.nuribom.domain.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QActSuggest is a Querydsl query type for ActSuggest
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QActSuggest extends EntityPathBase<ActSuggest> {

    private static final long serialVersionUID = 362415728L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QActSuggest actSuggest = new QActSuggest("actSuggest");

    public final EnumPath<com.autonomous.nuribom.domain.entity.type.Activity> activity = createEnum("activity", com.autonomous.nuribom.domain.entity.type.Activity.class);

    public final StringPath activity_hour = createString("activity_hour");

    public final StringPath activity_minutes = createString("activity_minutes");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final QUser user;

    public QActSuggest(String variable) {
        this(ActSuggest.class, forVariable(variable), INITS);
    }

    public QActSuggest(Path<? extends ActSuggest> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QActSuggest(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QActSuggest(PathMetadata metadata, PathInits inits) {
        this(ActSuggest.class, metadata, inits);
    }

    public QActSuggest(Class<? extends ActSuggest> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.user = inits.isInitialized("user") ? new QUser(forProperty("user"), inits.get("user")) : null;
    }

}

