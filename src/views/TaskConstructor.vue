<template>
  <div class="task-construct">
    <div>
      <TaskDefinition label="Описание задания:" h="25" v-model="$store.state.ownTestsList[$store.state.currentTestEditIndex].taskList[$store.state.currentTaskIndex].description"/>
      <TaskFileList label="Список файлов задания:"/>
    </div>
    <div/>
    <div>
      <div class="btn-panel">
        <UIButton label="Сохранить" @click.native="saveTask()" textColor="black"/>
        <UIButton v-if="this.$store.state.currentTaskIndex != -1" label="Удалить задание" @click.native="deleteTask()" textColor="black"/>
      </div>
      <TaskDisplay class="task-display" label="Как выглядит задание для пользователя:" :description="$store.state.ownTestsList[$store.state.currentOver].taskList[$store.state.currentTaskIndex].description"/>
    </div>
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import TaskDisplay from '../components/TaskDisplay.vue';
import TaskDefinition from '../components/TaskDefinition.vue';
import TaskFileList from '../components/TaskFileList.vue';
import UIButton from '../components/UIButton.vue';
import { Component, Vue } from 'vue-property-decorator';
import { Task, Test, User } from '@/store';

@Component({
    components: {
        TaskDisplay, TaskDefinition, TaskFileList, UIButton
    }
})
export default class TaskConstructor extends Vue {
  private taskFileList = [];
  created() {
    this.$store.state.currentOver = this.$store.state.currentTestEditIndex;
  }
  saveTask() {
    const taskIndex = this.$store.state.currentTaskIndex;
    (this.$store.state.ownTestsList[this.$store.state.currentTestEditIndex].taskList as Task[])[taskIndex].name = 'Задание ' + (taskIndex + 1);
    this.$router.push({ name: 'test-construct' });
  }
  deleteTask() {
    if (confirm("Вы уверены, что хотите удалить задание?")) {
      if ((this.$store.state.ownTestsList[this.$store.state.currentTestEditIndex].taskList as Task[]).length < 2) {
        User.removeTest((this.$store.state.ownTestsList as Test[])[this.$store.state.currentOver]).then(value => {
            (this.$store.state.ownTestsList as Test[]).splice(this.$store.state.currentOver, 1);
            this.$store.state.currentOver = -1;
            this.$router.push({ name: 'main' });
        });
      } else {
        (this.$store.state.ownTestsList[this.$store.state.currentTestEditIndex].taskList as Task[]).splice(this.$store.state.currentTaskIndex, 1);
        this.$router.push({ name: 'test-construct' });
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.task-construct {
  display: grid;
  grid-template-columns: 45% 10% 45%;
}
.btn-panel {
  display: flex;
  gap: 1.4rem;
}
</style>
