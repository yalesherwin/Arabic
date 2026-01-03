# 阿拉伯语学习系统 - 自动更新音标词库

一个功能完善的阿拉伯语学习应用，具有云端词库、IPA音标、自动去重和学习进度跟踪等功能。

## 功能特点

✅ **云端词库自动更新** - 从Cloudflare Worker API获取词汇，可随时扩展
✅ **IPA国际音标** - 每个单词都配有准确的IPA音标
✅ **智能去重** - 自动记录已学习的单词，确保不重复
✅ **学习进度跟踪** - 实时显示学习进度和完成百分比
✅ **分类标签** - 单词按类别分组（如：问候、家庭、数字等）
✅ **语音朗读** - 支持阿拉伯语语音合成
✅ **本地存储** - 学习记录保存在浏览器本地，刷新不丢失
✅ **响应式设计** - 支持手机、平板、电脑等各种设备

## 文件说明

```
Arabic/
├── index.html              # 主页面 - 学习界面
├── vocabulary.json         # 词库数据（备份/参考）
├── cloudflare-worker.js    # Cloudflare Worker API代码
└── README.md              # 说明文档
```

## 快速开始

### 方式1：直接使用（推荐）

1. 直接打开 `index.html` 文件
2. 点击"下一张"按钮开始学习
3. 系统会自动从云端API获取词汇

### 方式2：本地服务器

```bash
# 使用Python启动本地服务器
python -m http.server 8000

# 或使用Node.js
npx http-server

# 然后访问 http://localhost:8000
```

## 部署云端API（可选）

如果你想自己部署Cloudflare Worker API：

1. 注册 [Cloudflare](https://cloudflare.com) 账号（免费）

2. 创建新的Worker：
   - 进入 Cloudflare Dashboard
   - 选择 "Workers & Pages"
   - 点击 "Create Application" → "Create Worker"

3. 复制 `cloudflare-worker.js` 的内容到Worker编辑器

4. 点击 "Save and Deploy"

5. 获取Worker URL，更新 `index.html` 中的 `API_URL`

## 词库管理

### 当前词库包含：

- **130+** 常用阿拉伯语单词
- **10+** 主题分类
- 包含IPA音标、中文、英文翻译

### 主题分类：

- 问候语 (مَرْحَبًا, سَلَام)
- 数字 (1-10)
- 颜色
- 家庭成员
- 职业
- 食物与饮料
- 交通工具
- 地点
- 形容词
- 动词

### 扩展词库：

要添加新单词，编辑 `cloudflare-worker.js` 中的 `VOCABULARY` 数组：

```javascript
{
  word: "单词阿拉伯语",
  ipa: "IPA音标",
  zh: "中文翻译",
  en: "English translation",
  category: "分类名称"
}
```

然后重新部署Worker即可。

## 使用技巧

1. **连续学习**：每次打开页面会继续上次的进度
2. **重置进度**：点击"重置进度"按钮可清除学习记录
3. **语音朗读**：点击"朗读"按钮听发音（需要浏览器支持）
4. **离线学习**：已学习的记录保存在本地，无需网络

## 技术栈

- **前端**：HTML5 + CSS3 + Vanilla JavaScript
- **后端API**：Cloudflare Workers (Serverless)
- **存储**：LocalStorage（浏览器本地存储）
- **字体**：Google Fonts (Montserrat, Roboto)

## 浏览器支持

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- 移动浏览器（iOS Safari, Chrome Mobile）

## 开发者信息

- **作者**：CHINACNU STEEL 企业课堂
- **版本**：v1.0
- **最后更新**：2026-01-03

## 许可证

MIT License - 可自由使用和修改

## 联系方式

如有问题或建议，欢迎反馈！
