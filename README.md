# Estruturas de Dados em TypeScript

Este repositório contém implementações de diversas estruturas de dados em TypeScript, desenvolvidas como parte das atividades da disciplina de Estrutura de Dados II.


## 📚 Estruturas Implementadas

### 1. Lista Duplamente Encadeada
Implementação completa de uma **Lista Duplamente Encadeada** que permite navegação bidirecional através dos elementos.

### 2. Árvore Binária de Busca
Implementação completa de uma **Árvore Binária de Busca (BST)** com todas as operações fundamentais e diferentes tipos de percurso.

### 3. Deque (Double-Ended Queue)
Implementação completa de um **Deque** (fila dupla), permitindo inserção e remoção de elementos tanto no início quanto no fim da estrutura.
Ideal para cenários onde é necessário manipular dados nas duas extremidades de forma eficiente.


## 🚀 Funcionalidades Implementadas
### Funcionalidades do Deque

- **adicionarInicio**: Insere elemento no início
- **adicionarFim**: Insere elemento no fim
- **removerInicio**: Remove elemento do início
- **removerFim**: Remove elemento do fim
- **estaVazia**: Verifica se o deque está vazio
- **obterTamanho**: Retorna o número de elementos
- **exibir**: Retorna array com os elementos em ordem
- **esvaziar**: Remove todos os elementos

### ✅ Operações de Inserção
- **Inserção no início** (`inserirNoInicio`)
- **Inserção no fim** (`inserirNoFim`)
- **Inserção em posição específica** (`inserirNaPosicao`)

### ✅ Operações de Remoção
- **Remoção do início** (`removerDoInicio`)
- **Remoção do fim** (`removerDoFim`)
- **Remoção de posição específica** (`removerDaPosicao`)

### ✅ Operações de Visualização
- **Exibição normal** (`exibirNormal`) - da cabeça para a cauda
- **Exibição inversa** (`exibirInverso`) - da cauda para a cabeça
- **Impressão formatada** (`imprimir`) - para debug

### ✅ Operações Auxiliares
- **Verificar se está vazia** (`estaVazia`)
- **Esvaziar lista** (`esvaziar`)
- **Obter tamanho** (`obterTamanho`)
- **Buscar elemento** (`buscar`)
- **Obter valor por posição** (`obterValorNaPosicao`)

## 🌳 Funcionalidades da Árvore Binária de Busca

### ✅ Operações de Inserção e Pesquisa
- **Inserção de elementos** (`inserir`) - Mantém propriedade BST
- **Pesquisa de elementos** (`pesquisar`) - Busca eficiente O(log n)

### ✅ Percursos da Árvore
- **Busca em largura** (`buscaEmLargura`) - BFS level-order
- **Pré-ordem** (`preOrdem`) - Raiz → Esquerda → Direita
- **Em-ordem** (`emOrdem`) - Esquerda → Raiz → Direita (ordem crescente)
- **Pós-ordem** (`posOrdem`) - Esquerda → Direita → Raiz

### ✅ Propriedades e Informações
- **Altura da árvore** (`obterAltura`) - Profundidade máxima
- **Quantidade de elementos** (`obterQuantidadeElementos`) - Total de nós
- **Menor valor** (`obterMenorValor`) - Extremo esquerdo
- **Maior valor** (`obterMaiorValor`) - Extremo direito
- **Limpar árvore** (`limpar`) - Remove todos os elementos
- **Impressão visual** (`imprimirArvore`) - Estrutura hierárquica

## 📋 Estrutura do Projeto

```
data-struct/
├── lista-duplamente-encadeada/
│   └── lista-duplamente-encadeada.ts    # Lista Duplamente Encadeada
├── arvore-binaria-busca/
│   └── arvore-binaria-busca.ts          # Árvore Binária de Busca
├── deque/
│   └── deque.ts                        # Estrutura Deque
├── tests/
│   ├── lista-duplamente-encadeada.test.ts # Testes Jest da Lista
│   ├── arvore-binaria-busca.test.ts     # Testes Jest da Árvore
│   └── deque.test.ts                    # Testes Jest do Deque
├── teste-lista.ts                       # Testes manuais da Lista
├── teste-arvore.ts                      # Testes manuais da Árvore
├── coverage/                            # Relatórios de cobertura (gerado)
├── dist/                               # Arquivos compilados (gerado)
├── package.json                         # Configurações do projeto
├── tsconfig.json                        # Configurações TypeScript
├── jest.config.js                       # Configurações Jest
├── .gitignore                          # Arquivos ignorados pelo Git
└── README.md                           # Este arquivo
```

*Nota: Outras estruturas de dados serão adicionadas em pastas separadas conforme o desenvolvimento das atividades.*

## 🛠️ Como Usar

### 1. Instalação
```bash
npm install
```

### 2. Compilação
```bash
npm run build
```

### 3. Executar Testes
```bash
npm test
```


### 4. Exemplo de Uso - Deque

```typescript
import { Deque } from './deque/deque';

const deque = new Deque<number>();
deque.adicionarFim(10);
deque.adicionarInicio(5);
deque.adicionarFim(20);
console.log(deque.exibir()); // [5, 10, 20]
deque.removerInicio(); // 5
deque.removerFim(); // 20
console.log(deque.exibir()); // [10]
console.log('Tamanho:', deque.obterTamanho()); // 1
console.log('Vazia?', deque.estaVazia()); // false
deque.esvaziar();
console.log('Vazia após esvaziar?', deque.estaVazia()); // true
```

```typescript
import { ListaDuplamenteEncadeada } from './lista-duplamente-encadeada/lista-duplamente-encadeada';

// Criar uma nova lista
const lista = new ListaDuplamenteEncadeada<number>();

// Inserir elementos
lista.inserirNoFim(10);
lista.inserirNoFim(20);
lista.inserirNoInicio(5);
lista.inserirNaPosicao(2, 15);

// Exibir lista
console.log("Normal:", lista.exibirNormal());    // [5, 10, 15, 20]
console.log("Inversa:", lista.exibirInverso());  // [20, 15, 10, 5]

// Remover elementos
const removido = lista.removerDoInicio();        // Remove 5
lista.removerDoFim();                            // Remove 20
lista.removerDaPosicao(0);                       // Remove 10

// Verificar estado
console.log("Tamanho:", lista.obterTamanho());   // 1
console.log("Vazia?", lista.estaVazia());        // false

// Buscar elementos
const posicao = lista.buscar(15);                // 0
const valor = lista.obterValorNaPosicao(0);      // 15
```

### 5. Exemplo de Uso - Árvore Binária de Busca

```typescript
import { ArvoreBinariaBusca } from './arvore-binaria-busca/arvore-binaria-busca';

// Criar uma nova árvore
const arvore = new ArvoreBinariaBusca<number>();

// Inserir elementos
arvore.inserir(50);
arvore.inserir(30);
arvore.inserir(70);
arvore.inserir(20);
arvore.inserir(40);
arvore.inserir(60);
arvore.inserir(80);

// Pesquisar elementos
console.log("Encontrou 40:", arvore.pesquisar(40));    // true
console.log("Encontrou 90:", arvore.pesquisar(90));    // false

// Diferentes percursos
console.log("BFS:", arvore.buscaEmLargura());           // [50, 30, 70, 20, 40, 60, 80]
console.log("Em-ordem:", arvore.emOrdem());             // [20, 30, 40, 50, 60, 70, 80]
console.log("Pré-ordem:", arvore.preOrdem());           // [50, 30, 20, 40, 70, 60, 80]
console.log("Pós-ordem:", arvore.posOrdem());           // [20, 40, 30, 60, 80, 70, 50]

// Propriedades da árvore
console.log("Altura:", arvore.obterAltura());           // 2
console.log("Quantidade:", arvore.obterQuantidadeElementos()); // 7
console.log("Menor valor:", arvore.obterMenorValor());  // 20
console.log("Maior valor:", arvore.obterMaiorValor());  // 80

// Imprimir estrutura visual
arvore.imprimirArvore();
```

## 🏗️ Implementação Técnica

### Lista Duplamente Encadeada

#### Classe `No<T>`
Representa um nó individual da lista:
```typescript
class No<T> {
    public valor: T;
    public proximo: No<T> | null;
    public anterior: No<T> | null;
}
```

#### Classe `ListaDuplamenteEncadeada<T>`
Implementa a estrutura principal com:
- **Ponteiros**: `cabeca` e `cauda` para navegação eficiente
- **Contador**: `tamanho` para operações O(1)
- **Genéricos**: Suporte a qualquer tipo de dados

### Árvore Binária de Busca

#### Classe `NoArvore<T>`
Representa um nó individual da árvore:
```typescript
class NoArvore<T> {
    public valor: T;
    public esquerda: NoArvore<T> | null;
    public direita: NoArvore<T> | null;
}
```

#### Classe `ArvoreBinariaBusca<T>`
Implementa a estrutura principal com:
- **Propriedade BST**: Valores menores à esquerda, maiores à direita
- **Algoritmos recursivos**: Para inserção, busca e percursos
- **Contador**: `quantidade` para operações O(1)
- **Genéricos**: Suporte a qualquer tipo comparável

## 🎯 Complexidade das Operações

### Lista Duplamente Encadeada

| Operação | Complexidade |
|----------|-------------|
| Inserção no início/fim | O(1) |
| Inserção em posição | O(n) |
| Remoção do início/fim | O(1) |
| Remoção de posição | O(n) |
| Busca | O(n) |
| Obter tamanho | O(1) |
| Verificar se vazia | O(1) |

### Árvore Binária de Busca

| Operação | Melhor Caso | Caso Médio | Pior Caso |
|----------|------------|------------|-----------|
| Inserção | O(log n) | O(log n) | O(n) |
| Pesquisa | O(log n) | O(log n) | O(n) |
| Percursos | O(n) | O(n) | O(n) |
| Altura | O(1) | O(1) | O(1) |
| Menor/Maior valor | O(log n) | O(log n) | O(n) |
| Quantidade elementos | O(1) | O(1) | O(1) |

*Nota: O pior caso O(n) ocorre quando a árvore está completamente desbalanceada (em linha)*


## 🧪 Testes Incluídos
### Deque

#### Testes com Jest
O arquivo `tests/deque.test.ts` contém testes automatizados para todos os métodos e cenários clássicos:

- ✅ Inicialização e estado vazio
- ✅ Inserção nas extremidades
- ✅ Remoção nas extremidades
- ✅ Operações intercaladas
- ✅ Esvaziamento
- ✅ Suporte a diferentes tipos
- ✅ Edge cases e integridade

**Cobertura de Código**: 🎯 **100% em todas as métricas**
- 100% de statements
- 100% de branches
- 100% de functions
- 100% de lines

### Lista Duplamente Encadeada

#### Testes com Jest
O arquivo `tests/lista-duplamente-encadeada.test.ts` contém **44 testes abrangentes** organizados em categorias:

- ✅ **Inicialização**: Criação de lista vazia
- ✅ **Inserção no início**: Elemento único e múltiplos elementos  
- ✅ **Inserção no fim**: Elemento único e múltiplos elementos
- ✅ **Inserção em posição**: Início, meio, fim e validação de erros
- ✅ **Remoção do início**: Lista vazia, único elemento e múltiplos elementos
- ✅ **Remoção do fim**: Lista vazia, único elemento e múltiplos elementos
- ✅ **Remoção por posição**: Início, meio, fim e validação de erros
- ✅ **Navegação bidirecional**: Ordem normal e inversa
- ✅ **Busca de elementos**: Elementos existentes e inexistentes
- ✅ **Acesso por posição**: Posições válidas e inválidas
- ✅ **Operações de estado**: Verificação de vazio, tamanho e esvaziamento
- ✅ **Diferentes tipos**: Números, strings e objetos
- ✅ **Edge cases**: Operações complexas e integridade
- ✅ **Método imprimir**: Saída formatada e lista vazia
- ✅ **Função exemplo**: Cobertura completa da função de demonstração

**Cobertura de Código**: 🎯 **100% em todas as métricas**
- 100% de statements
- 100% de branches  
- 100% de functions
- 100% de lines

### Árvore Binária de Busca

#### Testes com Jest
O arquivo `tests/arvore-binaria-busca.test.ts` contém **38 testes abrangentes** organizados em categorias:

- ✅ **Inicialização**: Criação de árvore vazia
- ✅ **Inserção de elementos**: Elementos únicos, múltiplos e duplicados
- ✅ **Pesquisa de elementos**: Elementos existentes e inexistentes
- ✅ **Busca em largura**: BFS level-order traversal
- ✅ **Percurso pré-ordem**: Raiz → Esquerda → Direita
- ✅ **Percurso em-ordem**: Esquerda → Raiz → Direita (ordem crescente)
- ✅ **Percurso pós-ordem**: Esquerda → Direita → Raiz
- ✅ **Altura da árvore**: Árvores vazias, balanceadas e desbalanceadas
- ✅ **Quantidade de elementos**: Contagem correta e duplicatas
- ✅ **Valores extremos**: Menor e maior valor da árvore
- ✅ **Método limpar**: Limpeza completa da árvore
- ✅ **Método imprimir**: Visualização da estrutura
- ✅ **Diferentes tipos**: Números, strings e objetos
- ✅ **Cenários complexos**: Inserções sequenciais e integridade

**Cobertura de Código**: 🎯 **100% em todas as métricas**
- 100% de statements
- 100% de branches
- 100% de functions
- 100% de lines

#### Testes Manuais
- `teste-lista.ts` - Demonstração interativa da Lista Duplamente Encadeada
- `teste-arvore.ts` - Demonstração interativa da Árvore Binária de Busca

*Outras estruturas terão seus próprios arquivos de teste quando implementadas.*

## 📝 Scripts Disponíveis

```bash
npm run build         # Compila o TypeScript
npm run start         # Executa o arquivo compilado
npm run dev           # Executa diretamente com ts-node
npm test              # Executa todos os testes com Jest
npm run test:watch    # Executa testes em modo watch
npm run test:coverage # Executa testes com relatório de cobertura
npm run test:manual   # Executa teste manual da lista
```

## 💡 Vantagens das Estruturas Implementadas

### Lista Duplamente Encadeada
1. **Navegação Bidirecional**: Pode percorrer nos dois sentidos
2. **Inserção/Remoção Eficiente**: O(1) nas extremidades
3. **Flexibilidade**: Tamanho dinâmico
4. **Tipo Genérico**: Funciona com qualquer tipo de dados


## 🎯 Futuras Implementações

Este repositório será expandido com outras estruturas de dados, incluindo:
- ✅ Deque (Double-Ended Queue)
- 🔲 Pilha (Stack)
- 🔲 Fila (Queue)
- 🔲 Árvore Binária
- 🔲 Árvore AVL
- 🔲 Hash Table
- 🔲 Grafo

## 🔧 Requisitos

- Node.js
- TypeScript
- npm ou yarn

---

**Repositório das seis tarefas que compõem a disciplina de Estrutura de Dados II do terceiro módulo do curso de Análise e Desenvolvimento de Sistemas.**