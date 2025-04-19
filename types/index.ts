export type ItemType = 'folder' | 'page';

export interface BaseItem {
  id: string;
  title: string;
  type: ItemType;
}

export interface FolderItem extends BaseItem {
  type: 'folder';
  children: Array<FolderItem | PageItem>;
}

export interface PageItem extends BaseItem {
  type: 'page';
}
