package com.ailinxi.xmlutils;

import java.util.Date;

/**
 * @author aiheng@jd.com
 * @date 2014年11月7日 下午5:51:00
 * @desc 
 */
public class XmlUtilsTest
{

    public static void main(String[] args)
    {
        User user = new User("ahern88", 25, new Date());
        String xml = XmlUtils.beanToXml(user);
        System.out.println(xml);
        User u = XmlUtils.xmlToBean(xml, User.class);
        System.out.println(u.getName() + " " + u.getAge() + " " + u.getJoinDate());
    }

}
