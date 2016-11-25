package com.ailinxi.xmlutils;

@DomRoot("param")
public class MtgModel {
    
//    private String siteId;
    private String mtgKey;
    private String mtgTitle;
    private String startTime;
    private String endTime;
//    private Integer language;
    private String userName;
    private String userId;
    /**用户类型：
     *   1：主持人（所有权限）
     *   2：主讲人（丌能操作摄像头）
     *   8：普通不会者
     *   32: 监课人员
     * */
    private Integer userType;
    private String hostPwd;
    /**
     * 1、互劢 2、直播；
     * 默认为 1互劢课堂支持多人音视频，适用于小班授课；
     * 直播课堂适用于千人以上大课堂，不能进行音视频互劢，支持 H5 网页观
     * */
    private Integer meetingType;
    //是否为公开课堂()
    private Integer isPublic;
    /**文档唯一标识，多个标识用英文逗号分隔，文档唯一标识通过查询文档列表接口获取*/
    private String docID;
    /**伴音唯一标识，多个标识用英文逗号分隔，伴音唯一标识通过查询伴音列表接口获取*/
    private String mediaID;
    /**课堂结束后回调地址*/
    private String backUrl;
//    private Long timestamp;
    /**文档共享是否启用（1 启用，其他禁止）,不传默认为站点默认值。*/
    private Integer docModule;
    /**屏幕共享是否启用（1 启用，其他禁止）,如果站点开启屏幕共享功能，传什么值就是什么值，
     * 不传就是站点默认值。如果站点不开启屏幕共享功能丌论传丌传都是禁止的
     * */
    private Integer screenModule;
    /**媒体共享是否启用（1 启用，其他禁止），如果站点开启媒体共享功能，传什么值就是什么值，
     * 不传就是站点默认值。如果站点不开启媒体共享功能不论传丌传都是禁止的
     * */
    private Integer mediaModule;
    /**白板是否启用（1 启用，其他禁止）*/
    private Integer whiteboardModule;
    /**录制是否启用（1 启用，其他禁止），如果站点开启录制功能，传什么值就是什么值，不传就是站点默认值。
     * 如果站点不开启录制功能不论传丌传都是禁止的
     * */
    private Integer recordModule;
    /**视频是否启用（1 启用，其他禁止），如果站点开启视频功能，如果传什么值就是什么值，不传就是站点默认值。
     * 如果站点不开启视频功能不论传丌传都是禁用的
     * */
    private Integer videoModule;
    /**是否自动录制：（1 是，0 否）*/
    private Integer autoRecord;
    /**是否参于音视频互动：（1 是，0 否）*/
    private Integer interaction;
    /**最大音频路数如果大于站点最大路数，默认为站点最大路数，如果不传，默认为站点路数,直播课堂只支持 1 路*/
    private Integer maxAudioChannels;//小班课为6路
    /**最大音频路数如果大于站点路数，默认为站点最大路数，如果不传，默认为站点路数直播课堂只支持 1 路*/
    private Integer maxVideoChannels;//小班课为6路
    /**此参数是一个 MD5 后的值
     *   MD5(key + siteId + mtgKey + userID + userType + Timestamp)
     * 其中:
     *     key ：为不系统约定的加密KEY
     *      siteId：企业（站点）标识
     *      mtgKey：课堂的唯一标识
     *      userID：用户 ID 号
     *      userType：用户类型
     *      timestamp：时间戳
     */
    private String authId;
    
    //一对一还是一对多(0：一对一；1：一对多)
    private Integer oneOrMany;
    private String nickName;
    
    public String getMtgKey() {
        return mtgKey;
    }
    
    public void setMtgKey(String mtgKey) {
        this.mtgKey = mtgKey;
    }
    
    public String getMtgTitle() {
        return mtgTitle;
    }
    
    public void setMtgTitle(String mtgTitle) {
        this.mtgTitle = mtgTitle;
    }
    
    public String getStartTime() {
        return startTime;
    }
    
    public void setStartTime(String startTime) {
        this.startTime = startTime;
    }
    
    public String getEndTime() {
        return endTime;
    }
    
    public void setEndTime(String endTime) {
        this.endTime = endTime;
    }
    
    public String getUserName() {
        return userName;
    }
    
    public void setUserName(String userName) {
        this.userName = userName;
    }
    
    public String getUserId() {
        return userId;
    }
    
    public void setUserId(String userId) {
        this.userId = userId;
    }
    
    public Integer getUserType() {
        return userType;
    }
    
    public void setUserType(Integer userType) {
        this.userType = userType;
    }
    
    public String getHostPwd() {
        return hostPwd;
    }
    
    public void setHostPwd(String hostPwd) {
        this.hostPwd = hostPwd;
    }
    
    public Integer getMeetingType() {
        return meetingType;
    }
    
    public void setMeetingType(Integer meetingType) {
        this.meetingType = meetingType;
    }
    
    public Integer getIsPublic() {
        return isPublic;
    }
    
    public void setIsPublic(Integer isPublic) {
        this.isPublic = isPublic;
    }
    
    public String getDocID() {
        return docID;
    }
    
    public void setDocID(String docID) {
        this.docID = docID;
    }
    
    public String getMediaID() {
        return mediaID;
    }
    
    public void setMediaID(String mediaID) {
        this.mediaID = mediaID;
    }
    
    public String getBackUrl() {
        return backUrl;
    }
    
    public void setBackUrl(String backUrl) {
        this.backUrl = backUrl;
    }
    
    public Integer getDocModule() {
        return docModule;
    }
    
    public void setDocModule(Integer docModule) {
        this.docModule = docModule;
    }
    
    public Integer getScreenModule() {
        return screenModule;
    }
    
    public void setScreenModule(Integer screenModule) {
        this.screenModule = screenModule;
    }
    
    public Integer getMediaModule() {
        return mediaModule;
    }
    
    public void setMediaModule(Integer mediaModule) {
        this.mediaModule = mediaModule;
    }
    
    public Integer getWhiteboardModule() {
        return whiteboardModule;
    }
    
    public void setWhiteboardModule(Integer whiteboardModule) {
        this.whiteboardModule = whiteboardModule;
    }
    
    public Integer getRecordModule() {
        return recordModule;
    }
    
    public void setRecordModule(Integer recordModule) {
        this.recordModule = recordModule;
    }
    
    public Integer getVideoModule() {
        return videoModule;
    }
    
    public void setVideoModule(Integer videoModule) {
        this.videoModule = videoModule;
    }
    
    public Integer getAutoRecord() {
        return autoRecord;
    }
    
    public void setAutoRecord(Integer autoRecord) {
        this.autoRecord = autoRecord;
    }
    
    public Integer getInteraction() {
        return interaction;
    }
    
    public void setInteraction(Integer interaction) {
        this.interaction = interaction;
    }
    
    public Integer getMaxAudioChannels() {
        return maxAudioChannels;
    }
    
    public void setMaxAudioChannels(Integer maxAudioChannels) {
        this.maxAudioChannels = maxAudioChannels;
    }
    
    public Integer getMaxVideoChannels() {
        return maxVideoChannels;
    }
    
    public void setMaxVideoChannels(Integer maxVideoChannels) {
        this.maxVideoChannels = maxVideoChannels;
    }
    
    public String getAuthId() {
        return authId;
    }
    
    public void setAuthId(String authId) {
        this.authId = authId;
    }
    
    public Integer getOneOrMany() {
        return oneOrMany;
    }
    
    public void setOneOrMany(Integer oneOrMany) {
        this.oneOrMany = oneOrMany;
    }
    
    public String getNickName() {
        return nickName;
    }
    
    public void setNickName(String nickName) {
        this.nickName = nickName;
    }
    

}
