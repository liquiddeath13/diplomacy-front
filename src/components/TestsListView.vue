<template>
    <div class="tests-list">
        <p>Доступные тесты:</p>
        <button @click="createNewTest()">Создать новый тест</button>
        <div class="list-container">
            <div :id="'test'+index" 
                 class="test-entity" 
                 v-for="(entity, index) in $store.state.ownTestsList" 
                 :key="index"
                 @mouseover="setCurrentLight(index)"
            >
                <p class="description">{{entity.name}}</p>
                <p class="type">({{getTestTypeDescription(entity.type)}})</p>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Test, TestTypes, User } from '@/store';

@Component
export default class TestsList extends Vue {
    mounted() {
        User.getOwnTests().then(value => {
            this.$store.state.ownTestsList = value;
        });
    }
    getTestTypeDescription(testType: TestTypes): string {
        if (testType == TestTypes.Edu) return 'Обучающий';
        return 'Контрольный';
    }
    setCurrentLight(index: number) {
        const activeStr = ' active';
        if (this.$store.state.currentOver != -1) {
            const prevClassName = (document.getElementById('test'+this.$store.state.currentOver) as HTMLElement).className;
            (document.getElementById('test'+this.$store.state.currentOver) as HTMLElement).className = prevClassName.replaceAll(activeStr, '');
        }
        this.$store.state.currentOver = index;
        User.getTestDescription(this.$store.state.ownTestsList[this.$store.state.currentOver].testId).then(x => {
            this.$store.state.testDetails = x;
        });
        (document.getElementById('test'+index) as HTMLElement).className += activeStr;
    }
    createNewTest() {
        const newLen = (this.$store.state.ownTestsList as Test[]).push({
            name: '',
            description: '',
            createdAt: new Date(Date.now()),
            editedAt: new Date(Date.now()),
            taskList: [],
            type: TestTypes.None,
            timeLimit: {
                days: 0,
                hours: 0,
                milliseconds: 0,
                minutes: 0,
                seconds: 0,
                ticks: 0,
                totalDays: 0,
                totalHours: 0,
                totalMilliseconds: 0,
                totalMinutes: 0,
                totalSeconds: 0
            }
        });
        this.$store.state.currentTestEditIndex = newLen - 1;
        this.$router.push({ name: 'test-construct' });
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.list-container {
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    width: 30rem;
    height: 50rem;
    overflow-y: auto;
    :hover {
        background-color: rgb(225, 225, 225);
    }
    .active {
        background-color: rgb(225, 225, 225);
    }
}
.panel {
    display: flex;
    gap: 0.3rem;
    margin-left: auto;
}
.test-entity {
    border: 0.5px solid black;
    border-radius: 5px;
    display: flex;
    gap: 0.5rem;
}
.description {
    margin-left: 2rem;
}
</style>