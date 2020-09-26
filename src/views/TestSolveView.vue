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
      <div class="list">
        <TaskList :testIndex="$store.state.currentOver" :colorArray="colorData"/>
      </div>
    </div>
    <div/>
    <div class="container1">
        <div v-if="testType === 2">
          Осталось {{beautyTime(counter)}} до окончания прохождения!
        </div>
        <UIButton textColor="black" 
                  :label="$store.state.workMode == 0 ? 'Завершить прохождение теста' : 'Завершить просмотр решения'" 
                  w="16" h="1.5" 
                  @click.native="finishSolve()"/>
    </div>
  </div>
</template>

<script lang="ts">
import { SharpTimeSpan, Task, TaskTypes, Test, TestSolution, TestTypes } from '@/store';
// @ is an alias to /src
import { Component, Vue } from 'vue-property-decorator';
import TaskDisplay from '../components/TaskDisplay.vue';
import TaskList from '../components/TaskList.vue';
import UIButton from '../components/UIButton.vue';

interface TestTimer {
  hrs: number;
  min: number;
  sec: number;
}

@Component({
    components: {
        TaskDisplay, UIButton, TaskList
    }
})
export default class TestSolveView extends Vue {
  private colorData: string[] = [];
  private solution: TestSolution = {
    taskListSolution: [],
    createdAt: new Date(Date.now()),
    solutionMark: 0.0,
    testName: this.$store.state.ownTestsList[this.$store.state.currentOver].name,
    solveTime: {
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
  };
  private counter: SharpTimeSpan = {
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
  };
  private solveTime: SharpTimeSpan = {
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
  private timerIntervalId = 0;
  private counterIntervalId = 0;
  private testType = TestTypes.None;
  shuffle(taskList: Task[]) {
    let currentIndex = taskList.length; 
    let temporaryValue: Task = {
      name: '',
      description: '',
      type: TaskTypes.None,
      answerList: []
    };
    let randomIndex = 0;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = taskList[currentIndex];
      taskList[currentIndex] = taskList[randomIndex];
      taskList[randomIndex] = temporaryValue;
    }
    return taskList;
  }
  beautyTime(timeStruct: SharpTimeSpan): string {
    return (timeStruct.hours < 10 ? '0' + timeStruct.hours : timeStruct.hours)
    +':'
    +(timeStruct.minutes < 10 ? '0' + timeStruct.minutes : timeStruct.minutes)
    +':'
    +(timeStruct.seconds < 10 ? '0' + timeStruct.seconds : timeStruct.seconds);
  }
  startSolveTimer(timeSpan: SharpTimeSpan) {
    this.counter = timeSpan;
    this.timerIntervalId = setInterval(() => {
      if (this.counter.seconds - 1 == -1) {
        this.counter.minutes -= 1;
        this.counter.seconds = 59
      } 
      else this.counter.seconds -= 1
      if (this.counter.minutes === 0 && this.counter.seconds == 0) {
        this.finishSolve();
      }
    }, 1000)
  }
  startCountSolveTime() {
    this.counterIntervalId = setInterval(() => {
      this.solveTime.seconds++;
    }, 1000)
  }
  created() {
    this.$store.state.currentTaskIndex = 0;
    if (this.$store.state.workMode == 0) {
      const test = (this.$store.state.ownTestsList[this.$store.state.currentOver] as Test);
      const taskList = this.shuffle(test.taskList);
      taskList.forEach((value) => {
        this.solution.taskListSolution.push({
          task: value,
          userAnswer: []
        });
        this.colorData.push('black');
      });
      this.testType = test.type;
      if (this.testType == TestTypes.Regulate) {
        this.startSolveTimer(test.timeLimit);
      }
      this.startCountSolveTime();
    } 
    else if (this.$store.state.workMode == 1) {
      this.solution = this.$store.state.testDetails.testSolutions[this.$store.state.watchSolutionIndex];
      this.solution.taskListSolution.forEach(value => {
        let taskSolveState = false;
        value.userAnswer.forEach(value => {
          taskSolveState = value.flag
        });
        this.colorData.push(taskSolveState ? 'green' : 'red');
      });
    }
  }
  finishSolve() {
    if (this.$store.state.workMode === 0) {
      clearInterval(this.timerIntervalId);
      clearInterval(this.counterIntervalId);
      if (this.testType == TestTypes.Edu) {
        while (this.solveTime.seconds > 60) {
          ++this.solveTime.minutes;
          this.solveTime.seconds -= 60;
        }
        while (this.solveTime.minutes > 60) {
          ++this.solveTime.hours;
          this.solveTime.minutes -= 60;
        }
      }
      this.solution.solveTime = this.solveTime;
      console.log(this.solution);
      // User.postSolution(this.solution).then((value) => {
      //   console.log(value.solutionMark);
      // });
    }
    this.$router.push({ name: 'main' });
  }
  beforeDestroy() {
    if (this.$store.state.workMode === 0) {
      clearInterval(this.timerIntervalId);
      clearInterval(this.counterIntervalId);
    }
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
.list {
  margin-top: 5rem;
}
</style>