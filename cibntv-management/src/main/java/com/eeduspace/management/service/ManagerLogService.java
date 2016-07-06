package com.eeduspace.management.service;


import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.eeduspace.management.model.ManagerLogModel;
import com.eeduspace.management.persist.po.ManagerLogPo;

/**
 * Author: dingran
 * Date: 2015/10/26
 * Description:管理员操作日志管理
 */
public interface ManagerLogService {
    /**
     * 查询所有
     * @return
     */
    List<ManagerLogPo> findAll();
    
    /**
     * 新增/更新
     * @param ManagerLogPo
     * @return
     */
    ManagerLogPo save(ManagerLogPo ManagerLogPo);

    /**
     * 分页获取代列表：模糊查询
     * @param pageable
     * @return
     */
    Page<ManagerLogModel> findPage(ManagerLogModel model,Pageable pageable);
    
}
