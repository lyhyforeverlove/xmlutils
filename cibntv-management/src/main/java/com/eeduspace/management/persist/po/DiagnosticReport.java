package com.eeduspace.management.persist.po;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.eeduspace.uuims.comm.util.base.UIDGenerator;

/**
 * 
 * @author zhuchaowei
 * 2016年4月19日
 * Description 诊断报告
 */
@Entity
@Table(name="cibn_diagnostic_report")
public class DiagnosticReport {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(updatable = false)
	private Long id;
	// 唯一标识
	@Column(unique = true)
	private String uuid = UIDGenerator.getUUID().toString().replace("-", "");
	/**
	 * 人员UUID
	 */
	@Column(name = "user_code")
	private String userCode;
	/**
	 * 创建时间
	 */
	@Temporal(TemporalType.TIMESTAMP)
	@Column(updatable = true, name = "create_time")
	private Date createDate = new Date();
	/**
	 * 分数
	 */
	@Column(name = "score")
	private int score;
	/**
	 * 用时
	 */
	@Column(name = "use_time")
	private long useTime;
	/**
	 * 用户排名
	 */
	@Column(name = "user_ranking")
	private Long userRanking;
	/**
	 * 排名比例
	 */
	@Column(name = "rank_percentage")
	private String rankPercentage;
	/**
	 * 试卷code
	 */
	@Column(name = "paper_code")
	private String paperCode;
	/**
	 * 时间名称
	 */
	@Column(name = "paper_name")
	private String paperName;
	/**
	 * 学年code
	 */
	@Column(name = "grade_code")
	private String gradeCode;
	/**
	 * 学课code
	 */
	@Column(name = "subject_code")
	private String subjectCode;
	/**
	 * 教材版本code
	 */
	@Column(name = "version_code")
	private String versionCode;
	/**
	 * 单元code
	 */
	@Column(name = "unit_code")
	private String unitCode;
	/**
	 * 诊断结果（题目code+用户答案）json字符串 存取
	 */
	@Column(name = "diagnostic_result")
	private String diagnosticResult;
	/**
	 * 弱项（知识点code 错误个数）json字符串 存取
	 */
	@Column(name = "weak")
	private String weak;
	/**
	 * 推荐课程（课程code和课程名称）json字符串 存取
	 */
	@Column(name = "recommended_courses")
	private String recommendedCourses;
	/**
	 * 删除标识  true 删除  false 未删除
	 */
	@Column(name = "is_del")
	private boolean isDel=false;
	/**
	 * 是否购买   true 购买  false 未购买
	 */
	@Column(name="is_buy")
	private boolean isBuy;
	
	/**
	 * 产生式类型图标
	 */
	@Column(name="production_chart")
	private String productionChart;
	/**
	 * 知识点掌握情况
	 */
	@Column(name="knowledge_mastery")
	private String knowledgeMastery;
	/**
	 * 学年名称
	 */
	@Column(name="grade_name")
	private String gradeName;
	/**
	 * 学科名称
	 */
	@Column(name="subject_name")
	private String subjectName;
	/**
	 * 教材版本名称
	 */
	@Column(name="version_name")
	private String versionName;
	/**
	 * 学段名称
	 */
	@Column(name="stage_name")
	private String stageName;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getUuid() {
		return uuid;
	}
	public void setUuid(String uuid) {
		this.uuid = uuid;
	}
	public String getUserCode() {
		return userCode;
	}
	public void setUserCode(String userCode) {
		this.userCode = userCode;
	}
	public Date getCreateDate() {
		return createDate;
	}
	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}
	public int getScore() {
		return score;
	}
	public void setScore(int score) {
		this.score = score;
	}
	public long getUseTime() {
		return useTime;
	}
	public void setUseTime(long useTime) {
		this.useTime = useTime;
	}
	public Long getUserRanking() {
		return userRanking;
	}
	public void setUserRanking(Long userRanking) {
		this.userRanking = userRanking;
	}
	public String getRankPercentage() {
		return rankPercentage;
	}
	public void setRankPercentage(String rankPercentage) {
		this.rankPercentage = rankPercentage;
	}
	public String getPaperName() {
		return paperName;
	}
	public void setPaperName(String paperName) {
		this.paperName = paperName;
	}
	public String getGradeCode() {
		return gradeCode;
	}
	public void setGradeCode(String gradeCode) {
		this.gradeCode = gradeCode;
	}
	public String getSubjectCode() {
		return subjectCode;
	}
	public void setSubjectCode(String subjectCode) {
		this.subjectCode = subjectCode;
	}
	public String getVersionCode() {
		return versionCode;
	}
	public void setVersionCode(String versionCode) {
		this.versionCode = versionCode;
	}
	public String getUnitCode() {
		return unitCode;
	}
	public void setUnitCode(String unitCode) {
		this.unitCode = unitCode;
	}
	public String getDiagnosticResult() {
		return diagnosticResult;
	}
	public void setDiagnosticResult(String diagnosticResult) {
		this.diagnosticResult = diagnosticResult;
	}
	public String getWeak() {
		return weak;
	}
	public void setWeak(String weak) {
		this.weak = weak;
	}
	public String getRecommendedCourses() {
		return recommendedCourses;
	}
	public void setRecommendedCourses(String recommendedCourses) {
		this.recommendedCourses = recommendedCourses;
	}
	public String getPaperCode() {
		return paperCode;
	}
	public void setPaperCode(String paperCode) {
		this.paperCode = paperCode;
	}
	public boolean isDel() {
		return isDel;
	}
	public void setDel(boolean isDel) {
		this.isDel = isDel;
	}
	public boolean isBuy() {
		return isBuy;
	}
	public void setBuy(boolean isBuy) {
		this.isBuy = isBuy;
	}
	public String getProductionChart() {
		return productionChart;
	}
	public void setProductionChart(String productionChart) {
		this.productionChart = productionChart;
	}
	public String getKnowledgeMastery() {
		return knowledgeMastery;
	}
	public void setKnowledgeMastery(String knowledgeMastery) {
		this.knowledgeMastery = knowledgeMastery;
	}
	public String getGradeName() {
		return gradeName;
	}
	public void setGradeName(String gradeName) {
		this.gradeName = gradeName;
	}
	public String getSubjectName() {
		return subjectName;
	}
	public void setSubjectName(String subjectName) {
		this.subjectName = subjectName;
	}
	public String getVersionName() {
		return versionName;
	}
	public void setVersionName(String versionName) {
		this.versionName = versionName;
	}
	public String getStageName() {
		return stageName;
	}
	public void setStageName(String stageName) {
		this.stageName = stageName;
	}
	
}
