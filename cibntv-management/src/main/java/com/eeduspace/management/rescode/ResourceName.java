package com.eeduspace.management.rescode;

/**
 * Author: dingran
 * Date: 2015/10/21
 * Description:产品资源转换
 */
public enum ResourceName {

    MANAGER("Manager"),
    USER("User"),
    ROLE("Role"),
    PRODUCT("Product"),
    ENTERPRISE("Enterprise"),
    TOKEN("Token"),
    REFRESH_TOKEN("refreshToken"),
    AUTHORIZE("Authorize"),

    ;

    public final String name;

    ResourceName(String name){
        this.name = name;
    }

    @Override
    public String toString() {
        return name;
    }
}
