import React from 'react';
import { FolderItem, PageItem } from '../types';

interface FolderPageItemProps {
  item: FolderItem | PageItem;
  onClick: (item: FolderItem | PageItem) => void;
  draggable: boolean;
  onDragStart: (e: React.DragEvent<HTMLDivElement>, index: number) => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>, index: number) => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>, index: number) => void;
  index: number;
}

const FolderPageItem: React.FC<FolderPageItemProps> = ({
  item,
  onClick,
  draggable,
  onDragStart,
  onDragOver,
  onDrop,
  index,
}) => {
  return (
    <div
      className="p-2 border rounded mb-2 cursor-pointer bg-white hover:bg-gray-100 flex items-center"
      onClick={() => onClick(item)}
      draggable={draggable}
      onDragStart={(e) => onDragStart(e, index)}
      onDragOver={(e) => onDragOver(e, index)}
      onDrop={(e) => onDrop(e, index)}
    >
      <div className="mr-2">
        {item.type === 'folder' ? '📁' : '📄'}
      </div>
      <div>{item.title}</div>
    </div>
  );
};

export default FolderPageItem;
