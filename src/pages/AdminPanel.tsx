import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/SupabaseAuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { Pencil, Trash2, Plus, Upload, Filter, TrendingUp, Package, ShoppingCart, Users, BarChart3, Settings, Download, Eye, RefreshCw, AlertTriangle, Search, FileText, Database, Zap, Home, GripVertical, MoveUp, MoveDown } from 'lucide-react';
import { Navigate, Link } from 'react-router-dom';
import AdminDashboard from '@/components/AdminDashboard';
import SystemMonitoring from '@/components/SystemMonitoring';
import UserManagement from '@/components/UserManagement';
import ProductImageUpload from '@/components/ProductImageUpload';
import { SidebarProvider, Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarTrigger } from '@/components/ui/sidebar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface Category {
  id: string;
  name: string;
  description?: string;
  created_at: string;
}

interface Product {
  id: string;
  name: string;
  description?: string;
  price?: number;
  image_url?: string;
  category_id?: string;
  code?: string;
  in_stock: boolean;
  is_featured: boolean;
  popularity: number;
  created_at: string;
  categories?: { name: string };
}

const AdminPanel: React.FC = () => {
  const { isAdmin, loading } = useAuth();
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortOrder, setSortOrder] = useState<'recommended' | 'price-desc'>('recommended');
  const [newCategory, setNewCategory] = useState({ name: '', description: '' });
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    code: '',
    category_id: '',
    in_stock: true,
    is_featured: false,
    popularity: 0,
    image_url: ''
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [showOutOfStock, setShowOutOfStock] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [productCategoryFilter, setProductCategoryFilter] = useState<string>('');
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  useEffect(() => {
    if (isAdmin) {
      fetchCategories();
      fetchProducts();
    }
  }, [isAdmin]);

  useEffect(() => {
    filterAndSortProducts();
  }, [products, selectedCategory, sortOrder, searchTerm, showOutOfStock]);

  const fetchCategories = async () => {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name');
    
    if (error) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Erro ao carregar categorias"
      });
    } else {
      setCategories(data || []);
    }
  };

  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        categories(name)
      `)
      .order('created_at', { ascending: true });
    
    if (error) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Erro ao carregar produtos"
      });
    } else {
      setProducts(data || []);
    }
  };

  const filterAndSortProducts = () => {
    let filtered = products;

    if (searchTerm) {
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (product.code && product.code.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category_id === selectedCategory);
    }

    if (showOutOfStock) {
      filtered = filtered.filter(product => !product.in_stock);
    }

    if (sortOrder === 'recommended') {
      filtered.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
    } else if (sortOrder === 'price-desc') {
      filtered.sort((a, b) => (b.price || 0) - (a.price || 0));
    }

    setFilteredProducts(filtered);
  };

  const createCategory = async () => {
    if (!newCategory.name.trim()) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Nome da categoria é obrigatório"
      });
      return;
    }

    const { error } = await supabase
      .from('categories')
      .insert([newCategory]);

    if (error) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Erro ao criar categoria"
      });
    } else {
      toast({
        title: "Sucesso",
        description: "Categoria criada com sucesso"
      });
      setNewCategory({ name: '', description: '' });
      fetchCategories();
    }
  };

  const updateCategory = async () => {
    if (!editingCategory) return;

    const { error } = await supabase
      .from('categories')
      .update({
        name: editingCategory.name,
        description: editingCategory.description
      })
      .eq('id', editingCategory.id);

    if (error) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Erro ao atualizar categoria"
      });
    } else {
      toast({
        title: "Sucesso",
        description: "Categoria atualizada com sucesso"
      });
      setEditingCategory(null);
      fetchCategories();
    }
  };

  const deleteCategory = async (id: string) => {
    const { error } = await supabase
      .from('categories')
      .delete()
      .eq('id', id);

    if (error) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Erro ao deletar categoria"
      });
    } else {
      toast({
        title: "Sucesso",
        description: "Categoria deletada com sucesso"
      });
      fetchCategories();
    }
  };

  const createProduct = async () => {
    if (!newProduct.name.trim()) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Nome do produto é obrigatório"
      });
      return;
    }

    const productData = {
      ...newProduct,
      price: newProduct.price ? parseFloat(newProduct.price) : null,
      category_id: newProduct.category_id || null
    };

    const { error } = await supabase
      .from('products')
      .insert([productData]);

    if (error) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Erro ao criar produto"
      });
    } else {
      toast({
        title: "Sucesso",
        description: "Produto criado com sucesso"
      });
      setNewProduct({
        name: '',
        description: '',
        price: '',
        code: '',
        category_id: '',
        in_stock: true,
        is_featured: false,
        popularity: 0,
        image_url: ''
      });
      fetchProducts();
    }
  };

  const updateProduct = async () => {
    if (!editingProduct) return;

    const productData = {
      name: editingProduct.name,
      description: editingProduct.description,
      price: editingProduct.price,
      code: editingProduct.code,
      category_id: editingProduct.category_id || null,
      in_stock: editingProduct.in_stock,
      is_featured: editingProduct.is_featured,
      popularity: editingProduct.popularity,
      image_url: editingProduct.image_url
    };

    const { error } = await supabase
      .from('products')
      .update(productData)
      .eq('id', editingProduct.id);

    if (error) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Erro ao atualizar produto"
      });
    } else {
      toast({
        title: "Sucesso",
        description: "Produto atualizado com sucesso"
      });
      setEditingProduct(null);
      fetchProducts();
    }
  };

  const deleteProduct = async (id: string) => {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);

    if (error) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Erro ao deletar produto"
      });
    } else {
      toast({
        title: "Sucesso",
        description: "Produto deletado com sucesso"
      });
      fetchProducts();
    }
  };

  const bulkUpdateStock = async (inStock: boolean) => {
    const selectedProducts = filteredProducts.filter(p => !p.in_stock !== inStock);
    
    for (const product of selectedProducts) {
      await supabase
        .from('products')
        .update({ in_stock: inStock })
        .eq('id', product.id);
    }
    
    toast({
      title: "Sucesso",
      description: `${selectedProducts.length} produtos atualizados`
    });
    fetchProducts();
  };

  const exportProductsCSV = () => {
    const csvContent = [
      ['ID', 'Nome', 'Código', 'Preço', 'Categoria', 'Em Estoque', 'Destaque'],
      ...filteredProducts.map(p => [
        p.id,
        p.name,
        p.code || '',
        p.price || '',
        p.categories?.name || '',
        p.in_stock ? 'Sim' : 'Não',
        p.is_featured ? 'Sim' : 'Não'
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'produtos.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const duplicateProduct = async (product: Product) => {
    const productData = {
      name: `${product.name} (Cópia)`,
      description: product.description,
      price: product.price,
      code: `${product.code || ''}_copy`,
      category_id: product.category_id,
      in_stock: product.in_stock,
      is_featured: false,
      popularity: 0,
      image_url: product.image_url
    };

    const { error } = await supabase
      .from('products')
      .insert([productData]);

    if (error) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Erro ao duplicar produto"
      });
    } else {
      toast({
        title: "Sucesso",
        description: "Produto duplicado com sucesso"
      });
      fetchProducts();
    }
  };

  const statsCards = [
    {
      title: "Total de Produtos",
      value: products.length,
      icon: Package,
      color: "from-blue-500 to-blue-600"
    },
    {
      title: "Produtos em Destaque",
      value: products.filter(p => p.is_featured).length,
      icon: TrendingUp,
      color: "from-green-500 to-green-600"
    },
    {
      title: "Categorias",
      value: categories.length,
      icon: BarChart3,
      color: "from-orange-500 to-orange-600"
    },
    {
      title: "Produtos em Estoque",
      value: products.filter(p => p.in_stock).length,
      icon: ShoppingCart,
      color: "from-purple-500 to-purple-600"
    }
  ];

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: TrendingUp },
    { id: 'products', label: 'Produtos', icon: Package },
    { id: 'categories', label: 'Categorias', icon: BarChart3 },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
    { id: 'users', label: 'Usuários', icon: Users },
    { id: 'monitoring', label: 'Monitoramento', icon: Database },
    { id: 'tools', label: 'Ferramentas', icon: Settings },
  ];

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Carregando...</div>;
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        {/* Sidebar */}
        <Sidebar className="border-r border-border">
          <SidebarContent>
            {/* Header */}
            <div className="p-6 border-b border-border">
              <h2 className="text-xl font-bold">Admin Panel</h2>
              <p className="text-sm text-muted-foreground">Versão 2.0</p>
            </div>

            {/* Navigation */}
            <SidebarGroup>
              <SidebarGroupLabel>Navegação</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.id}>
                      <SidebarMenuButton
                        onClick={() => setActiveTab(item.id)}
                        isActive={activeTab === item.id}
                        className="w-full"
                      >
                        <item.icon className="w-4 h-4 mr-2" />
                        <span>{item.label}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            {/* Back to Home */}
            <div className="mt-auto p-4 border-t border-border">
              <Link to="/">
                <Button variant="outline" className="w-full">
                  <Home className="w-4 h-4 mr-2" />
                  Voltar à Homepage
                </Button>
              </Link>
            </div>
          </SidebarContent>
        </Sidebar>

        {/* Main Content */}
        <div className="flex-1 flex flex-col w-full overflow-hidden">
          {/* Header */}
          <header className="h-16 flex items-center border-b border-border px-6 bg-card">
            <SidebarTrigger className="mr-4" />
            <div className="flex items-center justify-between w-full">
              <div>
                <h1 className="text-2xl font-bold">Dashboard Admin</h1>
              </div>
              <div className="flex items-center gap-2">
                <Settings className="w-5 h-5 text-muted-foreground" />
              </div>
            </div>
          </header>

          {/* Content Area */}
          <main className="flex-1 overflow-auto p-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {statsCards.map((stat, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className={`bg-gradient-to-r ${stat.color} p-6 text-white`}>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-white/80 text-sm font-medium">{stat.title}</p>
                          <p className="text-3xl font-bold">{stat.value}</p>
                        </div>
                        <stat.icon className="w-8 h-8 text-white/80" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Tab Content */}
            {activeTab === 'dashboard' && (
              <div className="space-y-6">
                <AdminDashboard />
              </div>
            )}

            {activeTab === 'users' && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="w-5 h-5" />
                      Gerenciamento de Usuários
                    </CardTitle>
                    <CardDescription>
                      Gerencie usuários, permissões e acessos
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <UserManagement />
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === 'monitoring' && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Database className="w-5 h-5" />
                      Monitoramento do Sistema
                    </CardTitle>
                    <CardDescription>
                      Telemetria do servidor e métricas de performance
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <SystemMonitoring />
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === 'products' && (
              <div className="space-y-6">
                {!productCategoryFilter ? (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Package className="w-5 h-5" />
                        Selecione uma Categoria
                      </CardTitle>
                      <CardDescription>
                        Escolha uma categoria para visualizar e gerenciar seus produtos
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {categories.map((category) => (
                          <Card 
                            key={category.id} 
                            className="cursor-pointer hover:shadow-lg transition-shadow"
                            onClick={() => setProductCategoryFilter(category.id)}
                          >
                            <CardContent className="p-6">
                              <h3 className="font-semibold text-lg mb-2">{category.name}</h3>
                              {category.description && (
                                <p className="text-sm text-muted-foreground">{category.description}</p>
                              )}
                              <div className="mt-4 text-sm text-muted-foreground">
                                {products.filter(p => p.category_id === category.id).length} produtos
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <>
                    {/* Back button and filters */}
                    <Card>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle className="flex items-center gap-2">
                              <Package className="w-5 h-5" />
                              Produtos - {categories.find(c => c.id === productCategoryFilter)?.name}
                            </CardTitle>
                            <CardDescription>
                              Gerencie os produtos desta categoria
                            </CardDescription>
                          </div>
                          <Button variant="outline" onClick={() => setProductCategoryFilter('')}>
                            Voltar às Categorias
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex gap-4 items-end">
                          <div className="flex-1">
                            <Label htmlFor="search">Pesquisar Produtos</Label>
                            <div className="relative">
                              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                              <Input
                                id="search"
                                placeholder="Nome, código ou descrição..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-8"
                              />
                            </div>
                          </div>
                          <Button variant="outline" onClick={fetchProducts}>
                            <RefreshCw className="w-4 h-4 mr-1" />
                            Atualizar
                          </Button>
                          <Button variant="outline" onClick={exportProductsCSV}>
                            <Download className="w-4 h-4 mr-1" />
                            CSV
                          </Button>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Add Product Form */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Plus className="w-5 h-5" />
                          Adicionar Novo Produto
                        </CardTitle>
                        <CardDescription>Preencha os dados para adicionar um novo produto</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4 mb-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="product-name">Nome do Produto</Label>
                              <Input
                                id="product-name"
                                value={newProduct.name}
                                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                                placeholder="Nome do produto"
                              />
                            </div>
                            <div>
                              <Label htmlFor="product-code">Código</Label>
                              <Input
                                id="product-code"
                                value={newProduct.code}
                                onChange={(e) => setNewProduct({ ...newProduct, code: e.target.value })}
                                placeholder="Código do produto"
                              />
                            </div>
                            <div>
                              <Label htmlFor="product-price">Preço</Label>
                              <Input
                                id="product-price"
                                type="number"
                                step="0.01"
                                value={newProduct.price}
                                onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                                placeholder="0.00"
                              />
                            </div>
                            <div>
                              <Label htmlFor="product-popularity">Popularidade</Label>
                              <Input
                                id="product-popularity"
                                type="number"
                                value={newProduct.popularity}
                                onChange={(e) => setNewProduct({ ...newProduct, popularity: parseInt(e.target.value) || 0 })}
                                placeholder="0"
                              />
                            </div>
                          </div>
                          
                          <ProductImageUpload
                            onImageSelect={(imageUrl) => setNewProduct({ ...newProduct, image_url: imageUrl })}
                            currentImage={newProduct.image_url}
                          />
                          
                          <div>
                            <Label htmlFor="product-description">Descrição</Label>
                            <Textarea
                              id="product-description"
                              value={newProduct.description}
                              onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                              placeholder="Descrição do produto"
                            />
                          </div>
                          <div className="flex gap-4">
                            <div className="flex items-center space-x-2">
                              <Switch
                                id="in-stock"
                                checked={newProduct.in_stock}
                                onCheckedChange={(checked) => setNewProduct({ ...newProduct, in_stock: checked })}
                              />
                              <Label htmlFor="in-stock">Em estoque</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Switch
                                id="featured"
                                checked={newProduct.is_featured}
                                onCheckedChange={(checked) => setNewProduct({ ...newProduct, is_featured: checked })}
                              />
                              <Label htmlFor="featured">Produto em destaque</Label>
                            </div>
                          </div>
                          <Button onClick={createProduct} className="w-full md:w-auto">
                            <Plus className="w-4 h-4 mr-2" />
                            Adicionar Produto
                          </Button>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Products List */}
                    <Card>
                      <CardHeader>
                        <CardTitle>
                          Produtos ({products.filter(p => p.category_id === productCategoryFilter).filter(p => 
                            !searchTerm || 
                            p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            p.code?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            p.description?.toLowerCase().includes(searchTerm.toLowerCase())
                          ).length})
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        {products.filter(p => p.category_id === productCategoryFilter).filter(p => 
                          !searchTerm || 
                          p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.code?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.description?.toLowerCase().includes(searchTerm.toLowerCase())
                        ).length === 0 ? (
                          <div className="text-center py-12 text-muted-foreground">
                            <Package className="w-16 h-16 mx-auto mb-4 opacity-50" />
                            <h3 className="text-lg font-medium mb-2">Nenhum produto encontrado</h3>
                            <p>Adicione produtos nesta categoria.</p>
                          </div>
                        ) : (
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead className="w-12">Ordem</TableHead>
                                <TableHead className="w-20">Imagem</TableHead>
                                <TableHead>Nome</TableHead>
                                <TableHead>Código</TableHead>
                                <TableHead>Preço</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Ações</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {products
                                .filter(p => p.category_id === productCategoryFilter)
                                .filter(p => 
                                  !searchTerm || 
                                  p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                  p.code?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                  p.description?.toLowerCase().includes(searchTerm.toLowerCase())
                                )
                                .map((product, index) => (
                                  <TableRow key={product.id}>
                                    <TableCell>
                                      <div className="flex flex-col gap-1">
                                        <Button 
                                          variant="ghost" 
                                          size="icon" 
                                          className="h-6 w-6"
                                          disabled={index === 0}
                                        >
                                          <MoveUp className="w-3 h-3" />
                                        </Button>
                                        <Button 
                                          variant="ghost" 
                                          size="icon" 
                                          className="h-6 w-6"
                                          disabled={index === products.filter(p => p.category_id === productCategoryFilter).length - 1}
                                        >
                                          <MoveDown className="w-3 h-3" />
                                        </Button>
                                      </div>
                                    </TableCell>
                                    <TableCell>
                                      {product.image_url ? (
                                        <img 
                                          src={product.image_url} 
                                          alt={product.name}
                                          className="w-16 h-16 object-cover rounded"
                                        />
                                      ) : (
                                        <div className="w-16 h-16 bg-muted rounded flex items-center justify-center">
                                          <Upload className="w-6 h-6 text-muted-foreground" />
                                        </div>
                                      )}
                                    </TableCell>
                                    <TableCell>
                                      <div className="font-medium">{product.name}</div>
                                      {product.is_featured && (
                                        <Badge variant="secondary" className="mt-1">Destaque</Badge>
                                      )}
                                    </TableCell>
                                    <TableCell>{product.code || 'N/A'}</TableCell>
                                    <TableCell>
                                      {product.price ? `R$ ${product.price.toFixed(2)}` : 'N/A'}
                                    </TableCell>
                                    <TableCell>
                                      {product.in_stock ? (
                                        <Badge variant="default">Em estoque</Badge>
                                      ) : (
                                        <Badge variant="destructive">Sem estoque</Badge>
                                      )}
                                    </TableCell>
                                     <TableCell className="text-right">
                                       <div className="flex gap-2 justify-end">
                                         <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
                                           <DialogTrigger asChild>
                                             <Button 
                                               variant="outline" 
                                               size="sm" 
                                               onClick={() => {
                                                 setEditingProduct(product);
                                                 setEditDialogOpen(true);
                                               }}
                                             >
                                               <Pencil className="w-4 h-4" />
                                             </Button>
                                           </DialogTrigger>
                                           <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                                            <DialogHeader>
                                              <DialogTitle>Editar Produto</DialogTitle>
                                              <DialogDescription>
                                                Faça as alterações necessárias no produto.
                                              </DialogDescription>
                                            </DialogHeader>
                                             {editingProduct && (
                                               <div className="space-y-4">
                                                 <div className="grid grid-cols-2 gap-4">
                                                   <div>
                                                     <Label htmlFor="edit-name">Nome</Label>
                                                     <Input
                                                       id="edit-name"
                                                       value={editingProduct.name}
                                                       onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                                                     />
                                                   </div>
                                                   <div>
                                                     <Label htmlFor="edit-code">Código</Label>
                                                     <Input
                                                       id="edit-code"
                                                       value={editingProduct.code || ''}
                                                       onChange={(e) => setEditingProduct({ ...editingProduct, code: e.target.value })}
                                                     />
                                                   </div>
                                                   <div>
                                                     <Label htmlFor="edit-price">Preço</Label>
                                                     <Input
                                                       id="edit-price"
                                                       type="number"
                                                       step="0.01"
                                                       value={editingProduct.price || ''}
                                                       onChange={(e) => setEditingProduct({ ...editingProduct, price: parseFloat(e.target.value) || undefined })}
                                                     />
                                                   </div>
                                                   <div>
                                                     <Label htmlFor="edit-popularity">Popularidade</Label>
                                                     <Input
                                                       id="edit-popularity"
                                                       type="number"
                                                       value={editingProduct.popularity}
                                                       onChange={(e) => setEditingProduct({ ...editingProduct, popularity: parseInt(e.target.value) || 0 })}
                                                     />
                                                   </div>
                                                 </div>
                                                 
                                                 <ProductImageUpload
                                                   onImageSelect={(imageUrl) => setEditingProduct({ ...editingProduct, image_url: imageUrl })}
                                                   currentImage={editingProduct.image_url}
                                                 />
                                                 
                                                 <div>
                                                   <Label htmlFor="edit-description">Descrição</Label>
                                                   <Textarea
                                                     id="edit-description"
                                                     value={editingProduct.description || ''}
                                                     onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                                                   />
                                                 </div>
                                                 <div className="flex gap-4">
                                                   <div className="flex items-center space-x-2">
                                                     <Switch
                                                       id="edit-in-stock"
                                                       checked={editingProduct.in_stock}
                                                       onCheckedChange={(checked) => setEditingProduct({ ...editingProduct, in_stock: checked })}
                                                     />
                                                     <Label htmlFor="edit-in-stock">Em estoque</Label>
                                                   </div>
                                                   <div className="flex items-center space-x-2">
                                                     <Switch
                                                       id="edit-featured"
                                                       checked={editingProduct.is_featured}
                                                       onCheckedChange={(checked) => setEditingProduct({ ...editingProduct, is_featured: checked })}
                                                     />
                                                     <Label htmlFor="edit-featured">Produto em destaque</Label>
                                                   </div>
                                                 </div>
                                             </div>
                                           )}
                                             <DialogFooter>
                                               <Button 
                                                 variant="outline" 
                                                 onClick={() => {
                                                   setEditingProduct(null);
                                                   setEditDialogOpen(false);
                                                 }}
                                               >
                                                 Cancelar
                                               </Button>
                                               <Button 
                                                 onClick={async () => {
                                                   await updateProduct();
                                                   setEditDialogOpen(false);
                                                 }}
                                               >
                                                 Salvar Alterações
                                               </Button>
                                             </DialogFooter>
                                           </DialogContent>
                                         </Dialog>
                                         <Button
                                           variant="destructive"
                                           size="sm"
                                           onClick={() => deleteProduct(product.id)}
                                         >
                                           <Trash2 className="w-4 h-4" />
                                         </Button>
                                       </div>
                                     </TableCell>
                                   </TableRow>
                                 ))}
                             </TableBody>
                           </Table>
                         )}
                       </CardContent>
                     </Card>
                   </>
                 )}
               </div>
             )}

            {activeTab === 'categories' && (
              <div className="space-y-6">
                {/* Add Category Form */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Plus className="w-5 h-5" />
                      Adicionar Nova Categoria
                    </CardTitle>
                    <CardDescription>Preencha os dados para adicionar uma nova categoria</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4 mb-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="category-name">Nome da Categoria</Label>
                          <Input
                            id="category-name"
                            value={newCategory.name}
                            onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                            placeholder="Nome da categoria"
                          />
                        </div>
                        <div>
                          <Label htmlFor="category-description">Descrição</Label>
                          <Input
                            id="category-description"
                            value={newCategory.description}
                            onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                            placeholder="Descrição da categoria"
                          />
                        </div>
                      </div>
                      <Button onClick={createCategory} className="w-full md:w-auto">
                        <Plus className="w-4 h-4 mr-2" />
                        Adicionar Categoria
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Categories List */}
                <Card>
                  <CardHeader>
                    <CardTitle>Categorias ({categories.length})</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {categories.length === 0 ? (
                      <div className="text-center py-12 text-muted-foreground">
                        <BarChart3 className="w-16 h-16 mx-auto mb-4 opacity-50" />
                        <h3 className="text-lg font-medium mb-2">Nenhuma categoria encontrada</h3>
                        <p>Adicione categorias usando o formulário acima.</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {categories.map((category) => (
                          <Card key={category.id} className="hover:shadow-lg transition-shadow">
                            <CardContent className="p-6">
                              <div className="space-y-2">
                                <h3 className="font-medium text-lg">{category.name}</h3>
                                {category.description && (
                                  <p className="text-sm text-muted-foreground">{category.description}</p>
                                )}
                                <div className="flex gap-2 pt-4">
                                  <Dialog>
                                    <DialogTrigger asChild>
                                      <Button variant="outline" size="sm" className="flex-1" onClick={() => setEditingCategory(category)}>
                                        <Pencil className="w-4 h-4 mr-1" />
                                        Editar
                                      </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                      <DialogHeader>
                                        <DialogTitle>Editar Categoria</DialogTitle>
                                        <DialogDescription>
                                          Faça as alterações necessárias na categoria.
                                        </DialogDescription>
                                      </DialogHeader>
                                      {editingCategory && (
                                        <div className="space-y-4">
                                          <div>
                                            <Label htmlFor="edit-cat-name">Nome</Label>
                                            <Input
                                              id="edit-cat-name"
                                              value={editingCategory.name}
                                              onChange={(e) => setEditingCategory({ ...editingCategory, name: e.target.value })}
                                            />
                                          </div>
                                          <div>
                                            <Label htmlFor="edit-cat-description">Descrição</Label>
                                            <Input
                                              id="edit-cat-description"
                                              value={editingCategory.description || ''}
                                              onChange={(e) => setEditingCategory({ ...editingCategory, description: e.target.value })}
                                            />
                                          </div>
                                        </div>
                                      )}
                                      <DialogFooter>
                                        <Button variant="outline" onClick={() => setEditingCategory(null)}>
                                          Cancelar
                                        </Button>
                                        <Button onClick={updateCategory}>
                                          Salvar Alterações
                                        </Button>
                                      </DialogFooter>
                                    </DialogContent>
                                  </Dialog>
                                  <Button
                                    variant="destructive"
                                    size="sm"
                                    className="flex-1"
                                    onClick={() => deleteCategory(category.id)}
                                  >
                                    <Trash2 className="w-4 h-4 mr-1" />
                                    Excluir
                                  </Button>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === 'analytics' && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5" />
                      Análise de Produtos
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <h3 className="font-medium">Produtos por Categoria</h3>
                        <div className="space-y-2">
                          {categories.map(category => {
                            const count = products.filter(p => p.category_id === category.id).length;
                            return (
                              <div key={category.id} className="flex justify-between items-center p-2 bg-muted rounded">
                                <span className="text-sm">{category.name}</span>
                                <Badge variant="secondary">{count}</Badge>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <h3 className="font-medium">Status do Estoque</h3>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center p-2 bg-green-100 dark:bg-green-900/20 rounded">
                            <span className="text-sm">Em Estoque</span>
                            <Badge className="bg-green-600">{products.filter(p => p.in_stock).length}</Badge>
                          </div>
                          <div className="flex justify-between items-center p-2 bg-red-100 dark:bg-red-900/20 rounded">
                            <span className="text-sm">Sem Estoque</span>
                            <Badge variant="destructive">{products.filter(p => !p.in_stock).length}</Badge>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h3 className="font-medium">Produtos em Destaque</h3>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center p-2 bg-yellow-100 dark:bg-yellow-900/20 rounded">
                            <span className="text-sm">Destacados</span>
                            <Badge className="bg-yellow-600">{products.filter(p => p.is_featured).length}</Badge>
                          </div>
                          <div className="flex justify-between items-center p-2 bg-muted rounded">
                            <span className="text-sm">Normais</span>
                            <Badge variant="secondary">{products.filter(p => !p.is_featured).length}</Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Produtos com Preços Não Definidos</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {products.filter(p => !p.price).length === 0 ? (
                      <p className="text-muted-foreground">Todos os produtos têm preços definidos.</p>
                    ) : (
                      <div className="space-y-2">
                        {products.filter(p => !p.price).map(product => (
                          <div key={product.id} className="flex justify-between items-center p-2 bg-orange-100 dark:bg-orange-900/20 rounded">
                            <span className="text-sm">{product.name}</span>
                            <Badge variant="outline">Sem preço</Badge>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === 'tools' && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="w-5 h-5" />
                      Ferramentas de Administração
                    </CardTitle>
                    <CardDescription>Utilitários para gerenciar o sistema</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h3 className="font-medium flex items-center gap-2">
                          <Database className="w-4 h-4" />
                          Backup e Exportação
                        </h3>
                        <div className="space-y-2">
                          <Button variant="outline" className="w-full justify-start" onClick={exportProductsCSV}>
                            <Download className="w-4 h-4 mr-2" />
                            Exportar Produtos (CSV)
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="font-medium flex items-center gap-2">
                          <Zap className="w-4 h-4" />
                          Ações em Massa
                        </h3>
                        <div className="space-y-2">
                          <Button variant="outline" className="w-full justify-start" onClick={() => bulkUpdateStock(true)}>
                            <Package className="w-4 h-4 mr-2" />
                            Todos em Estoque
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminPanel;
