import React from 'react';
import { Link } from 'react-router-dom';

export function Dashboard() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">仪表板</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link 
          to="/analytics" 
          className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow"
        >
          <h3 className="text-lg font-semibold mb-2">数据分析</h3>
          <p className="text-gray-600">查看各平台销售和运营数据分析</p>
        </Link>
        <Link 
          to="/data-sources" 
          className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow"
        >
          <h3 className="text-lg font-semibold mb-2">数据源</h3>
          <p className="text-gray-600">管理数据源和同步设置</p>
        </Link>
        <Link 
          to="/rules" 
          className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow"
        >
          <h3 className="text-lg font-semibold mb-2">规则管理</h3>
          <p className="text-gray-600">查看和管理平台规则</p>
        </Link>
      </div>
    </div>
  );
}