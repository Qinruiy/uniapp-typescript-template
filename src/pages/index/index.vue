<template>
  <view class="content">
    <view v-for="post in postList" :key="post.id" class="card">
      <h4>{{ post.title }}</h4>
      <div class="description">
        {{ post.body }}
      </div>
    </view>
  </view>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import tool, { loading, confirm, logPerformance, debounce } from "@/utils/tool";
import { Post } from "@/apis/index";
import { PostType } from "@/apis/post";

@Component
export default class Index extends Vue {
  postList?: PostType[] = [];

  onLoad() {
    this.getPostList();
  }

  @debounce(1000)
  @loading("loading")
  @logPerformance("getPostList")
  async getPostList() {
    const data = await Post.getPostList();
    this.postList = data;
    tool.toast("loading completed", "success");
  }

  async getPost(id: string) {
    const data = await Post.getPost({
      params: {
        id: id,
      },
    });
  }
}
</script>

<style>
.content {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  background-color: #f6f6f6;
}
.card {
  width: 640upx;
  background-color: #fff;
  border-radius: 12upx;
  overflow: hidden;
  box-shadow: 0px 8upx 12upx rgba(0, 0, 0, 0.12);
  margin: 20upx;
  padding: 10upx;
}
h4 {
  margin: 0 0 1em;
  font-size: 1.5em;
  line-height: 1.5em;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.description {
  font-size: 1em;
  line-height: 1.4em;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
}
</style>