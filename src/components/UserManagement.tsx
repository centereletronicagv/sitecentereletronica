import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import { 
  Users, 
  UserPlus, 
  Search, 
  Mail, 
  Calendar, 
  Shield, 
  MoreHorizontal,
  Settings,
  Ban,
  CheckCircle,
  Activity,
  Clock,
  LogIn
} from 'lucide-react';

interface Profile {
  id: string;
  user_id: string;
  email: string;
  role: string;
  created_at: string;
  updated_at: string;
}

interface ActivityLog {
  id: string;
  action: string;
  entity_type: string;
  entity_name: string | null;
  created_at: string;
}

interface UserAnalytic {
  id: string;
  event_type: string;
  created_at: string;
  category: string | null;
  product: string | null;
}

const UserManagement: React.FC = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProfiles, setFilteredProfiles] = useState<Profile[]>([]);
  const [selectedRole, setSelectedRole] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<Profile | null>(null);
  const [userActivity, setUserActivity] = useState<ActivityLog[]>([]);
  const [userLogins, setUserLogins] = useState<UserAnalytic[]>([]);
  const [activityLoading, setActivityLoading] = useState(false);

  useEffect(() => {
    fetchProfiles();
  }, []);

  useEffect(() => {
    filterProfiles();
  }, [profiles, searchTerm, selectedRole]);

  const fetchProfiles = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProfiles(data || []);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Erro ao carregar usuários"
      });
    } finally {
      setLoading(false);
    }
  };

  const filterProfiles = () => {
    let filtered = profiles;

    if (searchTerm) {
      filtered = filtered.filter(profile => 
        profile.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedRole !== 'all') {
      filtered = filtered.filter(profile => profile.role === selectedRole);
    }

    setFilteredProfiles(filtered);
  };

  const updateUserRole = async (userId: string, newRole: 'admin' | 'user') => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ role: newRole })
        .eq('user_id', userId);

      if (error) throw error;

      toast({
        title: "Sucesso",
        description: "Função do usuário atualizada"
      });
      fetchProfiles();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Erro ao atualizar função do usuário"
      });
    }
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-800';
      case 'user': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getInitials = (email: string) => {
    return email.charAt(0).toUpperCase();
  };

  const fetchUserActivity = async (userId: string) => {
    setActivityLoading(true);
    try {
      // Buscar logs de atividade
      const { data: activityData, error: activityError } = await supabase
        .from('activity_logs')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(10);

      if (activityError) throw activityError;
      setUserActivity(activityData || []);

      // Buscar histórico de login
      const { data: loginData, error: loginError } = await supabase
        .from('user_analytics')
        .select('*')
        .eq('user_id', userId)
        .eq('event_type', 'login')
        .order('created_at', { ascending: false })
        .limit(10);

      if (loginError) throw loginError;
      setUserLogins(loginData || []);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Erro ao carregar histórico do usuário"
      });
    } finally {
      setActivityLoading(false);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center p-8">Carregando usuários...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Gerenciamento de Usuários
          </CardTitle>
          <CardDescription>
            Visualize e gerencie usuários do sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Buscar por email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedRole} onValueChange={setSelectedRole}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filtrar por função" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as funções</SelectItem>
                <SelectItem value="admin">Administrador</SelectItem>
                <SelectItem value="user">Usuário</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* User Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium">Total de Usuários</span>
            </div>
            <p className="text-2xl font-bold mt-2">{profiles.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-red-600" />
              <span className="text-sm font-medium">Administradores</span>
            </div>
            <p className="text-2xl font-bold mt-2">
              {profiles.filter(p => p.role === 'admin').length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Settings className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium">Últimos 30 dias</span>
            </div>
            <p className="text-2xl font-bold mt-2">
              {profiles.filter(p => {
                const thirtyDaysAgo = new Date();
                thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
                return new Date(p.created_at) > thirtyDaysAgo;
              }).length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium">Usuários Ativos</span>
            </div>
            <p className="text-2xl font-bold mt-2">
              {profiles.filter(p => p.role === 'user').length}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Users List */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Usuários</CardTitle>
          <CardDescription>
            {filteredProfiles.length} usuário(s) encontrado(s)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredProfiles.map((profile) => (
              <div key={profile.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback>{getInitials(profile.email)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{profile.email}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Calendar className="w-3 h-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">
                        Criado em {new Date(profile.created_at).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={getRoleBadgeColor(profile.role)}>
                    {profile.role}
                  </Badge>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          setSelectedUser(profile);
                          fetchUserActivity(profile.user_id);
                        }}
                      >
                        <Activity className="w-4 h-4 mr-1" />
                        Histórico
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Histórico de {profile.email}</DialogTitle>
                        <DialogDescription>
                          Visualize o histórico de login e atividades
                        </DialogDescription>
                      </DialogHeader>
                      
                      {activityLoading ? (
                        <div className="flex items-center justify-center p-8">
                          Carregando histórico...
                        </div>
                      ) : (
                        <div className="space-y-6">
                          {/* Histórico de Login */}
                          <div>
                            <h3 className="font-semibold mb-3 flex items-center gap-2">
                              <LogIn className="w-4 h-4" />
                              Histórico de Login
                            </h3>
                            {userLogins.length > 0 ? (
                              <div className="space-y-2">
                                {userLogins.map((login) => (
                                  <div key={login.id} className="p-3 border rounded-lg bg-muted/30">
                                    <div className="flex items-center justify-between">
                                      <div className="flex items-center gap-2">
                                        <Clock className="w-3 h-3 text-muted-foreground" />
                                        <span className="text-sm">
                                          {new Date(login.created_at).toLocaleString('pt-BR')}
                                        </span>
                                      </div>
                                      <Badge variant="outline" className="text-xs">Login</Badge>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <p className="text-sm text-muted-foreground">Nenhum login registrado</p>
                            )}
                          </div>

                          {/* Histórico de Atividades */}
                          <div>
                            <h3 className="font-semibold mb-3 flex items-center gap-2">
                              <Activity className="w-4 h-4" />
                              Atividades Recentes
                            </h3>
                            {userActivity.length > 0 ? (
                              <div className="space-y-2">
                                {userActivity.map((activity) => (
                                  <div key={activity.id} className="p-3 border rounded-lg bg-muted/30">
                                    <div className="flex items-center justify-between mb-1">
                                      <Badge variant="outline" className="text-xs">
                                        {activity.action}
                                      </Badge>
                                      <div className="flex items-center gap-2">
                                        <Clock className="w-3 h-3 text-muted-foreground" />
                                        <span className="text-xs text-muted-foreground">
                                          {new Date(activity.created_at).toLocaleString('pt-BR')}
                                        </span>
                                      </div>
                                    </div>
                                    <p className="text-sm">
                                      {activity.entity_type}: {activity.entity_name || 'N/A'}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <p className="text-sm text-muted-foreground">Nenhuma atividade registrada</p>
                            )}
                          </div>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Settings className="w-4 h-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Gerenciar Usuário</DialogTitle>
                        <DialogDescription>
                          Altere a função do usuário {profile.email}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium">Função Atual</label>
                          <p className="text-sm text-muted-foreground">{profile.role}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium">Nova Função</label>
                          <Select onValueChange={(value: 'admin' | 'user') => updateUserRole(profile.user_id, value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione uma função" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="admin">Administrador</SelectItem>
                              <SelectItem value="user">Usuário</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserManagement;