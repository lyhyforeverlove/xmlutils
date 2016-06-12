package com.eeduspace.management.persist.po;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.eeduspace.management.persist.enumeration.PaperTypeEnum;
import com.eeduspace.management.util.UIDGenerator;

@Entity
@Table(name="cibn_paper_type")
public class PaperTypePo implements Serializable{
	private static final long serialVersionUID = 1L;
	//主键
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(updatable = false)
    protected Long id;
    //uuid
    @Column(unique = true)
    private String uuid = UIDGenerator.getUUID().toString().replace("-", "");
    //属性名称
    private String name;
    //属性代码
    private PaperTypeEnum type;
    //价钱
    private String price;
    //折扣
    private Double discount;
    
    //打折时间1
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "date_bef")
    private Date dateBef;
    //打折时间2
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "date_aft")
    private Date dateAft;
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
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public PaperTypeEnum getType() {
		return type;
	}
	public void setType(PaperTypeEnum type) {
		this.type = type;
	}
	public String getPrice() {
		return price;
	}
	public void setPrice(String price) {
		this.price = price;
	}
	public Double getDiscount() {
		return discount;
	}
	public void setDiscount(Double discount) {
		this.discount = discount;
	}
	public Date getDateBef() {
		return dateBef;
	}
	public void setDateBef(Date dateBef) {
		this.dateBef = dateBef;
	}
	public Date getDateAft() {
		return dateAft;
	}
	public void setDateAft(Date dateAft) {
		this.dateAft = dateAft;
	}
    
    
    
}
