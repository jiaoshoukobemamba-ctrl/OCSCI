import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "OSDL Lab",
  description: "海洋科学数字实验室",
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '数据资源', link: '/data-resources' }
    ],
    sidebar: [
      {
        text: '🌀 物理海洋',
        items: [
          { text: '波浪理论专题', link: '/physics/waves' }
        ]
      },
      {
        text: '🧪 生化与生命',
        items: [
          { text: '海洋化学', link: '/biochemistry/chemistry' },
          { text: '海洋生物', link: '/biochemistry/biology' }
        ]
      },
      {
        text: '🌋 海洋地质',
        items: [
          { text: '地质门户', link: '/geology/index' },
          { text: '大洋中脊', link: '/geology/ridge' },
          { text: '海沟与俯冲', link: '/geology/trench' }
        ]
      }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/your-repo' }
    ]
  }
})
