import React from 'react';

interface Props {
  platformId: string;
}

export function OperationGuide({ platformId }: Props) {
  // Mock data
  const guides = {
    summary: [
      {
        id: '1',
        title: '商品信息优化',
        description: '根据新规则优化商品标题和描述',
        priority: 'high',
        icon: '📝'
      },
      {
        id: '2',
        title: '图片质量提升',
        description: '提高商品主图清晰度和质量',
        priority: 'medium',
        icon: '🖼️'
      },
      {
        id: '3',
        title: '价格合规检查',
        description: '检查并调整价格显示方式',
        priority: 'high',
        icon: '💰'
      }
    ],
    categories: [
      {
        id: '1',
        name: '商品信息优化',
        guides: [
          {
            id: '1',
            title: '标题优化指南',
            description: '如何编写符合新规则的商品标题',
            priority: 'high',
            action: '1. 检查标题长度\n2. 添加核心关键词\n3. 突出产品卖点',
            impact: '预计可提升搜索排名15%',
            deadline: '2024-02-01'
          }
        ]
      },
      {
        id: '2',
        name: '图片规范',
        guides: [
          {
            id: '2',
            title: '主图优化指南',
            description: '提升商品主图质量的具体方法',
            priority: 'medium',
            action: '1. 提高图片分辨率\n2. 优化背景颜色\n3. 突出产品细节',
            impact: '预计可提升点击率8%',
            deadline: '2024-02-15'
          }
        ]
      }
    ]
  };

  return (
    <div className="space-y-6">
      {/* 运营指导概览 */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">运营优化建议</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {guides.summary.map((item) => (
            <div key={item.id} className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${
                  item.priority === 'high'
                    ? 'bg-red-100'
                    : item.priority === 'medium'
                    ? 'bg-yellow-100'
                    : 'bg-green-100'
                }`}>
                  {item.icon}
                </div>
                <div>
                  <h4 className="font-semibold">{item.title}</h4>
                  <p className="text-sm text-gray-500">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 详细指导建议 */}
      <div className="space-y-6">
        {guides.categories.map((category) => (
          <div key={category.id} className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">{category.name}</h3>
            <div className="space-y-4">
              {category.guides.map((guide) => (
                <div key={guide.id} className="border-l-4 border-blue-400 pl-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold">{guide.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">{guide.description}</p>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      guide.priority === 'high'
                        ? 'bg-red-100 text-red-800'
                        : guide.priority === 'medium'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {guide.priority === 'high' ? '重要' :
                       guide.priority === 'medium' ? '建议' : '参考'}
                    </span>
                  </div>
                  
                  <div className="mt-4 space-y-2">
                    <div className="flex items-start">
                      <span className="text-sm font-medium text-gray-500 w-20">执行建议：</span>
                      <span className="text-sm text-gray-600">{guide.action}</span>
                    </div>
                    <div className="flex items-start">
                      <span className="text-sm font-medium text-gray-500 w-20">预期效果：</span>
                      <span className="text-sm text-gray-600">{guide.impact}</span>
                    </div>
                    {guide.deadline && (
                      <div className="flex items-start">
                        <span className="text-sm font-medium text-gray-500 w-20">建议完成：</span>
                        <span className="text-sm text-gray-600">{guide.deadline}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}