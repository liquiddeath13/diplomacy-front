<template>
    <div class="test-definition-frame">
      <SlotElement>
          <p v-if="label != undefined">{{label}}</p>
          <textarea :enabled="enbld" class="rounded-border" v-bind:value="value" v-on:input="$emit('input', $event.target.value)" :style="{ resize: 'none', width: w != undefined ? w + 'rem' : '100%', height: h + 'rem' }"/>
      </SlotElement>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import SlotElement from '../components/SlotElement.vue';

@Component({
    components: {
        SlotElement
    }
})
export default class TestDefinition extends Vue {
  @Prop() private value!: string;
  @Prop() private enbld!: boolean;
  @Prop() private label!: string;
  @Prop() private w!: number;
  @Prop() private h!: number;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.test-definition-frame {
    .rounded-border {
        border-radius: 5px;
    }
}
</style>