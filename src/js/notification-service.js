const NotificationService = {
  showNotification: function showNotification(message, delay) {
    if (!delay) delay = 4500;

    var _this = this;

    const box = document.getElementsByClassName('lto-notification-box')[0];
    box.innerHTML = message;
    box.classList.add('visible');

    setTimeout(function () {
      _this.hideNotification();
    }, delay)
  },

  hideNotification: function hideNotification() {
    const box = document.getElementsByClassName('lto-notification-box')[0];
    box.classList.remove('visible');

    setTimeout(function () {
      box.innerHTML = '';
    }, 500);
  }
}

window.NotificationService = NotificationService;
