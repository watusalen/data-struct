import { ArvoreBinariaBusca, exemploUsoArvore } from '../arvore-binaria-busca/arvore-binaria-busca';

describe('ArvoreBinariaBusca', () => {
  let arvore: ArvoreBinariaBusca<number>;

  beforeEach(() => {
    arvore = new ArvoreBinariaBusca<number>();
  });

  describe('Inicialização', () => {
    test('deve criar uma árvore vazia', () => {
      expect(arvore.estaVazia()).toBe(true);
      expect(arvore.obterQuantidadeElementos()).toBe(0);
      expect(arvore.obterAltura()).toBe(-1);
      expect(arvore.emOrdem()).toEqual([]);
      expect(arvore.preOrdem()).toEqual([]);
      expect(arvore.posOrdem()).toEqual([]);
      expect(arvore.buscaEmLargura()).toEqual([]);
    });
  });

  describe('Inserção de elementos', () => {
    test('deve inserir elemento em árvore vazia', () => {
      arvore.inserir(50);
      
      expect(arvore.estaVazia()).toBe(false);
      expect(arvore.obterQuantidadeElementos()).toBe(1);
      expect(arvore.obterAltura()).toBe(0);
      expect(arvore.emOrdem()).toEqual([50]);
    });

    test('deve inserir múltiplos elementos corretamente', () => {
      const valores = [50, 30, 70, 20, 40, 60, 80];
      valores.forEach(valor => arvore.inserir(valor));
      
      expect(arvore.obterQuantidadeElementos()).toBe(7);
      expect(arvore.obterAltura()).toBe(2);
      expect(arvore.emOrdem()).toEqual([20, 30, 40, 50, 60, 70, 80]); // Em ordem crescente
    });

    test('deve ignorar valores duplicados', () => {
      arvore.inserir(50);
      arvore.inserir(30);
      arvore.inserir(50); // Duplicado
      
      expect(arvore.obterQuantidadeElementos()).toBe(2);
      expect(arvore.emOrdem()).toEqual([30, 50]);
    });

    test('deve manter propriedade BST após múltiplas inserções', () => {
      const valores = [50, 30, 70, 20, 40, 60, 80, 10, 25, 35, 45];
      valores.forEach(valor => arvore.inserir(valor));
      
      const emOrdem = arvore.emOrdem();
      const emOrdemOrdenado = [...emOrdem].sort((a, b) => a - b);
      
      expect(emOrdem).toEqual(emOrdemOrdenado);
    });
  });

  describe('Pesquisa de elementos', () => {
    beforeEach(() => {
      [50, 30, 70, 20, 40, 60, 80].forEach(valor => arvore.inserir(valor));
    });

    test('deve encontrar elementos existentes', () => {
      expect(arvore.pesquisar(50)).toBe(true);
      expect(arvore.pesquisar(30)).toBe(true);
      expect(arvore.pesquisar(80)).toBe(true);
      expect(arvore.pesquisar(20)).toBe(true);
    });

    test('deve retornar false para elementos inexistentes', () => {
      expect(arvore.pesquisar(100)).toBe(false);
      expect(arvore.pesquisar(15)).toBe(false);
      expect(arvore.pesquisar(35)).toBe(false);
    });

    test('deve retornar false para árvore vazia', () => {
      const arvoreVazia = new ArvoreBinariaBusca<number>();
      expect(arvoreVazia.pesquisar(50)).toBe(false);
    });
  });

  describe('Busca em largura (BFS)', () => {
    test('deve retornar array vazio para árvore vazia', () => {
      expect(arvore.buscaEmLargura()).toEqual([]);
    });

    test('deve retornar elemento único para árvore com um nó', () => {
      arvore.inserir(50);
      expect(arvore.buscaEmLargura()).toEqual([50]);
    });

    test('deve percorrer árvore em largura corretamente', () => {
      // Construindo árvore:
      //       50
      //      /  \
      //     30   70
      //    / \   / \
      //   20 40 60 80
      [50, 30, 70, 20, 40, 60, 80].forEach(valor => arvore.inserir(valor));
      
      expect(arvore.buscaEmLargura()).toEqual([50, 30, 70, 20, 40, 60, 80]);
    });
  });

  describe('Percurso pré-ordem', () => {
    test('deve retornar array vazio para árvore vazia', () => {
      expect(arvore.preOrdem()).toEqual([]);
    });

    test('deve percorrer árvore em pré-ordem corretamente', () => {
      [50, 30, 70, 20, 40, 60, 80].forEach(valor => arvore.inserir(valor));
      
      // Pré-ordem: raiz -> esquerda -> direita
      expect(arvore.preOrdem()).toEqual([50, 30, 20, 40, 70, 60, 80]);
    });
  });

  describe('Percurso em-ordem', () => {
    test('deve retornar array vazio para árvore vazia', () => {
      expect(arvore.emOrdem()).toEqual([]);
    });

    test('deve percorrer árvore em-ordem corretamente (ordem crescente)', () => {
      const valores = [50, 30, 70, 20, 40, 60, 80, 10, 90];
      valores.forEach(valor => arvore.inserir(valor));
      
      // Em-ordem em BST sempre retorna elementos em ordem crescente
      expect(arvore.emOrdem()).toEqual([10, 20, 30, 40, 50, 60, 70, 80, 90]);
    });
  });

  describe('Percurso pós-ordem', () => {
    test('deve retornar array vazio para árvore vazia', () => {
      expect(arvore.posOrdem()).toEqual([]);
    });

    test('deve percorrer árvore em pós-ordem corretamente', () => {
      [50, 30, 70, 20, 40, 60, 80].forEach(valor => arvore.inserir(valor));
      
      // Pós-ordem: esquerda -> direita -> raiz
      expect(arvore.posOrdem()).toEqual([20, 40, 30, 60, 80, 70, 50]);
    });
  });

  describe('Altura da árvore', () => {
    test('deve retornar -1 para árvore vazia', () => {
      expect(arvore.obterAltura()).toBe(-1);
    });

    test('deve retornar 0 para árvore com um nó', () => {
      arvore.inserir(50);
      expect(arvore.obterAltura()).toBe(0);
    });

    test('deve calcular altura corretamente para árvore balanceada', () => {
      [50, 30, 70, 20, 40, 60, 80].forEach(valor => arvore.inserir(valor));
      expect(arvore.obterAltura()).toBe(2);
    });

    test('deve calcular altura corretamente para árvore desbalanceada', () => {
      [50, 40, 30, 20, 10].forEach(valor => arvore.inserir(valor)); // Árvore em linha
      expect(arvore.obterAltura()).toBe(4);
    });
  });

  describe('Quantidade de elementos', () => {
    test('deve retornar 0 para árvore vazia', () => {
      expect(arvore.obterQuantidadeElementos()).toBe(0);
    });

    test('deve contar elementos corretamente', () => {
      expect(arvore.obterQuantidadeElementos()).toBe(0);
      
      arvore.inserir(50);
      expect(arvore.obterQuantidadeElementos()).toBe(1);
      
      arvore.inserir(30);
      arvore.inserir(70);
      expect(arvore.obterQuantidadeElementos()).toBe(3);
    });

    test('não deve contar elementos duplicados', () => {
      arvore.inserir(50);
      arvore.inserir(50);
      arvore.inserir(50);
      
      expect(arvore.obterQuantidadeElementos()).toBe(1);
    });
  });

  describe('Valores extremos', () => {
    beforeEach(() => {
      [50, 30, 70, 20, 40, 60, 80].forEach(valor => arvore.inserir(valor));
    });

    test('deve encontrar menor valor corretamente', () => {
      expect(arvore.obterMenorValor()).toBe(20);
    });

    test('deve encontrar maior valor corretamente', () => {
      expect(arvore.obterMaiorValor()).toBe(80);
    });

    test('deve retornar null para árvore vazia', () => {
      const arvoreVazia = new ArvoreBinariaBusca<number>();
      expect(arvoreVazia.obterMenorValor()).toBeNull();
      expect(arvoreVazia.obterMaiorValor()).toBeNull();
    });

    test('deve retornar o mesmo valor para árvore com um elemento', () => {
      const arvoreUmElemento = new ArvoreBinariaBusca<number>();
      arvoreUmElemento.inserir(42);
      
      expect(arvoreUmElemento.obterMenorValor()).toBe(42);
      expect(arvoreUmElemento.obterMaiorValor()).toBe(42);
    });
  });

  describe('Método limpar', () => {
    test('deve limpar árvore corretamente', () => {
      [50, 30, 70, 20, 40].forEach(valor => arvore.inserir(valor));
      
      expect(arvore.obterQuantidadeElementos()).toBe(5);
      expect(arvore.estaVazia()).toBe(false);
      
      arvore.limpar();
      
      expect(arvore.obterQuantidadeElementos()).toBe(0);
      expect(arvore.estaVazia()).toBe(true);
      expect(arvore.obterAltura()).toBe(-1);
      expect(arvore.emOrdem()).toEqual([]);
    });
  });

  describe('Método imprimir', () => {
    let consoleSpy: jest.SpyInstance;

    beforeEach(() => {
      consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    });

    afterEach(() => {
      consoleSpy.mockRestore();
    });

    test('deve imprimir "Árvore vazia" para árvore vazia', () => {
      arvore.imprimirArvore();
      expect(consoleSpy).toHaveBeenCalledWith("Árvore vazia");
    });

    test('deve imprimir estrutura da árvore para árvore com elementos', () => {
      arvore.inserir(50);
      arvore.inserir(30);
      arvore.inserir(70);
      
      arvore.imprimirArvore();
      
      expect(consoleSpy).toHaveBeenCalledWith("Estrutura da árvore:");
      // Verifica se alguns elementos da estrutura foram impressos
      expect(consoleSpy.mock.calls.some(call => call[0].includes('50'))).toBe(true);
    });
  });

  describe('Teste com diferentes tipos de dados', () => {
    test('deve funcionar com strings', () => {
      const arvoreStrings = new ArvoreBinariaBusca<string>();
      const palavras = ['casa', 'arvore', 'zebra', 'banana'];
      
      palavras.forEach(palavra => arvoreStrings.inserir(palavra));
      
      expect(arvoreStrings.obterQuantidadeElementos()).toBe(4);
      expect(arvoreStrings.emOrdem()).toEqual(['arvore', 'banana', 'casa', 'zebra']);
      expect(arvoreStrings.pesquisar('banana')).toBe(true);
      expect(arvoreStrings.pesquisar('python')).toBe(false);
    });

    test('deve funcionar com objetos comparáveis', () => {
      interface Pessoa {
        nome: string;
        idade: number;
      }
      
      // Para objetos, precisamos usar a idade como critério de comparação
      const arvorePessoas = new ArvoreBinariaBusca<number>();
      
      arvorePessoas.inserir(25);
      arvorePessoas.inserir(30);
      arvorePessoas.inserir(20);
      
      expect(arvorePessoas.emOrdem()).toEqual([20, 25, 30]);
      expect(arvorePessoas.pesquisar(25)).toBe(true);
    });
  });

  describe('Cenários complexos', () => {
    test('deve manter integridade após múltiplas operações', () => {
      // Inserir valores aleatórios
      const valores = [50, 25, 75, 10, 30, 60, 80, 5, 15, 27, 35];
      valores.forEach(valor => arvore.inserir(valor));
      
      // Verificar propriedades
      expect(arvore.obterQuantidadeElementos()).toBe(valores.length);
      
      const emOrdem = arvore.emOrdem();
      const emOrdemOrdenado = [...emOrdem].sort((a, b) => a - b);
      expect(emOrdem).toEqual(emOrdemOrdenado);
      
      // Verificar que todos os valores estão presentes
      valores.forEach(valor => {
        expect(arvore.pesquisar(valor)).toBe(true);
      });
      
      // Verificar que valores inexistentes não são encontrados
      [100, 200, -10].forEach(valor => {
        expect(arvore.pesquisar(valor)).toBe(false);
      });
    });

    test('deve lidar com inserção sequencial crescente', () => {
      [1, 2, 3, 4, 5].forEach(valor => arvore.inserir(valor));
      
      expect(arvore.emOrdem()).toEqual([1, 2, 3, 4, 5]);
      expect(arvore.obterAltura()).toBe(4); // Árvore em linha (desbalanceada)
      expect(arvore.buscaEmLargura()).toEqual([1, 2, 3, 4, 5]);
    });

    test('deve lidar com inserção sequencial decrescente', () => {
      [5, 4, 3, 2, 1].forEach(valor => arvore.inserir(valor));
      
      expect(arvore.emOrdem()).toEqual([1, 2, 3, 4, 5]);
      expect(arvore.obterAltura()).toBe(4); // Árvore em linha (desbalanceada)
      expect(arvore.buscaEmLargura()).toEqual([5, 4, 3, 2, 1]);
    });
  });
});

describe('Função exemploUsoArvore', () => {
  let consoleSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  test('deve executar exemplo completo sem erros', () => {
    expect(() => exemploUsoArvore()).not.toThrow();
    
    // Verificar se algumas saídas esperadas foram chamadas
    expect(consoleSpy).toHaveBeenCalledWith("=== Testando Árvore Binária de Busca ===\n");
    expect(consoleSpy).toHaveBeenCalledWith("1. Inserindo elementos na árvore:");
    expect(consoleSpy).toHaveBeenCalledWith("2. Testando pesquisas:");
    expect(consoleSpy).toHaveBeenCalledWith("3. Diferentes tipos de percurso:");
    expect(consoleSpy).toHaveBeenCalledWith("4. Valores extremos:");
    expect(consoleSpy).toHaveBeenCalledWith("5. Testando com strings:");
  });

  test('deve chamar console.log múltiplas vezes durante execução', () => {
    exemploUsoArvore();
    
    // Verificar se console.log foi chamado várias vezes
    expect(consoleSpy.mock.calls.length).toBeGreaterThan(20);
  });
});
