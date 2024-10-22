let qrContainer, toggleButton, qrCode;
let isVisible = true;
let size = 128;
let position = { bottom: "20px", right: "20px" };

// 创建二维码容器和切换按钮
function createElements() {
  qrContainer = document.createElement("div");
  qrContainer.id = "qr-code-container";

  toggleButton = document.createElement("button");
  toggleButton.id = "qr-toggle-button";
  toggleButton.textContent = "隐藏二维码";
  toggleButton.addEventListener("click", toggleQRCode);

  document.body.appendChild(qrContainer);
  document.body.appendChild(toggleButton);
}

// 生成二维码
function generateQRCode() {
  const currentURL = window.location.href;
  qrContainer.innerHTML = "";
  qrCode = new QRCode(qrContainer, {
    text: currentURL,
    width: size,
    height: size,
  });
}

// 切换二维码显示/隐藏
function toggleQRCode() {
  isVisible = !isVisible;
  qrContainer.style.display = isVisible ? "block" : "none";
  toggleButton.textContent = isVisible ? "隐藏二维码" : "显示二维码";
}

// 更新二维码位置和大小
function updateQRCodeStyle() {
  Object.assign(qrContainer.style, position);
  qrContainer.style.width = `${size}px`;
  qrContainer.style.height = `${size}px`;
}

// 加载用户设置
function loadSettings() {
  chrome.storage.sync.get(["size", "position"]).then((result) => {
    if (result.size) size = result.size;
    if (result.position) position = result.position;
    updateQRCodeStyle();
    generateQRCode();
  });
}

// 初始化
function init() {
  createElements();
  loadSettings();
  generateQRCode();

  // 监听URL变化
  let lastURL = window.location.href;
  setInterval(() => {
    if (window.location.href !== lastURL) {
      lastURL = window.location.href;
      generateQRCode();
    }
  }, 1000);
}

// 页面加载完成后初始化
window.addEventListener("load", init);
