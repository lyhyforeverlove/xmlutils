package com.eeduspace.management.controller;

import java.util.List;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.bind.support.SessionStatus;
import org.springframework.web.servlet.ModelAndView;

import com.eeduspace.management.bean.SessionItem;
import com.eeduspace.management.comm.Constants;
import com.eeduspace.management.model.LoginModel;
import com.eeduspace.management.model.ManagerModel;
import com.eeduspace.management.model.RoleModel;
import com.eeduspace.management.model.SmsModel;
import com.eeduspace.management.persist.enumeration.RoleEnum.Status;
import com.eeduspace.management.persist.enumeration.UserEnum;
import com.eeduspace.management.rescode.ResponseCode;
import com.eeduspace.management.rescode.ResponseItem;
import com.eeduspace.management.service.ManagerService;
import com.eeduspace.management.service.PermissionService;
import com.eeduspace.management.service.RoleService;
import com.eeduspace.management.service.SmsService;
import com.eeduspace.management.util.SMSUtil;
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
	private static final String LOGIN_URL = "/login.jsp";
	@Inject
	private ManagerService managerService;
	@Inject
	private RoleService roleService;
	@Inject
	private PermissionService permissionService;
	@Inject
	private SmsService smsService;
	@Inject
	private SMSUtil smsUtil;
	@Value("${cibn.sms.sendType}")
    private String sms_sendType;

	/**查询管理员列表分页
	 * @return
	 */
	@RequestMapping(value="/manageList",method=RequestMethod.POST)
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
	
	/**跳转到新增管理员界面
	 * @return
	 */
	@RequestMapping(value="/manageSkip",method=RequestMethod.POST)
	@ResponseBody
	public ResponseItem manageSkipSave(HttpServletRequest request,ManagerModel managerModel){
		logger.info("HttpServletRequest: ContextPath:{},RequestURI:{},requestParam{}", request.getContextPath(), request.getRequestURI(),gson.toJson(managerModel));
		try {
			ResponseItem responseItem = new ResponseItem();
			if (org.springframework.util.StringUtils.isEmpty(managerModel.getOtherStatus())) {
				managerModel.setOtherStatus(Status.Enable);
			}
			List<RoleModel> roleModels = roleService.getRoleModels(String.valueOf(managerModel.getOtherStatus()));
			responseItem.setData(roleModels);
			return responseItem;
		} catch (Exception e) {
			logger.error("manageListPage  Exception:", e);
			return ResponseItem.responseWithName(new ResponseItem(), ResponseCode.SERVICE_ERROR.toString(), "manageListPage exception");
		}
	}
	

	/**增加管理员
	 * @return
	 */
	@RequestMapping(value="/manageSave",method=RequestMethod.POST)
	@ResponseBody
	public ResponseItem managerSave(HttpServletRequest request,ManagerModel managerModel){
		logger.info("HttpServletRequest: ContextPath:{},RequestURI:{},requestParam{}", request.getContextPath(), request.getRequestURI(),gson.toJson(managerModel));
		try {
			if (StringUtils.isBlank(managerModel.getName())) {
				logger.error("managerSave ExceptionrequestId："+"requestId,"+ResponseCode.PARAMETER_MISS.toString() + ".managerModel.getName");
				return ResponseItem.responseWithName(new ResponseItem(), ResponseCode.PARAMETER_MISS.toString(), ".managerModel.getName");
			}
			if (StringUtils.isBlank(managerModel.getPassword())) {
				logger.error("managerSave ExceptionrequestId："+"requestId,"+ResponseCode.PARAMETER_MISS.toString() + ".managerModel.getPassword");
				return ResponseItem.responseWithName(new ResponseItem(), ResponseCode.PARAMETER_MISS.toString(), ".managerModel.getPassword");
			}
			if (StringUtils.isBlank(managerModel.getrUuid())) {
				logger.error("managerSave ExceptionrequestId："+"requestId,"+ResponseCode.PARAMETER_MISS.toString() + ".managerModel.getrUuid");
				return ResponseItem.responseWithName(new ResponseItem(), ResponseCode.PARAMETER_MISS.toString(), ".managerModel.getrUuid");
			}
			if (StringUtils.isBlank(managerModel.getrName())) {
				logger.error("managerSave ExceptionrequestId："+"requestId,"+ResponseCode.PARAMETER_MISS.toString() + ".managerModel.getrName");
				return ResponseItem.responseWithName(new ResponseItem(), ResponseCode.PARAMETER_MISS.toString(), ".managerModel.getrName");
			}
			if (org.springframework.util.StringUtils.isEmpty(managerModel.getType())) {
				logger.error("managerSave ExceptionrequestId："+"requestId,"+ResponseCode.PARAMETER_MISS.toString() + ".managerModel.getType");
				return ResponseItem.responseWithName(new ResponseItem(), ResponseCode.PARAMETER_MISS.toString(), ".managerModel.getType");
			}
			ManagerModel model2 = managerService.getManager(managerModel.getName());
			if (StringUtils.isNotBlank(model2.getUuid())) {
				logger.error("managerSave ExceptionrequestId："+"requestId,"+ResponseCode.RESOURCE_INUSE.toString() + ".managerModel.getName");
				return ResponseItem.responseWithName(new ResponseItem(), ResponseCode.RESOURCE_INUSE.toString(), ".managerModel.getName");
			}
			ResponseItem responseItem = new ResponseItem();
			managerModel.setPassword(Digest.md5Digest(managerModel.getPassword()));
			managerModel.setIsFirst(true);
			managerModel.setStatus(UserEnum.Status.Enable);
			managerModel.setIsDel(false);
			ManagerModel model = managerService.saveOrReplaceManager(managerModel);
			responseItem.setData(model);
			return responseItem;
		} catch (Exception e) {
			logger.error("managerSave  Exception:", e);
			return ResponseItem.responseWithName(new ResponseItem(), ResponseCode.SERVICE_ERROR.toString(), "managerSave exception");
		}
	}
	
	/**修改管理员角色,状态（停用，启用）；删除状态；密码修改
	 * @return
	 */
	@RequestMapping(value="/manageReplace",method=RequestMethod.POST)
	@ResponseBody
	public ResponseItem managerReplace(HttpServletRequest request,ManagerModel managerModel){
		logger.info("HttpServletRequest: ContextPath:{},RequestURI:{},requestParam{}", request.getContextPath(), request.getRequestURI(),gson.toJson(managerModel));
		try {
			if (StringUtils.isBlank(managerModel.getUuid())) {
				logger.error("managerReplace ExceptionrequestId："+"requestId,"+ResponseCode.PARAMETER_MISS.toString() + ".managerModel.getUuid");
				return ResponseItem.responseWithName(new ResponseItem(), ResponseCode.PARAMETER_MISS.toString(), ".managerModel.getUuid");
			}
			/*if (org.springframework.util.StringUtils.isEmpty(managerModel.getrUuid())) {
				logger.error("managerReplace ExceptionrequestId："+"requestId,"+ResponseCode.PARAMETER_MISS.toString() + ".managerModel.getrUuid");
				return ResponseItem.responseWithName(new ResponseItem(), ResponseCode.PARAMETER_MISS.toString(), ".managerModel.getrUuid");
			}
			if (org.springframework.util.StringUtils.isEmpty(managerModel.getrName())) {
				logger.error("managerReplace ExceptionrequestId："+"requestId,"+ResponseCode.PARAMETER_MISS.toString() + ".managerModel.getrUuid");
				return ResponseItem.responseWithName(new ResponseItem(), ResponseCode.PARAMETER_MISS.toString(), ".managerModel.getrUuid");
			}
			if (org.springframework.util.StringUtils.isEmpty(managerModel.getType())) {
				logger.error("managerReplace ExceptionrequestId："+"requestId,"+ResponseCode.PARAMETER_MISS.toString() + ".managerModel.getType");
				return ResponseItem.responseWithName(new ResponseItem(), ResponseCode.PARAMETER_MISS.toString(), ".managerModel.getType");
			}*/
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
			String code = smsUtil.send(managerModel.getPhone(), sms_sendType);
			SmsModel smsModel = new SmsModel();
			smsModel.setPhone(managerModel.getPhone());
			smsModel.setSmsCode(code);
			//存入本地数据库，用来对比  验证码是否正确
			smsModel = smsService.saveCode(smsModel);
			ResponseItem responseItem = new ResponseItem();
			responseItem.setData(smsModel);
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
			if (!StringUtils.isEmpty(managerModel.getPassword()) && !StringUtils.isEmpty(managerModel.getOldPassword())) {
				logger.error("validatePassword ExceptionrequestId："+"requestId,"+ResponseCode.PARAMETER_ERROR.toString() + ".managerModel.PARAMETER");
				return ResponseItem.responseWithName(new ResponseItem(), ResponseCode.PARAMETER_ERROR.toString(), ".managerModel.PARAMETER");
			}
			Boolean flag = null;
			if (!StringUtils.isBlank(managerModel.getPassword())) {
				//新密码验证
				managerModel.setPassword(Digest.md5Digest(managerModel.getPassword()));
				flag = managerService.validatePassword(managerModel);
			}
			if(!StringUtils.isBlank(managerModel.getOldPassword())){
				//旧密码验证
				managerModel.setOldPassword(Digest.md5Digest(managerModel.getOldPassword()));
				flag = managerService.validatePassword(managerModel);
			}
			ResponseItem responseItem = new ResponseItem();
			responseItem.setData(flag);
			return responseItem;
		} catch (Exception e) {
			logger.error("validatePassword  Exception:", e);
			return ResponseItem.responseWithName(new ResponseItem(), ResponseCode.SERVICE_ERROR.toString(), "validatePassword exception");
		}
	}
	
	/**修改管理员密码
	 * @return
	 */
	/*@RequestMapping(value="/pwdChange",method=RequestMethod.POST)
	@ResponseBody
	public ResponseItem pwdChange(HttpServletRequest request,ManagerModel managerModel){
		logger.info("HttpServletRequest: ContextPath:{},RequestURI:{},requestParam{}", request.getContextPath(), request.getRequestURI(),gson.toJson(managerModel));
		try {
			if (StringUtils.isBlank(managerModel.getUuid())) {
				logger.error("pwdChange ExceptionrequestId："+"requestId,"+ResponseCode.PARAMETER_MISS.toString() + ".managerModel.getUuid");
				return ResponseItem.responseWithName(new ResponseItem(), ResponseCode.PARAMETER_MISS.toString(), ".managerModel.getUuid");
			}
			if (StringUtils.isBlank(managerModel.getPassword())) {
				logger.error("pwdChange ExceptionrequestId："+"requestId,"+ResponseCode.PARAMETER_MISS.toString() + ".managerModel.getPassword");
				return ResponseItem.responseWithName(new ResponseItem(), ResponseCode.PARAMETER_MISS.toString(), ".managerModel.getPassword");
			}
			String pwd = Digest.md5Digest(managerModel.getPassword());
			managerModel.setPassword(pwd);
			ManagerModel model = managerService.saveOrReplaceManager(managerModel);
			ResponseItem responseItem = new ResponseItem();
			responseItem.setData(model);
			return responseItem;
		} catch (Exception e) {
			logger.error("pwdChange  Exception:", e);
			return ResponseItem.responseWithName(new ResponseItem(), ResponseCode.SERVICE_ERROR.toString(), "pwdChange exception");
		}
	}*/

	
	
	/**
	 * 登录
	 * Author： zhuchaowei
	 * e-mail:zhuchaowei@e-eduspace.com
	 * 2016年6月14日 下午5:03:57
	 * @param loginModel
	 * @param result
	 * @param session
	 * @param httpServletRequest
	 * @param model
	 * @return
	 * @throws Exception
	 */
    @RequestMapping(value = "/login")
    @ResponseBody
    public ResponseItem login( LoginModel loginModel, BindingResult result, HttpSession session, HttpServletRequest httpServletRequest, ModelMap model) throws Exception {
        ResponseItem ri = new ResponseItem();
        if (StringUtils.isBlank(loginModel.getUser())) {
			logger.error("login ExceptionrequestId："+"requestId,"+ResponseCode.PARAMETER_MISS.toString() + ".loginModel.getUser");
			return ResponseItem.responseWithName(new ResponseItem(), ResponseCode.PARAMETER_MISS.toString(), ".loginModel.getUser");
		}
        if (StringUtils.isBlank(loginModel.getPassword())) {
			logger.error("login ExceptionrequestId："+"requestId,"+ResponseCode.PARAMETER_MISS.toString() + ".loginModel.getPassword");
			return ResponseItem.responseWithName(new ResponseItem(), ResponseCode.PARAMETER_MISS.toString(), ".loginModel.getPassword");
		}
        try {
            logger.debug("------------------login----user:{}", loginModel.getUser());
            logger.debug("------------------login----pws:{}", loginModel.getPassword());
           ManagerModel managerModel= managerService.getByUserName(loginModel.getUser());
           if(managerModel==null){
   				return ResponseItem.responseWithName(new ResponseItem(), ResponseCode.RESOURCE_NOTFOUND.toString(), ".getuserbyname");
           }
           RoleModel roleModel = roleService.getRoleModel(managerModel.getrUuid(), null);
           managerModel.setRoleModel(roleModel);
           if(!managerModel.getPassword().equals(Digest.md5Digest(loginModel.getPassword()))){
  				return ResponseItem.responseWithName(new ResponseItem(), ResponseCode.PARAMETER_INVALID.toString(), ".password");
           }
            //实例化SessionItem 用于需要保存的用户信息
            SessionItem sessionItem = new SessionItem(managerModel.getId(), managerModel.getName(), managerModel.getEmail(), managerModel.getPhone()
                    ,managerModel.getAccessKey(),managerModel.getSecretKey(),managerModel.getrUuid(),managerModel.getType().toString(),managerModel.getIsFirst());
            //将用户信息保存到session中
            session.setAttribute(Constants.SESSION_ID, sessionItem);
            session.setAttribute("userPhone", managerModel.getPhone());
            session.setAttribute("username", managerModel.getName());
            logger.debug("--->"+managerModel.getType().toString());
            session.setAttribute("roleUUID", managerModel.getrUuid());
            session.setAttribute("roleType", managerModel.getType());
            session.setAttribute("isFirst", managerModel.getIsFirst());
            session.setAttribute("email", managerModel.getEmail());
            session.setAttribute("roleModel", managerModel.getRoleModel());
            session.setAttribute("managerPermission", roleModel.getPermissionModels());
            return ri;
        } catch (Exception e) {
            logger.error("userLogin Exception:", e);
            return ResponseItem.responseWithName(ri, ResponseCode.SERVICE_ERROR.toString(), "userLogin exception");
        }
    }

    /**
     * 用户登出
     *
     * @return ResponseItem
     * @throws Exception
     */
    @RequestMapping(value = "/logout")
    public ModelAndView logout(@ModelAttribute(Constants.SESSION_ID) SessionItem si, SessionStatus sessionStatus, HttpSession session, HttpServletResponse res, HttpServletRequest request) throws Exception {
    	sessionStatus.setComplete();
        session.removeAttribute("userPhone");
        session.removeAttribute("username");
        session.removeAttribute("roleUUID");
        session.removeAttribute("roleType");
        session.removeAttribute("isFirst");
        session.removeAttribute("email");
        session.removeAttribute(Constants.SESSION_ID);
        session.invalidate();
        //跳转到登录界面
        res.sendRedirect(request.getContextPath()+LOGIN_URL);
        return null;
    }

}
