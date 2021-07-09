<template>
  <div>
    <class-detail :is-edit="true" />
  </div>
</template>

<script>
import ClassDetail from "./components/ClassDetail.vue";
export default {
  
  name: 'updateGoodClass',
  components: {
    ClassDetail,
  },
};
</script>
