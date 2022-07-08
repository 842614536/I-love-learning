## 我爱学习1.0文档 ##
### 安装依赖(四个项目)
  yarn run install (电脑性能不好就老老实实挨个安装)
### 启动(四个项目)
  yarn start
### 产品介绍 ###
    为了学习新技术 以及
    把平时答过的题和一些好的文章汇总到一块，记录详情(下需求中会有详细说明)
    qa 列表  
    答题功能

### 技术栈
	Ts
	Qiankun做微前端处理
	Umi(React+hooks+router+redux)
	Vue3
	Node nest.js  读写excel记录数据(excel pwd: ilovelearning)

### 功能

  1.首页
      a.常用功能
      b.图表 (学习进度 学习分类占比等)
  2.全站搜索功能 
      a.搜索相关阅读清单里的文章 列表展示 爬虫到主信息
  3.跳转到github地址 和 issues
#### 菜单栏
  2.运营管理 </br>
  
      a.配置阅读清单
          Title description address
      b.配置QA
        type 问题类型 enum
        issue 问题 String
        answer 答案 String
        rank 级别 enum
        address 
  3.学习任务 </br>
  Ⅰ.记录阅读list 

      a.table手风琴展开阅读详情
      b.阅读记录（每次的时间）阅读次数(完整度100%为阅读完成1次)
      c.用iframe打开浏览网页 试着记录阅读时间和阅读位置（滚动条高度）
      ps: 实现不了就手动点击阅读完成结束本次阅读

  Ⅱ. QA

    a.搜索项 
      问题 答案支持模糊搜索
      type(css js html git...)
      问答list 试着展示代码片段
      操作： 跳转到相关详情文章  跳转到运营页面修改
    b.table 分页
  
  Ⅲ.答题

    答题模式： 随机 按照rank 按照类型
    输入答案 对比答案
    记录历史答案
  

