package sale.user.bean;

import java.io.Serializable;
import java.util.Date;

public class WChatOA implements Serializable{
	
	private static final long serialVersionUID = 1L;

	private Long id;

    private String empCode;

    private String code;

    private String password;

    private String encryPassword;

    private Byte useState;

    private Date validateTime;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmpCode() {
        return empCode;
    }

    public void setEmpCode(String empCode) {
        this.empCode = empCode == null ? null : empCode.trim();
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code == null ? null : code.trim();
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password == null ? null : password.trim();
    }

    public String getEncryPassword() {
        return encryPassword;
    }

    public void setEncryPassword(String encryPassword) {
        this.encryPassword = encryPassword == null ? null : encryPassword.trim();
    }

    public Byte getUseState() {
        return useState;
    }

    public void setUseState(Byte useState) {
        this.useState = useState;
    }

    public Date getValidateTime() {
        return validateTime;
    }

    public void setValidateTime(Date validateTime) {
        this.validateTime = validateTime;
    }
}