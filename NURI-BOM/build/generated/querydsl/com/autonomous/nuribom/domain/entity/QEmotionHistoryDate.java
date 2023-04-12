package com.autonomous.nuribom.domain.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;


/**
 * QEmotionHistoryDate is a Querydsl query type for EmotionHistoryDate
 */
@Generated("com.querydsl.codegen.DefaultSupertypeSerializer")
public class QEmotionHistoryDate extends EntityPathBase<EmotionHistoryDate> {

    private static final long serialVersionUID = -1674620699L;

    public static final QEmotionHistoryDate emotionHistoryDate1 = new QEmotionHistoryDate("emotionHistoryDate1");

    public final DateTimePath<java.time.LocalDateTime> emotionHistoryDate = createDateTime("emotionHistoryDate", java.time.LocalDateTime.class);

    public QEmotionHistoryDate(String variable) {
        super(EmotionHistoryDate.class, forVariable(variable));
    }

    public QEmotionHistoryDate(Path<? extends EmotionHistoryDate> path) {
        super(path.getType(), path.getMetadata());
    }

    public QEmotionHistoryDate(PathMetadata metadata) {
        super(EmotionHistoryDate.class, metadata);
    }

}

