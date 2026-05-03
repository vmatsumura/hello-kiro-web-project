﻿# Plano de Implementacao: Portal do Automovel (auto-compara-portal)

## Visao Geral

Este plano converte o design tecnico em tarefas incrementais de codificacao, ordenadas por dependencia. Cada tarefa constroi sobre as anteriores, garantindo que nenhum codigo fique orfao ou desconectado. A linguagem de implementacao e **TypeScript** com React 18+, MUI v6, Vite, Vitest e fast-check.

## Tarefas

- [x] 1. Configurar infraestrutura do projeto (Vite, TypeScript, ESLint, Vitest, MSW)
  - Inicializar projeto Vite com template React + TypeScript strict
  - Configurar 	sconfig.json com strict: true, paths e aseUrl
  - Instalar e configurar ESLint + Prettier com regras do projeto
  - Configurar itest.config.ts com jsdom, setupFiles, globals e thresholds de cobertura por camada
  - Criar src/setupTests.ts com @testing-library/jest-dom e setup do MSW server
  - Instalar dependencias: 
eact-router-dom, zustand, 
eact-i18next, i18next, @mui/material, @emotion/react, @emotion/styled, ast-check, jest-axe, msw, dompurify
  - Criar src/mocks/handlers.ts e src/mocks/server.ts com setup basico do MSW
  - Criar .env.example e adicionar .env e .env.local ao .gitignore
  - _Requisitos: 13.2, 14.1, 14.2, 14.3, 14.4, 15.3_

- [x] 2. Definir tipos TypeScript centrais e tokens de tema
  - [x] 2.1 Criar src/types/vehicle.ts com o schema completo do veiculo
    - Implementar todos os enums: TipoCombustivel, TipoTransmissao, TipoTracao, TipoFreio, TipoArCondicionado, CategoriaFoto
    - Implementar todas as interfaces de sub-objetos: VehicleIdentificacao, MotorTransmissao, Desempenho, DimensoesPeso, RodasPneusFreios, SegurancaAtiva, SegurancaPassiva, TecnologiaConectividade, ConfortoConveniencias, CapacidadePassageiros
    - Implementar VehicleEspecificacoes, VehicleMidia, FotosPorCategoria e o tipo principal Vehicle
    - Implementar tipos auxiliares: SpecBlockKey, SpecKey, SpecMetadata
    - Garantir que todos os campos ausentes sejam 
ull (nao undefined)
    - _Requisitos: 9.1, 9.2, 9.3, 9.4, 9.5, 9.6, 9.7, 9.8_

  - [x] 2.2 Criar src/types/comparison.ts com tipos do estado de comparacao
    - Definir ComparisonSlot com ehicle: Vehicle | null e error: string | null
    - Definir tipos auxiliares para o estado do store
    - _Requisitos: 9.1_

  - [x] 2.3 Criar src/types/i18n.d.ts com tipos de namespace i18n
    - Declarar modulos para common, comparison, ehicle e errors
    - _Requisitos: 11.1_

  - [x] 2.4 Criar src/theme/tokens.ts com tokens de cor para diferencas e melhor valor
    - Definir tokens para fundo de linha com diferenca (light e dark)
    - Definir tokens para badge de melhor valor (higher e lower)
    - _Requisitos: 5.6_

  - [x] 2.5 Criar src/theme/index.ts com tema MUI light e dark
    - Implementar aseTheme com tipografia Inter, spacing 8, borderRadius 8
    - Implementar lightTheme e darkTheme estendendo aseTheme
    - Adicionar override de prefers-reduced-motion via MuiCssBaseline
    - Referenciar tokens de 	okens.ts para cores de diferenca e melhor valor
    - _Requisitos: 5.6, 12.2, 12.6_


- [ ] 3. Implementar utilitarios puros
  - [x] 3.1 Criar src/utils/slugify.ts
    - Implementar funcao slugify(text: string): string que converte texto para formato kebab-case lowercase, removendo acentos e caracteres especiais
    - Implementar funcao uildVehicleId(marca, modelo, versao, ano): string que gera o ID no formato {marca}-{modelo}-{versao}-{ano}
    - _Requisitos: 9.2_

  - [ ]* 3.2 Escrever testes de propriedade para slugify
    - **Propriedade 16: ID do Veiculo e Derivavel dos Campos de Identificacao**
    - **Valida: Requisito 9.2**
    - Verificar que uildVehicleId sempre retorna string correspondendo ao padrao ^[a-z0-9]+(-[a-z0-9]+)*$
    - Verificar que o resultado e idempotente (slugify(slugify(x)) === slugify(x))

  - [x] 3.3 Criar src/utils/sanitizeUrlParam.ts
    - Implementar sanitizeUrlParam(input: string): string | null que retorna 
ull para strings que nao correspondam ao padrao ^[a-z0-9]+(-[a-z0-9]+)*$ ou que excedam 100 caracteres
    - _Requisitos: 2.3, 15.4, 15.5_

  - [ ]* 3.4 Escrever testes de propriedade para sanitizeUrlParam
    - **Propriedade 6: Sanitizacao de Parametros de URL Rejeita Entradas Invalidas**
    - **Valida: Requisitos 2.3, 15.4**
    - Usar c.string().filter(...) para gerar strings invalidas e verificar retorno 
ull
    - Verificar que strings validas no padrao sao aceitas

  - [x] 3.5 Criar src/utils/formatCurrency.ts
    - Implementar ormatCurrency(value: number | null): string que formata MSRP em R$ com Intl.NumberFormat pt-BR
    - Retornar '—' quando alue for 
ull
    - _Requisitos: 3.1, 4.3_

  - [ ]* 3.6 Escrever testes unitarios para ormatCurrency
    - Testar formatacao de valores positivos, zero e 
ull
    - _Requisitos: 3.1, 4.3_

  - [x] 3.7 Criar src/utils/specMetadata.ts
    - Implementar array SPEC_METADATA: SpecMetadata[] com todos os campos dos 9 blocos de especificacoes
    - Cada entrada deve ter key (formato loco.campo), labelKey (chave i18n), unit, descriptionKey e isHigherBetter
    - Implementar getSpecsForBlock(blockKey: SpecBlockKey): SpecMetadata[]
    - Implementar getSpecValue(vehicle: Vehicle, specKey: SpecKey): string | number | null
    - _Requisitos: 4.1, 4.4, 5.3, 5.4, 5.5_

  - [ ]* 3.8 Escrever testes unitarios para specMetadata
    - Verificar que todos os 9 blocos retornam pelo menos uma spec
    - Verificar que getSpecValue retorna 
ull para campos ausentes
    - _Requisitos: 4.1, 9.4_


- [x] 4. Implementar arquivos de localizacao (i18n)
  - Criar src/locales/pt-BR/common.json com textos gerais: pp, ctions, placeholders, 	heme
  - Criar src/locales/pt-BR/comparison.json com textos da pagina de comparacao: locks (9 blocos), 	oggle, estValue, photoCategories (9 categorias)
  - Criar src/locales/pt-BR/vehicle.json com rotulos de todas as especificacoes tecnicas e descricoes para tooltips (um por campo do schema)
  - Criar src/locales/pt-BR/errors.json com mensagens de erro: invalidUrl, invalidVehicleId, insufficientVehicles, sectionError
  - Criar src/i18n.ts com configuracao do 
eact-i18next importando os 4 namespaces
  - Garantir que nenhum texto visivel ao usuario esteja hardcoded nos componentes
  - _Requisitos: 11.1, 11.2, 11.3, 11.4, 11.5_

- [x] 5. Implementar servicos de dados
  - [x] 5.1 Criar src/services/urlSerializer.ts
    - Implementar uildComparisonUrl(ids: string[]): string que serializa IDs como query params ?v=id1&v=id2
    - Implementar parseComparisonUrl(search: string): string[] que extrai e sanitiza os IDs da URL
    - _Requisitos: 2.1, 2.2, 2.5_

  - [ ]* 5.2 Escrever testes de propriedade para urlSerializer
    - **Propriedade 5: Round-Trip de Serializacao de URL**
    - **Valida: Requisitos 2.1, 2.2, 2.5**
    - Usar c.array(fc.constantFrom(...allIds), { minLength: 2, maxLength: 4 }) para gerar listas validas
    - Verificar que parseComparisonUrl(buildComparisonUrl(ids)) retorna os mesmos IDs na mesma ordem

  - [x] 5.3 Criar src/services/vehicleRepository.ts
    - Implementar ehicleRepository com os metodos: getBrands(), getModelsByBrand(brand), getYearsByModel(model), getVersionsByModelAndYear(model, year), indById(id), indBySlug(marca, modelo, versao, ano), getAllIds()
    - Importar dados de src/data/toyota.ts, src/data/honda.ts, src/data/nissan.ts
    - Garantir que todos os metodos retornem arrays vazios (nao erros) quando nao ha dados
    - _Requisitos: 1.3, 1.4, 1.5, 9.9_

  - [ ]* 5.4 Escrever testes de propriedade para ehicleRepository
    - **Propriedade 1: Filtragem Encadeada Retorna Apenas Resultados Pertencentes ao Filtro Pai**
    - **Valida: Requisitos 1.3, 1.4, 1.5**
    - Verificar que getModelsByBrand(M) retorna apenas modelos da marca M
    - Verificar que getYearsByModel(M) retorna apenas anos de veiculos com modelo M
    - Verificar que getVersionsByModelAndYear(M, A) retorna apenas versoes com modelo M e ano A

  - [ ]* 5.5 Escrever testes unitarios para ehicleRepository
    - Testar indById com ID valido e invalido
    - Testar indBySlug com combinacao valida e invalida
    - Testar getAllIds retorna lista nao vazia
    - _Requisitos: 1.3, 1.4, 1.5, 9.9_


- [ ] 6. Implementar stores Zustand
  - [x] 6.1 Criar src/store/useComparisonStore.ts
    - Implementar store com estado: slots: ComparisonSlot[] (inicial: 2 slots vazios) e showOnlyDiffs: boolean
    - Implementar acoes: setVehicles, ddSlot, 
emoveSlot, setVehicleInSlot, setSlotError, 	oggleShowOnlyDiffs, 
eset
    - Implementar seletores derivados: illedVehicles() e canCompare()
    - Garantir limites: MIN_SLOTS = 2, MAX_SLOTS = 4
    - _Requisitos: 1.1, 1.7, 1.8, 1.9, 3.4_

  - [ ]* 6.2 Escrever testes de propriedade para useComparisonStore
    - **Propriedade 2: Numero de Slots Sempre Entre 2 e 4**
    - **Valida: Requisito 1.1**
    - Gerar sequencias aleatorias de operacoes ddSlot/
emoveSlot e verificar que slots.length permanece em [2, 4]
    - **Propriedade 3: Remocao de Slot Preserva os Demais**
    - **Valida: Requisito 1.7**
    - Verificar que apos 
emoveSlot(i), todos os outros slots mantem seus veiculos intactos
    - **Propriedade 4: Botao de Comparar Habilitado se e Somente se ha >= 2 Veiculos**
    - **Valida: Requisitos 1.8, 1.9**
    - Verificar que canCompare() retorna 	rue se e somente se ha >= 2 slots com veiculo nao-nulo

  - [x] 6.3 Criar src/store/useThemeStore.ts
    - Implementar store com persist middleware do Zustand
    - Estado inicial: detectar prefers-color-scheme do sistema
    - Acao 	oggleMode() alterna entre 'light' e 'dark'
    - Persistir em localStorage com chave 'auto-compara-theme'
    - _Requisitos: 12.6_

- [ ] 7. Implementar hooks de logica de negocio
  - [x] 7.1 Criar src/hooks/useDiffHighlight.ts
    - Implementar useDiffHighlight(values: (string | number | null)[]): boolean
    - Retornar 	rue se e somente se ha pelo menos 2 valores nao-nulos distintos
    - Usar useMemo para memoizar o calculo
    - _Requisitos: 5.1, 5.2_

  - [ ]* 7.2 Escrever testes de propriedade para useDiffHighlight
    - **Propriedade 10: Diferenca Visual Presente se e Somente se Valores Diferem**
    - **Valida: Requisitos 5.1, 5.2**
    - Verificar que retorna 	rue se e somente se existe par de valores nao-nulos distintos
    - Testar com arrays de valores identicos, distintos e com nulls

  - [x] 7.3 Criar src/hooks/useBestValue.ts
    - Implementar useBestValue(values: (string | number | null)[], isHigherBetter: boolean | null): number | null
    - Retornar 
ull quando isHigherBetter === null ou quando ha menos de 2 valores numericos
    - Retornar indice do maior valor quando isHigherBetter === true
    - Retornar indice do menor valor quando isHigherBetter === false
    - _Requisitos: 5.3, 5.4, 5.5_

  - [ ]* 7.4 Escrever testes de propriedade para useBestValue
    - **Propriedade 11: Melhor Valor Calculado Corretamente por Direcao**
    - **Valida: Requisitos 5.3, 5.4**
    - Usar c.array(fc.float({ min: 0, max: 1000, noNaN: true }), { minLength: 2, maxLength: 4 })
    - Verificar que retorna indice do Math.max quando isHigherBetter=true
    - Verificar que retorna indice do Math.min quando isHigherBetter=false
    - Verificar que retorna 
ull quando isHigherBetter=null

  - [x] 7.5 Criar src/hooks/useFilteredSpecs.ts
    - Implementar useFilteredSpecs(blockKey, vehicles, showOnlyDiffs): SpecMetadata[]
    - Quando showOnlyDiffs=false, retornar todas as specs do bloco
    - Quando showOnlyDiffs=true, filtrar apenas specs com pelo menos um par de valores distintos
    - Manter specs com dados insuficientes (< 2 valores nao-nulos) quando toggle ativo
    - _Requisitos: 6.2, 6.3, 6.4_

  - [ ]* 7.6 Escrever testes de propriedade para useFilteredSpecs
    - **Propriedade 12: Toggle Ativo Oculta Apenas Linhas com Valores Identicos**
    - **Valida: Requisito 6.2**
    - Verificar que com toggle ativo, todas as specs retornadas tem pelo menos um par de valores distintos
    - **Propriedade 13: Toggle Ativo Oculta Bloco Inteiro Quando Todas as Linhas Sao Identicas**
    - **Valida: Requisito 6.4**
    - Verificar que quando todas as specs de um bloco sao identicas, useFilteredSpecs retorna array vazio com toggle ativo
    - **Propriedade 14: Toggle Desativado Restaura Todas as Linhas**
    - **Valida: Requisito 6.3**
    - Verificar que ativar e desativar o toggle resulta no mesmo conjunto de specs que o estado inicial

  - [x] 7.7 Criar src/hooks/useVehicleSelector.ts
    - Implementar useVehicleSelector(slotIndex: number) com estado local para selectedBrand, selectedModel, selectedYear, selectedVersion
    - Calcular rands, models, years, ersions com useMemo chamando ehicleRepository
    - Calcular selectedVehicle com useMemo chamando ehicleRepository.findBySlug
    - Retornar estado e setters
    - _Requisitos: 1.2, 1.3, 1.4, 1.5, 1.6_

  - [ ]* 7.8 Escrever testes unitarios para useVehicleSelector
    - Testar que models e vazio quando selectedBrand e null
    - Testar que years e vazio quando selectedModel e null
    - Testar que selectedVehicle e null quando algum filtro nao esta preenchido
    - _Requisitos: 1.2, 1.3, 1.4, 1.5_

  - [x] 7.9 Criar src/hooks/useComparisonUrl.ts
    - Implementar sincronizacao bidirecional URL <-> store usando useSearchParams
    - Leitura (URL -> Store): ao montar e quando URL muda, extrair IDs, sanitizar, resolver via ehicleRepository, chamar setVehicles
    - Escrita (Store -> URL): expor syncToUrl(vehicles) que atualiza searchParams sem recarregar a pagina
    - Redirecionar para /selecionar quando URL tem menos de 2 IDs validos
    - _Requisitos: 2.1, 2.2, 2.3, 2.4, 2.5, 15.4, 15.5_

  - [ ]* 7.10 Escrever testes unitarios para useComparisonUrl
    - Testar que IDs validos na URL carregam os veiculos no store
    - Testar que ID invalido na URL define erro no slot correspondente
    - Testar que URL com < 2 IDs validos redireciona para /selecionar
    - _Requisitos: 2.2, 2.3, 2.4_


- [x] 8. Checkpoint — Verificar fundacao
  - Garantir que todos os testes de utilitarios, servicos, stores e hooks passam
  - Verificar cobertura: utils >= 95%, hooks >= 90%, services >= 80%
  - Garantir que o TypeScript compila sem erros (	sc --noEmit)
  - Perguntar ao usuario se ha duvidas antes de prosseguir para os componentes

- [ ] 9. Implementar componentes UI atomicos (src/components/ui/)
  - [x] 9.1 Criar src/utils/test-utils.tsx com ThemeWrapper e re-exportacoes do RTL
    - Envolver com MemoryRouter, ThemeProvider e I18nextProvider
    - Re-exportar tudo de @testing-library/react
    - _Requisitos: 14.5_

  - [x] 9.2 Criar src/components/ui/ImageWithFallback/ImageWithFallback.tsx
    - Renderizar <Box component="img"> com src, lt, width, height e loading="lazy"
    - Quando src e 
ull ou imagem falha ao carregar, exibir placeholder com allbackText
    - Usar onError para detectar falha de carregamento
    - _Requisitos: 3.3, 7.3, 7.5, 13.3_

  - [ ]* 9.3 Escrever testes de componente para ImageWithFallback
    - Testar renderizacao com src valido
    - Testar exibicao do placeholder quando src e 
ull
    - Testar exibicao do placeholder quando imagem falha (onError)
    - Testar que lt e sempre definido
    - Incluir teste de acessibilidade com jest-axe
    - _Requisitos: 7.4, 12.1_

  - [x] 9.4 Criar src/components/ui/BestValueBadge/BestValueBadge.tsx
    - Renderizar badge/chip MUI indicando melhor valor
    - Exibir icone e texto diferente para isHigherBetter=true (maior e melhor) e alse (menor e melhor)
    - Usar chaves i18n comparison:bestValue.higher e comparison:bestValue.lower
    - _Requisitos: 5.3, 5.4_

  - [ ]* 9.5 Escrever testes de componente para BestValueBadge
    - Testar renderizacao para isHigherBetter=true e alse
    - Incluir teste de acessibilidade com jest-axe
    - _Requisitos: 5.3, 5.4_

  - [x] 9.6 Criar src/components/ui/SpecTooltip/SpecTooltip.tsx
    - Envolver o rotulo da spec em Tooltip do MUI com description e unit
    - Garantir que o tooltip seja ativado por hover E por foco de teclado
    - Usar ria-describedby para associar tooltip ao elemento
    - _Requisitos: 4.4, 4.5, 12.1_

  - [ ]* 9.7 Escrever testes de componente para SpecTooltip
    - Testar que tooltip aparece ao focar o elemento (via userEvent.tab())
    - Incluir teste de acessibilidade com jest-axe
    - _Requisitos: 4.5, 12.1_

  - [x] 9.8 Criar src/components/ui/SpecRow/SpecRow.tsx
    - Renderizar linha de especificacao com rotulo (via SpecTooltip) e N celulas de valores
    - Aplicar fundo de diferenca visual quando hasDiff=true (usando token de cor do tema)
    - Renderizar BestValueBadge na celula com estValueIndex
    - Exibir '—' quando valor e 
ull
    - _Requisitos: 4.2, 4.3, 4.4, 5.1, 5.2, 5.3, 5.6_

  - [ ]* 9.9 Escrever testes de componente para SpecRow
    - Testar exibicao de '—' quando valor e 
ull
    - Testar aplicacao de classe/estilo de diferenca quando hasDiff=true
    - Testar renderizacao de BestValueBadge no indice correto
    - Incluir teste de acessibilidade com jest-axe
    - **Propriedade 9: Campos Nulos Exibem Travessao**
    - **Valida: Requisito 4.3**

  - [x] 9.10 Criar src/components/ui/SpecBlock/SpecBlock.tsx
    - Renderizar cabecalho do bloco (h3) com chave i18n comparison:blocks.{blockKey}
    - Usar useFilteredSpecs para obter specs filtradas
    - Renderizar SpecRow para cada spec, calculando hasDiff via useDiffHighlight e estValueIndex via useBestValue
    - Quando showOnlyDiffs=true e nenhuma spec e visivel, nao renderizar o bloco (incluindo cabecalho)
    - _Requisitos: 4.1, 4.2, 6.2, 6.4_

  - [ ]* 9.11 Escrever testes de componente para SpecBlock
    - **Propriedade 8: Cada Bloco de Especificacoes Renderiza Exatamente N Colunas**
    - **Valida: Requisito 4.2**
    - Usar c.integer({ min: 2, max: 4 }) para gerar N veiculos e verificar N colunas renderizadas
    - Testar que bloco e ocultado quando toggle ativo e todas as specs sao identicas
    - Incluir teste de acessibilidade com jest-axe
    - _Requisitos: 4.1, 4.2, 6.4_

  - [x] 9.12 Criar src/components/ui/DiffToggle/DiffToggle.tsx
    - Renderizar Switch do MUI com label comparison:toggle.showOnlyDiffs
    - Adicionar ria-label descritivo via comparison:toggle.ariaLabel
    - Garantir operabilidade por teclado
    - _Requisitos: 6.1, 6.5, 12.1, 12.4_

  - [ ]* 9.13 Escrever testes de componente para DiffToggle
    - Testar que onChange e chamado ao clicar
    - Testar operabilidade por teclado (Space para toggle)
    - Incluir teste de acessibilidade com jest-axe
    - _Requisitos: 6.1, 6.5_

  - [x] 9.14 Criar src/components/ui/VehicleCard/VehicleCard.tsx
    - Renderizar ImageWithFallback com otoPrincipal
    - Renderizar nome completo (Marca + Modelo + Versao + Ano) como Typography
    - Renderizar MSRP formatado via ormatCurrency
    - Renderizar IconButton de remocao com ria-label descritivo via common:actions.remove
    - _Requisitos: 3.1, 3.3, 12.4_

  - [ ]* 9.15 Escrever testes de componente para VehicleCard
    - Testar renderizacao de nome completo, MSRP e botao de remocao
    - Testar que onRemove e chamado ao clicar no botao
    - Testar exibicao de placeholder quando otoPrincipal e 
ull
    - Incluir teste de acessibilidade com jest-axe
    - _Requisitos: 3.1, 3.3, 12.4_

  - [x] 9.16 Criar src/components/ui/VehicleSelector/VehicleSelector.tsx
    - Renderizar 4 Select do MUI em sequencia: Marca, Modelo, Ano, Versao
    - Usar useVehicleSelector(slotIndex) para obter opcoes e estado
    - Desabilitar cada select ate o anterior estar preenchido
    - Chamar onVehicleSelected quando veiculo completo e selecionado
    - Usar chaves i18n para placeholders e labels
    - _Requisitos: 1.2, 1.3, 1.4, 1.5, 1.6, 12.1_

  - [ ]* 9.17 Escrever testes de componente para VehicleSelector
    - Testar que selects de Modelo, Ano e Versao estao desabilitados inicialmente
    - Testar que selecionar Marca habilita o select de Modelo
    - Testar que onVehicleSelected e chamado com veiculo correto apos selecao completa
    - Incluir teste de acessibilidade com jest-axe
    - _Requisitos: 1.2, 1.3, 1.4, 1.5_

  - [x] 9.18 Criar src/components/ui/PhotoGallery/PhotoGallery.tsx
    - Renderizar 9 linhas de fotos (uma por CategoriaFoto) com N colunas (uma por veiculo)
    - Usar ImageWithFallback para cada foto com lt no formato "{marca} {modelo} {versao} {ano} — {descricao da categoria}"
    - Adicionar width e height explicitos para evitar CLS
    - _Requisitos: 7.1, 7.2, 7.3, 7.4, 7.5, 13.3_

  - [ ]* 9.19 Escrever testes de componente para PhotoGallery
    - **Propriedade 15: Alt das Imagens da Galeria Segue o Padrao Definido**
    - **Valida: Requisito 7.4**
    - Verificar que cada imagem tem lt no formato correto
    - Testar exibicao de placeholder quando foto e 
ull
    - Incluir teste de acessibilidade com jest-axe
    - _Requisitos: 7.3, 7.4, 7.5_


- [ ] 10. Implementar componentes de layout e secoes
  - [x] 10.1 Criar src/components/layout/PageWrapper/PageWrapper.tsx
    - Renderizar container MUI com padding responsivo
    - Usar sx prop para espacamento, sem media queries manuais
    - _Requisitos: 8.1, 8.5_

  - [x] 10.2 Criar src/components/layout/AppHeader/AppHeader.tsx
    - Renderizar AppBar do MUI com titulo da aplicacao como h1
    - Incluir botao de toggle de tema com ria-label descritivo
    - Incluir link de navegacao "Voltar a selecao" quando na pagina de comparacao
    - Adicionar <nav> com ria-label para navegacao principal
    - _Requisitos: 12.1, 12.3, 12.4_

  - [ ]* 10.3 Escrever testes de componente para AppHeader
    - Testar renderizacao do titulo e botao de tema
    - Testar que botao de tema chama 	oggleMode
    - Incluir teste de acessibilidade com jest-axe
    - _Requisitos: 12.1, 12.3, 12.4_

  - [x] 10.4 Criar src/components/sections/IdentificationBlock/IdentificationBlock.tsx
    - Renderizar container com position: sticky e 	op: 0 via sx
    - Renderizar N VehicleCard lado a lado (um por veiculo)
    - Chamar 
emoveSlot(index) do store ao acionar botao de remocao
    - Garantir que todos os botoes de remocao sejam alcancaveis por Tab
    - _Requisitos: 3.1, 3.2, 3.4, 3.5, 3.6_

  - [ ]* 10.5 Escrever testes de componente para IdentificationBlock
    - **Propriedade 7: Bloco de Identificacao Renderiza Todos os Veiculos Selecionados**
    - **Valida: Requisito 3.1**
    - Usar c.integer({ min: 2, max: 4 }) para gerar N veiculos e verificar N cards renderizados
    - Testar que remover veiculo chama 
emoveSlot com indice correto
    - Incluir teste de acessibilidade com jest-axe
    - _Requisitos: 3.1, 3.4, 3.6_

  - [x] 10.6 Criar src/components/sections/ComparisonGrid/ComparisonGrid.tsx
    - Renderizar os 9 SpecBlock na ordem definida em Requisito 4.1
    - Envolver cada SpecBlock em ErrorBoundary independente
    - Passar ehicles e showOnlyDiffs para cada bloco
    - _Requisitos: 4.1, 4.2_

  - [ ]* 10.7 Escrever testes de componente para ComparisonGrid
    - Testar que todos os 9 blocos sao renderizados
    - Testar que showOnlyDiffs e propagado corretamente
    - Incluir teste de acessibilidade com jest-axe
    - _Requisitos: 4.1_

  - [x] 10.8 Criar src/components/sections/SelectionPanel/SelectionPanel.tsx
    - Renderizar N VehicleSelector (2 a 4 slots) com botoes de adicionar/remover slot
    - Renderizar botao "Comparar" desabilitado quando canCompare() e alse
    - Exibir mensagem de erro com ria-live="polite" quando usuario tenta comparar com < 2 veiculos
    - Navegar para /comparar ao clicar em "Comparar", chamando syncToUrl
    - _Requisitos: 1.1, 1.6, 1.7, 1.8, 1.9, 12.5_

  - [ ]* 10.9 Escrever testes de componente para SelectionPanel
    - Testar que botao "Comparar" esta desabilitado com < 2 veiculos selecionados
    - Testar que mensagem de erro aparece ao tentar comparar com < 2 veiculos
    - Testar que botao "Adicionar veiculo" adiciona slot (ate maximo de 4)
    - Incluir teste de acessibilidade com jest-axe
    - _Requisitos: 1.1, 1.8, 1.9_

- [ ] 11. Checkpoint — Verificar componentes
  - Garantir que todos os testes de componentes passam
  - Verificar cobertura: components/ui/ >= 85%, sections/ >= 70%
  - Garantir que nenhum componente tem texto hardcoded (todos usam chaves i18n)
  - Perguntar ao usuario se ha duvidas antes de prosseguir para as paginas


- [x] 12. Implementar paginas e roteamento
  - [x] 12.1 Criar src/pages/NotFoundPage.tsx
    - Renderizar mensagem de pagina nao encontrada com link para /selecionar
    - Usar h2 para o titulo da pagina
    - _Requisitos: 12.3_

  - [x] 12.2 Criar src/pages/SelectionPage.tsx
    - Renderizar PageWrapper com SelectionPanel
    - Usar h2 para o titulo da pagina ("Selecionar Veiculos")
    - Exibir mensagem de estado recebida via location.state (ex.: redirecionamento por URL invalida)
    - Usar ria-live="polite" para a mensagem de estado
    - _Requisitos: 2.4, 12.3, 12.5_

  - [x] 12.3 Criar src/pages/ComparisonPage.tsx
    - Usar useComparisonUrl para sincronizar URL com store na montagem
    - Renderizar IdentificationBlock, DiffToggle, ComparisonGrid e PhotoGallery
    - Conectar DiffToggle ao 	oggleShowOnlyDiffs do store
    - Usar h2 para o titulo da pagina ("Comparar Veiculos")
    - _Requisitos: 2.1, 2.2, 3.1, 3.2, 4.1, 6.1, 7.1_

  - [x] 12.4 Criar src/App.tsx com roteamento completo
    - Configurar BrowserRouter com as 4 rotas: / (redirect), /selecionar, /comparar, * (NotFound)
    - Usar React.lazy e Suspense para code splitting por rota
    - Envolver com ThemeProvider (usando useThemeStore) e I18nextProvider
    - Renderizar AppHeader fora das rotas (sempre visivel)
    - _Requisitos: 13.2_

  - [x] 12.5 Criar src/main.tsx com ponto de entrada da aplicacao
    - Renderizar App com StrictMode
    - Importar src/i18n.ts para inicializar i18n antes da renderizacao
    - _Requisitos: 11.1_

- [x] 13. Implementar dados iniciais — Toyota
  - Criar src/data/toyota.ts exportando array 	oyotaVehicles: Vehicle[]
  - Implementar dados para os modelos: Corolla, Corolla Cross, Yaris, Hilux, SW4, RAV4, Camry, Prius e Land Cruiser
  - Cobrir todos os anos-modelo disponiveis no Brasil entre 2006 e 2026 com todas as versoes (trims) comercializadas
  - Garantir que todos os campos ausentes sejam 
ull (nao undefined)
  - Preencher dataSource com URL do catalogo ou ficha tecnica oficial de cada veiculo
  - Garantir que identificacao.id segue o padrao {marca}-{modelo}-{versao}-{ano} gerado por uildVehicleId
  - _Requisitos: 10.1, 10.4, 10.5, 9.2, 9.4, 9.7_

- [x] 14. Implementar dados iniciais — Honda
  - Criar src/data/honda.ts exportando array hondaVehicles: Vehicle[]
  - Implementar dados para os modelos: Civic, City, HR-V, CR-V, WR-V, Fit, Accord, Pilot e ZR-V
  - Cobrir todos os anos-modelo disponiveis no Brasil entre 2006 e 2026 com todas as versoes (trims) comercializadas
  - Garantir que todos os campos ausentes sejam 
ull (nao undefined)
  - Preencher dataSource com URL do catalogo ou ficha tecnica oficial de cada veiculo
  - Garantir que identificacao.id segue o padrao {marca}-{modelo}-{versao}-{ano} gerado por uildVehicleId
  - _Requisitos: 10.2, 10.4, 10.5, 9.2, 9.4, 9.7_

- [x] 15. Implementar dados iniciais — Nissan
  - Criar src/data/nissan.ts exportando array 
issanVehicles: Vehicle[]
  - Implementar dados para os modelos: Kicks, Frontier, Versa, Sentra, March, X-Trail, Leaf e Livina
  - Cobrir todos os anos-modelo disponiveis no Brasil entre 2006 e 2026 com todas as versoes (trims) comercializadas
  - Garantir que todos os campos ausentes sejam 
ull (nao undefined)
  - Preencher dataSource com URL do catalogo ou ficha tecnica oficial de cada veiculo
  - Garantir que identificacao.id segue o padrao {marca}-{modelo}-{versao}-{ano} gerado por uildVehicleId
  - _Requisitos: 10.3, 10.4, 10.5, 9.2, 9.4, 9.7_


- [ ] 16. Validar integridade dos dados com testes de propriedade
  - [ ]* 16.1 Escrever testes de propriedade para integridade do schema de dados
    - **Propriedade 16: ID do Veiculo e Derivavel dos Campos de Identificacao**
    - **Valida: Requisito 9.2**
    - Para cada veiculo no repositorio, verificar que id === buildVehicleId(marca, modelo, versao, ano)
    - Verificar que id corresponde ao padrao ^[a-z0-9]+(-[a-z0-9]+)*$
    - **Propriedade 17: Nenhum Campo do Schema e undefined**
    - **Valida: Requisito 9.4**
    - Para cada veiculo no repositorio, verificar recursivamente que nenhum campo de especificacoes e undefined
    - Verificar que campos ausentes sao explicitamente 
ull

- [x] 17. Configurar responsividade e acessibilidade final
  - [x] 17.1 Verificar e ajustar layout responsivo em todos os componentes
    - Garantir que IdentificationBlock e ComparisonGrid usam Grid2 do MUI com breakpoints xs, sm, md
    - Garantir scroll horizontal em viewport < 600px para visualizar todos os veiculos
    - Garantir layout de 2 colunas em viewport 600-900px
    - Garantir colunas lado a lado em viewport >= 900px
    - Usar exclusivamente sx prop e useMediaQuery do MUI, sem media queries CSS manuais
    - _Requisitos: 8.1, 8.2, 8.3, 8.4, 8.5_

  - [x] 17.2 Verificar hierarquia de headings em todas as paginas
    - Confirmar que AppHeader usa h1 para o titulo da aplicacao
    - Confirmar que cada pagina usa h2 para seu titulo
    - Confirmar que cada SpecBlock usa h3 para seu cabecalho
    - _Requisitos: 12.3_

  - [x] 17.3 Verificar aria-live em todas as regioes dinamicas
    - Confirmar aria-live="polite" em mensagens de erro de slot invalido
    - Confirmar aria-live="polite" em resultado de selecao de veiculo no VehicleSelector
    - Confirmar aria-live="polite" em mensagem de estado na SelectionPage
    - _Requisitos: 12.5_

  - [x] 17.4 Verificar links externos com rel="noopener noreferrer"
    - Confirmar que todos os links para dataSource tem target="_blank" e rel="noopener noreferrer"
    - _Requisitos: 15.2_

- [x] 18. Configurar seguranca e cabecalhos HTTP
  - Criar ercel.json (ou equivalente) com os cabecalhos de seguranca HTTP: X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, Strict-Transport-Security
  - _Requisitos: 15.3_

- [x] 19. Checkpoint final — Garantir todos os testes passam
  - Executar suite completa de testes: itest run --coverage
  - Verificar que todas as metas de cobertura sao atingidas: utils >= 95%, hooks >= 90%, services >= 80%, components/ui/ >= 85%, sections/ >= 70%
  - Verificar que TypeScript compila sem erros: 	sc --noEmit
  - Verificar que ESLint nao reporta erros: eslint src/
  - Perguntar ao usuario se ha duvidas antes de considerar a implementacao concluida

## Notas

- Tarefas marcadas com * sao opcionais e podem ser puladas para um MVP mais rapido
- Cada tarefa referencia os requisitos especificos para rastreabilidade
- Os checkpoints garantem validacao incremental a cada fase
- Testes de propriedade (fast-check) validam invariantes universais; testes de componente (RTL + jest-axe) validam comportamentos especificos e acessibilidade
- Os dados das 3 marcas (tarefas 13-15) sao as tarefas mais trabalhosas em volume — priorize a estrutura correta sobre a completude inicial
- A ordem das tarefas segue o grafo de dependencias: infraestrutura -> tipos -> utilitarios -> i18n -> servicos -> stores -> hooks -> componentes -> paginas -> dados -> validacao final

- [x] 20. Corrigir contraste do modo escuro
  - [x] 20.1 Atualizar tokens de cor em src/theme/tokens.ts para modo escuro
    - Adicionar token `darkText` com valor `#E0E0E0` (texto primario em fundo escuro, contraste >= 4.5:1 contra #121212)
    - Adicionar token `darkTextSecondary` com valor `#BDBDBD` (texto secundario, contraste >= 3:1)
    - Adicionar token `darkBorder` com valor `#FFFFFF1F` (bordas/divisores sutis em modo escuro)
    - Adicionar token `darkOutline` com valor `#FFFFFF` (bordas de componentes interativos como Select, Input, Card)
    - _Requisitos: 12.2_

  - [x] 20.2 Atualizar darkTheme em src/theme/index.ts com palette de texto e bordas
    - Definir `palette.text.primary` como `#E0E0E0` e `palette.text.secondary` como `#BDBDBD`
    - Definir `palette.divider` como `rgba(255,255,255,0.12)`
    - Adicionar override de `MuiOutlinedInput` para usar `borderColor: rgba(255,255,255,0.5)` no estado normal e `#FFFFFF` no hover/focus
    - Adicionar override de `MuiSelect` para herdar as bordas do `MuiOutlinedInput`
    - Adicionar override de `MuiCard` para adicionar `border: 1px solid rgba(255,255,255,0.12)` no modo escuro
    - Adicionar override de `MuiTableCell` e `MuiDivider` para usar `borderColor: rgba(255,255,255,0.12)`
    - _Requisitos: 12.2_

  - [x] 20.3 Verificar contraste de todos os componentes no modo escuro
    - Confirmar que textos em VehicleCard, SpecRow, SpecBlock e AppHeader atendem WCAG AA (4.5:1 para texto normal, 3:1 para texto grande)
    - Confirmar que bordas de Select e Input sao visiveis contra o fundo `#1E1E1E`
    - Confirmar que badges de melhor valor (BestValueBadge) mantem contraste adequado com os tokens `bestValueHigherBgDark` e `bestValueLowerBgDark`
    - Confirmar que linhas com diferenca (diffRowBgDark) tem contraste suficiente para o texto sobreposto
    - _Requisitos: 12.2_
