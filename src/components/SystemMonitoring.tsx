import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Server, 
  Database, 
  Wifi, 
  HardDrive, 
  Cpu, 
  MemoryStick,
  AlertTriangle,
  CheckCircle,
  RefreshCw,
  Activity
} from 'lucide-react';

interface SystemMetric {
  name: string;
  value: number;
  status: 'healthy' | 'warning' | 'critical';
  icon: React.ElementType;
  unit: string;
}

const SystemMonitoring: React.FC = () => {
  const [metrics, setMetrics] = useState<SystemMetric[]>([
    { name: 'CPU Usage', value: 45, status: 'healthy', icon: Cpu, unit: '%' },
    { name: 'Memory Usage', value: 72, status: 'warning', icon: MemoryStick, unit: '%' },
    { name: 'Disk Space', value: 89, status: 'critical', icon: HardDrive, unit: '%' },
    { name: 'Network', value: 23, status: 'healthy', icon: Wifi, unit: 'Mbps' },
  ]);

  const [services, setServices] = useState([
    { name: 'Database', status: 'healthy', uptime: '99.9%', responseTime: '12ms' },
    { name: 'API Server', status: 'healthy', uptime: '99.8%', responseTime: '45ms' },
    { name: 'File Storage', status: 'warning', uptime: '98.5%', responseTime: '120ms' },
    { name: 'Authentication', status: 'healthy', uptime: '99.9%', responseTime: '8ms' },
  ]);

  const refreshMetrics = () => {
    // Simulate real-time data updates
    setMetrics(prev => prev.map(metric => ({
      ...metric,
      value: Math.max(0, Math.min(100, metric.value + (Math.random() - 0.5) * 10))
    })));
  };

  const [isActive, setIsActive] = useState(true);
  const [dbMetrics, setDbMetrics] = useState({
    connections: 24,
    responseTime: 12,
    storageUsed: 2.4
  });

  const refreshDbMetrics = async () => {
    // Simulate database metrics update
    setDbMetrics({
      connections: Math.floor(20 + Math.random() * 10),
      responseTime: Math.floor(10 + Math.random() * 5),
      storageUsed: 2.4 + Math.random() * 0.2
    });
  };

  useEffect(() => {
    // System metrics refresh every 5 seconds
    const systemInterval = setInterval(refreshMetrics, 5000);
    
    // Database metrics refresh every 1 second when active
    let dbInterval: NodeJS.Timeout | null = null;
    if (isActive) {
      dbInterval = setInterval(refreshDbMetrics, 1000);
    }
    
    return () => {
      clearInterval(systemInterval);
      if (dbInterval) clearInterval(dbInterval);
    };
  }, [isActive]);

  // Detect if component is visible (user is on monitoring tab)
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsActive(!document.hidden);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'text-green-600 bg-green-100';
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      case 'critical': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getProgressColor = (value: number) => {
    if (value < 50) return 'bg-green-500';
    if (value < 80) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="space-y-6">
      {/* System Overview */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Server className="w-5 h-5" />
              System Overview
            </CardTitle>
            <CardDescription>Real-time system performance metrics</CardDescription>
          </div>
          <Button variant="outline" size="sm" onClick={refreshMetrics}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {metrics.map((metric, index) => (
              <div key={index} className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <metric.icon className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm font-medium">{metric.name}</span>
                  </div>
                  <Badge className={getStatusColor(metric.status)}>
                    {metric.status}
                  </Badge>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Usage</span>
                    <span className="font-medium">{metric.value.toFixed(1)}{metric.unit}</span>
                  </div>
                  <Progress 
                    value={metric.value} 
                    className={`h-2 ${getProgressColor(metric.value)}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Service Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5" />
            Service Status
          </CardTitle>
          <CardDescription>Monitor the health of all system services</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {services.map((service, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  {service.status === 'healthy' ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : (
                    <AlertTriangle className="w-5 h-5 text-yellow-600" />
                  )}
                  <div>
                    <p className="font-medium">{service.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Uptime: {service.uptime}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge className={getStatusColor(service.status)}>
                    {service.status}
                  </Badge>
                  <p className="text-sm text-muted-foreground mt-1">
                    Response: {service.responseTime}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Database Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="w-5 h-5" />
            Database Performance
          </CardTitle>
          <CardDescription>Monitor database health and performance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <p className="text-sm font-medium">Active Connections</p>
              <p className="text-2xl font-bold">{dbMetrics.connections}</p>
              <p className="text-xs text-green-600">Normal range</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium">Query Response Time</p>
              <p className="text-2xl font-bold">{dbMetrics.responseTime}ms</p>
              <p className="text-xs text-green-600">Excellent</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium">Storage Used</p>
              <p className="text-2xl font-bold">{dbMetrics.storageUsed.toFixed(1)}GB</p>
              <p className="text-xs text-muted-foreground">of 10GB limit</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SystemMonitoring;