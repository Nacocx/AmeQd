    <template >
        <div>
            <h1>part5:数一数，涂一涂，填一填</h1>
            <!-- <h3>（思维训练）数一数，涂一涂，填一填</h3> -->
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
                            <div><img :src="item.rightItem" alt="图片" width="50px" class="rightItem" draggable="false">
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <hr>
        </div>
    </template>
<script>

export default {
    name: 'tht',
    props: {
        items: {
            type: Array,
            require: true,
            default: () => [
                { rightItem: './static/img/tht/rightItem1.png', cnt: 2, flag: [false, false, false, false, false] },
                { rightItem: './static/img/tht/rightItem2.png', cnt: 1, flag: [false, false, false, false, false] },
                { rightItem: './static/img/tht/rightItem3.png', cnt: 3, flag: [false, false, false, false, false] },
            ]
        },
        tuxingPath: {
            type: Array,
            requir: true,
            default: () => [
                { leftImage: './static/img/tht/left.png' },
                { redCircle: './static/img/tht/redCircle.png' },
                { noneCircle: './static/img/tht/noneCircle.png' },
            ]
        }
    },
    methods: {
        changeFlag(item, index) {
            item.flag[index] = !item.flag[index];
        }
    }
}

</script>

<style scoped>
body {
    font-family: 'Arial Rounded MT Bold', 'Arial', sans-serif;
    background-color: #f9f3ff;
    margin: 0;
    padding: 20px;
}

/* #app {
        max-width: 1000px;
        margin: 0 auto;
        background-color: white;
        border-radius: 15px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        padding: 30px;
    } */

h3 {
    text-align: center;
    font-size: 24px;
    color: #9a7deb;
    margin-bottom: 30px;
    font-weight: bold;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
}

.container {
    display: flex;
    justify-content: center;
    user-select: none;
    border: 2px dashed #d1b3ff;
    border-radius: 12px;
    padding: 30px;
    background-color: #fefcff;
    margin-bottom: 20px;
}

.left-area {
    width: 500px;
    height: 400px;
    margin-right: 30px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08);
}

.left-area img {
    width: 90%;
    max-height: 90%;
    object-fit: contain;
    border-radius: 8px;
}

.right-area {
    border-left: 2px dashed #d1b3ff;
    width: 300px;
    height: 400px;
    display: flex;
    justify-content: space-around;
    padding-left: 30px;
}

.col {
    display: flex;
    flex-direction: column;
    justify-content: center;
    /* align-items: center; */
    position: relative;
}

.col>div {
    margin-bottom: 10px;
    transition: all 0.2s ease;
}

.col>div:hover {
    transform: scale(1.05);
}

.col img {
    cursor: pointer;
    transition: all 0.2s ease;
}

.col img:hover {
    filter: brightness(1.1);
}

.rightItem {
    position: absolute;
    bottom: -60px;
    width: 60px !important;
    height: auto;
}

.confirm {
    display: block;
    width: 150px;
    height: 50px;
    margin: 20px auto 0;
    background: linear-gradient(135deg, #76f5a3, #adc6dd);
    color: white;
    border: none;
    border-radius: 25px;
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;
    box-shadow: 0 4px 8px rgba(106, 48, 147, 0.3);
    transition: all 0.3s ease;
}

.confirm:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(106, 48, 147, 0.4);
}

.confirm:active {
    transform: translateY(1px);
}

/* 响应式设计 */
@media (max-width: 900px) {
    .container {
        flex-direction: column;
        align-items: center;
        padding: 20px;
    }

    .left-area {
        width: 100%;
        margin-right: 0;
        margin-bottom: 30px;
        height: auto;
    }

    .right-area {
        border-left: none;
        border-top: 2px dashed #d1b3ff;
        padding-left: 0;
        padding-top: 30px;
        width: 100%;
        height: auto;
    }
}
</style>