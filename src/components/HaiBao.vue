<!--
 * @Author: Harry
 * @Date: 2022-03-28 13:57:14
 * @LastEditors: harry
 * @Github: https://github.com/rr210
 * @LastEditTime: 2022-03-29 12:49:19
 * @FilePath: \vant-u\src\components\HaiBao.vue
-->
<template>
  <div class="hai-bao" id="capture">
    <div v-show="imageUrl" class="hb-result">
      <img :src="imageUrl" alt="" srcset="" />
      <div class="candleHb" @click="imageUrl = ''">取消海报</div>
    </div>
    <div class="top-hb">
      <div class="hb-user">
        <img class="hb-i-1" :src="userpic" alt="" />
        <span>{{ username }}</span>
      </div>
      <div class="change-con" @click="changeHb">
        <div>
          <svg
            t="1648453154988"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="11379"
          >
            <path
              d="M167.885804 438.964706c1.776941 0.913569 3.543843 0.913569 5.320784 0.913569a21.624471 21.624471 0 0 0 21.132549-17.016471c39.705098-150.387451 174.712471-256.110431 328.292392-256.110431 115.58149 0 219.678118 58.217412 281.429334 151.391372l-59.14102 29.56549L889.574902 447.046275l12.408471-177.272471-58.217412 28.651921c-69.923137-109.798902-191.036235-176.328784-321.214745-176.419137-173.788863 0-326.455216 119.125333-371.410824 289.300079-1.766902 12.488784 5.260549 25.037804 16.745412 27.658039zM881.714196 568.872157c-11.976784-2.359216-23.672471 5.150118-26.523608 17.01647-33.460706 157.625725-172.865255 271.36-332.559059 271.36-130.610196-0.170667-249.464471-75.474824-305.40298-193.505882l61.69098-30.489098-144.50447-99.267765-12.408471 177.272471 55.587137-27.798588c63.528157 131.674353 195.84502 218.533647 344.96753 218.533647 180.033255 0 337.096784-128.983843 375.03498-307.169883 1.696627-5.561725 0.923608-11.585255-2.108235-16.544627a20.369569 20.369569 0 0 0-13.773804-9.406745z"
              p-id="11380"
              fill="#fff"
            ></path>
          </svg>
        </div>
        <div>换一张</div>
      </div>
      <img class="hb-bg" :src="hbbg" alt="" srcset="" />
    </div>
    <div class="card-hb">
      <div class="card-hb-1">
        <div class="time-hb">{{ timeM }} | {{ timeW }}</div>
        <div class="title-hb">害虫“{{ pestname }}”防治措施有哪些？</div>
        <div class="hb-con">{{ substring(preconmea) }}</div>
        <div class="hb-ewm" @click="cutDo">
          <img src="css/img/main/gzh.png" alt="" srcset="" />
          <div>点击二维码生成海报</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, reactive, toRefs } from '@vue/reactivity'
import { doCut } from '@/utils/tool/html2cancas-c.js'
export default {
  name: 'HaiBao',
  props: {
    userpic: {
      type: String,
      required: true,
      default: 'css/img/main/gravatar.png'
    },
    hbbg: {
      type: String,
      required: true,
      default: 'css/img/main/gravatar.png'
    },
    username: {
      type: String,
      required: true,
      default: '无'
    },
    pestname: {
      type: String,
      required: true
    },
    preconmea: {
      type: String,
      required: true
    }
  },
  emits: ['changeH'],
  setup(props, context) {
    const myDate = new Date()
    // 处理星期
    const formatWeek = function (num) {
      const l = ['日', '一', '二', '三', '四', '五', '六']
      return '星期' + l[num]
    }
    const state = reactive({
      timeM: `${myDate.getMonth() + 1}月${myDate.getDate()}日`,
      timeW: `${formatWeek(myDate.getDay())}`,
      imageUrl: ''
    })
    // 截取字符串
    const substring = computed(() => {
      return function (temp) {
        console.log(temp)
        return temp.slice(0, 130) + '.....'
      }
    })
    // 换一张
    const changeHb = function () {
      context.emit('changeH')
    }
    // 截图功能
    const cutDo = function () {
      const shareDom = document.querySelector('#capture')
      doCut(shareDom, state)
    }
    return {
      substring,
      changeHb,
      cutDo,
      ...toRefs(state)
    }
  }
}
</script>

<style lang="less" scoped>
.hai-bao {
  position: relative;
  height: 80vh;
  width: 80vw;
  overflow: hidden;
  background-color: rgb(244, 244, 244);
  font-size: 15px;
}
.top-hb {
  position: relative;
  width: 100%;
  height: 210px;
}
.hb-bg {
  width: 100%;
  height: 100%;
}
.hb-user {
  position: absolute;
  top: 10px;
  left: 10px;
  img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    vertical-align: middle;
    margin-right: 6px;
  }
  span {
    font-weight: 500;
    color: #fff;
  }
}
.change-con {
  position: absolute;
  top: 10px;
  right: 13px;
  font-size: 14px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #fff;
  svg {
    width: 25px;
  }
}

.card-hb {
  position: absolute;
  width: 100%;
  height: 80%;
  top: 100px;
  right: 0;
  padding: 20px 13px;
  .card-hb-1 {
    position: relative;
    padding: 50px 20px 10px 20px;
    width: 73vw;
    background-color: rgb(255, 255, 255);
    border-top-right-radius: 80px;
    border-top-left-radius: 30px;
    height: 100%;
    border: 1px dashed #999;
  }
}

.time-hb {
  color: #888;
}
.title-hb {
  font-weight: 550;
  color: #000;
  font-size: 16px;
  padding: 15px 0;
}
.hb-con {
  font-size: 14px;
  color: #888;
}
.hb-ewm {
  position: absolute;
  right: 20px;
  bottom: 5px;
  padding-top: 10px;
  font-size: 10px;
  color: #ccc;
  img {
    width: 80px;
    height: 80px;
    border-radius: 4px;
    vertical-align: bottom;
  }
}
.hb-result {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 99;
  img {
    width: 100%;
    height: 100%;
  }
  .candleHb {
    position: absolute;
    bottom: 0px;
    left: 0px;
    background-color: rgba(118, 121, 120, 0.589);
    width: 100%;
    height: 50px;
    line-height: 50px;
    text-align: center;
    color: #fff;
    font-weight: 550;
  }
}
</style>
