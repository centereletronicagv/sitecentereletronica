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
import { Pencil, Trash2, Plus, Upload, Filter, TrendingUp, Package, ShoppingCart, Users, BarChart3, Settings, Download, Eye, RefreshCw, AlertTriangle, Search, FileText, Database, Zap, Home, GripVertical, MoveUp, MoveDown, Menu } from 'lucide-react';
import { Navigate, Link } from 'react-router-dom';
import AdminDashboard from '@/components/AdminDashboard';
import SystemMonitoring from '@/components/SystemMonitoring';
import UserManagement from '@/components/UserManagement';
import ProductImageUpload from '@/components/ProductImageUpload';
import ActivityLogs from '@/components/ActivityLogs';
import { SidebarProvider, Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarTrigger } from '@/components/ui/sidebar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

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
  display_order?: number;
}

interface SortableProductRowProps {
  product: Product;
  index: number;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
}

const SortableProductRow: React.FC<SortableProductRowProps> = ({ product, index, onEdit, onDelete }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: product.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <TableRow ref={setNodeRef} style={style}>
      <TableCell>
        <div {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing">
          <GripVertical className="w-4 h-4 text-gray-400" />
        </div>
      </TableCell>
      <TableCell className="hidden sm:table-cell">
        {product.image_url ? (
          <img 
            src={product.image_url} 
            alt={product.name}
            className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded"
          />
        ) : (
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-muted rounded flex items-center justify-center">
            <Upload className="w-4 h-4 sm:w-6 sm:h-6 text-muted-foreground" />
          </div>
        )}
      </TableCell>
      <TableCell>
        <div className="font-medium text-sm sm:text-base">{product.name}</div>
        {product.is_featured && (
          <Badge variant="secondary" className="mt-1 text-xs">Destaque</Badge>
        )}
      </TableCell>
      <TableCell className="hidden md:table-cell text-sm">{product.code || 'N/A'}</TableCell>
      <TableCell className="text-sm">
        {product.price ? `R$ ${product.price.toFixed(2)}` : 'N/A'}
      </TableCell>
      <TableCell className="hidden lg:table-cell">
        {product.in_stock ? (
          <Badge variant="default" className="text-xs">Em estoque</Badge>
        ) : (
          <Badge variant="destructive" className="text-xs">Sem estoque</Badge>
        )}
      </TableCell>
      <TableCell className="text-right">
        <div className="flex gap-1 sm:gap-2 justify-end">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => onEdit(product)}
            className="h-8 w-8 p-0 sm:w-auto sm:px-2"
          >
            <Pencil className="w-3 h-3 sm:w-4 sm:h-4" />
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => onDelete(product.id)}
            className="h-8 w-8 p-0 sm:w-auto sm:px-2"
          >
            <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
};

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

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

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const filteredProductsList = products
      .filter(p => p.category_id === productCategoryFilter)
      .filter(p => 
        !searchTerm || 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.code?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const oldIndex = filteredProductsList.findIndex((item) => item.id === active.id);
    const newIndex = filteredProductsList.findIndex((item) => item.id === over.id);

    const newOrder = arrayMove(filteredProductsList, oldIndex, newIndex);

    // Update display_order for all affected products
    const updates = newOrder.map((product, index) => ({
      id: product.id,
      display_order: index
    }));

    // Optimistically update UI
    const updatedProducts = products.map(p => {
      const update = updates.find(u => u.id === p.id);
      return update ? { ...p, display_order: update.display_order } : p;
    });
    setProducts(updatedProducts);

    // Update database
    for (const update of updates) {
      await supabase
        .from('products')
        .update({ display_order: update.display_order })
        .eq('id', update.id);
    }

    toast({
      title: "Ordem atualizada",
      description: "A ordem dos produtos foi atualizada com sucesso"
    });
  };

  const statsCards = [
    {
      title: "Total de Produtos",
      value: products.length,
      icon: Package,
      gradient: "from-blue-500 via-blue-600 to-cyan-500",
      iconBg: "bg-blue-500/10",
      iconColor: "text-blue-400"
    },
    {
      title: "Produtos em Destaque",
      value: products.filter(p => p.is_featured).length,
      icon: TrendingUp,
      gradient: "from-emerald-500 via-green-600 to-teal-500",
      iconBg: "bg-emerald-500/10",
      iconColor: "text-emerald-400"
    },
    {
      title: "Categorias",
      value: categories.length,
      icon: BarChart3,
      gradient: "from-orange-500 via-amber-600 to-yellow-500",
      iconBg: "bg-orange-500/10",
      iconColor: "text-orange-400"
    },
    {
      title: "Produtos em Estoque",
      value: products.filter(p => p.in_stock).length,
      icon: ShoppingCart,
      gradient: "from-purple-500 via-violet-600 to-indigo-500",
      iconBg: "bg-purple-500/10",
      iconColor: "text-purple-400"
    }
  ];

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: TrendingUp },
    { id: 'products', label: 'Produtos', icon: Package },
    { id: 'categories', label: 'Categorias', icon: BarChart3 },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
    { id: 'users', label: 'Usuários', icon: Users },
    { id: 'logs', label: 'Logs', icon: FileText },
    { id: 'monitoring', label: 'Monitoramento', icon: Database },
    { id: 'tools', label: 'Ferramentas', icon: Settings },
  ];

  const MobileMenu = () => (
    <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden text-gray-400">
          <Menu className="w-5 h-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64 bg-[#111111] border-white/5 p-0">
        <div className="p-6 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
              <Settings className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Admin</h2>
              <p className="text-xs text-gray-400">Painel de Controle</p>
            </div>
          </div>
        </div>
        <div className="py-4">
          <p className="text-gray-400 text-xs uppercase tracking-wider px-6 py-2">Menu Principal</p>
          <div className="space-y-1 px-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all ${
                  activeTab === item.id 
                    ? 'bg-gradient-to-r from-orange-500/20 to-red-500/20 text-orange-400 border border-orange-500/30' 
                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                <item.icon className="w-4 h-4" />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/5">
          <Link to="/">
            <Button variant="outline" className="w-full bg-white/5 border-white/10 text-gray-300 hover:bg-white/10">
              <Home className="w-4 h-4 mr-2" />
              Voltar à Homepage
            </Button>
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Carregando...</div>;
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-[#0a0a0a]">
        {/* Desktop Sidebar */}
        <Sidebar className="hidden lg:flex border-r border-white/5 bg-[#111111]">
          <SidebarContent>
            {/* Header */}
            <div className="p-6 border-b border-white/5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
                  <Settings className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">Admin</h2>
                  <p className="text-xs text-gray-400">Painel de Controle</p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <SidebarGroup>
              <SidebarGroupLabel className="text-gray-400 text-xs uppercase tracking-wider px-6 py-2">
                Menu Principal
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.id}>
                      <SidebarMenuButton
                        onClick={() => setActiveTab(item.id)}
                        isActive={activeTab === item.id}
                        className={`w-full mx-2 rounded-lg transition-all ${
                          activeTab === item.id 
                            ? 'bg-gradient-to-r from-orange-500/20 to-red-500/20 text-orange-400 border border-orange-500/30' 
                            : 'text-gray-400 hover:bg-white/5 hover:text-white'
                        }`}
                      >
                        <item.icon className="w-4 h-4 mr-3" />
                        <span className="font-medium">{item.label}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            {/* Back to Home */}
            <div className="mt-auto p-4 border-t border-white/5">
              <Link to="/">
                <Button variant="outline" className="w-full bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 hover:text-white hover:border-white/20">
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
          <header className="h-14 sm:h-16 flex items-center border-b border-white/5 px-3 sm:px-6 bg-[#111111]/50 backdrop-blur-xl">
            <div className="lg:hidden mr-2">
              <MobileMenu />
            </div>
            <SidebarTrigger className="hidden lg:block mr-4 text-gray-400 hover:text-white" />
            <div className="flex items-center justify-between w-full">
              <div>
                <h1 className="text-base sm:text-xl font-bold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
                  Dashboard Admin
                </h1>
              </div>
              <div className="flex items-center gap-2 sm:gap-4">
                <div className="relative hidden sm:block">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type="text"
                    placeholder="Buscar..."
                    className="pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-gray-300 placeholder-gray-500 focus:outline-none focus:border-orange-500/50 focus:bg-white/10 transition-all w-48 md:w-64"
                  />
                </div>
                <Button variant="ghost" size="icon" className="relative text-gray-400 hover:text-white hover:bg-white/10 h-8 w-8 sm:h-10 sm:w-10">
                  <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5" />
                </Button>
              </div>
            </div>
          </header>

          {/* Content Area */}
          <main className="flex-1 overflow-auto p-3 sm:p-6 bg-[#0a0a0a]">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8">
              {statsCards.map((stat, index) => (
                <Card key={index} className="border-white/10 bg-gradient-to-br from-[#1a1a1a] to-[#111111] overflow-hidden group hover:border-orange-500/30 transition-all">
                  <CardContent className="p-3 sm:p-6">
                    <div className="flex items-center justify-between mb-2 sm:mb-4">
                      <div className={`p-2 sm:p-3 rounded-xl ${stat.iconBg}`}>
                        <stat.icon className={`w-4 h-4 sm:w-6 sm:h-6 ${stat.iconColor}`} />
                      </div>
                      <div className={`h-8 w-16 sm:h-12 sm:w-24 bg-gradient-to-r ${stat.gradient} opacity-10 rounded-full blur-xl group-hover:opacity-20 transition-opacity`}></div>
                    </div>
                    <p className="text-gray-400 text-xs sm:text-sm font-medium mb-1">{stat.title}</p>
                    <p className="text-xl sm:text-3xl font-bold text-white">{stat.value}</p>
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

            {activeTab === 'logs' && (
              <div className="space-y-6">
                <ActivityLogs />
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
                  <Card className="border-white/10 bg-gradient-to-br from-[#1a1a1a] to-[#111111]">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-white">
                        <Package className="w-5 h-5 text-orange-400" />
                        Selecione uma Categoria
                      </CardTitle>
                      <CardDescription className="text-gray-400">
                        Escolha uma categoria para visualizar e gerenciar seus produtos
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {categories.map((category) => (
                          <Card 
                            key={category.id} 
                            className="cursor-pointer hover:shadow-2xl transition-all border-white/10 bg-[#1a1a1a] hover:border-orange-500/50 hover:scale-105 group"
                            onClick={() => setProductCategoryFilter(category.id)}
                          >
                            <CardContent className="p-6">
                              <div className="flex items-start justify-between mb-3">
                                <div className="p-2 rounded-lg bg-orange-500/10">
                                  <Package className="w-5 h-5 text-orange-400" />
                                </div>
                                <div className="h-8 w-16 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-full blur-xl group-hover:opacity-100 opacity-0 transition-opacity"></div>
                              </div>
                              <h3 className="font-semibold text-lg mb-2 text-white group-hover:text-orange-400 transition-colors">{category.name}</h3>
                              {category.description && (
                                <p className="text-sm text-gray-400 mb-3">{category.description}</p>
                              )}
                              <div className="flex items-center justify-between pt-3 border-t border-white/5">
                                <span className="text-xs text-gray-500">Total de produtos</span>
                                <span className="text-sm font-bold text-orange-400">
                                  {products.filter(p => p.category_id === category.id).length}
                                </span>
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
                    <Card className="border-white/10 bg-gradient-to-br from-[#1a1a1a] to-[#111111]">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle className="flex items-center gap-2 text-white">
                              <Package className="w-5 h-5 text-orange-400" />
                              Produtos - {categories.find(c => c.id === productCategoryFilter)?.name}
                            </CardTitle>
                            <CardDescription className="text-gray-400">
                              Gerencie os produtos desta categoria
                            </CardDescription>
                          </div>
                          <Button 
                            variant="outline" 
                            onClick={() => setProductCategoryFilter('')}
                            className="border-white/10 text-gray-300 hover:bg-white/10 hover:text-white"
                          >
                            Voltar às Categorias
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex gap-4 items-end">
                          <div className="flex-1">
                            <Label htmlFor="search" className="text-gray-300">Pesquisar Produtos</Label>
                            <div className="relative">
                              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                              <Input
                                id="search"
                                placeholder="Nome, código ou descrição..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 bg-white/5 border-white/10 text-white placeholder-gray-500 focus:border-orange-500/50"
                              />
                            </div>
                          </div>
                          <Button variant="outline" onClick={fetchProducts} className="border-white/10 text-gray-300 hover:bg-white/10">
                            <RefreshCw className="w-4 h-4 mr-1" />
                            Atualizar
                          </Button>
                          <Button variant="outline" onClick={exportProductsCSV} className="border-white/10 text-gray-300 hover:bg-white/10">
                            <Download className="w-4 h-4 mr-1" />
                            CSV
                          </Button>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Add Product Form */}
                    <Card className="border-white/10 bg-gradient-to-br from-[#1a1a1a] to-[#111111]">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-white">
                          <Plus className="w-5 h-5 text-orange-400" />
                          Adicionar Novo Produto
                        </CardTitle>
                        <CardDescription className="text-gray-400">Preencha os dados para adicionar um novo produto</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4 mb-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="product-name" className="text-gray-300">Nome do Produto</Label>
                              <Input
                                id="product-name"
                                value={newProduct.name}
                                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                                placeholder="Nome do produto"
                                className="bg-white/5 border-white/10 text-white placeholder-gray-500 focus:border-orange-500/50"
                              />
                            </div>
                            <div>
                              <Label htmlFor="product-code" className="text-gray-300">Código</Label>
                              <Input
                                id="product-code"
                                value={newProduct.code}
                                onChange={(e) => setNewProduct({ ...newProduct, code: e.target.value })}
                                placeholder="Código do produto"
                                className="bg-white/5 border-white/10 text-white placeholder-gray-500 focus:border-orange-500/50"
                              />
                            </div>
                            <div>
                              <Label htmlFor="product-price" className="text-gray-300">Preço</Label>
                              <Input
                                id="product-price"
                                type="number"
                                step="0.01"
                                value={newProduct.price}
                                onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                                placeholder="0.00"
                                className="bg-white/5 border-white/10 text-white placeholder-gray-500 focus:border-orange-500/50"
                              />
                            </div>
                            <div>
                              <Label htmlFor="product-popularity" className="text-gray-300">Popularidade</Label>
                              <Input
                                id="product-popularity"
                                type="number"
                                value={newProduct.popularity}
                                onChange={(e) => setNewProduct({ ...newProduct, popularity: parseInt(e.target.value) || 0 })}
                                placeholder="0"
                                className="bg-white/5 border-white/10 text-white placeholder-gray-500 focus:border-orange-500/50"
                              />
                            </div>
                          </div>
                          
                          <ProductImageUpload
                            onImageSelect={(imageUrl) => setNewProduct({ ...newProduct, image_url: imageUrl })}
                            currentImage={newProduct.image_url}
                          />
                          
                          <div>
                            <Label htmlFor="product-description" className="text-gray-300">Descrição</Label>
                            <Textarea
                              id="product-description"
                              value={newProduct.description}
                              onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                              placeholder="Descrição do produto"
                              className="bg-white/5 border-white/10 text-white placeholder-gray-500 focus:border-orange-500/50"
                            />
                          </div>
                          <div className="flex gap-4">
                            <div className="flex items-center space-x-2">
                              <Switch
                                id="in-stock"
                                checked={newProduct.in_stock}
                                onCheckedChange={(checked) => setNewProduct({ ...newProduct, in_stock: checked })}
                              />
                              <Label htmlFor="in-stock" className="text-gray-300">Em estoque</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Switch
                                id="featured"
                                checked={newProduct.is_featured}
                                onCheckedChange={(checked) => setNewProduct({ ...newProduct, is_featured: checked })}
                              />
                              <Label htmlFor="featured" className="text-gray-300">Produto em destaque</Label>
                            </div>
                          </div>
                          <Button 
                            onClick={createProduct} 
                            className="w-full md:w-auto bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white border-0"
                          >
                            <Plus className="w-4 h-4 mr-2" />
                            Adicionar Produto
                          </Button>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Products List */}
                    <Card className="border-white/10 bg-gradient-to-br from-[#1a1a1a] to-[#111111]">
                      <CardHeader>
                        <CardTitle className="text-white">
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
                          <div className="text-center py-12 text-gray-400">
                            <Package className="w-16 h-16 mx-auto mb-4 opacity-50" />
                            <h3 className="text-lg font-medium mb-2 text-gray-300">Nenhum produto encontrado</h3>
                            <p>Adicione produtos nesta categoria.</p>
                          </div>
                        ) : (
                          <DndContext
                            sensors={sensors}
                            collisionDetection={closestCenter}
                            onDragEnd={handleDragEnd}
                          >
                            <div className="overflow-x-auto">
                              <Table>
                                <TableHeader>
                                  <TableRow>
                                    <TableHead className="w-12">Ordem</TableHead>
                                    <TableHead className="w-16 sm:w-20 hidden sm:table-cell">Imagem</TableHead>
                                    <TableHead>Nome</TableHead>
                                    <TableHead className="hidden md:table-cell">Código</TableHead>
                                    <TableHead>Preço</TableHead>
                                    <TableHead className="hidden lg:table-cell">Status</TableHead>
                                    <TableHead className="text-right">Ações</TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  <SortableContext
                                    items={products
                                      .filter(p => p.category_id === productCategoryFilter)
                                      .filter(p => 
                                        !searchTerm || 
                                        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                        p.code?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                        p.description?.toLowerCase().includes(searchTerm.toLowerCase())
                                      )
                                      .sort((a, b) => (a.display_order || 0) - (b.display_order || 0))
                                      .map(p => p.id)
                                    }
                                    strategy={verticalListSortingStrategy}
                                  >
                                    {products
                                      .filter(p => p.category_id === productCategoryFilter)
                                      .filter(p => 
                                        !searchTerm || 
                                        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                        p.code?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                        p.description?.toLowerCase().includes(searchTerm.toLowerCase())
                                      )
                                      .sort((a, b) => (a.display_order || 0) - (b.display_order || 0))
                                      .map((product, index) => (
                                        <SortableProductRow
                                          key={product.id}
                                          product={product}
                                          index={index}
                                          onEdit={(p) => {
                                            setEditingProduct(p);
                                            setEditDialogOpen(true);
                                          }}
                                          onDelete={deleteProduct}
                                        />
                                      ))}
                                  </SortableContext>
                                </TableBody>
                              </Table>
                            </div>
                          </DndContext>
                        )}
                      </CardContent>
                    </Card>

                    {/* Edit Product Dialog */}
                    <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
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
