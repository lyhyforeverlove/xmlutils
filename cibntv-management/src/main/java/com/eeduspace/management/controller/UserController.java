package com.eeduspace.management.controller;

import java.io.IOException;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

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

import com.eeduspace.management.convert.CIBNManagementConvert;
import com.eeduspace.management.model.UserModel;
import com.eeduspace.management.model.UserQueryModel;
import com.eeduspace.management.persist.po.UserPo;
import com.eeduspace.management.rescode.ResponseCode;
import com.eeduspace.management.rescode.ResponseItem;
import com.eeduspace.management.service.UserService;
import com.eeduspace.management.util.ExcelExportUtil;
import com.eeduspace.uuims.comm.util.base.DateUtils;
import com.google.gson.Gson;
/**
 * 用户控制层
 * @author zhuchaowei
 * 2016年6月1日
 * Description
 */
@Controller
@RequestMapping("/user")
public class UserController {
	private final Logger logger = LoggerFactory.getLogger(UserController.class);
	private Gson gson=new Gson();
	@Inject
	private UserService userService;
	/**
	 * 获取用户分页列表
	 * Author： zhuchaowei
	 * e-mail:zhuchaowei@e-eduspace.com
	 * 2016年6月12日 上午10:09:01
	 * @param userQueryModel
	 * @return
	 */
	@RequestMapping(value="/userList",method=RequestMethod.POST)
	@ResponseBody
	public ResponseItem getUserList(@ModelAttribute UserQueryModel userQueryModel){
		logger.debug("getUserList request param:{}",gson.toJson(userQueryModel));
		ResponseItem item=new ResponseItem();
		if(userQueryModel.getSize()==null){
			item.setMessage("size参数丢失");
			item.setHttpCode(ResponseCode.PARAMETER_MISS.toString());
			return item;
		}
		if(userQueryModel.getCurrentPage()==null){
			item.setMessage("CurrentPage参数丢失");
			item.setHttpCode(ResponseCode.PARAMETER_MISS.toString());
			return item;
		}
		try {
			Sort sort = new Sort(Sort.Direction.DESC,"createDate");
			Pageable pageable=new PageRequest(userQueryModel.getCurrentPage()-1, userQueryModel.getSize(),sort);
			Page<UserPo> pageList=userService.findAll(pageable,userQueryModel);
			List<UserPo> userList=pageList.getContent();
			List<UserModel> userModels=new ArrayList<>();
			for (UserPo userPo : userList) {
				UserModel userModel=CIBNManagementConvert.fromUserPo(userPo);
				userModels.add(userModel);
			}
			logger.info("getNumber:{},getNumberOfElements:{},getSize{},getTotalElements:{},getTotalPages:{}",pageList.getNumber(),pageList.getNumberOfElements(),pageList.getSize(),pageList.getTotalElements(),pageList.getTotalPages());
			item.setTotalRecords(pageList.getTotalElements());
			item.setCurrentPage(pageList.getNumber()+1);
			item.setTotalPage(pageList.getTotalPages());
			item.setSize(pageList.getSize());
			item.setMessage("success");
			item.setDatas(userModels);
			return item;
		} catch (Exception e) {
			logger.error("getUserList error:{}",e);
            return ResponseItem.responseWithName(new ResponseItem(), ResponseCode.SERVICE_ERROR.toString(), "getUserList exception");
		}
		
	}
	/**
	 * 获取用户详情信息
	 * Author： zhuchaowei
	 * e-mail:zhuchaowei@e-eduspace.com
	 * 2016年6月12日 上午10:09:16
	 * @param userCode
	 * @return
	 */
	@RequestMapping(value="/user_info",method=RequestMethod.POST)
	@ResponseBody
	public ResponseItem getUserInfo(@RequestParam String userCode){
		ResponseItem item=new ResponseItem();
		logger.debug("getUserInfo request param:{}",userCode);
		try {
			UserPo userPo=userService.findByUserCode(userCode);
			UserModel userModel=CIBNManagementConvert.fromUserPo(userPo);
			item.setMessage("success");
			item.setData(userModel);
			return item;
		} catch (Exception e) {
			logger.error("getUserInfo error:{}",e);
            return ResponseItem.responseWithName(new ResponseItem(), ResponseCode.SERVICE_ERROR.toString(), "userPo exception");
		}
	}
	/**
	 * 用户拉黑操作
	 * Author： zhuchaowei
	 * e-mail:zhuchaowei@e-eduspace.com
	 * 2016年6月12日 上午10:09:32
	 * @param userCode
	 * @param isBlacklist
	 * @return
	 */
	@RequestMapping(value="/user_blacklist",method=RequestMethod.POST)
	@ResponseBody
	public ResponseItem userBlacklist(@RequestParam String userCode,@RequestParam Boolean isBlacklist){
		logger.debug("getUserInfo request param: userCode:{},isBlacklist:{}",userCode,isBlacklist);
		ResponseItem item=new ResponseItem();
		if(isBlacklist==null){
			item.setMessage("isBlacklist参数丢失");
			item.setHttpCode(ResponseCode.PARAMETER_MISS.toString());
			return item;
		}
		if(StringUtils.isBlank(userCode)){
			item.setMessage("UserCode参数丢失");
			item.setHttpCode(ResponseCode.PARAMETER_MISS.toString());
			return item;
		}
		try {
			UserPo userPo=userService.changeBlacklist(userCode, isBlacklist);
			if(userPo==null){
				item.setMessage("用户不存在");
				item.setHttpCode(ResponseCode.RESOURCE_NOTFOUND.toString());
			}else{
				item.setMessage("success");
			}
			return item;
		} catch (Exception e) {
			logger.error("userBlacklist error:{}",e);
            return ResponseItem.responseWithName(new ResponseItem(), ResponseCode.SERVICE_ERROR.toString(), "userBlacklist exception");
		}
		
	}
	/**
	 * 导出用户excel
	 * Author： zhuchaowei
	 * e-mail:zhuchaowei@e-eduspace.com
	 * 2016年6月12日 上午10:10:11
	 * @param response
	 * @param userQueryModel
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value="/user_excel_export")
	@ResponseBody
	public ResponseItem userExcelExport(HttpServletRequest request, HttpServletResponse response,@ModelAttribute UserQueryModel userQueryModel) throws IOException{
		logger.debug("userQueryModel:{}",gson.toJson(userQueryModel));
		ResponseItem item=new ResponseItem();
		Pageable pageable=new PageRequest(0, Integer.MAX_VALUE);
		try {
			OutputStream outputStream = response.getOutputStream(); 
			//String []tableHeader={"用户名","手机号","是否VIP","注册时间"};
			String fileName ="用户信息_" + DateUtils.toString(new Date(), DateUtils.DATE_FORMAT_DATEONLY) ;  
			String agent = request.getHeader("USER-AGENT").toLowerCase();
		    //根据浏览器类型处理文件名称
			
		    if(agent.indexOf("msie")>-1){
		      //extfilename = Tools.toUtf8String(extfilename);
		    	fileName = java.net.URLEncoder.encode(fileName, "UTF-8");
		    }
		    else{  //firefoxfari不转码
		    	fileName = new String(fileName.getBytes("UTF-8"), "ISO8859-1");
		    }
			
			response.setHeader("Content-disposition", "attachment; filename=" + fileName + ".xlsx");// 组装附件名称和格式  
			Page<UserPo> pageList=userService.findAll(pageable,userQueryModel);
			List<UserModel> userModels=new ArrayList<>();
			for (UserPo userPo : pageList.getContent()) {
				UserModel userModel=CIBNManagementConvert.fromUserPo(userPo); 
				userModels.add(userModel);
			}
			ExcelExportUtil.exportExcel("用户信息导出", UserModel.class ,userModels, outputStream);
			return item;
		} catch (Exception e) {
			logger.error("userExcelExport error:{}",e);
            return ResponseItem.responseWithName(new ResponseItem(), ResponseCode.SERVICE_ERROR.toString(), "userExcelExport exception");
		}
	}
}
