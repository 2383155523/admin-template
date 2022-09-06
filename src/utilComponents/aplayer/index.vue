<script lang="ts" setup>
import { shallowRef, onMounted, onUnmounted } from "vue"
import APlayer from "aplayer"
import "aplayer/dist/APlayer.min.css"
import { WangYiYunMusicListId } from "@/config/var"
let aplayerInstance = null
const aplayer = shallowRef()

function createAplayer(id: number | string) {
  const url = `https://api.i-meto.com/meting/api?server=netease&type=playlist&id=${id}&r=${Math.random()}`
  fetch(url)
    .then(res => res.json())
    .then(data => {
      const theme = getComputedStyle(document.documentElement).getPropertyValue("--themeColor")
      const songs = []
      data.forEach(song => {
        songs.push({
          name: song.title,
          artist: song.author,
          url: song.url,
          cover: song.pic,
          lrc: song.lrc,
        })
      })

      aplayerInstance = new APlayer({
        container: aplayer.value,
        theme: theme,
        loop: "loop",
        lrcType: 3,
        fixed: true,
        listFolded: true,
        audio: songs,
      })
      aplayerInstance.on("ended", () => {
        aplayerInstance.skipForward()
        aplayerInstance.play()
      })
    })
}
onMounted(() => {
  createAplayer(WangYiYunMusicListId)
})
onUnmounted(() => {
  aplayerInstance.destroy()
})
</script>

<template>
  <div class="aplayer" ref="aplayer"></div>
</template>

<style lang="scss" scoped>
.aplayer:deep(.aplayer-body) {
  font-family: "HarmonyOS_Sans_SC_Medium" !important;
  color: var(--themeColor) !important;
}

.aplayer:deep(.aplayer-body) .aplayer-pic {
  background-color: var(--themeColor) !important;
}
.aplayer:deep(.aplayer-list) ol::-webkit-scrollbar-thumb {
  border-radius: 3px;
  background-color: var(--themeColor) !important;
  background-image: -webkit-linear-gradient(
    45deg,
    hsla(0, 0%, 100%, 0.6) 25%,
    transparent 0,
    transparent 50%,
    hsla(0, 0%, 100%, 0.6) 0,
    hsla(0, 0%, 100%, 0.6) 75%,
    transparent 0,
    transparent
  );
}

.aplayer:deep(.aplayer-list) .aplayer-list-cur {
  background: var(--themeColor) !important;
}

.aplayer:deep(.aplayer-bar) .aplayer-played,
.aplayer:deep(.aplayer-bar) .aplayer-thumb {
  background: var(--themeColor) !important;
}
.aplayer:deep(.aplayer-lrc-current) {
  font-size: 16px !important;
}
.aplayer:deep(.aplayer-lrc) {
  text-shadow: none;
}

.aplayer:deep(.aplayer-lrc-contents) p {
  color: var(--themeColor);
  font-size: 14px;
  font-family: "HarmonyOS_Sans_SC_Medium" !important;
}
</style>
