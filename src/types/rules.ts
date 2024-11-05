export interface Rule {
  id: string;
  title: string;
  category: string;
  summary: string;
  content: string;
  scope: string;
  severity: 'high' | 'medium' | 'low';
  effectiveDate: string;
  updatedAt: string;
  status: 'active' | 'inactive';
}

export interface RuleCategory {
  id: string;
  name: string;
  description?: string;
}

export interface RuleChange {
  id: string;
  type: 'add' | 'update' | 'remove';
  category: string;
  title: string;
  description: string;
  date: string;
  oldValue?: string;
  newValue?: string;
  affectedProducts: number;
  conversionImpact: string;
}

export interface RuleImpactData {
  affectedProducts: number;
  productPercentage: number;
  conversionChange: number;
  trafficImpact: number;
  complianceRate: number;
  complianceImprovement: number;
  trends: Array<{
    date: string;
    conversion: number;
    traffic: number;
    compliance: number;
  }>;
  categoryImpacts: Array<{
    category: string;
    affectedProducts: number;
    impactScore: number;
  }>;
  riskAnalysis: Array<{
    type: string;
    violationCount: number;
    violationRate: number;
    severity: 'high' | 'medium' | 'low';
    suggestion: string;
  }>;
}

export interface OperationGuide {
  id: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  action: string;
  impact: string;
  deadline?: string;
  relatedRules?: Array<{
    id: string;
    name: string;
  }>;
}