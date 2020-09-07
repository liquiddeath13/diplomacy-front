<template>
    <div class="ui-button">
        <button class="rounded-border" :style="{ resize: 'none', width: w + 'rem', height: h + 'rem' }">{{label}}</button>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class UIButton extends Vue {
  @Prop() private label!: string;
  @Prop() private w?: number;
  @Prop() private h?: number;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.ui-button {
    :hover {
        background-color: rgb(225, 225, 225);
    }
    .rounded-border {
        border-radius: 5px;
        border: 0.5px solid black;
    }
}
</style>