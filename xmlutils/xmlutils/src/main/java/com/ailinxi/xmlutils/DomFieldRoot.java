package com.ailinxi.xmlutils;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * @author aiheng@jd.com
 * @date 2014年10月31日 上午11:46:23
 * @desc 此注解用来控制Root别名 或者  解析类中引用自定义类使用，主要用于xml2bean使用，解析xml中代表这个自定义类的属性转换赋值
 */
@Target(ElementType.FIELD)
@Retention(RetentionPolicy.RUNTIME)
public @interface DomFieldRoot
{
    Class<?> value();
}
