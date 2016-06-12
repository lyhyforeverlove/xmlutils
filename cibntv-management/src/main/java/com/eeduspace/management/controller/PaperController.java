package com.eeduspace.management.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.SessionAttributes;

import com.eeduspace.management.client.BaseDataClient;
import com.eeduspace.management.comm.Constants;
import com.eeduspace.management.model.BaseDataModel;
import com.eeduspace.management.model.ExamDataDetailBeanForResponse;
import com.eeduspace.management.model.OptModel;
import com.eeduspace.management.model.PaperResponse;
import com.eeduspace.management.model.QuestionDataTemp;
import com.eeduspace.management.rescode.ResponseCode;
import com.eeduspace.management.rescode.ResponseItem;
import com.google.gson.Gson;
import com.google.gson.JsonSyntaxException;
import com.google.gson.reflect.TypeToken;

@Controller
@RequestMapping("/paper")
@SessionAttributes(Constants.SESSION_ID)
public class PaperController {
	private final Logger logger = LoggerFactory.getLogger(PaperController.class);
	private Gson gson = new Gson();
	
	@Inject
	private BaseDataClient baseDataClient;
	
	/**
	 * 查询试卷列表
	 * @return
	 * */
	public ResponseItem getPaperPage(HttpServletRequest request,BaseDataModel baseDataModel){
		logger.info("HttpServletRequest: ContextPath:{},RequestURI:{},requestParam{}", request.getContextPath(), request.getRequestURI(),gson.toJson(baseDataModel));
		try {
			if (StringUtils.isBlank(baseDataModel.getGradeCode())) {
				logger.error("getPaperPage ExceptionrequestId："+"requestId,"+ResponseCode.PARAMETER_MISS.toString() + ".baseDataModel.getGradeCode");
				return ResponseItem.responseWithName(new ResponseItem(), ResponseCode.PARAMETER_MISS.toString(), ".baseDataModel.getGradeCode");
			}
			if (StringUtils.isBlank(baseDataModel.getSubjectCode())) {
				logger.error("getPaperPage ExceptionrequestId："+"requestId,"+ResponseCode.PARAMETER_MISS.toString() + ".baseDataModel.getSubjectCode");
				return ResponseItem.responseWithName(new ResponseItem(), ResponseCode.PARAMETER_MISS.toString(), ".baseDataModel.getSubjectCode");
			}
			if (StringUtils.isBlank(baseDataModel.getBookTypeCode())) {
				logger.error("getPaperPage ExceptionrequestId："+"requestId,"+ResponseCode.PARAMETER_MISS.toString() + ".baseDataModel.getBookTypeCode");
				return ResponseItem.responseWithName(new ResponseItem(), ResponseCode.PARAMETER_MISS.toString(), ".baseDataModel.getBookTypeCode");
			}
			ResponseItem responseItem = new ResponseItem();
			Map<String, String> map = new HashMap<String, String>();
			map.put("searchName", baseDataModel.getSearchName());
			map.put("searchValue", baseDataModel.getSearchValue());
			PaperResponse response= baseDataClient.getPaperPage(baseDataModel.getGradeCode(), baseDataModel.getSubjectCode(), baseDataModel.getBookTypeCode()
							, baseDataModel.getPaperType(), map, baseDataModel.getCp(), baseDataModel.getPageSize());
			
			responseItem.setData(response);
			return responseItem;
		} catch (JsonSyntaxException e) {
			logger.error("getPaperPage  JsonSyntaxException:", e);
			return ResponseItem.responseWithName(new ResponseItem(), ResponseCode.SERVICE_ERROR.toString(), "getPaperPage jsonSyntaxException");
		} catch (Exception e) {
			logger.error("getPaperPage  Exception:", e);
			return ResponseItem.responseWithName(new ResponseItem(), ResponseCode.SERVICE_ERROR.toString(), "getPaperPage exception");
		}
	}
	/**
	 * 试卷详情
	 * @return
	 * */
	public ResponseItem getPaperDetail(HttpServletRequest request,BaseDataModel baseDataModel){
		logger.info("HttpServletRequest: ContextPath:{},RequestURI:{},requestParam{}", request.getContextPath(), request.getRequestURI(),gson.toJson(baseDataModel));
		try {
			if (StringUtils.isBlank(baseDataModel.getPaperCode())) {
				logger.error("getPaperDetail ExceptionrequestId："+"requestId,"+ResponseCode.PARAMETER_MISS.toString() + ".baseDataModel.getPaperCode");
				return ResponseItem.responseWithName(new ResponseItem(), ResponseCode.PARAMETER_MISS.toString(), ".baseDataModel.getPaperCode");
			}
			ResponseItem responseItem = new ResponseItem();
			ExamDataDetailBeanForResponse response = baseDataClient.getPaperDetail(baseDataModel.getPaperCode());
			List<QuestionDataTemp> lists = response.getQuestions();
			if (lists.size() > 0) {
				for (QuestionDataTemp questionDataTemp : lists) {
					List<OptModel> optionModels = gson.fromJson(questionDataTemp.getOption(), new TypeToken<List<OptModel>>(){}.getType());
					questionDataTemp.setOptionModels(optionModels);
					questionDataTemp.setOption(null);
				}
			}
			responseItem.setData(response);
			return responseItem;
		} catch (JsonSyntaxException e) {
			logger.error("getPaperDetail  JsonSyntaxException:", e);
			return ResponseItem.responseWithName(new ResponseItem(), ResponseCode.SERVICE_ERROR.toString(), "getPaperDetail jsonSyntaxException");
		} catch (Exception e) {
			logger.error("getPaperDetail  Exception:", e);
			return ResponseItem.responseWithName(new ResponseItem(), ResponseCode.SERVICE_ERROR.toString(), "getPaperDetail exception");
		}
	}
	
}
