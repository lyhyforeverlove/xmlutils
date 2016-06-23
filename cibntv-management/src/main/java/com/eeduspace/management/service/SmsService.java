package com.eeduspace.management.service;

import com.eeduspace.management.model.SmsModel;

public interface SmsService {
	
	public Boolean validateSmsCode(String phone,String smsCode);
	
	public SmsModel saveCode(SmsModel smsModel);
	
	public String sendSmsCode(String phone);
}
