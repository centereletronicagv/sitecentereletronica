-- Limpar produtos existentes para evitar duplicados
DELETE FROM products;

-- Inserir TODOS os produtos únicos de todas as categorias
INSERT INTO products (name, code, price, image_url, category_id, description, in_stock, is_featured, popularity) 
SELECT 
  p.name,
  p.code,
  p.price,
  p.image_url,
  c.id as category_id,
  COALESCE(p.description, ''),
  COALESCE(p.in_stock, true),
  COALESCE(p.is_featured, false),
  COALESCE(p.popularity, 0)
FROM (VALUES
  -- AR CONDICIONADO - Suportes
  ('SUPORTE 400MM', '13160', 0, '/lovable-uploads/suporte.png', 'ar-condicionado', 'Suporte para unidades de ar condicionado 400mm', true, true, 5),
  ('SUPORTE 450MM', '12602', 0, '/lovable-uploads/suporte.png', 'ar-condicionado', 'Suporte para unidades de ar condicionado 450mm', true, true, 5),
  ('SUPORTE 500MM', '7204', 0, '/lovable-uploads/suporte.png', 'ar-condicionado', 'Suporte para unidades de ar condicionado 500mm', true, true, 5),
  ('SUPORTE 550MM', '13309', 0, '/lovable-uploads/suporte.png', 'ar-condicionado', 'Suporte para unidades de ar condicionado 550mm', true, true, 5),
  ('SUPORTE 900MM', '13310', 0, '/lovable-uploads/suporte.png', 'ar-condicionado', 'Suporte para unidades de ar condicionado 900mm', true, true, 5),
  
  -- AR CONDICIONADO - Tubulação
  ('TUBULAÇÃO 1/4', '12710', 0, '/lovable-uploads/tubulacao.png', 'ar-condicionado', 'Tubulação de cobre 1/4 - Por Metro', true, true, 8),
  ('TUBULAÇÃO 3/8', '12711', 0, '/lovable-uploads/tubulacao.png', 'ar-condicionado', 'Tubulação de cobre 3/8 - Por Metro', true, false, 8),
  ('TUBULAÇÃO 1/2', '12709', 0, '/lovable-uploads/tubulacao.png', 'ar-condicionado', 'Tubulação de cobre 1/2 - Por Metro', true, false, 8),
  ('TUBULAÇÃO 5/8', '12712', 0, '/lovable-uploads/tubulacao.png', 'ar-condicionado', 'Tubulação de cobre 5/8 - Por Metro', true, false, 8),
  ('TUBULAÇÃO 3/4', '12713', 0, '/lovable-uploads/tubulacao.png', 'ar-condicionado', 'Tubulação de cobre 3/4 - Por Metro', true, false, 8),
  ('ADAPTADOR P/ MANIFOLD R410 1/4 x 5/16', '13488', 0, '/lovable-uploads/adaptmanifold.png', 'ar-condicionado', 'Adaptador para manifold R410', true, false, 6),
  
  -- AR CONDICIONADO - Tubex
  ('TUBEX 1/4 2m', '7199', 0, '/lovable-uploads/tubex.png', 'ar-condicionado', 'Isolamento térmico Tubex 1/4 - 2 metros', true, false, 7),
  ('TUBEX 3/8 2m', '7200', 0, '/lovable-uploads/tubex.png', 'ar-condicionado', 'Isolamento térmico Tubex 3/8 - 2 metros', true, false, 7),
  ('TUBEX 1/2 2m', '7201', 0, '/lovable-uploads/tubex.png', 'ar-condicionado', 'Isolamento térmico Tubex 1/2 - 2 metros', true, false, 7),
  ('TUBEX 5/8 2m', '10504', 0, '/lovable-uploads/tubex.png', 'ar-condicionado', 'Isolamento térmico Tubex 5/8 - 2 metros', true, false, 7),
  ('TUBEX 3/4 2m', '100232514', 0, '/lovable-uploads/tubex.png', 'ar-condicionado', 'Isolamento térmico Tubex 3/4 - 2 metros', true, false, 7),
  
  -- AR CONDICIONADO - Fitas
  ('FITA PVC 10M', '7202', 0, '/lovable-uploads/fitapvc.png', 'ar-condicionado', 'Fita isolante PVC 10 metros', true, false, 6),
  ('FITA PVC PRETA 10M HULTER', '7899733813031', 0, '/lovable-uploads/fitapvcpreta.png', 'ar-condicionado', 'Fita isolante PVC preta 10 metros', true, false, 6),
  ('FITA ALUMINIZADA 45M', '7195', 0, '/lovable-uploads/fitaalum.png', 'ar-condicionado', 'Fita aluminizada 45 metros', true, false, 6),
  
  -- AR CONDICIONADO - Dreno
  ('MANGUEIRA P/ DRENO', '11407', 0, '/lovable-uploads/dreno.png', 'ar-condicionado', 'Mangueira para dreno - Por Metro', true, false, 7),
  ('MANGUEIRA P/ DRENO CRISTAL', '11993', 0, '/lovable-uploads/drenocristal.png', 'ar-condicionado', 'Mangueira cristal para dreno - Por Metro', true, false, 7),
  ('BICO P/ DRENO', '12644', 0, '/lovable-uploads/bicodreno.png', 'ar-condicionado', 'Bico para dreno', true, false, 6),
  
  -- AR CONDICIONADO - Fluídos
  ('FLUÍDO R32 650g', '7899733823641', 0, '/lovable-uploads/r32650g.png', 'ar-condicionado', 'Gás refrigerante R32 650g', true, false, 8),
  ('FLUÍDO R32 3Kg', '7899733819095', 0, '/lovable-uploads/r323kg.png', 'ar-condicionado', 'Gás refrigerante R32 3Kg', true, false, 8),
  ('FLUÍDO R410A 750g', '7899733805227', 0, '/lovable-uploads/r410a750g.png', 'ar-condicionado', 'Gás refrigerante R410A 750g', true, false, 8),
  ('FLUÍDO R22 900g', '7899733805180', 0, '/lovable-uploads/r22.png', 'ar-condicionado', 'Gás refrigerante R22 900g', true, false, 8),
  ('VÁLVULA P/ GÁS 1/2', '13255', 0, '/lovable-uploads/valve.png', 'ar-condicionado', 'Válvula para gás 1/2', true, false, 7),
  
  -- AR CONDICIONADO - Cabos
  ('CABO PP 4 X 1,5mm AR', '9947-AC', 0, '/lovable-uploads/pp4.png', 'ar-condicionado', 'Cabo PP 4 vias 1,5mm - Por Metro', true, false, 6),
  ('CABO PARALELO 2x2,5MM AR', '03856-AC', 0, '/lovable-uploads/paralelo2x25mm.png', 'ar-condicionado', 'Cabo paralelo 2x2,5mm - Por Metro', true, false, 6),
  ('CABO PARALELO PRETO 2x2,5MM AR', '13320-AC', 0, '/lovable-uploads/paralelopreto2x25mm.png', 'ar-condicionado', 'Cabo paralelo preto 2x2,5mm - Por Metro', true, false, 6),
  ('CABO PP 5 X 1,5mm AR', '8492-AC', 0, '/lovable-uploads/pp5.png', 'ar-condicionado', 'Cabo PP 5 vias 1,5mm - Por Metro', true, false, 6),
  
  -- AUTOMAÇÃO - Botões de Impulso
  ('BOTÃO DE IMPULSO ILUM. 1NA 24V AZUL', '7898623749054', NULL, '/lovable-uploads/impulsoazul.png', 'automacao', 'Botão de impulso iluminado azul com contato normalmente aberto para 24V', true, true, 8),
  ('BOTÃO DE IMPULSO ILUM. 1NA 24V VERDE', '7898623748996', NULL, '/lovable-uploads/impulsoverde.png', 'automacao', 'Botão de impulso iluminado verde com contato normalmente aberto para 24V', true, false, 7),
  ('BOTÃO DE IMPULSO ILUM. 1NF 24V VERMELHO', '7898623749016', NULL, '/lovable-uploads/impulsovermelho.png', 'automacao', 'Botão de impulso iluminado vermelho com contato normalmente fechado para 24V', true, false, 7),
  ('BOTÃO DE IMPULSO 1NA VERMELHO', '7891435935745', NULL, '/lovable-uploads/impulsovermelho1na.png', 'automacao', 'Botão de impulso vermelho com contato normalmente aberto', true, false, 6),
  ('BOTÃO DE IMPULSO 1NA VERDE', '7891435935738', NULL, '/lovable-uploads/impulsoverde1na.png', 'automacao', 'Botão de impulso verde com contato normalmente aberto', true, false, 6),
  ('BOTÃO DE IMPULSO 1 NA AZUL', '7891435935776', NULL, '/lovable-uploads/impulsoazul1na.png', 'automacao', 'Botão de impulso azul com contato normalmente aberto', true, false, 6),
  ('BOTÃO DE IMPULSO 1 NA AMARELO', '7891435935769', NULL, '/lovable-uploads/impulsoamarelo1na.png', 'automacao', 'Botão de impulso amarelo com contato normalmente aberto', true, false, 6),
  ('BOTÃO DE IMPULSO 1 NA BRANCO', '7891435935714', NULL, '/lovable-uploads/impulsobranco1na.png', 'automacao', 'Botão de impulso branco com contato normalmente aberto', true, false, 6),
  ('BOTÃO DE IMPULSO 1 NA PRETO', '7891435935721', NULL, '/lovable-uploads/impulsopreto1na.png', 'automacao', 'Botão de impulso preto com contato normalmente aberto', true, false, 6),
  ('BOTÃO DE IMPULSO 1 NF PRETO', '7891435935899', NULL, '/lovable-uploads/botaodeimpulsovermelho1nf.png', 'automacao', 'Botão de impulso preto com contato normalmente fechado', true, false, 6),
  
  -- AUTOMAÇÃO - Botões Duplos
  ('BOTÃO DE IMPULSO DUPLO ILU. 1NA+1NF 220V', '7898623748026', NULL, '/lovable-uploads/duploiluminadosibratec.png', 'automacao', 'Botão de impulso duplo iluminado 1NA+1NF para 220V', true, false, 7),
  ('BOTÃO DE IMPULSO DUPLO ILUM. 1NA+1NF 24V', '7898623747982', NULL, '/lovable-uploads/duploiluminadodeimpulso.png', 'automacao', 'Botão de impulso duplo iluminado 1NA+1NF para 24V', true, false, 7),
  ('BOTÃO DE IMPULSO DUPLO ILUM. 1NA+1NF 220V TRA', '7891435936452', NULL, '/lovable-uploads/impulsoduplotramontina.png', 'automacao', 'Botão de impulso duplo iluminado 1NA+1NF para 220V', true, false, 7),
  ('BOTÃO DE IMPULSO DUPLO 1NA+1NF', '7891435935806', NULL, '/lovable-uploads/tramontinaduplo.png', 'automacao', 'Botão de impulso duplo 1NA+1NF', true, false, 7),
  
  -- AUTOMAÇÃO - Emergência
  ('BOTÂO TIPO COGUMELO 1NF', '7891435935837', NULL, '/lovable-uploads/cogumelo.png', 'automacao', 'Botão tipo cogumelo com contato normalmente fechado', true, true, 9),
  ('BOTÃO DE EMERGÊNCIA 1NF', '7898623748842', NULL, '/lovable-uploads/emergencia.png', 'automacao', 'Botão de emergência com contato normalmente fechado', true, true, 9),
  
  -- INSTALAÇÕES ELÉTRICAS - Disjuntores WEG Monopolar
  ('DISJUNTOR MONO 6A C WEG', '7909522567707', 0, '/lovable-uploads/wegmono.png', 'instalacoes-eletricas', 'Disjuntor monopolar 6A curva C WEG', true, true, 8),
  ('DISJUNTOR MONO 10A C WEG', '7909522567677', 0, '/lovable-uploads/wegmono.png', 'instalacoes-eletricas', 'Disjuntor monopolar 10A curva C WEG', true, true, 8),
  ('DISJUNTOR MONO 16A C WEG', '7909522567714', 0, '/lovable-uploads/wegmono.png', 'instalacoes-eletricas', 'Disjuntor monopolar 16A curva C WEG', true, true, 8),
  ('DISJUNTOR MONO 20A C WEG', '7909522567721', 0, '/lovable-uploads/wegmono.png', 'instalacoes-eletricas', 'Disjuntor monopolar 20A curva C WEG', true, true, 8),
  ('DISJUNTOR MONO 25A C WEG', '7909522667738', 0, '/lovable-uploads/wegmono.png', 'instalacoes-eletricas', 'Disjuntor monopolar 25A curva C WEG', true, true, 8),
  ('DISJUNTOR MONO 32A C WEG', '7909522567745', 0, '/lovable-uploads/wegmono.png', 'instalacoes-eletricas', 'Disjuntor monopolar 32A curva C WEG', true, true, 8),
  ('DISJUNTOR MONO 40A C WEG', '7909522567752', 0, '/lovable-uploads/wegmono.png', 'instalacoes-eletricas', 'Disjuntor monopolar 40A curva C WEG', true, false, 7),
  ('DISJUNTOR MONO 50A C WEG', '7891435094336', 0, '/lovable-uploads/wegmono.png', 'instalacoes-eletricas', 'Disjuntor monopolar 50A curva C WEG', true, false, 7),
  ('DISJUNTOR MONO 63A C WEG', '7909522567776', 0, '/lovable-uploads/wegmono.png', 'instalacoes-eletricas', 'Disjuntor monopolar 63A curva C WEG', true, false, 7),
  
  -- INSTALAÇÕES ELÉTRICAS - Disjuntores Bipolares
  ('DISJUNTOR BIF. 16A C WEG', '7909522567820', 0, '/lovable-uploads/wegbif.png', 'instalacoes-eletricas', 'Disjuntor bipolar 16A curva C WEG', true, false, 7),
  ('DISJUNTOR BIF. 20A C WEG', '7909522567837', 0, '/lovable-uploads/wegbif.png', 'instalacoes-eletricas', 'Disjuntor bipolar 20A curva C WEG', true, false, 7),
  ('DISJUNTOR BIF. 32A C WEG', '7909522567851', 0, '/lovable-uploads/wegbif.png', 'instalacoes-eletricas', 'Disjuntor bipolar 32A curva C WEG', true, false, 7),
  ('DISJUNTOR BIF. 40A C WEG', '7909522567868', 0, '/lovable-uploads/wegbif.png', 'instalacoes-eletricas', 'Disjuntor bipolar 40A curva C WEG', true, false, 7),
  
  -- INSTALAÇÕES ELÉTRICAS - Disjuntores Tripolares
  ('DISJUNTOR TRIF. 25A C WEG', '7909522567950', 0, '/lovable-uploads/wegtrif.png', 'instalacoes-eletricas', 'Disjuntor tripolar 25A curva C WEG', true, false, 7),
  ('DISJUNTOR TRIF. 40A C WEG', '7890355193693', 0, '/lovable-uploads/wegtrif.png', 'instalacoes-eletricas', 'Disjuntor tripolar 40A curva C WEG', true, false, 7),
  ('DISJUNTOR TRIF. 50A C WEG', '7909522567981', 0, '/lovable-uploads/wegtrif.png', 'instalacoes-eletricas', 'Disjuntor tripolar 50A curva C WEG', true, false, 7),
  ('DISJUNTOR TRIF. 63A C WEG', '7909522567998', 0, '/lovable-uploads/wegtrif.png', 'instalacoes-eletricas', 'Disjuntor tripolar 63A curva C WEG', true, false, 7),
  ('DISJUNTOR TRIF. 80A C WEG', '7890355193938', 0, '/lovable-uploads/wegtrif.png', 'instalacoes-eletricas', 'Disjuntor tripolar 80A curva C WEG', true, false, 7),
  ('DISJUNTOR TRIF. 100A C WEG', '10062', 0, '/lovable-uploads/wegtrif.png', 'instalacoes-eletricas', 'Disjuntor tripolar 100A curva C WEG', true, false, 7),
  
  -- CABOS - Cabo PP
  ('CABO PP 2X1,00MM', '04071', NULL, '/lovable-uploads/pp2vias.png', 'cabos', 'Cabo paralelo PP 2x1,00mm', true, false, 6),
  ('CABO PP 2X1,50MM', '04452', NULL, '/lovable-uploads/pp2vias.png', 'cabos', 'Cabo paralelo PP 2x1,50mm', true, false, 6),
  ('CABO PP 2X2,50MM', '03429', NULL, '/lovable-uploads/pp2vias.png', 'cabos', 'Cabo paralelo PP 2x2,50mm', true, false, 6),
  ('CABO PP 3X1,00MM', '7340', NULL, '/lovable-uploads/pp3vias.png', 'cabos', 'Cabo paralelo PP 3x1,00mm', true, false, 6),
  ('CABO PP 3X1,50MM', '052205', NULL, '/lovable-uploads/pp3vias.png', 'cabos', 'Cabo paralelo PP 3x1,50mm', true, false, 6),
  ('CABO PP 3X2,50MM', '01651', NULL, '/lovable-uploads/pp3vias.png', 'cabos', 'Cabo paralelo PP 3x2,50mm', true, false, 6),
  ('CABO PP 3X4,00MM', '13182', NULL, '/lovable-uploads/pp3vias.png', 'cabos', 'Cabo paralelo PP 3x4,00mm', true, false, 6),
  ('CABO PP 4X1,00MM', '11854', NULL, '/lovable-uploads/pp4vias.png', 'cabos', 'Cabo paralelo PP 4x1,00mm', true, false, 6),
  ('CABO PP 4X1,50MM', '9947', NULL, '/lovable-uploads/pp4vias.png', 'cabos', 'Cabo paralelo PP 4x1,50mm', true, false, 6),
  ('CABO PP 4X2,50MM', '04236', NULL, '/lovable-uploads/pp4vias.png', 'cabos', 'Cabo paralelo PP 4x2,50mm', true, false, 6),
  ('CABO PP 4X4,00MM', '11831', NULL, '/lovable-uploads/pp4vias.png', 'cabos', 'Cabo paralelo PP 4x4,00mm', true, false, 6),
  ('CABO PP 5X1,50MM', '8492', NULL, '/lovable-uploads/pp5vias.png', 'cabos', 'Cabo paralelo PP 5x1,50mm', true, false, 6),
  ('CABO PP 5X2,50MM', '12706', NULL, '/lovable-uploads/pp5vias.png', 'cabos', 'Cabo paralelo PP 5x2,50mm', true, false, 6),
  ('CABO PP 5X4,00MM', '01643', NULL, '/lovable-uploads/pp5vias.png', 'cabos', 'Cabo paralelo PP 5x4,00mm', true, false, 6),
  
  -- CABOS - Cabo Flex
  ('CABO FLEX 0,50MM', '10674', NULL, '/lovable-uploads/flex05.png', 'cabos', 'Cabo flexível 0,50mm', true, false, 5),
  ('CABO FLEX 1,00MM', '9252', NULL, '/lovable-uploads/flex1.png', 'cabos', 'Cabo flexível 1,00mm', true, false, 5),
  ('CABO FLEX 1,50MM', '01323', NULL, '/lovable-uploads/flex15.png', 'cabos', 'Cabo flexível 1,50mm', true, false, 5),
  ('CABO FLEX 2,50MM', '05600', NULL, '/lovable-uploads/flex25.png', 'cabos', 'Cabo flexível 2,50mm', true, false, 5),
  ('CABO FLEX 4,00MM', '01657', NULL, '/lovable-uploads/flex4.png', 'cabos', 'Cabo flexível 4,00mm', true, false, 5),
  ('CABO FLEX 6,00MM', '05663', NULL, '/lovable-uploads/flex6.png', 'cabos', 'Cabo flexível 6,00mm', true, false, 5),
  ('CABO FLEX 10,00MM', '04255', NULL, '/lovable-uploads/flex10.png', 'cabos', 'Cabo flexível 10,00mm', true, false, 5),
  ('CABO FLEX 16,00MM', '7682', NULL, '/lovable-uploads/flex16.png', 'cabos', 'Cabo flexível 16,00mm', true, false, 5),
  
  -- CABOS - Cordão Paralelo
  ('CORDÃO PARALELO 2X0,75MM', '01081', NULL, '/lovable-uploads/paralelobranco.png', 'cabos', 'Cordão paralelo 2x0,75mm', true, false, 5),
  ('CORDÃO PARALELO PRETO 2X0,75MM', '13318', NULL, '/lovable-uploads/paralelopreto.png', 'cabos', 'Cordão paralelo preto 2x0,75mm', true, false, 5),
  ('CORDÃO PARALELO 2X1,00MM', '03855', NULL, '/lovable-uploads/paralelobranco.png', 'cabos', 'Cordão paralelo 2x1,00mm', true, false, 5),
  ('CORDÃO PARALELO 2X1,50MM', '01633', NULL, '/lovable-uploads/paralelobranco.png', 'cabos', 'Cordão paralelo 2x1,50mm', true, false, 5),
  ('CORDÃO PARALELO PRETO 2X1,50MM', '13319', NULL, '/lovable-uploads/paralelopreto.png', 'cabos', 'Cordão paralelo preto 2x1,50mm', true, false, 5),
  ('CORDÃO PARALELO 2X2,50MM', '03856', NULL, '/lovable-uploads/paralelobranco.png', 'cabos', 'Cordão paralelo 2x2,50mm', true, false, 5),
  ('CORDÃO PARALELO PRETO 2X2,50MM', '13320', NULL, '/lovable-uploads/paralelopreto.png', 'cabos', 'Cordão paralelo preto 2x2,50mm', true, false, 5),
  ('CORDÃO PARALELO 2X4,00MM', '13183', NULL, '/lovable-uploads/paralelobranco.png', 'cabos', 'Cordão paralelo 2x4,00mm', true, false, 5),
  
  -- CABOS - Comando, Coaxial, Ethernet
  ('CABO DE COMANDO 7X1,00MM', '12780', NULL, '/lovable-uploads/cmd7.png', 'cabos', 'Cabo de comando 7x1,00mm', true, false, 6),
  ('CABO DE COMANDO 12X1,00MM', '12866', NULL, '/lovable-uploads/cmd12.png', 'cabos', 'Cabo de comando 12x1,00mm', true, false, 6),
  ('COAXIAL RG59', '03256', NULL, '/lovable-uploads/rg59.png', 'cabos', 'Cabo coaxial RG59', true, false, 6),
  ('COAXIAL CFTV', '06095', NULL, '/lovable-uploads/cftv.png', 'cabos', 'Cabo coaxial CFTV', true, false, 6),
  ('CAT5e HOMOLOGADO SOHO PLUS', '04687', NULL, '/lovable-uploads/5e.png', 'cabos', 'Cabo de rede Cat5e homologado', true, false, 6),
  ('CAT5e EXTERNO', '4928', NULL, '/lovable-uploads/5externo.png', 'cabos', 'Cabo de rede Cat5e externo', true, false, 6),
  ('CAT6 HOMOLOGADO DRAKA', '11271', NULL, '/lovable-uploads/cat6.png', 'cabos', 'Cabo de rede Cat6 homologado', true, false, 6),
  
  -- TERMINAIS - Conectores WAGO
  ('CONECTOR WAGO 221 4MM 32A 2P', '10154', 0, '/lovable-uploads/wagoemenda.png', 'terminais', 'Conector tipo WAGO 221 4MM 32A 2P para emendas', true, true, 9),
  ('CONECTOR WAGO 221 4MM 32A 2P IN-LINE', '11868', 0, '/lovable-uploads/emendainline.png', 'terminais', 'Conector tipo WAGO 221 4MM 32A 2P para emendas in-line', true, false, 8),
  ('CONECTOR WAGO 221 4MM 32A 3P', '10396', 0, '/lovable-uploads/wagoderivacao.png', 'terminais', 'Conector tipo WAGO 221 4MM 32A 3P para derivação', true, false, 8),
  
  -- TERMINAIS - Conectores de Torção
  ('CONECTOR DE TORÇÃO 1MM 100 UN.', '7899287703017', 0, '/lovable-uploads/torcaocinza.png', 'terminais', 'Conector de torção para cabos de 1mm, pacote com 100 unidades', true, false, 7),
  ('CONECTOR DE TORÇÃO 2,5MM 100 UN.', '7899287703024', 0, '/lovable-uploads/torcaoazul.png', 'terminais', 'Conector de torção para cabos de 2,5mm, pacote com 100 unidades', true, false, 7),
  ('CONECTOR DE TORÇÃO 10MM', '7898009454367', 0, '/lovable-uploads/torcaoamarelo.png', 'terminais', 'Conector de torção para cabos de 10mm', true, false, 7),
  ('CONECTOR DE TORÇÃO 16MM', '7898009454374', 0, '/lovable-uploads/torcaovermelho.png', 'terminais', 'Conector de torção para cabos de 16mm', true, false, 7),
  
  -- TERMINAIS - Perfurantes
  ('CONECTOR PERFURANTE 0,5-1,5MM', '7891435960952', 0, '/lovable-uploads/perfurantevermelho.png', 'terminais', 'Conector perfurante para cabos de 0,5-1,5mm', true, false, 7),
  ('CONECTOR PERFURANTE 1,5-2,5MM', '7898009454350', 0, '/lovable-uploads/perfuranteazul.png', 'terminais', 'Conector perfurante para cabos de 1,5-2,5mm', true, false, 7),
  ('CONECTOR PERFURANTE 4-6MM', '7898009454367-B', 0, '/lovable-uploads/perfuranteamarelo.png', 'terminais', 'Conector perfurante para cabos de 4-6mm', true, false, 7),
  
  -- TERMINAIS - Tubulares
  ('TERMINAL TUBULAR PRÉ ISOLADO 1MM 50 UN.', '7899287708807', 0, '/lovable-uploads/tubularvermelho.png', 'terminais', 'Terminal tubular pré isolado 1mm, pacote com 50 unidades', true, false, 6),
  ('TERMINAL TUBULAR PRÉ ISOLADO 1,5MM 50 UN.', '7899287708814', 0, '/lovable-uploads/tubularpreto.png', 'terminais', 'Terminal tubular pré isolado 1,5mm, pacote com 50 unidades', true, false, 6),
  ('TERMINAL TUBULAR PRÉ ISOLADO 2,5MM 50 UN.', '7899287708845', 0, '/lovable-uploads/tubularazul.png', 'terminais', 'Terminal tubular pré isolado 2,5mm, pacote com 50 unidades', true, false, 6),
  ('TERMINAL TUBULAR PRÉ ISOLADO 4MM 50 UN.', '7899287708876', 0, '/lovable-uploads/tubularcinza.png', 'terminais', 'Terminal tubular pré isolado 4mm, pacote com 50 unidades', true, false, 6),
  ('TERMINAL TUBULAR PRÉ ISOLADO 6MM 50 UN.', '7899287708906', 0, '/lovable-uploads/tubularamarelo.png', 'terminais', 'Terminal tubular pré isolado 6mm, pacote com 50 unidades', true, false, 6),
  ('TERMINAL TUBULAR PRÉ ISOLADO 10MM 50 UN.', '7899287708920', 0, '/lovable-uploads/tubular10.png', 'terminais', 'Terminal tubular pré isolado 10mm, pacote com 50 unidades', true, false, 6),
  
  -- TERMINAIS - Pinos
  ('TERMINAL PINO PRÉ ISOLADO 1,5MM 50 UN.', '7899287703307', 0, '/lovable-uploads/pinovermelho.png', 'terminais', 'Terminal pino pré isolado 1,5mm, pacote com 50 unidades', true, false, 6),
  ('TERMINAL PINO PRÉ ISOLADO 2,5MM 50 UN.', '7899287703321', 0, '/lovable-uploads/pinoazul.png', 'terminais', 'Terminal pino pré isolado 2,5mm, pacote com 50 unidades', true, false, 6),
  ('TERMINAL PINO PRÉ ISOLADO 6MM 50 UN.', '7899287703338', 0, '/lovable-uploads/pinoamarelo.png', 'terminais', 'Terminal pino pré isolado 6mm, pacote com 50 unidades', true, false, 6),
  
  -- TERMINAIS - Olhais
  ('TERMINAL OLHAL PRÉ ISOLADO 1,5MM 100 UN.', '7899287703130', 0, '/lovable-uploads/olhalvermelho.png', 'terminais', 'Terminal olhal pré isolado 1,5mm, pacote com 100 unidades', true, false, 6),
  ('TERMINAL OLHAL PRÉ ISOLADO 2,5MM 100 UN.', '7899287703185', 0, '/lovable-uploads/olhalazul.png', 'terminais', 'Terminal olhal pré isolado 2,5mm, pacote com 100 unidades', true, false, 6),
  ('TERMINAL OLHAL PRÉ ISOLADO 6MM 100 UN.', '7899287703260', 0, '/lovable-uploads/olhalamarelo.png', 'terminais', 'Terminal olhal pré isolado 6mm, pacote com 100 unidades', true, false, 6),
  ('TERMINAL OLHAL PRÉ ISOLADO 10MM', '7898640441320', 0, '/lovable-uploads/olhal10.png', 'terminais', 'Terminal olhal pré isolado 10mm', true, false, 6),
  ('TERMINAL OLHAL PRÉ ISOLADO 16MM', '7898640441337', 0, '/lovable-uploads/olhal16.png', 'terminais', 'Terminal olhal pré isolado 16mm', true, false, 6),
  
  -- INFORMÁTICA
  ('CABO DE REDE CAT6', 'CAT6-001', 2.50, '/lovable-uploads/cat6.png', 'informatica', 'Cabo de rede Cat6 UTP para conexões Ethernet de alta velocidade', true, true, 8),
  ('CONECTOR RJ45', 'RJ45-001', 0.50, '/lovable-uploads/generico.png', 'informatica', 'Conector RJ45 para cabos de rede Ethernet', true, false, 6),
  
  -- MONITORAMENTO
  ('CABO COAXIAL RG59 CFTV', 'RG59-001', 3.20, '/lovable-uploads/rg59.png', 'monitoramento', 'Cabo coaxial RG59 para sistemas de CFTV e monitoramento', true, false, 7),
  ('CAMERA CFTV', 'CFTV-001', 120.00, '/lovable-uploads/cftv.png', 'monitoramento', 'Câmera para sistema de circuito fechado de TV', true, true, 8),
  
  -- TOMADAS INDUSTRIAIS - Plugs
  ('PLUG 2P + T 16A 200-250V', '7898942135019', NULL, '/lovable-uploads/femea15.png', 'tomadas-industriais', 'Plug industrial 2P + T 16A 200-250V', true, true, 8),
  ('PLUG 2P + T 32A 200-250V', '7898942135026', NULL, '/lovable-uploads/femea25.png', 'tomadas-industriais', 'Plug industrial 2P + T 32A 200-250V', true, false, 7),
  ('PLUG 3P + T 16A 380-415V', '7898942135033', NULL, '/lovable-uploads/femea15.png', 'tomadas-industriais', 'Plug industrial 3P + T 16A 380-415V', true, false, 7),
  ('PLUG 3P + T 32A 380-415V', '7898942135040', NULL, '/lovable-uploads/femea25.png', 'tomadas-industriais', 'Plug industrial 3P + T 32A 380-415V', true, false, 7),
  
  -- TOMADAS INDUSTRIAIS - Acopladores
  ('ACOPLADOR 2P + T 16A 200-250V', '7898942135057', NULL, '/lovable-uploads/acoplador.png', 'tomadas-industriais', 'Acoplador industrial 2P + T 16A 200-250V', true, false, 6),
  ('ACOPLADOR 2P + T 32A 200-250V', '7898942135064', NULL, '/lovable-uploads/acoplador.png', 'tomadas-industriais', 'Acoplador industrial 2P + T 32A 200-250V', true, false, 6)
  
) AS p(name, code, price, image_url, category_name, description, in_stock, is_featured, popularity)
JOIN categories c ON c.name = p.category_name;