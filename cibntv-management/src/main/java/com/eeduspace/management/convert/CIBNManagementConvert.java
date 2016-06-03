package com.eeduspace.management.convert;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.util.StringUtils;

import com.eeduspace.management.model.ManagerModel;
import com.eeduspace.management.model.PermissionModel;
import com.eeduspace.management.model.RoleModel;
import com.eeduspace.management.model.UserModel;
import com.eeduspace.management.model.VipOrderModel;
import com.eeduspace.management.model.VipPackModel;
import com.eeduspace.management.persist.po.ManagerPo;
import com.eeduspace.management.persist.po.PermissionPo;
import com.eeduspace.management.persist.po.RolePo;
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

		return mm;
	}
	public static ManagerPo fromManagerModel(ManagerModel managerModel){
		ManagerPo po = new ManagerPo();

		return po;
	}
	public static RolePo fromRoleModel(RoleModel roleModel){
		RolePo rolePo = new RolePo();
		if (!StringUtils.isEmpty(roleModel)) {
			rolePo.setDescription(roleModel.getDescription());
			rolePo.setName(roleModel.getName());
			rolePo.setStatus(roleModel.getStatus());
			rolePo.setType(roleModel.getType());
			rolePo.setUpdateDate(StringUtils.isEmpty(rolePo.getUpdateDate()) ? null : rolePo.getUpdateDate());
		}
		return rolePo;
	}
	public static RoleModel fromRolePo(RolePo rolePo){
		RoleModel roleModel = new RoleModel();
		if (!StringUtils.isEmpty(rolePo)) {
			roleModel.setId(rolePo.getId());
			roleModel.setUuid(rolePo.getUuid());
			roleModel.setDescription(rolePo.getDescription());
			roleModel.setName(rolePo.getName());
			roleModel.setStatus(rolePo.getStatus());
			roleModel.setType(rolePo.getType());
			roleModel.setCreateDate(StringUtils.isEmpty(rolePo.getCreateDate()) ? null : new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(rolePo.getCreateDate()));
			roleModel.setUpdateDate(StringUtils.isEmpty(rolePo.getUpdateDate()) ? null : new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(rolePo.getUpdateDate()));
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
	public static PermissionModel fromPermissionPo(PermissionPo permissionPo){
		PermissionModel permissionModel = new PermissionModel();
		if(!StringUtils.isEmpty(permissionPo)){
			permissionModel.setId(permissionPo.getId());
			permissionModel.setUuid(permissionPo.getUuid());
			permissionModel.setDescription(permissionPo.getDescription());
			permissionModel.setFunctionId(permissionPo.getFunctionId());
			permissionModel.setGroups(permissionPo.getGroups());
			permissionModel.setName(permissionPo.getName());
			permissionModel.setStatus(permissionPo.getStatus());
			permissionModel.setType(permissionPo.getType());
			permissionModel.setCreateDate(StringUtils.isEmpty(permissionPo.getCreateDate()) ? null : new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(permissionPo.getCreateDate())) ;
			permissionModel.setUpdateDate(StringUtils.isEmpty(permissionPo.getUpdateDate()) ? null : new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(permissionPo.getUpdateDate()));
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
	            userModel.setOverdue(true);
	            userModel.setVIPExpireTime(null);
	            if(!StringUtils.isEmpty(userPo.getVIPExpireTime())){
	                userModel.setVIPExpireTime(DateUtils.getTimeStampStr(userPo.getVIPExpireTime()));
	                Date dateNow=new Date();
	                if(userPo.getVIPExpireTime().after(dateNow)){
	                    userModel.setOverdue(false);
	                    userModel.setVIPExpireDays(DateUtils.daysBetween(new Timestamp(dateNow.getTime()), new Timestamp(userPo.getVIPExpireTime().getTime()))+1);
	                }
	            }
	            userModel.setVip(userPo.isVIP());
	            userModel.setCreateDate(DateUtils.getTimeStampStr(userPo.getCreateDate()));
	        }

	        return userModel;
	    }
	  public static VipOrderModel fromVipBuyRecord(VipBuyRecord vipBuyRecord){
			VipOrderModel model=new VipOrderModel();
			model.setOrderName(vipBuyRecord.getOrderName());
			model.setOrderUUID(vipBuyRecord.getUuid());
			model.setBuyType(vipBuyRecord.getBuyType());
			model.setBuyDate(DateUtils.toString(vipBuyRecord.getCreateDate(), DateUtils.DATE_FORMAT_DATEONLY));
			model.setDiagnosticUUID(vipBuyRecord.getDiagnositcUUID());
			model.setOrderPrice(vipBuyRecord.getVipPrice());
			model.setOrderSn(vipBuyRecord.getOrderSN());
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
			vipPackModel.setDiscountStartDate(DateUtils.toString(vipPack.getDiscountStartDate(), DateUtils.DATE_FORMAT_DATETIME));
			vipPackModel.setDiscountEndDate(DateUtils.toString(vipPack.getDiscountEndDate(), DateUtils.DATE_FORMAT_DATETIME));
			vipPackModel.setVipPrice(vipPack.getVipPrice());
			vipPackModel.setVipType(vipPack.getVipType());
			vipPackModel.setVipSale(vipPack.getVipSale());
			vipPackModel.setIsRelease(vipPack.isRelease());
			return vipPackModel;
		}
}
