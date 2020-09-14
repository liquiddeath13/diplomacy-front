<template>
  <div class="test-solve-view">
    <div class="task-side">
      <TaskDisplay class="task-display" label="" :description="solution.taskListSolution[$store.state.currentTaskIndex].task.description"/>
      <div v-if="solution.taskListSolution[$store.state.currentTaskIndex].task.type === 1">
        <div v-for="(entity, index) in solution.taskListSolution[$store.state.currentTaskIndex].task.answerList" :key="index">
          <input type="radio" name="one-answer" :value="entity" v-model="solution.taskListSolution[$store.state.currentTaskIndex].userAnswer[0]"/> {{entity.description}}
        </div>
      </div>
      <div v-else-if="solution.taskListSolution[$store.state.currentTaskIndex].task.type === 2">
        <div v-for="(entity, index) in solution.taskListSolution[$store.state.currentTaskIndex].task.answerList" :key="index">
          <input type="checkbox" :id="'answer-'+index" :value="entity" v-model="solution.taskListSolution[$store.state.currentTaskIndex].userAnswer"/> {{entity.description}}
        </div>
      </div>
      <div v-else-if="solution.taskListSolution[$store.state.currentTaskIndex].task.type === 3">
        matching answer
      </div>
      <div v-else-if="solution.taskListSolution[$store.state.currentTaskIndex].task.type === 4">
          Ответ:
          <input type="text" v-model="solution.taskListSolution[$store.state.currentTaskIndex].userAnswer.description"/>
      </div>
      <div v-else>
        let me see what just happened {{solution.taskListSolution[$store.state.currentTaskIndex].task}}
      </div>
    </div>
    <div/>
    <div class="container1">
        <TaskList :testIndex="$store.state.currentOver"/>
        <UIButton label="Завершить прохождение теста" w="16" h="1.5" @click.native="finishSolve()"/>
    </div>
  </div>
</template>

<script lang="ts">
import { Task, TestSolution, User } from '@/store';
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
  private solution: TestSolution = {
    taskListSolution: [],
     createdAt: new Date(Date.now()),
     solutionMark: 0.0,
     testName: this.$store.state.ownTestsList[this.$store.state.currentOver].name
  };
  created() {
    this.$store.state.currentTaskIndex = 0;
    const taskList = (this.$store.state.ownTestsList[this.$store.state.currentOver].taskList as Task[]);
    taskList.forEach((value) => {
      this.solution.taskListSolution.push({
        task: value,
        userAnswer: []
      });
    });
  }
  finishSolve() {
    User.postSolution(this.solution).then((value) => {
      console.log(value.solutionMark);
    });
    this.$router.push({ name: 'main' });
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