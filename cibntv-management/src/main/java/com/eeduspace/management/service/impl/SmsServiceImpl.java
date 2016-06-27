package com.eeduspace.management.service.impl;

import javax.inject.Inject;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import com.eeduspace.management.convert.CIBNManagementConvert;
import com.eeduspace.management.model.SmsModel;
import com.eeduspace.management.persist.dao.SmsPoDao;
import com.eeduspace.management.persist.po.SmsPo;
import com.eeduspace.management.service.SmsService;
import com.eeduspace.management.util.SMSUtil;
@Service
public class SmsServiceImpl implements SmsService {
	
	@Inject
	private SmsPoDao smsPoDao;
	@Inject
	private SMSUtil smsUtil;
	@Value("${cibn.sms.sendType.04}")
	private String sms_sendType;

	@Override
	public Boolean validateSmsCode(String phone,String smsCode) {
		SmsPo smsPo = smsPoDao.findByPhone(phone);
		Boolean flag = false;
		if (StringUtils.isEmpty(smsPo)) {
			return flag;
		}
		if (smsPo.getSmsCode().equals(smsCode)) {
			flag = true;
		}
		return flag;
	}

	@Override
	public SmsModel saveCode(SmsModel smsModel) {
		SmsModel model = new SmsModel();
		SmsPo smsPo = smsPoDao.findByPhone(smsModel.getPhone());
		if (!StringUtils.isEmpty(smsPo) && !StringUtils.isEmpty(smsPo.getUuid())) {
			smsPo.setSmsCode(smsModel.getSmsCode());
			model = CIBNManagementConvert.fromSmsPo(smsPoDao.save(smsPo));
		}else {
			SmsPo smsPo2 = new SmsPo();
			smsPo2.setPhone(smsModel.getPhone());
			smsPo2.setSmsCode(smsModel.getSmsCode());
			model = CIBNManagementConvert.fromSmsPo(smsPoDao.save(smsPo2));
		}
		return model;
	}

	@Override
	public String sendSmsCode(String phone) {
		String code = smsUtil.send(phone, sms_sendType);
		return code;
	}
	

}
