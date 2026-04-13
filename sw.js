self.addEventListener('push', async (event) => {
  let data = { title: '测试推送', body: '这是默认内容' };

  try {
    if (event.data) {
      data = event.data.json();
    }
  } catch (e) {
    console.error('解析 push 数据失败', e);
  }

  const options = {
    body: data.body || '无内容',
    icon: '/icon.png',
    badge: '/icon.png',           // iOS 有时需要 badge
    tag: data.tag || 'default-tag', // 防止重复通知
    data: { url: data.url || '/' },
    requireInteraction: false
  };

  // 必须用 waitUntil 包裹，且立即显示通知
  event.waitUntil(
    self.registration.showNotification(data.title, options)
      .catch(err => console.error('showNotification 失败', err))
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow(event.notification.data.url)
  );
});