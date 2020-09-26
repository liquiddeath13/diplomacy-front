<template>
    <div class="task-filelist-frame">
      <SlotElement>
          <div class="header">
              <p v-if="label != undefined">{{label}}</p>
              <UIButton class="add-btn" label="Добавить" w="15" h="1.5" textColor="black"/>
          </div>
          <div class="file-list rounded-border">

          </div>
      </SlotElement>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import SlotElement from '../components/SlotElement.vue';
import UIButton from '../components/UIButton.vue';

@Component({
    components: {
        SlotElement, UIButton
    }
})
export default class TaskFileList extends Vue {
  @Prop() private label!: string;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.task-filelist-frame {
    .rounded-border {
        border-radius: 5px;
    }
    .file-list {
        width: 100%;
        height: 15rem;
        background-color: rgb(225, 225, 225);
        border: 1px solid black;
    }
    .header {
        display: flex;
        align-items: center;
        .add-btn {
            margin-left: auto;
        }
    }
}
</style>