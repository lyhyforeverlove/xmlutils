package com.eeduspace.management.rescode;

/**
 * Author: dingran
 * Date: 2015/10/21
 * Description:参数转换
 */
public enum ParamName {


    TIMESTAMP("timestamp"),
    BODY_MD5("bodyMD5"),
    ACCESS_KEY("accessKey"),
    SIGNATURE("signature"),
    NAME("name"),
    EMAIL("email"),
    PHONE("phone"),
    TOKEN("token"),
    OPENID("openId"),
    STATUS("status"),
    PASSWORD("password"),
    OLD_PASSWORD("oldPassword"),
    USER_TYPE("userType"),
    PAGE_NO("pageNo"),
    PAGE_SIZE("pageSize"),
    ROLE_TYPE("roleType"),
    PRODUCT_TYPE("product_type"),
    ROLE_ID("roleId"),
    PRODUCT_ID("productId"),
    TYPE("type"),
    IS_MANY_EQUIPMENT_LOGIN("isManyEquipmentLogin"),
    ENTERPRISE_ID("enterpriseId"),
    CODE("code"),
    EQUIPMENT_TYPE("equipmentType"),
    REDIRECT_URI("redirectUri"),


    ACTION("action"),

    ACTIVE("active"),
    ACTIVE_OR_SHUTOFF("active_or_shutoff"),
    SHUTOFF("shutoff"),
    REBOOT("reboot"),
    ERROR("error"),
    KEY("key")
    ;


    public final String name;

    ParamName(String name){
        this.name = name;
    }


    @Override
    public String toString() {
        return name;
    }
}
