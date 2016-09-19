/**
 *  js实现的map
 * Author：dingran
 */
function Map() {
    this.elements = new Array();
    //获取MAP元素个数
    this.size = function() {
        return this.elements.length;
    };
    //判断MAP是否为空
    this.isEmpty = function() {
        return (this.elements.length < 1);
    };
    //删除MAP所有元素
    this.clear = function() {
        this.elements = new Array();
    };
    //向MAP中增加元素（key, value)
    this.put = function(_key, _value) {
        this.elements.push( {
            key : _key,
            value : _value
        });
    };
    //删除指定KEY的元素，成功返回True，失败返回False
    this.remove = function(_key) {
        var bln = false;
        try {
            for (i = 0; i < this.elements.length; i++) {
                if (this.elements[i].key == _key) {
                    this.elements.splice(i, 1);
                    return true;
                }
            }
        } catch (e) {
            bln = false;
        }
        return bln;
    };
    //获取指定KEY的元素值VALUE，失败返回NULL
    this.get = function(_key) {
        try {
            for (i = 0; i < this.elements.length; i++) {
                if (this.elements[i].key == _key) {
                    return this.elements[i].value;
                }
            }
        } catch (e) {
            return null;
        }
    };
    //获取指定索引的元素（使用element.key，element.value获取KEY和VALUE），失败返回NULL
    this.element = function(_index) {
        if (_index < 0 || _index >= this.elements.length) {
            return null;
        }
        return this.elements[_index];
    };
    //判断MAP中是否含有指定KEY的元素
    this.containsKey = function(_key) {
        var bln = false;
        try {
            for (i = 0; i < this.elements.length; i++) {
                if (this.elements[i].key == _key) {
                    bln = true;
                }
            }
        } catch (e) {
            bln = false;
        }
        return bln;
    };
    //判断MAP中是否含有指定VALUE的元素
    this.containsValue = function(_value) {
        var bln = false;
        try {
            for (i = 0; i < this.elements.length; i++) {
                if (this.elements[i].value == _value) {
                    bln = true;
                }
            }
        } catch (e) {
            bln = false;
        }
        return bln;
    };
    //获取MAP中所有VALUE的数组（ARRAY）
    this.values = function() {
        var arr = new Array();
        for (i = 0; i < this.elements.length; i++) {
            arr.push(this.elements[i].value);
        }
        return arr;
    };
    //获取MAP中所有KEY的数组（ARRAY）
    this.keys = function() {
        var arr = new Array();
        for (i = 0; i < this.elements.length; i++) {
            arr.push(this.elements[i].key);
        }
        return arr;
    };
    //获取MAP中所有KEY的数组（ARRAY）
    this.toJsonString = function() {
        var str="{";
        for ( i = 0; i < this.elements.length; i++) {
            str+="'"+this.elements[i].key+"':"+"'"+this.elements[i].value+"'";
            if(i!=this.elements.length-1){
                str+=",";
            }
        }
        str+="}";
        console.log("dd"+str);
        return str;
    };
}
/*
 //定义map
 function Map(){
 this.container = {};
 }

 //将key-value放入map中
 Map.prototype.put = function(key,value){
 try{

 if(key!=null && key != "")
 this.container[key] = value;

 }catch(e){
 return e;
 }
 };

 //根据key从map中取出对应的value
 Map.prototype.get = function(key){
 try{

 return this.container[key];

 }catch(e){
 return e;
 }
 };

 //判断map中是否包含指定的key
 Map.prototype.containsKey=function(key){

 try{
 for(var p in this.container)
 {
 if(this.p==key)
 return true;
 }

 return false;

 }catch(e){
 return e;
 }

 }

 //判断map中是否包含指定的value
 Map.prototype.containsValue = function(value){
 try{

 for(var p in this.container)
 {
 if(this.container[p] === value)
 return true;
 }

 return false;

 }catch(e){
 return e;
 }
 };


 //删除map中指定的key
 Map.prototype.remove = function(key){
 try{

 delete this.container[key];

 }catch(e){
 return e;
 }
 };

 //清空map
 Map.prototype.clear = function(){
 try{
 delete this.container;
 this.container = {};

 }catch(e){
 return e;
 }
 };

 //判断map是否为空
 Map.prototype.isEmpty = function(){

 if(this.keyArray().length==0)
 return true;
 else
 return false;
 };

 //获取map的大小
 Map.prototype.size=function(){

 return this.keyArray().length;
 }

 //返回map中的key值数组
 Map.prototype.keyArray=function(){

 var keys=new Array();
 for(var p in this.container)
 {
 keys.push(p);
 }

 return keys;
 }

 //返回map中的value值数组
 Map.prototype.valueArray=function(){

 var values=new Array();
 var keys=this.keyArray();
 for(var i=0;i<keys.length;i++)
 {
 values.push(this.container[keys[i]]);
 }

 return values;
 }*/
