import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { OperationGuide } from '../types/rules';

export function useOperationGuide(platformId: string) {
  const [guides, setGuides] = useState<{
    summary: any[];
    categories: Array<{
      id: string;
      name: string;
      guides: OperationGuide[];
    }>;
  }>({ summary: [], categories: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchGuides = async () => {
      try {
        setLoading(true);

        // 获取运营指导数据
        const { data: guidesData, error: guidesError } = await supabase
          .from('operation_guides')
          .select(`
            *,
            related_rules (
              id,
              name
            )
          `)
          .eq('platform_id', platformId);

        if (guidesError) throw guidesError;

        // 获取分类数据
        const { data: categoriesData, error: categoriesError } = await supabase
          .from('guide_categories')
          .select('*')
          .eq('platform_id', platformId);

        if (categoriesError) throw categoriesError;

        // 组织数据结构
        const summary = guidesData
          .filter(guide => guide.is_summary)
          .map(guide => ({
            id: guide.id,
            title: guide.title,
            description: guide.description,
            priority: guide.priority,
            icon: guide.icon
          }));

        const categories = categoriesData.map(category => ({
          id: category.id,
          name: category.name,
          guides: guidesData
            .filter(guide => !guide.is_summary && guide.category_id === category.id)
            .map(guide => ({
              id: guide.id,
              title: guide.title,
              description: guide.description,
              priority: guide.priority,
              action: guide.action,
              impact: guide.impact,
              deadline: guide.deadline,
              relatedRules: guide.related_rules
            }))
        }));

        setGuides({ summary, categories });
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch operation guides'));
      } finally {
        setLoading(false);
      }
    };

    fetchGuides();
  }, [platformId]);

  return { guides, loading, error };
}