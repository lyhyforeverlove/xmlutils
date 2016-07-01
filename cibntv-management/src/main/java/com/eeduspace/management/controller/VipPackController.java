package com.eeduspace.management.controller;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.eeduspace.management.convert.CIBNManagementConvert;
import com.eeduspace.management.model.VipPackModel;
import com.eeduspace.management.persist.enumeration.VipEnum;
import com.eeduspace.management.persist.po.VIPPack;
import com.eeduspace.management.rescode.ResponseCode;
import com.eeduspace.management.rescode.ResponseItem;
import com.eeduspace.management.service.VipPackService;
import com.eeduspace.uuims.comm.util.base.DateUtils;
import com.google.gson.Gson;

/**
 * vip包控制层
 * @author zhuchaowei
 * 2016年6月1日
 * Description
 */
@Controller
@RequestMapping("/vip_pack")
public class VipPackController {
	private final Logger logger = LoggerFactory.getLogger(VipPackController.class);
	private Gson gson=new Gson();
	@Inject
	private VipPackService vipPackService;
	/**
	 * 获取VIP包列表
	 * Author： zhuchaowei
	 * e-mail:zhuchaowei@e-eduspace.com
	 * 2016年6月12日 上午10:17:27
	 * @return
	 */
	@RequestMapping(value="/vip_pack_list",method=RequestMethod.POST)
	@ResponseBody
	public ResponseItem getPackList(@ModelAttribute VipPackModel vipPackModel){
		ResponseItem item=new ResponseItem();
		List<VIPPack> packs=new ArrayList<>();
		try {
			if(vipPackModel.getIsAll()){
				packs=vipPackService.findAll();
			}else{
				packs=vipPackService.findAllByRelease(vipPackModel.getIsRelease());
			}
			List<VipPackModel> packModels=new ArrayList<>();
			for (VIPPack vipPack : packs) {
				VipPackModel vipPackModel1=new VipPackModel();
				vipPackModel1=CIBNManagementConvert.fromVipPackPo(vipPack);
				packModels.add(vipPackModel1);
			}
			item.setDatas(packModels);
			item.setMessage("success");
			return item;
		} catch (Exception e) {
			logger.error("getPackList  Exception:", e);
	        return ResponseItem.responseWithName(new ResponseItem(), ResponseCode.SERVICE_ERROR.toString(), "getPackList exception");
		}
	}
	/**
	 * 删除操作
	 * Author： zhuchaowei
	 * e-mail:zhuchaowei@e-eduspace.com
	 * 2016年6月12日 上午10:17:14
	 * @param vipUUID
	 * @return
	 */
	@RequestMapping(value="/delete_vip_pack",method=RequestMethod.POST)
	@ResponseBody
	public ResponseItem deleteVipPack(String vipUUID){
		logger.debug("deleteVipPack request param:{}",vipUUID);
		ResponseItem item=new ResponseItem();
		try {
			vipPackService.deleteByUUID(vipUUID);
			item.setMessage("success");
			return item;
		} catch (Exception e) {
			logger.error("deleteVipPack  Exception:", e);
	        return ResponseItem.responseWithName(new ResponseItem(), ResponseCode.SERVICE_ERROR.toString(), "deleteVipPack exception");
		}
	}
	/**
	 * vip包发布操作
	 * Author： zhuchaowei
	 * e-mail:zhuchaowei@e-eduspace.com
	 * 2016年6月3日 上午10:40:34
	 * @param packUUID
	 * @return
	 */
	@RequestMapping(value="/vip_pack_release",method=RequestMethod.POST)
	@ResponseBody
	public ResponseItem vipRelease(HttpServletRequest request,String[] ids){
		logger.debug("deleteVipPack request param:{}",gson.toJson(ids));
		ResponseItem item=new ResponseItem();
		try {
			if (!org.springframework.util.StringUtils.isEmpty(ids) && ids.length > 0) {
				for (String str : ids) {
					vipPackService.deleteByUUID(str);
				}
			}
			int s=vipPackService.updateVipPackRelease();
			logger.info("vipPackRelease size:{}",s);
			item.setMessage("success");
			return item;
		} catch (Exception e) {
			logger.error("vipPackRelease  Exception:", e);
			return ResponseItem.responseWithName(new ResponseItem(), ResponseCode.SERVICE_ERROR.toString(), "vipPackRelease exception");
		}
		
	}
	
	/**
	 * vip包打折操作
	 * Author： zhuchaowei
	 * e-mail:zhuchaowei@e-eduspace.com
	 * 2016年6月3日 上午10:40:46
	 * @param packUUID
	 * @return
	 */
	@RequestMapping("/vip_pack_sale")
	@ResponseBody
	public ResponseItem vipPackSale(@ModelAttribute VipPackModel vipPackModel){
		ResponseItem item=new ResponseItem();
		logger.debug("vipPackSale request param:{}",gson.toJson(vipPackModel));
		if(StringUtils.isBlank(vipPackModel.getUuid())){
			item.setMessage("UUID参数丢失");
			item.setHttpCode(ResponseCode.PARAMETER_MISS.toString());
			return item;
		}
		if(StringUtils.isBlank(vipPackModel.getDiscountStartDate())){
			item.setMessage("DiscountStartDate参数丢失");
			item.setHttpCode(ResponseCode.PARAMETER_MISS.toString());
			return item;
		}
		if(StringUtils.isBlank(vipPackModel.getDiscountEndDate())){
			item.setMessage("DiscountEndDate参数丢失");
			item.setHttpCode(ResponseCode.PARAMETER_MISS.toString());
			return item;
		}
		if(vipPackModel.getVipSale()==null){
			item.setMessage("vipsale参数丢失");
			item.setHttpCode(ResponseCode.PARAMETER_MISS.toString());
			return item;
		}
		try {
			if(vipPackModel.getUuid().equals("all")){
				int s=vipPackService.updateAllVipPackSale(vipPackModel);
				logger.info("vipPackSale size:{}",s);
			}else{
				VIPPack vipPack=vipPackService.findByUUID(vipPackModel.getUuid());
				vipPack.setVipSale(vipPackModel.getVipSale());
				vipPack.setDiscountStartDate(DateUtils.parseDate(vipPackModel.getDiscountStartDate(), DateUtils.DATE_FORMAT_DATETIME));
				vipPack.setDiscountEndDate(DateUtils.parseDate(vipPackModel.getDiscountEndDate(), DateUtils.DATE_FORMAT_DATETIME));
				vipPackService.updateVipPackSale(vipPack);
			}
			item.setMessage("success");
			return item;
		} catch (Exception e) {
			logger.error("vipPackSale  Exception:", e);
	        return ResponseItem.responseWithName(new ResponseItem(), ResponseCode.SERVICE_ERROR.toString(), "vipPackSale exception");
		}
	}
	
	
	/**
	 * 上传表单数据
	 * 上传服务器地址，保存url
	 * @param request
	 * @param response
	 * @throws IOException 
	 */
	@RequestMapping(value="/vip_pack_create",method=RequestMethod.POST)
	@ResponseBody
	public ResponseItem  vipPackCreate(@RequestParam("file")MultipartFile file ,@ModelAttribute VipPackModel vipPackModel,HttpServletRequest request,HttpServletResponse response){
		ResponseItem ri  = new ResponseItem();
		logger.debug("vipPackCreate request param:{}",gson.toJson(vipPackModel));
		if(vipPackModel.getVipPrice()==null){
			ri.setMessage("VipPrice参数丢失");
			ri.setHttpCode(ResponseCode.PARAMETER_MISS.toString());
			return ri;
		}
		if(StringUtils.isBlank(vipPackModel.getVipType())){
			ri.setMessage("VipType参数丢失");
			ri.setHttpCode(ResponseCode.PARAMETER_MISS.toString());
			return ri;
		}
		VIPPack pack=vipPackService.findByVipPackType(vipPackModel.getVipType());
		if(pack!=null){
			ri.setMessage("VIP包已存在");
			ri.setHttpCode(ResponseCode.RESOURCE_INUSE.toString());
			return ri;
		}
		if(StringUtils.isBlank(vipPackModel.getVipDesc())){
			ri.setMessage("VipDesc参数丢失");
			ri.setHttpCode(ResponseCode.PARAMETER_MISS.toString());
			return ri;
		}
		try {
			Double.valueOf(vipPackModel.getVipPrice());
		} catch (Exception e) {
			ri.setMessage("VipPrice格式错误");
			ri.setHttpCode(ResponseCode.PARAMETER_INVALID.toString());
		}
		
		try{
			String fileUrl = "";
			if(!file.isEmpty()){
				// 获取图片的文件名
				String fileName = file.getOriginalFilename();
				// 获取图片的扩展名
				String extensionName = fileName.substring(fileName.lastIndexOf(".") + 1);
				// 新的图片文件名 = 获取时间戳+"."图片扩展名
				String newFileName = String.valueOf(System.currentTimeMillis())+ "." + extensionName;
				String realPath = request.getSession().getServletContext().getRealPath("");
				String fileUrls = realPath.replace("\\", "/");
				String replaceAll = fileUrls.substring(0, fileUrls.lastIndexOf("/"));
				fileUrl = saveFile(newFileName, file, replaceAll + "/upload");
				logger.debug("上传路径   fileUrl:{}" + fileUrl);
				fileUrl = "/upload/" + newFileName;
			}
			VIPPack vipPack = new VIPPack();
			vipPack.setBackgroundimg(fileUrl);
			vipPack.setVipDesc(vipPackModel.getVipDesc());
			vipPack.setVipType(vipPackModel.getVipType());
			vipPack.setVipPrice(vipPackModel.getVipPrice());
			vipPack.setVipDays(VipEnum.VipPackTypeEnum.getValue(vipPackModel.getVipType()));
			vipPackService.saveVipPack(vipPack);
			ri.setMessage("success");
			return ri;
	  }catch (Exception e) {
          logger.error("USER vipPackCreate Exception:", e);
          return ResponseItem.responseWithName(ri, ResponseCode.SERVICE_ERROR.toString(), "vipPackCreate  Exception");
      }
	
	}


/**
	 * 存储上传图片
	 * @return 需存储路径fileUrl
	 */
	public String saveFile(String newFileName, MultipartFile file,String path) throws IOException {
        String  fileUrl = "";
         //构建文件目录 
        File fileDir = new File(path);
        if (!fileDir.exists()) {
            fileDir.mkdirs();
        }
        File fileDirdel = new File(path+"/"+newFileName);
        if (fileDirdel.exists()) {
            //把修改之前的图片删除 以免太多没用的图片占据空间
        	fileDirdel.delete();
        }
        try {
            fileUrl = path + "/"+ newFileName;
            FileOutputStream out = new FileOutputStream(path + "/"+ newFileName);
            // 写入文件
            out.write(file.getBytes());
            out.flush();
            out.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
		return fileUrl;
	}
	
	/**
	 * 获取VIP打折下拉框内容
	 * Author： zhuchaowei
	 * e-mail:zhuchaowei@e-eduspace.com
	 * 2016年6月12日 上午10:17:27
	 * @return
	 */
	@RequestMapping(value="/vip_pack_select",method=RequestMethod.POST)
	@ResponseBody
	public ResponseItem getPackSelect(){
		ResponseItem item=new ResponseItem();
		try {
			List<VipPackModel> packModels=vipPackService.findVipPackForSelect();
			item.setDatas(packModels);
			item.setMessage("success");
			return item;
		} catch (Exception e) {
			logger.error("getPackSelect  Exception:", e);
	        return ResponseItem.responseWithName(new ResponseItem(), ResponseCode.SERVICE_ERROR.toString(), "getPackSelect exception");
		}
	}
}
