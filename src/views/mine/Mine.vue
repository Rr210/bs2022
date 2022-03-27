<!--
 * @Description:
 * @Author: Harry
 * @Date: 2021-12-26 19:59:49
 * @Url: https://u.mr90.top
 * @github: https://github.com/rr210
 * @LastEditTime: 2022-03-27 16:47:14
 * @LastEditors: harry
-->
<template>
  <div class="main_w">
    <div class="hd_w">
      <div class="img_w">
        <div class="img_w_1">
          <img
            :src="
              !isloginstate
                ? 'css/img/main/gravatar.png'
                : hasUserInfo.headimgurl
            "
          />
        </div>
        <div class="Nickname">
          <div>
            {{ isloginstate && hasUserInfo.nickname }}
          </div>
          <div class="title_w_1">海纳百川,厚积薄发</div>
        </div>
        <div class="btn_u" @click="isHasUserinfo = !isHasUserinfo">
          <van-button type="primary" style="height: 40px">
            {{ !isloginstate ? "未登录" : "更新" }}
          </van-button>
        </div>
      </div>
    </div>
    <!-- 中部设计开始 -->
    <div class="mid_w_share">
      <div class="mid_item">
        <img src="css/img/main/ewm.png" />
        <div class="text_">分享海报</div>
      </div>
      <div class="mid_item">
        <img class="" src="css/img/main/kf.png" />
        <div class="text_">联系我</div>
        <button class="contact" open-type="contact"></button>
      </div>
    </div>
    <!-- 底部设计开始 -->
    <div class="function_w">
      <div class="item_f">
        <div class="icon_i">
          <img src="css/img/main/sc.png" />
        </div>
        <div class="title_w">历史识别</div>
      </div>
      <div class="item_f">
        <div class="icon_i">
          <img src="css/img/main/fk.png" />
        </div>
        <div class="title_w">问题反馈</div>
      </div>
      <div class="item_f">
        <div class="icon_i">
          <img src="css/img/main/ab.png" />
        </div>
        <div class="title_w">关于程序</div>
      </div>
      <div class="item_f" bindtap="closeF">
        <div class="icon_i">
          <img src="css/img/main/gb.png" />
        </div>
        <div class="title_w" @click="layout">退出登录</div>
      </div>
    </div>
  </div>

  <div v-if="isHasUserinfo">
    <!-- 遮罩层 -->
    <div class="mask_w" @click="isHasUserinfo = !isHasUserinfo"></div>
    <div class="login_w">
      <div class="login-fr">
        <img class="login-img" src="css/img/main/login.png" />
      </div>
      <div class="login-h">欢迎登入该程序</div>
      <div class="login-h-t">
        如果无法登录，请点击我的界面“清除缓存”后再登录
      </div>
      <div class="login-bt" @click="signin">确定</div>
      <div class="login-bt2" @click="isHasUserinfo = !isHasUserinfo">取消</div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
export default {
  setup() {
    const router = useRouter()
    const Store = useStore()
    const signin = function () {
      localStorage.clear()
      router.replace('/login')
    }
    // 退出登录
    const layout = function () {
      Store.dispatch('login/layoutPage')
      console.log('已退出')
    }
    // 判断登录的情况
    const isLogined = function (userinfo) {
      Store.dispatch('login/saveLoginState', { userinfo })
    }
    const isloginstate = computed(() => {
      return Store.state.login.isLogin
    })
    const hasUser = reactive({
      hasUserInfo: {},
      isHasUserinfo: false
    })
    // 遮罩层关闭
    onMounted(() => {
      const stateUserinfo = localStorage.getItem('userinfo')
      if (stateUserinfo && JSON.parse(stateUserinfo).openid) {
        isLogined(JSON.parse(stateUserinfo))
        hasUser.hasUserInfo = JSON.parse(stateUserinfo)
        hasUser.isHasUserinfo = false
      }
    })
    return {
      signin,
      isloginstate,
      layout,
      ...toRefs(hasUser)
    }
  }
}
</script>

<style lang="less" scoped>
.login-fr {
  height: 140px;
  width: 140px;
  overflow: hidden;
  margin: 20px auto;
}

.login-img {
  width: 100%;
  height: 100%;
}

.login-h {
  text-align: center;
  margin: 10px 0px;
  font-size: 20px;
  font-weight: bold;
}

.login-bt {
  background-color: var(--LightThemeColor);
  border-radius: 50px;
  width: 60%;
  height: 40px;
  margin: 0 auto;
  color: #fff;
  font-size: 17px;
  margin-top: 40px;
  text-align: center;
  line-height: 40px;
}

.login-bt2 {
  // background-color: ;
  color: rgb(201, 197, 197);
  font-size: 15px;
  margin: 12px auto;
  text-align: center;
}

button {
  &::after {
    border: 1px solid rgba(0, 0, 0, 0);
  }
}

.login-h-t {
  text-align: center;
  color: rgb(65, 62, 62);
  font-size: 12px;
  margin: 10px 0px;
  width: 80%;
  margin-left: 10%;
}

.login-inner {
  .username {
    color: #118fff;
    font-size: 16px;
    font-weight: 500;
    display: flex;
    align-items: center;
  }
}

.login-inner {
  .username {
    text {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 16px;
    }
  }
}

.login_w {
  width: 300px;
  position: absolute;
  top: calc(50% - 200px);
  left: calc(50% - 150px);
  background-color: var(--pageBg);
  box-shadow: 0 0 5px #ccc;
  border-radius: 10px;
  height: 400px;
  z-index: 1;
}

// 遮罩层的设计
.mask_w {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  background-color: var(--van-overlay-background-color);
}

// 整个页面的设计
.main_w {
  background-color: var(--mainbg);
  height: 100%;
  padding-bottom: 55px;
  width: 100%;

}

// 头像设计开始
.hd_w {
  position: relative;
  width: 80%;
  margin: 0 auto;
  height: 180px;
  background-color: var(--pageBg);
  background: url(/css/img/main/beijings.png)
    no-repeat;
  background-size: 100% 100%;
}

.img_w {
  position: absolute;
  bottom: 0;
  left: calc(50% - 175px);
  width: 350px;
  height: 100px;
  padding: 10px;
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  background-color: var(--mainCardBg);
  border-radius: 10px;

  .img_w_1 {
    flex: 2;

    img {
      border-radius: 50%;
      width: 75%;
    }
  }

  .Nickname {
    flex: 3;
    // display: flex;
    // justify-content: center;
    // align-items: center;
    font-size: 20px;
    font-weight: 500;
    font-family: cursive;

    .title_w_1 {
      padding: 5px 0;
      font-size: 12.5px;
      color: #888;
      font-weight: unset;
    }
  }
  // 更新按钮设计
  .btn_u {
    flex: 2;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

// 头像设计结束
// 分享和联系
.mid_w_share {
  margin: 15px auto;
  width: 350px;
  height: 80px;
  background-color: var(--pageBg);
  color: rgb(148, 148, 148);
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  padding: 0 50px;

  .mid_item {
    width: 75px;
    height: 80px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img {
      width: 55%;
    }

    .text_ {
      padding: 5px 0;
      font-size: 12.5px;
      font-weight: 500;
    }
  }
}

// 底部设计开始
.function_w {
  width: 350px;
  height: 270px;
  margin: 7.5px auto;
  background-color: var(--pageBg);
  border-radius: 5px;
  padding: 5px;
  .item_f {
    position: relative;
    &::after {
      position: absolute;
      content: "";
      top: calc(50% - 4.5px);
      right: 15px;
      height: 4.5px;
      width: 4.5px;
      border-top: 1px solid #ccc;
      border-right: 1px solid #ccc;
      transform: rotateZ(45deg);
    }
    display: flex;
    .icon_i {
      flex: 1;
      height: 66px;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 50%;
      }
    }
    .title_w {
      flex: 5;
      font-size: 15px;
      line-height: 66px;
    }
  }
}

// 意见反馈按钮
.item_f {
  position: relative;
  .feed {
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0;
    z-index: 1;
  }
}

// 联系我按钮
.mid_item {
  position: relative;
  .contact {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    z-index: 1;
  }
}
</style>
