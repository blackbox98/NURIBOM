package com.autonomous.nuribom.common.config.web;

import com.autonomous.nuribom.common.exception.NotMatchException;
import com.autonomous.nuribom.domain.entity.Worker;
import lombok.RequiredArgsConstructor;
import org.springframework.core.MethodParameter;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

@Component
@RequiredArgsConstructor
public class LoginWorkerArgumentResolver implements HandlerMethodArgumentResolver {

    @Override
    public boolean supportsParameter(MethodParameter parameter) {
        boolean isLoginWorkerAnnotation = parameter.getParameterAnnotation(LoginWorker.class) != null;
        boolean isLongClass = Worker.class.equals(parameter.getParameterType());
        return isLoginWorkerAnnotation && isLongClass;
    }

    @Override
    public Object resolveArgument(MethodParameter parameter,
                                  ModelAndViewContainer mavContainer,
                                  NativeWebRequest webRequest,
                                  WebDataBinderFactory binderFactory) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            return authentication.getPrincipal();
        } catch (ClassCastException e) {
            throw new NotMatchException("토큰 정보가 잘못되었습니다.");
        }
    }
}