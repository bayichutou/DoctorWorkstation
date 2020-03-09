<template>
  <div class="zwsj">
    <img
      src="../../assets/images/platform/no_data.png"
      :width="imgW"
      :height="imgH"
    />
    <div style="color: #999;font-size: 12px;margin-top: 5px">{{ text }}</div>
  </div>
</template>

<script>
export default {
  name: "nodata",
  props: {
    text: {
      require: true
    },
    imgW: {
      default: "175px"
    },
    imgH: {
      default: "95px"
    }
  }
};
</script>

<style scoped>
.zwsj {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
}
</style>
