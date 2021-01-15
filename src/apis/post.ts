import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from "axios";
import { DELETE, GET, POST, PUT } from "@/apis/http";

type PostType = {
  userId?: number;
  id: number;
  title?: string;
  body?: string;
};

export default class Post {
  @GET("/posts")
  static getPostList(): PostType[] {
    return [];
  }

  /**
   * getPostById
   * @param { String } id - PostId(*)
   */
  @GET("/posts")
  static getPost(config: AxiosRequestConfig): PostType {
    return {
      id: 0,
    };
  }
}

export { PostType };
