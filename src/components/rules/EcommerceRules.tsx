import React from 'react';
import { Tab } from '@headlessui/react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

interface Props {
  platformId: string;
}

export function EcommerceRules({ platformId }: Props) {
  const rules = {
    productRules: [
      {
        id: '1',
        category: '商品信息规范',
        rules: [
          {
            title: '商品标题规范',
            content: '标题字数限制在60个字符以内，需包含品牌名、商品名、核心卖点',
            status: 'active',
            updateDate: '2024-01-20'
          },
          {
            title: '商品主图要求',
            content: '主图尺寸不小于1200x1200px，背景纯白，产品占比不低于80%',
            status: 'active',
            updateDate: '2024-01-20'
          }
        ]
      },
      {
        id: '2',
        category: '价格展示规范',
        rules: [
          {
            title: '价格标识规范',
            content: '必须同时展示销售价和划线价，且销售价不得高于划线价',
            status: 'active',
            updateDate: '2024-01-20'
          }
        ]
      }
    ],
    marketingRules: [
      {
        id: '3',
        category: '促销规则',
        rules: [
          {
            title: '优惠力度展示',
            content: '折扣信息必须真实准确，且与实际优惠金额一致',
            status: 'active',
            updateDate: '2024-01-20'
          },
          {
            title: '促销时间规范',
            content: '促销活动时间必须明确标示，且不得随意变更',
            status: 'active',
            updateDate: '2024-01-20'
          }
        ]
      }
    ],
    serviceRules: [
      {
        id: '4',
        category: '售后服务规范',
        rules: [
          {
            title: '退换货规则',
            content: '明确标示7天无理由退货政策，特殊商品需说明例外情况',
            status: 'active',
            updateDate: '2024-01-20'
          },
          {
            title: '发货时效',
            content: '订单支付后24小时内发货，节假日另行说明',
            status: 'active',
            updateDate: '2024-01-20'
          }
        ]
      }
    ]
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">电商规则库</h2>
        <div className="relative">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="搜索规则..."
            className="pl-10 pr-4 py-2 border rounded-lg"
          />
        </div>
      </div>

      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
          {['商品规范', '营销规则', '服务规范'].map((category) => (
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

        <Tab.Panels className="mt-4">
          <Tab.Panel>
            <div className="space-y-6">
              {rules.productRules.map((section) => (
                <div key={section.id} className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-semibold mb-4">{section.category}</h3>
                  <div className="space-y-4">
                    {section.rules.map((rule, index) => (
                      <div key={index} className="border-l-4 border-blue-400 pl-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-semibold">{rule.title}</h4>
                            <p className="text-sm text-gray-600 mt-1">{rule.content}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-500">
                              更新于 {rule.updateDate}
                            </span>
                            <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                              生效中
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Tab.Panel>

          <Tab.Panel>
            <div className="space-y-6">
              {rules.marketingRules.map((section) => (
                <div key={section.id} className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-semibold mb-4">{section.category}</h3>
                  <div className="space-y-4">
                    {section.rules.map((rule, index) => (
                      <div key={index} className="border-l-4 border-blue-400 pl-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-semibold">{rule.title}</h4>
                            <p className="text-sm text-gray-600 mt-1">{rule.content}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-500">
                              更新于 {rule.updateDate}
                            </span>
                            <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                              生效中
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Tab.Panel>

          <Tab.Panel>
            <div className="space-y-6">
              {rules.serviceRules.map((section) => (
                <div key={section.id} className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-semibold mb-4">{section.category}</h3>
                  <div className="space-y-4">
                    {section.rules.map((rule, index) => (
                      <div key={index} className="border-l-4 border-blue-400 pl-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-semibold">{rule.title}</h4>
                            <p className="text-sm text-gray-600 mt-1">{rule.content}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-500">
                              更新于 {rule.updateDate}
                            </span>
                            <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                              生效中
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}