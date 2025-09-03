import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/SupabaseAuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  PieChart, 
  Pie, 
  Cell, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';
import { 
  Users, 
  Package, 
  TrendingUp, 
  Settings, 
  BarChart3, 
  Monitor,
  Smartphone,
  Tablet,
  Download,
  Info,
  AlertTriangle,
  Calendar,
  FileText,
  Database,
  Zap,
  Eye,
  Clock,
  Activity
} from 'lucide-react';

interface DashboardStats {
  totalProducts: number;
  featuredProducts: number;
  totalCategories: number;
  inStockProducts: number;
  outOfStockProducts: number;
  avgProductPrice: number;
  recentlyAdded: number;
}

interface CategoryData {
  name: string;
  value: number;
  color: string;
}

interface ActivityData {
  date: string;
  products: number;
  views: number;
}

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const [timeRange, setTimeRange] = useState('7');
  const [stats, setStats] = useState<DashboardStats>({
    totalProducts: 0,
    featuredProducts: 0,
    totalCategories: 0,
    inStockProducts: 0,
    outOfStockProducts: 0,
    avgProductPrice: 0,
    recentlyAdded: 0
  });
  const [categoryData, setCategoryData] = useState<CategoryData[]>([]);
  const [activityData, setActivityData] = useState<ActivityData[]>([]);

  useEffect(() => {
    fetchDashboardData();
  }, [timeRange]);

  const fetchDashboardData = async () => {
    try {
      // Fetch products
      const { data: products } = await supabase
        .from('products')
        .select('*, categories(name)');

      // Fetch categories
      const { data: categories } = await supabase
        .from('categories')
        .select('*');

      if (products && categories) {
        const now = new Date();
        const dayRange = parseInt(timeRange);
        const cutoffDate = new Date(now.getTime() - (dayRange * 24 * 60 * 60 * 1000));

        const statsData: DashboardStats = {
          totalProducts: products.length,
          featuredProducts: products.filter(p => p.is_featured).length,
          totalCategories: categories.length,
          inStockProducts: products.filter(p => p.in_stock).length,
          outOfStockProducts: products.filter(p => !p.in_stock).length,
          avgProductPrice: products.reduce((sum, p) => sum + (p.price || 0), 0) / products.length,
          recentlyAdded: products.filter(p => new Date(p.created_at) > cutoffDate).length
        };

        setStats(statsData);

        // Category distribution
        const categoryStats = categories.map(cat => ({
          name: cat.name,
          value: products.filter(p => p.category_id === cat.id).length,
          color: `hsl(${Math.random() * 360}, 70%, 50%)`
        }));
        setCategoryData(categoryStats);

        // Mock activity data for the chart
        const mockActivity = Array.from({ length: parseInt(timeRange) }, (_, i) => {
          const date = new Date(now.getTime() - (i * 24 * 60 * 60 * 1000));
          return {
            date: date.toLocaleDateString('pt-BR', { month: 'short', day: 'numeric' }),
            products: Math.floor(Math.random() * 20) + 5,
            views: Math.floor(Math.random() * 100) + 50
          };
        }).reverse();
        setActivityData(mockActivity);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  const deviceStats = [
    { name: 'Uptime', value: 99.2, color: 'hsl(var(--primary))' },
    { name: 'Last Seen', value: 85.5, color: 'hsl(var(--secondary))' },
    { name: 'Load', value: 67.8, color: 'hsl(var(--accent))' },
    { name: 'Memory Space', value: 45.3, color: 'hsl(var(--destructive))' }
  ];

  const saleAnalytics = {
    online: { value: stats.inStockProducts, label: 'Em Estoque' },
    offline: { value: stats.outOfStockProducts, label: 'Fora de Estoque' },
    onLeave: { value: stats.featuredProducts, label: 'Destacados' }
  };

  const totalCustomers = stats.totalProducts;
  const totalRevenue = stats.avgProductPrice * stats.inStockProducts;

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <div className="bg-card border-b shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Package className="w-4 h-4 text-primary-foreground" />
                </div>
                <h1 className="text-xl font-semibold">Eletro Services</h1>
              </div>
              <div className="hidden md:flex items-center gap-4 text-sm text-muted-foreground">
                <Button variant="ghost" size="sm">Calendar</Button>
                <Button variant="ghost" size="sm" className="text-primary border-b-2 border-primary">
                  Statistics
                </Button>
                <Button variant="ghost" size="sm">Employees</Button>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm">
                <Eye className="w-4 h-4 mr-2" />
                Help Bot
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Button variant="outline" size="sm">
                <Info className="w-4 h-4 mr-2" />
                Info
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-6">
        <div className="flex gap-6">
          {/* Sidebar */}
          <div className="w-64 bg-card rounded-lg p-4 h-fit shadow-sm">
            {/* User Profile */}
            <div className="flex items-center gap-3 mb-6 pb-4 border-b">
              <Avatar>
                <AvatarFallback>{user?.email?.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="font-medium text-sm">Admin User</p>
                <p className="text-xs text-muted-foreground">Last login: now</p>
              </div>
            </div>

            {/* Navigation */}
            <nav className="space-y-2">
              <Button variant="ghost" className="w-full justify-start text-primary bg-primary/10">
                <BarChart3 className="w-4 h-4 mr-3" />
                Dashboard
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <AlertTriangle className="w-4 h-4 mr-3" />
                Notifications
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Users className="w-4 h-4 mr-3" />
                Employees
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <TrendingUp className="w-4 h-4 mr-3" />
                Charts
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Activity className="w-4 h-4 mr-3" />
                Graphs
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <FileText className="w-4 h-4 mr-3" />
                Help
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Database className="w-4 h-4 mr-3" />
                Support
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Settings className="w-4 h-4 mr-3" />
                Settings
              </Button>
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1 space-y-6">
            {/* Top Section */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold">Dashboard Analytics</h2>
                <p className="text-muted-foreground">Your last login was: a few seconds ago</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Last</span>
                <Select value={timeRange} onValueChange={setTimeRange}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7">7 days</SelectItem>
                    <SelectItem value="14">14 days</SelectItem>
                    <SelectItem value="30">30 days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Session by Channel */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Session by Channel</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center relative">
                    <ResponsiveContainer width="100%" height={200}>
                      <PieChart>
                        <Pie
                          data={categoryData}
                          cx="50%"
                          cy="50%"
                          innerRadius={40}
                          outerRadius={80}
                          dataKey="value"
                        >
                          {categoryData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-2xl font-bold">{Math.round((stats.inStockProducts / stats.totalProducts) * 100)}%</div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2 mt-4">
                    {categoryData.slice(0, 5).map((cat, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: cat.color }}
                        />
                        <span className="text-muted-foreground">{cat.name}</span>
                        <span className="ml-auto">{cat.value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Events Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Events</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={activityData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                      <YAxis tick={{ fontSize: 12 }} />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey="views" 
                        stroke="hsl(var(--primary))" 
                        strokeWidth={2}
                        dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Device Stats */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Device Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {deviceStats.map((stat, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">{stat.name}</span>
                        <span className="font-medium">{stat.value}%</span>
                      </div>
                      <Progress value={stat.value} className="h-2" />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Bottom Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Session by Channel Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Session by Channel</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {categoryData.map((cat, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div 
                            className="w-3 h-3 rounded-full" 
                            style={{ backgroundColor: cat.color }}
                          />
                          <span className="text-sm">{cat.name}</span>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium">{cat.value}</div>
                          <div className="text-xs text-muted-foreground">
                            {Math.round((cat.value / stats.totalProducts) * 100)}%
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Sale Analytics */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Product Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-xs text-muted-foreground mb-1">Online</div>
                      <div className="text-lg font-bold text-blue-600">{saleAnalytics.online.value}</div>
                      <div className="text-xs text-muted-foreground">{saleAnalytics.online.label}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-muted-foreground mb-1">Offline</div>
                      <div className="text-lg font-bold text-red-600">{saleAnalytics.offline.value}</div>
                      <div className="text-xs text-muted-foreground">{saleAnalytics.offline.label}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-muted-foreground mb-1">On Leave</div>
                      <div className="text-lg font-bold text-orange-600">{saleAnalytics.onLeave.value}</div>
                      <div className="text-xs text-muted-foreground">{saleAnalytics.onLeave.label}</div>
                    </div>
                  </div>
                  <ResponsiveContainer width="100%" height={100}>
                    <LineChart data={activityData.slice(-7)}>
                      <Line 
                        type="monotone" 
                        dataKey="products" 
                        stroke="hsl(var(--primary))" 
                        strokeWidth={2}
                        dot={false}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="views" 
                        stroke="hsl(var(--destructive))" 
                        strokeWidth={2}
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Summary Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Card Title</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="text-xs text-muted-foreground">Total Products</div>
                      <div className="text-2xl font-bold text-blue-600">{totalCustomers.toLocaleString()}</div>
                      <div className="text-xs text-green-600">1.4% since last month</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">Total Value</div>
                      <div className="text-2xl font-bold text-blue-600">
                        R$ {totalRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </div>
                      <div className="text-xs text-green-600">12% since last month</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;