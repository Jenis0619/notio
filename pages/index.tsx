import React, { useState, useEffect } from 'react';
import { FolderItem, PageItem } from '../types';
import Breadcrumbs from '../components/Breadcrumbs';
import NavigationArea from '../components/NavigationArea';
import { saveData, loadData } from '../utils/storage';
import { v4 as uuidv4 } from 'uuid';

const initialData: FolderItem = {
  id: 'root',
  title: 'Home',
  type: 'folder',
  children: [],
};

export default function Home() {
  const [data, setData] = useState<FolderItem>(initialData);
  const [currentPath, setCurrentPath] = useState<string[]>(['Home']);
  const [currentFolder, setCurrentFolder] = useState<FolderItem>(initialData);

  useEffect(() => {
    const saved = loadData();
    if (saved) {
      setData(saved);
      setCurrentFolder(saved);
      setCurrentPath([saved.title]);
    }
  }, []);

  useEffect(() => {
    saveData(data);
  }, [data]);

  const findFolderByPath = (path: string[], folder: FolderItem): FolderItem | null => {
    if (path.length === 0) return folder;
    const [head, ...rest] = path;
    if (folder.title !== head) return null;
    if (rest.length === 0) return folder;
    for (const child of folder.children) {
      if (child.type === 'folder' && child.title === rest[0]) {
        return findFolderByPath(rest, child);
      }
    }
    return null;
  };

  const handleNavigate = (index: number) => {
    const newPath = currentPath.slice(0, index + 1);
    const folder = findFolderByPath(newPath, data);
    if (folder) {
      setCurrentPath(newPath);
      setCurrentFolder(folder);
    }
  };

  const handleItemClick = (item: FolderItem | PageItem) => {
    if (item.type === 'folder') {
      // Avoid duplicating folder title if already last in path
      if (currentPath[currentPath.length - 1] !== item.title) {
        setCurrentPath([...currentPath, item.title]);
      }
      const folder = findFolderByPath([...currentPath, item.title], data);
      if (folder) {
        setCurrentFolder(folder);
      }
    }
  };

  const handleReorder = (startIndex: number, endIndex: number) => {
    const newChildren = Array.from(currentFolder.children);
    const [removed] = newChildren.splice(startIndex, 1);
    newChildren.splice(endIndex, 0, removed);
    const updateFolder = (folder: FolderItem, path: string[]): FolderItem => {
      if (folder.title === path[0]) {
        if (path.length === 1) {
          return { ...folder, children: newChildren };
        }
        return {
          ...folder,
          children: folder.children.map((child) =>
            child.type === 'folder' && child.title === path[1]
              ? updateFolder(child, path.slice(1))
              : child
          ),
        };
      }
      return folder;
    };
    const newData = updateFolder(data, currentPath);
    setData(newData);
    const folderAtPath = findFolderByPath(currentPath, newData);
    if (folderAtPath) {
      setCurrentFolder(folderAtPath);
    }
  };

  const handleAddFolder = () => {
    const title = prompt('Enter folder title');
    if (!title) return;
    const newFolder: FolderItem = {
      id: uuidv4(),
      title,
      type: 'folder',
      children: [],
    };
    const newChildren = [...currentFolder.children, newFolder];
    const updateFolder = (folder: FolderItem, path: string[]): FolderItem => {
      if (folder.title === path[0]) {
        if (path.length === 1) {
          return { ...folder, children: newChildren };
        }
        return {
          ...folder,
          children: folder.children.map((child) =>
            child.type === 'folder' && child.title === path[1]
              ? updateFolder(child, path.slice(1))
              : child
          ),
        };
      }
      return folder;
    };
    const newData = updateFolder(data, currentPath);
    setData(newData);
    const folderAtPath = findFolderByPath(currentPath, newData);
    if (folderAtPath) {
      setCurrentFolder(folderAtPath);
    }
  };

  const handleAddPage = () => {
    const title = prompt('Enter page title');
    if (!title) return;
    const newPage: PageItem = {
      id: uuidv4(),
      title,
      type: 'page',
    };
    const newChildren = [...currentFolder.children, newPage];
    const updateFolder = (folder: FolderItem, path: string[]): FolderItem => {
      if (folder.title === path[0]) {
        if (path.length === 1) {
          return { ...folder, children: newChildren };
        }
        return {
          ...folder,
          children: folder.children.map((child) =>
            child.type === 'folder' && child.title === path[1]
              ? updateFolder(child, path.slice(1))
              : child
          ),
        };
      }
      return folder;
    };
    const newData = updateFolder(data, currentPath);
    setData(newData);
    const folderAtPath = findFolderByPath(currentPath, newData);
    if (folderAtPath) {
      setCurrentFolder(folderAtPath);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <Breadcrumbs path={currentPath} onNavigate={handleNavigate} />
      <div className="mb-4 space-x-2">
        <button
          onClick={handleAddFolder}
          className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Add Folder
        </button>
        <button
          onClick={handleAddPage}
          className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Add Page
        </button>
      </div>
      <NavigationArea
        items={currentFolder.children}
        onItemClick={handleItemClick}
        onReorder={handleReorder}
      />
    </div>
  );
}
