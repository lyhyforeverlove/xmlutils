package com.eeduspace.management.controller;

import java.io.IOException;
import java.io.OutputStream;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.inject.Inject;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.eeduspace.management.convert.CIBNManagementConvert;
import com.eeduspace.management.model.DiaginsticExcelModel;
import com.eeduspace.management.model.OrderQueryModel;
import com.eeduspace.management.model.VipOrderExcelModel;
import com.eeduspace.management.model.VipOrderModel;
import com.eeduspace.management.persist.enumeration.BuyTypeEnum;
import com.eeduspace.management.persist.po.VipBuyRecord;
import com.eeduspace.management.rescode.ResponseCode;
import com.eeduspace.management.rescode.ResponseItem;
import com.eeduspace.management.service.UserService;
import com.eeduspace.management.service.VipBuyRecordService;
import com.eeduspace.management.util.ExcelExportUtil;
import com.eeduspace.uuims.comm.util.base.DateUtils;
import com.google.gson.Gson;
/**\
 * 订单控制层
 * @author zhuchaowei
 * 2016年6月1日
 * Description
 */
@Controller
@RequestMapping("/vip_order")
public class VipOrderController {
	private final Logger logger = LoggerFactory.getLogger(VipOrderController.class);
	private Gson gson=new Gson();
	@Inject
	private VipBuyRecordService vipBuyRecordService;
	@Inject
	private UserService userService;
	/**
	 * VIP订单列表
	 * Author： zhuchaowei
	 * e-mail:zhuchaowei@e-eduspace.com
	 * 2016年6月12日 上午10:11:29
	 * @param orderQueryModel
	 * @return
	 */
	@RequestMapping(value="/user_vip_order",method=RequestMethod.POST)
	@ResponseBody
	public ResponseItem userVIPOrderList(@ModelAttribute OrderQueryModel orderQueryModel){
		ResponseItem item=new ResponseItem();
		logger.debug("userOrderList request param:{}",gson.toJson(orderQueryModel));
		if(StringUtils.isBlank(orderQueryModel.getUserCode())){
			item.setMessage("UserCode参数丢失");
			item.setHttpCode(ResponseCode.PARAMETER_MISS.toString());
			return item;
		}
		try {
			List<VipBuyRecord> vipBuyRecords=vipBuyRecordService.findByUserCodeAndIsPay(orderQueryModel.getUserCode(), true,BuyTypeEnum.VIP);

//			UserOrderModel userOrderModel=new UserOrderModel();
//			userOrderModel.setVipOrder(vipBuyRecords);
			item.setMessage("success");
			item.setDatas(vipBuyRecords);
			return item;
		} catch (Exception e) {
			  logger.error("userOrderList  Exception:", e);
	           return ResponseItem.responseWithName(new ResponseItem(), ResponseCode.SERVICE_ERROR.toString(), "userIndex exception");
		}
	}
	
	/**
	 * 诊断订单列表
	 * Author： zhuchaowei
	 * e-mail:zhuchaowei@e-eduspace.com
	 * 2016年6月12日 上午10:11:29
	 * @param orderQueryModel
	 * @return
	 */
	@RequestMapping(value="/user_diagnostic_order",method=RequestMethod.POST)
	@ResponseBody
	public ResponseItem userDiagnosticOrderList(@ModelAttribute OrderQueryModel orderQueryModel){
		ResponseItem item=new ResponseItem();
		logger.debug("userOrderList request param:{}",gson.toJson(orderQueryModel));
		if(StringUtils.isBlank(orderQueryModel.getUserCode())){
			item.setMessage("UserCode参数丢失");
			item.setHttpCode(ResponseCode.PARAMETER_MISS.toString());
			return item;
		}
		try {
			List<VipBuyRecord> diagnosticOrder=vipBuyRecordService.findByUserCodeAndIsPay(orderQueryModel.getUserCode(), true,BuyTypeEnum.DIAGNOSTIC);
//			UserOrderModel userOrderModel=new UserOrderModel();
//			userOrderModel.setDiagnosticOrder(diagnosticOrder);
			item.setMessage("success");
			item.setDatas(diagnosticOrder);
			return item;
		} catch (Exception e) {
			  logger.error("userOrderList  Exception:", e);
	           return ResponseItem.responseWithName(new ResponseItem(), ResponseCode.SERVICE_ERROR.toString(), "userIndex exception");
		}
	}
	/**
	 * 订单分页列表
	 * Author： zhuchaowei
	 * e-mail:zhuchaowei@e-eduspace.com
	 * 2016年6月12日 上午10:40:34
	 * @param orderQueryModel
	 * @return
	 */
	@RequestMapping(value="/order_list",method=RequestMethod.POST)
	@ResponseBody
	public ResponseItem getOrderList(@ModelAttribute OrderQueryModel orderQueryModel){
		ResponseItem item=new ResponseItem();
		logger.debug("getOrderList request param:{}",gson.toJson(orderQueryModel));
		if(StringUtils.isBlank(orderQueryModel.getOrderType())){
			item.setMessage("OrderType 参数丢失");
			item.setHttpCode(ResponseCode.PARAMETER_MISS.toString());
			return item;
		}
		if(orderQueryModel.getCurrentPage()==null){
			item.setMessage("CurrentPage 参数丢失");
			item.setHttpCode(ResponseCode.PARAMETER_MISS.toString());
			return item;
		}
		if(orderQueryModel.getSize()==null){
			item.setMessage("size 参数丢失");
			item.setHttpCode(ResponseCode.PARAMETER_MISS.toString());
			return item;
		}
		try {
			Pageable pageable=new PageRequest(orderQueryModel.getCurrentPage(), orderQueryModel.getSize());
			Page<VipBuyRecord> pageList=vipBuyRecordService.findAll(orderQueryModel,pageable);
			List<VipBuyRecord> orderList=pageList.getContent();
			List<VipOrderModel> vipOrderModels=new ArrayList<>();
			for (VipBuyRecord vipBuyRecord : orderList) {
				VipOrderModel vipOrderModel=CIBNManagementConvert.fromVipBuyRecord(vipBuyRecord);
				vipOrderModels.add(vipOrderModel);
			}
			logger.debug("getNumber:{},getNumberOfElements:{},getSize{},getTotalElements:{},getTotalPages:{}",pageList.getNumber(),pageList.getNumberOfElements(),pageList.getSize(),pageList.getTotalElements(),pageList.getTotalPages());
			item.setTotalRecords(pageList.getTotalElements());
			item.setCurrentPage(pageList.getNumber());
			item.setTotalPage(pageList.getTotalPages());
			item.setSize(pageList.getSize());
			item.setMessage("success");
			item.setDatas(vipOrderModels);
			return item;
		} catch (Exception e) {
			logger.error("getOrderList  Exception:", e);
	        return ResponseItem.responseWithName(new ResponseItem(), ResponseCode.SERVICE_ERROR.toString(), "getOrderList exception");
		}
		
	}
	/**
	 * 订单详情
	 * Author： zhuchaowei
	 * e-mail:zhuchaowei@e-eduspace.com
	 * 2016年6月12日 上午10:15:49
	 * @return
	 */
	@RequestMapping(value="/order_info",method=RequestMethod.POST)
	@ResponseBody
	public ResponseItem getOrderInfo(){
		ResponseItem item=new ResponseItem();
		item.setMessage("success");
		return item;
	}
	
	/**
	 * 订单导出
	 * Author： zhuchaowei
	 * e-mail:zhuchaowei@e-eduspace.com
	 * 2016年6月12日 上午10:15:58
	 * @param response
	 * @param orderQueryModel
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value="/order_excel_export")
	@ResponseBody
	public ResponseItem orderExcelExport(HttpServletResponse response,@ModelAttribute OrderQueryModel orderQueryModel) throws IOException{
		logger.debug("orderQueryModel:{}",gson.toJson(orderQueryModel));
		ResponseItem item = new ResponseItem();
		if(StringUtils.isBlank(orderQueryModel.getOrderType())){
			item.setMessage("OrderType 参数丢失");
			item.setHttpCode(ResponseCode.PARAMETER_MISS.toString());
			return item;
		}
		Pageable pageable = new PageRequest(0, Integer.MAX_VALUE);
		OutputStream outputStream = response.getOutputStream();
		String fileName ="诊断订单_"+DateUtils.toString(new Date(), DateUtils.DATE_FORMAT_DATEONLY);
		if(orderQueryModel.getOrderType().equals(BuyTypeEnum.VIP.toString())){
			fileName="VIP订单_"+DateUtils.toString(new Date(), DateUtils.DATE_FORMAT_DATEONLY);
		}
		response.setHeader("Content-disposition", "attachment; filename="+URLEncoder.encode(fileName, "UTF-8") + ".xlsx");// 组装附件名称和格式
		Page<VipBuyRecord> pageList=vipBuyRecordService.findAll(orderQueryModel,pageable);
		
		if(orderQueryModel.getOrderType().equals(BuyTypeEnum.DIAGNOSTIC.toString())){
			List<DiaginsticExcelModel> excelModels=new ArrayList<>();
			for (VipBuyRecord vipBuyRecord : pageList.getContent()) {
				DiaginsticExcelModel  diaginsticExcelModel=CIBNManagementConvert.toDiagnosticExcelMode(vipBuyRecord);
				excelModels.add(diaginsticExcelModel);
			}
			ExcelExportUtil.exportExcel("诊断订单信息", DiaginsticExcelModel.class, excelModels, outputStream);
		}else{
			List<VipOrderExcelModel> excelModels=new ArrayList<>();
			for (VipBuyRecord vipBuyRecord : pageList.getContent()) {
				VipOrderExcelModel  vipOrderExcelModel=CIBNManagementConvert.toVipExcelModel(vipBuyRecord);
				excelModels.add(vipOrderExcelModel);
			}
			ExcelExportUtil.exportExcel("VIP订单信息", VipOrderExcelModel.class, excelModels, outputStream);
		}
		item.setMessage("success");
		return item;
	}
	
}
