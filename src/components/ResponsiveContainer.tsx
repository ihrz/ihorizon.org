
import React from 'react';

interface ResponsiveContainerProps {
  children: React.ReactNode;
  className?: string;
  fullWidth?: boolean;
  noPadding?: boolean;
}

const ResponsiveContainer: React.FC<ResponsiveContainerProps> = ({ 
  children, 
  className = '',
  fullWidth = false,
  noPadding = false
}) => {
  return (
    <div 
      className={`
        container mx-auto 
        ${noPadding ? '' : 'px-4 sm:px-6 lg:px-8'} 
        ${fullWidth ? 'max-w-full' : 'max-w-7xl'} 
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default ResponsiveContainer;
