package com.eeduspace.management.anntation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.FIELD)
public @interface Excel {
	//导出时的列名   导出排序跟定义了annotation的字段的顺序有关
	public String exportName();
	//导出时是否进行字段转换   例如 性别用int存储，导出时可能转换为男，女  
	//若是sign为true,则需要在pojo中加入一个方法 get字段名Convert()  
	//例如，字段isVip ，需要加入 public String getIsVipConvert()  返回值为string  
	//若是sign为false,则不必管  
	public boolean exportConvertSign() default false;  
}
