import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/SupabaseAuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { Pencil, Trash2, Plus, Upload, Filter, TrendingUp, Package, ShoppingCart, Users, BarChart3, Settings } from 'lucide-react';
import { Navigate } from 'react-router-dom';

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

  useEffect(() => {
    if (isAdmin) {
      fetchCategories();
      fetchProducts();
    }
  }, [isAdmin]);

  useEffect(() => {
    filterAndSortProducts();
  }, [products, selectedCategory, sortOrder]);

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

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category_id === selectedCategory);
    }

    // Sort products
    if (sortOrder === 'recommended') {
      // Sort by creation order (as added)
      filtered.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
    } else if (sortOrder === 'price-desc') {
      // Sort by price (highest to lowest)
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

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Carregando...</div>;
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Dashboard Admin</h1>
              <p className="text-muted-foreground">Gerencie produtos e categorias</p>
            </div>
            <div className="flex items-center gap-2">
              <Settings className="w-5 h-5 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Versão 2.0</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-6">
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

        {/* Main Content */}
        <Tabs defaultValue="products" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="products" className="flex items-center gap-2">
              <Package className="w-4 h-4" />
              Produtos
            </TabsTrigger>
            <TabsTrigger value="categories" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Categorias
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="products" className="space-y-6">
            {/* Filters and Controls */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="w-5 h-5" />
                  Filtros e Ordenação
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <Label htmlFor="category-filter">Filtrar por Categoria</Label>
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione uma categoria" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todas as categorias</SelectItem>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex-1">
                    <Label htmlFor="sort-order">Ordenar por</Label>
                    <Select value={sortOrder} onValueChange={(value: 'recommended' | 'price-desc') => setSortOrder(value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="recommended">Ordem Adicionada (Recomendado)</SelectItem>
                        <SelectItem value="price-desc">Preço: Maior ao Menor</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
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
                      <Label htmlFor="product-category">Categoria</Label>
                      <Select value={newProduct.category_id} onValueChange={(value) => setNewProduct({ ...newProduct, category_id: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione uma categoria" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="product-image">URL da Imagem</Label>
                      <Input
                        id="product-image"
                        value={newProduct.image_url}
                        onChange={(e) => setNewProduct({ ...newProduct, image_url: e.target.value })}
                        placeholder="https://..."
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

            {/* Products Grid */}
            <Card>
              <CardHeader>
                <CardTitle>Produtos ({filteredProducts.length})</CardTitle>
                <CardDescription>
                  {selectedCategory !== 'all' 
                    ? `Exibindo produtos da categoria: ${categories.find(c => c.id === selectedCategory)?.name}`
                    : 'Exibindo todos os produtos'
                  }
                </CardDescription>
              </CardHeader>
              <CardContent>
                {filteredProducts.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <Upload className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <h3 className="text-lg font-medium mb-2">Nenhum produto encontrado</h3>
                    <p>Adicione produtos ou ajuste os filtros.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {filteredProducts.map((product) => (
                      <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                        <div className="aspect-square relative bg-muted">
                          {product.image_url ? (
                            <img 
                              src={product.image_url} 
                              alt={product.name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                                target.nextElementSibling?.classList.remove('hidden');
                              }}
                            />
                          ) : null}
                          <div className={`absolute inset-0 flex items-center justify-center text-muted-foreground ${product.image_url ? 'hidden' : ''}`}>
                            <Upload className="w-12 h-12" />
                          </div>
                          <div className="absolute top-2 right-2 flex flex-col gap-1">
                            {product.is_featured && (
                              <Badge className="bg-primary text-primary-foreground">Destaque</Badge>
                            )}
                            {!product.in_stock && (
                              <Badge variant="destructive">Sem estoque</Badge>
                            )}
                          </div>
                        </div>
                        <CardContent className="p-4">
                          <div className="space-y-2">
                            <h3 className="font-medium text-sm line-clamp-2">{product.name}</h3>
                            <div className="text-xs text-muted-foreground">
                              <div>Código: {product.code || 'N/A'}</div>
                              <div>Categoria: {product.categories?.name || 'Sem categoria'}</div>
                            </div>
                            <div className="text-sm font-medium">
                              {product.price ? `R$ ${product.price.toFixed(2)}` : 'Preço não definido'}
                            </div>
                            <div className="flex gap-2 pt-2">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="outline" size="sm" className="flex-1" onClick={() => setEditingProduct(product)}>
                                    <Pencil className="w-4 h-4 mr-1" />
                                    Editar
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-2xl">
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
                                          <Label htmlFor="edit-category">Categoria</Label>
                                          <Select 
                                            value={editingProduct.category_id || ''} 
                                            onValueChange={(value) => setEditingProduct({ ...editingProduct, category_id: value })}
                                          >
                                            <SelectTrigger>
                                              <SelectValue placeholder="Selecione uma categoria" />
                                            </SelectTrigger>
                                            <SelectContent>
                                              {categories.map((category) => (
                                                <SelectItem key={category.id} value={category.id}>
                                                  {category.name}
                                                </SelectItem>
                                              ))}
                                            </SelectContent>
                                          </Select>
                                        </div>
                                        <div>
                                          <Label htmlFor="edit-image">URL da Imagem</Label>
                                          <Input
                                            id="edit-image"
                                            value={editingProduct.image_url || ''}
                                            onChange={(e) => setEditingProduct({ ...editingProduct, image_url: e.target.value })}
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
                                    <Button variant="outline" onClick={() => setEditingProduct(null)}>
                                      Cancelar
                                    </Button>
                                    <Button onClick={updateProduct}>
                                      Salvar Alterações
                                    </Button>
                                  </DialogFooter>
                                </DialogContent>
                              </Dialog>
                              <Button
                                variant="destructive"
                                size="sm"
                                className="flex-1"
                                onClick={() => deleteProduct(product.id)}
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
          </TabsContent>

          <TabsContent value="categories" className="space-y-6">
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
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPanel;