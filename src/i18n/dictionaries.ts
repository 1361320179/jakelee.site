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
    site: string;
    game: string;
    tool: string;
    siteMenuEyebrow: string;
    siteMenuDescription: string;
    siteMenuCaption: string;
    siteMenuToolCaption: string;
    menu: string;
    switchToLight: string;
    switchToDark: string;
    newsletterEmail: string;
    languageSwitcher: string;
    rssHint: string;
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
        "A personal brand site featuring curated blog posts and project case studies, offering enterprise-grade development and services.",
    },
    navigation: {
      home: "Home",
      blog: "Blog",
      projects: "Projects",
      about: "About",
      contact: "Contact",
      site: "Site",
      game: "Game",
      tool: "Tools",
      siteMenuEyebrow: "Subdomain hub",
      siteMenuDescription:
        "A curated entry point for standalone products and experiments.",
      siteMenuCaption: "Playable builds and interactive experiments",
      siteMenuToolCaption: "Handy web utilities and small apps",
      menu: "Menu",
      switchToLight: "Switch to light mode",
      switchToDark: "Switch to dark mode",
      newsletterEmail: "Email for newsletter",
      languageSwitcher: "Switch language",
      rssHint: "Please point your RSS reader to this feed URL to see updates:\n\n",
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
      title:
        "Improve user experience, build polished work, and create lasting impact.",
      primaryCta: "Get in touch",
      secondaryCta: "Read the blog",
      cardIntroTitle: "Jake Lee",
      cardIntroBody: "Personal site, writing hub, and project archive.",
      writingLabel: "Writing",
      workLabel: "Work",
      whatTitle: "What you'll find here",
      writingTitle: "Writing",
      writingBody:
        "Long-form articles, technical notes, and practical guides, balancing readability and SEO.",
      writingCta: "Browse blog",
      projectsTitle: "Projects",
      projectsBody:
        "Case-style breakdowns of the tech stack, key technical points, and live links.",
      projectsCta: "View work",
      collaborationTitle: "Collaboration",
      collaborationBody:
        "Feel free to reach out or subscribe if you'd like to stay connected for deeper conversations and future collaboration.",
      collaborationCta: "Contact",
      nextStepTitle: "Next step",
      nextStepBody:
        "Tell me what you're working on, or subscribe now and get notified when the newsletter goes live.",
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
        "A case-based record of the tech stack, key technical points, and project links, with the portfolio continuing to grow over time.",
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
        "I'm Jake Lee, a frontend engineer with seven years of experience developing and delivering mature products across industries including the internet, education, academic publishing, and government services.",
      focusTitle: "Focus",
      focusBody:
        "My strengths include frontend architecture, performance optimization, user experience improvement, and engineering practice informed by product thinking.",
      workTitle: "How I work",
      workBody:
        "Quickly break down requirements and continuously deliver phased technical solutions and project outcomes.",
      talkTitle: "Feel free to reach out",
      talkBody:
        "You can contact me about collaboration, consulting, or development needs. I look forward to working with you.",
    },
    contact: {
      title: "Contact",
      description:
        "Tell me a bit about your needs and leave your email address. I'll get back to you as soon as possible.",
      name: "Name",
      email: "Email",
      message: "Message",
      messagePlaceholder: "What are you building, and how can I help?",
      submit: "Send message",
      submitting: "Sending...",
      success: "Received. Your message was sent successfully.",
      networkError: "Network error. Try again in a moment.",
    },
    newsletter: {
      title: "Subscribe for updates",
      description: "Occasional updates on new articles and project updates.",
      submit: "Subscribe",
      success: "You've been added to the subscriber list.",
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
        "Articles and notes from Jake Lee, focused on engineering practice, performance, and product thinking.",
      projects: "Projects",
      projectsDescription:
        "Projects and experiments from Jake Lee, including the tech stack, key technical points, and related links.",
      about: "About",
      aboutDescription:
        "Learn more about Jake Lee's background, focus areas, and ways of working together.",
      contact: "Contact",
      contactDescription:
        "Contact Jake Lee, send a message, and I'll receive an email notification and reply.",
      notFound: "Not found",
    },
  },
  zh: {
    site: {
      description: "个人品牌、精品博文与项目案例，提供企业级项目开发与服务。",
    },
    navigation: {
      home: "首页",
      blog: "博客",
      projects: "项目",
      about: "关于",
      contact: "联系",
      site: "网站",
      game: "游戏",
      tool: "小工具",
      siteMenuEyebrow: "子域名入口",
      siteMenuDescription: "用于承载独立产品与实验站点的统一入口。",
      siteMenuCaption: "游戏与交互实验子站",
      siteMenuToolCaption: "在线小工具与实用页面",
      menu: "菜单",
      switchToLight: "切换到浅色模式",
      switchToDark: "切换到深色模式",
      newsletterEmail: "订阅邮箱",
      languageSwitcher: "切换语言",
      rssHint: "请将您的 RSS 阅读器指向RSS源，以便看到更新内容：\n\n",
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
      title: "深入用户体验，打造精品作品，沉淀长期影响力。",
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
      projectsBody: "案例式拆解技术栈、技术要点与线上链接。",
      projectsCta: "查看项目",
      collaborationTitle: "合作",
      collaborationBody: "欢迎联系与订阅，便于后续深入交流与合作。",
      collaborationCta: "联系",
      nextStepTitle: "下一步",
      nextStepBody:
        "告诉我你在做什么，或者先订阅，等 newsletter 上线时再收到通知。",
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
      description:
        "用案例形式记录技术栈、技术要点与成果链接，作品集可以持续扩展。",
      empty: "暂时还没有已发布项目。",
      caseStudy: "查看案例",
      liveDemo: "在线演示",
      source: "源码",
      viewDemo: "查看演示",
      repository: "代码仓库",
    },
    about: {
      title: "关于",
      description:
        "我是李瑞锋，七年前端开发经验，多个成熟产品的开发与交付经验，涉及多个领域，包含互联网、教育、学术出版、政府服务等。",
      focusTitle: "关注方向",
      focusBody:
        "擅长前端架构、性能优化、用户体验优化与兼顾产品视角的工程实践。",
      workTitle: "工作方式",
      workBody: "快速拆解需求，持续输出阶段性技术方案和项目成果。",
      talkTitle: "欢迎联系",
      talkBody: "可以通过联系我发送合作、咨询或开发需求，期待与您合作。",
    },
    contact: {
      title: "联系",
      description: "告诉我你的需求概要和联系邮箱，我会尽快回复你。",
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
      description: "不定期发送新文章和项目更新。",
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
      blogDescription:
        "Jake Lee 的文章与笔记，关注工程实践、性能与产品化思路。",
      projects: "项目",
      projectsDescription:
        "Jake Lee 的项目与实验，包含技术栈、技术要点与相关链接。",
      about: "关于",
      aboutDescription: "了解 Jake Lee 的背景、关注方向以及合作方式。",
      contact: "联系",
      contactDescription: "联系 Jake Lee，发送消息，我会接收到邮件通知并回复。",
      notFound: "未找到页面",
    },
  },
};

export async function getDictionary(locale: SiteLocale) {
  return dictionaries[locale];
}
