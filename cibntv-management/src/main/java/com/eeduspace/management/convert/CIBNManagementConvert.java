package com.eeduspace.management.convert;

import java.sql.Timestamp;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.util.StringUtils;

import com.eeduspace.management.model.DiaginsticExcelModel;
import com.eeduspace.management.model.ManagerLogModel;
import com.eeduspace.management.model.ManagerModel;
import com.eeduspace.management.model.PaperTypeModel;
import com.eeduspace.management.model.PermissionModel;
import com.eeduspace.management.model.RoleModel;
import com.eeduspace.management.model.SmsModel;
import com.eeduspace.management.model.UserModel;
import com.eeduspace.management.model.VipOrderExcelModel;
import com.eeduspace.management.model.VipOrderModel;
import com.eeduspace.management.model.VipPackModel;
import com.eeduspace.management.persist.enumeration.RoleEnum.Status;
import com.eeduspace.management.persist.enumeration.RoleEnum.Type;
import com.eeduspace.management.persist.enumeration.VipEnum.VipPackTypeEnum;
import com.eeduspace.management.persist.po.ManagerLogPo;
import com.eeduspace.management.persist.po.ManagerPo;
import com.eeduspace.management.persist.po.PaperTypePo;
import com.eeduspace.management.persist.po.PermissionPo;
import com.eeduspace.management.persist.po.RolePo;
import com.eeduspace.management.persist.po.SmsPo;
import com.eeduspace.management.persist.po.UserPo;
import com.eeduspace.management.persist.po.VIPPack;
import com.eeduspace.management.persist.po.VipBuyRecord;
import com.eeduspace.uuims.comm.util.base.DateUtils;


/**
 * Author: dingran
 * Date: 2016/4/20
 * Description: model与实体转换
 */

public class CIBNManagementConvert {
	//    private static final Logger logger = LoggerFactory.getLogger(CIBNManagementConvert.class);

	public static ManagerModel fromManagerPo(ManagerPo managerPo){
		ManagerModel mm = new ManagerModel();
		if (!StringUtils.isEmpty(managerPo)) {
			mm.setAccessKey(managerPo.getAccessKey());
			mm.setCreateDate(DateUtils.toString(managerPo.getCreateDate(), DateUtils.DATE_FORMAT_DATETIME));
			mm.setCreateManagerId(managerPo.getCreateManagerId());
			mm.setEmail(managerPo.getEmail());
			mm.setExtend_(managerPo.getExtend_());
			mm.setId(managerPo.getId());
			mm.setIsFirst(managerPo.getIsFirst());
			mm.setIsDel(managerPo.getIsDel());
			mm.setLastLoginDate(DateUtils.toString(managerPo.getLastLoginDate(), DateUtils.DATE_FORMAT_DATETIME));
			mm.setName(managerPo.getName());
			mm.setRealName(managerPo.getRealName());
			mm.setPassword(managerPo.getPassword());
			mm.setPhone(managerPo.getPhone());
			mm.setSecretKey(managerPo.getSecretKey());
			mm.setStatus(managerPo.getStatus());
			mm.setUpdateDate(DateUtils.toString(managerPo.getUpdateDate(), DateUtils.DATE_FORMAT_DATETIME));
			mm.setUuid(managerPo.getUuid());
			mm.setrUuid(managerPo.getR_uuid());
			mm.setrName(managerPo.getR_name());
//			mm.setType(managerPo.getType());
		}
		return mm;
	}
	public static ManagerPo fromManagerModel(ManagerModel managerModel) throws Exception{
		ManagerPo po = new ManagerPo();
		if (!StringUtils.isEmpty(managerModel)) {
			po.setAccessKey(managerModel.getAccessKey());
			if (!StringUtils.isEmpty(managerModel.getCreateDate())) {
				po.setCreateDate(DateUtils.parseDate(managerModel.getCreateDate()));
			}
			po.setCreateManagerId(managerModel.getCreateManagerId());
			po.setEmail(managerModel.getEmail());
			po.setIsFirst(managerModel.getIsFirst());
			po.setIsDel(managerModel.getIsDel());
			if (!StringUtils.isEmpty(managerModel.getLastLoginDate())) {
				po.setLastLoginDate(DateUtils.parseDate(managerModel.getLastLoginDate()));
			}
			po.setName(managerModel.getName());
			po.setRealName(managerModel.getRealName());
			po.setPassword(managerModel.getPassword());
			po.setPhone(managerModel.getPhone());
			po.setSecretKey(managerModel.getSecretKey());
			po.setStatus(managerModel.getStatus());
			if (!StringUtils.isEmpty(managerModel.getUpdateDate())) {
				po.setUpdateDate(DateUtils.parseDate(managerModel.getUpdateDate()));
			}
			if (!StringUtils.isEmpty(managerModel.getUuid())) {
				po.setUuid(managerModel.getUuid());
			}
			po.setR_uuid(managerModel.getrUuid());
			po.setR_name(managerModel.getrName());
//			po.setType(managerModel.getType());
		}
		return po;
	}
	public static RolePo fromRoleModel(RoleModel roleModel){
		RolePo rolePo = new RolePo();
		if (!StringUtils.isEmpty(roleModel)) {
			rolePo.setDescription(roleModel.getDescription());
			rolePo.setR_name(roleModel.getName());
			if(!StringUtils.isEmpty(roleModel.getUuid())){
				rolePo.setR_uuid(roleModel.getUuid());
			}
			rolePo.setType(StringUtils.isEmpty(roleModel.getType())? null : Type.valueOf(roleModel.getType()));
			rolePo.setStatus(StringUtils.isEmpty(roleModel.getStatus())? null : Status.valueOf(roleModel.getStatus()));
			rolePo.setUpdateDate(StringUtils.isEmpty(rolePo.getUpdateDate()) ? null : rolePo.getUpdateDate());
		}
		return rolePo;
	}
	public static RoleModel fromRolePo(RolePo rolePo){
		RoleModel roleModel = new RoleModel();
		if (!StringUtils.isEmpty(rolePo)) {
			roleModel.setId(rolePo.getId());
			roleModel.setUuid(rolePo.getR_uuid());
			roleModel.setDescription(rolePo.getDescription());
			roleModel.setName(rolePo.getR_name());
			roleModel.setStatus(String.valueOf(rolePo.getStatus()));
			roleModel.setType(String.valueOf(rolePo.getType()));
			roleModel.setCreateDate(DateUtils.toString(rolePo.getCreateDate(), DateUtils.DATE_FORMAT_DATETIME));
			roleModel.setUpdateDate(DateUtils.toString(rolePo.getUpdateDate(), DateUtils.DATE_FORMAT_DATETIME));
		}
		return roleModel;
	}
	public static List<RoleModel> fromRolePos(List<RolePo> rolePos){
		List<RoleModel> roleModels = new ArrayList<RoleModel>();
		if (rolePos.size() > 0) {
			for (RolePo pp : rolePos) {
				roleModels.add(fromRolePo(pp));
			}
		}
		return roleModels;
	}
	public static PermissionPo fromPermissionModel(PermissionModel permissionModel){
		PermissionPo permissionPo = new PermissionPo();
		if (!StringUtils.isEmpty(permissionModel)) {
			permissionPo.setDescription(permissionModel.getDescription());
			permissionPo.setFunctionId(permissionModel.getFunctionId());
			permissionPo.setGroups(permissionModel.getGroups());
			permissionPo.setP_name(permissionModel.getName());
			permissionPo.setStatus(permissionModel.getStatus());
			permissionPo.setType(permissionModel.getType());
			permissionPo.setPerUrl(permissionModel.getPerUrl());
		}
		return permissionPo;
	}

	public static PermissionModel fromPermissionPo(PermissionPo permissionPo){
		PermissionModel permissionModel = new PermissionModel();
		if(!StringUtils.isEmpty(permissionPo)){
			permissionModel.setId(permissionPo.getId());
			permissionModel.setUuid(permissionPo.getP_uuid());
			permissionModel.setDescription(permissionPo.getDescription());
			permissionModel.setFunctionId(permissionPo.getFunctionId());
			permissionModel.setGroups(permissionPo.getGroups());
			permissionModel.setName(permissionPo.getP_name());
			permissionModel.setStatus(permissionPo.getStatus());
			permissionModel.setType(permissionPo.getType());
			permissionModel.setPerUrl(permissionPo.getPerUrl());
			permissionModel.setCreateDate(DateUtils.toString(permissionPo.getCreateDate(), DateUtils.DATE_FORMAT_DATETIME)) ;
			permissionModel.setUpdateDate(DateUtils.toString(permissionPo.getUpdateDate(), DateUtils.DATE_FORMAT_DATETIME));
		}
		return permissionModel;
	}
	public static List<PermissionModel> fromPermissionPos(List<PermissionPo> permissionPos){
		List<PermissionModel> permissionModels = new ArrayList<PermissionModel>();
		if (permissionPos.size() > 0) {
			for (PermissionPo pp : permissionPos) {
				permissionModels.add(fromPermissionPo(pp));
			}
		}
		return permissionModels;
	}
	public static UserModel fromUserPo(UserPo userPo) {
		UserModel userModel = new UserModel();
		if(userPo!=null){
			userModel.setUserCode(userPo.getUserCode());
			userModel.setUserName(userPo.getUserName());
			userModel.setEmail(userPo.getEmail());
			userModel.setMobile(userPo.getMobile());
			userModel.setVIPExpireDays(0l);
			userModel.setIsOverdue(true);
			userModel.setVIPExpireTime(null);
			if(!StringUtils.isEmpty(userPo.getVIPExpireTime())){
				userModel.setVIPExpireTime(DateUtils.getTimeStampStr(userPo.getVIPExpireTime()));
				Date dateNow=new Date();
				if(userPo.getVIPExpireTime().after(dateNow)){
					userModel.setIsOverdue(false);
					userModel.setVIPExpireDays(DateUtils.daysBetween(new Timestamp(dateNow.getTime()), new Timestamp(userPo.getVIPExpireTime().getTime()))+1);
				}
			}
			userModel.setIsVip(userPo.isVIP());
			userModel.setCreateDate(DateUtils.getTimeStampStr(userPo.getCreateDate()));
		}

		return userModel;
	}
	public static VipOrderModel fromVipBuyRecord(VipBuyRecord vipBuyRecord){
		VipOrderModel model=new VipOrderModel();
		model.setOrderName(vipBuyRecord.getOrderName());
		model.setOrderUUID(vipBuyRecord.getUuid());
		model.setTransactionId(vipBuyRecord.getTransactionId());
		model.setBuyType(vipBuyRecord.getBuyType());
		model.setBuyDate(DateUtils.toString(vipBuyRecord.getCreateDate(), DateUtils.DATE_FORMAT_DATEONLY));
		model.setDiagnosticUUID(vipBuyRecord.getDiagnositcUUID());
		model.setOrderPrice(vipBuyRecord.getVipPrice());
		model.setOrderSn(vipBuyRecord.getOrderSN());
		if(vipBuyRecord.isPay()){
			model.setOrderState("已成交");	
		}else{
			//当前时间大于 交易后2个小时 则视为订单过期
			if(DateUtils.nowTimeMillis()>DateUtils.addHour(vipBuyRecord.getCreateDate(), 2).getTime()){
				model.setOrderState("已过期");	
			}else{
				model.setOrderState("代付款");	
			}
		}
		model.setMobile(vipBuyRecord.getUserPo()==null?"":vipBuyRecord.getUserPo().getMobile());
		model.setUserCode(vipBuyRecord.getUserPo()==null?"":vipBuyRecord.getUserPo().getUserCode());
		model.setVipDays(vipBuyRecord.getVipDays());
		model.setVipOrderType(vipBuyRecord.getVipType());
		return model;
	}
	public static VipPackModel fromVipPackPo(VIPPack vipPack){
		VipPackModel vipPackModel=new VipPackModel();
		vipPackModel.setVipDesc(vipPack.getVipDesc());
		vipPackModel.setBackgroundimg(vipPack.getBackgroundimg());
		vipPackModel.setVipPrice(vipPack.getVipPrice());
		vipPackModel.setVipType(vipPack.getVipType());
		vipPackModel.setUuid(vipPack.getUuid());
		vipPackModel.setIsRelease(vipPack.isRelease());
		if (vipPack.getDiscountStartDate()!=null&&vipPack!=null) {
			if(DateUtils.isBetween(new Date(), vipPack.getDiscountStartDate(), vipPack.getDiscountEndDate(), 1)){
				vipPackModel.setVipSale(vipPack.getVipSale());
				vipPackModel.setDiscountStartDate(DateUtils.toString(vipPack.getDiscountStartDate(), DateUtils.DATE_FORMAT_DATETIME));
				vipPackModel.setDiscountEndDate(DateUtils.toString(vipPack.getDiscountEndDate(), DateUtils.DATE_FORMAT_DATETIME));
				vipPackModel.setIsDiscount(true);
			}
		}
		return vipPackModel;
	}
	public static VipPackModel fromVipPackPoForSelect(VIPPack vipPack){
		VipPackModel vipPackModel=new VipPackModel();
		vipPackModel.setVipDesc(vipPack.getVipDesc());
		vipPackModel.setVipType(vipPack.getVipType());
		vipPackModel.setUuid(vipPack.getUuid());
		vipPackModel.setVipTypeDesc(VipPackTypeEnum.getDesc(vipPack.getVipType()));
		return vipPackModel;
	}

	public static SmsModel fromSmsPo(SmsPo smsPo){
		SmsModel smsModel = new SmsModel();
		smsModel.setId(smsPo.getId());
		smsModel.setUuid(smsPo.getUuid());
		smsModel.setCreateTime(smsPo.getCreateTime());
		smsModel.setPhone(smsPo.getPhone());
		smsModel.setSmsCode(smsPo.getSmsCode());
		return smsModel;
	}
	public static SmsPo fromSmsModel(SmsModel smsModel){
		SmsPo smsPo = new SmsPo();
		smsPo.setPhone(smsModel.getPhone());
		smsPo.setSmsCode(smsModel.getSmsCode());
		return smsPo;
	}
	public static PaperTypePo fromPaperTypeModel(PaperTypeModel paperTypeModel) throws ParseException{
		PaperTypePo po = new PaperTypePo();
		if (!StringUtils.isEmpty(paperTypeModel.getUuid())) {
			po.setUuid(paperTypeModel.getUuid());
		}
		po.setName(paperTypeModel.getName());
		if (!StringUtils.isEmpty(paperTypeModel.getType())) {
			po.setType(Integer.parseInt(paperTypeModel.getType()));
		}
		po.setPrice(paperTypeModel.getPrice());
		po.setDiscount(paperTypeModel.getDiscount());
		po.setDateBef(DateUtils.parseDate(paperTypeModel.getDateBef()));
		po.setDateAft(DateUtils.parseDate(paperTypeModel.getDateAft()));
		return po;
	}
	public static PaperTypeModel fromPaperTypePo(PaperTypePo paperTypePo){
		PaperTypeModel model = new PaperTypeModel();
		model.setId(paperTypePo.getId());
		model.setUuid(paperTypePo.getUuid());
		model.setName(paperTypePo.getName());
		model.setType(String.valueOf(paperTypePo.getType()));
		model.setPrice(paperTypePo.getPrice());
		model.setDiscount(paperTypePo.getDiscount());
		model.setDateBef(DateUtils.toString(paperTypePo.getDateBef(), DateUtils.DATE_FORMAT_DATEONLY));
		model.setDateAft(DateUtils.toString(paperTypePo.getDateAft(), DateUtils.DATE_FORMAT_DATEONLY));
		return model;
	}
	public static VipOrderExcelModel toVipExcelModel(VipBuyRecord vipBuyRecord){
		VipOrderExcelModel model=new VipOrderExcelModel();
		model.setCreateDate(DateUtils.toString(vipBuyRecord.getCreateDate(), DateUtils.DATE_FORMAT_DATEONLY));
		model.setOrderSN(vipBuyRecord.getOrderSN());
		model.setVipPrice(vipBuyRecord.getVipPrice());
		model.setVipDays(VipPackTypeEnum.getDesc(vipBuyRecord.getVipType()));
		if(vipBuyRecord.isPay()){
			model.setOrderState("已成交");	
		}else{
			//当前时间大于 交易后2个小时 则视为订单过期
			if(DateUtils.nowTimeMillis()>DateUtils.addHour(vipBuyRecord.getCreateDate(), 2).getTime()){
				model.setOrderState("已过期");	
			}else{
				model.setOrderState("代付款");	
			}
		}
		model.setMobile(vipBuyRecord.getUserPo()==null?"":vipBuyRecord.getUserPo().getMobile());
		if(StringUtils.isEmpty(vipBuyRecord.getPayType())){
			model.setPayType("其它");
		}else if(vipBuyRecord.getPayType().equals("weixinpay")){
			model.setPayType("微信");
		}else if(vipBuyRecord.getPayType().equals("alipay")){
			model.setPayType("支付宝");
		}else{
			model.setPayType("其它");
		}
			
		return model;
	}
	public static DiaginsticExcelModel toDiagnosticExcelMode(VipBuyRecord vipBuyRecord){
		DiaginsticExcelModel model=new DiaginsticExcelModel();
		model.setCreateDate(DateUtils.toString(vipBuyRecord.getCreateDate(), DateUtils.DATE_FORMAT_DATEONLY));
		model.setOrderSN(vipBuyRecord.getOrderSN());
		model.setVipPrice(vipBuyRecord.getVipPrice());
		model.setOrderName(vipBuyRecord.getOrderName());
		if(vipBuyRecord.getBuyType().getValue()==0){
			model.setBuyType("VIP");
		}else{
			model.setBuyType("诊断");
		}
		if(vipBuyRecord.isPay()){
			model.setOrderState("已成交");	
		}else{
			//当前时间大于 交易后2个小时 则视为订单过期
			if(DateUtils.nowTimeMillis()>DateUtils.addHour(vipBuyRecord.getCreateDate(), 2).getTime()){
				model.setOrderState("已过期");	
			}else{
				model.setOrderState("代付款");	
			}
		}
		model.setMobile(vipBuyRecord.getUserPo()==null?"":vipBuyRecord.getUserPo().getMobile());
		 if(StringUtils.isEmpty(vipBuyRecord.getPayType())){
				model.setPayType("其它");
		 }else if(vipBuyRecord.getPayType().equals("weixinpay")){
			model.setPayType("微信");
		}else if(vipBuyRecord.getPayType().equals("alipay")){
			model.setPayType("支付宝");
		}else {
			model.setPayType("其它");
		}
			
		return model;
	}
	public static ManagerLogModel fromManagerLogPo(ManagerLogPo managerPo){
		ManagerLogModel mLogModel = new ManagerLogModel();
		mLogModel.setId(managerPo.getId());
		mLogModel.setAction(managerPo.getAction());
		mLogModel.setCreateDate(DateUtils.toString(managerPo.getCreateDate(), DateUtils.DATE_FORMAT_DATETIME));
		mLogModel.setDescription(managerPo.getDescription());
		mLogModel.setManagerId(managerPo.getManagerId());
		mLogModel.setModule(managerPo.getModule());
		mLogModel.setRequestId(managerPo.getRequestId());
		mLogModel.setResourceId(managerPo.getResourceId());
		mLogModel.setResult(managerPo.getResult());
		mLogModel.setSourceIp(managerPo.getSourceIp());
		return mLogModel;
	}
	
}
