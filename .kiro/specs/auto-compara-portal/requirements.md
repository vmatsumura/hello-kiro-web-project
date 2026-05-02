# Documento de Requisitos — Portal do Automóvel (auto-compara-portal)

## Introdução

O Portal do Automóvel é uma aplicação web front-end de comparação de automóveis que permite ao usuário selecionar de 2 a 4 veículos e visualizar suas especificações técnicas lado a lado. O portal cobre todos os carros comercializados no Brasil entre 2006 e 2026, organizados por marca, modelo, versão e ano-modelo. Os dados são estáticos, versionados no repositório e gerados a partir de catálogos e fichas técnicas oficiais das montadoras. O portal é construído com React 18+, TypeScript strict, Material UI v6, Vitest e React Testing Library, seguindo os padrões definidos nos steering files do projeto.

---

## Glossário

- **Portal**: a aplicação web Portal do Automóvel.
- **Veículo**: um automóvel identificado pela combinação única de Marca + Modelo + Versão + Ano-Modelo.
- **Comparação**: a exibição simultânea de 2 a 4 Veículos lado a lado na Página de Comparação.
- **Seletor**: o conjunto de filtros encadeados (Marca → Modelo → Ano → Versão) usado para escolher um Veículo.
- **Bloco**: uma seção temática da Página de Comparação que agrupa especificações relacionadas (ex.: Motor e Transmissão, Desempenho).
- **Linha de Especificação**: uma linha dentro de um Bloco que exibe o valor de um atributo para cada Veículo selecionado.
- **Slot**: uma das posições de comparação (mínimo 2, máximo 4) disponíveis na Página de Comparação.
- **Schema**: a definição TypeScript centralizada em `src/types/vehicle.ts` que representa a estrutura de dados de um Veículo.
- **Repositório de Dados**: os arquivos estáticos em `src/data/` que contêm os dados dos Veículos.
- **Placeholder**: imagem ou texto exibido quando um dado ou foto não está disponível para um Veículo específico.
- **MSRP**: preço sugerido ao consumidor (Manufacturer's Suggested Retail Price) em reais (R$).
- **Diferença Visual**: destaque aplicado a uma Linha de Especificação quando os valores dos Veículos comparados diferem entre si.
- **Melhor Valor**: o valor mais favorável em uma Linha de Especificação quantitativa (ex.: maior potência, menor consumo), sinalizado visualmente.
- **Toggle "Apenas Diferenças"**: controle de interface que oculta as Linhas de Especificação onde todos os Veículos têm o mesmo valor.
- **Tooltip de Especificação**: elemento de interface que exibe a descrição e a unidade de medida de uma especificação ao passar o cursor sobre ela.
- **Galeria Comparativa**: o bloco final da Página de Comparação que exibe fotos padronizadas dos Veículos lado a lado.
- **i18n**: internacionalização da interface, com pt-BR como idioma padrão.
- **WCAG 2.1 AA**: padrão de acessibilidade Web Content Accessibility Guidelines, nível AA.
- **Lighthouse**: ferramenta de auditoria de qualidade do Google Chrome.

---

## Requisitos

### Requisito 1 — Seleção de Veículos para Comparação

**User Story:** Como usuário, quero selecionar de 2 a 4 veículos por meio de filtros encadeados, para que eu possa montar a comparação que desejo antes de visualizá-la.

#### Critérios de Aceite

1. THE Portal SHALL disponibilizar ao usuário entre 2 (mínimo) e 4 (máximo) Slots de seleção de Veículos na interface de montagem de Comparação.
2. WHEN o usuário interage com um Seletor, THE Portal SHALL exibir os filtros na ordem encadeada: Marca → Modelo → Ano → Versão, habilitando cada filtro somente após o filtro anterior ter sido preenchido.
3. WHEN o usuário seleciona uma Marca, THE Portal SHALL exibir apenas os Modelos disponíveis para aquela Marca no Repositório de Dados.
4. WHEN o usuário seleciona um Modelo, THE Portal SHALL exibir apenas os Anos-Modelo disponíveis para aquele Modelo no Repositório de Dados.
5. WHEN o usuário seleciona um Ano-Modelo, THE Portal SHALL exibir apenas as Versões disponíveis para aquele Modelo e Ano no Repositório de Dados.
6. THE Portal SHALL permitir que cada Slot seja preenchido com Veículos de Marcas diferentes, de forma independente dos demais Slots.
7. WHEN o usuário remove um Veículo de um Slot, THE Portal SHALL liberar aquele Slot para nova seleção sem reiniciar os demais Slots preenchidos.
8. WHEN o usuário tenta iniciar uma Comparação com menos de 2 Slots preenchidos, THE Portal SHALL exibir uma mensagem informando que são necessários ao menos 2 veículos para comparar.
9. WHEN o usuário conclui a seleção de ao menos 2 Veículos, THE Portal SHALL habilitar a navegação para a Página de Comparação.

---

### Requisito 2 — Persistência da Comparação na URL

**User Story:** Como usuário, quero que a URL reflita os veículos que selecionei, para que eu possa compartilhar ou salvar a comparação diretamente pelo link.

#### Critérios de Aceite

1. WHEN o usuário acessa a Página de Comparação, THE Portal SHALL codificar os identificadores dos Veículos selecionados nos parâmetros da URL (query params ou path params).
2. WHEN o usuário acessa uma URL com parâmetros de Veículos válidos, THE Portal SHALL restaurar a Comparação correspondente sem exigir nova seleção manual.
3. IF a URL contém um identificador de Veículo que não existe no Repositório de Dados, THEN THE Portal SHALL exibir uma mensagem de erro no Slot correspondente e permitir que o usuário substitua o Veículo inválido.
4. IF a URL contém menos de 2 identificadores de Veículos válidos, THEN THE Portal SHALL redirecionar o usuário para a tela de seleção com uma mensagem explicativa.
5. WHEN o usuário adiciona ou remove um Veículo na Página de Comparação, THE Portal SHALL atualizar a URL em tempo real sem recarregar a página.

---

### Requisito 3 — Página de Comparação — Bloco de Identificação (Sticky)

**User Story:** Como usuário, quero ver as informações básicas de cada veículo fixadas no topo da página durante o scroll, para que eu sempre saiba quais veículos estou comparando.

#### Critérios de Aceite

1. THE Portal SHALL exibir um Bloco de Identificação no topo da Página de Comparação contendo, para cada Veículo: foto principal, nome completo (Marca + Modelo + Versão + Ano), MSRP em R$ e botão de remoção.
2. WHILE o usuário rola a Página de Comparação verticalmente, THE Portal SHALL manter o Bloco de Identificação fixo (sticky) no topo da viewport.
3. WHEN a foto principal de um Veículo não está disponível no Repositório de Dados, THE Portal SHALL exibir um Placeholder com o texto "Foto não disponível" no espaço reservado à imagem.
4. WHEN o usuário aciona o botão de remoção de um Veículo no Bloco de Identificação, THE Portal SHALL remover aquele Veículo da Comparação e atualizar a URL conforme o Requisito 2.
5. IF a remoção de um Veículo resultar em menos de 2 Veículos na Comparação, THEN THE Portal SHALL redirecionar o usuário para a tela de seleção com os Slots restantes pré-preenchidos.
6. THE Portal SHALL garantir que o Bloco de Identificação seja acessível por teclado, com foco gerenciável em todos os botões de remoção, em conformidade com WCAG 2.1 AA.

---

### Requisito 4 — Página de Comparação — Blocos de Especificações Técnicas

**User Story:** Como usuário, quero visualizar as especificações técnicas dos veículos organizadas em blocos temáticos lado a lado, para que eu possa comparar cada atributo de forma clara e objetiva.

#### Critérios de Aceite

1. THE Portal SHALL organizar as especificações técnicas nos seguintes Blocos, nesta ordem: (1) Motor e Transmissão, (2) Desempenho, (3) Dimensões e Peso, (4) Rodas, Pneus e Freios, (5) Segurança Ativa, (6) Segurança Passiva, (7) Tecnologia e Conectividade, (8) Conforto e Conveniências, (9) Capacidade de Passageiros.
2. THE Portal SHALL exibir cada Bloco com uma coluna por Veículo selecionado, alinhando os valores de cada atributo na mesma Linha de Especificação.
3. WHEN o valor de um atributo não está disponível para um Veículo específico (campo `null` no Schema), THE Portal SHALL exibir o texto "—" (travessão) na célula correspondente.
4. WHEN o usuário passa o cursor sobre o rótulo de uma Linha de Especificação, THE Portal SHALL exibir um Tooltip de Especificação com a descrição do atributo e sua unidade de medida.
5. THE Portal SHALL garantir que todos os Tooltips de Especificação sejam acessíveis via teclado (foco + tecla Enter ou Espaço), em conformidade com WCAG 2.1 AA.

---

### Requisito 5 — Destaque Visual de Diferenças e Melhor Valor

**User Story:** Como usuário, quero que as diferenças entre os veículos e os melhores valores sejam destacados visualmente, para que eu identifique rapidamente os pontos de distinção e vantagem de cada veículo.

#### Critérios de Aceite

1. WHEN os valores de uma Linha de Especificação diferem entre os Veículos comparados, THE Portal SHALL aplicar Diferença Visual (fundo levemente colorido ou ícone indicador) naquela linha.
2. WHEN todos os valores de uma Linha de Especificação são idênticos entre os Veículos comparados, THE Portal SHALL exibir aquela linha sem Diferença Visual.
3. WHEN uma Linha de Especificação possui valores numéricos comparáveis e um Melhor Valor pode ser determinado, THE Portal SHALL sinalizar o Melhor Valor com um badge ou cor de destaque na célula correspondente.
4. THE Portal SHALL considerar como Melhor Valor: o maior número para atributos de desempenho positivo (ex.: potência, torque, autonomia) e o menor número para atributos de custo ou consumo (ex.: consumo de combustível em L/100km, emissão de CO₂, tempo de 0–100 km/h).
5. IF uma Linha de Especificação contém valores não numéricos ou mistos (ex.: presença/ausência de equipamento), THEN THE Portal SHALL aplicar apenas a Diferença Visual, sem sinalizar Melhor Valor.
6. THE Portal SHALL garantir que os destaques visuais de Diferença e Melhor Valor atendam ao contraste mínimo de 4,5:1 exigido pelo WCAG 2.1 AA.

---

### Requisito 6 — Toggle "Mostrar Apenas Diferenças"

**User Story:** Como usuário, quero poder ocultar as especificações iguais entre os veículos, para que eu foque apenas nos atributos que os diferenciam.

#### Critérios de Aceite

1. THE Portal SHALL exibir um controle Toggle "Mostrar apenas diferenças" na Página de Comparação, acessível antes do início dos Blocos de Especificações.
2. WHEN o usuário ativa o Toggle "Mostrar apenas diferenças", THE Portal SHALL ocultar todas as Linhas de Especificação onde todos os Veículos possuem o mesmo valor.
3. WHEN o usuário desativa o Toggle "Mostrar apenas diferenças", THE Portal SHALL restaurar a exibição de todas as Linhas de Especificação.
4. WHILE o Toggle "Mostrar apenas diferenças" está ativo e todos os atributos de um Bloco são idênticos entre os Veículos, THE Portal SHALL ocultar o Bloco inteiro, incluindo seu cabeçalho.
5. THE Portal SHALL garantir que o Toggle seja operável por teclado e possua `aria-label` descritivo, em conformidade com WCAG 2.1 AA.

---

### Requisito 7 — Galeria de Fotos Comparativa

**User Story:** Como usuário, quero visualizar fotos padronizadas dos veículos lado a lado em uma galeria, para que eu compare a aparência de cada veículo nas mesmas perspectivas.

#### Critérios de Aceite

1. THE Portal SHALL exibir a Galeria Comparativa como o último Bloco da Página de Comparação, contendo para cada Veículo as seguintes categorias de fotos, nesta ordem: (1) Vista frontal (3/4 dianteiro), (2) Vista lateral direita, (3) Vista traseira (3/4 traseiro), (4) Vista lateral esquerda, (5) Painel e cockpit do motorista, (6) Banco traseiro, (7) Porta-malas aberto, (8) Motor com tampa aberta, (9) Detalhe das rodas.
2. THE Portal SHALL exibir as fotos de cada categoria na mesma posição vertical para todos os Veículos, mantendo o alinhamento lado a lado.
3. WHEN a foto de uma categoria específica não está disponível para um Veículo, THE Portal SHALL exibir um Placeholder com o texto "Foto não disponível" no espaço reservado.
4. THE Portal SHALL garantir que todas as imagens da Galeria Comparativa possuam atributo `alt` descritivo (ex.: "Toyota Corolla XEi 2023 — Vista frontal"), em conformidade com WCAG 2.1 AA.
5. THE Portal SHALL otimizar as imagens da Galeria Comparativa no formato WebP com dimensões explícitas de `width` e `height` para evitar Cumulative Layout Shift (CLS).

---

### Requisito 8 — Responsividade e Layout Mobile

**User Story:** Como usuário mobile, quero acessar a comparação em dispositivos de tela pequena, para que eu possa consultar as especificações mesmo fora do desktop.

#### Critérios de Aceite

1. THE Portal SHALL ser responsivo, com design mobile-first a partir de 375px de largura.
2. WHEN o Portal é acessado em viewport com largura inferior a 600px (breakpoint `xs`), THE Portal SHALL empilhar os Veículos verticalmente dentro de cada Bloco, com scroll horizontal disponível para visualizar todos os Veículos selecionados.
3. WHEN o Portal é acessado em viewport com largura entre 600px e 900px (breakpoint `sm`), THE Portal SHALL exibir os Veículos em layout de grade com no máximo 2 colunas por Bloco.
4. WHEN o Portal é acessado em viewport com largura igual ou superior a 900px (breakpoint `md`), THE Portal SHALL exibir todos os Veículos selecionados em colunas lado a lado dentro de cada Bloco.
5. THE Portal SHALL utilizar exclusivamente os breakpoints e utilitários responsivos do MUI v6 (`sx` prop, `useMediaQuery`, `Grid2`), sem media queries CSS manuais.

---

### Requisito 9 — Schema de Dados e Repositório de Veículos

**User Story:** Como desenvolvedor, quero um Schema TypeScript centralizado e extensível para representar todos os atributos de um veículo, para que os dados sejam consistentes, tipados e fáceis de manter.

#### Critérios de Aceite

1. THE Portal SHALL definir o Schema de Veículo em `src/types/vehicle.ts` como a fonte única da verdade para a estrutura de dados de todos os Veículos.
2. THE Schema SHALL conter um campo `id` único no formato slugificado `{marca}-{modelo}-{versao}-{ano}` (ex.: `toyota-corolla-xei-2023`).
3. THE Schema SHALL separar os dados em sub-objetos distintos: `identificacao`, `especificacoes` (com sub-objetos por Bloco temático) e `midia`.
4. THE Schema SHALL tipar campos ausentes como `null` (não `undefined`), indicando que o dado foi verificado e não existe para aquele Veículo.
5. THE Schema SHALL utilizar enums TypeScript para campos com valores fixos, incluindo: tipo de combustível, tipo de transmissão, tipo de tração, tipo de freio e tipo de ar-condicionado.
6. THE Schema SHALL nomear todos os campos numéricos com a unidade de medida explícita no nome (ex.: `potenciaCv`, `torqueKgfm`, `comprimentoMm`, `pesoKg`).
7. THE Schema SHALL incluir um campo `dataSource` do tipo `string` contendo a URL de referência utilizada para popular os dados de cada Veículo.
8. THE Schema SHALL ser projetado para ser extensível a novas Marcas, Modelos e atributos sem exigir alterações estruturais nos componentes existentes.
9. THE Portal SHALL armazenar os dados dos Veículos em arquivos estáticos TypeScript em `src/data/`, organizados por Marca (ex.: `src/data/toyota.ts`, `src/data/honda.ts`, `src/data/nissan.ts`).

---

### Requisito 10 — Dados Iniciais: Toyota, Honda e Nissan

**User Story:** Como usuário, quero encontrar os modelos mais relevantes da Toyota, Honda e Nissan comercializados no Brasil entre 2006 e 2026, para que eu possa comparar veículos dessas marcas desde o lançamento do portal.

#### Critérios de Aceite

1. THE Repositório de Dados SHALL conter dados para os seguintes modelos Toyota: Corolla, Corolla Cross, Yaris, Hilux, SW4, RAV4, Camry, Prius e Land Cruiser, cobrindo todos os anos-modelo disponíveis no Brasil entre 2006 e 2026 com todas as versões (trims) comercializadas.
2. THE Repositório de Dados SHALL conter dados para os seguintes modelos Honda: Civic, City, HR-V, CR-V, WR-V, Fit, Accord, Pilot e ZR-V, cobrindo todos os anos-modelo disponíveis no Brasil entre 2006 e 2026 com todas as versões (trims) comercializadas.
3. THE Repositório de Dados SHALL conter dados para os seguintes modelos Nissan: Kicks, Frontier, Versa, Sentra, March, X-Trail, Leaf e Livina, cobrindo todos os anos-modelo disponíveis no Brasil entre 2006 e 2026 com todas as versões (trims) comercializadas.
4. WHEN um campo de especificação não está disponível nas fontes oficiais para um Veículo específico, THE Repositório de Dados SHALL registrar o valor `null` naquele campo, conforme o Requisito 9.
5. THE Repositório de Dados SHALL referenciar no campo `dataSource` de cada Veículo a URL do catálogo ou ficha técnica oficial utilizada como fonte (ex.: site oficial da montadora, Webmotors, iCarros).

---

### Requisito 11 — Internacionalização (i18n)

**User Story:** Como desenvolvedor, quero que toda a interface seja estruturada com i18n desde o início, para que o portal possa ser traduzido para outros idiomas no futuro sem refatoração.

#### Critérios de Aceite

1. THE Portal SHALL utilizar `react-i18next` para gerenciar todos os textos da interface, com pt-BR como idioma padrão.
2. THE Portal SHALL armazenar todos os textos traduzíveis em arquivos de namespace separados por domínio (ex.: `common.json`, `comparison.json`, `vehicle.json`) em `src/locales/pt-BR/`.
3. THE Portal SHALL garantir que nenhum texto visível ao usuário seja hardcoded diretamente nos componentes React — todos devem ser referenciados via chaves de tradução.
4. THE Portal SHALL incluir as traduções em pt-BR para todos os rótulos de Linhas de Especificação, cabeçalhos de Blocos, mensagens de erro, Tooltips de Especificação e textos de Placeholder.
5. WHERE um idioma adicional for configurado no futuro, THE Portal SHALL carregar os arquivos de tradução correspondentes sem exigir alterações nos componentes.

---

### Requisito 12 — Acessibilidade (WCAG 2.1 AA)

**User Story:** Como usuário com necessidades de acessibilidade, quero que o portal seja totalmente navegável por teclado e compatível com leitores de tela, para que eu possa comparar veículos sem barreiras.

#### Critérios de Aceite

1. THE Portal SHALL garantir que todos os elementos interativos (botões, seletores, toggles, links) sejam alcançáveis e operáveis por teclado, seguindo a ordem de tabulação lógica.
2. THE Portal SHALL garantir que o contraste de cor de todos os textos e elementos interativos atenda ao mínimo de 4,5:1 (texto normal) e 3:1 (texto grande) exigido pelo WCAG 2.1 AA.
3. THE Portal SHALL utilizar HTML semântico com hierarquia de headings lógica (`h1` → `h2` → `h3`) em todas as páginas.
4. THE Portal SHALL fornecer `aria-label` descritivo para todos os botões de ação que contenham apenas ícones (ex.: botão de remoção de Veículo).
5. THE Portal SHALL utilizar `aria-live="polite"` em regiões que atualizam dinamicamente (ex.: resultado da seleção de Veículo, mensagens de erro).
6. THE Portal SHALL respeitar a preferência `prefers-reduced-motion` do sistema operacional, desabilitando ou simplificando animações para usuários que a solicitam.
7. WHEN um modal, diálogo ou drawer é aberto, THE Portal SHALL prender o foco dentro do elemento e restaurá-lo ao elemento de origem quando fechado.
8. THE Portal SHALL incluir testes automatizados de acessibilidade com `jest-axe` em todos os componentes, conforme os padrões definidos no steering file de testes.

---

### Requisito 13 — Performance e Qualidade (Lighthouse ≥ 90)

**User Story:** Como usuário, quero que o portal carregue rapidamente e funcione sem erros em dispositivos móveis, para que a experiência de comparação seja fluida independentemente do dispositivo.

#### Critérios de Aceite

1. THE Portal SHALL atingir pontuação igual ou superior a 90 em todas as categorias do Lighthouse (Performance, Acessibilidade, Melhores Práticas e SEO) em ambiente de produção.
2. THE Portal SHALL implementar code splitting por rota utilizando `React.lazy` e `Suspense`, carregando apenas o código necessário para a rota atual.
3. THE Portal SHALL otimizar todas as imagens no formato WebP com atributos `width` e `height` explícitos para eliminar Cumulative Layout Shift (CLS).
4. THE Portal SHALL carregar fontes com `font-display: swap` para evitar bloqueio de renderização.
5. THE Portal SHALL funcionar sem erros de runtime nos navegadores iOS Safari e Android Chrome.

---

### Requisito 14 — Cobertura de Testes

**User Story:** Como desenvolvedor, quero que o portal tenha cobertura de testes adequada em componentes, hooks e utilitários, para que eu possa refatorar e evoluir o código com segurança.

#### Critérios de Aceite

1. THE Portal SHALL manter cobertura de testes igual ou superior a 85% nas linhas e funções dos componentes em `src/components/ui/`.
2. THE Portal SHALL manter cobertura de testes igual ou superior a 90% nas linhas e funções dos hooks em `src/hooks/`.
3. THE Portal SHALL manter cobertura de testes igual ou superior a 95% nas linhas e funções dos utilitários em `src/utils/`.
4. THE Portal SHALL manter cobertura de testes igual ou superior a 80% nas linhas e funções dos serviços em `src/services/`.
5. THE Portal SHALL utilizar React Testing Library com `userEvent` para simular interações do usuário, consultando elementos por papel acessível (`getByRole`), rótulo (`getByLabelText`) ou texto (`getByText`), conforme os padrões do steering file de testes.
6. THE Portal SHALL utilizar MSW (Mock Service Worker) para simular chamadas a APIs externas nos testes, sem mockar `fetch` diretamente.
7. WHEN um novo componente é criado em `src/components/`, THE Portal SHALL ter um arquivo de teste correspondente em `src/__tests__/components/` com ao menos um teste de renderização e um teste de acessibilidade com `jest-axe`.

---

### Requisito 15 — Segurança e Boas Práticas

**User Story:** Como desenvolvedor, quero que o portal siga as boas práticas de segurança definidas nos steering files, para que a aplicação não exponha vulnerabilidades mesmo sendo um front-end estático.

#### Critérios de Aceite

1. THE Portal SHALL sanitizar com `DOMPurify` qualquer conteúdo externo renderizado como HTML antes de utilizá-lo com `dangerouslySetInnerHTML`.
2. THE Portal SHALL adicionar `rel="noopener noreferrer"` em todos os links externos com `target="_blank"`.
3. THE Portal SHALL configurar os cabeçalhos de segurança HTTP (`X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, `Strict-Transport-Security`) na camada de hospedagem.
4. THE Portal SHALL validar e sanitizar os parâmetros de URL antes de utilizá-los para buscar dados no Repositório de Dados, prevenindo injeção de valores maliciosos.
5. IF um parâmetro de URL contém um valor que não corresponde a nenhum identificador válido no Repositório de Dados, THEN THE Portal SHALL ignorar o parâmetro inválido e exibir uma mensagem de erro ao usuário, sem lançar exceções não tratadas.
