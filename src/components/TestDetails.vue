<template>
    <div class="test-details">
        <div class="header">
            <div class="name">{{$store.state.testDetails.testName}}</div>
            <div class="panel">
                <!-- <button @click="startSolveSelectedTest()">Пройти тест</button> -->
                <button @click="editSelectedTest()">Редактировать тест</button>
                <button @click="deleteSelectedTest()">Удалить тест</button>
            </div>
        </div>
        <div class="description">
            <div>Дата создания: {{beautyDate($store.state.testDetails.createdAt)}}</div>
            <div>Дата последнего изменения: {{beautyDate($store.state.testDetails.editedAt)}}</div>
            <div>Средний балл решения: {{$store.state.testDetails.averagePts}}</div>
            <div>Количество студентов, предоставивших решение: {{$store.state.testDetails.solutionCount}}</div>
            <div>Среднее время прохождения тестирования: {{averageSolveTime()}}</div>
            <div>Список студентов, предоставивших решение:</div>
            <table class="solutions-list">
                <th style="width: 30%">
                    ФИО
                </th>
                <th style="width: 10%">
                    Группа
                </th>
                <th>
                    Дата предоставления
                </th>
                <th>
                    Результат прохождения
                </th>
                <th style="width: 15%">
                    Решение
                </th>
                <tr v-for="(entity, index) in $store.state.testDetails.solvedBy" :key="index">
                    <td>entity.name</td>
                    <td>пусто</td>
                    <td>$store.state.testDetails.createdAt</td>
                    <!-- <td>$store.state.testDetails.</td> -->
                    <td><button>Просмотреть</button></td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script lang="ts">
import { Test, User } from '@/store';
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class TestDetails extends Vue {
    @Prop() test!: Test;
    averageSolveTime(): string {
        if (this.$store.state.testDetails.averageSolveTime != undefined) {
            const minutes = this.$store.state.testDetails.averageSolveTime.totalMinutes;
            const seconds = this.$store.state.testDetails.averageSolveTime.totalSeconds;
            return (minutes < 10 ? '0' + minutes : minutes)+':'+(seconds < 10 ? '0' + seconds : seconds);
        }
        return '00:00';
    }
    beautyDate(pseudoDate: string): string {
        return new Date(Date.parse(pseudoDate)).toLocaleString();
    }
    editSelectedTest() {
        this.$store.state.currentTestEditIndex = this.$store.state.currentOver;
        this.$router.push({ name: 'test-construct' });
    }
    deleteSelectedTest() {
        if (confirm("Вы уверены, что хотите удалить тест?")) {
            const activeStr = ' active';
            User.removeTest((this.$store.state.ownTestsList as Test[])[this.$store.state.currentOver]).then(() => {
                (this.$store.state.ownTestsList as Test[]).splice(this.$store.state.currentOver, 1);
                for (let index = 0; index < document.getElementsByClassName(activeStr).length; index++) {
                    const newClassName = (document.getElementsByClassName(activeStr).item(index) as Element).className.replaceAll(activeStr, '');
                    (document.getElementsByClassName(activeStr).item(index) as Element).className = newClassName;
                    this.$store.state.currentOver = -1;
                }
            });
        }
    }
    startSolveSelectedTest() {
        this.$router.push({ name: 'test-solve-view' });
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.test-details {
    border: 1px solid black;
    border-radius: 5px;
    margin-top: 5.7rem;
    width: 60rem;
    height: 35rem;
    .header {
        margin-top: 1rem;
        display: flex;
        .name {
            margin-left: 1rem;
        }
        .panel {
            margin-left: auto;
            margin-right: 1rem;
            display: flex;
            gap: 0.5rem;
        }
    }
    .description {
        margin-top: 2rem;
        margin-left: 1rem;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        .solutions-list {
            overflow-y: scroll;
            border: 1px solid black;
            border-radius: 5px;
            width: 58rem;
            height: 19rem;
            text-align: center;
        }
    }
}
</style>