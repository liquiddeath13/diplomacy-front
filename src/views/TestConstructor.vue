<template>
  <div class="test-construct">
    <div class="container1">
        <TestDefinition label="Укажите название теста (Обязательно):" h="5" v-model="$store.state.ownTestsList[$store.state.currentTestEditIndex].Name"/>
        <TestDescription label="Укажите описание теста (Не обязательно):" h="15" v-model="$store.state.ownTestsList[$store.state.currentTestEditIndex].Description"/>
        <SlotElement>
          <p>Укажите файл (файлы), содержащий задания теста (Не обязательно):</p>
          <UploadForm label="ни одного файла выбрано не было..." h="1.1"/>
        </SlotElement>
    </div>
    <div/>
    <div class="container2">
        <TaskList :testIndex="$store.state.currentTestEditIndex"/>
        <UIButton label="Добавить/редактировать задание" w="16" h="1.5" @click.native="createOrEditTask()"/>
        <UIButton label="Завершить формирование теста" w="16" h="1.5" @click.native="completeTestEdit()"/>
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
import { Test, Task } from '@/store';

@Component({
    components: {
        TestDefinition, TestDescription, UIButton, SlotElement, UploadForm, TaskList
    }
})
export default class TestConstructor extends Vue {
  created() {
    this.$store.state.currentTaskIndex = -1;
  }
  createOrEditTask() {
    if (this.$store.state.currentTaskIndex === -1) {
      const newLen = (this.$store.state.ownTestsList[this.$store.state.currentTestEditIndex].TaskList as Task[]).push({Name: '', Description: '', AnswerList: []});
      this.$store.state.currentTaskIndex = newLen - 1;
    }
    this.$router.push({ name: 'task-construct' });
  }
  completeTestEdit() {
    (this.$store.state.ownTestsList as Test[])[this.$store.state.currentTestEditIndex].EditedAt = new Date(Date.now());
    this.$store.state.currentTestEditIndex = -1;
    this.$router.push({ name: 'tests-list' });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.test-construct {
    display: grid;
    grid-template-columns: 49% 2% 49%;
    .container2 {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }
}
</style>