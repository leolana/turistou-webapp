export async function getLeftMenuData() {
  return [
    /*
     {
       title: 'Dashboard',
       key: 'dashboard',
       url: '/dashboard/alpha',
       icon: 'fa fa-line-chart',
     },
     */
    {
      title: 'Excursões',
      key: 'excursions',
      url: '/excursion/list',
      icon: 'fa fa-bus',
    },
    {
      title: 'Clientes',
      key: 'customers',
      url: '/customer/list',
      icon: 'fa fa-users',
    },
    // {
    //   title: 'Pagamentos',
    //   key: 'payments',
    //   url: '/payment/list',
    //   icon: 'fa fa-dollar',
    // },
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
          title: 'Dashboard',
          key: 'dashboard',
          url: '/dashboard/alpha',
        },
        {
          title: 'Clientes',
          key: 'customers',
          url: '/customer',
        },
      ],
    },
  ]
}
