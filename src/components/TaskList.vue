<template>
  <SlotElement>
        <p>Список заданий:</p>
        <SlotElement class="task-list">
            <UIButton @click.native="onClickEvt(index)" v-for="(entity, index) in localTaskList" :key="index" :label="entity.Name" w="13" h="1.5"/>
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
  private localTaskList = [];
  created() {
    if (this.testIndex != -1) {
      this.localTaskList = this.$store.state.ownTestsList[this.testIndex].TaskList;
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
  height: 24.4rem;
  width: 16rem;
  overflow-y: scroll;
  border: 1px solid black;
  border-radius: 5px;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}
</style>