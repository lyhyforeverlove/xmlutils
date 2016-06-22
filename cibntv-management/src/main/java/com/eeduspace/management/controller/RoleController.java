package com.eeduspace.management.controller;

import java.util.ArrayList;
import java.util.List;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
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
	
	/**角色列表
	 * @param request
	 * @param roleModel
	 * @return
	 */
	@RequestMapping(value ="/roleList",method = RequestMethod.POST)
	@ResponseBody
	public ResponseItem roleListPage(HttpServletRequest request,RoleModel roleModel){
		logger.info("HttpServletRequest: ContextPath:{},RequestURI:{},requestParam{}", request.getContextPath(), request.getRequestURI(),gson.toJson(roleModel));
		try {
			if (roleModel.getCurrentPage() < 1) {
				logger.error("roleListPage ExceptionrequestId："+"requestId,"+ResponseCode.PARAMETER_MISS.toString() + ".roleModel.getCurrentPage < 1");
				return ResponseItem.responseWithName(new ResponseItem(), ResponseCode.PARAMETER_MISS.toString(), ".roleModel.getCurrentPage < 1");
			}
			ResponseItem responseItem = new ResponseItem();
			Sort sort = new Sort(Sort.Direction.DESC, "createDate");
			Pageable pageable = new PageRequest((roleModel.getCurrentPage()-1),roleModel.getSize(),sort);
			Page<RoleModel> managerPage = roleService.getPage(roleModel,pageable);
			responseItem.setData(managerPage);
			return responseItem;
		} catch (Exception e) {
			 logger.error("roleListPage  Exception:", e);
	         return ResponseItem.responseWithName(new ResponseItem(), ResponseCode.SERVICE_ERROR.toString(), "roleListPage exception");
		}
	}
	
	/**保存角色，并给予权限
	 * @param request
	 * @param roleModel
	 * @return
	 */
	@RequestMapping(value ="/roleSave",method = RequestMethod.POST)
	@ResponseBody
	public ResponseItem roleSave(HttpServletRequest request,@ModelAttribute RoleModel roleModel,@RequestParam String[] ids){
		logger.info("HttpServletRequest: ContextPath:{},RequestURI:{},requestParam{}", request.getContextPath(), request.getRequestURI(),gson.toJson(ids));
		try {
			ResponseItem responseItem = new ResponseItem();
			if (StringUtils.isEmpty(roleModel.getName())) {
				logger.error("roleSave ExceptionrequestId："+"requestId,"+ResponseCode.PARAMETER_MISS.toString() + ".roleModel.getName");
				return ResponseItem.responseWithName(new ResponseItem(), ResponseCode.PARAMETER_MISS.toString(), ".roleModel.getName");
			}
			if (StringUtils.isEmpty(ids)) {
				logger.error("roleSave ExceptionrequestId："+"requestId,"+ResponseCode.PARAMETER_MISS.toString() + ".roleModel.getPermissionModels");
				return ResponseItem.responseWithName(new ResponseItem(), ResponseCode.PARAMETER_MISS.toString(), ".roleModel.getPermissionModels");
			}
			List<PermissionModel> pModels2 = new ArrayList<PermissionModel>();
			for (String str : ids) {
				PermissionModel pm = new PermissionModel();
				pm.setUuid(String.valueOf(str));
				pModels2.add(pm);
			}
			roleModel.setPermissionModels(pModels2);
			RoleModel rm= roleService.saveModel(roleModel);
			responseItem.setData(rm);
			return responseItem;
		} catch (Exception e) {
			 logger.error("roleSave  Exception:", e);
	         return ResponseItem.responseWithName(new ResponseItem(), ResponseCode.SERVICE_ERROR.toString(), "roleSave exception");
		}
	}
	
	/**角色详情
	 * @param request
	 * @param roleModel
	 * @return
	 */
	@RequestMapping(value ="/roleDetail",method = RequestMethod.POST)
	@ResponseBody
	public ResponseItem roleDetail(HttpServletRequest request,@ModelAttribute RoleModel roleModel){
		logger.info("HttpServletRequest: ContextPath:{},RequestURI:{},requestParam{}", request.getContextPath(), request.getRequestURI(),gson.toJson(roleModel));
		try {
			if (StringUtils.isEmpty(roleModel.getUuid())) {
				logger.error("roleDetail ExceptionrequestId："+"requestId,"+ResponseCode.PARAMETER_MISS.toString() + ".roleModel.getUuid");
				return ResponseItem.responseWithName(new ResponseItem(), ResponseCode.PARAMETER_MISS.toString(), ".roleModel.getUuid");
			}
			RoleModel rm= roleService.getRoleModel(roleModel.getUuid(), roleModel.getStatus());
			ResponseItem responseItem = new ResponseItem();
			responseItem.setData(rm);
			return responseItem;
		} catch (Exception e) {
			 logger.error("roleDetail  Exception:", e);
	         return ResponseItem.responseWithName(new ResponseItem(), ResponseCode.SERVICE_ERROR.toString(), "roleDetail exception");
		}
	}
	
	/**新增角色跳转，给予权限列表
	 * @param request
	 * @param roleModel
	 * @return
	 */
	@RequestMapping(value ="/roleSkip",method = RequestMethod.POST)
	@ResponseBody
	public ResponseItem roleSkip(HttpServletRequest request,RoleModel roleModel){
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
