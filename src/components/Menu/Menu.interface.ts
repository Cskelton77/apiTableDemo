interface MenuProps {
    links: Array<MenuItem>
}
interface MenuItem {
    name: string,
    link: string,
    uuid: number,
}

export type { MenuProps, MenuItem }