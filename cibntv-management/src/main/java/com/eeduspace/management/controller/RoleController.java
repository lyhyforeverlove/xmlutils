package com.eeduspace.management.controller;

import java.util.List;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttributes;

import com.eeduspace.management.comm.Constants;
import com.eeduspace.management.model.PermissionModel;
import com.eeduspace.management.model.RoleModel;
import com.eeduspace.management.rescode.ResponseCode;
import com.eeduspace.management.rescode.ResponseItem;
import com.eeduspace.management.service.PermissionService;
import com.eeduspace.management.service.RoleService;
import com.google.gson.Gson;


/**角色操作
 * @author songwei
 * @Describe
 * @Date  
 */
@Controller
@RequestMapping("/role")
@SessionAttributes(Constants.SESSION_ID)
public class RoleController {
	private final Logger logger = LoggerFactory.getLogger(RoleController.class);
	private Gson gson = new Gson();
	
	@Inject
	private RoleService roleService;
	@Inject
	private PermissionService permissionService;
	
	
	/**保存角色，并给予权限
	 * @param request
	 * @param roleModel
	 * @return
	 */
	@RequestMapping(value ="/roleSave",method = RequestMethod.POST)
	@ResponseBody
	public ResponseItem roleSave(HttpServletRequest request,@ModelAttribute RoleModel roleModel){
		logger.info("HttpServletRequest: ContextPath:{},RequestURI:{},requestParam{}", request.getContextPath(), request.getRequestURI(),gson.toJson(roleModel));
		try {
			ResponseItem responseItem = new ResponseItem();
			//测试使用
			/*List<PermissionModel> permissionModels = new ArrayList<PermissionModel>();
			permissionModels = ;
			roleModel.setName("test");
			roleModel.setPermissionModels(permissionModels);*/
			if (StringUtils.isEmpty(roleModel.getName())) {
				logger.error("roleSave ExceptionrequestId："+"requestId,"+ResponseCode.PARAMETER_MISS.toString() + ".roleModel.getName");
				return ResponseItem.responseWithName(new ResponseItem(), ResponseCode.PARAMETER_MISS.toString(), ".roleModel.getName");
			}
			if (roleModel.getPermissionModels().size() <= 0) {
				logger.error("roleSave ExceptionrequestId："+"requestId,"+ResponseCode.PARAMETER_MISS.toString() + ".roleModel.getPermissionModels");
				return ResponseItem.responseWithName(new ResponseItem(), ResponseCode.PARAMETER_MISS.toString(), ".roleModel.getPermissionModels");
			}
			
			RoleModel rm= roleService.saveModel(roleModel);
			responseItem.setData(rm);
			return responseItem;
		} catch (Exception e) {
			 logger.error("roleSave  Exception:", e);
	         return ResponseItem.responseWithName(new ResponseItem(), ResponseCode.SERVICE_ERROR.toString(), "roleSave exception");
		}
	}
	/**新增角色跳转，给予权限列表
	 * @param request
	 * @param roleModel
	 * @return
	 */
	@RequestMapping(value ="/roleSkip",method = RequestMethod.POST)
	@ResponseBody
	public ResponseItem roleSkip(HttpServletRequest request,@ModelAttribute RoleModel roleModel){
		logger.info("HttpServletRequest: ContextPath:{},RequestURI:{},requestParam{}", request.getContextPath(), request.getRequestURI(),gson.toJson(roleModel));
		try {
			ResponseItem responseItem = new ResponseItem();
			List<PermissionModel> permissionModels = permissionService.getPermissionModels(roleModel.getStatus());
			
			responseItem.setData(permissionModels);
			return responseItem;
		} catch (Exception e) {
			 logger.error("roleSkip  Exception:", e);
	         return ResponseItem.responseWithName(new ResponseItem(), ResponseCode.SERVICE_ERROR.toString(), "roleSkip exception");
		}
	}

}
