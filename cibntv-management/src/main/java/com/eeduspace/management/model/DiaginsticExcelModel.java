package com.eeduspace.management.model;

import com.eeduspace.management.anntation.Excel;

public class DiaginsticExcelModel {

//			String[] tableHeader = { "订单号", "流水号", "手机号", "商品类型", "商品名称", "价格", "支付方式", "交易时间", "状态" };

		/**
		 * 订单流水号
		 */
		@Excel(exportName="订单号")
		private String orderSN;
		/**
		 * 微信订单流水号 微信生成
		 */
		@Excel(exportName="流水号")
		private String transactionId;
		@Excel(exportName="手机号")
		private String mobile;
		@Excel(exportName="商品类型")
		private String buyType;
		@Excel(exportName="商品名称")
		private String orderName;
		/**
		 * VIP价格
		 */
		@Excel(exportName="价格")
		private Double vipPrice;
		/**
		 * 支付类型 weixinpay alipay
		 */
		@Excel(exportName="支付方式")
		private String payType;
		/**
		 * 创建时间
		 */
		@Excel(exportName="交易时间")
		private String createDate;
		/**
		 * 订单状态
		 */
		@Excel(exportName="状态")
		private String orderState;
		public String getOrderSN() {
			return orderSN;
		}
		public void setOrderSN(String orderSN) {
			this.orderSN = orderSN;
		}
		public String getTransactionId() {
			return transactionId;
		}
		public void setTransactionId(String transactionId) {
			this.transactionId = transactionId;
		}
		public String getMobile() {
			return mobile;
		}
		public void setMobile(String mobile) {
			this.mobile = mobile;
		}
		public Double getVipPrice() {
			return vipPrice;
		}
		public void setVipPrice(Double vipPrice) {
			this.vipPrice = vipPrice;
		}
		public String getPayType() {
			return payType;
		}
		public void setPayType(String payType) {
			this.payType = payType;
		}
		public String getCreateDate() {
			return createDate;
		}
		public void setCreateDate(String createDate) {
			this.createDate = createDate;
		}
		public String getOrderState() {
			return orderState;
		}
		public void setOrderState(String orderState) {
			this.orderState = orderState;
		}
		public String getBuyType() {
			return buyType;
		}
		public void setBuyType(String buyType) {
			this.buyType = buyType;
		}
		public String getOrderName() {
			return orderName;
		}
		public void setOrderName(String orderName) {
			this.orderName = orderName;
		}

}
