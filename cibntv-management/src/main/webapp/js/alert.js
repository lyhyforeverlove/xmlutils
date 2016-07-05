var alert = window.alert || {};
alert.dialog = function() {
    var e, t, n = {},
    r = function() {
            var n = ['<div class="mod-dialog-bg"></div>', '<div class="mod-dialog">', '<div class="dialog-nav">', '<a href="#" onclick="return false" class="dialog-close"></a>', "</div>", '<div class="dialog-main"></div>', "</div>"].join(""),
                r = $(n).hide().appendTo("body");
            e = r.filter(".mod-dialog-bg"), t = r.filter(".mod-dialog"), t.find(".dialog-close").click(function() {
                u();
            })
        },
    i = function() {
            t.css("width", n.width || ""), t.find(".dialog-title").html(n.title), t.find(".dialog-main").html(n.html), t.show(), e.show(), s()
        },
    s = function() {
            var e = ($(window).width() - t.width()) / 2,
                n = ($(window).height() - t.height()) / 2;
            n = n > 0 ? n + $(window).scrollTop() : 0, t.css({
                left: e,
                top: n
            })
        },
    o = function(e) {
            return typeof e != "object" && (e = {
                html: e || ""
            }), n = $.extend({
                title: "提示",
                html: "",
                closeFn: null
            }, e), t || r(), i(), t
        },
    u = function() {
            e && e.hide(), t && t.hide(), n.closeFn && n.closeFn.call(this)
        };
        return {
            show: o,
            hide: u
        }
    }(),
    alert.dialog.confirm = function(e, t, n) {
            //如果是判断权限，就不显示取消按钮
            if(e==="您没有访问此功能模块的权限？"){
                var r = ['<div class="dialog-content">', "<p>" + e + "</p>", "</div>", '<div class="dialog-console clearfix_new">', '<a class="console-btn-confirm-privilege" href="#" onclick="return false;">返回登录页</a>', "</div>"].join(""),
                i = alert.dialog.show({html: r});
                $(".dialog-close").click(function() {
                    var e = t && t.call(i);
                    e !== !1 && alert.dialog.hide()
                });
                return i.find(".console-btn-confirm-privilege").click(function() {
                    var e = t && t.call(i);
                    e !== !1 && alert.dialog.hide()
                }), i
            }else{
                var r = ['<div class="dialog-content">', "<p>" + e + "</p>", "</div>", '<div class="dialog-console clearfix_new">', '<a class="console-btn-confirm" href="#" onclick="return false;">确定</a>', '<a class="console-btn-cancel" href="#" onclick="return false;">取消</a>', "</div>"].join(""),
                    i = alert.dialog.show({
                        html: r
                    });
                return i.find(".console-btn-confirm").click(function() {
                    var e = t && t.call(i);
                    e !== !1 && alert.dialog.hide()
                }), i.find(".console-btn-cancel").click(function() {
                    n && n.call(i), alert.dialog.hide()
                }), i
            }
}
