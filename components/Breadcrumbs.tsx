import React from 'react';

interface BreadcrumbsProps {
  path: string[];
  onNavigate: (index: number) => void;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ path, onNavigate }) => {
  return (
    <nav className="flex space-x-2 text-sm text-gray-600 mb-4">
      {path.map((folder, index) => (
        <React.Fragment key={index}>
          <button
            className="hover:underline focus:outline-none"
            onClick={() => onNavigate(index)}
          >
            {folder}
          </button>
          {index < path.length - 1 && <span>/</span>}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumbs;
