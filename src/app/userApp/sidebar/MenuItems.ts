export const MenuItems: MenuItem[] = [
    // {cssClass: 'dashboard', path: '#', text: 'NAVIGATION.FRONT.ITEM.DASHBOARD'},
    {icon: 'iso', link: 'ico', title: 'NAVIGATION.FRONT.ITEM.ICO_SCR'},
    {icon: 'alt', link: 'alt-coins', title: 'NAVIGATION.FRONT.ITEM.ALT_COIN'},
    // {cssClass: 'index', path: '#', text: 'NAVIGATION.FRONT.ITEM.INDEX_BUILDER'},
    // {cssClass: 'visualization', path: '#', text: 'NAVIGATION.FRONT.ITEM.VIS_TOOLS'},
    // {cssClass: 'market', path: '#', text: 'NAVIGATION.FRONT.ITEM.MARKET_CAPS'},
    // {cssClass: 'data', path: '#', text: 'NAVIGATION.FRONT.ITEM.DATA_MARKET'},
    {icon: 'newsfeed', link: 'news-feed', title: 'NAVIGATION.FRONT.ITEM.NEWS'},
];

export interface MenuItem {
    title: string;
    link: string;
    icon: string;
}
