import { useState, useEffect } from 'react';

interface Rule {
  id: string;
  title: string;
  category: string;
  summary: string;
  severity: 'high' | 'medium' | 'low';
  effectiveDate: string;
  updatedAt: string;
}

interface Category {
  id: string;
  name: string;
}

// Mock data
const mockRules: Rule[] = [
  {
    id: '1',
    title: '搜索标题长度限制',
    category: '搜索优化',
    summary: '商品标题长度不得超过60个字符，需包含品牌名、商品名、核心卖点',
    severity: 'high',
    effectiveDate: '2024-02-01',
    updatedAt: '2024-01-20'
  },
  {
    id: '2',
    title: '关键词密度要求',
    category: '搜索优化',
    summary: '核心关键词密度不得超过8%，避免过度堆砌关键词',
    severity: 'medium',
    effectiveDate: '2024-02-01',
    updatedAt: '2024-01-20'
  },
  {
    id: '3',
    title: '搜索权重算法更新',
    category: '搜索优化',
    summary: '新增用户行为数据对搜索排名的影响权重，包括停留时间、点击率等指标',
    severity: 'high',
    effectiveDate: '2024-02-15',
    updatedAt: '2024-01-20'
  },
  {
    id: '4',
    title: '商品主图规范',
    category: '商品展示',
    summary: '主图尺寸不小于1200x1200px，背景纯白，产品占比不低于80%',
    severity: 'medium',
    effectiveDate: '2024-02-01',
    updatedAt: '2024-01-20'
  },
  {
    id: '5',
    title: '促销展示规则',
    category: '营销推广',
    summary: '促销信息必须真实准确，且与实际优惠金额一致',
    severity: 'high',
    effectiveDate: '2024-02-01',
    updatedAt: '2024-01-20'
  }
];

const mockCategories: Category[] = [
  { id: 'search', name: '搜索优化' },
  { id: 'product', name: '商品展示' },
  { id: 'marketing', name: '营销推广' },
  { id: 'service', name: '服务规范' }
];

export function useRuleLibrary(platformId: string) {
  const [rules, setRules] = useState<Rule[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // 模拟API请求延迟
    const timer = setTimeout(() => {
      setRules(mockRules);
      setCategories(mockCategories);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [platformId]);

  return { rules, categories, loading, error };
}