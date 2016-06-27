package com.eeduspace.management.service;

import com.eeduspace.management.model.SmsModel;

/**
 * @author songwei
 *	Date 2016-06-06
 *	Describe 手机发送验证码，验证验证码是否正确
 */
public interface SmsService {
	
	/**验证验证码是否正确
	 * @param phone
	 * @param smsCode
	 * @return
	 */
	public Boolean validateSmsCode(String phone,String smsCode);
	
	/**保存验证码
	 * @param smsModel
	 * @return
	 */
	public SmsModel saveCode(SmsModel smsModel);
	
	/**发送手机验证码
	 * @param phone
	 * @return
	 */
	public String sendSmsCode(String phone);
}
