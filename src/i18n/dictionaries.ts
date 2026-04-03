import "server-only";

import type { SiteLocale } from "@/i18n/config";

type Dictionary = {
  site: {
    description: string;
  };
  navigation: {
    home: string;
    blog: string;
    projects: string;
    about: string;
    contact: string;
    menu: string;
    switchToLight: string;
    switchToDark: string;
    newsletterEmail: string;
    languageSwitcher: string;
  };
  common: {
    loading: string;
    updated: string;
    older: string;
    newer: string;
    related: string;
    featured: string;
    all: string;
    tags: string;
    minRead: string;
    onThisPage: string;
    backToProjects: string;
    viewAllProjects: string;
  };
  home: {
    eyebrow: string;
    title: string;
    primaryCta: string;
    secondaryCta: string;
    cardIntroTitle: string;
    cardIntroBody: string;
    writingLabel: string;
    workLabel: string;
    whatTitle: string;
    writingTitle: string;
    writingBody: string;
    writingCta: string;
    projectsTitle: string;
    projectsBody: string;
    projectsCta: string;
    collaborationTitle: string;
    collaborationBody: string;
    collaborationCta: string;
    nextStepTitle: string;
    nextStepBody: string;
    nextStepCta: string;
  };
  blog: {
    title: string;
    description: string;
    loading: string;
    searchLabel: string;
    searchPlaceholder: string;
    filteringByTag: string;
    noMatches: string;
  };
  projects: {
    title: string;
    description: string;
    empty: string;
    caseStudy: string;
    liveDemo: string;
    source: string;
    viewDemo: string;
    repository: string;
  };
  about: {
    title: string;
    description: string;
    focusTitle: string;
    focusBody: string;
    workTitle: string;
    workBody: string;
    talkTitle: string;
    talkBody: string;
  };
  contact: {
    title: string;
    description: string;
    name: string;
    email: string;
    message: string;
    messagePlaceholder: string;
    submit: string;
    submitting: string;
    success: string;
    networkError: string;
  };
  newsletter: {
    title: string;
    description: string;
    submit: string;
    success: string;
    error: string;
  };
  notFound: {
    title: string;
    description: string;
    backHome: string;
  };
  metadata: {
    titleTemplate: string;
    blog: string;
    blogDescription: string;
    projects: string;
    projectsDescription: string;
    about: string;
    aboutDescription: string;
    contact: string;
    contactDescription: string;
    notFound: string;
  };
};

const dictionaries: Record<SiteLocale, Dictionary> = {
  en: {
    site: {
      description:
        "Personal brand, engineering notes, and projects - a modular home for content and future product surface.",
    },
    navigation: {
      home: "Home",
      blog: "Blog",
      projects: "Projects",
      about: "About",
      contact: "Contact",
      menu: "Menu",
      switchToLight: "Switch to light mode",
      switchToDark: "Switch to dark mode",
      newsletterEmail: "Email for newsletter",
      languageSwitcher: "Switch language",
    },
    common: {
      loading: "Loading...",
      updated: "Updated",
      older: "Older",
      newer: "Newer",
      related: "Related",
      featured: "Featured",
      all: "All",
      tags: "Tags",
      minRead: "min read",
      onThisPage: "On this page",
      backToProjects: "Back to projects",
      viewAllProjects: "All projects",
    },
    home: {
      eyebrow: "Personal brand / Content / Platform",
      title: "Build clarity, ship craft, grow a lasting presence.",
      primaryCta: "Get in touch",
      secondaryCta: "Read the blog",
      cardIntroTitle: "Jake Lee",
      cardIntroBody: "Personal site, writing hub, and project archive.",
      writingLabel: "Writing",
      workLabel: "Work",
      whatTitle: "What you'll find here",
      writingTitle: "Writing",
      writingBody:
        "Long-form posts, notes, and playbooks - optimized for reading and SEO.",
      writingCta: "Browse blog",
      projectsTitle: "Projects",
      projectsBody:
        "Case-style breakdowns with stack, tradeoffs, and links to live demos.",
      projectsCta: "View work",
      collaborationTitle: "Collaboration",
      collaborationBody:
        "Contact and newsletter hooks are wired for conversions as you scale.",
      collaborationCta: "Contact",
      nextStepTitle: "Next step",
      nextStepBody:
        "Tell me what you're building - or subscribe once the newsletter goes live.",
      nextStepCta: "Start a conversation",
    },
    blog: {
      title: "Blog",
      description:
        "Long-form writing, technical notes, and playbooks - searchable by keyword or tag.",
      loading: "Loading posts...",
      searchLabel: "Search posts",
      searchPlaceholder: "Search title, tags, description...",
      filteringByTag: "Filtering by tag:",
      noMatches: "No posts match your filters.",
    },
    projects: {
      title: "Projects",
      description:
        "Case-style write-ups with tech stack, constraints, and links. Swap summaries and MDX bodies as your portfolio grows.",
      empty: "No projects published yet.",
      caseStudy: "Case study",
      liveDemo: "Live demo",
      source: "Source",
      viewDemo: "View demo",
      repository: "Repository",
    },
    about: {
      title: "About",
      description:
        "This page is your branded story: who you are, what you optimize for, and how you work with others. Replace this copy with your voice.",
      focusTitle: "Focus",
      focusBody:
        "Frontend architecture, performance, and product-minded engineering - with room to grow into courses, templates, and advisory as your IP matures.",
      workTitle: "How I work",
      workBody:
        "Short iterations, explicit tradeoffs, and documentation that survives handoff. Detail your rituals and tools here when you are ready.",
      talkTitle: "Let's talk",
      talkBody:
        "Use the contact form for inquiries, collaborations, or speaking - the site is built to add booking and downloads without a rewrite.",
    },
    contact: {
      title: "Contact",
      description:
        "Share a short brief and the best email to reach you. Messages are stored through the contact API route and forwarded to my inbox.",
      name: "Name",
      email: "Email",
      message: "Message",
      messagePlaceholder: "What are you building, and how can I help?",
      submit: "Send message",
      submitting: "Sending...",
      success: "Thanks - your message was sent.",
      networkError: "Network error. Try again in a moment.",
    },
    newsletter: {
      title: "Newsletter",
      description:
        "Occasional updates on posts and projects. No spam - unsubscribe anytime.",
      submit: "Subscribe",
      success: "You're on the list.",
      error: "Could not subscribe right now. Try again in a moment.",
    },
    notFound: {
      title: "Page not found",
      description: "The link may be broken or the page was removed.",
      backHome: "Back to home",
    },
    metadata: {
      titleTemplate: "%s | Jake Lee",
      blog: "Blog",
      blogDescription:
        "Articles and notes from Jake Lee - engineering, performance, and product craft.",
      projects: "Projects",
      projectsDescription:
        "Selected work and experiments from Jake Lee - stack, tradeoffs, and links.",
      about: "About",
      aboutDescription:
        "About Jake Lee - background, focus areas, and how we can work together.",
      contact: "Contact",
      contactDescription:
        "Contact Jake Lee - send a message, store it in Supabase, and notify by email.",
      notFound: "Not found",
    },
  },
  zh: {
    site: {
      description: "个人品牌、工程笔记与项目沉淀，作为内容与后续产品化能力的长期载体。",
    },
    navigation: {
      home: "首页",
      blog: "博客",
      projects: "项目",
      about: "关于",
      contact: "联系",
      menu: "菜单",
      switchToLight: "切换到浅色模式",
      switchToDark: "切换到深色模式",
      newsletterEmail: "订阅邮箱",
      languageSwitcher: "切换语言",
    },
    common: {
      loading: "加载中...",
      updated: "更新于",
      older: "更早",
      newer: "更新",
      related: "相关文章",
      featured: "精选",
      all: "全部",
      tags: "标签",
      minRead: "分钟阅读",
      onThisPage: "本页目录",
      backToProjects: "返回项目列表",
      viewAllProjects: "全部项目",
    },
    home: {
      eyebrow: "个人品牌 / 内容 / 平台",
      title: "建立清晰表达，持续交付作品，沉淀长期影响力。",
      primaryCta: "联系我",
      secondaryCta: "阅读博客",
      cardIntroTitle: "Jake Lee",
      cardIntroBody: "个人网站、写作中心与项目归档。",
      writingLabel: "写作",
      workLabel: "项目",
      whatTitle: "这里会有什么",
      writingTitle: "写作",
      writingBody: "长文、技术笔记与实践手册，兼顾阅读体验与 SEO。",
      writingCta: "浏览博客",
      projectsTitle: "项目",
      projectsBody: "案例式拆解技术栈、取舍与线上链接。",
      projectsCta: "查看项目",
      collaborationTitle: "合作",
      collaborationBody: "联系与订阅入口已经就位，便于后续承接咨询和转化。",
      collaborationCta: "联系",
      nextStepTitle: "下一步",
      nextStepBody: "告诉我你在做什么，或者先订阅，等 newsletter 上线时再收到通知。",
      nextStepCta: "开始交流",
    },
    blog: {
      title: "博客",
      description: "长文写作、技术笔记与方法总结，可按关键词或标签检索。",
      loading: "正在加载文章...",
      searchLabel: "搜索文章",
      searchPlaceholder: "搜索标题、标签或摘要...",
      filteringByTag: "当前标签筛选：",
      noMatches: "没有匹配当前筛选条件的文章。",
    },
    projects: {
      title: "项目",
      description: "用案例形式记录技术栈、约束条件与成果链接，作品集可以持续扩展。",
      empty: "暂时还没有已发布项目。",
      caseStudy: "查看案例",
      liveDemo: "在线演示",
      source: "源码",
      viewDemo: "查看演示",
      repository: "代码仓库",
    },
    about: {
      title: "关于",
      description: "这里用来讲清你是谁、你关注什么，以及你如何与人协作。后续可以替换成你自己的表达。",
      focusTitle: "关注方向",
      focusBody:
        "前端架构、性能优化与兼顾产品视角的工程实践，也为课程、模板和咨询服务预留空间。",
      workTitle: "工作方式",
      workBody: "偏好短迭代、明确取舍，以及能够在交接后继续发挥作用的文档。",
      talkTitle: "欢迎联系",
      talkBody: "可以通过联系表单发送合作、咨询或演讲需求，后续加预约和下载能力也不需要重构。",
    },
    contact: {
      title: "联系",
      description: "告诉我你的需求概要和联系邮箱。消息会通过联系接口保存，并转发到我的收件箱。",
      name: "姓名",
      email: "邮箱",
      message: "留言",
      messagePlaceholder: "你在做什么？我可以如何帮你？",
      submit: "发送消息",
      submitting: "发送中...",
      success: "已收到，你的消息发送成功。",
      networkError: "网络异常，请稍后再试。",
    },
    newsletter: {
      title: "订阅更新",
      description: "不定期发送新文章和项目更新。不发垃圾邮件，随时可退订。",
      submit: "订阅",
      success: "你已经加入订阅列表。",
      error: "当前无法完成订阅，请稍后再试。",
    },
    notFound: {
      title: "页面不存在",
      description: "这个链接可能已失效，或者页面已经被移除。",
      backHome: "返回首页",
    },
    metadata: {
      titleTemplate: "%s | Jake Lee",
      blog: "博客",
      blogDescription: "Jake Lee 的文章与笔记，关注工程实践、性能与产品化思路。",
      projects: "项目",
      projectsDescription: "Jake Lee 的项目与实验，包含技术栈、取舍与相关链接。",
      about: "关于",
      aboutDescription: "了解 Jake Lee 的背景、关注方向以及合作方式。",
      contact: "联系",
      contactDescription: "联系 Jake Lee，发送消息，保存到 Supabase 并通过邮件通知。",
      notFound: "未找到页面",
    },
  },
};

export async function getDictionary(locale: SiteLocale) {
  return dictionaries[locale];
}
