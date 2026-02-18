export const POSTS = [
  {
    id: '1',
    title: '如何设计一个高效的文档处理链路？分享我的最佳实践',
    author: '技术达人',
    avatar: 'T',
    avatarGrad: 'from-green-400 to-blue-400',
    category: '经验分享',
    content: `最近在使用小浣熊处理大量文档时，总结了一些经验分享给大家。

**1. 明确输入输出格式**
在设计链路之前，先明确每个节点的输入和输出格式。统一使用 JSON 或 Markdown，避免格式不一致导致的解析错误。

**2. 合理分段处理**
对于超过 3000 字的文档，建议按段落或章节分块处理，避免上下文窗口溢出。每块处理完后合并结果。

**3. 增加检查步骤**
在关键环节添加输出验证节点，例如检查字段完整性、格式合规性。一旦验证失败，触发重试或人工介入。

**4. 缓存中间结果**
对于耗时的中间结果（如 OCR 识别结果），建议做本地缓存，避免重复计算。

欢迎大家分享自己的最佳实践！`,
    replies: 24,
    views: 312,
    likes: 45,
    createdAt: '2小时前',
    lastReply: '10分钟前',
    tags: ['最佳实践', '文档处理', '工作流'],
  },
  {
    id: '2',
    title: '小浣熊在教育行业的应用场景探讨',
    author: '教育从业者',
    avatar: 'E',
    avatarGrad: 'from-violet-400 to-pink-400',
    category: '行业讨论',
    content: `作为一名教育行业从业者，想和大家探讨小浣熊在教育场景的应用可能性。

目前我已经尝试了以下场景：

**作业批改自动化**：上传学生作文，配合评分标准知识库，自动给出评分和改进建议。测试下来准确率还不错，但需要人工复核。

**教案生成**：输入课程目标和学生年级，自动生成结构化教案，包括导入、讲授、练习、总结四个环节。

**个性化辅导**：根据学生错题记录，生成针对性的练习题和讲解。

欢迎教育行业的朋友交流经验！`,
    replies: 18,
    views: 256,
    likes: 32,
    createdAt: '5小时前',
    lastReply: '30分钟前',
    tags: ['教育', '场景探索'],
  },
  {
    id: '3',
    title: '【求助】多文件并行处理时如何避免上下文混淆？',
    author: '新手用户',
    avatar: 'N',
    avatarGrad: 'from-orange-400 to-red-400',
    category: '问题求助',
    content: `我在使用小浣熊处理多个文件时，发现有时候会出现上下文混淆的情况。

具体情况是：我同时上传了 A.docx 和 B.docx，让小浣熊分别生成摘要。但发现 A 的摘要里出现了 B 的内容。

我目前的做法是用一个链路节点同时处理两个文件，Prompt 里写明"请分别处理以下两个文件"。

有没有更好的方案？是应该用两个独立的节点分别处理，还是有什么 Prompt 技巧可以避免混淆？

谢谢大家！`,
    replies: 15,
    views: 198,
    likes: 12,
    createdAt: '8小时前',
    lastReply: '1小时前',
    tags: ['求助', '多文件处理'],
  },
  {
    id: '4',
    title: '使用小浣熊一个月总结：哪些场景最高效？',
    author: '资深用户',
    avatar: 'S',
    avatarGrad: 'from-teal-400 to-green-400',
    category: '使用心得',
    content: `用小浣熊一个月了，总结一下我觉得最高效的几个场景：

**数据清洗（★★★★★）**
Excel 数据自动识别异常、补全缺失值、统一格式，省了大量人工操作时间。

**报告生成（★★★★★）**
给定数据和报告模板，自动生成结构完整、逻辑清晰的分析报告。我们团队每周报告时间从 3 小时缩短到 20 分钟。

**邮件自动回复（★★★★☆）**
根据邮件内容和历史记录，生成个性化回复草稿。95% 以上的草稿无需大改直接发送。

**会议记录整理（★★★★☆）**
上传录音转写文本，自动提取待办事项、决策点、下一步行动，结构化输出。

不太推荐用的场景：需要精确计算的任务、实时数据查询（无接口时）。`,
    replies: 31,
    views: 445,
    likes: 67,
    createdAt: '1天前',
    lastReply: '2小时前',
    tags: ['心得', '场景总结'],
  },
  {
    id: '5',
    title: 'AI 在金融风控中的应用思考',
    author: '金融从业者',
    avatar: 'J',
    avatarGrad: 'from-blue-400 to-cyan-400',
    category: '行业讨论',
    content: `最近在尝试用小浣熊做金融风控相关的工作，包括异常交易识别、风险评估报告生成等。

**注意事项分享：**

1. **数据隐私**：确保在使用前对敏感字段脱敏，不要上传完整客户信息。
2. **结果核验**：AI 输出的风险评估仅作辅助参考，必须有人工复核流程。
3. **模型局限**：对于复杂的跨市场套利行为识别，目前效果有限，更适合规则明确的场景。

**效果较好的场景：**
- 交易备注自动分类（正常 / 可疑 / 高风险）
- 风险评估报告模板自动填写
- 监管报送材料格式化整理

欢迎金融行业的朋友交流！`,
    replies: 22,
    views: 301,
    likes: 41,
    createdAt: '1天前',
    lastReply: '3小时前',
    tags: ['金融', '风控', '应用场景'],
  },
  {
    id: '6',
    title: '代码审查自动化实践 - 提升团队代码质量',
    author: '技术负责人',
    avatar: 'R',
    avatarGrad: 'from-slate-400 to-gray-600',
    category: '技术交流',
    content: `我们团队最近使用小浣熊进行代码审查辅助，效果显著。分享一下我们的实践经验。

**具体做法：**

1. **代码规范检查链路**：配置团队编码规范文档作为知识库，上传代码片段后自动检查是否符合规范并给出改进建议。

2. **安全漏洞扫描**：结合 OWASP Top 10 知识库，对提交的代码进行安全检查，自动标注可能的注入风险、越权等问题。

3. **性能优化建议**：针对数据库查询、循环逻辑等场景，给出优化建议和示例代码。

**使用效果：**
- Code Review 时间减少约 40%
- 初级开发者的低级错误率下降明显
- 安全漏洞被 PR 前发现的比例大幅提高`,
    replies: 19,
    views: 268,
    likes: 38,
    createdAt: '2天前',
    lastReply: '5小时前',
    tags: ['代码审查', '自动化', '质量提升'],
  },
  {
    id: '7',
    title: '如何提高 Prompt 的准确性和稳定性？',
    author: 'Prompt 工程师',
    avatar: 'P',
    avatarGrad: 'from-amber-400 to-orange-400',
    category: '经验分享',
    content: `经过大量实践，总结了一些提高 Prompt 准确性的技巧，分享给大家。

**1. 明确角色定位**
在 Prompt 开头明确 AI 的角色，例如"你是一名有 10 年经验的数据分析师"，有助于输出更专业的内容。

**2. 提供清晰的示例**
使用 Few-Shot 示例，给出 2-3 个"输入→输出"的完整案例，比单纯描述要求效果好得多。

**3. 使用结构化输出**
要求 AI 以 JSON 或特定格式输出，减少解析歧义。例如：
\`\`\`
请用以下 JSON 格式输出：
{"title": "...", "summary": "...", "keywords": [...]}
\`\`\`

**4. 设置检查机制**
在 Prompt 末尾加上"输出前请先验证：1. 格式是否正确 2. 内容是否完整"，让 AI 自检后再输出。

**5. 迭代优化**
保存每次的 Prompt 版本，对比效果，逐步迭代。不要轻易大改，每次只调整一个变量。`,
    replies: 42,
    views: 589,
    likes: 93,
    createdAt: '3天前',
    lastReply: '1小时前',
    tags: ['Prompt', '最佳实践', '提示工程'],
  },
]

export const REPLIES = [
  {
    id: 'r1',
    postId: '1',
    author: '小白学习中',
    avatar: 'X',
    avatarGrad: 'from-purple-400 to-pink-400',
    content: '太有帮助了！尤其是第2点，我之前就是没有合理分段导致处理大文件时效率很低。',
    likes: 8,
    createdAt: '10分钟前',
  },
  {
    id: 'r2',
    postId: '1',
    author: '开发老鸟',
    avatar: 'K',
    avatarGrad: 'from-blue-400 to-violet-400',
    content: '同意楼主的观点，增加检查步骤非常关键。我一般会在每个关键环节设置验证逻辑，确保输出符合预期。',
    likes: 12,
    createdAt: '1小时前',
  },
  {
    id: 'r3',
    postId: '2',
    author: '中学数学老师',
    avatar: 'M',
    avatarGrad: 'from-emerald-400 to-teal-400',
    content: '教案生成这个场景我也在用！配合课程标准知识库效果更好，建议大家试试。',
    likes: 15,
    createdAt: '2小时前',
  },
  {
    id: 'r4',
    postId: '3',
    author: '资深用户',
    avatar: 'S',
    avatarGrad: 'from-teal-400 to-green-400',
    content: '建议用两个独立节点分别处理，在每个节点的 Prompt 里明确指定"只处理文件X"。这样上下文完全隔离，不会混淆。',
    likes: 20,
    createdAt: '45分钟前',
  },
  {
    id: 'r5',
    postId: '4',
    author: '产品经理小王',
    avatar: 'W',
    avatarGrad: 'from-rose-400 to-pink-400',
    content: '会议记录整理这个场景真的太实用了！我们会议后的 Action Item 追踪效率提升了很多。',
    likes: 18,
    createdAt: '3小时前',
  },
  {
    id: 'r6',
    postId: '7',
    author: '新手小刘',
    avatar: 'L',
    avatarGrad: 'from-yellow-400 to-orange-400',
    content: 'Few-Shot 示例这个技巧太有用了！之前一直不知道怎么让输出更稳定，原来是要给例子。',
    likes: 31,
    createdAt: '30分钟前',
  },
  {
    id: 'r7',
    postId: '7',
    author: '技术达人',
    avatar: 'T',
    avatarGrad: 'from-green-400 to-blue-400',
    content: '补充一点：Chain of Thought 提示（"请一步步思考"）对于复杂推理任务也很有帮助，可以显著降低错误率。',
    likes: 44,
    createdAt: '1小时前',
  },
]
