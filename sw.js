self.addEventListener('push', event => {
  const data = event.data ? event.data.json() : { title: '默认标题', body: '默认内容' };
  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: '/icon.png',     // 可选，放一张 192x192 的图标
      tag: data.tag || 'default',
      data: { url: data.url || '/' }
    })
  );
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(clients.openWindow(event.notification.data.url));
});