# AMEQD Project

这个名字是我随手打的，项目是一个基于Vue的题目渲染系统

支持多种题型的展示，操作和检验

练手项目

## 技术栈

- Vue 3
- Vite
- Element Plus (UI 组件库)
- Axios (HTTP 客户端)



## 项目结构

```
public/
├── assets/            # 公共资源
├── json               # 题目文件
└── ...                # 题目素材

src/
├── components/        # 公共组件
├── App.vue            # 根组件
└── main.js            # 入口文件
```



## 代码规范

- 尽量保持代码风格一致(采用`JavaScript`和`OptionAPI`以后慢慢转向`TypeScript`和`CompositionAPI`)
- 组件命名清晰
- 单文件组件结构顺序：`template -> script -> style`
- 非必须情况下`style`使用`scoped`

## 部署说明(单页)

1. 修改 `.env.production`中`VITE_RES_BASE_PATH`和`VITE_JSON_BASE_PATH`和`VITE_JC_BASE_PATH`为正确路径,比如
   ```
    VITE_RES_BASE_PATH=../static/static2/zw-01-u01-lesson01-01
    VITE_JSON_BASE_PATH=../static/static2/json/zw-01-u01-lesson01-01-ClassroomExercises
    VITE_JC_BASE_PATH=static/static2/zw-01-u01-lesson01-01/ #一定要在结尾加上 /
   ```
2. 将public中图片文件夹名按照正确路径排好
3. 运行 `npm run build`
4. 将 dist 文件夹内容部署到静态服务器
   
## 部署说明(SpringBoot)
1. 在`data.txt`编写正确的配置文件，例如:
   ```text
    VITE_RES_BASE_PATH=../static/static2/zw-01-u01-lesson01-4
    VITE_JSON_BASE_PATH=../static/static2/json/zw-01-u01-lesson01-4-video2
    VITE_JC_BASE_PATH=static/static2/zw-01-u01-lesson01-4/video2/
   ```
   配置文件应该用空行隔开，并且行尾序列必须是`LF`而非`CRLF`
2. 在linux环境下，运行build2.sh
3. 将产生的build-dist文件夹内的static2放入`shihua`项目的`static`中
4. 将产生的html文件放入`shihua`项目的`template`中
5. 编写对应的控制器，例如：
   ```java
    @RequestMapping("/sx-01-s-01-04-01-classroom")
    public String sx01s010401Class() {return "sx-01-s-01-04-01-classroom";}
   ```


## JSON 文件格式说明


部分json文件以及写了生成器在下面，可以参考:

[AmeQdJsonGenerator](https://github.com/Nacog/AmeQdJsonGenerator)

### zww题型（抓娃娃）

```json

{//未加注释的可以不用管
  "zww":{
    "tnum":6,//总题目数量
     "questions": [//题目的图片（就是相当于根据什么）
       "VITE_RES_BASE_PATH/img/t1_v2.png",
        "VITE_RES_BASE_PATH/img/t2_v2.png",
        "VITE_RES_BASE_PATH/img/t3_v2.png",
        "VITE_RES_BASE_PATH/img/t4_v2.png",
        "VITE_RES_BASE_PATH/img/t5_v2.png",
        "VITE_RES_BASE_PATH/img/t6_v2.png"

      ],
      "yin": "VITE_RES_BASE_PATH/audio/yin.mp3",
      "win": "VITE_RES_BASE_PATH/audio/win.wav",
      "fail": "VITE_RES_BASE_PATH/audio/fail.wav",
      "pd": ["VITE_RES_BASE_PATH/img/dui.png", "VITE_RES_BASE_PATH/img/cuo.png"],
     "p": [//有多少个选项建立多少个（后面看要不要改进下）
        [-1, -1, -1],
        [-1, -1, -1],
        [-1, -1, -1],
        [-1, -1, -1],
        [-1, -1, -1],
        [-1, -1, -1]
      ],
      "reply": [//就是下面选项的图片
        ["VITE_RES_BASE_PATH/img/t1_x1_v2.png","VITE_RES_BASE_PATH/img/t1_x2_v2.png", "VITE_RES_BASE_PATH/img/t1_x3_v2.png"],
        ["VITE_RES_BASE_PATH/img/t2_x1_v2.png","VITE_RES_BASE_PATH/img/t2_x2_v2.png", "VITE_RES_BASE_PATH/img/t2_x3_v2.png"],
        ["VITE_RES_BASE_PATH/img/t3_x1_v2.png","VITE_RES_BASE_PATH/img/t3_x2_v2.png", "VITE_RES_BASE_PATH/img/t3_x3_v2.png"],
        ["VITE_RES_BASE_PATH/img/t4_x1_v2.png","VITE_RES_BASE_PATH/img/t4_x2_v2.png", "VITE_RES_BASE_PATH/img/t4_x3_v2.png"],
        ["VITE_RES_BASE_PATH/img/t5_x1_v2.png","VITE_RES_BASE_PATH/img/t5_x2_v2.png", "VITE_RES_BASE_PATH/img/t5_x3_v2.png"],
        ["VITE_RES_BASE_PATH/img/t6_x1_v2.png","VITE_RES_BASE_PATH/img/t6_x2_v2.png", "VITE_RES_BASE_PATH/img/t6_x3_v2.png"]
    
      ],
      "reply_img": [//上面动物图片
        ["VITE_RES_BASE_PATH/img/a.png", "VITE_RES_BASE_PATH/img/b.png", "VITE_RES_BASE_PATH/img/c.png"],
        ["VITE_RES_BASE_PATH/img/a.png", "VITE_RES_BASE_PATH/img/b.png", "VITE_RES_BASE_PATH/img/c.png"],
        ["VITE_RES_BASE_PATH/img/a.png", "VITE_RES_BASE_PATH/img/b.png", "VITE_RES_BASE_PATH/img/c.png"],
        ["VITE_RES_BASE_PATH/img/a.png", "VITE_RES_BASE_PATH/img/b.png", "VITE_RES_BASE_PATH/img/c.png"],
        ["VITE_RES_BASE_PATH/img/a.png", "VITE_RES_BASE_PATH/img/b.png", "VITE_RES_BASE_PATH/img/c.png"],
        ["VITE_RES_BASE_PATH/img/a.png", "VITE_RES_BASE_PATH/img/b.png", "VITE_RES_BASE_PATH/img/c.png"]
      ],
      "true_answer": [1,2,1,3,1,2],//按题目顺序正确的选项
      "userAnswer": [0, 0, 0, 0,0,0],
      "gouLeft_begin": "10px",
      "gouLeft": "10px",
      "gouTop_begin": "140px",
      "gouTop": "140px",
      "tiaoHeight_begin": "10px",
      "tiaoHeight": "10px",
      "tiaoLeft_begin": "38px",
      "tiaoLeft": "38px",
      "transitionStyleGou": "left 0.5s ease, top 0.5s ease",
      "transitionStyleTiao": "left 0.5s ease, top 0.5s ease, height 3s ease",
      "now_t": 0,
      "trueNum": 0,
      "is_click": false,
      "visibleIndices": [0],
      "mes": ["恭喜你", "答对4题", "通过", ""],
      "background_img": "VITE_RES_BASE_PATH/img/back.jpeg",
      "Lan_img": "VITE_RES_BASE_PATH/img/L.png",
      "r_img":"VITE_RES_BASE_PATH/img/r.png",
      "t1_img":"VITE_RES_BASE_PATH/img/t1.png",
      "tiao_img":"VITE_RES_BASE_PATH/img/tiao.png",
      "gou_img":"VITE_RES_BASE_PATH/img/g.png"
  }
}
```

### dyt题型（钓鱼题）

```json
{//未加注释可以不用管
  "dyt": {
    "ts": 8,//题目数量
    "question_img": [//题目图片
      "VITE_RES_BASE_PATH/img/t1_1.png",
      "VITE_RES_BASE_PATH/img/t1_2.png",
      "VITE_RES_BASE_PATH/img/t1_3.png",
      "VITE_RES_BASE_PATH/img/t2_1.png",
      "VITE_RES_BASE_PATH/img/t2_2.png",
      "VITE_RES_BASE_PATH/img/t3_1.png",
      "VITE_RES_BASE_PATH/img/t3_2.png",
      "VITE_RES_BASE_PATH/img/t3_3.png"
    ],
    "questions": [//题目文字提问
      "请根据图片对应情景，选出合适的字或词语",
      "请根据图片对应情景，选出合适的字或词语",
      "请根据图片对应情景，选出合适的字或词语",
      "请根据图片对应情景，选出合适的字或词语",
      "请根据图片对应情景，选出合适的字或词语",
      "请根据汉字，选出合适的字组成词语",
      "请根据汉字，选出合适的字组成词语",
      "请根据汉字，选出合适的字组成词语"
    ],
    "mes": [
      "恭喜你",
      "答对4题",
      "通过",
      ""
    ],
    "yu": [//三个为一组（有多少题目加几个 每个题目对应一个 三个一组顺序 后面应该会改动 暂时这样）
      [
        "VITE_RES_BASE_PATH/img/y1.png",
        "VITE_RES_BASE_PATH/img/y2.png",
        "VITE_RES_BASE_PATH/img/y3.png"
      ],
      [
        "VITE_RES_BASE_PATH/img/y2.png",
        "VITE_RES_BASE_PATH/img/y3.png",
        "VITE_RES_BASE_PATH/img/y1.png"
      ],
      [
        "VITE_RES_BASE_PATH/img/y3.png",
        "VITE_RES_BASE_PATH/img/y1.png",
        "VITE_RES_BASE_PATH/img/y2.png"
      ],
      [
        "VITE_RES_BASE_PATH/img/y1.png",
        "VITE_RES_BASE_PATH/img/y2.png",
        "VITE_RES_BASE_PATH/img/y3.png"
      ],
      [
        "VITE_RES_BASE_PATH/img/y2.png",
        "VITE_RES_BASE_PATH/img/y3.png",
        "VITE_RES_BASE_PATH/img/y1.png"
      ],
      [
        "VITE_RES_BASE_PATH/img/y3.png",
        "VITE_RES_BASE_PATH/img/y1.png",
        "VITE_RES_BASE_PATH/img/y2.png"
      ],
      [
        "VITE_RES_BASE_PATH/img/y1.png",
        "VITE_RES_BASE_PATH/img/y2.png",
        "VITE_RES_BASE_PATH/img/y3.png"
      ],
      [
        "VITE_RES_BASE_PATH/img/y2.png",
        "VITE_RES_BASE_PATH/img/y3.png",
        "VITE_RES_BASE_PATH/img/y1.png"
      ]
    ],
    "options": [//每道题的选项（三个定死 多个还需改动）
      [
        "VITE_RES_BASE_PATH/img/t1_x1.png",
        "VITE_RES_BASE_PATH/img/t1_x2.png",
        "VITE_RES_BASE_PATH/img/t1_x3.png"
      ],
      [
        "VITE_RES_BASE_PATH/img/t1_x2.png",
        "VITE_RES_BASE_PATH/img/t1_x3.png",
        "VITE_RES_BASE_PATH/img/t1_x1.png"
      ],
      [
        "VITE_RES_BASE_PATH/img/t1_x1.png",
        "VITE_RES_BASE_PATH/img/t1_x2.png",
        "VITE_RES_BASE_PATH/img/t1_x3.png"
      ],
      [
        "VITE_RES_BASE_PATH/img/t2_x2.png",
        "VITE_RES_BASE_PATH/img/t2_x3.png",
        "VITE_RES_BASE_PATH/img/t2_x1.png"
      ],
      [
        "VITE_RES_BASE_PATH/img/t2_x1.png",
        "VITE_RES_BASE_PATH/img/t2_x2.png",
        "VITE_RES_BASE_PATH/img/t2_x3.png"
      ],
      [
        "VITE_RES_BASE_PATH/img/t3_x1.png",
        "VITE_RES_BASE_PATH/img/t3_x2.png",
        "VITE_RES_BASE_PATH/img/t3_x3.png"
      ],
      [
        "VITE_RES_BASE_PATH/img/t3_x2.png",
        "VITE_RES_BASE_PATH/img/t3_x3.png",
        "VITE_RES_BASE_PATH/img/t3_x1.png"
      ],
      [
        "VITE_RES_BASE_PATH/img/t3_x1.png",
        "VITE_RES_BASE_PATH/img/t3_x2.png",
        "VITE_RES_BASE_PATH/img/t3_x3.png"
      ]
    ],
    "yin": "VITE_RES_BASE_PATH/audio/yin.mp3",
    "win": "VITE_RES_BASE_PATH/audio/win.wav",
    "fail": "VITE_RES_BASE_PATH/audio/fail.wav",
    "trueAnswer": [2,3,3,3,2,2,2,1],//正确答案
    "userAnswer": [0,0,0,0,0,0,0,0],//用户是否答对
    "is_show_ren": 1,
    "t_num": 0,
    "trueNum": 0,
    "yu_bpos": [
      -400,
      -250,
      -100
    ],
    "is_xun": false,
    "background_img": "VITE_RES_BASE_PATH/img/all.png",
    "r_img": [
      "VITE_RES_BASE_PATH/img/rt1.jpg",
      "VITE_RES_BASE_PATH/img/r2t.jpg"
    ]
  }
}
```

### qet题型（企鹅题）

```json
{//未加注释不管
  "qet":{
    "yin": "VITE_RES_BASE_PATH/audio/yin.mp3",
     "win": "VITE_RES_BASE_PATH/audio/win.wav",
      "fail": "VITE_RES_BASE_PATH/audio/fail.wav",   
      "trueAnswer": [3, 1, 3, 2],//正确答案
      "userAnswer": [0, 0, 0, 0],
      "questions_img": [//题目选项
        ["VITE_RES_BASE_PATH/img/t1_a.png", "VITE_RES_BASE_PATH/img/t1_b.png", "VITE_RES_BASE_PATH/img/t1_c.png"],
        ["VITE_RES_BASE_PATH/img/t2_a.png", "VITE_RES_BASE_PATH/img/t2_b.png", "VITE_RES_BASE_PATH/img/t2_c.png"],
        ["VITE_RES_BASE_PATH/img/t3_a.png", "VITE_RES_BASE_PATH/img/t3_b.png", "VITE_RES_BASE_PATH/img/t3_c.png"],
        ["VITE_RES_BASE_PATH/img/t4_a.png", "VITE_RES_BASE_PATH/img/t4_b.png", "VITE_RES_BASE_PATH/img/t4_c.png"]
      ],
      "questions_title": [//题目图片
        "VITE_RES_BASE_PATH/img/t1.png",
        "VITE_RES_BASE_PATH/img/t2.png",
        "VITE_RES_BASE_PATH/img/t3.png",
        "VITE_RES_BASE_PATH/img/t4.png"
      ],
      "place": "VITE_RES_BASE_PATH/img/jia.png",
      "cha": "VITE_RES_BASE_PATH/img/qi.png",
      "kuang": "VITE_RES_BASE_PATH/img/kuang.png",

      "t_num": 0,
      "trueNum": 0,
      "mes": ["恭喜你", "答对4题", "通过", ""],
      "goPlace": [{ "bottom": 100, "left": 195 }, { "bottom": 100, "left": 430 }, { "bottom": 100, "left": 660 }],
      "is_xuan": false,
      "background_img": "VITE_RES_BASE_PATH/img/back.jpeg"//可以更换背景（也可以不换）
  }
}
```

