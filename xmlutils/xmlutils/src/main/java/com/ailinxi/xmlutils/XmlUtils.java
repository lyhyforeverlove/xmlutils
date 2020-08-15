package com.ailinxi.xmlutils;

import org.dom4j.Document;
import org.dom4j.DocumentException;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;

import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.lang.reflect.Modifier;
import java.text.SimpleDateFormat;
import java.util.*;

/**Xml解析工具类
 * @author aiheng@jd.com updateby songwei
 * @date 2020-08-15
 */
public class XmlUtils {

    private static final String UTF_8 = "UTF-8";
    private static final String XML_HEAD = "<?xml version=\"1.0\" encoding=\"%s\"?>";
    private static final String SPACE = "";
    private static final String LEFT_ANGLE = "<";
    private static final String RIGHT_ANGLE = ">";
    private static final String LEFT_SLASH_ANGLE = "</";
    private static final String SET = "set";
    private static final String GET = "get";
    private static final String DATE_PATTERN = "yyyy-MM-dd HH:mm:ss";

    private static final String POINT_JAVA = "java.";
    private static final String DATE = "java.util.Date";
    private static final String LONG = "java.lang.Long";
    private static final String INTEGER = "java.lang.Integer";
    private static final String DOUBLE = "java.lang.Double";
    private static final String FLOAT = "java.lang.Float";
    private static final String LIST = "java.util.List";

    /**
     * 将xml转成对应类型的对象
     *
     * @param xml    xml内容
     * @param clazz 转成对象的calss
     * @return      T
     */
    public static <T> T xmlToBean(String xml, Class<T> clazz) {
        Document doc;
        try {
            doc = DocumentHelper.parseText(xml);
            return parseDocument(clazz, doc);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    private static <T> T parseDocument(Class<T> clazz, Document doc)
            throws InstantiationException, IllegalAccessException, NoSuchMethodException, InvocationTargetException {
        T obj = clazz.newInstance();
        String rootName = getRootName(clazz);
        // 获取所有属性
        Field[] fields = clazz.getDeclaredFields();
        Map<String, Field> mappers = buildDataMapper(fields);
        Element rootElement = doc.getRootElement();
        if (!rootName.equals(rootElement.getName())) {
            throw new DomParseException("the rootName is [" + rootName + "], but the element root is [" + rootElement.getName() + "]");
        }
        for (Iterator<Element> iters = rootElement.elementIterator(); iters.hasNext(); ) {
            Element element = iters.next();
            String elementName = element.getName();
            Field field = mappers.get(elementName);
            if (field != null) {
                doFillObject(clazz, obj, element, field);
            }
        }
        return obj;
    }

    /**
     * 填充值，解析属性
     *
     * @param clazz                          clazz
     * @param obj                            obj
     * @param field                          field
     * @throws NoSuchMethodException         e
     * @throws IllegalAccessException        e
     * @throws InvocationTargetException     e
     * @throws InstantiationException        e
     */
    private static void doFillObject(Class<?> clazz, Object obj, Element element, Field field)
            throws NoSuchMethodException, IllegalAccessException, InvocationTargetException, InstantiationException {
        String setMethodName = SET + field.getName().substring(0, 1).toUpperCase() + field.getName().substring(1);
        Method setMethod = clazz.getMethod(setMethodName, field.getType());
        Object value = element.getData();
        // 属性中包含转换器
        if (field.isAnnotationPresent(DomFieldConvert.class)) {
            Class<? extends DomConvert> convert = field.getAnnotation(DomFieldConvert.class).value();
            DomConvert domConvert = convert.newInstance();
            Object newValue = domConvert.convert(value);
            setMethod.invoke(obj, newValue);
            return;
        }
        // 属性中包含@DomFieldRoot注解
        if (field.isAnnotationPresent(DomFieldRoot.class)) {
            DomFieldRoot domfieldroot = field.getAnnotation(DomFieldRoot.class);
            Class<?> subClass = domfieldroot.value();
            Field[] fields = subClass.getDeclaredFields();
            Map<String, Field> mappers = buildDataMapper(fields);
            String docText = element.asXML();
            Document doc;
            try {
                Object newValue;
                doc = DocumentHelper.parseText(docText);
                String fieldTypeName = field.getType().getName();
                Element rootElement = doc.getRootElement();
                if (LIST.equals(fieldTypeName)) {
                    List<Object> lists = new ArrayList<Object>();
                    for (Iterator<Element> iters = rootElement.elementIterator(); iters.hasNext(); ) {
                        Object subValue = subClass.newInstance();
                        Element subElement = iters.next();
                        for (Iterator<Element> iterator = subElement.elementIterator(); iterator.hasNext(); ) {
                            Element element1 = iterator.next();
                            Field subField = mappers.get(element1.getName());
                            if (subField != null) {
                                doFillObject(subClass, subValue, element1, subField);
                            }
                        }
                        lists.add(subValue);
                    }
                    newValue = lists;
                } else {
                    newValue = parseDocument(subClass, doc);
                }
                setMethod.invoke(obj, newValue);
                return;
            } catch (DocumentException e) {
                e.printStackTrace();
            }
        }
        if (value != null && !SPACE.equals(value)) {
            String localValue = (String) value;
            String fieldTypeName = field.getType().getName();
            if (LONG.equals(fieldTypeName)) {
                setMethod.invoke(obj, Long.valueOf(localValue));
                return;
            }
            if (INTEGER.equals(fieldTypeName)) {
                setMethod.invoke(obj, Integer.valueOf(localValue));
                return;
            }
            if (DOUBLE.equals(fieldTypeName)) {
                setMethod.invoke(obj, Double.valueOf(localValue));
                return;
            }
            if (FLOAT.equals(fieldTypeName)) {
                setMethod.invoke(obj, Float.valueOf(localValue));
                return;
            }
            setMethod.invoke(obj, value);
        }
    }

    private static Map<String, Field> buildDataMapper(Field[] fields){
        Map<String, Field> mappers = new HashMap<String, Field>(16);
        for (Field field : fields) {
            if (!Modifier.isStatic(field.getModifiers()) && !Modifier.isFinal(field.getModifiers())){
                // 如果实体属性中包含@DomFieldIngore注解,即不解析
                if (field.isAnnotationPresent(DomFieldIngore.class)) {
                    continue;
                }
                String fieldName = null;

                //包含DomField注解
                if (field.isAnnotationPresent(DomField.class)) {
                    DomField domField = field.getAnnotation(DomField.class);
                    if (!SPACE.equals(domField.value())) {
                        fieldName = domField.value();
                    }
                }

                if (fieldName == null) {
                    fieldName = field.getName();
                }
                mappers.put(fieldName, field);
            }
        }
        return mappers;
    }

    /**
     * 获取根名称
     *
     * @param clazz clazz
     * @return String
     */
    private static <T> String getRootName(Class<T> clazz) {
        String rootName = null;
        if (clazz.isAnnotationPresent(DomRoot.class)) {
            DomRoot domRoot = clazz.getAnnotation(DomRoot.class);
            if (!SPACE.equals(domRoot.value())) {
                rootName = domRoot.value();
            }
        } else {
            rootName = clazz.getSimpleName();
        }
        return rootName;
    }

    /**
     * 将对象转成xml
     *
     * @param t        t
     * @param encoding 编码
     * @return String
     */
    public static <T> String beanToXml(T t, String encoding, boolean xmlHead, boolean xmlRoot, boolean xmlField) {
        StringBuffer sb = new StringBuffer();
        try {
            if (xmlHead) {
                sb.append(String.format(XML_HEAD,encoding));
            }
            Class<?> clazz = t.getClass();
            String rootName = getRootName(clazz);
            if (xmlRoot) {
                sb.append(LEFT_ANGLE);
                sb.append(rootName);
//                sb.append(" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\"");
                sb.append(RIGHT_ANGLE);
            }
            // 获取所有属性
            Field[] fields = clazz.getDeclaredFields();
            buildXmlUseFields(t, sb, clazz, fields, xmlField);
            if (xmlRoot) {
                sb.append(LEFT_SLASH_ANGLE);
                sb.append(rootName);
                sb.append(RIGHT_ANGLE);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
        return sb.toString();
    }

    private static <T> void buildXmlUseFields(T t, StringBuffer sb, Class<?> clazz, Field[] fields, boolean xmlFullField)
            throws NoSuchMethodException, IllegalAccessException, InvocationTargetException {
        Map<String, Field> mappers = buildDataMapper(fields);
        for (Map.Entry<String, Field> entry : mappers.entrySet()) {
            String key = entry.getKey();
            Field field = entry.getValue();
            String getMethodName = GET + field.getName().substring(0, 1).toUpperCase() + field.getName().substring(1);
            Method getMethod = clazz.getMethod(getMethodName);
            Object value = getMethod.invoke(t);
            if (xmlFullField) {
                sb.append(LEFT_ANGLE);
                sb.append(key);
                sb.append(RIGHT_ANGLE);
            } else {
                if (value != null && value != "") {
                    sb.append(LEFT_ANGLE);
                    sb.append(key);
                    sb.append(RIGHT_ANGLE);
                }
            }
            if (field.getType().getName().startsWith(POINT_JAVA) && !LIST.equals(field.getType().getName())) {
                if (field.getType().getName().equals(DATE) && value != null) {
                    SimpleDateFormat sdf = new SimpleDateFormat(DATE_PATTERN);
                    sb.append(sdf.format(value));
                } else if (value != null) {
                    sb.append(value);
                }
            } else if (LIST.equals(field.getType().getName())) {
                List list = (List) value;
                for (Object obj : list) {
                    Class<?> objClass = obj.getClass();
                    String rootName = getRootName(objClass);
                    sb.append(LEFT_ANGLE);
                    sb.append(rootName);
                    sb.append(RIGHT_ANGLE);
                    buildXmlUseFields(obj, sb, objClass, objClass.getDeclaredFields(), xmlFullField);
                    sb.append(LEFT_SLASH_ANGLE);
                    sb.append(rootName);
                    sb.append(RIGHT_ANGLE);
                }
            } else {
                Class<?> type = field.getType();
                buildXmlUseFields(value, sb, type, type.getDeclaredFields(), xmlFullField);
            }
            if (xmlFullField) {
                sb.append(LEFT_SLASH_ANGLE);
                sb.append(key);
                sb.append(RIGHT_ANGLE);
            } else {
                if (value != null && value != SPACE) {
                    sb.append(LEFT_SLASH_ANGLE);
                    sb.append(key);
                    sb.append(RIGHT_ANGLE);
                }
            }
        }
    }

    public static <T> String beanToXml(T t, boolean xmlHead, boolean xmlRoot, boolean xmlFullField) {
        return beanToXml(t, UTF_8, xmlHead, xmlRoot, xmlFullField);
    }

}
