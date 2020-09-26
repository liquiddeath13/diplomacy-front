<template>
    <div class="upload-form">
        <input type="text" readonly :placeholder="label" :style="{ resize: 'none', width: w != undefined ? w + 'rem' : '100%', height: h + 'rem' }"/>
        <UIButton label="Обзор..." w="5" h="1.5" textColor="black"/>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import UIButton from '../components/UIButton.vue';

@Component({
    components: {
        UIButton
    }
})
export default class UploadForm extends Vue {
  @Prop() private label!: string;
  @Prop() private w!: number;
  @Prop() private h!: number;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.upload-form {
    .rounded-border {
        border-radius: 5px;
    }
    display: flex;
    gap: 1rem;
}
</style>