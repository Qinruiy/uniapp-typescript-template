# uniapp-typescript-template

## feature

- √ Axios adapter for uniApp
- √ typescript-decorator

### Example

```typescript
@debounce(1000)
@loading("loading")
@logPerformance("getPostList")
async getPostList() {
  const data = await Post.getPostList();
  this.postList = data;
  tool.toast("loading completed", "success");
}
```

## Project setup

```
yarn install
```

### Compiles and hot-reloads for development

```
yarn serve
```

### Compiles and minifies for production

```
yarn build
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
