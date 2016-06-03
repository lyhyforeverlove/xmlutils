package com.eeduspace.management.persist.dao;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.domain.Specifications;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.eeduspace.management.persist.po.UserPo;

/**
 * Author: dingran
 * Date: 2016/4/19
 * Description:
 */
public interface UserDao extends JpaRepository<UserPo, Long> {

    UserPo findByUserCode(String userCode);

    @Query("select u from UserPo u where (u.userName=?1 or u.mobile=?2 or u.email=?3) and u.password=?4")
    UserPo findLoginUser(String userName,String phone,String email,String password);
    Page<UserPo> findAll(Specification<UserPo> specification,Pageable pageable);
	UserPo findByMobile(String mobile);
	Page<UserPo> findByIsBlacklistAndMobileLike(Boolean blackList,String mobile,Pageable pageable);
 }
