<template>
    <div class="pinyin-teacher">
        <div class="teacher-header">
            <h3>拼音教学</h3>
            <button class="undo-btn" :disabled="!canUndo" @click="undo">
                撤销当前操作(Undo)
            </button>
        </div>

        <div class="pinyin-list">
            <div v-for="(item, itemIndex) in pinyinData" :key="item.id" class="pinyin-item">
                <div class="item-header">
                    <span class="item-meaning">{{ item.meaning }}</span>
                    <img :src="item.audio_img" alt="" class="laba" @click="playAudio(itemIndex, -1, $event)"
                        @touchend="playAudio(itemIndex, -1, $event)" @touchsatrt="playAudio(itemIndex, -1, $event)">

                </div>

                <div class="pinyin-display">
                    <div v-for="(char, charIndex) in item.pinyin.split('')" :key="charIndex" class="pinyin-char" :class="{
                        'can-have-tone': canAcceptTone(itemIndex, charIndex),
                        'is-space': char === ' '
                    }" @dragover.prevent="handleDragOver($event, itemIndex, charIndex)"
                        @drop="handleDrop(itemIndex, charIndex)">
                        <span>{{ char === ' ' ? '&nbsp;' : char }}</span>
                        <span v-if="tonePositions[itemIndex]?.[charIndex]" class="tone-mark"
                            :class="`tone-${tonePositions[itemIndex][charIndex]}`">
                            {{ toneMarks[tonePositions[itemIndex][charIndex]] }}
                        </span>
                    </div>
                </div>

                <div class="tone-selector">
                    <div v-for="tone in 4" :key="tone" class="tone-option" draggable="true"
                        @dragstart="handleDragStart(tone)">
                        {{ toneMarks[tone] }} ({{ tone }}声)
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
/**
 * 拼音教学组件，用于练习汉语拼音声调
 * @typedef {Object} PinyinItem
 * @property {number} id - 唯一标识
 * @property {string} pinyin - 拼音字符串
 * @property {number[]} correctTones - 正确的声调数组
 * @property {string} meaning - 含义说明
 * @property {number[]} pos - 需要标注声调的位置(1-based)
 * @property {boolean} [isRight] - 用户答案是否正确
 */
export default {
    props: {
        /** 
         * 拼音数据数组
         * @type {Array<PinyinItem>}
         */
        pinyinData: {
            type: Array,
            required: true,
            default: () => [],
            validator: (data) => {
                return data.every(item =>
                    Array.isArray(item.pos) &&
                    Array.isArray(item.correctTones) &&
                    item.pos.length === item.correctTones.length
                );
            }
        }
    },
    data() {
        return {
            /**
             * 声调符号映射表
             * @type {Object<number, string>}
             */
            toneMarks: {
                0: '',
                1: '¯',
                2: '´',
                3: 'ˇ',
                4: '`'
            },
            /**
             * 记录每个字符上的声调
             * @type {Object<number, Object<number, number>>}
             */
            tonePositions: {},
            /**
             * 操作历史记录栈
             * @type {Array<{
             *   itemIndex: number,
             *   charIndex: number,
             *   previousState: Object
             * }>}
             */
            historyStack: [],

        };
    },
    computed: {
        /**
         * 是否可以执行撤销操作
         * @type {boolean}
         */
        canUndo() {
            return this.historyStack.length > 0;
        }
    },
    methods: {
        /**
         * 检查指定位置是否可以接受声调标记
         * @param {number} itemIndex - 拼音项索引
         * @param {number} charIndex - 字符索引(0-based)
         * @returns {boolean} 是否可以放置声调
         */
        canAcceptTone(itemIndex, charIndex) {
            const positions = this.pinyinData[itemIndex].pos;
            return positions.includes(charIndex + 1);
        },
        /**
         * 处理声调拖动开始事件
         * @param {number} tone - 声调值(1-4)
         */
        handleDragStart(tone) {
            this.currentDraggingTone = tone;
        },
        /**
         * 处理拖拽悬停事件
         * @param {DragEvent} event - 拖拽事件
         * @param {number} itemIndex - 拼音项索引
         * @param {number} charIndex - 字符索引
         */
        handleDragOver(event, itemIndex, charIndex) {
            if (this.canAcceptTone(itemIndex, charIndex)) {
                event.preventDefault();
            }
        },
        /**
         * 检查答案并更新isRight状态
         * @param {number} itemIndex - 要检查的拼音项索引
         */
        checkAndUpdate(itemIndex) {
            const item = this.pinyinData[itemIndex];
            let isCorrect = true;

            // 检查是否所有必需的位置都有声调
            for (let i = 0; i < item.pos.length; i++) {
                const pos = item.pos[i] - 1;
                if (!this.tonePositions[itemIndex]?.[pos]) {
                    isCorrect = false;
                    break;
                }
            }

            // 如果所有位置都有声调，检查是否正确
            if (isCorrect) {
                for (let i = 0; i < item.pos.length; i++) {
                    const pos = item.pos[i] - 1;
                    const correctTone = item.correctTones[i];
                    const userTone = this.tonePositions[itemIndex][pos];

                    if (correctTone !== 0 && userTone !== correctTone) {
                        isCorrect = false;
                        break;
                    }
                }
            }

            item.isRight = isCorrect;
        },
        /**
         * 处理声调放置事件
         * @param {number} itemIndex - 拼音项索引
         * @param {number} charIndex - 字符索引
         */
        handleDrop(itemIndex, charIndex) {
            if (this.currentDraggingTone && this.canAcceptTone(itemIndex, charIndex)) {
                // 保存当前状态到历史记录
                const currentState = JSON.parse(JSON.stringify(this.tonePositions));
                this.historyStack.push({
                    itemIndex,
                    charIndex,
                    previousState: currentState
                });

                // 更新声调位置
                const newTonePositions = { ...this.tonePositions };
                if (!newTonePositions[itemIndex]) {
                    newTonePositions[itemIndex] = {};
                }
                newTonePositions[itemIndex][charIndex] = this.currentDraggingTone;
                this.tonePositions = newTonePositions;

                // 自动检查并更新
                this.checkAndUpdate(itemIndex);

                this.currentDraggingTone = null;
            }
        },
        /**
         * 撤销上一次操作
         */
        undo() {
            if (this.historyStack.length > 0) {
                const { itemIndex, previousState } = this.historyStack.pop();
                this.tonePositions = previousState;

                // 撤销后重新检查
                this.checkAndUpdate(itemIndex);
            }
        },

        playAudio(a1, index, e) {
            if (e.touches) {
                e.preventDefault();
            }
            // console.log(this.allQuestions[a1].audios[index]);
            //   console.log(this.pinyinData);

            var url_now;
            var audio_now;
            var url_id;
            var a2 = document.querySelector(".newAudio");
            if (a2) {
                a2.pause();         // 暂停播放
                a2.currentTime = 0;
            }
            if (index == -1) {
                url_now = this.pinyinData[a1].audio_title;
                url_id = index;
            }
            else {
                url_now = this.pinyinData[a1].audios[index];
                url_id = index;
            }
            audio_now = document.createElement('audio');
            audio_now.classList.add("newAudio");
            audio_now.src = url_now;
            document.body.appendChild(audio_now);
            // console.log("a2", a2);
            // console.log("audio_now", audio_now);
            if (a2) {
                if (a2.src != audio_now.src || this.audio_isPlay == false) {
                    a2.remove();
                    audio_now.play();
                    this.audio_isPlay = true;
                }
                else {
                    a2.remove(); this.audio_isPlay = false;
                }
            }
            else {
                audio_now.play();
                this.audio_isPlay = true;
            }
            this.audio_id = url_id;
            this.audioEle = audio_now;
        },

    }
};
</script>

<style scoped>
.pinyin-teacher {
    font-family: Arial, sans-serif;
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
}

.teacher-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

.teacher-header h3 {
    margin: 0;
    font-size: 1.5rem;
    color: #333;
}

.undo-btn {
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.9rem;
    transition: background-color 0.3s;
    background-color: #ff4d4f;
    color: white;
}

.undo-btn:disabled {
    background-color: #d9d9d9;
    cursor: not-allowed;
}

.pinyin-list {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.pinyin-item {
    padding: 15px;
    border: 1px solid #e8e8e8;
    border-radius: 4px;
    background-color: #fff;
}

.item-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
}

.item-meaning {
    font-size: 1.1rem;
    font-weight: bold;
    color: #333;
}

.pinyin-display {
    display: flex;
    justify-content: center;
    gap: 5px;
    margin-bottom: 15px;
    font-size: 1.8rem;
}

.pinyin-char {
    position: relative;
    padding: 8px;
    min-width: 20px;
    text-align: center;
}

.pinyin-char.is-space {
    min-width: 15px;
}

.pinyin-char.can-have-tone {
    border: 1px dashed #ccc;
    cursor: pointer;
}

.pinyin-char:not(.can-have-tone) {
    cursor: not-allowed;
    opacity: 0.7;
}

.tone-mark {
    position: absolute;
    top: -5px;
    right: 0;
    left: 0;
    font-size: 50px;
}

.tone-1,
.tone-2,
.tone-3,
.tone-4 {
    color: #f5222d;
}

.tone-selector {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-bottom: 15px;
}

.tone-option {
    padding: 6px 12px;
    border: 1px solid #d9d9d9;
    border-radius: 4px;
    cursor: grab;
    background-color: #fafafa;
    transition: all 0.2s;
}

.tone-option:hover {
    background-color: #e6f7ff;
    border-color: #91d5ff;
}

.laba {
    width: 30px;
    height: 30px;
    cursor: pointer;
}
</style>
