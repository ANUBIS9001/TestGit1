package sale.user.bean;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class WChatOAExample {
    protected String orderByClause;

    protected boolean distinct;

    protected List<Criteria> oredCriteria;

    public WChatOAExample() {
        oredCriteria = new ArrayList<Criteria>();
    }

    public void setOrderByClause(String orderByClause) {
        this.orderByClause = orderByClause;
    }

    public String getOrderByClause() {
        return orderByClause;
    }

    public void setDistinct(boolean distinct) {
        this.distinct = distinct;
    }

    public boolean isDistinct() {
        return distinct;
    }

    public List<Criteria> getOredCriteria() {
        return oredCriteria;
    }

    public void or(Criteria criteria) {
        oredCriteria.add(criteria);
    }

    public Criteria or() {
        Criteria criteria = createCriteriaInternal();
        oredCriteria.add(criteria);
        return criteria;
    }

    public Criteria createCriteria() {
        Criteria criteria = createCriteriaInternal();
        if (oredCriteria.size() == 0) {
            oredCriteria.add(criteria);
        }
        return criteria;
    }

    protected Criteria createCriteriaInternal() {
        Criteria criteria = new Criteria();
        return criteria;
    }

    public void clear() {
        oredCriteria.clear();
        orderByClause = null;
        distinct = false;
    }

    protected abstract static class GeneratedCriteria {
        protected List<Criterion> criteria;

        protected GeneratedCriteria() {
            super();
            criteria = new ArrayList<Criterion>();
        }

        public boolean isValid() {
            return criteria.size() > 0;
        }

        public List<Criterion> getAllCriteria() {
            return criteria;
        }

        public List<Criterion> getCriteria() {
            return criteria;
        }

        protected void addCriterion(String condition) {
            if (condition == null) {
                throw new RuntimeException("Value for condition cannot be null");
            }
            criteria.add(new Criterion(condition));
        }

        protected void addCriterion(String condition, Object value, String property) {
            if (value == null) {
                throw new RuntimeException("Value for " + property + " cannot be null");
            }
            criteria.add(new Criterion(condition, value));
        }

        protected void addCriterion(String condition, Object value1, Object value2, String property) {
            if (value1 == null || value2 == null) {
                throw new RuntimeException("Between values for " + property + " cannot be null");
            }
            criteria.add(new Criterion(condition, value1, value2));
        }

        public Criteria andIdIsNull() {
            addCriterion("id is null");
            return (Criteria) this;
        }

        public Criteria andIdIsNotNull() {
            addCriterion("id is not null");
            return (Criteria) this;
        }

        public Criteria andIdEqualTo(Long value) {
            addCriterion("id =", value, "id");
            return (Criteria) this;
        }

        public Criteria andIdNotEqualTo(Long value) {
            addCriterion("id <>", value, "id");
            return (Criteria) this;
        }

        public Criteria andIdGreaterThan(Long value) {
            addCriterion("id >", value, "id");
            return (Criteria) this;
        }

        public Criteria andIdGreaterThanOrEqualTo(Long value) {
            addCriterion("id >=", value, "id");
            return (Criteria) this;
        }

        public Criteria andIdLessThan(Long value) {
            addCriterion("id <", value, "id");
            return (Criteria) this;
        }

        public Criteria andIdLessThanOrEqualTo(Long value) {
            addCriterion("id <=", value, "id");
            return (Criteria) this;
        }

        public Criteria andIdIn(List<Long> values) {
            addCriterion("id in", values, "id");
            return (Criteria) this;
        }

        public Criteria andIdNotIn(List<Long> values) {
            addCriterion("id not in", values, "id");
            return (Criteria) this;
        }

        public Criteria andIdBetween(Long value1, Long value2) {
            addCriterion("id between", value1, value2, "id");
            return (Criteria) this;
        }

        public Criteria andIdNotBetween(Long value1, Long value2) {
            addCriterion("id not between", value1, value2, "id");
            return (Criteria) this;
        }

        public Criteria andEmpCodeIsNull() {
            addCriterion("emp_code is null");
            return (Criteria) this;
        }

        public Criteria andEmpCodeIsNotNull() {
            addCriterion("emp_code is not null");
            return (Criteria) this;
        }

        public Criteria andEmpCodeEqualTo(String value) {
            addCriterion("emp_code =", value, "empCode");
            return (Criteria) this;
        }

        public Criteria andEmpCodeNotEqualTo(String value) {
            addCriterion("emp_code <>", value, "empCode");
            return (Criteria) this;
        }

        public Criteria andEmpCodeGreaterThan(String value) {
            addCriterion("emp_code >", value, "empCode");
            return (Criteria) this;
        }

        public Criteria andEmpCodeGreaterThanOrEqualTo(String value) {
            addCriterion("emp_code >=", value, "empCode");
            return (Criteria) this;
        }

        public Criteria andEmpCodeLessThan(String value) {
            addCriterion("emp_code <", value, "empCode");
            return (Criteria) this;
        }

        public Criteria andEmpCodeLessThanOrEqualTo(String value) {
            addCriterion("emp_code <=", value, "empCode");
            return (Criteria) this;
        }

        public Criteria andEmpCodeLike(String value) {
            addCriterion("emp_code like", value, "empCode");
            return (Criteria) this;
        }

        public Criteria andEmpCodeNotLike(String value) {
            addCriterion("emp_code not like", value, "empCode");
            return (Criteria) this;
        }

        public Criteria andEmpCodeIn(List<String> values) {
            addCriterion("emp_code in", values, "empCode");
            return (Criteria) this;
        }

        public Criteria andEmpCodeNotIn(List<String> values) {
            addCriterion("emp_code not in", values, "empCode");
            return (Criteria) this;
        }

        public Criteria andEmpCodeBetween(String value1, String value2) {
            addCriterion("emp_code between", value1, value2, "empCode");
            return (Criteria) this;
        }

        public Criteria andEmpCodeNotBetween(String value1, String value2) {
            addCriterion("emp_code not between", value1, value2, "empCode");
            return (Criteria) this;
        }

        public Criteria andCodeIsNull() {
            addCriterion("code is null");
            return (Criteria) this;
        }

        public Criteria andCodeIsNotNull() {
            addCriterion("code is not null");
            return (Criteria) this;
        }

        public Criteria andCodeEqualTo(String value) {
            addCriterion("code =", value, "code");
            return (Criteria) this;
        }

        public Criteria andCodeNotEqualTo(String value) {
            addCriterion("code <>", value, "code");
            return (Criteria) this;
        }

        public Criteria andCodeGreaterThan(String value) {
            addCriterion("code >", value, "code");
            return (Criteria) this;
        }

        public Criteria andCodeGreaterThanOrEqualTo(String value) {
            addCriterion("code >=", value, "code");
            return (Criteria) this;
        }

        public Criteria andCodeLessThan(String value) {
            addCriterion("code <", value, "code");
            return (Criteria) this;
        }

        public Criteria andCodeLessThanOrEqualTo(String value) {
            addCriterion("code <=", value, "code");
            return (Criteria) this;
        }

        public Criteria andCodeLike(String value) {
            addCriterion("code like", value, "code");
            return (Criteria) this;
        }

        public Criteria andCodeNotLike(String value) {
            addCriterion("code not like", value, "code");
            return (Criteria) this;
        }

        public Criteria andCodeIn(List<String> values) {
            addCriterion("code in", values, "code");
            return (Criteria) this;
        }

        public Criteria andCodeNotIn(List<String> values) {
            addCriterion("code not in", values, "code");
            return (Criteria) this;
        }

        public Criteria andCodeBetween(String value1, String value2) {
            addCriterion("code between", value1, value2, "code");
            return (Criteria) this;
        }

        public Criteria andCodeNotBetween(String value1, String value2) {
            addCriterion("code not between", value1, value2, "code");
            return (Criteria) this;
        }

        public Criteria andPasswordIsNull() {
            addCriterion("password is null");
            return (Criteria) this;
        }

        public Criteria andPasswordIsNotNull() {
            addCriterion("password is not null");
            return (Criteria) this;
        }

        public Criteria andPasswordEqualTo(String value) {
            addCriterion("password =", value, "password");
            return (Criteria) this;
        }

        public Criteria andPasswordNotEqualTo(String value) {
            addCriterion("password <>", value, "password");
            return (Criteria) this;
        }

        public Criteria andPasswordGreaterThan(String value) {
            addCriterion("password >", value, "password");
            return (Criteria) this;
        }

        public Criteria andPasswordGreaterThanOrEqualTo(String value) {
            addCriterion("password >=", value, "password");
            return (Criteria) this;
        }

        public Criteria andPasswordLessThan(String value) {
            addCriterion("password <", value, "password");
            return (Criteria) this;
        }

        public Criteria andPasswordLessThanOrEqualTo(String value) {
            addCriterion("password <=", value, "password");
            return (Criteria) this;
        }

        public Criteria andPasswordLike(String value) {
            addCriterion("password like", value, "password");
            return (Criteria) this;
        }

        public Criteria andPasswordNotLike(String value) {
            addCriterion("password not like", value, "password");
            return (Criteria) this;
        }

        public Criteria andPasswordIn(List<String> values) {
            addCriterion("password in", values, "password");
            return (Criteria) this;
        }

        public Criteria andPasswordNotIn(List<String> values) {
            addCriterion("password not in", values, "password");
            return (Criteria) this;
        }

        public Criteria andPasswordBetween(String value1, String value2) {
            addCriterion("password between", value1, value2, "password");
            return (Criteria) this;
        }

        public Criteria andPasswordNotBetween(String value1, String value2) {
            addCriterion("password not between", value1, value2, "password");
            return (Criteria) this;
        }

        public Criteria andEncryPasswordIsNull() {
            addCriterion("encry_passWord is null");
            return (Criteria) this;
        }

        public Criteria andEncryPasswordIsNotNull() {
            addCriterion("encry_passWord is not null");
            return (Criteria) this;
        }

        public Criteria andEncryPasswordEqualTo(String value) {
            addCriterion("encry_passWord =", value, "encryPassword");
            return (Criteria) this;
        }

        public Criteria andEncryPasswordNotEqualTo(String value) {
            addCriterion("encry_passWord <>", value, "encryPassword");
            return (Criteria) this;
        }

        public Criteria andEncryPasswordGreaterThan(String value) {
            addCriterion("encry_passWord >", value, "encryPassword");
            return (Criteria) this;
        }

        public Criteria andEncryPasswordGreaterThanOrEqualTo(String value) {
            addCriterion("encry_passWord >=", value, "encryPassword");
            return (Criteria) this;
        }

        public Criteria andEncryPasswordLessThan(String value) {
            addCriterion("encry_passWord <", value, "encryPassword");
            return (Criteria) this;
        }

        public Criteria andEncryPasswordLessThanOrEqualTo(String value) {
            addCriterion("encry_passWord <=", value, "encryPassword");
            return (Criteria) this;
        }

        public Criteria andEncryPasswordLike(String value) {
            addCriterion("encry_passWord like", value, "encryPassword");
            return (Criteria) this;
        }

        public Criteria andEncryPasswordNotLike(String value) {
            addCriterion("encry_passWord not like", value, "encryPassword");
            return (Criteria) this;
        }

        public Criteria andEncryPasswordIn(List<String> values) {
            addCriterion("encry_passWord in", values, "encryPassword");
            return (Criteria) this;
        }

        public Criteria andEncryPasswordNotIn(List<String> values) {
            addCriterion("encry_passWord not in", values, "encryPassword");
            return (Criteria) this;
        }

        public Criteria andEncryPasswordBetween(String value1, String value2) {
            addCriterion("encry_passWord between", value1, value2, "encryPassword");
            return (Criteria) this;
        }

        public Criteria andEncryPasswordNotBetween(String value1, String value2) {
            addCriterion("encry_passWord not between", value1, value2, "encryPassword");
            return (Criteria) this;
        }

        public Criteria andUseStateIsNull() {
            addCriterion("use_state is null");
            return (Criteria) this;
        }

        public Criteria andUseStateIsNotNull() {
            addCriterion("use_state is not null");
            return (Criteria) this;
        }

        public Criteria andUseStateEqualTo(Byte value) {
            addCriterion("use_state =", value, "useState");
            return (Criteria) this;
        }

        public Criteria andUseStateNotEqualTo(Byte value) {
            addCriterion("use_state <>", value, "useState");
            return (Criteria) this;
        }

        public Criteria andUseStateGreaterThan(Byte value) {
            addCriterion("use_state >", value, "useState");
            return (Criteria) this;
        }

        public Criteria andUseStateGreaterThanOrEqualTo(Byte value) {
            addCriterion("use_state >=", value, "useState");
            return (Criteria) this;
        }

        public Criteria andUseStateLessThan(Byte value) {
            addCriterion("use_state <", value, "useState");
            return (Criteria) this;
        }

        public Criteria andUseStateLessThanOrEqualTo(Byte value) {
            addCriterion("use_state <=", value, "useState");
            return (Criteria) this;
        }

        public Criteria andUseStateIn(List<Byte> values) {
            addCriterion("use_state in", values, "useState");
            return (Criteria) this;
        }

        public Criteria andUseStateNotIn(List<Byte> values) {
            addCriterion("use_state not in", values, "useState");
            return (Criteria) this;
        }

        public Criteria andUseStateBetween(Byte value1, Byte value2) {
            addCriterion("use_state between", value1, value2, "useState");
            return (Criteria) this;
        }

        public Criteria andUseStateNotBetween(Byte value1, Byte value2) {
            addCriterion("use_state not between", value1, value2, "useState");
            return (Criteria) this;
        }

        public Criteria andValidateTimeIsNull() {
            addCriterion("validate_time is null");
            return (Criteria) this;
        }

        public Criteria andValidateTimeIsNotNull() {
            addCriterion("validate_time is not null");
            return (Criteria) this;
        }

        public Criteria andValidateTimeEqualTo(Date value) {
            addCriterion("validate_time =", value, "validateTime");
            return (Criteria) this;
        }

        public Criteria andValidateTimeNotEqualTo(Date value) {
            addCriterion("validate_time <>", value, "validateTime");
            return (Criteria) this;
        }

        public Criteria andValidateTimeGreaterThan(Date value) {
            addCriterion("validate_time >", value, "validateTime");
            return (Criteria) this;
        }

        public Criteria andValidateTimeGreaterThanOrEqualTo(Date value) {
            addCriterion("validate_time >=", value, "validateTime");
            return (Criteria) this;
        }

        public Criteria andValidateTimeLessThan(Date value) {
            addCriterion("validate_time <", value, "validateTime");
            return (Criteria) this;
        }

        public Criteria andValidateTimeLessThanOrEqualTo(Date value) {
            addCriterion("validate_time <=", value, "validateTime");
            return (Criteria) this;
        }

        public Criteria andValidateTimeIn(List<Date> values) {
            addCriterion("validate_time in", values, "validateTime");
            return (Criteria) this;
        }

        public Criteria andValidateTimeNotIn(List<Date> values) {
            addCriterion("validate_time not in", values, "validateTime");
            return (Criteria) this;
        }

        public Criteria andValidateTimeBetween(Date value1, Date value2) {
            addCriterion("validate_time between", value1, value2, "validateTime");
            return (Criteria) this;
        }

        public Criteria andValidateTimeNotBetween(Date value1, Date value2) {
            addCriterion("validate_time not between", value1, value2, "validateTime");
            return (Criteria) this;
        }
    }

    public static class Criteria extends GeneratedCriteria {

        protected Criteria() {
            super();
        }
    }

    public static class Criterion {
        private String condition;

        private Object value;

        private Object secondValue;

        private boolean noValue;

        private boolean singleValue;

        private boolean betweenValue;

        private boolean listValue;

        private String typeHandler;

        public String getCondition() {
            return condition;
        }

        public Object getValue() {
            return value;
        }

        public Object getSecondValue() {
            return secondValue;
        }

        public boolean isNoValue() {
            return noValue;
        }

        public boolean isSingleValue() {
            return singleValue;
        }

        public boolean isBetweenValue() {
            return betweenValue;
        }

        public boolean isListValue() {
            return listValue;
        }

        public String getTypeHandler() {
            return typeHandler;
        }

        protected Criterion(String condition) {
            super();
            this.condition = condition;
            this.typeHandler = null;
            this.noValue = true;
        }

        protected Criterion(String condition, Object value, String typeHandler) {
            super();
            this.condition = condition;
            this.value = value;
            this.typeHandler = typeHandler;
            if (value instanceof List<?>) {
                this.listValue = true;
            } else {
                this.singleValue = true;
            }
        }

        protected Criterion(String condition, Object value) {
            this(condition, value, null);
        }

        protected Criterion(String condition, Object value, Object secondValue, String typeHandler) {
            super();
            this.condition = condition;
            this.value = value;
            this.secondValue = secondValue;
            this.typeHandler = typeHandler;
            this.betweenValue = true;
        }

        protected Criterion(String condition, Object value, Object secondValue) {
            this(condition, value, secondValue, null);
        }
    }
}