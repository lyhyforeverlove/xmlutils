package com.eeduspace.management.controller;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.eeduspace.management.convert.CIBNManagementConvert;
import com.eeduspace.management.model.VipPackModel;
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
	
	@RequestMapping("/vip_pack_list")
	@ResponseBody
	public ResponseItem getPackList(){
		ResponseItem item=new ResponseItem();
		try {
			List<VIPPack> packs=vipPackService.findAll();
			List<VipPackModel> packModels=new ArrayList<>();
			for (VIPPack vipPack : packs) {
				VipPackModel vipPackModel=new VipPackModel();
				vipPackModel=CIBNManagementConvert.fromVipPackPo(vipPack);
				packModels.add(vipPackModel);
			}
			item.setDatas(packModels);
			item.setMessage("success");
			return item;
		} catch (Exception e) {
			logger.error("getPackList  Exception:", e);
	        return ResponseItem.responseWithName(new ResponseItem(), ResponseCode.SERVICE_ERROR.toString(), "getPackList exception");
		}
	}
	@RequestMapping("/delete_vip_pack")
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
	@RequestMapping("/vip_pack_release")
	@ResponseBody
	public ResponseItem vipPackRelease(){
		ResponseItem item=new ResponseItem();
		try {
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
	@RequestMapping("/vip_pack_create")
	@ResponseBody
	public ResponseItem  vipPackCreate(@RequestParam("file")MultipartFile file ,@ModelAttribute VipPackModel vipPackModel,HttpServletRequest request,HttpServletResponse response){
		ResponseItem ri  = new ResponseItem();
		try{
	    // 获取图片的文件名
        String fileName = file.getOriginalFilename();
        // 获取图片的扩展名
        String extensionName = fileName.substring(fileName.lastIndexOf(".") + 1);
        // 新的图片文件名 = 获取时间戳+"."图片扩展名
        String newFileName = String.valueOf(System.currentTimeMillis())+ "." + extensionName;
	    String  realPath = request.getSession().getServletContext().getRealPath("");
	    String fileUrls = realPath.replace("\\","/");
        String replaceAll = fileUrls.substring(0,fileUrls.lastIndexOf("/"));
        String fileUrl="";
        try {
			 fileUrl  = saveFile(newFileName, file,replaceAll+"/upload");
			 logger.debug("上传路径   fileUrl:{}"+fileUrl);
        } catch (Exception e) {
            logger.error("上传图片失败.");
  		    return ResponseItem.responseWithName(ri, ResponseCode.SERVICE_ERROR.toString(), ".IMGUPLOAD Exception");        	
        }
        fileUrl ="/upload/"+newFileName;
		return ri;
	  }catch (Exception e) {
          logger.error("USER FINDBYCODE Exception:", e);
          return ResponseItem.responseWithName(ri, ResponseCode.SERVICE_ERROR.toString(), "USER FINDBYCODE Exception");
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
}