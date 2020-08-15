package com.ailinxi.dto;

import com.ailinxi.xmlutils.XmlUtils;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

/**
 * @author songwei
 * @date 2020-08-14
 */
@Setter
@Getter
@ToString
@NoArgsConstructor
@XmlRootElement(name = "Request")
public class TrustLoginDto {

    private static final String XML_HEAD = "<?xml version='1.0' encoding='UTF-8'?><Request>%s</Request>";


    /**
     * 登陆名，历史遗留字段，此字段传空即可
     */
    private String UserName;
    /**
     * 银行预留手机号，五要素登录模式必填，敏感字段加密
     */
    private String MobilePhone;
    /**
     * 客户姓名，五要素登录模式必填，敏感字段加密,机构上送企业名称
     */
    private String Name;
    /**
     * 证件类型（默认为00：身份证03-统一社会信用代码，04-营业执照），五要素登录模式必填
     */
    private String IdType;
    /**
     * 证件号，五要素登录模式必填，敏感字段加密，企业上送统一社会信用代码或者营业执照
     */
    private String IdNo;
    /**
     * 银行卡卡号列表，多个卡号用“|”分割，多个卡时必须属于同一银行。五要素登录模式必填，敏感字段加密
     */
    private String Accounts;
    /**
     * 银行卡对应的行号列表，多个用“|”分割，与卡号一一对应。
     */
    private String BankCodes;
    /**
     * 合作方客户唯一标识，单客户信任登录必填
     */
    private String UserId;
    /**
     * 被授权人证件类型（00-身份证）,企业机构登录必传
     */
    private String OperIdType;
    /**
     * 被授权人证件号码,企业机构登录必传,敏感字段加密
     */
    private String OperIdNo;
    /**
     * 被授权人手机号,企业机构登录必传,敏感字段加密
     */
    private String OperPhone;
    /**
     * 跳转页面
     * [0] 基金超市
     * [1] 资金宝首页
     * [2] 首页
     * [3] 基金/组合详情（需要传FundCode）
     * [4] 稳健理财
     * [5] 高端理财
     * [6] 基金搜索（仅H5）
     * [7] 我的自选（仅H5）
     * [8] 我的资产
     * [9] 交易查询
     * [10] 分红查询
     * [11] 个人中心
     * [12] 基金资产
     * [13] 宝类资产
     * [14] 高端资产
     * [15] 定投专区
     * [16] 我的定投计划
     * [17] 基金精选
     * [18] 风险评测
     * [19] 基金/组合买入订单页（需要传FundCode）
     * [20] 组合资产
     * [21] 指定页面（需要传URL）
     */
    private String Flag;
    /**
     * 基金/组合代码，当Flag=3或19时必填
     */
    private String FundCode;
    /**
     * 通联会员号，有就必输
     */
    private String AllinpayNo;
    /**
     * 时间戳，格式：yyyyMMddHHmmss
     */
    private String Timestamp;
    /**
     * 跳转的URL，当Flag=21时必填
     */
    private String URL;
    /**
     * 客户经理号
     */
    private String BrokerId;

    public String packageXmlFeild(){
        return XmlUtils.beanToXml(this,true,true,true);
    }

    public String packageFullModel(){
        return String.format(XML_HEAD,this.packageXmlFeild());
    }

    public static void main(String[] args) {
        TrustLoginDto dto = new TrustLoginDto();
        dto.setUserId("123456");
        dto.setFlag("1");
//        dto.setTimestamp(DateUtils.date2String(new Date(),DateUtils.PURE_DATETIME_PATTERN));
        System.err.println("xmlFeild--> " + dto.packageXmlFeild());
    }




}
