import React from 'react';
import { Link } from 'react-router-dom';

export function Navbar() {
  return (
    <nav className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold">营销分析平台</Link>
          </div>
          <div className="flex space-x-4">
            <Link to="/" className="px-3 py-2 rounded-md hover:bg-gray-700">
              仪表板
            </Link>
            <Link to="/analytics" className="px-3 py-2 rounded-md hover:bg-gray-700">
              数据分析
            </Link>
            <Link to="/data-sources" className="px-3 py-2 rounded-md hover:bg-gray-700">
              数据源
            </Link>
            <Link to="/rules" className="px-3 py-2 rounded-md hover:bg-gray-700">
              规则管理
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}