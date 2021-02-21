<template>
  <div id="app">
    <my-addition></my-addition>
    <p>-----------------------</p>
    <my-subtration></my-subtration>
  </div>
</template>

<script>
import Addition from './components/Addition.vue'
import Subtration from './components/Subtration.vue'
export default {
  components: {
    'my-addition': Addition,
    'my-subtration': Subtration
  }
}
</script>

<style></style>
