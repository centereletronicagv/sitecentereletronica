import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { Globe, Eye, TrendingUp, MapPin } from 'lucide-react';

interface UserAnalytics {
  totalViews: number;
  topCategory: string;
  topProduct: string;
  regions: { region: string; count: number }[];
}

const UserAnalytics: React.FC = () => {
  const [analytics, setAnalytics] = useState<UserAnalytics>({
    totalViews: 0,
    topCategory: 'N/A',
    topProduct: 'N/A',
    regions: []
  });

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    // Fetch user analytics from database
    const { data: viewsData } = await supabase
      .from('user_analytics')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(100);

    if (viewsData) {
      // Process analytics data
      const categoryViews: { [key: string]: number } = {};
      const productViews: { [key: string]: number } = {};
      const regionCounts: { [key: string]: number } = {};

      viewsData.forEach(item => {
        if (item.category) categoryViews[item.category] = (categoryViews[item.category] || 0) + 1;
        if (item.product) productViews[item.product] = (productViews[item.product] || 0) + 1;
        if (item.region) regionCounts[item.region] = (regionCounts[item.region] || 0) + 1;
      });

      const topCategory = Object.entries(categoryViews).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A';
      const topProduct = Object.entries(productViews).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A';
      const regions = Object.entries(regionCounts).map(([region, count]) => ({ region, count }));

      setAnalytics({
        totalViews: viewsData.length,
        topCategory,
        topProduct,
        regions
      });
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Analytics de Usuários
          </CardTitle>
          <CardDescription>Métricas de comportamento dos usuários</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-muted-foreground" />
                <p className="text-sm font-medium">Total de Visualizações</p>
              </div>
              <p className="text-3xl font-bold">{analytics.totalViews}</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-muted-foreground" />
                <p className="text-sm font-medium">Categoria Mais Vista</p>
              </div>
              <p className="text-xl font-bold">{analytics.topCategory}</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-muted-foreground" />
                <p className="text-sm font-medium">Produto Mais Visto</p>
              </div>
              <p className="text-xl font-bold">{analytics.topProduct}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="w-5 h-5" />
            Regiões de Acesso
          </CardTitle>
          <CardDescription>Distribuição geográfica dos usuários</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {analytics.regions.slice(0, 10).map((region, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span className="font-medium">{region.region}</span>
                </div>
                <Badge variant="secondary">{region.count} acessos</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserAnalytics;
