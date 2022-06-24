import React from 'react';

interface LayoutProps {
  title?: string;
  canGoBack?: boolean;
  children: React.ReactNode;
  hasTabBar?: boolean;
}

const Layout = ({ title, canGoBack, hasTabBar, children }: LayoutProps) => {
  return (
    <div className="lg:max-w-7xl mx-auto">
      <div className="bg-white w-full text-lg font-medium fixed text-gray-700 top-0">
        {title}
      </div>
      {children}
      {hasTabBar ? <nav></nav> : null}
    </div>
  );
};

export default Layout;
