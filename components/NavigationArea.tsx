import React, { useState, useRef } from 'react';
import { FolderItem, PageItem } from '../types';
import FolderPageItem from './FolderPageItem';

interface NavigationAreaProps {
  items: Array<FolderItem | PageItem>;
  onItemClick: (item: FolderItem | PageItem) => void;
  onReorder: (startIndex: number, endIndex: number) => void;
}

const NavigationArea: React.FC<NavigationAreaProps> = ({ items, onItemClick, onReorder }) => {
  const dragItem = useRef<number | null>(null);
  const dragOverItem = useRef<number | null>(null);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    dragItem.current = index;
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    e.preventDefault();
    dragOverItem.current = index;
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    e.preventDefault();
    if (dragItem.current === null || dragOverItem.current === null) return;
    if (dragItem.current !== dragOverItem.current) {
      onReorder(dragItem.current, dragOverItem.current);
    }
    dragItem.current = null;
    dragOverItem.current = null;
  };

  return (
    <div>
      {items.map((item, index) => (
        <FolderPageItem
          key={item.id}
          item={item}
          onClick={onItemClick}
          draggable={true}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          index={index}
        />
      ))}
    </div>
  );
};

export default NavigationArea;
