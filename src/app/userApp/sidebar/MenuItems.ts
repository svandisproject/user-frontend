export const MenuItems: MenuItem[] = [
    // {cssClass: 'dashboard', path: '#', text: 'NAVIGATION.FRONT.ITEM.DASHBOARD'},
    {icon: 'assessment', link: 'ico', title: 'NAVIGATION.FRONT.ITEM.ICO'},
    {icon: 'copyright', link: 'alt-coins', title: 'NAVIGATION.FRONT.ITEM.ALT_COIN'},
    // {cssClass: 'index', path: '#', text: 'NAVIGATION.FRONT.ITEM.INDEX_BUILDER'},
    // {cssClass: 'visualization', path: '#', text: 'NAVIGATION.FRONT.ITEM.VIS_TOOLS'},
    // {cssClass: 'market', path: '#', text: 'NAVIGATION.FRONT.ITEM.MARKET_CAPS'},
    // {cssClass: 'data', path: '#', text: 'NAVIGATION.FRONT.ITEM.DATA_MARKET'},
    {icon: 'library_books', link: 'news-feed', title: 'NAVIGATION.FRONT.ITEM.NEWS'}
];

export interface MenuItem {
    title: string;
    link: string;
    icon: string;
}
