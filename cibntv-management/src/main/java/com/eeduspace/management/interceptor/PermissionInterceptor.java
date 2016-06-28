package com.eeduspace.management.interceptor;

import java.util.Date;
import java.util.List;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.util.StringUtils;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import com.eeduspace.management.bean.SessionItem;
import com.eeduspace.management.comm.Constants;
import com.eeduspace.management.model.PermissionModel;
import com.eeduspace.management.model.RoleModel;
import com.eeduspace.management.persist.enumeration.RoleEnum;
import com.eeduspace.management.persist.po.ManagerLogPo;
import com.eeduspace.management.rescode.ResponseItem;
import com.eeduspace.management.service.ManagerLogService;
import com.google.gson.Gson;

public class PermissionInterceptor extends HandlerInterceptorAdapter{
	private final Logger log = LoggerFactory.getLogger(PermissionInterceptor.class);  
	private static Gson gson = new Gson();
	private static final String LOGIN_URL = "/login.html";
	private static final String ISFIRST_URL = "isFirst.html";
	
	@Inject
	private ManagerLogService logService;
	/**  
     * 在业务处理器处理请求之前被调用  
     * 如果返回false  
     *     从当前的拦截器往回执行所有拦截器的afterCompletion(),再退出拦截器链 
     * 如果返回true  
     *    执行下一个拦截器,直到所有的拦截器都执行完毕  
     *    再执行被拦截的Controller  
     *    然后进入拦截器链,  
     *    从最后一个拦截器往回执行所有的postHandle()  
     *    接着再从最后一个拦截器往回执行所有的afterCompletion()  
     */
	@Override
	public boolean preHandle(HttpServletRequest request,HttpServletResponse response, Object handler) throws Exception {
		log.debug("开始拦截-------------");
		log.debug("方法名："+request.getMethod() + "---" + "请求uri：" + request.getRequestURI() + "---" +
				"请求方地址："+ request.getRemoteAddr() + "---" + request.getRequestedSessionId());
		HttpSession session = request.getSession();
//		Object obj = session.getAttribute(Constants.SESSION_ID);
//		response.sendRedirect(request.getContextPath() + LOGIN_URL);
//		SessionItem si = (SessionItem) session.getAttribute(Constants.SESSION_ID);
		ResponseItem ri = new ResponseItem();
		if (session.getAttribute("roleUUID") != null && session.getAttribute("userName") != null) {
			Boolean flag = false;
			Boolean isFirst = (Boolean) session.getAttribute("isFirst");
			//第一次登陆跳转到  填写手机号界面
			if (isFirst) {
				ri.setData(ISFIRST_URL);
				response.getWriter().print(gson.toJson(ri));
				return false;
			}
			RoleModel roleModel = (RoleModel) session.getAttribute("roleModel");
			if (!StringUtils.isEmpty(roleModel) && roleModel.getStatus().equals(String.valueOf(RoleEnum.Status.Enable))) {
				//其他验证权限
				List<PermissionModel> pModels = roleModel.getPermissionModels();
				if (!StringUtils.isEmpty(pModels) && pModels.size() > 0) {
					String uri = request.getRequestURI();
					for (PermissionModel pm : pModels) {
						System.out.println(pm.getPerUrl());
						if (uri.contains(pm.getPerUrl())) {
							flag = true;
							break;
						}
					}
				}
			}
			if (!flag) {
				ri.setData(flag);
				ri.setMessage("No Permission To Operate");
				ManagerLogPo po = new  ManagerLogPo();
				po.setManagerId((Long)session.getAttribute("userId"));
				po.setResourceId((String)session.getAttribute("uuid"));
				po.setSourceIp(request.getRemoteAddr());
				po.setModule((String)session.getAttribute("userName"));
				po.setDescription(request.getMethod());
				po.setAction(request.getRequestURI());
				po.setResult(false);
				po.setCreateDate(new Date());
				logService.save(po);
				response.getWriter().print(gson.toJson(ri));
				return false;
			}
		}else {
			ri.setData(LOGIN_URL);
			response.getWriter().print(gson.toJson(ri));
			return false;
		}
		ManagerLogPo po = new  ManagerLogPo();
		po.setManagerId((Long)session.getAttribute("userId"));
		po.setResourceId((String)session.getAttribute("uuid"));
		po.setSourceIp(request.getRemoteAddr());
		po.setModule((String)session.getAttribute("userName"));
		po.setDescription(request.getMethod());
		po.setAction(request.getRequestURI());
		po.setResult(true);
		po.setCreateDate(new Date());
		logService.save(po);
		return true;
	}
	
	/** 
     * 在业务处理器处理请求执行完成后,生成视图之前执行的动作    
     * 可在modelAndView中加入数据，比如当前时间 
     */
	@Override
	public void postHandle(HttpServletRequest request,HttpServletResponse response, Object handler,ModelAndView modelAndView) throws Exception {
		
	}
	
	/**  
     * 在DispatcherServlet完全处理完请求后被调用,可用于清理资源等   
     *   
     * 当有拦截器抛出异常时,会从当前拦截器往回执行所有的拦截器的afterCompletion()  
     */ 
	@Override
	public void afterCompletion(HttpServletRequest request,HttpServletResponse response, Object handler, Exception ex) throws Exception {
		
	}

}
