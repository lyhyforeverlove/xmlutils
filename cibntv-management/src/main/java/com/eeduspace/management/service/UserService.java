package com.eeduspace.management.service;


import java.io.OutputStream;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.eeduspace.management.model.UserQueryModel;
import com.eeduspace.management.persist.po.UserPo;


/**
 * Author: dingran
 * Date: 2016/4/19
 * Description:
 */
public interface UserService {

    /**
     * 根据code查找
     * @param userCode
     * @return
     */
    UserPo findByUserCode(String userCode);
    
    Page<UserPo> findAll(Pageable pageable,UserQueryModel userQueryModel);
    /**
     * 根据用户名密码获取 用户
     * @param user
     * @param password
     * @return
     */
    UserPo findLoginUser(String user,String password);

    /**
     * 保存
     * @param userPo
     * @return
     */
    UserPo save(UserPo userPo);

    
    /**
     * 查询
     * @param userPo
     * @return
     */
	UserPo findOne(Long userId);
	 /**
     * 根据手机号查询
     * @param userPo
     * @return
     */
	UserPo findByMobile(String mobile);
	/**
	 * 改变拉黑状态
	 * Author： zhuchaowei
	 * e-mail:zhuchaowei@e-eduspace.com
	 * 2016年6月1日 下午3:33:32
	 * @param userCode
	 * @param isBlacklist
	 * @return
	 */
	UserPo changeBlacklist(String userCode,Boolean isBlacklist);
	/**
	 * 导出用户excel
	 * Author： zhuchaowei
	 * e-mail:zhuchaowei@e-eduspace.com
	 * 2016年6月3日 下午3:03:49
	 * @param userPos 查询数据
	 * @param titles  表头
	 * @param outputStream 
	 */
	void ExportUserExcle(List<UserPo> userPos,String[] titles,OutputStream outputStream);

}
