<template>
    <div class="root">
        <p>Доступные тесты:</p>
        <button @click="createNewTest()">Создать новый тест</button>
        <div class="list-container">
            <div :id="'test'+index" class="test-entity" v-for="(entity, index) in $store.state.ownTestsList" :key="index" @mouseenter="$store.state.currentOver = index" @mouseleave="$store.state.currentOver = -1">
                <p class="description">{{entity.Name}}</p>
                <template v-if="$store.state.currentOver === index">
                    <div class="panel">
                        <button @click="startSolveSelectedTest()">Пройти тест</button>
                        <button @click="editSelectedTest()">Редактировать тест</button>
                        <button @click="deleteSelectedTest()">Удалить тест</button>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Test } from '@/store';

@Component
export default class TestsList extends Vue {
    createNewTest() {
        const newLen = (this.$store.state.ownTestsList as Test[]).push({Name: '', Description: '', CreatedAt: new Date(Date.now()), EditedAt: new Date(Date.now()), TaskList: []});
        this.$store.state.currentTestEditIndex = newLen - 1;
        this.$router.push({ name: 'test-construct' });
    }
    editSelectedTest() {
        this.$store.state.currentTestEditIndex = this.$store.state.currentOver;
        this.$router.push({ name: 'test-construct' });
    }
    deleteSelectedTest() {
        if (confirm("Вы уверены, что хотите удалить тест?")) {
            (this.$store.state.ownTestsList as Test[]).splice(this.$store.state.currentOver, 1);
        }
    }
    startSolveSelectedTest() {
        this.$router.push({ name: 'test-solve-view' });
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
}
.description {
    margin-left: 2rem;
}
</style>