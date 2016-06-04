package com.eeduspace.management.controller;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttributes;

import com.eeduspace.management.comm.Constants;
import com.eeduspace.management.model.BaseDataModel;
import com.eeduspace.management.rescode.ResponseCode;
import com.eeduspace.management.rescode.ResponseItem;
import com.eeduspace.management.service.CourseVideoService;
import com.google.gson.Gson;

/**视频课程controller
 * @author songwei
 * @Describe
 * @Date
 */
@Controller
@RequestMapping("/video")
@SessionAttributes(Constants.SESSION_ID)
public class CourseVideoController {
	private final Logger logger = LoggerFactory.getLogger(RoleController.class);
	private Gson gson = new Gson();

	@Inject
	private CourseVideoService courseVideoService;
	
	@RequestMapping(value="/subject",method=RequestMethod.GET)
	@ResponseBody
	public ResponseItem subjectList(HttpServletRequest request,@ModelAttribute BaseDataModel baseDataModel){
		logger.info("HttpServletRequest: ContextPath:{},RequestURI:{},requestParam{}", request.getContextPath(), request.getRequestURI(),gson.toJson(baseDataModel));
		try {
			ResponseItem responseItem = new ResponseItem();
			BaseDataModel bm= courseVideoService.getSubjects(baseDataModel);

			return responseItem;
		} catch (Exception e) {
			logger.error("videoPageList  Exception:", e);
			return ResponseItem.responseWithName(new ResponseItem(), ResponseCode.SERVICE_ERROR.toString(), "videoPageList exception");
		}
	}
	

	/**视频列表：通过学科查列表所以，重新写接口，接收 学科，视频名称（模糊查询） 参数查询
	 * @param request
	 * @param baseDataModel
	 * @return
	 */
	@RequestMapping(value="/videoPage",method=RequestMethod.GET)
	@ResponseBody
	public ResponseItem videoPageList(HttpServletRequest request,@ModelAttribute BaseDataModel baseDataModel){
		logger.info("HttpServletRequest: ContextPath:{},RequestURI:{},requestParam{}", request.getContextPath(), request.getRequestURI(),gson.toJson(baseDataModel));
		try {
			ResponseItem responseItem = new ResponseItem();
			BaseDataModel bm= courseVideoService.getCousreVideos(baseDataModel);

			return responseItem;
		} catch (Exception e) {
			logger.error("videoPageList  Exception:", e);
			return ResponseItem.responseWithName(new ResponseItem(), ResponseCode.SERVICE_ERROR.toString(), "videoPageList exception");
		}
	}
	
	@RequestMapping(value="/videoDetail",method=RequestMethod.GET)
	@ResponseBody
	public ResponseItem videoDetail(HttpServletRequest request,@ModelAttribute BaseDataModel baseDataModel){
		logger.info("HttpServletRequest: ContextPath:{},RequestURI:{},requestParam{}", request.getContextPath(), request.getRequestURI(),gson.toJson(baseDataModel));
		try {
			ResponseItem responseItem = new ResponseItem();
			BaseDataModel bm= courseVideoService.getCousreVideo(baseDataModel);
			
			return responseItem;
		} catch (Exception e) {
			logger.error("videoDetail  Exception:", e);
			return ResponseItem.responseWithName(new ResponseItem(), ResponseCode.SERVICE_ERROR.toString(), "videoDetail exception");
		}
	}

}
