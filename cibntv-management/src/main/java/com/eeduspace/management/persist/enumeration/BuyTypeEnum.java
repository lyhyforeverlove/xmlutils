package com.eeduspace.management.persist.enumeration;


public enum BuyTypeEnum {
	 VIP(0),
	 DIAGNOSTIC(1);
     private final int value;

     public int getValue() {
         return value;
     }
     BuyTypeEnum(int value) {
         this.value = value;
     }
     
     /**
	  * 获取枚举value值
	  * Author： zhuchaowei
	  * e-mail:zhuchaowei@e-eduspace.com
	  * 2016年4月1日 上午11:42:28
	  * @param enumName 枚举 TODAY
	  * @return
	  */
	 public static int toEnumValue(String enumName) {
			for (DateTypeEnum an : DateTypeEnum.values()) {
				if (an.toString().equalsIgnoreCase(enumName)) {
					return an.getValue();
				}
			}
			return 0;
	}
}
