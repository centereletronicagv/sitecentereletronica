import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { supabase } from '@/integrations/supabase/client';
import { FileText, User, Package, BarChart3, Trash2, Edit, Plus, Globe } from 'lucide-react';

interface ActivityLog {
  id: string;
  action: string;
  entity_type: string;
  entity_id: string;
  entity_name?: string;
  user_email: string;
  user_id?: string;
  created_at: string;
  details?: any;
  ip_address?: string;
}

const ActivityLogs: React.FC = () => {
  const [logs, setLogs] = useState<ActivityLog[]>([]);

  useEffect(() => {
    fetchLogs();
    
    // Subscribe to realtime changes
    const channel = supabase
      .channel('activity_logs_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'activity_logs'
        },
        () => {
          fetchLogs();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchLogs = async () => {
    const { data } = await supabase
      .from('activity_logs')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(50);

    if (data) {
      setLogs(data);
    }
  };

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'create': return Plus;
      case 'update': return Edit;
      case 'delete': return Trash2;
      default: return FileText;
    }
  };

  const getEntityIcon = (entityType: string) => {
    switch (entityType) {
      case 'product': return Package;
      case 'category': return BarChart3;
      case 'user': return User;
      default: return FileText;
    }
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case 'create': return 'text-green-600 bg-green-100';
      case 'update': return 'text-blue-600 bg-blue-100';
      case 'delete': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <Card className="border-white/10 bg-gradient-to-br from-[#1a1a1a] to-[#111111]">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <FileText className="w-5 h-5 text-orange-400" />
          Registro de Atividades
        </CardTitle>
        <CardDescription className="text-gray-400">Histórico de alterações no sistema</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[600px] pr-4">
          <div className="space-y-3">
            {logs.map((log) => {
              const ActionIcon = getActionIcon(log.action);
              const EntityIcon = getEntityIcon(log.entity_type);

              return (
                <div key={log.id} className="flex items-start gap-4 p-4 border border-white/5 rounded-lg bg-[#1a1a1a] hover:border-orange-500/20 transition-colors">
                  <div className="flex gap-2">
                    <EntityIcon className="w-5 h-5 text-gray-400 mt-0.5" />
                    <ActionIcon className="w-4 h-4 text-gray-400 mt-0.5" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge className={getActionColor(log.action)}>
                        {log.action}
                      </Badge>
                      <span className="text-sm font-medium capitalize text-white">
                        {log.entity_type}
                      </span>
                    </div>
                    {log.entity_name && (
                      <p className="text-sm text-gray-300">
                        {log.entity_name}
                      </p>
                    )}
                    <div className="flex flex-col gap-1 text-xs text-gray-400">
                      <div className="flex items-center gap-2">
                        <User className="w-3 h-3" />
                        <span>{log.user_email}</span>
                      </div>
                      {log.ip_address && (
                        <div className="flex items-center gap-2">
                          <Globe className="w-3 h-3" />
                          <span>IP: {log.ip_address}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        <FileText className="w-3 h-3" />
                        <span>{new Date(log.created_at).toLocaleString('pt-BR', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                          second: '2-digit'
                        })}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default ActivityLogs;
