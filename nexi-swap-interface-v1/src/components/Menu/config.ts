import { MenuEntry } from '@crytoswap-libs/uikit'

const config: MenuEntry[] = [
  {
    label: 'Home',
    icon: 'HomeIcon',
    href: '/',
  },
  {
    label: 'Trade',
    icon: 'TradeIcon',
    initialOpenState: true,
    items: [
      {
        label: 'Exchange',
        href: '/swap',
      },
      {
        label: 'Liquidity',
        href: '/pool',
      },
    ],
  },
 // {
 //   label: 'Fees',
 //   icon: 'HamburgerIcon',
 //   href: '/fees',
//  },
 // {
 //   label: 'Assets',
  //  icon: 'HamburgerIcon',
   // href: '/assets',
 // },
]

export default config
