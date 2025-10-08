import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { Upload, X } from 'lucide-react';

interface ProductImageUploadProps {
  onImageSelect: (imageUrl: string) => void;
  currentImage?: string;
}

const ProductImageUpload: React.FC<ProductImageUploadProps> = ({ onImageSelect, currentImage }) => {
  const [preview, setPreview] = useState<string>(currentImage || '');
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({
        variant: 'destructive',
        title: 'Erro',
        description: 'Por favor, selecione apenas arquivos de imagem'
      });
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        variant: 'destructive',
        title: 'Erro',
        description: 'A imagem deve ter no máximo 5MB'
      });
      return;
    }

    setIsUploading(true);

    try {
      // Convert to base64 for preview
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setPreview(base64String);
        onImageSelect(base64String);
        
        toast({
          title: 'Sucesso',
          description: 'Imagem carregada com sucesso'
        });
      };
      reader.readAsDataURL(file);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Erro',
        description: 'Erro ao carregar imagem'
      });
    } finally {
      setIsUploading(false);
    }
  };

  const clearImage = () => {
    setPreview('');
    onImageSelect('');
  };

  return (
    <div className="space-y-4">
      <Label>Imagem do Produto</Label>
      
      {preview ? (
        <div className="relative">
          <img 
            src={preview} 
            alt="Preview" 
            className="w-full h-48 object-cover rounded-lg border"
          />
          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2"
            onClick={clearImage}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      ) : (
        <div className="border-2 border-dashed rounded-lg p-8 text-center">
          <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
          <p className="text-sm text-muted-foreground mb-4">
            Arraste uma imagem ou clique para selecionar
          </p>
          <label htmlFor="image-upload">
            <Button type="button" variant="outline" disabled={isUploading} asChild>
              <span>
                {isUploading ? 'Carregando...' : 'Selecionar Imagem'}
              </span>
            </Button>
          </label>
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          <p className="text-xs text-muted-foreground mt-2">
            PNG, JPG ou WEBP (máx. 5MB)
          </p>
        </div>
      )}
    </div>
  );
};

export default ProductImageUpload;
