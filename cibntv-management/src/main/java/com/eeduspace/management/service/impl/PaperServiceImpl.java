package com.eeduspace.management.service.impl;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

import com.eeduspace.management.client.BaseDataClient;
import com.eeduspace.management.model.PaperModel;
import com.eeduspace.management.model.PaperResponse;
import com.eeduspace.management.persist.dao.PaperTypePoDao;
import com.eeduspace.management.persist.po.PaperTypePo;
import com.eeduspace.management.service.PaperService;
import com.eeduspace.uuims.comm.util.base.DateUtils;
import com.google.gson.Gson;
import com.google.gson.JsonSyntaxException;

@Service
public class PaperServiceImpl implements PaperService {
	
	private Gson gson = new Gson();
	
	@Inject
	private BaseDataClient baseDataClient;
	@Inject
	private PaperTypePoDao pTypePoDao;
	
	@Override
	public PaperResponse getPaperPage(String grade, String subject,String bookType, String paperType, Map<String, String> searchMap,
			int cp, int size) throws JsonSyntaxException, Exception {
		
		String gsonResponse = baseDataClient.getPaperPage(grade, subject, bookType, paperType, searchMap, cp, size);
		PaperResponse baseDatas = new PaperResponse();
		if(StringUtils.isNotBlank(gsonResponse)){
			baseDatas = gson.fromJson(gsonResponse, PaperResponse.class);
		}
		//业务处理
		List<PaperTypePo> pTypePos= (List<PaperTypePo>) pTypePoDao.findAll();
		List<PaperModel> paperModels= baseDatas.getPaperDatas();
		Map<String, String> type = new HashMap<String, String>();
		if (paperModels.size() > 0) {
			for (PaperModel pm : paperModels) {
				type = pm.getType();
				for (PaperTypePo ptp : pTypePos) {
					String name = type.get(String.valueOf(ptp.getType()));
					if (StringUtils.isNotBlank(name)) {
						pm.setTypeName(name);
						pm.setPaperType(String.valueOf(ptp.getType()));
						
						Date date = new Date();
						if (DateUtils.isBetween(date, ptp.getDateBef(), ptp.getDateAft(), 1)) {
							double d = Double.parseDouble(ptp.getPrice()) * ptp.getDiscount();
							String price = String.valueOf(d);
							int p = price.indexOf(".") + 3;
							price = price.substring(0, p);
							pm.setPrice(price);
						}else {
							pm.setPrice(ptp.getPrice());
						}
						break;
					}
				}
			}
		}
		return baseDatas;
	}


}
