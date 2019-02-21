export async function getLeftMenuData() {
  return [
    {
      title: 'Settings',
      key: 'settings',
      icon: 'icmn icmn-cog utils__spin-delayed--pseudo-selector',
    },
    {
      title: 'Documentation',
      key: 'documentation',
      url: 'https://docs.cleanuitemplate.com/react/getting-started',
      target: '_blank',
      icon: 'icmn icmn-books',
    },
    {
      divider: true,
    },
    {
      title: 'Dashboard Alpha',
      key: 'dashboardAlpha',
      url: '/dashboard/alpha',
      icon: 'icmn icmn-home',
    },
  ]
}
export async function getTopMenuData() {
  return [
    {
      title: 'Settings',
      key: 'settings',
      icon: 'icmn icmn-cog utils__spin-delayed--pseudo-selector',
    },
    {
      title: 'Docs',
      key: 'documentation',
      url: 'https://docs.cleanuitemplate.com/react/getting-started',
      target: '_blank',
      icon: 'icmn icmn-books',
    },
    {
      title: 'Dashboards',
      key: 'dashboards',
      icon: 'icmn icmn-stack',
      children: [
        {
          title: 'Dashboard Alpha',
          key: 'dashboardAlpha',
          url: '/dashboard/alpha',
        },
      ],
    },
  ]
}
