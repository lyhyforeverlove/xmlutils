package com.eeduspace.management.controller;

import java.util.Date;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttributes;

import com.eeduspace.management.comm.Constants;
import com.eeduspace.management.model.ManagerModel;
import com.eeduspace.management.persist.enumeration.UserEnum;
import com.eeduspace.management.rescode.ResponseCode;
import com.eeduspace.management.rescode.ResponseItem;
import com.eeduspace.management.service.ManagerService;
import com.eeduspace.uuims.comm.util.base.encrypt.Digest;
import com.google.gson.Gson;


/**管理员操作
 * @author songwei
 * @Describe
 * @Date  
 */
@Controller
@RequestMapping("/manager")
@SessionAttributes(Constants.SESSION_ID)
public class ManagerController {

	private final Logger logger = LoggerFactory.getLogger(ManagerController.class);
	private Gson gson = new Gson();

	@Inject
	private ManagerService managerService;

	/**查询管理员列表分页
	 * @return
	 */
	@RequestMapping(value="/manageList",method=RequestMethod.GET)
	@ResponseBody
	public ResponseItem manageListPage(HttpServletRequest request,ManagerModel managerModel){
		logger.info("HttpServletRequest: ContextPath:{},RequestURI:{},requestParam{}", request.getContextPath(), request.getRequestURI(),gson.toJson(managerModel));
		try {
			ResponseItem responseItem = new ResponseItem();
			Sort sort = new Sort(Sort.Direction.DESC, "createDate");
			Pageable pageable = new PageRequest(managerModel.getCurrentPage(),managerModel.getSize(),sort);
			Page<ManagerModel> managerPage = managerService.getPage(managerModel,pageable);
			responseItem.setData(managerPage);
			return responseItem;
		} catch (Exception e) {
			logger.error("manageListPage  Exception:", e);
			return ResponseItem.responseWithName(new ResponseItem(), ResponseCode.SERVICE_ERROR.toString(), "manageListPage exception");
		}
	}

	/**增加管理员
	 * @return
	 */
	@RequestMapping(value="/manageSave",method=RequestMethod.GET)
	@ResponseBody
	public ResponseItem managerSave(HttpServletRequest request,ManagerModel managerModel){
		logger.info("HttpServletRequest: ContextPath:{},RequestURI:{},requestParam{}", request.getContextPath(), request.getRequestURI(),gson.toJson(managerModel));
		try {
			if (StringUtils.isBlank(managerModel.getPassword())) {
				logger.error("managerSave ExceptionrequestId："+"requestId,"+ResponseCode.PARAMETER_MISS.toString() + ".managerModel.getPassword");
				return ResponseItem.responseWithName(new ResponseItem(), ResponseCode.PARAMETER_MISS.toString(), ".managerModel.getPassword");
			}
			if (!org.springframework.util.StringUtils.isEmpty(managerModel.getRoleModel())) {
				logger.error("managerSave ExceptionrequestId："+"requestId,"+ResponseCode.PARAMETER_MISS.toString() + ".managerModel.getRoleModel");
				return ResponseItem.responseWithName(new ResponseItem(), ResponseCode.PARAMETER_MISS.toString(), ".managerModel.getRoleModel");
			}
			ResponseItem responseItem = new ResponseItem();
			managerModel.setCreateDate(new Date());
			managerModel.setIsFirst(true);
			managerModel.setSecretKey(null);
			managerModel.setAccessKey(null);
			managerModel.setStatus(UserEnum.Status.Enable);
			ManagerModel model = managerService.saveOrReplaceManager(managerModel);
			responseItem.setData(model);
			return responseItem;
		} catch (Exception e) {
			logger.error("managerSave  Exception:", e);
			return ResponseItem.responseWithName(new ResponseItem(), ResponseCode.SERVICE_ERROR.toString(), "managerSave exception");
		}
	}

	/**查看管理员信息
	 * @return
	 */
	@RequestMapping(value="/manageDetail",method=RequestMethod.GET)
	@ResponseBody
	public ResponseItem managerDetail(HttpServletRequest request,ManagerModel managerModel){
		logger.info("HttpServletRequest: ContextPath:{},RequestURI:{},requestParam{}", request.getContextPath(), request.getRequestURI(),gson.toJson(managerModel));
		try {
			if (StringUtils.isBlank(managerModel.getUuid())) {
				logger.error("managerDetail ExceptionrequestId："+"requestId,"+ResponseCode.PARAMETER_MISS.toString() + ".managerModel.getUuid");
				return ResponseItem.responseWithName(new ResponseItem(), ResponseCode.PARAMETER_MISS.toString(), ".managerModel.getUuid");
			}
			ResponseItem responseItem = new ResponseItem();
			ManagerModel model = managerService.getManagerModel(managerModel.getUuid());
			responseItem.setData(model);
			return responseItem;
		} catch (Exception e) {
			logger.error("managerDetail  Exception:", e);
			return ResponseItem.responseWithName(new ResponseItem(), ResponseCode.SERVICE_ERROR.toString(), "managerDetail exception");
		}
	}

	/**修改管理员密码
	 * @return
	 */
	@RequestMapping(value="/manageChange",method=RequestMethod.GET)
	@ResponseBody
	public ResponseItem managerChange(HttpServletRequest request,ManagerModel managerModel){
		logger.info("HttpServletRequest: ContextPath:{},RequestURI:{},requestParam{}", request.getContextPath(), request.getRequestURI(),gson.toJson(managerModel));
		try {
			if (StringUtils.isBlank(managerModel.getUuid())) {
				logger.error("managerChange ExceptionrequestId："+"requestId,"+ResponseCode.PARAMETER_MISS.toString() + ".managerModel.getUuid");
				return ResponseItem.responseWithName(new ResponseItem(), ResponseCode.PARAMETER_MISS.toString(), ".managerModel.getUuid");
			}
			if (StringUtils.isBlank(managerModel.getPassword())) {
				logger.error("managerChange ExceptionrequestId："+"requestId,"+ResponseCode.PARAMETER_MISS.toString() + ".managerModel.getPassword");
				return ResponseItem.responseWithName(new ResponseItem(), ResponseCode.PARAMETER_MISS.toString(), ".managerModel.getPassword");
			}
			ResponseItem responseItem = new ResponseItem();
			String pwd = Digest.md5Digest(managerModel.getPassword());
			managerModel.setPassword(pwd);
			ManagerModel model = managerService.saveOrReplaceManager(managerModel);
			responseItem.setData(model);
			return responseItem;
		} catch (Exception e) {
			logger.error("managerChange  Exception:", e);
			return ResponseItem.responseWithName(new ResponseItem(), ResponseCode.SERVICE_ERROR.toString(), "managerChange exception");
		}
	}

	/**手机号唯一性验证
	 * @return
	 */
	@RequestMapping(value="/manageChange",method=RequestMethod.GET)
	@ResponseBody
	public ResponseItem mPhoneChange(HttpServletRequest request,ManagerModel managerModel){
		logger.info("HttpServletRequest: ContextPath:{},RequestURI:{},requestParam{}", request.getContextPath(), request.getRequestURI(),gson.toJson(managerModel));
		try {
			ResponseItem responseItem = new ResponseItem();
			if (StringUtils.isBlank(managerModel.getPhone())) {
				logger.error("mPhoneChange ExceptionrequestId："+"requestId,"+ResponseCode.PARAMETER_MISS.toString() + ".managerModel.getPhone");
				return ResponseItem.responseWithName(new ResponseItem(), ResponseCode.PARAMETER_MISS.toString(), ".managerModel.getPhone");
			}
			boolean flag = managerService.validate(managerModel.getPhone());
			responseItem.setData(flag);
			return responseItem;
		} catch (Exception e) {
			logger.error("mPhoneChange  Exception:", e);
			return ResponseItem.responseWithName(new ResponseItem(), ResponseCode.SERVICE_ERROR.toString(), "mPhoneChange exception");
		}
	}

}
