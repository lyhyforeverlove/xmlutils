package com.eeduspace.management;

import java.util.HashMap;
import java.util.Map;

import com.google.gson.Gson;

import org.junit.Before;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.support.AbstractApplicationContext;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import javax.inject.Inject;

/**
 * Created by zn on 13-12-22.
 */
@ContextConfiguration(locations = {"classpath*:*/**/spring-*.xml"})
@RunWith(SpringJUnit4ClassRunner.class)
public abstract class BaseTest {
    @Inject
    protected AbstractApplicationContext context;

    protected Gson gson=new Gson();

    @Before
    public void init() {
//        context = new ClassPathXmlApplicationContext("classpath*:/conf/**/spring-*.xml"
//                , "classpath*:/test/**/spring-*.xml");
    }

    protected final Logger logger = LoggerFactory.getLogger(BaseTest.class);
    public static void main(String[] args) {
    	Gson gson=new Gson();
		String ssString="fund_bill_list=%5B%7B%22amount%22%3A%220.01%22%2C%22fundChannel%22%3A%22ALIPAYACCOUNT%22%7D%5D&subject=%E5%A5%BD%E5%AD%A6%E7%94%9F%E6%94%AF%E4%BB%98%E5%AE%9D%E6%94%AF%E4%BB%98%E6%B5%8B%E8%AF%95&trade_no=2016051221001004910209272004&gmt_create=2016-05-12+11%3A51%3A54&notify_type=trade_status_sync&total_amount=0.01&out_trade_no=ZFB20160512115024000001&invoice_amount=0.01&open_id=20881072129413300684601472716991&seller_id=2088221720590624&notify_time=2016-05-12+11%3A52%3A02&trade_status=TRADE_SUCCESS&gmt_payment=2016-05-12+11%3A52%3A02&seller_email=cibnyijiao%40126.com&receipt_amount=0.01&buyer_id=2088002587497918&app_id=2016042901348187&notify_id=7c030f440f6f0106a8095cf6f0d7012n0u&buyer_logon_id=lyh***%40163.com&sign_type=RSA&buyer_pay_amount=0.01&sign=ZY3CQHoWAuHy4W7I23xtGn14oOtW9NCidp3w31onWLHwoSGj8D9g31Pj5HzwTNRVjyBjPNh6v8FKT96WJpn1VQOHuRIOWtz59mIfJzn%2FSL5lbKYwcHgjACRFzDxLotwH%2F8BAWzjgCLDZiXQkrAKy0wJ%2FrarDU3v70PjoYLzqQQU%3D&point_amount=0.00";
		String[] strings=ssString.split("&");
		Map<String, String>map=new HashMap<String, String>();
		for (int i = 0; i < strings.length; i++) {
			map.put(strings[i].split("=")[0], strings[i].split("=")[1]);
		}
		System.out.println(gson.toJson(map));
	}
}
