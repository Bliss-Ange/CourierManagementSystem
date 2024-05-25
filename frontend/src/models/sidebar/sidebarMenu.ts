export interface SidebarItemChildInterface {
    text : string;
    url : string;
}

export interface SidebarItemInterface {
    haveDropdown : boolean;
    icon : string;
    text : string;
    url? : string;
    dropdownItem? : SidebarItemChildInterface[];
}

export interface SidebarListInterface {
    title : string;
    items : SidebarItemInterface[]
}