

// sw.js
self.addEventListener('push', function(event) {
  console.log('收到推送事件');
  
  const options = {
    body: '这是一条来自 Cloudflare Worker 的测试通知！',
    icon: '/icon.png', // 换成你之前的图标
    badge: '/icon.png'
  };

  event.waitUntil(
    self.registration.showNotification('🎉 iOS 推送成功！', options)
  );
});

// 点击通知时的行为
self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(
    clients.openWindow('/')
  );
});

