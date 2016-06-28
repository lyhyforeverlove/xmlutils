package com.eeduspace.management.controller;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
import com.eeduspace.management.rescode.ResponseCode;
import com.eeduspace.management.rescode.ResponseItem;
import com.eeduspace.management.service.ManagerService;
import com.eeduspace.management.service.RoleService;
import com.eeduspace.uuims.comm.util.base.encrypt.Digest;

/**
 * @author songwei
 * 	Date 2016-06-20
 *	Describe 登录登出相关
 */
@Controller
@RequestMapping("/inORout")
@SessionAttributes(Constants.SESSION_ID)
public class ManagerLoginOrOutController {
	
	private final Logger logger = LoggerFactory.getLogger(ManagerLoginOrOutController.class);
	private static final String LOGIN_URL = "/login.html";
	
	@Inject
	private ManagerService managerService;
	@Inject
	private RoleService roleService;
	
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
    @RequestMapping(value = "/login",method=RequestMethod.POST)
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
           ManagerModel managerModel= managerService.getLoginManager(loginModel.getUser());
           if(StringUtils.isBlank(managerModel.getUuid())){
   				return ResponseItem.responseWithName(new ResponseItem(), ResponseCode.RESOURCE_NOTFOUND.toString(), ".no user");
           }
           if(!managerModel.getPassword().equals(Digest.md5Digest(loginModel.getPassword()))){
  				return ResponseItem.responseWithName(new ResponseItem(), ResponseCode.PARAMETER_INVALID.toString(), ".password");
           }
           RoleModel roleModel = roleService.getRoleModel(managerModel.getrUuid(), null);
           managerModel.setRoleModel(roleModel);
            //实例化SessionItem 用于需要保存的用户信息
            SessionItem sessionItem = new SessionItem(managerModel.getId(),managerModel.getUuid(), managerModel.getName()
            		,managerModel.getRealName(), managerModel.getEmail(), managerModel.getPhone(),managerModel.getAccessKey()
            		,managerModel.getSecretKey(),managerModel.getrUuid(),managerModel.getIsFirst(),managerModel.getRoleModel());
            //将用户信息保存到session中
            session.setAttribute(Constants.SESSION_ID, sessionItem);
            session.setAttribute("userId", managerModel.getId());
            session.setAttribute("userPhone", managerModel.getPhone());
            session.setAttribute("userName", managerModel.getName());
            session.setAttribute("uuid", managerModel.getUuid());
            session.setAttribute("realName", managerModel.getRealName());
            logger.debug("--->"+managerModel.getrName());
            session.setAttribute("roleUUID", managerModel.getrUuid());
            session.setAttribute("roleType", managerModel.getType());
            session.setAttribute("isFirst", managerModel.getIsFirst());
            session.setAttribute("email", managerModel.getEmail());
            session.setAttribute("roleModel", managerModel.getRoleModel());
//            session.setAttribute("managerPermission", roleModel.getPermissionModels());
            ri.setData(sessionItem);
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
    @RequestMapping(value = "/logout",method=RequestMethod.POST)
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
