# 临时使用的显示产品列表用的数据表
# 许中科
# 2016年7月8日 11:34:58
CREATE TABLE `t_product_show` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `name` varchar(255) DEFAULT NULL COMMENT '产品名',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8;

INSERT INTO `t_product_show` VALUES ('1', 'E卷通');
INSERT INTO `t_product_show` VALUES ('5', '学易云');
INSERT INTO `t_product_show` VALUES ('6', '小学网校通');
INSERT INTO `t_product_show` VALUES ('8', '中学网校通');
INSERT INTO `t_product_show` VALUES ('16', '视频通');
INSERT INTO `t_product_show` VALUES ('19', '高考改革讲坛');
INSERT INTO `t_product_show` VALUES ('20', '小学E卷通');
INSERT INTO `t_product_show` VALUES ('21', '试点校改革分享');
INSERT INTO `t_product_show` VALUES ('25', '中学期刊');
INSERT INTO `t_product_show` VALUES ('26', '小学期刊');
INSERT INTO `t_product_show` VALUES ('28', '传统文化会议');
INSERT INTO `t_product_show` VALUES ('29', '高改实践直播课');
INSERT INTO `t_product_show` VALUES ('30', '考试服务');
INSERT INTO `t_product_show` VALUES ('31', '假期作业');