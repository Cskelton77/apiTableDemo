interface MenuData {
    links: Array<MenuItem>
}
interface MenuItem {
    name: string,
    link: string,
    uuid: number,
}

export type { MenuData, MenuItem }