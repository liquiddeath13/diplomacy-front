<template>
  <div class="test-solve-view">
    <TaskDisplay class="task-display" label="" :description="solution.TaskListSolution[$store.state.currentTaskIndex].Task.Description"/>
    <div/>
    <div class="container1">
        <TaskList :testIndex="$store.state.currentOver"/>
        <UIButton label="Завершить прохождение теста" w="16" h="1.5" @click.native="finishSolve()"/>
    </div>
  </div>
</template>

<script lang="ts">
import { Task, TestSolution } from '@/store';
// @ is an alias to /src
import { Component, Vue } from 'vue-property-decorator';
import TaskDisplay from '../components/TaskDisplay.vue';
import TaskList from '../components/TaskList.vue';
import UIButton from '../components/UIButton.vue';

@Component({
    components: {
        TaskDisplay, UIButton, TaskList
    }
})
export default class TestSolveView extends Vue {
  private solution: TestSolution = {TaskListSolution: [], CreatedAt: new Date(Date.now()), SolutionMark: 0.0};
  created() {
    this.$store.state.currentTaskIndex = 0;
    const taskList = (this.$store.state.ownTestsList[this.$store.state.currentOver].TaskList as Task[]);
    taskList.forEach((value) => {
      this.solution.TaskListSolution.push({
        Task: value,
        UserAnswer: {
          Description: '',
          Flag: false
        }
      });
    });
  }
  finishSolve() {
    this.solution.TaskListSolution.forEach((value) => {
      console.log(value.UserAnswer);
    });
    this.$router.push({ name: 'tests-list' });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.test-solve-view {
  display: grid;
  grid-template-columns: 49% 2% 49%;
}
.task-display {
  border: 0.5px solid black;
  border-radius: 5px;
}
.container1 {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
</style>