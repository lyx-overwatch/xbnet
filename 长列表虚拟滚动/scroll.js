// 节流函数
const throttle = (fn, wait) => {
  let timer = null;
  return function (...args) {
    if(!timer) {
      timer = setTimeout(() => {
        timer = null;
        fn.apply(this, args);
      }, wait);
    }
  }
}

// 设置100条数据
const data = Array.from({length: 100}).map((_, index) => index)

const inilSoroll = () => {
  const el = document.getElementById('container');
  const height = 400;
  const itemHeight = 40;
  // 设置容器高度
  el.setAttribute('style', `height: ${height}px`);

  // 列表展示10条数据， 渲染超过10条数据就可以触发滚动
  const size = 15;

  // 渲染数据
  const renderItems = (data) => {
    el.innerHTML = data.map(i => {
      return `<div class="item" style="top: ${i * itemHeight}px">${i + 1}</div>`
    }).join("")
  }
  let curRenderData = data.slice(0, size);
  renderItems(curRenderData);

  const handleScroll = throttle((e) => {
    const { target } = e;
    // 获取滚动距离
    const { scrollTop }  = target;
    // 获取当前显示的第一个元素索引
    const number = Math.floor(scrollTop / itemHeight);
    curRenderData = data.slice(number, number + size);
    renderItems(curRenderData);
    return () => el.removeEventListener('scroll', handleScroll, false);
  }, 20);

  el.addEventListener('scroll', handleScroll, false);
}

inilSoroll();

