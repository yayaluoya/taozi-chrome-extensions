<template>
  <div class="tapd">
    <img class="logo" src="../../assets/TAPD_Logo.svg" alt="" />
    <ElIcon v-if="tapdInfo?.loading" size="20" class="loading-icon is-loading"><Loading /></ElIcon>
    <div class="alert">
      注意！必须登录
      <a href="https://www.tapd.cn/" target="_blank">tapd</a>
      ，最近数据更新时间: {{ dayjs(tapdInfo?.dataUpdateTime).format("YYYY-MM-DD HH:mm:ss") }}
    </div>
    <div class="board">
      <ElAlert
        v-if="tapdInfo?.errMsg"
        title="获取tapd信息错误"
        :description="tapdInfo.errMsg"
        :closable="false"
        type="error"
        effect="dark"
      />
      <template v-else>
        <ElStatistic
          v-for="(item, index) in statistics"
          :key="index"
          :value="item.value"
          :value-style="{
            color: item.color,
            fontSize: '20px',
            fontWeight: 'bold'
          }"
        >
          <template #title>
            <span>
              {{ current_tab }}
              <span
                :style="{
                  color: item.color,
                  fontSize: '16px',
                  fontWeight: 'bold'
                }"
              >
                {{ item.title }}
              </span>
            </span>
          </template>
        </ElStatistic>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { ElAlert, ElStatistic, ElIcon } from "element-plus";
import dayjs from "dayjs";
import { Loading } from "@element-plus/icons-vue";
import { useTapdInfo } from "../../hooks/useTapdInfo";

const { tapdInfo } = useTapdInfo();

const statistics = computed(() => {
  return [
    {
      title: "story".toLocaleUpperCase(),
      value: tapdInfo.value?.workitemCount?.story || 0,
      color: "#409EFF"
    },
    {
      title: "task".toLocaleUpperCase(),
      value: tapdInfo.value?.workitemCount?.task || 0,
      color: "#303133"
    },
    {
      title: "bug".toLocaleUpperCase(),
      value: tapdInfo.value?.workitemCount?.bug || 0,
      color: "#F56C6C"
    }
  ];
});

const current_tab = computed(() => {
  return (
    {
      todo: "待办",
      done: "已办",
      created: "已创建"
    }[tapdInfo.value?.viewConfig?.current_tab || ""] ||
    tapdInfo.value?.viewConfig?.current_tab ||
    ""
  );
});
</script>

<style lang="scss" scoped>
.tapd {
  display: flex;
  flex-direction: column;
  background-image: url("../../assets/dashboard_bg.png");
  position: relative;
  padding: 12px;
  box-sizing: border-box;
  gap: 12px;

  .logo {
    height: 27px;
    position: absolute;
    top: 12px;
    right: 12px;
  }

  .loading-icon {
    position: absolute;
    bottom: 12px;
    right: 12px;
  }

  .board {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
  }
}
</style>
