<template>
  <SlotElement>
        <!-- <p>Список заданий:</p> -->
        <SlotElement class="task-list">
            <UIButton @click.native="onClickEvt(index)" 
                      :id="'task-list-button-'+index"
                      v-for="(entity, index) in localTaskList" 
                      :key="index" 
                      :label="index+1" 
                      w="3" h="1.5"
                      :textColor="colorArray[index]"
                      :backColor="$store.state.currentTaskIndex === index ? '#aad6ef' : 'white'"
            />
        </SlotElement>
  </SlotElement>
</template>

<script lang="ts">
// @ is an alias to /src
import SlotElement from '../components/SlotElement.vue';
import UIButton from '../components/UIButton.vue';
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
    components: {
        UIButton, SlotElement
    }
})
export default class TaskList extends Vue {
  @Prop() private testIndex!: number;
  @Prop() private colorArray!: string[];
  private localTaskList = [];
  created() {
    if (this.testIndex != -1) {
      this.localTaskList = this.$store.state.ownTestsList[this.testIndex].taskList;
    }
  }
  onClickEvt(index: number) {
    this.$store.state.currentTaskIndex = index;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.task-list {
  text-align: center;
  display: flex;
  gap: 0.4rem;
  padding-bottom: 0.5rem;
}
</style>