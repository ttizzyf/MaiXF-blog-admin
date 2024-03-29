<script setup lang="ts">
import { onMounted, ref, onUnmounted } from "vue";

const showToTop = ref(false);
const progressPathRef = ref();
const pathLength = ref(0);

const handleScroll = () => {
  showToTop.value = window.scrollY > 300;
};

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const initProgress = () => {
  let progressPath = progressPathRef.value;
  pathLength.value = progressPath.getTotalLength();
  progressPath.style.transition = progressPath.style.WebkitTransition = "none";
  progressPath.style.strokeDasharray =
    pathLength.value + " " + pathLength.value;
  progressPath.style.strokeDashoffset = pathLength.value;
  progressPath.getBoundingClientRect();
  progressPath.style.transition = progressPath.style.WebkitTransition =
    "stroke-dashoffset 10ms linear";
};

// 更新进度条的进度
const updateProgress = () => {
  let scroll = window.scrollY;
  let height = document.documentElement.scrollHeight - window.innerHeight;
  if (progressPathRef.value && progressPathRef.value.style !== null) {
    progressPathRef.value.style.strokeDashoffset =
      pathLength.value - (scroll * pathLength.value) / height;
  }
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);

  // 初始时更新进度条的进度
  initProgress();
  updateProgress();
  // 监听页面滚动事件，实时更新进度条的进度
  document.addEventListener("scroll", updateProgress);
});

onUnmounted(() => {
  // 切换页面需要取消监听，不然会监听销毁前的
  window.removeEventListener("scroll", handleScroll);
  document.removeEventListener("scroll", updateProgress);
});
</script>
<template>
  <section :style="{ opacity: showToTop ? 1 : 0 }">
    <div class="cursor" id="cursor"></div>
    <div class="cursor2" id="cursor2">
      <div class="go-top-progress-wrap">
        <!-- <i class="iconfont goTop fz24 svg-content">&#xe617;</i> -->
        <svg
          class="progress-circle svg-content"
          width="100%"
          height="100%"
          viewBox="-1 -1 102 102"
        >
          <path
            ref="progressPathRef"
            d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98"
          />
        </svg>
      </div>
    </div>
    <div class="cursor3" id="cursor3" @click="scrollToTop">
      <i class="iconfont icon fz20">&#xe617;</i>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.go-top-progress-wrap {
  height: 46px;
  width: 46px;
  cursor: pointer;
  display: block;
  border-radius: 50px;
  box-shadow: inset 0 0 0 2px rgba(0, 0, 0, 0.2);
  z-index: 10000;
  -webkit-transition: all 200ms linear;
  transition: all 200ms linear;
}

.go-top-progress-wrap svg path {
  fill: none;
}

.go-top-progress-wrap svg.progress-circle path {
  stroke: $primary;
  stroke-width: 4;
  box-sizing: border-box;
  -webkit-transition: all 200ms linear;
  transition: all 200ms linear;
}

.cursor,
.cursor2,
.cursor3 {
  position: fixed;
  border-radius: 50%;
  transform: translateX(-50%) translateY(-50%);
  bottom: 20px;
  right: 0px;
  -webkit-transition: all 300ms linear;
  transition: all 300ms linear;
  pointer-events: auto;
  cursor: pointer;
}

.cursor {
  z-index: 99999;
  height: 0;
  width: 0;
}

.cursor2,
.cursor3 {
  height: 46px;
  width: 46px;
  z-index: 99998;
  -webkit-transition: all 0.3s ease-out;
  transition: all 0.3s ease-out;
  line-height: 46px;
  text-align: center;
  font-size: 0.8rem;
}

.cursor3 {
  transition: all 0.4s linear;

  &:hover {
    color: $primary;
  }
}
.icon {
  color: $primary;
}
</style>
