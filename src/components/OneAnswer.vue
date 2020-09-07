<template>
    <div class="answer-form">
        <input v-for="(entity, index) in $store.state.ownTestsList[$store.state.currentOver].TaskList[$store.state.currentTaskIndex].AnswerList" :key="index" type="checkbox"/>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class OneAnswer extends Vue {
    
}
</script>

<style scoped>
.answer-form {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
}
</style>