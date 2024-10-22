const sizeInput = document.getElementById("size");
const positionSelect = document.getElementById("position");
const saveButton = document.getElementById("save");

// 加载保存的设置
chrome.storage.sync.get(["size", "position"], (result) => {
  if (result.size) sizeInput.value = result.size;
  if (result.position) {
    const positionMap = {
      "bottom: 20px; right: 20px;": "bottomRight",
      "bottom: 20px; left: 20px;": "bottomLeft",
      "top: 20px; right: 20px;": "topRight",
      "top: 20px; left: 20px;": "topLeft",
    };
    positionSelect.value = positionMap[result.position] || "bottomRight";
  }
});

// 保存设置
saveButton.addEventListener("click", () => {
  const size = parseInt(sizeInput.value);
  let position;
  switch (positionSelect.value) {
    case "bottomLeft":
      position = "bottom: 20px; left: 20px;";
      break;
    case "topRight":
      position = "top: 20px; right: 20px;";
      break;
    case "topLeft":
      position = "top: 20px; left: 20px;";
      break;
    default:
      position = "bottom: 20px; right: 20px;";
  }

  chrome.storage.sync.set({ size, position }, () => {
    alert("设置已保存");
  });
});
