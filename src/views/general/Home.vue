<template>
  <div class="container">
    <!-- 顶部导航栏、搜索框 -->
    <GeneralTopBar />
    <main class="margin-20per">
      <!-- 搜索框 -->
      <div class="search-form margin-10per">
        <el-input placeholder="搜索职位、公司" v-model="searchKey" class="search-input">
          <el-button slot="append" type="primary" icon="el-icon-search"></el-button>
        </el-input>
        <div class="search-hot">
          <b>热搜职位：</b>
          <el-link v-for="(hot,index) in hotWords" :key="hot + index">
            {{ hot }}
          </el-link>
        </div>
      </div>
      <!-- 首页职位侧栏 及 轮播栏 -->
      <div class="home-box">
        <div class="home-sider" ref="homeSider">
          <JobMenu :jobMenu="jobMenu" />
          <div class="show-more" ref="showMore">显示更多职位</div>
          <div class="more-job-menu" ref="moreJobMenu" style="display: none">
            <JobMenu :jobMenu="moreJobMenu" />
          </div>
        </div>
        <div class="home-banner">
          <el-carousel :interval="3000" arrow="never">
            <el-carousel-item v-for="banner in bannerImg" :key="banner.url">
              <el-link :href="banner.href">
                <img :src="banner.url" style="width: 100%; height: 100%;" />
              </el-link>
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
      <!-- 热门职位 -->
      <div class="common-tab-box hot-city-job">
        <h2 class="box-title">热门职位</h2>
        <el-link class="job-link">更多热门职位</el-link>
        <ul>
          <li v-for="(job,index) in hotJob" :key="job.name + index">
            <div class="sub-li">
              <el-link class="job-link">
                <span>{{ job.name }}</span>
                <span><i class="el-icon-chat-dot-round"></i></span>
                <span>{{ job.salary }}</span>
              </el-link>
              <div class="job-premise">
                <span>{{ job.experience }}</span>
                <el-divider direction="vertical"></el-divider>
                <span>{{ job.qualification }}</span>
              </div>
              <div class="job-tag">
                <div v-for="item in job.tag" :key="item">{{ item }}</div>
              </div>
              <div class="company">
                <el-link><img :src="job.companyIcon" alt="job.companyName" style="width: 40px; height: 40px; object-fit: cover"></el-link>
                <div class="company-box">
                  <div>{{ job.companyName }}</div>
                  <div>{{ job.companyTag }}</div>
                  <el-divider direction="vertical"></el-divider>
                  <div>{{ job.companySize }}</div>
                  <el-divider direction="vertical"></el-divider>
                  <div>{{ job.address }}</div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <!-- 热门企业 -->
      <div class="common-tab-box hot-company">
        <h2 class="box-title">热门企业</h2>
        <ul>
          <li v-for="(company,index) in hotCompany" :key="company.name + index">
            <div class="sub-li">
              <div class="company-introduction">
                <p><el-link><img :src="company.icon" :alt="company.name" style="width: 80px; height: 80px; object-fit: cover"></el-link></p>
                <h3>{{ company.name }}</h3>
                <h4>
                  {{ company.tag }}
                  <el-divider direction="vertical"></el-divider>
                  {{ company.size }}
                </h4>
                <h4 :title="company.description">{{ company.description }}</h4>
              </div>
              <div class="company-recruit">
                <el-link class="job-link">
                  <p>{{ company.userComment }}</p>
                  <p>面试评价</p>
                </el-link>
                <el-link class="job-link">
                  <p>{{ company.recruit }}</p>
                  <p>在招职位</p>
                </el-link>
                <el-link class="job-link">
                  <p>{{ company.activity }}%</p>
                  <p>面试处理率</p>
                </el-link>
              </div>
            </div>
          </li>
        </ul>
        <el-link class="show-more">查看更多</el-link>
      </div>
    </main>
    <GeneralFooter />
  </div>
</template>

<script src="./Home.js" />

<style src="./Home.css" scoped>
</style>