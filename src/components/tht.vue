    <template >
        <div>
            <h3>（思维训练）数一数，涂一涂，填一填</h3>
            <div class="container">
                <div class="left-area">
                    <img :src="tuxingPath[0].leftImage" alt="图片" draggable="false">
                </div>
                <div class="right-area">
                    <div v-for="(item, index) in items" :key="index">
                        <div class="col">
                            <div @click="changeFlag(item, 0)">
                                <img :src="tuxingPath[2].noneCircle" alt="图片" v-if="!item.flag[0]" draggable="false">
                                <img :src="tuxingPath[1].redCircle" alt="图片" v-if="item.flag[0]" draggable="false">
                            </div>
                            <div @click="changeFlag(item, 1)">
                                <img :src="tuxingPath[2].noneCircle" alt="图片" v-if="!item.flag[1]" draggable="false">
                                <img :src="tuxingPath[1].redCircle" alt="图片" v-if="item.flag[1]" draggable="false">
                            </div>
                            <div @click="changeFlag(item, 2)">
                                <img :src="tuxingPath[2].noneCircle" alt="图片" v-if="!item.flag[2]" draggable="false">
                                <img :src="tuxingPath[1].redCircle" alt="图片" v-if="item.flag[2]" draggable="false">
                            </div>
                            <div @click="changeFlag(item, 3)">
                                <img :src="tuxingPath[2].noneCircle" alt="图片" v-if="!item.flag[3]" draggable="false">
                                <img :src="tuxingPath[1].redCircle" alt="图片" v-if="item.flag[3]" draggable="false">
                            </div>
                            <div @click="changeFlag(item, 4)">
                                <img :src="tuxingPath[2].noneCircle" alt="图片" v-if="!item.flag[4]" draggable="false">
                                <img :src="tuxingPath[1].redCircle" alt="图片" v-if="item.flag[4]" draggable="false">
                            </div>
                            <div><img :src="item.rightItem" alt="" width="50px" class="rightItem" draggable="false">
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </template>
<script>
export default{
    name:'tht',
    props:{
        items:{
            type:Array,
            require:true,
            default:()=>[
                { rightItem: '../images3/rightItem1.png', cunt: 2, flag: [false, false, false, false, false] },
                { rightItem: '../images3/rightItem2.png', cunt: 1, flag: [false, false, false, false, false] },
                { rightItem: '../images3/rightItem3.png', cunt: 3, flag: [false, false, false, false, false] },
            ]
        },
        tuxingPath:{
            type:Array,
            requir:true,
            default:()=>[
                {leftImage:'../images3/left.png'},
                {redCircle:'../images3/redCircle.png'},
                {noneCircle:'../images3/noneCircle.png'},  
            ]
        }
    },
    methods: {
        changeFlag(item, index) {
            Vue.set(item.flag, index, !item.flag[index]);
        }
    }
}

</script>

<style>
.container {
    display: flex;
    justify-content: center;
    user-select: none;

}

.left-area {

    width: 500px;
    height: 400px;
    margin-right: 20px;
    position: relative;


}

.right-area {
    border: 2px dashed pink;
    width: 300px;
    height: 400px;
    display: flex;
    justify-content: space-around;


}

.col {
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;

}

.col img {
    margin-bottom: 4px;

}

h3 {
    text-align: center;
    font-size: 20px;
}

.left-area img {
    width: 420px;
    position: absolute;
    top: 150px;
    left: 5px;

}

.rightItem {
    position: absolute;

}
</style>