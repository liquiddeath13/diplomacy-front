<template>
    <div class="main">
        <TestsList/>
        <TestDetails v-if="$store.state.currentOver != -1" :test="$store.state.ownTestsList[$store.state.currentOver]"/>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import TestsList from '../components/TestsListView.vue';
import TestDetails from '../components/TestDetails.vue';

@Component({
    components: {
        TestsList, TestDetails
    }
})
export default class MainPage extends Vue {
    
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.main {
    display: flex;
    gap: 5rem;
}
</style>