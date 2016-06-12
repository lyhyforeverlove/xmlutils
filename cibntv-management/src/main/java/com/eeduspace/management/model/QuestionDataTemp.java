package com.eeduspace.management.model;

import java.util.List;

import com.eeduspace.management.model.AnaModel;
import com.eeduspace.management.model.OptModel;

public class QuestionDataTemp {
	private String id;
	private String code;
	private String createAt;
	private String update_at;
	private String title;
	private String stem;
	private String option;
	private String analyze;
	private String score;
	private List<AnaModel> analyzeModels;
	private List<OptModel> optionModels;
	public List<AnaModel> getAnalyzeModels() {
		return analyzeModels;
	}
	public void setAnalyzeModels(List<AnaModel> analyzeModels) {
		this.analyzeModels = analyzeModels;
	}
	public List<OptModel> getOptionModels() {
		return optionModels;
	}
	public void setOptionModels(List<OptModel> optionModels) {
		this.optionModels = optionModels;
	}
	private String audioAnalyzePath;
	private List<Object> knowledges;
	private List<Object> knowledgeCodes;
	
	//private String productions;
	private String answer;
	private int star;
	//private String audio;
	//private String source;
	//private int isCompleted;
	private String type;
	
	private String grade;
	private String subject;
	
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
	public String getAnalyze() {
		return analyze;
	}
	public void setAnalyze(String analyze) {
		this.analyze = analyze;
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
	
	
	public String getAnswer() {
		return answer;
	}
	public void setAnswer(String answer) {
		this.answer = answer;
	}
	public int getStar() {
		return star;
	}
	public void setStar(int star) {
		this.star = star;
	}
	
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getGrade() {
		return grade;
	}
	public void setGrade(String grade) {
		this.grade = grade;
	}
	public String getSubject() {
		return subject;
	}
	public void setSubject(String subject) {
		this.subject = subject;
	}
	public List<Object> getKnowledges() {
		return knowledges;
	}
	public void setKnowledges(List<Object> knowledges) {
		this.knowledges = knowledges;
	}
	public List<Object> getKnowledgeCodes() {
		return knowledgeCodes;
	}
	public void setKnowledgeCodes(List<Object> knowledgeCodes) {
		this.knowledgeCodes = knowledgeCodes;
	}
	public String getAudioAnalyzePath() {
		return audioAnalyzePath;
	}
	public void setAudioAnalyzePath(String audioAnalyzePath) {
		this.audioAnalyzePath = audioAnalyzePath;
	}
	public String getScore() {
		return score;
	}
	public void setScore(String score) {
		this.score = score;
	}
	

}
