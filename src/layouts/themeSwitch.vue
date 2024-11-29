<script lang="ts" setup>
import { useAdminSettingStore } from '@/stores/admin/setting'
const AdminSettingStore = useAdminSettingStore()
const html: HTMLHtmlElement = document.querySelector('html')

function changeTheme() {
  if (html.className == 'light') {
    AdminSettingStore.setTheme('dark')
  } else {
    AdminSettingStore.setTheme('light')
  }
}
</script>

<template>
  <div class="container">
    <label for="switch">
      <input type="checkbox" id="switch" @change="changeTheme" />
      <div class="toggle-wrapper">
        <div class="day-night"></div>
        <div class="tree-left">
          <div class="tree"></div>
          <div class="trunk">
            <div class="branch"></div>
            <div class="branch"></div>
          </div>
        </div>
        <div class="tree-right">
          <div class="tree-back">
            <div class="trunk"></div>
          </div>
          <div class="tree-front">
            <div class="trunk"></div>
          </div>
        </div>
        <div class="moon"></div>
        <div class="stars">
          <div class="star big-star">
            <div class="vertical"></div>
            <div class="horizontal"></div>
          </div>
          <div class="star small-star">
            <div class="vertical"></div>
            <div class="horizontal"></div>
          </div>
        </div>
        <div class="sun"></div>
        <div class="hills">
          <div class="hill-left"></div>
          <div class="hill-right"></div>
        </div>
      </div>
    </label>
  </div>
</template>

<style scoped>
.container {
  zoom: 0.15;
}
input {
  display: none;
}

.toggle-wrapper {
  position: relative;
  cursor: pointer;
  border-radius: 120px;
  width: 550px;
  height: 200px;
  background: #fff;
  overflow: hidden;
  background: var(--sky-bg-night);
}

html.dark .toggle-wrapper:before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, #e75f7a 0%, #ffb168 83%);
  opacity: 1;
  transition: 1s;
  border-radius: 120px;
  overflow: hidden;
}

input#switch:checked + *:before {
  opacity: 1;
}

.hills {
  position: relative;
  display: flex;
  width: 720px;
  bottom: -150px;
  left: -40px;
}

.hill-left {
  position: relative;
  z-index: 2;
  width: 380px;
  height: 120px;
  border-radius: 100%;
  background: var(--hill-left);
  top: -6px;
  left: -10px;
  transform: rotate(8deg);
}

.hill-right {
  position: relative;
  z-index: 1;
  width: 340px;
  height: 150px;
  border-radius: 100%;
  background: var(--hill-right);
  left: -80px;
}

.tree-left {
  position: absolute;
  z-index: 5;
  left: 100px;
  bottom: -40px;
  bottom: -40px;
}

.tree-left .trunk {
  z-index: 3;
  height: 200px;
  width: 16px;
  background: var(--tree-trunk);
  border-radius: 100% 100% 0 0;
}

.branch {
  background: var(--tree-trunk);
  position: relative;
}

.branch:nth-child(1) {
  width: 10px;
  height: 70px;
  top: 46px;
  left: -10px;
  border-radius: 100%;
  transform: rotate(-22deg);
}

.branch:nth-child(1):before {
  content: '';
  position: absolute;
  width: 10px;
  height: 44px;
  left: -21px;
  top: 26px;
  border: 10px solid var(--tree-trunk);
  border-color: transparent var(--tree-trunk) transparent transparent;
  border-radius: 60%;
  transform: rotate(10deg);
}

.branch:nth-child(2) {
  width: 10px;
  height: 60px;
  top: -46px;
  left: 16px;
  border-radius: 100%;
  transform: rotate(22deg);
}

.branch:nth-child(2):after {
  content: '';
  position: absolute;
  width: 10px;
  height: 56px;
  left: 2px;
  top: 20px;
  border: 10px solid var(--tree-trunk);
  border-color: transparent transparent transparent var(--tree-trunk);
  border-radius: 60%;
  transform: rotate(-11deg);
}

.tree-left .tree {
  position: absolute;
  left: -50px;
  top: -10px;
  width: 120px;
  height: 120px;
  z-index: -1;
  background: var(--tree);
  border-radius: 63% 37% 31% 69% / 60% 74% 26% 40%;
  transform: rotate(40deg);
}

.tree-left .tree:before {
  content: '';
  position: absolute;
  left: -50px;
  top: -50px;
  width: 120px;
  height: 120px;
  z-index: -1;
  background: var(--tree);
  border-radius: 63% 37% 31% 69% / 60% 74% 26% 40%;
}

.tree-right {
  position: relative;
  left: 370px;
  top: 40px;
}

.tree-back {
  position: absolute;
  z-index: 2;
  width: 36px;
  height: 80px;
  border-radius: 80%;
  background: var(--tree);
  top: 30px;
  border-bottom: 100px;
  border-color: var(--tree);
}

.tree-back .trunk {
  position: absolute;
  top: 78px;
  background: var(--tree);
  width: 10px;
  height: 23px;
  left: 14px;
}

.tree-front {
  position: absolute;
  z-index: 3;
  width: 54px;
  height: 120px;
  border-radius: 80%;
  background: var(--tree);
  top: -6px;
  left: 70px;
  border-bottom: 100px;
  border-color: var(--tree);
}

.tree-front .trunk {
  position: absolute;
  z-index: 2;
  top: 120px;
  background: var(--tree-trunk);
  width: 12px;
  height: 28px;
  left: 21px;
  border-radius: 4px;
}

.tree-front .trunk:before {
  content: '';
  position: absolute;
  width: 12px;
  height: 30px;
  background: var(--tree-trunk);
  left: -2px;
  top: -2px;
  border-radius: 4px;
  transform: rotate(2deg);
  transform: skewx(-10deg);
}

.tree-front .trunk:after {
  content: '';
  position: absolute;
  top: 23px;
  left: -4px;
  width: 14px;
  height: 6px;
  background: var(--tree-trunk);
  border-radius: 100%;
}

.moon {
  position: absolute;
  background-color: transparent;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  box-shadow: inset -25px -17px 0 3px #fff;
  left: 190px;
  transform: translateY(40px);
  transition: all 0.6s ease-out 0.3s;
  transition-duration: 0.8s;
}

html.dark .moon {
  transform: translateY(160px);
  transition: all 0.5s ease-out 0.3s;
  transition-duration: 0.8s;
}

.stars {
  position: absolute;
  right: 124px;
  transform: translateY(50px);
  transition: all 0.6s ease-in 0.3s;
}
html.dark .stars {
  transform: translateY(-80px);
  transition: all 0.6s ease-in 0.3s;
}

.star {
  position: relative;
  background: #fff;
}

.big-star .vertical {
  width: 12px;
  height: 12px;
}

.big-star .vertical:before {
  content: '';
  position: absolute;
  top: -12px;
  width: 0;
  height: 0;
  border-right: 6px solid transparent;
  border-left: 6px solid transparent;
  border-bottom: 12px solid #fff;
}

.big-star .vertical:after {
  content: '';
  position: absolute;
  top: 12px;
  border-right: 6px solid transparent;
  border-left: 6px solid transparent;
  border-top: 12px solid #fff;
}

.big-star .horizontal {
  position: relative;
  transform: rotate(90deg);
  left: 6px;
  top: -6px;
}

.big-star .horizontal:before {
  content: '';
  position: absolute;
  top: -12px;
  width: 0;
  height: 0;
  border-right: 6px solid transparent;
  border-left: 6px solid transparent;
  border-bottom: 12px solid #fff;
}

.big-star .horizontal:after {
  content: '';
  position: absolute;
  top: 12px;
  border-right: 6px solid transparent;
  border-left: 6px solid transparent;
  border-top: 12px solid #fff;
}

.small-star {
  top: -36px;
  left: 24px;
  width: 8px;
  height: 8px;
}

.small-star .vertical:before {
  content: '';
  position: absolute;
  top: -8px;
  width: 0;
  height: 0;
  border-right: 4px solid transparent;
  border-left: 4px solid transparent;
  border-bottom: 8px solid #fff;
}

.small-star .vertical:after {
  content: '';
  position: absolute;
  top: 8px;
  border-right: 4px solid transparent;
  border-left: 4px solid transparent;
  border-top: 8px solid #fff;
}

.small-star .horizontal {
  position: relative;
  transform: rotate(90deg);
  top: 4px;
  left: 4px;
}

.small-star .horizontal:before {
  content: '';
  position: absolute;
  top: -8px;
  width: 0;
  height: 0;
  border-right: 4px solid transparent;
  border-left: 4px solid transparent;
  border-bottom: 8px solid #fff;
}

.small-star .horizontal:after {
  content: '';
  position: absolute;
  top: 8px;
  border-right: 4px solid transparent;
  border-left: 4px solid transparent;
  border-top: 8px solid #fff;
}

html.dark .sun {
  position: absolute;
  z-index: 0;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background: var(--sun);
  left: 240px;
  top: 160px;
  box-shadow: 8px 8px 54px 12px rgba(255, 214, 150, 0.97);
  transition: all 0.8s ease-in 0.3s;
  transform: translateY(20px);
}

html.dark .sun {
  transition: all 0.8s ease-out 0.3s;
  transform: translateY(-40px);
}

.day-night {
  position: absolute;
  z-index: 6;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: var(--day-night);
  overflow: hidden;
  transition: all 0.8s ease-in;
  transform: translateX(0);
  backdrop-filter: blur(6px);
}

html.dark .day-night {
  transform: translateX(350px);
}

@media screen and (max-width: 550px) {
  .toggle-wrapper {
    transform: scale(0.5);
  }
}
</style>
