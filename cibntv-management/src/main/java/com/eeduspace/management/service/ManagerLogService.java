package com.eeduspace.management.service;


import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.eeduspace.management.persist.po.ManagerLogPo;
import com.eeduspace.management.persist.po.ManagerPo;

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
     * 查找
     * @param logId
     * @return
     */
    ManagerLogPo findOne(Long logId);

    /**
     * 新增/更新
     * @param ManagerLogPo
     * @return
     */
    ManagerLogPo save(ManagerLogPo ManagerLogPo);
    /**
     * 新增
     * @return
     */
    public ManagerLogPo create(Long managerId, String action,String module, Boolean result,Long productId,String sourceIp,String sourceEquipment,String requestId) ;
    /**
     * 新增
     * @return
     */
    public ManagerLogPo create(ManagerPo managerPo,String resourceId, String action,String module, Boolean result,String sourceIp,String sourceEquipment,String requestId) ;

    /**
     * 删除
     * @param id
     */
    void delete(Long id);

    /**
     * 分页获取代列表
     * @param pageable
     * @return
     */
    Page<ManagerLogPo> findPage(ManagerPo manager,String type, String keyword,String param,String sort, Pageable pageable);
    
}
