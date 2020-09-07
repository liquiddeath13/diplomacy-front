<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/tests-list">Available tests</router-link> |
      <router-link to="/task-construct">Task constructor</router-link> |
      <router-link to="/test-construct">Test constructor</router-link> |
      <router-link to="/test-solve-view">Test solve view</router-link>
    </div> -->
    <router-view/>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 21px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-left: 10%;
  margin-top: 3%;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
