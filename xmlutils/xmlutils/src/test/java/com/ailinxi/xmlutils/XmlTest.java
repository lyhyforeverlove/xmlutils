package com.ailinxi.xmlutils;

import java.util.ArrayList;
import java.util.List;

import com.google.gson.Gson;


public class XmlTest {


    public static void main(String[] args) {
                

//        String xmlS ="<?xml version='1.0' encoding='utf-8'?><result><timestamp></timestamp><param><mtgTitle></mtgTitle><mediaID></mediaID><oneOrMany></oneOrMany><whiteboardModule></whiteboardModule><maxVideoChannels></maxVideoChannels><docModule></docModule><interaction></interaction><isPublic></isPublic><videoModule></videoModule><endTime></endTime><maxAudioChannels></maxAudioChannels><mediaModule></mediaModule><screenModule></screenModule><userType></userType><startTime></startTime><backUrl></backUrl><nickName></nickName><authId></authId><recordModule></recordModule><userId></userId><autoRecord></autoRecord><userName></userName><docID></docID><meetingType></meetingType><mtgKey>456494f6d4saf</mtgKey><hostPwd></hostPwd></param><meetingNumber></meetingNumber><errorCode>0</errorCode><list><param><mtgTitle></mtgTitle><mediaID></mediaID><oneOrMany></oneOrMany><whiteboardModule></whiteboardModule><maxVideoChannels></maxVideoChannels><docModule></docModule><interaction></interaction><isPublic></isPublic><videoModule></videoModule><endTime></endTime><maxAudioChannels></maxAudioChannels><mediaModule></mediaModule><screenModule></screenModule><userType></userType><startTime></startTime><backUrl></backUrl><nickName></nickName><authId></authId><recordModule></recordModule><userId></userId><autoRecord></autoRecord><userName></userName><docID></docID><meetingType></meetingType><mtgKey>456494f6d4saf</mtgKey><hostPwd></hostPwd></param><param><mtgTitle></mtgTitle><mediaID></mediaID><oneOrMany></oneOrMany><whiteboardModule></whiteboardModule><maxVideoChannels></maxVideoChannels><docModule></docModule><interaction></interaction><isPublic></isPublic><videoModule></videoModule><endTime></endTime><maxAudioChannels></maxAudioChannels><mediaModule></mediaModule><screenModule></screenModule><userType></userType><startTime></startTime><backUrl></backUrl><nickName></nickName><authId></authId><recordModule></recordModule><userId></userId><autoRecord></autoRecord><userName></userName><docID></docID><meetingType></meetingType><mtgKey>fdsafdsafdsaf</mtgKey><hostPwd></hostPwd></param></list><password></password><url>fdsafewafewfdsafdsafe</url></result>";
//        MtgResultModel xmlToBean = XmlUtils.xmlToBean(xmlS, MtgResultModel.class);
//        
//        System.err.println("--->>>" + new Gson().toJson(xmlToBean));
        
//        各种model转换为xml，包括List<String>,List<MtgModel>等，不过任何类的属性中非基本类型都必须初始化实体。
        MtgResultModel resultModel = new MtgResultModel();
        resultModel.setErrorCode("0");
        MtgModel model = new MtgModel();
        model.setMtgKey("456494f6d4saf");
        resultModel.setUrl("fdsafewafewfdsafdsafe");
        resultModel.setMtgModel(model);
        List<MtgModel> models = new ArrayList<MtgModel>();
        MtgModel model2 = new MtgModel();
        model2.setMtgKey("fdsafdsafdsaf");
        models.add(model);
        models.add(model2);
        resultModel.setMtgModels(models);
        String result = XmlUtils.beanToXml(resultModel,"UTF-8",true,true,true);
        System.out.println(result);


    }

}
