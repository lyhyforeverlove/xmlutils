package com.eeduspace.management.persist.enumeration;


/**
 * Author: dingran
 * Date: 2015/11/3
 * Description:
 */
public class RoleEnum {

    private Type type;
    private Status status;
    private PermissionType permissionType;

    public enum Type {
        Test(0),
        CustomerService(1),//客服管理员
        Product(2),//运营管理员
        System (3);//系统管理员
        private final int value;

        public int getValue() {
            return value;
        }

        Type(int value) {
            this.value = value;
        }
    }
    public enum Status {
        Enable(0),
        Disable(1),
        IsDelete(2);
        private final int value;

        public int getValue() {
            return value;
        }

        Status(int value) {
            this.value = value;
        }
    }
    
    public enum PermissionType {
        Test(0),
        Management(1),//用户管理
        Order(2),//订单管理
        VIP(3),//VIP管理
        Permission(4);//权限管理
        
        private final int value;

        public int getValue() {
            return value;
        }

        PermissionType(int value) {
            this.value = value;
        }
    }

    public Type getType() {
        return type;
    }

    public void setType(Type type) {
        this.type = type;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

	public PermissionType getPermissionType() {
		return permissionType;
	}

	public void setPermissionType(PermissionType permissionType) {
		this.permissionType = permissionType;
	}
    
    
    
    
}
