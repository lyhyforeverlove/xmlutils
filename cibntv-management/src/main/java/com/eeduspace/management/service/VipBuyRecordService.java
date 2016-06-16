package com.eeduspace.management.service;

import java.io.OutputStream;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.eeduspace.management.model.OrderQueryModel;
import com.eeduspace.management.persist.enumeration.BuyTypeEnum;
import com.eeduspace.management.persist.po.UserPo;
import com.eeduspace.management.persist.po.VipBuyRecord;

/**
 * @author zhuchaowei
 * 2016年4月19日
 * Description vip 购买记录业务
 */
public interface VipBuyRecordService {
	VipBuyRecord save(VipBuyRecord vipBuyRecord);
	/**
	 * 根据人员userCode获取购买记录列表
	 * Author： zhuchaowei
	 * e-mail:zhuchaowei@e-eduspace.com
	 * 2016年4月19日 下午5:28:49
	 * @param userCode 人员userCode
	 * @return vip购买记录列表
	 */
	Page<VipBuyRecord> findByUserCodeAndIsDelAndBuyType(String userCode,boolean isDel,boolean isPay,Pageable pageable);
	Page<VipBuyRecord> findAll(OrderQueryModel orderQueryModel,Pageable pageable);

	VipBuyRecord update(VipBuyRecord vipBuyRecord);

	/**
	 * 查询购买记录
	 * Author： zhuchaowei
	 * e-mail:zhuchaowei@e-eduspace.com
	 * 2016年4月20日 上午11:29:32
	 * @param id
	 */
	VipBuyRecord findById(Long id);
	/**
	 * 根据UUID获取信息
	 * Author： zhuchaowei
	 * e-mail:zhuchaowei@e-eduspace.com
	 * 2016年4月21日 上午9:24:39
	 * @param uuid
	 * @return
	 */
	VipBuyRecord findByUUID(String uuid);
	/**
	 * 删除购买记录
	 * Author： zhuchaowei
	 * e-mail:zhuchaowei@e-eduspace.com
	 * 2016年4月21日 上午9:46:08
	 * @param uuid
	 * @return
	 */
	VipBuyRecord deleteByUUID(String uuid);
	/**
	 * 根据订单流水号获取
	 * Author： zhuchaowei
	 * e-mail:zhuchaowei@e-eduspace.com
	 * 2016年4月22日 上午9:03:36
	 * @param orderSn
	 * @return
	 */
	VipBuyRecord findByOrderSn(String orderSn);
	
	List<VipBuyRecord> findByUserCodeAndIsPay(String  userCode,boolean isPay,BuyTypeEnum buyTypeEnum);
	List<VipBuyRecord> findByUserCodeAndIsPay(UserPo  userPo,boolean isPay,BuyTypeEnum buyTypeEnum);
}
