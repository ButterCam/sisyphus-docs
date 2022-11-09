// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Sisyphus',
  tagline: 'Build more robust and extensible gRPC APIs with AIP',
  url: 'https://sisyphus.bybutter.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.svg',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'ButterCam', // Usually your GitHub org/user name.
  projectName: 'sisyphus-docs', // Usually your repo name.
  trailingSlash: false,

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'zh-Hans'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/ButterCam/sisyphus-docs/edit/main/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
              'https://github.com/ButterCam/sisyphus-docs/edit/main/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        googleAnalytics: {
          trackingID: 'G-GTV5XD2T1R',
          anonymizeIP: false,
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'Sisyphus',
        logo: {
          alt: 'Sisyphus Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'doc',
            docId: 'intro',
            position: 'left',
            label: 'Documents',
          },
          {to: '/blog', label: 'Blog', position: 'left'},
          {to: '/search', label: 'Search', position: 'left'},
          {
            type: 'localeDropdown',
            position: 'right',
          },
          {
            href: 'https://github.com/ButterCam/sisyphus',
            className: 'header-github-link',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Tutorial',
                to: '/docs/getting-started',
              },
              {
                label: 'Guides',
                to: '/docs/category/guides',
              },
              {
                label: 'Advanced Guides',
                to: '/docs/category/advanced-guides',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Blog',
                to: '/blog',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/ButterCam/sisyphus',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} ButterCam OpenSource Group. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ["kotlin", "protobuf", "docker"]
      },
      algolia: {
        // The application ID provided by Algolia
        appId: 'JEUJZ2Y8JO',

        // Public API key: it is safe to commit it
        apiKey: '19a2659d5276d8eb212194fc07543211',

        indexName: 'sisyphus',

        // Optional: see doc section below
        contextualSearch: true,

        // Optional: Specify domains where the navigation should occur through window.location instead on history.push. Useful when our Algolia config crawls multiple documentation sites and we want to navigate with window.location.href to them.
        // externalUrlRegex: 'butterapis\\.com|bybutter\\.com',

        // Optional: Algolia search parameters
        // searchParameters: {},

        // Optional: path for search page that enabled by default (`false` to disable it)
        searchPagePath: 'search',
      },
    }),
};

module.exports = config;
