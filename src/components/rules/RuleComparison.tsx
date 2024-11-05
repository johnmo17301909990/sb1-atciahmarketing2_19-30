import React, { useState } from 'react';
import { Tab } from '@headlessui/react';

interface Props {
  platformId: string;
}

export function RuleComparison({ platformId }: Props) {
  const [selectedPlatforms, setSelectedPlatforms] = useState(['tmall', 'jd']);

  // Mock data - 实际项目中从API获取
  const platformRules = {
    tmall: {
      productRules: [
        {
          category: '商品信息',
          rules: [
            {
              title: '商品标题',
              tmall: '60个字符以内，需包含品牌名、商品名、核心卖点',
              jd: '70个字符以内，需包含品牌名、商品名、规格',
              difference: '京东允许更长标题，且强制要求包含规格信息'
            },
            {
              title: '商品主图',
              tmall: '1200x1200px，纯白背景，产品占比80%以上',
              jd: '800x800px，白色背景，产品居中展示',
              difference: '天猫要求更高的图片分辨率和更严格的产品占比'
            }
          ]
        },
        {
          category: '价格展示',
          rules: [
            {
              title: '价格标识',
              tmall: '必须同时展示销售价和划线价',
              jd: '必须展示销售价，划线价可选',
              difference: '天猫强制要求展示划线价'
            }
          ]
        }
      ],
      marketingRules: [
        {
          category: '促销规则',
          rules: [
            {
              title: '优惠展示',
              tmall: '折扣信息必须真实准确，且与实际优惠一致',
              jd: '允许预告优惠信息，但需标注预告标识',
              difference: '京东支持优惠预告功能'
            }
          ]
        }
      ]
    },
    jd: {
      // 京东规则数据结构类似
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">规则对比分析</h3>
        
        <Tab.Group>
          <Tab.List className="flex space-x-1 rounded-xl bg-gray-100 p-1 mb-6">
            {['商品规则', '营销规则', '服务规则'].map((category) => (
              <Tab
                key={category}
                className={({ selected }) =>
                  `w-full rounded-lg py-2.5 text-sm font-medium leading-5
                  ${selected
                    ? 'bg-white shadow text-blue-700'
                    : 'text-gray-600 hover:bg-white/[0.12] hover:text-blue-600'
                  }`
                }
              >
                {category}
              </Tab>
            ))}
          </Tab.List>

          <Tab.Panels>
            <Tab.Panel>
              {platformRules.tmall.productRules.map((section) => (
                <div key={section.category} className="mb-8">
                  <h4 className="text-lg font-semibold mb-4">{section.category}</h4>
                  <div className="space-y-6">
                    {section.rules.map((rule) => (
                      <div key={rule.title} className="bg-gray-50 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-4">
                          <h5 className="font-semibold">{rule.title}</h5>
                          <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                            规则差异
                          </span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <span className="text-red-600">天猫</span>
                              <span className="text-sm text-gray-600">{rule.tmall}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className="text-blue-600">京东</span>
                              <span className="text-sm text-gray-600">{rule.jd}</span>
                            </div>
                          </div>
                          <div className="bg-yellow-50 p-3 rounded-lg">
                            <p className="text-sm text-gray-600">
                              <span className="font-medium text-yellow-800">差异说明：</span>
                              {rule.difference}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </Tab.Panel>

            <Tab.Panel>
              {platformRules.tmall.marketingRules.map((section) => (
                <div key={section.category} className="mb-8">
                  <h4 className="text-lg font-semibold mb-4">{section.category}</h4>
                  <div className="space-y-6">
                    {section.rules.map((rule) => (
                      <div key={rule.title} className="bg-gray-50 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-4">
                          <h5 className="font-semibold">{rule.title}</h5>
                          <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                            规则差异
                          </span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <span className="text-red-600">天猫</span>
                              <span className="text-sm text-gray-600">{rule.tmall}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className="text-blue-600">京东</span>
                              <span className="text-sm text-gray-600">{rule.jd}</span>
                            </div>
                          </div>
                          <div className="bg-yellow-50 p-3 rounded-lg">
                            <p className="text-sm text-gray-600">
                              <span className="font-medium text-yellow-800">差异说明：</span>
                              {rule.difference}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">规则合规建议</h3>
        <div className="space-y-4">
          <div className="border-l-4 border-blue-400 pl-4">
            <h4 className="font-semibold">商品信息优化</h4>
            <p className="text-sm text-gray-600 mt-1">
              建议采用更严格的标准，同时满足天猫和京东的要求：
              - 商品标题控制在60字符以内
              - 主图使用1200x1200px规格
              - 确保包含品牌名、商品名、规格和核心卖点
            </p>
          </div>
          <div className="border-l-4 border-green-400 pl-4">
            <h4 className="font-semibold">价格展示策略</h4>
            <p className="text-sm text-gray-600 mt-1">
              统一展示销售价和划线价，符合天猫要求的同时也满足京东规则
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}