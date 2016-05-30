package com.eeduspace.management.rescode;


import java.io.Serializable;
import java.util.Collection;
import java.util.Map;

/**
 * Author: dingran
 * Date: 2015/10/21
 * Description:返回类型
 */
public class ResponseItem implements Serializable {
    private static final long serialVersionUID = -31085742939234526L;

    private String code;
    private String message;
    private String httpCode;

    private java.lang.Long iTotalRecords;
    private java.lang.Long iTotalDisplayRecords;
    private java.lang.Object data;
    private java.util.Collection datas;

    public ResponseItem(){
        ResponseCode responseCode = ResponseCode.toEnum(ResponseCode.SUCCESS.toString());
        this.code = responseCode.toString();
        this.message = responseCode.message;
        this.httpCode = responseCode.httpCode;
    }


    public String getHttpCode() {
        return httpCode;
    }

    public void setHttpCode(String httpCode) {
        this.httpCode = httpCode;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public Collection getDatas() {
        return datas;
    }

    public void setDatas(Collection datas) {
        this.datas = datas;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }

    public Long getiTotalDisplayRecords() {
        return iTotalDisplayRecords;
    }

    public void setiTotalDisplayRecords(Long iTotalDisplayRecords) {
        this.iTotalDisplayRecords = iTotalDisplayRecords;
    }

    public Long getiTotalRecords() {
        return iTotalRecords;
    }

    public void setiTotalRecords(Long iTotalRecords) {
        this.iTotalRecords = iTotalRecords;
    }


/**
     * 设置分页信息
     * @param page
     */
/*    public void setPage(Page page){
        Map<String,Object> map =new HashMap<String, Object>();
        map.put("iTotalRecords",page.getTotalElements());
        map.put("list",page.getContent());
        map.put("iTotalDisplayRecords",page.getTotalElements());
        this.results.add(map);
    }*/
    /**
     * 设置分页信息
     */
    public void setPage(Map<String,Object> map){
        this.datas.add(map);
    }
    /**
     * 根据错误代码设置异常 并自定义消息
     * @param code
     * @param message
     * @return
     */
    public static <T> T setResponse(ResponseItem response,String code,String message){
        ResponseCode error = ResponseCode.toEnum(code);
        response.setCode(error.code);
        response.setHttpCode(error.httpCode);
        response.setMessage(error.message + message);
        return (T)response;
    }
    public  static <T> T  responseWithName(ResponseItem response,String code, Object msg){
        ResponseCode error = ResponseCode.toEnum(code);
        response.setCode(error.code);
        response.setHttpCode(error.httpCode);
        response.setMessage(msg.toString());
        return (T)response;
    }
    public  static <T> T  responseWithName(ResponseItem response,String code){
        ResponseCode error = ResponseCode.toEnum(code);
        response.setCode(error.code);
        response.setHttpCode(error.httpCode);
        response.setMessage(error.message);
        return (T)response;
    }

}
