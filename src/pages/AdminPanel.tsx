import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/SupabaseAuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { Pencil, Trash2, Plus, Upload } from 'lucide-react';
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
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
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
      .order('name');
    
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

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Carregando...</div>;
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Painel Administrativo</h1>
      
      <Tabs defaultValue="products" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="products">Produtos</TabsTrigger>
          <TabsTrigger value="categories">Categorias</TabsTrigger>
        </TabsList>
        
        <TabsContent value="products" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Gerenciar Produtos</CardTitle>
              <CardDescription>Adicione, edite e remova produtos</CardDescription>
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

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Código</TableHead>
                    <TableHead>Categoria</TableHead>
                    <TableHead>Preço</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell>{product.code}</TableCell>
                      <TableCell>{product.categories?.name || 'Sem categoria'}</TableCell>
                      <TableCell>{product.price ? `R$ ${product.price.toFixed(2)}` : 'N/A'}</TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          {product.in_stock && <Badge variant="outline">Em estoque</Badge>}
                          {product.is_featured && <Badge>Destaque</Badge>}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm" onClick={() => setEditingProduct(product)}>
                                <Pencil className="w-4 h-4" />
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
                                        onChange={(e) => setEditingProduct({ ...editingProduct, price: parseFloat(e.target.value) || 0 })}
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
                                <Button onClick={updateProduct}>Salvar Alterações</Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                          <Button variant="destructive" size="sm" onClick={() => deleteProduct(product.id)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="categories" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Gerenciar Categorias</CardTitle>
              <CardDescription>Adicione, edite e remova categorias</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 mb-6">
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
                  <Textarea
                    id="category-description"
                    value={newCategory.description}
                    onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                    placeholder="Descrição da categoria"
                  />
                </div>
                <Button onClick={createCategory} className="w-full md:w-auto">
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar Categoria
                </Button>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Descrição</TableHead>
                    <TableHead>Criada em</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {categories.map((category) => (
                    <TableRow key={category.id}>
                      <TableCell className="font-medium">{category.name}</TableCell>
                      <TableCell>{category.description || 'Sem descrição'}</TableCell>
                      <TableCell>{new Date(category.created_at).toLocaleDateString('pt-BR')}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm" onClick={() => setEditingCategory(category)}>
                                <Pencil className="w-4 h-4" />
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
                                    <Label htmlFor="edit-category-name">Nome</Label>
                                    <Input
                                      id="edit-category-name"
                                      value={editingCategory.name}
                                      onChange={(e) => setEditingCategory({ ...editingCategory, name: e.target.value })}
                                    />
                                  </div>
                                  <div>
                                    <Label htmlFor="edit-category-description">Descrição</Label>
                                    <Textarea
                                      id="edit-category-description"
                                      value={editingCategory.description || ''}
                                      onChange={(e) => setEditingCategory({ ...editingCategory, description: e.target.value })}
                                    />
                                  </div>
                                </div>
                              )}
                              <DialogFooter>
                                <Button onClick={updateCategory}>Salvar Alterações</Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                          <Button variant="destructive" size="sm" onClick={() => deleteCategory(category.id)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPanel;