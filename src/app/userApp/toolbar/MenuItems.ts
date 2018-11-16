export const MenuItems: MenuItem[] = [
    {icon: 'assessment', link: 'ico', title: 'NAVIGATION.FRONT.ITEM.ICO'},
    {icon: 'copyright', link: 'alt-coins', title: 'NAVIGATION.FRONT.ITEM.ALT_COIN'},
    {icon: 'library_books', link: 'news-feed', title: 'NAVIGATION.FRONT.ITEM.NEWS'}
];

export interface MenuItem {
    title: string;
    link: string;
    icon: string;
}
