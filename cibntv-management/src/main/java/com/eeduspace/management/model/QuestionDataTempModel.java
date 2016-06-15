package com.eeduspace.management.model;

import java.util.List;

public class QuestionDataTempModel {
	private String id;
	private String code;
	private String createAt;
	private String update_at;
	private String title;
	private String stem;
	private String option;
	private String score;
	private List<OptModel> optionModels;
	public List<OptModel> getOptionModels() {
		return optionModels;
	}
	public void setOptionModels(List<OptModel> optionModels) {
		this.optionModels = optionModels;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getCode() {
		return code;
	}
	public void setCode(String code) {
		this.code = code;
	}
	public String getCreateAt() {
		return createAt;
	}
	public void setCreateAt(String createAt) {
		this.createAt = createAt;
	}
	public String getUpdate_at() {
		return update_at;
	}
	public void setUpdate_at(String update_at) {
		this.update_at = update_at;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getStem() {
		return stem;
	}
	public void setStem(String stem) {
		this.stem = stem;
	}
	public String getOption() {
		return option;
	}
	public void setOption(String option) {
		this.option = option;
	}
	public String getScore() {
		return score;
	}
	public void setScore(String score) {
		this.score = score;
	}
	

}
