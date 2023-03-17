<template>
  <ConfigProvider :locale="getAntdLocale">
    <AppProvider>
      <RouterView />
    </AppProvider>
  </ConfigProvider>
</template>

<script lang="ts" setup>
  import { onMounted } from 'vue';
  import { io } from 'socket.io-client';
  import { ConfigProvider } from 'ant-design-vue';
  import { AppProvider } from '/@/components/Application';
  import { useTitle } from '/@/hooks/web/useTitle';
  import { useLocale } from '/@/locales/useLocale';
  import 'dayjs/locale/zh-cn';
  // support Multi-language
  const { getAntdLocale } = useLocale();

  // Listening to page changes and dynamically changing site titles
  useTitle();
  onMounted(() => {
    connectSocket();
  });

  // 初始化连接
  function connectSocket() {
    const socket = io('/io');
    socket.on('connection', () => {
      console.log('连接成功');
    });

    socket.on('OnMessage', (info) => {
      // OnMessage这个名字是和后端协商好的名字，自由定义
      console.log('接收到消息：', info);
    });
  }

  // 发送消息
  // function sendMsg() {
  //   if (socket && socket.connected) {
  //     socket.emit('SendMessage', {
  //       // 这个名字一样是由前后端自定义的
  //       from: socket.id,
  //       type: 2,
  //       msg: 123,
  //     });
  //   }
  // }
</script>
