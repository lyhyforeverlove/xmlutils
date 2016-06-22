package com.eeduspace.management.model;


public class PaperTypeModel {
	
	private Long id;
    //uuid
    private String uuid;
    //属性名称
    private String name;
    //属性代码
    private String type;
    //价钱
    private String price;
    //折扣
    private Double discount;
    //打折时间1
    private String dateBef;
    //打折时间2
    private String dateAft;
    
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
	public String getType() {
		return type;
	}
	public void setType(String type) {
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
	public String getDateBef() {
		return dateBef;
	}
	public void setDateBef(String dateBef) {
		this.dateBef = dateBef;
	}
	public String getDateAft() {
		return dateAft;
	}
	public void setDateAft(String dateAft) {
		this.dateAft = dateAft;
	}
	
    
    

}
