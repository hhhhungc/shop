<template>
  <div>
    <div class="header">
      <div class="header_bn">
        <div class="mask"></div>
        <div class="header_text">BUY<br />SOMETHING</div>
      </div>
    </div>
    <div class="wrap">
      <h2>最新消息</h2>
      <div class="wrapper">
        <div class="box" v-for="item in news" :key="item.title">
          <div class="imageBox">
            <img :src="item.imageUrl" />
          </div>
          <div class="content">
            <h3>{{ item.title }}</h3>
          </div>
        </div>
      </div>
    </div>
    <h2>近期活动</h2>
    <el-carousel indicator-position="outside">
      <el-carousel-item v-for="item in campaign" :key="item.title">
        <h3>{{ item.title }}</h3>
      </el-carousel-item>
    </el-carousel>
    <h2>三大特色</h2>
    <el-row :gutter="20" style="margin: 40px 0" type="flex" justify="center">
      <el-col :span="6">
        <span class="iconfont icon-truck"></span>
        <h4>免运费</h4>
        <p>全站购物满 $3,000 元，境内免收运费。</p>
      </el-col>
      <el-col :span="6">
        <span class="iconfont icon-money_refund_fill"></span>
        <h4>100% 退换货</h4>
        <p>商品全新、无拆封，可享受「7天无理由退换货」服务！</p>
      </el-col>
      <el-col :span="6">
        <span class="iconfont icon-chalkboard-teacher"></span>
        <h4>24 小时客服</h4>
        <p>24 小时客服在线，有问题随时发问，即时回覆。</p>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  data() {
    return {
      news: [
        {
          title: 'JUST DO IT',
          imageUrl:
            'https://dogefs.s3.ladydaily.com/~/source/unsplash/photo-1615290642882-6b9501729a27?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjV8fG5pa2V8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=80'
        },
        {
          title: 'Adidas',
          imageUrl:
            'https://dogefs.s3.ladydaily.com/~/source/unsplash/photo-1518002171953-a080ee817e1f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80'
        },
        {
          title: 'Converse',
          imageUrl:
            'https://dogefs.s3.ladydaily.com/~/source/unsplash/photo-1622253543934-c3cb280f8323?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80'
        }
      ],
      campaign: [
        {
          title: 'Vans',
          imageUrl:
            'https://dogefs.s3.ladydaily.com/~/source/unsplash/photo-1531185038189-41815d864f32?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1325&q=80'
        },
        {
          title: 'PUMA',
          imageUrl:
            'https://dogefs.s3.ladydaily.com/~/source/unsplash/photo-1633523154731-d131470565d7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8cHVtYXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=80'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  height: 600px;
  position: relative;
}
.header_bn {
  width: 100%;
  height: 600px;
  background: url('https://images.unsplash.com/photo-1590764257694-8b1b85d60e89?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80')
    center center;
  background-size: cover;
  background-attachment: fixed;
}
.header_text {
  font-size: 60px;
  font-weight: 900;
  letter-spacing: 3px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}
.header_text::before {
  content: '';
  position: absolute;
  bottom: -20px;
  left: 50%;
  transform: translateX(-50%);
  height: 10px;
  width: 80px;
  background: #000;
}
.mask {
  height: 100%;
  width: 100%;
  background: rgba(255, 255, 255, 0.4);
  position: absolute;
  top: 0;
}
h2 {
  text-align: center;
  padding: 40px 0;
}
.wrap {
  max-width: 1200px;
  margin: 0 auto;
}
.wrapper {
  display: flex;
  justify-content: center;
}
.wrapper .box {
  position: relative;
  width: 500px;
  height: 400px;
  overflow: hidden;
  transition: 0.5s;
}
.wrapper .box:hover {
  z-index: 1;
  transform: scale(1.25);
  box-shadow: 0 25px 40px rgba(0, 0, 0, 0.5);
}
.wrapper .box .imageBox {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.wrapper .box .imageBox:before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  background: linear-gradient(180deg, #333, #fff);
  mix-blend-mode: multiply;
  opacity: 0;
  transition: 0.5s;
}
.wrapper .box:hover .imageBox:before {
  opacity: 1;
}
.wrapper .box .imageBox img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.wrapper .box .content {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  display: flex;
  padding: 20px;
  align-items: flex-end;
}
.wrapper .box .content h3 {
  color: #fff;
  transition: 0.5s;
  text-transform: uppercase;
  font-size: 40px;
  transform: translateY(100px);
}
.wrapper .box:hover .content h3 {
  transform: translateY(-20px);
  transition-delay: 0.5s;
}
.el-carousel__item h3 {
  color: #fff;
  font-size: 30px;
  opacity: 0.75;
  line-height: 500px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n + 1) {
  background: url('https://dogefs.s3.ladydaily.com/~/source/unsplash/photo-1531185038189-41815d864f32?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1325&q=80');
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
}
.el-carousel__item:nth-child(2n) {
  background: url('https://dogefs.s3.ladydaily.com/~/source/unsplash/photo-1633523154731-d131470565d7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8cHVtYXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=80');
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
}

.el-col {
  text-align: center;
  p {
    font-size: 14px;
  }
}
.iconfont {
  font-size: 60px;
  color: #409eff;
}
</style>
