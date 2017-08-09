################## Version 1.0.0 ######################
###		初始化数据库
###		wangwei01
###		2016-05-19

# 创建并初始化产品表
# 王伟01
# 2016-05-19
CREATE TABLE `t_product` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `name` varchar(255) DEFAULT NULL COMMENT '产品名',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8;

insert  into `t_product`(`id`,`name`) values (1,'E卷通');
insert  into `t_product`(`id`,`name`) values (2,'校园门户网站');
insert  into `t_product`(`id`,`name`) values (5,'学易云');
insert  into `t_product`(`id`,`name`) values (6,'小学网校通');
insert  into `t_product`(`id`,`name`) values (8,'中学网校通');
insert  into `t_product`(`id`,`name`) values (13,'通用产品');
insert  into `t_product`(`id`,`name`) values (15,'学易提分卡');
insert  into `t_product`(`id`,`name`) values (16,'视频通');
insert  into `t_product`(`id`,`name`) values (19,'高考改革讲坛');
insert  into `t_product`(`id`,`name`) values (20,'小学E卷通');
insert  into `t_product`(`id`,`name`) values (21,'试点校改革分享');
insert  into `t_product`(`id`,`name`) values (25,'中学期刊');
insert  into `t_product`(`id`,`name`) values (26,'小学期刊');
insert  into `t_product`(`id`,`name`) values (27,'学易100');
insert  into `t_product`(`id`,`name`) values (28,'传统文化会议');
insert  into `t_product`(`id`,`name`) values (29,'高改实践直播课');
insert  into `t_product`(`id`,`name`) values (30,'考试服务');
insert  into `t_product`(`id`,`name`) values (31,'假期作业');


# 创建角色表
# 王伟01
# 2016-05-19
CREATE TABLE `t_role` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `name` varchar(20) NOT NULL COMMENT '角色名',
  `description` varchar(255) DEFAULT NULL COMMENT '描述',
  `state` int(2) NOT NULL DEFAULT '0' COMMENT '角色状态，保留',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

# 创建用户表
# 王伟01
# 2016-05-19
CREATE TABLE `t_user` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `login_name` varchar(20) DEFAULT NULL COMMENT '登录名',
  `emp_code` varchar(20) NOT NULL COMMENT '用户编号',
  `emp_name` varchar(20) DEFAULT NULL COMMENT '用户名',
  `email` varchar(50) DEFAULT NULL COMMENT '邮箱',
  `proxy_area` varchar(50) DEFAULT NULL COMMENT '业务员代理的区域',
  `address` varchar(255) DEFAULT NULL COMMENT '联系地址',
  `telephone` varchar(20) DEFAULT NULL COMMENT '手机号',
  `openid` varchar(50) DEFAULT NULL COMMENT '微信用户对公众号的唯一标识',
  `create_time` datetime DEFAULT NULL COMMENT '账户创建时间',
  `state` tinyint(4) NOT NULL DEFAULT '0' COMMENT '用户账户状态，默认为0，表示正常，值为1时，表示该账户冻结',
  PRIMARY KEY (`id`),
  KEY `emp_code` (`emp_code`),
  KEY `openid` (`openid`)
) ENGINE=InnoDB AUTO_INCREMENT=64 DEFAULT CHARSET=utf8;

# 创建用户角色关联表
# 王伟01
# 2016-05-19
CREATE TABLE `t_user_role` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `user_id` bigint(20) DEFAULT NULL COMMENT '用户id',
  `role_id` bigint(20) DEFAULT NULL COMMENT '角色id',
  `state` tinyint(4) NOT NULL DEFAULT '0' COMMENT '状态',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

# 创建并初始化激活码和oa账户关联表
# 王伟01
# 2016-05-19
CREATE TABLE `t_wchat_oa` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `emp_code` varchar(20) NOT NULL COMMENT '用户编号',
  `code` varchar(40) NOT NULL COMMENT '授权码',
  `password` varchar(20) NOT NULL COMMENT '密码',
  `encry_passWord` varchar(50) NOT NULL COMMENT '加密后的密码',
  `use_state` tinyint(4) NOT NULL DEFAULT '0' COMMENT '使用状态（0：未使用，1：已使用）',
  `validate_time` datetime DEFAULT NULL COMMENT '成功激活后的时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `epm_code` (`emp_code`),
  UNIQUE KEY `code` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=1201 DEFAULT CHARSET=utf8;

insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (1,'yx00001','xsjf201612637','8nn395lw','8a5464ca9ba9a814ad0a779554937de0',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (2,'yx00002','xsjf201660520','zj7yrhnq','358c9c89774ccc9438052ac55bcb4b54',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (3,'yx00003','xsjf201641597','4cvd9jrw','8cea369714fc13008d7d1dd121c3a6a7',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (4,'yx00004','xsjf201676912','0ub1fqwk','7bba873a645c340b6b0a83bd36fcf631',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (5,'yx00005','xsjf201682178','lp4y3m9u','d031332ef0365de9c01e764225164aa7',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (6,'yx00006','xsjf201625532','qvjki7ga','c7faf6871e42b9a8df0da8c53e3656b5',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (7,'yx00007','xsjf201645881','a7atye6r','370ab9db3f0700988ca08f4ed99fb96a',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (8,'yx00008','xsjf201654574','h6gv31iv','71f78382f7de5943648d3030ba6bf0f1',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (9,'yx00009','xsjf201614278','dzn4why6','3dcb9baa0472c7f46a299ac267a7cec8',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (10,'yx00010','xsjf201637741','yu06akfj','f0da228b94cfac9b6ed7ee81f06b28ad',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (11,'yx00011','xsjf201678526','nrdhkg3b','594b08ff17e3f54ef3f7c9bbcf28b3b5',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (12,'yx00012','xsjf201612640','csljskm0','5ee0513c0f67d8eca37ef13c2abc9aea',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (13,'yx00013','xsjf201660963','6zlgispa','4d2d9f7e8de01d9e0ffc5d691d9413f9',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (14,'yx00014','xsjf201646962','aqrckm5w','c0e70a3e5692f82d9ea5a4fd5654785d',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (15,'yx00015','xsjf201646706','04kp8g0k','449254e3212b5dfc6b1725fbfae7df2e',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (16,'yx00016','xsjf201640682','klkab281','1afde55e6c190527419e91191a8d81d3',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (17,'yx00017','xsjf201641838','eddm8kq2','1647fb59c332001ca79081c6390dffbb',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (18,'yx00018','xsjf201633743','dda6bp82','ad1472d9bfe83f7cce5040ac46db00c2',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (19,'yx00019','xsjf201646561','xxd75hb2','338800669fc3d5892f952183e4ae0c0f',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (20,'yx00020','xsjf201626546','pzymdm38','fc03b5010f229c0b1494a6440cb15bcd',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (21,'yx00021','xsjf201649704','scn2j729','3f59a1c00e20f86fca98e228bf903756',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (22,'yx00022','xsjf201631585','88ltedxx','6e928e0b8a4830a653850a9bb8b336ff',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (23,'yx00023','xsjf201695101','p0sljxcm','e1b329bf1155836b600355d67b450be9',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (24,'yx00024','xsjf201630696','fxjnusxl','2cb35568995236c77ab1f5f8f3b6e273',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (25,'yx00025','xsjf201674418','6y5ub9e4','858bef65991647844853b018b4307c78',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (26,'yx00026','xsjf201673489','9ctxgpu6','10299095b329be4e854f658e3503dca1',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (27,'yx00027','xsjf201651296','reqb7jrl','7c14d61af9e18dff379ed25e306dd5b5',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (28,'yx00028','xsjf201694806','rp3f2z7e','6985c056083eec7d4d6fd9b0e5b271bb',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (29,'yx00029','xsjf201693935','9c2xhw4c','b8e1d747f821ffda936e1c2b064b37df',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (30,'yx00030','xsjf201674941','q0s81jdr','627bd518ef7974a1c454aeaa28e87c20',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (31,'yx00031','xsjf201650957','j7d90tph','a708569d5308d1b4eff58b8047825c59',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (32,'yx00032','xsjf201620468','yqqpeedz','1ea2a07d4da301d9ee81db3166e029a3',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (33,'yx00033','xsjf201662319','edf7lfls','fdcf6389dedce1e1f64f98acba19a3cd',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (34,'yx00034','xsjf201684144','47vntjqj','0a51f0726bedcd10a5ec1de43bd150de',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (35,'yx00035','xsjf201642365','z3y8460y','acf0a323480800540e49da47cb0419fa',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (36,'yx00036','xsjf201680811','ga0muae1','30fe8d2d1399bc28c7e37bcf403ffbfd',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (37,'yx00037','xsjf201636613','cyx42rjz','0b019123afa53f07455fcfedc5ee0ce8',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (38,'yx00038','xsjf201689979','drzg0nd7','664b9ecbc4a24ea25cded1ae0de20b83',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (39,'yx00039','xsjf201637917','wrfxyqvi','481e2c2dd3ba4b19ba71b6699a93d1cf',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (40,'yx00040','xsjf201625518','21w47l05','9dcc1508ae6755ef446497a9be16cfb4',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (41,'yx00041','xsjf201647324','5vp0816a','4f3874c4a5dbcb58de8618cd035cc4b1',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (42,'yx00042','xsjf201620175','u4gv8m1v','163a987613a89535f548f75daf673179',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (43,'yx00043','xsjf201696335','54it4yyk','c33eae0f6e2182a88f20817ec0ef9321',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (44,'yx00044','xsjf201621112','bb48gthu','6abb28b8e71d1ea8d4e579a262cdc7b3',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (45,'yx00045','xsjf201682220','8l627db4','bb832b87cfc2faf69973a1b5ebc5adcc',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (46,'yx00046','xsjf201663374','xr64j6t9','501d6315eadfa52c756c1af0bc219fb0',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (47,'yx00047','xsjf201642383','ea7xb43n','e35ff32c8b253d6a6c5ce1ee3e7dfc96',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (48,'yx00048','xsjf201636854','0lq0wxms','1932b70f023fa3440d87235d9b980770',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (49,'yx00049','xsjf201646810','67ni0k3c','9203730989f6253c2c6825414204ddab',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (50,'yx00050','xsjf201678245','4rwq006j','d28f4cd0defd8455bc778892bc7deda3',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (51,'yx00051','xsjf201614583','m13eegsk','e5f8349fcbca6243ae8c32333c7020e4',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (52,'yx00052','xsjf201659018','bp3l5dpn','55ab9800de60aab3e257d174f5ba3763',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (53,'yx00053','xsjf201613748','hqruy3wl','b5edc2075174cd1874bed0041d5d0fc8',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (54,'yx00054','xsjf201621875','m9kp95zp','cc2ba7ec19312715631bb595c90b0f00',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (55,'yx00055','xsjf201614212','y6scfujg','bb007fafedfa2069141d316fcddad34f',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (56,'yx00056','xsjf201664303','s807f8pl','f69cc90b3a47bb5575bf97e57a8d6e0a',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (57,'yx00057','xsjf201624125','5dt5r49f','a118eeef0d45024ca85019395d4efaf0',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (58,'yx00058','xsjf201667630','ts95f0f2','af695dcefedadbbcf7c73b1a0c3a7e68',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (59,'yx00059','xsjf201660886','10naskmv','c3db85da4098ddb9efadeaf3ecabe3a0',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (60,'yx00060','xsjf201689529','l69t3x1t','4dc8b06e1143e7ce7694d1f8c559c823',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (61,'yx00061','xsjf201618927','y3icfmnz','1ce1b62375810ad8ac3058e0c796a681',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (62,'yx00062','xsjf201698934','bne8c1g1','8ed421a4ec2804749faa9b3d2b9fcd68',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (63,'yx00063','xsjf201633507','zj8k2hnz','97b93a9bc8ab8054d660f73dee0a563e',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (64,'yx00064','xsjf201681063','pykpapqf','d0458d31bd6016cbe2f8ac23bd033bfc',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (65,'yx00065','xsjf201670243','sxd16uf1','14602f6755676ee727d65bd071021dcb',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (66,'yx00066','xsjf201654272','22n891sv','955ad58ff0e44a8d5f87d91469ee1435',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (67,'yx00067','xsjf201651763','cjzq04pk','b0c12473cf0d9cf2ed0404da4a1fd1cd',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (68,'yx00068','xsjf201680189','8ggy8svn','868a386c8564b39ee44c91b7e5249fd4',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (69,'yx00069','xsjf201692981','buxa9rjp','e861c08d0706a9ee49cfe8b9dac9bf92',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (70,'yx00070','xsjf201656996','wc4fgw0t','bf50c0a8b08665acae2779a945e3f07f',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (71,'yx00071','xsjf201626072','tgy9dtre','b01f51815658bec8b6410fb79f03cbae',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (72,'yx00072','xsjf201619297','ighbb2ga','3a8637414acf15f44a36d6fb44337196',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (73,'yx00073','xsjf201697855','jpr7d82b','349c0a2e0357d95ddb62c8d0cb6161a8',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (74,'yx00074','xsjf201616877','ik8dfjw3','ba5c1379a85549b67eb5a1e2745af9ed',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (75,'yx00075','xsjf201612612','gq82vsga','f90b910f1d4c225cffd1c449038d414c',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (76,'yx00076','xsjf201612206','79k3k9un','b9b962e8310021db1f0c615820a872d8',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (77,'yx00077','xsjf201670112','s7qiv48m','c152fbbc4a014f1a292ee727e8bf6dd9',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (78,'yx00078','xsjf201643350','pzhyu09q','5a8c100dc45b4e2b7879ee55c6223d67',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (79,'yx00079','xsjf201687263','qhhd3q2i','ef2d9384746fe43c006bed2599a51950',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (80,'yx00080','xsjf201618113','x7vi5hm8','c5f2fc2a4f3283d3938e87be579d8e5d',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (81,'yx00081','xsjf201662152','0di1abmx','0a55fac493bf98eb57c85267ad9e2e3b',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (82,'yx00082','xsjf201629689','axjfurpl','10927548ab50506f9a7398495f4d7d91',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (83,'yx00083','xsjf201626050','wjurdk0e','455a6a63c1b77124bbb56067dac7e841',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (84,'yx00084','xsjf201660270','6adqu7wg','3019851913d7661db031ca4788c2d476',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (85,'yx00085','xsjf201634717','7e40hy3q','79a3fe89bb2d1a825f1a8ff1c9f31323',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (86,'yx00086','xsjf201643733','qmcaqde6','551e8f344ce33d3ee5a3cb9e8eae8620',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (87,'yx00087','xsjf201611312','ugifjim7','3fb352f0ddfb01cebbf10d8b85b17c34',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (88,'yx00088','xsjf201697152','i31flkhe','76e1d11b31fe6b9823d8884beed75996',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (89,'yx00089','xsjf201699998','bv2l3349','2890f1f141e5e6a3a9ecc8afc204437e',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (90,'yx00090','xsjf201634355','pfh4jlaa','0afe32de202d54e6900c8db9e755cf74',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (91,'yx00091','xsjf201626184','18zp7hfh','5bec3ab410bc05340db3f60b5e7fcc4f',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (92,'yx00092','xsjf201630453','p8rzlx56','a7b1e29a07033252c37ab1e1afc7e553',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (93,'yx00093','xsjf201671848','im07392p','e2139dc88c1ded5865ca8abfb5298b4f',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (94,'yx00094','xsjf201654315','ymxxveqq','b8286c2f15018f0d262ed7820812a5c6',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (95,'yx00095','xsjf201679948','gwm4bfcu','76c0c6164840eb702041666691171f24',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (96,'yx00096','xsjf201615880','vnqvtgyh','796162cc57be9d1a0e5094d6334226d3',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (97,'yx00097','xsjf201671592','utrfaqh9','49d7c51b628fb06f773aa81557b60cb4',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (98,'yx00098','xsjf201698923','elz9qshe','b61266969de2c3265ef4aaa6745e3392',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (99,'yx00099','xsjf201661889','e8xausaq','00db2e4109e1a7d1dba888c619164718',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (100,'yx00100','xsjf201613894','1z726ltx','b3a224ed7a0327a419d2277036c900d9',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (101,'yx00101','xsjf201684019','e891mk8q','42c42c806ff9c45c8ec009ac969321d8',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (102,'yx00102','xsjf201635365','u6xjg43a','88afbd269d909e35b6faf67a5686f5fb',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (103,'yx00103','xsjf201633947','v7akzcan','35c5728bbfa695b13d27f96d58b9d6bf',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (104,'yx00104','xsjf201681444','mjyh575n','e831725cb745057347cd80be02b0e6be',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (105,'yx00105','xsjf201677472','4ytq16uc','1d87548791963075600a6e77d06e1b7d',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (106,'yx00106','xsjf201650026','rwlf1rne','b2581b457ce8e5584217d63f823c8d93',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (107,'yx00107','xsjf201647016','cx7heuuk','38ddfd40f7ea2fda1d040ef41b7b5f46',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (108,'yx00108','xsjf201631118','54dfl9ns','cc2125ee85e815a2e56fe2b676383c35',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (109,'yx00109','xsjf201664714','8sv7ygld','80ff86b076147be3b07f1d357fc8ec1e',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (110,'yx00110','xsjf201639595','vj6cp9fx','8356359372c4c659bfa3e1bb942a91ff',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (111,'yx00111','xsjf201639527','5kbl97qn','1bd2e07fd2f2995ea57b3e38dda6aec2',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (112,'yx00112','xsjf201696199','zmbrdi01','202d36c8b53def10628d507a0e2d114e',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (113,'yx00113','xsjf201626695','yc6y913i','df66578eb7212d4087f44d04c80bd3fa',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (114,'yx00114','xsjf201656048','kp2mlg14','088f271ef75d8497034350328ad813a2',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (115,'yx00115','xsjf201671899','uzaudkkl','dca2205bc72e6293cc6868e63a66b154',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (116,'yx00116','xsjf201665052','y979k88g','34573351566aed49dd71d6b6a36e1fbb',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (117,'yx00117','xsjf201613106','38il5wcq','37d95ddeba8fc315cdfe9c318679952e',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (118,'yx00118','xsjf201670954','t16bag41','4c4e409f661538b38385719f42d417d0',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (119,'yx00119','xsjf201624287','agzn7qzs','b55446562b68d75ec336688ba3c86a36',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (120,'yx00120','xsjf201617768','rkq73fb2','e49a079219b362cacac12fd0bebee01b',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (121,'yx00121','xsjf201643480','y7zvn23v','8f27d83bae2bea52583ee8e1c9b2a2b7',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (122,'yx00122','xsjf201611559','qignwire','46789ba8ec8ee8d18495bc00fd16a7db',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (123,'yx00123','xsjf201667637','ewcu6zgm','210cd94f836bce527d7b4686cc72d272',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (124,'yx00124','xsjf201626574','eydbqc1r','edc712e53cc0aaf3fe4be6d29c19322a',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (125,'yx00125','xsjf201677245','zf9kqhm9','de0f544437033d0e88b4ee49e2d6dda9',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (126,'yx00126','xsjf201638902','3ca6n9s3','7322d54ddf22f49be8f3448217657c2a',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (127,'yx00127','xsjf201636803','mexn0us6','aa3da60bece240f01004351a6f27bba1',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (128,'yx00128','xsjf201653526','jkjg9y26','26227246157636150c2a097698db27d6',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (129,'yx00129','xsjf201685050','jp8pqc8u','5c4d1569e9f7c729cb232681323537f0',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (130,'yx00130','xsjf201685419','su2syn0c','d7cda713b2a01f317169dc11379b5afa',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (131,'yx00131','xsjf201666999','5us993r5','a1af7de46a7662483f0c15626f3e654a',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (132,'yx00132','xsjf201642495','8nxjrxbc','9de231ee58a0b62daa2ee476fb5068d0',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (133,'yx00133','xsjf201639791','lntvtkvl','6e43e4517f314e8c927b795dd280df29',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (134,'yx00134','xsjf201666329','7wfsac87','8051f331ed3115c6e6b6337497c95aec',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (135,'yx00135','xsjf201672339','ezbpknnz','ea78c15758bf41f49837f34e70ab8abd',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (136,'yx00136','xsjf201686838','g6f8p1e1','3611abf34a6d4df984b7fe63c55d69a5',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (137,'yx00137','xsjf201638667','pl3dqif1','c7a338349b7f8548c43c671acae5b8f3',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (138,'yx00138','xsjf201695418','7e9rbejb','15f08ab446d953dd482897abc6a4eeed',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (139,'yx00139','xsjf201671118','q4ptgpur','8e14bc24ce4c72b75f8631921aa57174',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (140,'yx00140','xsjf201638051','8dy215bi','4f0c02998c40304b4d834ecf54efb239',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (141,'yx00141','xsjf201641130','a6ls53id','f702dec93f9edc2b1d096d78fa2b66de',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (142,'yx00142','xsjf201662569','6p94fjg5','954c36f2dc401e84644793f89da3149e',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (143,'yx00143','xsjf201675699','pbx3m928','42a092d02fbe790919b758220b01f158',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (144,'yx00144','xsjf201694667','4jdkl59n','770bcb7bb5401b15d127f30f412a1b59',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (145,'yx00145','xsjf201617604','xryi9hpl','07ce985e67f15965f0873e1d5fd471a0',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (146,'yx00146','xsjf201655796','agpgc83f','c656bedcd8b490a1b1153618f754b387',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (147,'yx00147','xsjf201697490','vry7cb88','a2b35fb3d9444197b6c095e3254e2de8',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (148,'yx00148','xsjf201626018','jrkcgp3b','f999ae12b67afe4ae0abb029b6b635df',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (149,'yx00149','xsjf201624227','ki36x7zn','f3f6b5d32fe3f38926a5448e9f6f6949',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (150,'yx00150','xsjf201643594','cmemhz8i','3d38885e041fa61baac438055579889f',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (151,'yx00151','xsjf201683684','225wnzp5','bc59bbbbfd22ad0441822ec0a158a63f',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (152,'yx00152','xsjf201638572','jpwldqet','0a7e20fcd15f3714b482f705e5dfe8fd',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (153,'yx00153','xsjf201697754','guk2am32','1c04bc36dd50811a8d91fe93a9bb5444',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (154,'yx00154','xsjf201626443','4d9emix0','0b94c62e9d67fa48510388c3d145dbf4',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (155,'yx00155','xsjf201671243','s7lnx9jy','f7babf5cef6118677f0f8230c19aeaea',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (156,'yx00156','xsjf201654205','0u2bt8j5','5e106e3324a2056ee5679de94d1f3629',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (157,'yx00157','xsjf201617219','7nzdjnb2','c608ba3e8065eec643efb7208bc31f95',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (158,'yx00158','xsjf201685257','uk06l5er','6186a8e14f0bda22e5d57c16d7edb615',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (159,'yx00159','xsjf201686890','tei6ry85','3fa58f6d550b072089eafb50bbab8be7',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (160,'yx00160','xsjf201651583','8spjvbkg','71bce25655e9db5c26d804aa08b911b2',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (161,'yx00161','xsjf201629244','rpcgiwt6','01b24dda0642a34d7b8aea8cf3646879',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (162,'yx00162','xsjf201693332','9b1bz3gt','8a1779b7ea2b3c9e7b27a28e71470840',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (163,'yx00163','xsjf201636741','mildqeb3','3350529873af16dbee6a5e1d7b74e0be',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (164,'yx00164','xsjf201684101','6srlqsnp','a1f96d87cc73646961a27a183c807b58',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (165,'yx00165','xsjf201618033','m4gdjme9','1ec61a365012a6953be2d11dd20885c9',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (166,'yx00166','xsjf201638043','yt6s1u1l','30655efccabdf6c38333f70fdca5011a',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (167,'yx00167','xsjf201647319','86zbtdi7','4fa20447c013626c6a74a3942bab295f',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (168,'yx00168','xsjf201698663','4jcz1kmw','60242ce13078b1e900ecd05885725afc',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (169,'yx00169','xsjf201643325','g0lpaywl','bec37610ded9e1eb2a13836bfc1092e0',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (170,'yx00170','xsjf201671049','l94dzk9v','44aedb09da3fbd7896258a4f080ccf42',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (171,'yx00171','xsjf201627953','7u5aebd8','80d41f6227f5f384568d59d9b4b8b361',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (172,'yx00172','xsjf201659027','tnhxgpnm','1cb65bac2ca5d9c0371dbad901e5e187',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (173,'yx00173','xsjf201668308','pv62fgf3','4160e3757d874cf4736b0a65c2783085',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (174,'yx00174','xsjf201685276','ftrb696m','d125f1ea18a0caa5bbb2054d16396a61',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (175,'yx00175','xsjf201673075','prtyq995','6274a568997719ea67467e27bf3884f1',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (176,'yx00176','xsjf201660358','gv1sq1gi','0d10cea8026f030436cb1eda2d46c781',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (177,'yx00177','xsjf201658528','brxsv5r3','179fc56394aa26515597732e04e94a0a',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (178,'yx00178','xsjf201697941','rlna2zy8','4346806846c30ee1d02ce374b8b1475d',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (179,'yx00179','xsjf201658022','gcaeybfk','2c23888d8d10e68eef66d62fb8e5ac52',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (180,'yx00180','xsjf201652777','fww2brcu','a0e081247ff8e59b5073f043e4692c34',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (181,'yx00181','xsjf201652654','zri72xwa','dbbd1ef0c4791f6e5eaa3da3b02d5950',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (182,'yx00182','xsjf201664354','lzdqn9m6','a4d1c55aad83f11c44ef5c29a7849207',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (183,'yx00183','xsjf201629150','txb09xtz','84805c9d972aadfd209f316f6bddf9fa',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (184,'yx00184','xsjf201638350','g4xyja9x','7e706432170d2e7b2f8dc8f6df8912a6',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (185,'yx00185','xsjf201615954','fy8mj06l','e49d64bff89ce55b82b3c6e226e35f62',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (186,'yx00186','xsjf201612607','x6s128zb','b9ebd9d634ddfdfe1bbd60a598c01803',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (187,'yx00187','xsjf201677877','gie4uhes','c36cfa0ebcba1eeec1ec0cc9e3414e7d',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (188,'yx00188','xsjf201630356','mcj71ecw','3051a6f47fdba8811d4362cd1d5897c0',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (189,'yx00189','xsjf201625804','kwi92swd','544de66fc3d0f2caf50cd829581dac86',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (190,'yx00190','xsjf201694252','vlwj865u','990a5319211df03b84aee020dfa2c30e',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (191,'yx00191','xsjf201666783','w2nzcgij','986dc3977de4293659af55a057dc4216',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (192,'yx00192','xsjf201632768','7zags4ei','bb4b317072d07d331cb1c145dec2483d',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (193,'yx00193','xsjf201660467','s9h1rtz5','8f2ec945ed93cbddc1d328f8e682e770',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (194,'yx00194','xsjf201670560','2anjp3j1','50b4072c3a586fbf54f836d064228829',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (195,'yx00195','xsjf201693087','gfw7tsjn','717165895a2619fa7c9dd48d0cb56a81',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (196,'yx00196','xsjf201654095','8k1q7muk','17fc29b857fccb08bc038897d97a0d64',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (197,'yx00197','xsjf201666520','gecdmukq','189cd2782052d0be3f53bb98e9ce366d',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (198,'yx00198','xsjf201630225','5bws3cws','8b00c5394908321c7171ec3221cae663',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (199,'yx00199','xsjf201690989','3cvvw4jc','38bc16ee85d10d9e29d4546158adf74e',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (200,'yx00200','xsjf201616373','blecw3p0','01b57b00099f7b678858f3dceaa4fb22',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (201,'yx00201','xsjf201625882','h10ccvyv','7fe8178fe9bc4fe8428ba370e533ce92',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (202,'yx00202','xsjf201629428','fx2h8s1l','cb7f0d02dd9e87401fd7ff6c7ac8421b',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (203,'yx00203','xsjf201623908','il1hu9qu','8aa9786b38e7b9989e1f98c8f6648f04',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (204,'yx00204','xsjf201678811','v2bn89cy','5b63f5c6911104e2c8b34baf9301a81d',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (205,'yx00205','xsjf201621434','g6669nqw','88b96b18ff7973e950373aaa830c83e8',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (206,'yx00206','xsjf201646332','nnzc6r28','cfa37b8e3c23b43a2fb784f4452c71d3',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (207,'yx00207','xsjf201686696','0z0vqja6','d1f62b329753c056098c36f434f27ae0',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (208,'yx00208','xsjf201663406','yr3vp2qy','947adabc993c512adfd9946cefb65752',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (209,'yx00209','xsjf201692662','8ripb4i2','3de594192f6b6018e0e6231ce2348cab',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (210,'yx00210','xsjf201682289','v35cuxy9','c684a847e9ef3228fef1d5190dc47142',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (211,'yx00211','xsjf201656185','fr5g9p6m','9dcc897689d159bf22dc7b12d85cd4d0',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (212,'yx00212','xsjf201684357','mdwgb55g','9d590bbb3391115a1bd7bd1caf6e5d60',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (213,'yx00213','xsjf201619411','r7taer6m','ef6d3d52ae926d970f3eb9428185d9f3',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (214,'yx00214','xsjf201687667','2vl3bzdm','ff64dcb5ec13b134936c42a9614bdc31',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (215,'yx00215','xsjf201635740','bfvznhi9','da9ebe5e325560689c603ab9ea99fc55',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (216,'yx00216','xsjf201613138','dv4089bh','ea50c6f80773fc7ec7eb61210ac099da',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (217,'yx00217','xsjf201636989','l6u2s1ql','e87d364e07be7550e09bf11e3d2d61be',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (218,'yx00218','xsjf201678746','5nmdzvvg','0bf8c668e5ea40ba49656bbb69a71d1f',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (219,'yx00219','xsjf201639611','kt63nsv4','be52038fd794a36d82b079a1f49d773c',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (220,'yx00220','xsjf201683058','nfetewuw','b7ef070c61cf375888647ba87dfc96fa',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (221,'yx00221','xsjf201697991','kweifiz7','f7b1c1583fe821446449a25da3e994c6',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (222,'yx00222','xsjf201684835','ivjn54c9','538bea62722ef3dde39be1fe02650852',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (223,'yx00223','xsjf201660110','z6sdzdle','29917b8708a9290797f9941a89631f70',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (224,'yx00224','xsjf201625439','lj937df8','e856326fc034435b344fa7807258c100',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (225,'yx00225','xsjf201687293','9n765jtn','59c45dade99cc28eb86e0d199f5896b0',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (226,'yx00226','xsjf201614096','ib7mvkkq','149601e02258756f74db189427c0e675',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (227,'yx00227','xsjf201675928','dcjmbquq','c02aac12219f6feb7578be3a2c6f3c93',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (228,'yx00228','xsjf201634370','ynu1hlwz','ca1ca395ffb432f634e241e07f29b938',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (229,'yx00229','xsjf201640718','ia3dzga3','c0058345d30214eca5212d56f82bff64',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (230,'yx00230','xsjf201618445','s8vr3ft3','8b0e8f878a4d30090f1f6bf02b2e8018',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (231,'yx00231','xsjf201672135','jnv7xrt1','36a0108c9ec6e56bb3631ab563911ac1',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (232,'yx00232','xsjf201684866','ecj8hrbc','626043f63e53b0c2fa67d734b7475d38',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (233,'yx00233','xsjf201638260','r75iyl9s','177fbcf681f4ce329336285fb704440e',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (234,'yx00234','xsjf201671960','xgjt94kw','cc2c3bb3330a6b25403e3300fa07fd8c',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (235,'yx00235','xsjf201642885','c8cdh7gw','cdf2121bf1c9f18c0b8ba1945a24f680',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (236,'yx00236','xsjf201645891','xwu3jqcj','2fb1300116eef0c03d0702694cdc0f5f',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (237,'yx00237','xsjf201645700','aystpf5b','27a336034178d3183ee99b2f7bcfc4af',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (238,'yx00238','xsjf201615969','uyyxvkzy','addbda224d6804a399abc4b9c6d06d5d',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (239,'yx00239','xsjf201642461','vq8sfvfk','83bd62b505cbec4a02fe58e1990d8436',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (240,'yx00240','xsjf201690081','yrp16h7m','8ebb2eb85f0330a5e858c5685b58203e',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (241,'yx00241','xsjf201676844','vlwvkmca','25f31416d4cc7e4f44ebf4aaea2b0e23',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (242,'yx00242','xsjf201659553','a6xky9pg','8d76b6792afb46daddd93972d62972ca',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (243,'yx00243','xsjf201674967','hw49t9gy','b46a1849b5ca52433a0f2becffb2114d',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (244,'yx00244','xsjf201615675','bmcbxrlg','661971ef884a1f62cb9fbc00336b453a',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (245,'yx00245','xsjf201660302','mlyll2te','a98e26eb77782120207d15d0c3bb2d87',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (246,'yx00246','xsjf201647646','tc5fmykk','3eb39eabd2dd35ad494cb52365dc4f34',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (247,'yx00247','xsjf201659177','j9ywuigd','18b51b81558e1118c32cb7f2728c2bf6',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (248,'yx00248','xsjf201683267','v9bjzrdf','e18352661b357b46f9d891188dc07d00',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (249,'yx00249','xsjf201646966','e706hjw1','f3d882eb6b1cf4e3806acdaf1411ae56',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (250,'yx00250','xsjf201682202','90y315rt','85e4440169f1d08c6db61ab7d9c0bb0d',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (251,'yx00251','xsjf201621251','feeavyfr','9596f22401404646c9a57e3bee791f85',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (252,'yx00252','xsjf201616537','pct5yvhm','aa9b00776cb8e97590797f54b4fb7f61',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (253,'yx00253','xsjf201688596','djajy9cl','46b28ac3eee508ddd70555f99cda09f4',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (254,'yx00254','xsjf201632173','5xa3z8qu','64b3ae6b543a36aa0199fe329615588e',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (255,'yx00255','xsjf201658181','cs6xd0yq','d7e628af974f574e0b3f45f665c95564',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (256,'yx00256','xsjf201672440','mvam3n8d','cf240cec01b937fa84bcadbedf124ffc',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (257,'yx00257','xsjf201623682','pt1l5cz2','b505bf7fc3cff7c008d7623b8a6a70d5',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (258,'yx00258','xsjf201697780','7xgt7jpw','141f56fff562d9875a56b64e3567a9b1',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (259,'yx00259','xsjf201643343','hijr2hqz','3f8509103e956174705d26b8ec9134f5',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (260,'yx00260','xsjf201646174','2pwy31c6','4e799ec87474913c3da718e184c17a74',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (261,'yx00261','xsjf201614151','ajwhlee2','9330c1000c328ce07cd257ac6a31812d',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (262,'yx00262','xsjf201639994','f6cumg2f','2ce7899e8624b0492ae98e6cd37378c3',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (263,'yx00263','xsjf201614368','fx4kflh4','4543d20dd8032b3b977f1904335fa355',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (264,'yx00264','xsjf201624119','3gmyvclt','7335185e10bbac1553d9510a8965e326',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (265,'yx00265','xsjf201690581','01lrc0iv','2a416a9528cb121d760a11ce39f4c11a',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (266,'yx00266','xsjf201658342','e9czz7jj','cdd70dc2dae8630bf4a74f1520f2e7c3',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (267,'yx00267','xsjf201687760','9k27j80w','5f64af46ebe6752ac9465fdb5e28d171',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (268,'yx00268','xsjf201625951','abpdwayb','eb4fc4d5b18e4eaa08817f9d4c6086f0',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (269,'yx00269','xsjf201631239','89260xp9','decfa2f45aa6677b257735d28650585d',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (270,'yx00270','xsjf201692354','2msw0bwc','59579a0ac448815df46d7d758513347b',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (271,'yx00271','xsjf201612182','hdz1m1km','739d23b63166df9786c1553db77a7108',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (272,'yx00272','xsjf201659536','hpai3zy3','8715af711e3614e971fd9c11a2e4a345',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (273,'yx00273','xsjf201610938','tblck0l4','72ee026ad24dfa04fc4168b7ad8c935f',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (274,'yx00274','xsjf201669911','8kajz09i','a4fbbfa694c610f7a65f9041407aaab9',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (275,'yx00275','xsjf201666633','nj01zvqc','ca4ba5f5085bd5f8beda7a843e86eb5a',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (276,'yx00276','xsjf201653031','yn1xyn1i','076b821e743adebe4dc98820e16bebbd',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (277,'yx00277','xsjf201662839','hf0me2x3','ccd0bc0493ec5afd5b5724a1654b433c',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (278,'yx00278','xsjf201645309','b4nv480x','022763af014cc701c759afe98c6bd983',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (279,'yx00279','xsjf201623340','mcqlbszf','9c42804daf6078c283e29c40a495c6db',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (280,'yx00280','xsjf201684942','ajn51jva','7707919ca06f77451cf4be62c387ea66',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (281,'yx00281','xsjf201659465','zqhtfcql','f9d9b6076ffdede3722310dc192f5ce8',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (282,'yx00282','xsjf201625337','je4t3zc2','1d83640c5ccdc47017179fdf103c8da8',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (283,'yx00283','xsjf201678386','fzclv4gh','079fee0b3842c3ecb5e91b60a00050b3',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (284,'yx00284','xsjf201666974','ccw0fpte','01d6b5330add9725ef683a8eb690991e',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (285,'yx00285','xsjf201637790','gznfm7yl','2589ea80eec456beb9a3ea45fadc2efb',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (286,'yx00286','xsjf201617105','shbip01q','6c991ae39bda2231b69bcabf9a926c29',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (287,'yx00287','xsjf201644626','x8c47dsa','464119edabc62542de167b6735e9a55d',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (288,'yx00288','xsjf201653985','q98225hr','175f03c242b1225ce68a964512adcde9',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (289,'yx00289','xsjf201632206','psk773f6','0617cfa0a0b31ef301513cbec92e0fb1',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (290,'yx00290','xsjf201622851','yb80ub3g','ce9f9dbaa4ab42e9978ccb0431f8be88',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (291,'yx00291','xsjf201674362','xin8s97b','e00b89c287dd8d38f74b304466324e9c',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (292,'yx00292','xsjf201638142','wkd8z217','de5eee66414586ad770177f8ca33f126',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (293,'yx00293','xsjf201699999','6rznq7tv','f04e5b7ee9a444fe36ac39ea98a920cf',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (294,'yx00294','xsjf201650587','t7fg50dy','ac2703147f9309dbaab3d0ccbd5438c2',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (295,'yx00295','xsjf201638000','ku0stdhn','42b809f210b9ad6bb8262f38f960b59a',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (296,'yx00296','xsjf201659718','z8cp28n8','b3021f4912bdc9db431095a8730c72fd',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (297,'yx00297','xsjf201693594','8en913h4','3812bbd06ed758a65fb26ca7a4ee577f',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (298,'yx00298','xsjf201626587','bq09vbil','dd546fb420c45cb03af5724f3910f493',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (299,'yx00299','xsjf201625606','3pefqhyp','4c6536ea99e5a31bd4a1944edfe111c6',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (300,'yx00300','xsjf201639870','kef0m3ra','8fe8baa1515804532d9919d17acaed1f',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (301,'yx00301','xsjf201620523','3b2hh0x6','8511a643f1f89f4cc22dc9ee5b5d932b',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (302,'yx00302','xsjf201665253','897p4z2n','3b2e8f883fdca41e1994f21aedf60183',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (303,'yx00303','xsjf201651434','2214a6u3','09779206fc43a3c4c185858aa9f95731',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (304,'yx00304','xsjf201666013','ub7swwe0','9d3cd8f1cdca7660efb77a87e3c97119',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (305,'yx00305','xsjf201626151','zc4ksdmz','eddf88cd927d68c97d10effe73a7cef8',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (306,'yx00306','xsjf201646396','x7xfywnb','be191d2f32039904fbf1b686fab222de',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (307,'yx00307','xsjf201694429','5r6kfjki','24406444942881fa4766a6217821af18',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (308,'yx00308','xsjf201669149','k0rs5upr','7d44a7a86d63b7e7008ddd2bde08fe98',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (309,'yx00309','xsjf201632970','q1kcuhv6','5124c778450bf61a4b15af5051fb7942',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (310,'yx00310','xsjf201659221','kx9bp0ms','f5b7841a8e4401a0814e06fb71e09b31',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (311,'yx00311','xsjf201613305','6yq1szfu','fcbcea4b9ceaaec43c6807d7497a5aac',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (312,'yx00312','xsjf201625883','67rtsgtp','ec50ef34531a81b7124ce6ca52173c37',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (313,'yx00313','xsjf201623134','9s0tvd83','7e3618ad19c49b34cd41ee7777b3cf40',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (314,'yx00314','xsjf201614839','gdxashxj','7eb6c60452090207dd1decce38c3024b',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (315,'yx00315','xsjf201675425','jjj87d4w','a05e5111e9203f1d5a0172aaab1a1dd7',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (316,'yx00316','xsjf201674588','et4arntb','ef352680219424c62ee609b228accad1',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (317,'yx00317','xsjf201675625','ceh2yail','f53f031b41e17f4f47ffbdfaaabd479f',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (318,'yx00318','xsjf201655111','8vgud01a','69bf44db67bba076059c52f7ddc66580',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (319,'yx00319','xsjf201626228','w758urcd','b1a58a5d0162499bd6bf2fc55f7f1ccc',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (320,'yx00320','xsjf201698850','skvdel7k','26d279f1268441c16b3d3cdfc5ec512d',0,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (321,'yx00321','xsjf201632704','4kheu0ch','41f0b25eec6d49fb711621d8717f1b46',10,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (322,'yx00322','xsjf201691977','czavjj5q','f9bf3d3b22166e79bfe58cc540d75007',10,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (323,'yx00323','xsjf201641409','1qe6y15p','6fa39f113aadf678756f649398e53131',10,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (324,'yx00324','xsjf201664432','nmb6ip3h','9b0ca5374979dd5327a9b18678c2a08a',10,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (325,'yx00325','xsjf201626864','g9iqyp69','50aa5d5a65d489bcff951c38d0caf1b4',10,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (326,'yx00326','xsjf201669607','hk0kj8ca','bdb99fc62e907c83584927847cc360db',10,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (327,'yx00327','xsjf201640595','rreswi63','ed263daf4e051dca6b79ee480c54542c',10,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (328,'yx00328','xsjf201698331','6qr5vqr1','35aa52dfa1ba9fc7eea4938758fd44d2',10,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (329,'yx00329','xsjf201671630','14ug0nzm','15c5e1789bdfddc6030363ee70ef78d5',10,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (330,'yx00330','xsjf201657899','zlkks9vf','418d9a2a22db3c73c999a9d09924e703',10,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (331,'yx00331','xsjf201614338','i53d1j18','24a6baad36ff1833a1cb72ccb19c6181',10,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (332,'yx00332','xsjf201649506','vld4her9','9bcdf0ff2722c9cd7d4ec634b0404c7d',10,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (333,'yx00333','xsjf201615933','r0flbs28','5e10e474465d98d244fabf58566538d1',10,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (334,'yx00334','xsjf201674578','90sm2t4h','028b010cea876a4befff26378c88c1f7',10,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (335,'yx00335','xsjf201666149','7u3qsk9l','8bb3ded8a60f6c33492c7fae1b7a5fe8',10,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (336,'yx00336','xsjf201614427','bfqvfe6d','30266f85f3141c77c9e410d9013c0125',10,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (337,'yx00337','xsjf201623147','vbpgkaym','2b242820b16a6284dcd3d992dcc2eae0',10,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (338,'yx00338','xsjf201693875','h8xqqrdx','8e902ebacc5f781de326bf0a65285d08',10,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (339,'yx00339','xsjf201655278','71k7jd3f','183575abe44a089b0b38279febc855f9',10,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (340,'yx00340','xsjf201632898','2vbuvkcm','8eab60b7e83c1511a7ee5daa2f77f120',10,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (341,'yx00341','xsjf201676742','au9peie2','97cadb9468984d8f8508ee10c0d3c714',10,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (342,'yx00342','xsjf201636674','th9r5mjf','75c9a9d0594ce51913f8f742aa7a6c15',10,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (343,'yx00343','xsjf201675979','k4htzgqw','9f316f3b03b2b6cba53093400cdfea10',10,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (344,'yx00344','xsjf201653073','e70uysgd','ffef0328d89923ed22f6689a3d6ee1ac',10,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (345,'yx00345','xsjf201664077','1ail2c7m','777f1338d41e17d6b6e830934870d524',10,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (346,'yx00346','xsjf201627540','j5epsx6h','94355734e169a706d0bb8e9fe16c098d',10,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (347,'yx00347','xsjf201653731','kajzjndz','aee39c5f2544268ac2e4b356342d7bf6',10,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (348,'yx00348','xsjf201627086','8khj3mcw','7b3a6691843a209ae9ee4c22ab56da18',10,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (349,'yx00349','xsjf201618810','p2ldb5tx','2127bf0efa2b1fb3d1c057ad478618d4',10,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (350,'yx00350','xsjf201635217','jl24pcrq','e48213477643a5447f5abcf969405b1b',10,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (351,'yx00351','xsjf201663195','v2wpxdz5','2ea90f09f1896141503c5c9fd309c4fb',10,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (352,'yx00352','xsjf201642012','y82eway3','3cb21b3298ee2e6b5c72a52accc85cb5',10,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (353,'yx00353','xsjf201631093','ryw0xwcp','7f104888361d065f148ff2f5dfd6923f',10,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (354,'yx00354','xsjf201678178','sw9py2v4','f50a5a1c2bd525e20942bfdd54f9494d',10,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (355,'yx00355','xsjf201677396','a240ahgv','12bdc8d43176e5dc920f355655fbac66',10,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (356,'yx00356','xsjf201639589','5lvefkrd','c64dc797eba9f1a7bb5799078c85d1cb',10,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (357,'yx00357','xsjf201675177','ysv800d8','0b427968daffc88bda69c10e9890b109',10,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (358,'yx00358','xsjf201682097','t7z3qemx','0f098ec8da27e2328cbdc584c8b2ada2',10,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (359,'yx00359','xsjf201667973','gvldrc2f','0fd3262b887d5e3d7c5fff16bfc1d9b4',10,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (360,'yx00360','xsjf201679063','l28icj2e','34d084fa8cfe7bc6efbd65b05152928d',10,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (361,'yx00361','xsjf201643144','twi0fe95','d813eb3c1fac09288173531b69eb2019',10,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (362,'yx00362','xsjf201656335','43gmk0b5','6acaa74024ca643e696e4c784d9ebda6',10,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (363,'yx00363','xsjf201662585','as4c8jhx','b8d89245aec9bf17ad268e5c27503c82',10,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (364,'yx00364','xsjf201687361','ygecnrns','3283fdc7521ba913412f1402f620ad39',10,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (365,'yx00365','xsjf201651549','u96jnyrz','0b09f70c21e947faa8416c18f685a490',10,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (366,'yx00366','xsjf201652362','xybdqrex','a9a7198a349f905f1e0f09e95793dad3',10,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (367,'yx00367','xsjf201664032','lenhk00c','b77499af7e8c80f7894fb6863c349b9f',10,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (368,'yx00368','xsjf201644548','78tnc8wm','edd1a1a13b8d7fa23ed25218a32d88aa',10,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (369,'yx00369','xsjf201662114','vjxmddcm','6bd2f85ced890f950185a8f5a28d6cc1',10,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (370,'yx00370','xsjf201652922','02jfn0cf','1c1347b560842f5a77eacf559af11f32',10,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (371,'yx00371','xsjf201635750','wedu0rr4','2d75b569163b89e48aeb53d8b4b4b869',10,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (372,'yx00372','xsjf201622497','0nrw0duz','484b36a907f0c38866d928027491b233',10,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (373,'yx00373','xsjf201655640','nqrfhpk6','e95745068ec4e8a168c5363c505934d7',10,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (374,'yx00374','xsjf201625291','zmkjxan0','c6f30c69ab492cfcd5a48de5e5ce0619',10,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (375,'yx00375','xsjf201635534','7w3cshg2','a79b93531fa7ec47e55d6bc7fd8e588b',10,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (376,'yx00376','xsjf201638024','j1ac4d2r','4c0b1f409118c06d0e9b253e83ceb913',10,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (377,'yx00377','xsjf201625737','z3tic8uv','5e26b253a7e2d9bdfc7cad7d49e0915a',10,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (378,'yx00378','xsjf201675119','j4pci21g','2c94617457f74d62a822f55f777d9c52',10,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (379,'yx00379','xsjf201638590','5w1jqxrt','97df7f13e09558b84572c9a04810f104',10,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (380,'yx00380','xsjf201612040','nzg7rpky','d54462ac3f845d5c9e5c7b283a9d610d',10,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (381,'yx00381','xsjf201661488','zanwda98','46a8a6b4f0f7218269623df49bba9408',10,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (382,'yx00382','xsjf201622486','m3vu5l83','36fa82c22ee45325f3c9ab639f1732d3',10,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (383,'yx00383','xsjf201618273','nvuzujti','6516504822a2b0e28bc072313652247c',10,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (384,'yx00384','xsjf201693884','phv5vjfb','0c716c61837ebac8c98c56b4dde7f9c2',10,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (385,'yx00385','xsjf201661957','ieh6dba2','8a3b9c59cc2dbc91aa7afda31b127261',10,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (386,'yx00386','xsjf201695746','h12uhyfh','531a75b49c6d48a94c9ad15484484d82',10,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (387,'yx00387','xsjf201674163','s5re1lm8','214884c802c1597a1206d18619c5f40e',10,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (388,'yx00388','xsjf201651643','yt411p1h','2de1fab6a1e47367fa95481e56a39fe3',10,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (389,'yx00389','xsjf201664502','skevuafz','5f3dca2641945a00f8bb58c5db0ab25f',10,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (390,'yx00390','xsjf201649440','kpzh129k','27b880ff2ea15a35ea0868f06c77f5e2',10,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (391,'yx00391','xsjf201634248','1a6ca9rl','7ec03ffd9457bec6b27309d7a5e14b43',10,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (392,'yx00392','xsjf201676679','6s9lxxvz','2c95279934e044045b98636f2ba6729d',10,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (393,'yx00393','xsjf201652907','mc7ruvy2','5d514858da60103483d2b46c565962a9',10,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (394,'yx00394','xsjf201644778','z03ac3pp','8044161ed7cb36fecb199dc53b66f5df',10,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (395,'yx00395','xsjf201671333','8x7e2wyf','f472d49f527ed3a50b37a39226e5d869',10,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (396,'yx00396','xsjf201696454','9ar6qdkr','59bd2c6ca67980a4f7720607f31dea95',10,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (397,'yx00397','xsjf201693816','urkpxdda','cdc2c43713e1e818a376cd5e6472b4c8',10,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (398,'yx00398','xsjf201624451','9g4826gd','74659a3716c2b5971efc3d0c0262261f',10,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (399,'yx00399','xsjf201658392','tp0f09l2','6d4bab1d84fa3ec09d7c6181b981f406',10,NULL);
insert  into `t_wchat_oa`(`id`,`emp_code`,`code`,`password`,`encry_passWord`,`use_state`,`validate_time`) values (400,'yx00400','xsjf201693674','glvbe9ud','0cb0f7cc25a26e9de30ec62f61a07278',10,NULL);