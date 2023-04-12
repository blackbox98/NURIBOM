package com.autonomous.nuribom.domain.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QMedication is a Querydsl query type for Medication
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QMedication extends EntityPathBase<Medication> {

    private static final long serialVersionUID = -1606112595L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QMedication medication = new QMedication("medication");

    public final BooleanPath fri = createBoolean("fri");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final StringPath medication_hour = createString("medication_hour");

    public final StringPath medication_minutes = createString("medication_minutes");

    public final StringPath medicine = createString("medicine");

    public final BooleanPath mon = createBoolean("mon");

    public final BooleanPath sat = createBoolean("sat");

    public final BooleanPath sun = createBoolean("sun");

    public final BooleanPath thu = createBoolean("thu");

    public final BooleanPath tue = createBoolean("tue");

    public final QUser user;

    public final BooleanPath wed = createBoolean("wed");

    public QMedication(String variable) {
        this(Medication.class, forVariable(variable), INITS);
    }

    public QMedication(Path<? extends Medication> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QMedication(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QMedication(PathMetadata metadata, PathInits inits) {
        this(Medication.class, metadata, inits);
    }

    public QMedication(Class<? extends Medication> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.user = inits.isInitialized("user") ? new QUser(forProperty("user"), inits.get("user")) : null;
    }

}

