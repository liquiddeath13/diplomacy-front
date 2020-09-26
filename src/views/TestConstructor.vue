<template>
  <div class="test-construct">
    <div class="container1">
        <TestDefinition :enbld="$store.state.currentTestEditIndex != -1" label="Укажите название теста (Обязательно):" h="5" v-model="$store.state.ownTestsList[$store.state.currentTestEditIndex].name"/>
        <div class="test-params">
          <TestDescription class="test-description" label="Укажите описание теста (Не обязательно):" h="15" v-model="$store.state.ownTestsList[$store.state.currentTestEditIndex].description"/>
          <div class="test-types">
            <p>Тип теста:</p>
            <select v-model="$store.state.ownTestsList[$store.state.currentTestEditIndex].type">
              <option v-for="(entity, index) in testTypes" :key="index" :value="index + 1">{{entity}}</option>
            </select>
            <div v-if="$store.state.ownTestsList[$store.state.currentTestEditIndex].type === 2">
              часов: <input class="time-limit-input" type="number" min="0" max="48" v-model="$store.state.ownTestsList[$store.state.currentTestEditIndex].timeLimit.hours"/>
              минут: <input class="time-limit-input" type="number" min="0" max="59" v-model="$store.state.ownTestsList[$store.state.currentTestEditIndex].timeLimit.minutes"/>
              секунд: <input class="time-limit-input" type="number" min="0" max="59" v-model="$store.state.ownTestsList[$store.state.currentTestEditIndex].timeLimit.seconds"/>
            </div>
          </div>
        </div>
        <SlotElement>
          <p>Укажите файл (файлы), содержащий задания теста (Не обязательно):</p>
          <UploadForm label="ни одного файла выбрано не было..." h="1.1"/>
        </SlotElement>
        <p>Список заданий:</p>
        <TaskList :testIndex="$store.state.currentTestEditIndex" :colorArray="colorData"/>
    </div>
    <div/>
    <div class="container2">
        <UIButton label="Добавить/редактировать задание" w="16" h="1.5" @click.native="createOrEditTask()" textColor="black"/>
        <UIButton label="Завершить формирование теста" w="16" h="1.5" @click.native="completeTestEdit()" textColor="black"/>
    </div>
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import TestDefinition from '../components/TestDefinition.vue';
import TestDescription from '../components/TestDescription.vue';
import SlotElement from '../components/SlotElement.vue';
import UIButton from '../components/UIButton.vue';
import UploadForm from '../components/UploadForm.vue';
import TaskList from '../components/TaskList.vue';
import { Component, Vue } from 'vue-property-decorator';
import { Test, Task, TaskTypes, User } from '@/store';

@Component({
    components: {
        TestDefinition, TestDescription, UIButton, SlotElement, UploadForm, TaskList
    }
})
export default class TestConstructor extends Vue {
  private colorData: string[] = [];
  private testTypes: string[] = ["Обучающий", "Контрольный"];
  created() {
    this.$store.state.currentTaskIndex = -1;
    (this.$store.state.ownTestsList[this.$store.state.currentTestEditIndex].taskList as Task[]).forEach(() => {
      this.colorData.push('black');
    });
  }
  createOrEditTask() {
    if (this.$store.state.currentTaskIndex === -1) {
      const newLen = (this.$store.state.ownTestsList[this.$store.state.currentTestEditIndex].taskList as Task[]).push({name: '', description: '', type: TaskTypes.None, answerList: []});
      this.$store.state.currentTaskIndex = newLen - 1;
    }
    this.$router.push({ name: 'task-construct' });
  }
  async completeTestEdit() {
    await User.addOrUpdateTest((this.$store.state.ownTestsList as Test[])[this.$store.state.currentTestEditIndex]);
    this.$store.state.currentTestEditIndex = -1;
    this.$router.push({ name: 'main' });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.test-construct {
    display: grid;
    grid-template-columns: 49% 2% 49%;
    .container2 {
        margin-top: 15rem;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }
    .test-description {
      width: 35rem;
    }
    .test-params {
      display: flex;
      gap: 1.5rem;
      .test-types {
        display: flex;
        flex-direction: column;
        width: 8rem;
        .time-limit-input {
          width: 5rem;
        }
      }
    }
}
</style>