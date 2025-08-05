import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { useAuth } from '@/context/SupabaseAuthContext';

const AuthPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn, signUp, isAuthenticated, loading } = useAuth();
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  
  // Register form state
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Redirect if already authenticated
  useEffect(() => {
    if (!loading && isAuthenticated) {
      const from = location.state?.from?.pathname || '/';
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, loading, navigate, location]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!loginEmail || !loginPassword) {
      return;
    }

    setIsLoading(true);
    const { error } = await signIn(loginEmail, loginPassword);
    
    if (!error) {
      const from = location.state?.from?.pathname || '/';
      navigate(from, { replace: true });
    }
    
    setIsLoading(false);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!registerEmail || !registerPassword || !confirmPassword) {
      return;
    }

    if (registerPassword !== confirmPassword) {
      return;
    }

    if (registerPassword.length < 6) {
      return;
    }

    setIsLoading(true);
    const { error } = await signUp(registerEmail, registerPassword);
    setIsLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Button
          variant="ghost"
          className="mb-4"
          onClick={() => navigate('/')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar para início
        </Button>

        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Site Center</CardTitle>
            <CardDescription>
              Acesse sua conta ou crie uma nova
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" className="space-y-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Entrar</TabsTrigger>
                <TabsTrigger value="register">Cadastrar</TabsTrigger>
              </TabsList>

              <TabsContent value="login" className="space-y-4">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email</Label>
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="seu@email.com"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="login-password">Senha</Label>
                    <div className="relative">
                      <Input
                        id="login-password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Sua senha"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isLoading || !loginEmail || !loginPassword}
                  >
                    {isLoading ? 'Entrando...' : 'Entrar'}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="register" className="space-y-4">
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="register-email">Email</Label>
                    <Input
                      id="register-email"
                      type="email"
                      placeholder="seu@email.com"
                      value={registerEmail}
                      onChange={(e) => setRegisterEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-password">Senha</Label>
                    <div className="relative">
                      <Input
                        id="register-password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Mínimo 6 caracteres"
                        value={registerPassword}
                        onChange={(e) => setRegisterPassword(e.target.value)}
                        required
                        minLength={6}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirmar Senha</Label>
                    <div className="relative">
                      <Input
                        id="confirm-password"
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder="Digite a senha novamente"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    {registerPassword !== confirmPassword && confirmPassword && (
                      <p className="text-sm text-destructive">As senhas não coincidem</p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={
                      isLoading ||
                      !registerEmail ||
                      !registerPassword ||
                      !confirmPassword ||
                      registerPassword !== confirmPassword ||
                      registerPassword.length < 6
                    }
                  >
                    {isLoading ? 'Cadastrando...' : 'Criar Conta'}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AuthPage;