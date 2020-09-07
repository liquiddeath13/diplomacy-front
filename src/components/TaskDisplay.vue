<template>
    <div class="task-display-frame">
      <SlotElement>
          <p v-if="label != undefined">{{label}}</p>
          <span class="content" v-html="markdownFromDescription()"/>
      </SlotElement>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Marked } from '@ts-stack/markdown';
import SlotElement from '../components/SlotElement.vue';

@Component({
    components: {
        SlotElement
    }
})
export default class TaskDisplay extends Vue {
  @Prop() private label!: number;
  @Prop() private description!: string;
  markdownFromDescription(): string {
    //
    //НАЧАТЬ БРАТЬ ОПИСАНИЕ ЗАДАНИЯ ИЗ $store.state.TestSolution.TaskListSolution[this.$store.state.currentTaskIndex]
    if (this.description.length > 0) return Marked.parse(this.description);
    return "в данной зоне будет отображено описание задания";
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.task-display-frame {
    .content {
        margin-left: 1.5rem;
        margin-top: 0.5rem;
    }
}
</style>