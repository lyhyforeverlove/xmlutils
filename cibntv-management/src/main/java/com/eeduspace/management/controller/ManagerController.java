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

import com.eeduspace.management.comm.Constants;
import com.eeduspace.management.model.ManagerModel;
import com.eeduspace.management.model.SmsModel;
import com.eeduspace.management.rescode.ResponseCode;
import com.eeduspace.management.rescode.ResponseItem;
import com.eeduspace.management.service.ManagerService;
import com.eeduspace.management.service.SmsService;
import com.eeduspace.uuims.comm.util.base.encrypt.Digest;
import com.google.gson.Gson;


/**管理员操作
 * @author songwei
 * @Describe
 * @Date  2016-06-06
 */
@Controller
@RequestMapping("/manager")
@SessionAttributes(Constants.SESSION_ID)
public class ManagerController {

	private final Logger logger = LoggerFactory.getLogger(ManagerController.class);
	private Gson gson = new Gson();

	@Inject
	private ManagerService managerService;
	
	@Inject
	private SmsService smsService;
	
	
	/**修改管理员角色：密码修改；手机号修改；真实姓名；是否是第一次登录状态修改
	 * @return
	 */
	@RequestMapping(value="/manageChange",method=RequestMethod.POST)
	@ResponseBody
	public ResponseItem managerChange(HttpServletRequest request,ManagerModel managerModel){
		logger.info("HttpServletRequest: ContextPath:{},RequestURI:{},requestParam{}", request.getContextPath(), request.getRequestURI(),gson.toJson(managerModel));
		try {
			if (StringUtils.isBlank(managerModel.getUuid())) {
				logger.error("managerReplace ExceptionrequestId："+"requestId,"+ResponseCode.PARAMETER_MISS.toString() + ".managerModel.getUuid");
				return ResponseItem.responseWithName(new ResponseItem(), ResponseCode.PARAMETER_MISS.toString(), ".managerModel.getUuid");
			}
			if (StringUtils.isNotBlank(managerModel.getPassword())) {
				String pwd = Digest.md5Digest(managerModel.getPassword());
				managerModel.setPassword(pwd);
			}
			if (StringUtils.isNotBlank(managerModel.getPhone())) {
				managerModel.setIsFirst(false);
			}
			ResponseItem responseItem = new ResponseItem();
			ManagerModel model = managerService.saveOrReplaceManager(managerModel);
			responseItem.setData(model);
			return responseItem;
		} catch (Exception e) {
			logger.error("managerReplace  Exception:", e);
			return ResponseItem.responseWithName(new ResponseItem(), ResponseCode.SERVICE_ERROR.toString(), "managerReplace exception");
		}
	}

	/**查看管理员信息
	 * @return
	 */
	@RequestMapping(value="/manageDetail",method=RequestMethod.POST)
	@ResponseBody
	public ResponseItem managerDetail(HttpServletRequest request,ManagerModel managerModel){
		logger.info("HttpServletRequest: ContextPath:{},RequestURI:{},requestParam{}", request.getContextPath(), request.getRequestURI(),gson.toJson(managerModel));
		try {
			if (StringUtils.isBlank(managerModel.getUuid())) {
				logger.error("managerDetail ExceptionrequestId："+"requestId,"+ResponseCode.PARAMETER_MISS.toString() + ".managerModel.getUuid");
				return ResponseItem.responseWithName(new ResponseItem(), ResponseCode.PARAMETER_MISS.toString(), ".managerModel.getUuid");
			}
			ManagerModel model = managerService.getManagerModel(managerModel.getUuid());
			ResponseItem responseItem = new ResponseItem();
			responseItem.setData(model);
			return responseItem;
		} catch (Exception e) {
			logger.error("managerDetail  Exception:", e);
			return ResponseItem.responseWithName(new ResponseItem(), ResponseCode.SERVICE_ERROR.toString(), "managerDetail exception");
		}
	}

	/**手机号唯一性验证
	 * @return
	 */
	@RequestMapping(value="/validatePhone",method=RequestMethod.POST)
	@ResponseBody
	public ResponseItem validatePhone(HttpServletRequest request,ManagerModel managerModel){
		logger.info("HttpServletRequest: ContextPath:{},RequestURI:{},requestParam{}", request.getContextPath(), request.getRequestURI(),gson.toJson(managerModel));
		try {
			if (StringUtils.isBlank(managerModel.getPhone())) {
				logger.error("validatePhone ExceptionrequestId："+"requestId,"+ResponseCode.PARAMETER_MISS.toString() + ".managerModel.getPhone");
				return ResponseItem.responseWithName(new ResponseItem(), ResponseCode.PARAMETER_MISS.toString(), ".managerModel.getPhone");
			}
			boolean flag = managerService.validatePhone(managerModel.getPhone());
			ResponseItem responseItem = new ResponseItem();
			responseItem.setData(flag);
			return responseItem;
		} catch (Exception e) {
			logger.error("validatePhone  Exception:", e);
			return ResponseItem.responseWithName(new ResponseItem(), ResponseCode.SERVICE_ERROR.toString(), "validatePhone exception");
		}
	}

	/**手机发送验证码
	 * @return
	 */
	@RequestMapping(value="/sendSMS",method=RequestMethod.POST)
	@ResponseBody
	public ResponseItem sendMessage(HttpServletRequest request,ManagerModel managerModel){
		logger.info("HttpServletRequest: ContextPath:{},RequestURI:{},requestParam{}", request.getContextPath(), request.getRequestURI(),gson.toJson(managerModel));
		try {
			if (StringUtils.isBlank(managerModel.getPhone())) {
				logger.error("sendMessage ExceptionrequestId："+"requestId,"+ResponseCode.PARAMETER_MISS.toString() + ".managerModel.getPhone");
				return ResponseItem.responseWithName(new ResponseItem(), ResponseCode.PARAMETER_MISS.toString(), ".managerModel.getPhone");
			}
			String code = smsService.sendSmsCode(managerModel.getPhone());
			SmsModel smsModel = new SmsModel();
			smsModel.setPhone(managerModel.getPhone());
			smsModel.setSmsCode(code);
			//存入本地数据库，用来对比  验证码是否正确
			smsModel = smsService.saveCode(smsModel);
			ResponseItem responseItem = new ResponseItem();
			responseItem.setData(code);
			return responseItem;
		} catch (Exception e) {
			logger.error("sendMessage  Exception:", e);
			return ResponseItem.responseWithName(new ResponseItem(), ResponseCode.SERVICE_ERROR.toString(), "sendMessage exception");
		}
	}

	/**验证输入的验证码
	 * @return
	 */
	@RequestMapping(value="/validateSMS",method=RequestMethod.POST)
	@ResponseBody
	public ResponseItem validateMessage(HttpServletRequest request,ManagerModel managerModel){
		logger.info("HttpServletRequest: ContextPath:{},RequestURI:{},requestParam{}", request.getContextPath(), request.getRequestURI(),gson.toJson(managerModel));
		try {
			if (StringUtils.isBlank(managerModel.getPhone())) {
				logger.error("validateMessage ExceptionrequestId："+"requestId,"+ResponseCode.PARAMETER_MISS.toString() + ".managerModel.getPhone");
				return ResponseItem.responseWithName(new ResponseItem(), ResponseCode.PARAMETER_MISS.toString(), ".managerModel.getPhone");
			}
			if (StringUtils.isBlank(managerModel.getSmsCode())) {
				logger.error("validateMessage ExceptionrequestId："+"requestId,"+ResponseCode.PARAMETER_MISS.toString() + ".managerModel.getSmsCode");
				return ResponseItem.responseWithName(new ResponseItem(), ResponseCode.PARAMETER_MISS.toString(), ".managerModel.getSmsCode");
			}
			Boolean flag = smsService.validateSmsCode(managerModel.getPhone(),managerModel.getSmsCode());
			ResponseItem responseItem = new ResponseItem();
			responseItem.setData(flag);
			return responseItem;
		} catch (Exception e) {
			logger.error("validateMessage  Exception:", e);
			return ResponseItem.responseWithName(new ResponseItem(), ResponseCode.SERVICE_ERROR.toString(), "validateMessage exception");
		}
	}

	/**密码是否是原密码;新密码是否与旧密码相同 验证
	 * @return
	 */
	@RequestMapping(value="/validatePwd",method=RequestMethod.POST)
	@ResponseBody
	public ResponseItem validatePassword(HttpServletRequest request,ManagerModel managerModel){
		logger.info("HttpServletRequest: ContextPath:{},RequestURI:{},requestParam{}", request.getContextPath(), request.getRequestURI(),gson.toJson(managerModel));
		try {
			if (StringUtils.isBlank(managerModel.getUuid())) {
				logger.error("validatePassword ExceptionrequestId："+"requestId,"+ResponseCode.PARAMETER_MISS.toString() + ".managerModel.getUuid");
				return ResponseItem.responseWithName(new ResponseItem(), ResponseCode.PARAMETER_MISS.toString(), ".managerModel.getUuid");
			}
			if (StringUtils.isEmpty(managerModel.getOldPassword())) {
				logger.error("validatePassword ExceptionrequestId："+"requestId,"+ResponseCode.PARAMETER_ERROR.toString() + ".managerModel.PARAMETER");
				return ResponseItem.responseWithName(new ResponseItem(), ResponseCode.PARAMETER_ERROR.toString(), ".managerModel.PARAMETER");
			}
			Boolean flag = false;
			//旧密码验证
			managerModel.setOldPassword(Digest.md5Digest(managerModel.getOldPassword()));
			flag = managerService.validatePassword(managerModel);
			/*if (!StringUtils.isBlank(managerModel.getPassword())) {
				//新密码验证
				managerModel.setPassword(Digest.md5Digest(managerModel.getPassword()));
				flag = managerService.validatePassword(managerModel);
			}*/
			ResponseItem responseItem = new ResponseItem();
			responseItem.setData(flag);
			return responseItem;
		} catch (Exception e) {
			logger.error("validatePassword  Exception:", e);
			return ResponseItem.responseWithName(new ResponseItem(), ResponseCode.SERVICE_ERROR.toString(), "validatePassword exception");
		}
	}

	/**管理员用户名唯一验证
	 * @return
	 */
	@RequestMapping(value="/validateName",method=RequestMethod.POST)
	@ResponseBody
	public ResponseItem managerNameValidate(HttpServletRequest request,ManagerModel managerModel){
		logger.info("HttpServletRequest: ContextPath:{},RequestURI:{},requestParam{}", request.getContextPath(), request.getRequestURI(),gson.toJson(managerModel));
		try {
			if (StringUtils.isBlank(managerModel.getName())) {
				logger.error("managerNameValidate ExceptionrequestId："+"requestId,"+ResponseCode.PARAMETER_MISS.toString() + ".managerModel.getName");
				return ResponseItem.responseWithName(new ResponseItem(), ResponseCode.PARAMETER_MISS.toString(), ".managerModel.getName");
			}
			ManagerModel model = managerService.getByUserName(managerModel.getName());
			if (StringUtils.isNotBlank(model.getUuid())) {
				logger.error("managerNameValidate ExceptionrequestId："+"requestId,"+ResponseCode.RESOURCE_INUSE.toString() + ".managerModel.getName");
				return ResponseItem.responseWithName(new ResponseItem(), ResponseCode.RESOURCE_INUSE.toString(), ".managerModel.getName");
			}
			ResponseItem responseItem = new ResponseItem();
			responseItem.setData(false);
			return responseItem;
		} catch (Exception e) {
			logger.error("managerNameValidate  Exception:", e);
			return ResponseItem.responseWithName(new ResponseItem(), ResponseCode.SERVICE_ERROR.toString(), "managerNameValidate exception");
		}
	}



}
