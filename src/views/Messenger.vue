<template>
  <div class="messenger">
    <div class="sidebar">
      123
    </div>
  </div>
</template>

<script>

export default {};
</script>

<style scoped>
  .messenger {
    display: flex;
    flex-direction: row;
    height: 100%;
  }
  .messenger .sidebar {
    background-color: rgba(0, 0, 0, 0.1);
    border: solid;
    border-width: 0 thin 0 0;
    border-color: rgba(255, 255, 255, 0.12);
    width: 300px;
    height: 100%;
  }
  .messenger .viewport {
    flex-grow: 1;
    height: 100%;
  }
</style>
