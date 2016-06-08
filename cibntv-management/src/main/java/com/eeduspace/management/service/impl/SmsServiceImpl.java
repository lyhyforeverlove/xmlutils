package com.eeduspace.management.service.impl;

import javax.inject.Inject;

import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import com.eeduspace.management.convert.CIBNManagementConvert;
import com.eeduspace.management.model.SmsModel;
import com.eeduspace.management.persist.dao.SmsPoDao;
import com.eeduspace.management.persist.po.SmsPo;
import com.eeduspace.management.service.SmsService;
@Service
public class SmsServiceImpl implements SmsService {
	
	@Inject
	private SmsPoDao smsPoDao;

	@Override
	public Boolean validateSmsCode(String phone,String smsCode) {
		SmsPo smsPo = smsPoDao.findByPhone(phone);
		if (StringUtils.isEmpty(smsPo)) {
			return null;
		}
		Boolean flag = false;
		if (smsPo.getSmsCode().equals(smsCode)) {
			flag = true;
		}
		return flag;
	}

	@Override
	public SmsModel saveCode(SmsModel smsModel) {
		SmsPo smsPo = new SmsPo();
		if (!StringUtils.isEmpty(smsModel)) {
			if (!StringUtils.isEmpty(smsModel.getUuid())) {
				smsPo = smsPoDao.findByPhone(smsModel.getPhone());
			}else {
				smsPo = smsPoDao.save(CIBNManagementConvert.fromSmsModel(smsModel));
			}
		}
		return CIBNManagementConvert.fromSmsPo(smsPo);
	}
	

}
