# 长列表虚拟滚动实现思路

1. 列表容器设置相对定位，滚动元素设置绝对定位；
2. 通过监听容器的滚动事件，获取滚动的距离来计算当前应该展示哪些元素；
3. 通过函数节流减少滚动触发的频率。
