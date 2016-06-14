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
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
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
import com.eeduspace.management.service.PaperService;
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
	@Inject
	private PaperService paperService;
	
	/**
	 * 查询试卷列表
	 * @return
	 * */
	@RequestMapping(value="/paperPage",method=RequestMethod.POST)
	@ResponseBody
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
			if (baseDataModel.getCp() < 0) {
				logger.error("getPaperPage ExceptionrequestId："+"requestId,"+ResponseCode.PARAMETER_MISS.toString() + ".baseDataModel.getCp");
				return ResponseItem.responseWithName(new ResponseItem(), ResponseCode.PARAMETER_MISS.toString(), ".baseDataModel.getCp");
			}
			ResponseItem responseItem = new ResponseItem();
			Map<String, String> map = new HashMap<String, String>();
			if (StringUtils.isNotBlank(baseDataModel.getSearchName()) && StringUtils.isNotBlank(baseDataModel.getSearchValue())) {
				map.put("searchName", baseDataModel.getSearchName());
				map.put("searchValue", baseDataModel.getSearchValue());
			}
			PaperResponse response = paperService.getPaperPage(baseDataModel.getGradeCode(), baseDataModel.getSubjectCode(), baseDataModel.getBookTypeCode()
							, baseDataModel.getPaperType(), map, baseDataModel.getCp(), baseDataModel.getPageSize());
			response.setStageCode(baseDataModel.getStageCode());
			response.setGradeCode(baseDataModel.getGradeCode());
			response.setSubjectCode(baseDataModel.getSubjectCode());
			response.setBookTypeCode(baseDataModel.getBookTypeCode());
			response.setPaperType(baseDataModel.getPaperType());
			response.setCp(baseDataModel.getCp());
			response.setPageSize(baseDataModel.getPageSize());
			response.setSearchName(baseDataModel.getSearchName());
			response.setSearchValue(baseDataModel.getSearchValue());
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
	@RequestMapping(value="/paperDetail",method=RequestMethod.POST)
	@ResponseBody
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