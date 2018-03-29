
#### Vue-WeChat

使用Vue+Express模仿微信实现简易版Web即时聊天App

##### 环境及工具
OS: Windows 10
Browser: Chrome
前端:Vue全家桶
后端:Express+Mysql+Redis
WebSocket: socket.io

##### 设计思路

socket.io
socket.io分装了HTML5的WebSocket协议，同时提供了轮询与长轮询的方式做兼容
使用socket.io做实时的消息推送，socket通信中，订阅了两种事件"send"和"receive"，当用户发送一个数据的时候, 触发send事件，后端监听到数据之后通过触发接受方的receive事件将消息推送给接收方。

redis
考虑到Web应用需要通过cookie和session跟踪用户判断用户登陆状态，而websocket通信中也同样需要保证用户处于登陆状态，通过redis存储用户session，当在websocket通信过程中，通过cookie的sessionid作为键值在redis中查找session状态。
在处理用户消息时也使用redis作为存储方式，为了实现微信消息页的近期消息和未读消息，将用户的近期消息存储在redis中，当用户登录后将这些消息记录推送给用户，同时也记录消息的已读或者是未读的状态，当前端判断消息已读之后，发送confirm消息给服务端，更新消息的状态。

mysql
使用mysql作为数据的持久化存储方式

