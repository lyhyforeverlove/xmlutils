package com.eeduspace.management.controller;

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
import com.eeduspace.management.model.CourseVideoResponseModel;
import com.eeduspace.management.rescode.ResponseCode;
import com.eeduspace.management.rescode.ResponseItem;
import com.google.gson.Gson;
import com.google.gson.JsonSyntaxException;

@Controller
@RequestMapping("/video")
@SessionAttributes(Constants.SESSION_ID)
public class CourseVideoController {
	
	private final Logger logger = LoggerFactory.getLogger(CourseVideoController.class);
	private Gson gson = new Gson();
	
	@Inject
	private BaseDataClient baseDataClient;
	
	@RequestMapping(value="/videoPage",method=RequestMethod.POST)
	@ResponseBody
	public ResponseItem videoPageList(HttpServletRequest request,BaseDataModel baseDataModel){
		logger.info("HttpServletRequest: ContextPath:{},RequestURI:{},requestParam{}", request.getContextPath(), request.getRequestURI(),gson.toJson(baseDataModel));
		try {
			/*if (StringUtils.isBlank(baseDataModel.getSubjectCode())) {
				logger.error("videoPageList ExceptionrequestId："+"requestId,"+ResponseCode.PARAMETER_MISS.toString() + ".baseDataModel.getSubjectCode");
				return ResponseItem.responseWithName(new ResponseItem(), ResponseCode.PARAMETER_MISS.toString(), ".baseDataModel.getSubjectCode");
			}*/
			/*if (baseDataModel.getCp() < 0) {
				logger.error("videoPageList ExceptionrequestId："+"requestId,"+ResponseCode.PARAMETER_MISS.toString() + ".baseDataModel.getCp");
				return ResponseItem.responseWithName(new ResponseItem(), ResponseCode.PARAMETER_MISS.toString(), ".baseDataModel.getCp");
			}*/
			ResponseItem responseItem = new ResponseItem();
			CourseVideoResponseModel response = baseDataClient.getCourseVideoPage(baseDataModel.getSubjectCode(), baseDataModel.getSearchName(), baseDataModel.getCp(), baseDataModel.getPageSize());
			BaseDataModel baseDataModel2 = new BaseDataModel();
			baseDataModel2.setSearchName(baseDataModel.getSearchName());
			baseDataModel2.setSearchValue(baseDataModel.getSearchValue());
			baseDataModel2.setCp(response.getCurPage());
			baseDataModel2.setPageSize(response.getPageSize());
			baseDataModel2.setTotalPage(response.getPagetotal());
			baseDataModel2.setItem(response.getTotal());
			baseDataModel2.setReponseVedio(response.getVideoList());
			baseDataModel2.setSubjectCode(baseDataModel.getSubjectCode());
			baseDataModel2.setSubjectName(baseDataModel.getSubjectName());
			
			responseItem.setData(baseDataModel2);
			return responseItem;
		} catch (JsonSyntaxException e) {
			logger.error("videoPageList  JsonSyntaxException:", e);
			return ResponseItem.responseWithName(new ResponseItem(), ResponseCode.SERVICE_ERROR.toString(), "videoPageList jsonSyntaxException");
		} catch (Exception e) {
			logger.error("videoPageList  Exception:", e);
			return ResponseItem.responseWithName(new ResponseItem(), ResponseCode.SERVICE_ERROR.toString(), "videoPageList exception");
		}
	}
	
	@RequestMapping(value="/videoDetail",method=RequestMethod.POST)
	@ResponseBody
	public ResponseItem videoDetail(HttpServletRequest request,BaseDataModel baseDataModel){
		logger.info("HttpServletRequest: ContextPath:{},RequestURI:{},requestParam{}", request.getContextPath(), request.getRequestURI(),gson.toJson(baseDataModel));
		try {
			if (StringUtils.isBlank(baseDataModel.getCourseCode())) {
				logger.error("videoDetail ExceptionrequestId："+"requestId,"+ResponseCode.PARAMETER_MISS.toString() + ".baseDataModel.getCourseCode");
				return ResponseItem.responseWithName(new ResponseItem(), ResponseCode.PARAMETER_MISS.toString(), ".baseDataModel.getCourseCode");
			}
			ResponseItem responseItem = new ResponseItem();
			CourseVideoResponseModel response = baseDataClient.getCourseVideoDetail(baseDataModel.getCourseCode());
			BaseDataModel baseDataModel2 = new BaseDataModel();
			baseDataModel2.setReponseVedio(response.getReponseVedio());
			responseItem.setData(response);
			return responseItem;
		} catch (JsonSyntaxException e) {
			logger.error("videoDetail  JsonSyntaxException:", e);
			return ResponseItem.responseWithName(new ResponseItem(), ResponseCode.SERVICE_ERROR.toString(), "videoDetail jsonSyntaxException");
		} catch (Exception e) {
			logger.error("videoDetail  Exception:", e);
			return ResponseItem.responseWithName(new ResponseItem(), ResponseCode.SERVICE_ERROR.toString(), "videoDetail exception");
		}
	}

}
