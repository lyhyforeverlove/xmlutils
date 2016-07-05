package com.eeduspace.management.service.impl;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import com.eeduspace.management.client.BaseDataClient;
import com.eeduspace.management.convert.CIBNManagementConvert;
import com.eeduspace.management.model.PaperModel;
import com.eeduspace.management.model.PaperResponseModel;
import com.eeduspace.management.model.PaperTypeModel;
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
	public PaperResponseModel getPaperPage(String grade, String subject,String bookType, String paperType, Map<String, String> searchMap,
			int cp, int size) throws JsonSyntaxException, Exception {

		String gsonResponse = baseDataClient.getPaperPage(grade, subject, bookType, paperType, searchMap, (cp-1), size);
		PaperResponseModel baseDatas = new PaperResponseModel();
		baseDatas = gson.fromJson(gsonResponse, PaperResponseModel.class);
		//业务处理
		List<PaperTypePo> pTypePos= (List<PaperTypePo>) pTypePoDao.findAll();
		List<PaperModel> paperModels= baseDatas.getPaperDatas();
		Map<String, String> type = new HashMap<String, String>();
		if (!StringUtils.isEmpty(paperModels) && paperModels.size() > 0) {
			for (PaperModel pm : paperModels) {
				type = pm.getType();
				for (PaperTypePo ptp : pTypePos) {
					String name = type.get(String.valueOf(ptp.getType()));
					if (!StringUtils.isEmpty(name)) {
						pm.setTypeName(name);
						pm.setPaperType(String.valueOf(ptp.getType()));
						pm.setCreateDateStr(DateUtils.toString(DateUtils.parseDate(pm.getCreateDateStr(),"yyyyMMddHHmmss"), DateUtils.DATE_FORMAT_DATETIME));
						//判断是否是打折时间
						Date date = new Date();
						if (DateUtils.isBetween(date, ptp.getDateBef(), ptp.getDateAft(), 1)) {
							double d = Double.parseDouble(ptp.getPrice()) * ptp.getDiscount();
							String price = String.valueOf(d);
							int p = price.indexOf(".") + (price.substring(price.indexOf("."), price.length()).length() > 3 ? 3 : price.substring(price.indexOf("."), price.length()).length());
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

	@Override
	public List<PaperTypeModel> getPaperTypeList() {
		List<PaperTypePo> pTypePos = (List<PaperTypePo>) pTypePoDao.findAll();
		List<PaperTypeModel> pTypeModels = new ArrayList<>();
		for (PaperTypePo pt : pTypePos) {
			PaperTypeModel ptm = CIBNManagementConvert.fromPaperTypePo(pt);
			pTypeModels.add(ptm);
		}
		return pTypeModels;
	}

	@Override
	public List<PaperTypeModel> saveOrReplacePaperTypes(List<PaperTypeModel> pTypeModels) throws ParseException {
		List<String> ids = new ArrayList<String>();
		for (PaperTypeModel pm : pTypeModels) {
			ids.add(pm.getUuid());
		}
		List<PaperTypePo> pTypePos = pTypePoDao.findByUuidIn(ids);
		for (PaperTypeModel ptm : pTypeModels) {
			for (PaperTypePo ptp : pTypePos) {
				if (ptp.getUuid().equals(ptm.getUuid())) {
					ptp.setPrice(StringUtils.isEmpty(ptm.getPrice()) ? ptp.getPrice() : ptm.getPrice());
					ptp.setDiscount(StringUtils.isEmpty(ptm.getDiscount()) ? ptp.getDiscount() : ptm.getDiscount());
					ptp.setDateBef(StringUtils.isEmpty(ptm.getDateBef()) ? ptp.getDateBef() : DateUtils.parseDate(ptm.getDateBef()));
					ptp.setDateAft(StringUtils.isEmpty(ptm.getDateAft()) ? ptp.getDateAft() : DateUtils.parseDate(ptm.getDateAft()));
				}
			}
		}
		List<PaperTypePo> pTypePos2= (List<PaperTypePo>) pTypePoDao.save(pTypePos);
		List<PaperTypeModel> pList = new ArrayList<PaperTypeModel>();
		for (PaperTypePo ptp : pTypePos2) {
			pList.add(CIBNManagementConvert.fromPaperTypePo(ptp));
		}
		return pList;
	}


}
