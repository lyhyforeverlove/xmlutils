package com.eeduspace.management.controller;

import java.util.ArrayList;
import java.util.List;

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
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttributes;

import com.eeduspace.management.comm.Constants;
import com.eeduspace.management.model.ManagerModel;
import com.eeduspace.management.model.PermissionModel;
import com.eeduspace.management.model.RoleModel;
import com.eeduspace.management.persist.enumeration.UserEnum;
import com.eeduspace.management.persist.enumeration.RoleEnum.Status;
import com.eeduspace.management.rescode.ResponseCode;
import com.eeduspace.management.rescode.ResponseItem;
import com.eeduspace.management.service.ManagerService;
import com.eeduspace.management.service.PermissionService;
import com.eeduspace.management.service.RoleService;
import com.eeduspace.uuims.comm.util.base.encrypt.Digest;
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
	
	@Inject
	private ManagerService managerService;
	
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
			if (StringUtils.isBlank(roleModel.getName())) {
				logger.error("roleSave ExceptionrequestId："+"requestId,"+ResponseCode.PARAMETER_MISS.toString() + ".roleModel.getName");
				return ResponseItem.responseWithName(new ResponseItem(), ResponseCode.PARAMETER_MISS.toString(), ".roleModel.getName");
			}
			if (org.springframework.util.StringUtils.isEmpty(ids) || ids.length <= 0) {
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
	
	
	
	/**查询管理员列表分页
	 * @return
	 */
	@RequestMapping(value="/manageList",method=RequestMethod.POST)
	@ResponseBody
	public ResponseItem manageListPage(HttpServletRequest request,ManagerModel managerModel){
		logger.info("HttpServletRequest: ContextPath:{},RequestURI:{},requestParam{}", request.getContextPath(), request.getRequestURI(),gson.toJson(managerModel));
		try {
			if (managerModel.getCurrentPage() < 1) {
				logger.error("manageListPage ExceptionrequestId："+"requestId,"+ResponseCode.PARAMETER_MISS.toString() + ".managerModel.getCurrentPage < 1");
				return ResponseItem.responseWithName(new ResponseItem(), ResponseCode.PARAMETER_MISS.toString(), ".managerModel.getCurrentPage < 1");
			}
			ResponseItem responseItem = new ResponseItem();
			Sort sort = new Sort(Sort.Direction.DESC, "createDate");
			Pageable pageable = new PageRequest((managerModel.getCurrentPage()-1),managerModel.getSize(),sort);
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
			/*if (org.springframework.util.StringUtils.isEmpty(managerModel.getType())) {
				logger.error("managerSave ExceptionrequestId："+"requestId,"+ResponseCode.PARAMETER_MISS.toString() + ".managerModel.getType");
				return ResponseItem.responseWithName(new ResponseItem(), ResponseCode.PARAMETER_MISS.toString(), ".managerModel.getType");
			}*/
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
	
	/**修改管理员角色：状态（停用，启用）；删除状态
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
			if (StringUtils.isBlank(managerModel.getrUuid())) {
				logger.error("managerReplace ExceptionrequestId："+"requestId,"+ResponseCode.PARAMETER_MISS.toString() + ".managerModel.getrUuid");
				return ResponseItem.responseWithName(new ResponseItem(), ResponseCode.PARAMETER_MISS.toString(), ".managerModel.getrUuid");
			}
			if (StringUtils.isBlank(managerModel.getrName())) {
				logger.error("managerReplace ExceptionrequestId："+"requestId,"+ResponseCode.PARAMETER_MISS.toString() + ".managerModel.getrName");
				return ResponseItem.responseWithName(new ResponseItem(), ResponseCode.PARAMETER_MISS.toString(), ".managerModel.getrName");
			}
			if (StringUtils.isNotBlank(managerModel.getPassword())) {
				String pwd = Digest.md5Digest(managerModel.getPassword());
				managerModel.setPassword(pwd);
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

}
