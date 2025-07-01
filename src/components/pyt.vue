<template>
    <div class="pinyin-teacher">
        <div class="teacher-header">
            <h3>拼音教学</h3>
            <button class="undo-btn" :disabled="!canUndo" @click="undo">
                撤销当前操作
            </button>
        </div>

        <div class="pinyin-list">
            <div v-for="(item, itemIndex) in pinyinData" :key="item.id" class="pinyin-item">
                <div class="item-header">
                    <span class="item-meaning">{{ item.meaning }}</span>
                    <button class="check-btn" @click="checkItem(itemIndex)">
                        检查答案
                    </button>
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

                <div v-if="results[itemIndex]" :class="['result-message', results[itemIndex].status]">
                    {{ results[itemIndex].message }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, computed } from 'vue';

export default {
    props: {
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
    setup(props) {
        // 声调符号
        const toneMarks = {
            1: '¯',
            2: '´',
            3: 'ˇ',
            4: '`'
        };

        // 记录每个字符上的声调
        const tonePositions = ref({});

        // 历史记录栈
        const historyStack = ref([]);

        // 当前拖动的声调
        const currentDraggingTone = ref(null);

        // 检查结果
        const results = ref({});

        // 是否可以撤销
        const canUndo = computed(() => historyStack.value.length > 0);

        // 检查是否可以在此位置加声调
        const canAcceptTone = (itemIndex, charIndex) => {
            const positions = props.pinyinData[itemIndex].pos;
            // charIndex是0-based，pos是1-based，直接比较即可
            return positions.includes(charIndex + 1);
        };

        // 处理拖动开始
        const handleDragStart = (tone) => {
            currentDraggingTone.value = tone;
        };

        // 处理拖拽悬停
        const handleDragOver = (event, itemIndex, charIndex) => {
            if (canAcceptTone(itemIndex, charIndex)) {
                event.preventDefault();
            }
        };

        // 处理放置
        const handleDrop = (itemIndex, charIndex) => {
            if (currentDraggingTone.value && canAcceptTone(itemIndex, charIndex)) {
                // 保存当前状态到历史记录
                const currentState = { ...tonePositions.value };
                historyStack.value.push({
                    itemIndex,
                    charIndex,
                    previousTone: currentState[itemIndex]?.[charIndex] || null
                });

                // 更新声调位置
                const newTonePositions = { ...tonePositions.value };
                if (!newTonePositions[itemIndex]) {
                    newTonePositions[itemIndex] = {};
                }
                newTonePositions[itemIndex][charIndex] = currentDraggingTone.value;
                tonePositions.value = newTonePositions;

                currentDraggingTone.value = null;
            }
        };

        // 撤销操作
        const undo = () => {
            if (historyStack.value.length > 0) {
                const { itemIndex, charIndex, previousTone } = historyStack.value.pop();
                const newTonePositions = { ...tonePositions.value };

                if (previousTone === null) {
                    delete newTonePositions[itemIndex][charIndex];
                } else {
                    newTonePositions[itemIndex][charIndex] = previousTone;
                }

                tonePositions.value = newTonePositions;
            }
        };

        // 检查单个项目答案
        const checkItem = (itemIndex) => {
            const item = props.pinyinData[itemIndex];
            let isCorrect = true;
            let message = '';

            // 初始化结果对象
            const result = {
                missing: [],
                incorrect: []
            };

            // 检查是否所有必需的位置都有声调
            for (let i = 0; i < item.pos.length; i++) {
                const pos = item.pos[i] - 1; // 转为0-based
                if (!tonePositions.value[itemIndex]?.[pos]) {
                    isCorrect = false;
                    result.missing.push(pos + 1); // 转回1-based显示给用户
                }
            }

            if (result.missing.length > 0) {
                message = `请在位置 ${result.missing.join(', ')} 添加声调`;
            }

            // 如果所有位置都有声调，检查是否正确
            if (isCorrect) {
                for (let i = 0; i < item.pos.length; i++) {
                    const pos = item.pos[i] - 1;
                    const correctTone = item.correctTones[i];
                    const userTone = tonePositions.value[itemIndex][pos];

                    // 处理轻声(0声调)情况
                    const shouldCheckTone = correctTone !== 0;

                    if (shouldCheckTone && userTone !== correctTone) {
                        isCorrect = false;
                        result.incorrect.push({
                            position: pos + 1,
                            userTone,
                            correctTone
                        });
                    }
                }

                if (result.incorrect.length > 0) {
                    message = result.incorrect.map(err =>
                        `位置 ${err.position} 的声调不正确 (你的选择: ${err.userTone}声, 正确答案: ${err.correctTone}声)`
                    ).join('; ');
                }
            }

            results.value[itemIndex] = {
                status: isCorrect ? 'success' : 'error',
                message: isCorrect ? '正确！' : message || '请添加声调'
            };
        };



        return {
            toneMarks,
            pinyinData: props.pinyinData,
            tonePositions,
            currentDraggingTone,
            results,
            canUndo,
            canAcceptTone,
            handleDragStart,
            handleDragOver,
            handleDrop,
            undo,
            checkItem
        };
    }
};
</script>

<style scoped>
/* 基础样式 */
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

.undo-btn,
.check-btn {
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.9rem;
    transition: background-color 0.3s;
}

.undo-btn {
    background-color: #ff4d4f;
    color: white;
}

.undo-btn:disabled {
    background-color: #d9d9d9;
    cursor: not-allowed;
}

.check-btn {
    background-color: #1890ff;
    color: white;
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
    top: -12px;
    right: 0;
    left: 0;
    font-size: 1.3rem;
}

.tone-1 {
    color: #52c41a;
}

.tone-2 {
    color: #faad14;
}

.tone-3 {
    color: #f5222d;
}

.tone-4 {
    color: #8c8c8c;
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

.result-message {
    margin-top: 10px;
    padding: 8px;
    border-radius: 4px;
    text-align: center;
}

.result-message.success {
    background-color: #f6ffed;
    color: #52c41a;
    border: 1px solid #b7eb8f;
}

.result-message.error {
    background-color: #fff2f0;
    color: #f5222d;
    border: 1px solid #ffccc7;
}
</style>