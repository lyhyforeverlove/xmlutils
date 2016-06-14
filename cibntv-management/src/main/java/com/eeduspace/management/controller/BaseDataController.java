package com.eeduspace.management.controller;

import java.util.List;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttributes;

import com.eeduspace.management.client.BaseDataClient;
import com.eeduspace.management.comm.Constants;
import com.eeduspace.management.model.BaseData;
import com.eeduspace.management.model.BaseDataModel;
import com.eeduspace.management.rescode.ResponseCode;
import com.eeduspace.management.rescode.ResponseItem;
import com.google.gson.Gson;
import com.google.gson.JsonSyntaxException;

/**
 * @author songwei
 *	Date 2016-04-21
 *	Descirbe 调用资源库基本接口
 */

@Controller
@RequestMapping("/baseData")
@SessionAttributes(Constants.SESSION_ID)
public class BaseDataController {

	private final Logger logger = LoggerFactory.getLogger(BaseDataController.class);
	private Gson gson = new Gson();

	@Inject
	private BaseDataClient baseDataClient;
	
	/**
	 * 查询学段列表
	 * */
	@RequestMapping(value="/stage",method=RequestMethod.POST)
	@ResponseBody
	public ResponseItem stageList( HttpServletRequest request){
		logger.info("HttpServletRequest: ContextPath:{},RequestURI:{},requestParam{}", request.getContextPath(), request.getRequestURI(),null);
		try {
			List<BaseData> baseDatas = baseDataClient.getStageList();
			
			ResponseItem responseItem = new ResponseItem();
			responseItem.setData(baseDatas);
			return responseItem;
		} catch (JsonSyntaxException e) {
			logger.error("stageList  JsonSyntaxException:", e);
			return ResponseItem.responseWithName(new ResponseItem(), ResponseCode.SERVICE_ERROR.toString(), "stageList jsonSyntaxException");
		} catch (Exception e) {
			logger.error("stageList  Exception:", e);
			return ResponseItem.responseWithName(new ResponseItem(), ResponseCode.SERVICE_ERROR.toString(), "stageList exception");
		}
	}
	
	/**根据学段
	 * 查询学年列表
	 * */
	@RequestMapping(value="/grade",method=RequestMethod.POST)
	@ResponseBody
	public ResponseItem gradeList(HttpServletRequest request,BaseDataModel baseDataModel){
		logger.info("HttpServletRequest: ContextPath:{},RequestURI:{},requestParam{}", request.getContextPath(), request.getRequestURI(),gson.toJson(baseDataModel));
		try {
			if(StringUtils.isBlank(baseDataModel.getStageCode())){
				logger.error("gradeList ExceptionrequestId："+"requestId,"+ResponseCode.PARAMETER_MISS.toString() + ".baseDataModel.getStageCode");
				return ResponseItem.responseWithName(new ResponseItem(), ResponseCode.PARAMETER_MISS.toString(), ".baseDataModel.getStageCode");
			}
			List<BaseData> baseDatas = baseDataClient.getGradeList(baseDataModel.getStageCode());
			for (BaseData baseData : baseDatas) {
				baseData.setStageCode(null);
			}
			ResponseItem responseItem = new ResponseItem();
			responseItem.setData(baseDatas);
			return responseItem;
		} catch (JsonSyntaxException e) {
			logger.error("gradeList  JsonSyntaxException:", e);
			return ResponseItem.responseWithName(new ResponseItem(), ResponseCode.SERVICE_ERROR.toString(), "gradeList jsonSyntaxException");
		} catch (Exception e) {
			logger.error("gradeList  Exception:", e);
			return ResponseItem.responseWithName(new ResponseItem(), ResponseCode.SERVICE_ERROR.toString(), "gradeList exception");
		}
	}
	/**根据学年
	 * 查询学科列表
	 * */
	@RequestMapping(value="/subject",method=RequestMethod.POST)
	@ResponseBody
	public ResponseItem subjectList( HttpServletRequest request,BaseDataModel baseDataModel){
		logger.info("HttpServletRequest: ContextPath:{},RequestURI:{},requestParam{}", request.getContextPath(), request.getRequestURI(),gson.toJson(baseDataModel));
		try {
			if(StringUtils.isBlank(baseDataModel.getGradeCode())){
				logger.error("subjectList ExceptionrequestId："+"requestId,"+ResponseCode.PARAMETER_MISS.toString() + ".baseDataModel.getGradeCode");
				return ResponseItem.responseWithName(new ResponseItem(), ResponseCode.PARAMETER_MISS.toString(), ".baseDataModel.getGradeCode");
			}
			List<BaseData> baseDatas = baseDataClient.getSubjectList(baseDataModel.getGradeCode());
			for (BaseData baseData : baseDatas) {
				baseData.setSubjectCode(baseData.getSubject_code());
				baseData.setSubjectName(baseData.getSubject_name());
				baseData.setSubject_code(null);
				baseData.setSubject_name(null);
				baseData.setGradeCode(null);
			}
			ResponseItem responseItem = new ResponseItem();
			responseItem.setData(baseDatas);
			return responseItem;
		} catch (JsonSyntaxException e) {
			logger.error("subjectList  JsonSyntaxException:", e);
			return ResponseItem.responseWithName(new ResponseItem(), ResponseCode.SERVICE_ERROR.toString(), "subjectList jsonSyntaxException");
		} catch (Exception e) {
			logger.error("subjectList  Exception:", e);
			return ResponseItem.responseWithName(new ResponseItem(), ResponseCode.SERVICE_ERROR.toString(), "subjectList exception");
		}
	}
	/**根据学年，学科
	 * 查询教材列表
	 * */
	@RequestMapping(value="/bookType",method=RequestMethod.POST)
	@ResponseBody
	public ResponseItem bookTypeList(HttpServletRequest request,BaseDataModel baseDataModel){
		logger.info("HttpServletRequest: ContextPath:{},RequestURI:{},requestParam{}", request.getContextPath(), request.getRequestURI(),gson.toJson(baseDataModel));
		try {
			if(StringUtils.isBlank(baseDataModel.getGradeCode())){
				logger.error("bookTypeList ExceptionrequestId："+"requestId,"+ResponseCode.PARAMETER_MISS.toString() + ".baseDataModel.getGradeCode");
				return ResponseItem.responseWithName(new ResponseItem(), ResponseCode.PARAMETER_MISS.toString(), ".baseDataModel.getGradeCode");
			}
			if(StringUtils.isBlank(baseDataModel.getSubjectCode())){
				logger.error("bookTypeList ExceptionrequestId："+"requestId,"+ResponseCode.PARAMETER_MISS.toString() + ".baseDataModel.getSubjectCode");
				return ResponseItem.responseWithName(new ResponseItem(), ResponseCode.PARAMETER_MISS.toString(), ".baseDataModel.getSubjectCode");
			}
			List<BaseData> baseDatas = baseDataClient.getBookTypeList(baseDataModel.getGradeCode(), baseDataModel.getSubjectCode());
			for (BaseData baseData : baseDatas) {
				baseData.setBookTypeCode(baseData.getCtb_code());
				baseData.setBookTypeCodeName(baseData.getBook_type());
				baseData.setCtb_code(null);
				baseData.setBook_type(null);
				baseData.setGradeCode(null);
			}
			ResponseItem responseItem = new ResponseItem();
			responseItem.setData(baseDatas);
			return responseItem;
		} catch (JsonSyntaxException e) {
			logger.error("bookTypeList  JsonSyntaxException:", e);
			return ResponseItem.responseWithName(new ResponseItem(), ResponseCode.SERVICE_ERROR.toString(), "bookTypeList jsonSyntaxException");
		} catch (Exception e) {
			logger.error("bookTypeList  Exception:", e);
			return ResponseItem.responseWithName(new ResponseItem(), ResponseCode.SERVICE_ERROR.toString(), "bookTypeList exception");
		}
	}
	/**无参数
	 * 查询学科列表
	 * */
	@RequestMapping(value="/subjectNO",method=RequestMethod.POST)
	@ResponseBody
	public ResponseItem subjectNOList( HttpServletRequest request,BaseDataModel baseDataModel){
		logger.info("HttpServletRequest: ContextPath:{},RequestURI:{},requestParam{}", request.getContextPath(), request.getRequestURI(),gson.toJson(baseDataModel));
		try {
			List<BaseData> baseDatas = baseDataClient.getSubjectList();
			ResponseItem responseItem = new ResponseItem();
			responseItem.setData(baseDatas);
			return responseItem;
		} catch (JsonSyntaxException e) {
			logger.error("subjectList  JsonSyntaxException:", e);
			return ResponseItem.responseWithName(new ResponseItem(), ResponseCode.SERVICE_ERROR.toString(), "subjectList jsonSyntaxException");
		} catch (Exception e) {
			logger.error("subjectList  Exception:", e);
			return ResponseItem.responseWithName(new ResponseItem(), ResponseCode.SERVICE_ERROR.toString(), "subjectList exception");
		}
	}
	

}
