package com.eeduspace.management.controller;

import java.io.UnsupportedEncodingException;
import java.text.ParseException;
import java.util.ArrayList;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttributes;

import com.eeduspace.management.client.BaseDataClient;
import com.eeduspace.management.comm.Constants;
import com.eeduspace.management.model.BaseDataModel;
import com.eeduspace.management.model.ExamDataDetailModel;
import com.eeduspace.management.model.OptModel;
import com.eeduspace.management.model.PaperResponseModel;
import com.eeduspace.management.model.PaperTypeModel;
import com.eeduspace.management.model.QuestionDataTempModel;
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
			if (baseDataModel.getCp() < 1) {
				logger.error("getPaperPage ExceptionrequestId："+"requestId,"+ResponseCode.PARAMETER_MISS.toString() + ".baseDataModel.getCp < 1");
				return ResponseItem.responseWithName(new ResponseItem(), ResponseCode.PARAMETER_MISS.toString(), ".baseDataModel.getCp < 1");
			}
			ResponseItem responseItem = new ResponseItem();
			Map<String, String> map = new HashMap<String, String>();
			if (StringUtils.isNotBlank(baseDataModel.getSearchName()) && StringUtils.isNotBlank(baseDataModel.getSearchValue())) {
				map.put("searchName", baseDataModel.getSearchName());
				map.put("searchValue", baseDataModel.getSearchValue());
			}
			PaperResponseModel response = paperService.getPaperPage(baseDataModel.getGradeCode(), baseDataModel.getSubjectCode(), baseDataModel.getBookTypeCode()
					, baseDataModel.getPaperType(), map, baseDataModel.getCp(), baseDataModel.getPageSize());
			response.setStageCode(baseDataModel.getStageCode());
			response.setStatgeName(baseDataModel.getSubjectName());
			response.setGradeCode(baseDataModel.getGradeCode());
			response.setGradeName(baseDataModel.getGradeName());
			response.setSubjectCode(baseDataModel.getSubjectCode());
			response.setSubjectName(baseDataModel.getSubjectName());
			response.setBookTypeCode(baseDataModel.getBookTypeCode());
			response.setBookTypeName(baseDataModel.getBookTypeName());
			response.setPaperType(baseDataModel.getPaperType());
			response.setPaperTypeName(baseDataModel.getPaperTypeName());
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
			ExamDataDetailModel response = baseDataClient.getPaperDetail(baseDataModel.getPaperCode());
			List<QuestionDataTempModel> lists = response.getQuestions();
			if (!org.springframework.util.StringUtils.isEmpty(lists) && lists.size() > 0) {
				for (QuestionDataTempModel questionDataTemp : lists) {
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
	/**
	 * 试卷属性列表：价格和打折
	 * */
	@RequestMapping(value="/paperTypeList",method=RequestMethod.POST)
	@ResponseBody
	public ResponseItem getPaperTypeList(HttpServletRequest request){
		logger.info("HttpServletRequest: ContextPath:{},RequestURI:{},requestParam{}", request.getContextPath(), request.getRequestURI(),null);
		try {
			ResponseItem responseItem = new ResponseItem();
			List<PaperTypeModel> pTypeModels = paperService.getPaperTypeList();

			responseItem.setData(pTypeModels);
			return responseItem;
		} catch (Exception e) {
			logger.error("getPaperTypeList  Exception:", e);
			return ResponseItem.responseWithName(new ResponseItem(), ResponseCode.SERVICE_ERROR.toString(), "getPaperTypeList exception");
		}
	}
	/**
	 * 修改试卷属性：价格，时间，打折信息
	 * @throws UnsupportedEncodingException 
	 * @throws ParseException 
	 * */
	@RequestMapping(value="/paperTypeReplace",method=RequestMethod.POST)
	@ResponseBody
	public ResponseItem replacePaperType(HttpServletRequest request, @RequestParam String[] paperTypeDatas) {
		logger.info("HttpServletRequest: ContextPath:{},RequestURI:{},requestParam{}", request.getContextPath(), request.getRequestURI(),gson.toJson(paperTypeDatas));
		try {
			if (org.springframework.util.StringUtils.isEmpty(paperTypeDatas) || paperTypeDatas.length <= 0) {
				logger.error("replacePaperType ExceptionrequestId："+"requestId,"+ResponseCode.PARAMETER_MISS.toString() + ".responseModel.getPaperTypeDatas");
				return ResponseItem.responseWithName(new ResponseItem(), ResponseCode.PARAMETER_MISS.toString(), ".responseModel.getPaperTypeDatas");
			}
			List<PaperTypeModel> pModels = new ArrayList<PaperTypeModel>();
			for (String str : paperTypeDatas) {
				PaperTypeModel p = gson.fromJson(str, PaperTypeModel.class);
				pModels.add(p);
			}
			List<PaperTypeModel> paperTypeModels = paperService.saveOrReplacePaperTypes(pModels);
			ResponseItem responseItem = new ResponseItem();
			responseItem.setData(paperTypeModels);
			return responseItem;
		} catch (ParseException e) {
			logger.error("replacePaperType  ParseException:", e);
			return ResponseItem.responseWithName(new ResponseItem(), ResponseCode.SERVICE_ERROR.toString(), "replacePaperType parseException");
		} catch (Exception e) {
			logger.error("replacePaperType  Exception:", e);
			return ResponseItem.responseWithName(new ResponseItem(), ResponseCode.SERVICE_ERROR.toString(), "replacePaperType exception");
		}
	}

}
