package com.eeduspace.management.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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
import com.eeduspace.uuims.comm.util.HTTPClientUtils;
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
	@RequestMapping(value="/userList",method=RequestMethod.POST)
	@ResponseBody
	public ResponseItem getUserList(@ModelAttribute UserQueryModel userQueryModel){
		logger.debug("getUserList request param:{}",gson.toJson(userQueryModel));
		ResponseItem item=new ResponseItem();
		try {
			Pageable pageable=new PageRequest(userQueryModel.getCurrentPage(), userQueryModel.getSize());
			Page<UserPo> pageList=userService.findAll(pageable,userQueryModel);
			List<UserPo> userList=pageList.getContent();
			List<UserModel> userModels=new ArrayList<>();
			for (UserPo userPo : userList) {
				UserModel userModel=CIBNManagementConvert.fromUserPo(userPo);
				userModels.add(userModel);
			}
			logger.info("getNumber:{},getNumberOfElements:{},getSize{},getTotalElements:{},getTotalPages:{}",pageList.getNumber(),pageList.getNumberOfElements(),pageList.getSize(),pageList.getTotalElements(),pageList.getTotalPages());
			item.setTotalRecords(pageList.getTotalElements());
			item.setCurrentPage(pageList.getNumber());
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
	@RequestMapping(value="/user_blacklist",method=RequestMethod.POST)
	@ResponseBody
	public ResponseItem userBlacklist(@RequestParam String userCode,@RequestParam Boolean isBlacklist){
		logger.debug("getUserInfo request param: userCode:{},isBlacklist:{}",userCode,isBlacklist);
		ResponseItem item=new ResponseItem();
		try {
			UserPo userPo=userService.changeBlacklist(userCode, isBlacklist);
			if(userPo==null){
				item.setMessage("用户不存在");
				item.setHttpCode(ResponseCode.RESOURCE_NOTFOUND.toString());
			}else{
				item.setMessage("success");
				item.setData(userPo);
			}
			return item;
		} catch (Exception e) {
			logger.error("userBlacklist error:{}",e);
            return ResponseItem.responseWithName(new ResponseItem(), ResponseCode.SERVICE_ERROR.toString(), "userBlacklist exception");
		}
		
	}
	
}
