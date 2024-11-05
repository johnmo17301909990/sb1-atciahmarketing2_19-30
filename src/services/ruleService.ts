import { supabase } from '../lib/supabase';
import { Rule, RuleChange } from '../types/rules';

export const ruleService = {
  // 规则管理
  async createRule(platformId: string, rule: Omit<Rule, 'id' | 'updatedAt'>) {
    const { data, error } = await supabase
      .from('platform_rules')
      .insert([{ ...rule, platform_id: platformId }])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async updateRule(ruleId: string, updates: Partial<Rule>) {
    const { data, error } = await supabase
      .from('platform_rules')
      .update(updates)
      .eq('id', ruleId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async deleteRule(ruleId: string) {
    const { error } = await supabase
      .from('platform_rules')
      .delete()
      .eq('id', ruleId);

    if (error) throw error;
  },

  // 规则变更记录
  async recordRuleChange(change: Omit<RuleChange, 'id' | 'date'>) {
    const { data, error } = await supabase
      .from('rule_changes')
      .insert([{ ...change, date: new Date().toISOString() }])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // 规则影响分析
  async analyzeRuleImpact(platformId: string, ruleIds: string[]) {
    const { data, error } = await supabase.rpc('analyze_rule_impact', {
      p_platform_id: platformId,
      p_rule_ids: ruleIds
    });

    if (error) throw error;
    return data;
  },

  // 运营指导生成
  async generateOperationGuides(platformId: string) {
    const { data, error } = await supabase.rpc('generate_operation_guides', {
      p_platform_id: platformId
    });

    if (error) throw error;
    return data;
  }
};