export const loading = (title = "加载中...", errorFn: Function = () => {}) => {
  return (target: Object, name: string, descriptor: PropertyDescriptor) => {
    const originFn = descriptor.value;
    descriptor.value = async function(...rest: unknown[]) {
      uni.showLoading({
        title: title,
      });
      try {
        await originFn.call(this, ...rest);
        uni.hideLoading();
      } catch (error) {
        uni.showToast({
          title: error,
          icon: "none",
          duration: 2000,
        });
        errorFn.call(this, error);
      }
    };
  };
};

export const confirm = (
  title: string = "确定点击?",
  content: string = "提示"
) => {
  return (target: Object, name: string, descriptor: PropertyDescriptor) => {
    const originFn = descriptor.value;
    descriptor.value = function(...rest: unknown[]) {
      uni.showModal({
        title: title,
        content: content,
        success: (res) => {
          if (res.confirm) {
            originFn.call(this, ...rest);
          }
        },
      });
    };
  };
};

export const logPerformance = (funcName: string) => {
  return (target: Object, name: string, descriptor: PropertyDescriptor) => {
    const originFn = descriptor.value;
    descriptor.value = async function(...rest: unknown[]) {
      const startTime = new Date().getTime();
      await originFn.call(this, ...rest);
      const endTime = new Date().getTime();
      console.log(
        `%c ${funcName} %c time:${endTime - startTime}ms %c`,
        "background:#35495e ; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff",
        "background:#41b883 ; padding: 1px; border-radius: 0 3px 3px 0;  color: #fff",
        "background:transparent"
      );
    };
  };
};

export const debounce = (delay: number = 1000) => {
  return (target: Object, name: string, descriptor: PropertyDescriptor) => {
    const originFn = descriptor.value;
    let timer: number = 0;
    descriptor.value = function(...rest: unknown[]) {
      if (timer) {
        clearTimeout(timer);
        timer = 0;
      }
      timer = setTimeout(async () => {
        await originFn.call(this, ...rest);
      }, delay);
    };
  };
};

export const throttle = (delay: number = 1000) => {
  return (target: Object, name: string, descriptor: PropertyDescriptor) => {
    const originFn = descriptor.value;
    let timer: number = 0;
    descriptor.value = function(...rest: unknown[]) {
      timer = setTimeout(async () => {
        await originFn.call(this, ...rest);
      }, delay);
    };
  };
};

const tool = {
  toast(
    title: string,
    icon: UniApp.ShowToastOptions["icon"] = "none",
    duration: number = 1500,
    mask: boolean = true,
    position: UniApp.ShowToastOptions["position"] = "bottom"
  ) {
    return uni.showToast({
      title,
      icon,
      duration,
      position,
      mask,
    });
  },
};

export default tool;
