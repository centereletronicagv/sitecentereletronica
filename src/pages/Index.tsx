
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8 text-center">
        <img 
          src="/lovable-uploads/8cc8ad74-c172-4c64-86e6-b25c57772868.png" 
          alt="Center Eletrônica Logo" 
          className="mx-auto mb-6 max-w-xs"
        />
        <h1 className="text-3xl font-bold mb-4">Bem-vindo à Center Eletrônica</h1>
        <p className="text-xl text-gray-600">Materiais Elétricos e Eletrônicos</p>
      </main>
      <Footer />
    </div>
  );
};

export default Index;

