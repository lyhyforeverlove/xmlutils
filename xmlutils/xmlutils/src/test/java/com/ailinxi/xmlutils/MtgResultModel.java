package com.ailinxi.xmlutils;

import java.util.ArrayList;
import java.util.List;


@DomRoot("result")
public class MtgResultModel {
    private String errorCode;
    private String meetingNumber;
    private String timestamp;
    private String url;
    private String password;
    private String param;
    @DomField("param")//转换别名使用，用于xml2bean和bean2xml里的<param>值的转换
    @DomFieldRoot(MtgModel.class)//解析类中引用自定义类使用，主要用于xml2bean使用，解析xml中代表这个自定义类的属性转换赋值
//    @DomFieldConvert(MtgModelConvert.class)
    private MtgModel mtgModel = new MtgModel();
    @DomField("list")
    @DomFieldRoot(MtgModel.class)
    private List<MtgModel> mtgModels = new ArrayList<MtgModel>();
    
    
    public static class MtgModelConvert implements DomConvert
    {

        @Override
        public MtgModel convert(Object object)
        {
            MtgModel model = (MtgModel)object;
            MtgModel d = new MtgModel();;
            d.setMtgKey(model.getMtgKey());
            return d;
        }
    }
    
    public String getErrorCode() {
        return errorCode;
    }
    
    public void setErrorCode(String errorCode) {
        this.errorCode = errorCode;
    }
    
    public String getMeetingNumber() {
        return meetingNumber;
    }
    
    public void setMeetingNumber(String meetingNumber) {
        this.meetingNumber = meetingNumber;
    }
    
    public String getTimestamp() {
        return timestamp;
    }
    
    public void setTimestamp(String timestamp) {
        this.timestamp = timestamp;
    }
    
    public String getUrl() {
        return url;
    }
    
    public void setUrl(String url) {
        this.url = url;
    }
    
    public String getPassword() {
        return password;
    }
    
    public void setPassword(String password) {
        this.password = password;
    }
    
    public String getParam() {
        return param;
    }

    public void setParam(String param) {
        this.param = param;
    }

    public MtgModel getMtgModel() {
        return mtgModel;
    }
    
    public void setMtgModel(MtgModel mtgModel) {
        this.mtgModel = mtgModel;
    }

    public List<MtgModel> getMtgModels() {
        return mtgModels;
    }
    
    public void setMtgModels(List<MtgModel> mtgModels) {
        this.mtgModels = mtgModels;
    }

    
   
}
