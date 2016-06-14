package com.eeduspace.management.model;

import java.util.List;

public class ExamDataDetailModel {
  private String code;//试卷id
  private String examName;
  private String grade;
  private String subject;
  private String bookType;
  private double totalScore;
  private long   examTime;
  private String paperUUID;
  private List<QuestionDataTempModel> questions;
  
public String getCode() {
	return code;
}
public void setCode(String code) {
	this.code = code;
}
public String getExamName() {
	return examName;
}
public void setExamName(String examName) {
	this.examName = examName;
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
public String getBookType() {
	return bookType;
}
public void setBookType(String bookType) {
	this.bookType = bookType;
}
public double getTotalScore() {
	return totalScore;
}
public void setTotalScore(double totalScore) {
	this.totalScore = totalScore;
}
public long getExamTime() {
	return examTime;
}
public void setExamTime(long examTime) {
	this.examTime = examTime;
}
public List<QuestionDataTempModel> getQuestions() {
	return questions;
}
public void setQuestions(List<QuestionDataTempModel> questions) {
	this.questions = questions;
}
public String getPaperUUID() {
	return paperUUID;
}
public void setPaperUUID(String paperUUID) {
	this.paperUUID = paperUUID;
}
  
	
	
}
