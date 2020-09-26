<template>
    <div class="test-details">
        <div class="header">
            <div class="name">{{$store.state.testDetails.testName}}</div>
            <div class="panel">
                <button @click="startSolveSelectedTest()">Пройти тест</button>
                <button @click="editSelectedTest()">Редактировать тест</button>
                <!-- <button @click="deleteSelectedTest()">Удалить тест</button> -->
            </div>
        </div>
        <div class="description">
            <div>Дата создания: {{beautyDate($store.state.testDetails.createdAt)}}</div>
            <div>Дата последнего изменения: {{beautyDate($store.state.testDetails.editedAt)}}</div>
            <div v-if="$store.state.testDetails.timeLimit != undefined">Время, отведённое на прохождение теста: {{$store.state.testDetails.timeLimit.totalSeconds != 0 ? beautyTime($store.state.testDetails.timeLimit) : 'не ограничено'}}</div>
            <div>Средний балл решения: {{$store.state.testDetails.averagePts}}/{{$store.state.testDetails.maxPts}}</div>
            <div>Количество студентов, предоставивших решение: {{$store.state.testDetails.solutionCount}}</div>
            <div v-if="$store.state.testDetails.averageSolveTime != undefined">Среднее время прохождения тестирования: {{beautyTime($store.state.testDetails.averageSolveTime)}}</div>
            <div>Список студентов, предоставивших решение:</div>
            <div class="solutions-list">
                <table>
                    <th class="sortable" style="width: 35%" @click="sortColumn('name')">
                        ФИО
                    </th>
                    <th class="sortable" style="width: 10%" @click="sortColumn('studyGroup')">
                        Группа
                    </th>
                    <th class="sortable" style="width: 21%" @click="sortColumn('solveDate')">
                        Дата предоставления
                    </th>
                    <th class="sortable" @click="sortColumn('solveResult')">
                        Результат прохождения
                    </th>
                    <th style="width: 15%">
                        Решение
                    </th>
                    <tr v-for="(entity, index) in $store.state.testDetails.solvedBy" :key="index">
                        <td>{{entity.name}}</td>
                        <td>пусто</td>
                        <td>{{beautyDate($store.state.testDetails.testSolutions[index].createdAt)}}</td>
                        <td>{{beautyTime($store.state.testDetails.testSolutions[index].solveTime)}}, {{$store.state.testDetails.testSolutions[index].solutionMark}}</td>
                        <td><button @click="showSolution(index)">Просмотреть</button></td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { SharpTimeSpan, Test, User } from '@/store';
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class TestDetails extends Vue {
    @Prop() test!: Test;
    private sortType = 'asc';
    beautyTime(timeStruct: SharpTimeSpan): string {
        return (timeStruct.hours < 10 ? '0' + timeStruct.hours : timeStruct.hours)
        +':'
        +(timeStruct.minutes < 10 ? '0' + timeStruct.minutes : timeStruct.minutes)
        +':'
        +(timeStruct.seconds < 10 ? '0' + timeStruct.seconds : timeStruct.seconds);
    }
    sortByName() {
        if (this.sortType === 'asc') {
            (this.$store.state.testDetails.solvedBy as User[]).sort(function (a, b): number {
                if (a.name > b.name) {
                    return 1;
                }
                if (a.name < b.name) {
                    return -1;
                }
                return 0;
            });
            this.sortType = 'desc';
        } else {
            (this.$store.state.testDetails.solvedBy as User[]).sort(function (a, b): number {
                if (a.name < b.name) {
                    return 1;
                }
                if (a.name > b.name) {
                    return -1;
                }
                return 0;
            });
            this.sortType = 'asc';
        }
    }
    // sortByStudyGroup() {

    // }
    // sortBySolveDate() {

    // }
    // sortBySolveResult() {

    // }
    sortColumn(columnName: string) {
        if (columnName === 'name') {
            this.sortByName();
        } else if (columnName === 'studyGroup') {
            // (this.$store.state.testDetails.solvedBy as User[]).sort(function (a, b): number {
            //     if (a. > b.) {
            //         return 1;
            //     }
            //     if (a. < b.) {
            //         return -1;
            //     }
            //     return 0;
            // });
        } else if (columnName === 'solveDate') {
            // (this.$store.state.testDetails.solvedBy as User[]).sort(function (a, b): number {
            //     if (a. > b.) {
            //         return 1;
            //     }
            //     if (a. < b.) {
            //         return -1;
            //     }
            //     return 0;
            // });
        } else if (columnName === 'solveResult') {
            // (this.$store.state.testDetails.solvedBy as User[]).sort(function (a, b): number {
            //     if (a.name > b.name) {
            //         return 1;
            //     }
            //     if (a.name < b.name) {
            //         return -1;
            //     }
            //     return 0;
            // });
        }
    }
    beautyDate(pseudoDate: string): string {
        return new Date(Date.parse(pseudoDate)).toLocaleString();
    }
    showSolution(index: number) {
        this.$store.state.workMode = 1;
        this.$store.state.watchSolutionIndex = index;
        this.$router.push({ name: 'test-solve-view' });
    }
    updated() {
        // console.log('updated()');
        // console.log(this.$store.state.testDetails);
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
        this.$store.state.workMode = 0;
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
            height: 17rem;
            text-align: center;
            .sortable {
                cursor: pointer;
            }
        }
    }
}
</style>