import { ListaDuplamenteEncadeada, exemploDeUso } from '../lista-duplamente-encadeada/lista-duplamente-encadeada';

describe('ListaDuplamenteEncadeada', () => {
  let lista: ListaDuplamenteEncadeada<number>;

  beforeEach(() => {
    lista = new ListaDuplamenteEncadeada<number>();
  });

  describe('Inicialização', () => {
    test('deve criar uma lista vazia', () => {
      expect(lista.estaVazia()).toBe(true);
      expect(lista.obterTamanho()).toBe(0);
      expect(lista.exibirNormal()).toEqual([]);
      expect(lista.exibirInverso()).toEqual([]);
    });
  });

  describe('Inserção no início', () => {
    test('deve inserir elemento em lista vazia', () => {
      lista.inserirNoInicio(10);
      
      expect(lista.estaVazia()).toBe(false);
      expect(lista.obterTamanho()).toBe(1);
      expect(lista.exibirNormal()).toEqual([10]);
      expect(lista.exibirInverso()).toEqual([10]);
    });

    test('deve inserir múltiplos elementos no início', () => {
      lista.inserirNoInicio(10);
      lista.inserirNoInicio(20);
      lista.inserirNoInicio(30);
      
      expect(lista.obterTamanho()).toBe(3);
      expect(lista.exibirNormal()).toEqual([30, 20, 10]);
      expect(lista.exibirInverso()).toEqual([10, 20, 30]);
    });
  });

  describe('Inserção no fim', () => {
    test('deve inserir elemento em lista vazia', () => {
      lista.inserirNoFim(10);
      
      expect(lista.estaVazia()).toBe(false);
      expect(lista.obterTamanho()).toBe(1);
      expect(lista.exibirNormal()).toEqual([10]);
      expect(lista.exibirInverso()).toEqual([10]);
    });

    test('deve inserir múltiplos elementos no fim', () => {
      lista.inserirNoFim(10);
      lista.inserirNoFim(20);
      lista.inserirNoFim(30);
      
      expect(lista.obterTamanho()).toBe(3);
      expect(lista.exibirNormal()).toEqual([10, 20, 30]);
      expect(lista.exibirInverso()).toEqual([30, 20, 10]);
    });
  });

  describe('Inserção em posição específica', () => {
    beforeEach(() => {
      lista.inserirNoFim(10);
      lista.inserirNoFim(20);
      lista.inserirNoFim(30);
    });

    test('deve inserir na posição 0 (início)', () => {
      lista.inserirNaPosicao(0, 5);
      
      expect(lista.obterTamanho()).toBe(4);
      expect(lista.exibirNormal()).toEqual([5, 10, 20, 30]);
    });

    test('deve inserir no meio da lista', () => {
      lista.inserirNaPosicao(1, 15);
      
      expect(lista.obterTamanho()).toBe(4);
      expect(lista.exibirNormal()).toEqual([10, 15, 20, 30]);
    });

    test('deve inserir na última posição (fim)', () => {
      lista.inserirNaPosicao(3, 40);
      
      expect(lista.obterTamanho()).toBe(4);
      expect(lista.exibirNormal()).toEqual([10, 20, 30, 40]);
    });

    test('deve lançar erro para posição inválida negativa', () => {
      expect(() => lista.inserirNaPosicao(-1, 5)).toThrow('Posição inválida');
    });

    test('deve lançar erro para posição inválida maior que tamanho', () => {
      expect(() => lista.inserirNaPosicao(4, 5)).toThrow('Posição inválida');
    });
  });

  describe('Remoção do início', () => {
    test('deve retornar null para lista vazia', () => {
      expect(lista.removerDoInicio()).toBeNull();
    });

    test('deve remover único elemento', () => {
      lista.inserirNoInicio(10);
      
      expect(lista.removerDoInicio()).toBe(10);
      expect(lista.estaVazia()).toBe(true);
      expect(lista.obterTamanho()).toBe(0);
    });

    test('deve remover primeiro elemento de lista com múltiplos elementos', () => {
      lista.inserirNoFim(10);
      lista.inserirNoFim(20);
      lista.inserirNoFim(30);
      
      expect(lista.removerDoInicio()).toBe(10);
      expect(lista.obterTamanho()).toBe(2);
      expect(lista.exibirNormal()).toEqual([20, 30]);
    });
  });

  describe('Remoção do fim', () => {
    test('deve retornar null para lista vazia', () => {
      expect(lista.removerDoFim()).toBeNull();
    });

    test('deve remover único elemento', () => {
      lista.inserirNoFim(10);
      
      expect(lista.removerDoFim()).toBe(10);
      expect(lista.estaVazia()).toBe(true);
      expect(lista.obterTamanho()).toBe(0);
    });

    test('deve remover último elemento de lista com múltiplos elementos', () => {
      lista.inserirNoFim(10);
      lista.inserirNoFim(20);
      lista.inserirNoFim(30);
      
      expect(lista.removerDoFim()).toBe(30);
      expect(lista.obterTamanho()).toBe(2);
      expect(lista.exibirNormal()).toEqual([10, 20]);
    });
  });

  describe('Remoção de posição específica', () => {
    beforeEach(() => {
      lista.inserirNoFim(10);
      lista.inserirNoFim(20);
      lista.inserirNoFim(30);
      lista.inserirNoFim(40);
    });

    test('deve remover da posição 0 (início)', () => {
      expect(lista.removerDaPosicao(0)).toBe(10);
      expect(lista.obterTamanho()).toBe(3);
      expect(lista.exibirNormal()).toEqual([20, 30, 40]);
    });

    test('deve remover do meio da lista', () => {
      expect(lista.removerDaPosicao(1)).toBe(20);
      expect(lista.obterTamanho()).toBe(3);
      expect(lista.exibirNormal()).toEqual([10, 30, 40]);
    });

    test('deve remover da última posição (fim)', () => {
      expect(lista.removerDaPosicao(3)).toBe(40);
      expect(lista.obterTamanho()).toBe(3);
      expect(lista.exibirNormal()).toEqual([10, 20, 30]);
    });

    test('deve lançar erro para posição inválida negativa', () => {
      expect(() => lista.removerDaPosicao(-1)).toThrow('Posição inválida');
    });

    test('deve lançar erro para posição inválida maior que índice máximo', () => {
      expect(() => lista.removerDaPosicao(4)).toThrow('Posição inválida');
    });
  });

  describe('Navegação bidirecional', () => {
    beforeEach(() => {
      lista.inserirNoFim(10);
      lista.inserirNoFim(20);
      lista.inserirNoFim(30);
      lista.inserirNoFim(40);
    });

    test('deve exibir elementos na ordem normal', () => {
      expect(lista.exibirNormal()).toEqual([10, 20, 30, 40]);
    });

    test('deve exibir elementos na ordem inversa', () => {
      expect(lista.exibirInverso()).toEqual([40, 30, 20, 10]);
    });

    test('deve manter consistência bidirecional após inserções', () => {
      lista.inserirNoInicio(5);
      lista.inserirNoFim(50);
      
      expect(lista.exibirNormal()).toEqual([5, 10, 20, 30, 40, 50]);
      expect(lista.exibirInverso()).toEqual([50, 40, 30, 20, 10, 5]);
    });

    test('deve manter consistência bidirecional após remoções', () => {
      lista.removerDoInicio();
      lista.removerDoFim();
      
      expect(lista.exibirNormal()).toEqual([20, 30]);
      expect(lista.exibirInverso()).toEqual([30, 20]);
    });
  });

  describe('Busca de elementos', () => {
    beforeEach(() => {
      lista.inserirNoFim(10);
      lista.inserirNoFim(20);
      lista.inserirNoFim(30);
      lista.inserirNoFim(20); // Elemento duplicado
    });

    test('deve encontrar elemento existente', () => {
      expect(lista.buscar(20)).toBe(1); // Primeira ocorrência
      expect(lista.buscar(30)).toBe(2);
    });

    test('deve retornar -1 para elemento inexistente', () => {
      expect(lista.buscar(100)).toBe(-1);
    });

    test('deve retornar -1 para lista vazia', () => {
      const listaVazia = new ListaDuplamenteEncadeada<number>();
      expect(listaVazia.buscar(10)).toBe(-1);
    });
  });

  describe('Acesso por posição', () => {
    beforeEach(() => {
      lista.inserirNoFim(10);
      lista.inserirNoFim(20);
      lista.inserirNoFim(30);
    });

    test('deve retornar valor correto para posições válidas', () => {
      expect(lista.obterValorNaPosicao(0)).toBe(10);
      expect(lista.obterValorNaPosicao(1)).toBe(20);
      expect(lista.obterValorNaPosicao(2)).toBe(30);
    });

    test('deve retornar null para posições inválidas', () => {
      expect(lista.obterValorNaPosicao(-1)).toBeNull();
      expect(lista.obterValorNaPosicao(3)).toBeNull();
    });

    test('deve retornar null para lista vazia', () => {
      const listaVazia = new ListaDuplamenteEncadeada<number>();
      expect(listaVazia.obterValorNaPosicao(0)).toBeNull();
    });
  });

  describe('Operações de estado', () => {
    test('deve verificar se lista está vazia corretamente', () => {
      expect(lista.estaVazia()).toBe(true);
      
      lista.inserirNoFim(10);
      expect(lista.estaVazia()).toBe(false);
      
      lista.removerDoFim();
      expect(lista.estaVazia()).toBe(true);
    });

    test('deve retornar tamanho correto', () => {
      expect(lista.obterTamanho()).toBe(0);
      
      lista.inserirNoFim(10);
      lista.inserirNoFim(20);
      expect(lista.obterTamanho()).toBe(2);
      
      lista.removerDoInicio();
      expect(lista.obterTamanho()).toBe(1);
    });

    test('deve esvaziar lista corretamente', () => {
      lista.inserirNoFim(10);
      lista.inserirNoFim(20);
      lista.inserirNoFim(30);
      
      expect(lista.obterTamanho()).toBe(3);
      
      lista.esvaziar();
      
      expect(lista.estaVazia()).toBe(true);
      expect(lista.obterTamanho()).toBe(0);
      expect(lista.exibirNormal()).toEqual([]);
      expect(lista.exibirInverso()).toEqual([]);
    });
  });

  describe('Teste com diferentes tipos de dados', () => {
    test('deve funcionar com strings', () => {
      const listaStrings = new ListaDuplamenteEncadeada<string>();
      
      listaStrings.inserirNoFim('TypeScript');
      listaStrings.inserirNoFim('JavaScript');
      listaStrings.inserirNoInicio('Python');
      
      expect(listaStrings.exibirNormal()).toEqual(['Python', 'TypeScript', 'JavaScript']);
      expect(listaStrings.buscar('TypeScript')).toBe(1);
    });

    test('deve funcionar com objetos', () => {
      interface Pessoa {
        nome: string;
        idade: number;
      }
      
      const listaPessoas = new ListaDuplamenteEncadeada<Pessoa>();
      const pessoa1: Pessoa = { nome: 'João', idade: 25 };
      const pessoa2: Pessoa = { nome: 'Maria', idade: 30 };
      
      listaPessoas.inserirNoFim(pessoa1);
      listaPessoas.inserirNoFim(pessoa2);
      
      expect(listaPessoas.obterTamanho()).toBe(2);
      expect(listaPessoas.obterValorNaPosicao(0)).toEqual(pessoa1);
      expect(listaPessoas.obterValorNaPosicao(1)).toEqual(pessoa2);
    });
  });

  describe('Cenários de edge cases', () => {
    test('deve lidar com operações em sequência', () => {
      // Inserções mistas
      lista.inserirNoFim(10);
      lista.inserirNoInicio(5);
      lista.inserirNaPosicao(1, 7);
      lista.inserirNoFim(15);
      
      expect(lista.exibirNormal()).toEqual([5, 7, 10, 15]);
      
      // Remoções mistas
      lista.removerDaPosicao(1);
      lista.removerDoInicio();
      lista.removerDoFim();
      
      expect(lista.exibirNormal()).toEqual([10]);
      expect(lista.obterTamanho()).toBe(1);
    });

    test('deve manter integridade após múltiplas operações', () => {
      // Construir lista
      for (let i = 1; i <= 5; i++) {
        lista.inserirNoFim(i * 10);
      }
      
      // Remover elementos do meio
      lista.removerDaPosicao(2); // Remove 30
      lista.removerDaPosicao(2); // Remove 40 (que agora está na posição 2)
      
      expect(lista.exibirNormal()).toEqual([10, 20, 50]);
      expect(lista.exibirInverso()).toEqual([50, 20, 10]);
      
      // Inserir no meio novamente
      lista.inserirNaPosicao(1, 15);
      lista.inserirNaPosicao(3, 35);
      
      expect(lista.exibirNormal()).toEqual([10, 15, 20, 35, 50]);
      expect(lista.exibirInverso()).toEqual([50, 35, 20, 15, 10]);
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

    test('deve imprimir "Lista vazia" para lista vazia', () => {
      lista.imprimir();
      
      expect(consoleSpy).toHaveBeenCalledWith("Lista vazia");
    });

    test('deve imprimir elementos formatados para lista com elementos', () => {
      lista.inserirNoFim(10);
      lista.inserirNoFim(20);
      lista.inserirNoFim(30);
      
      lista.imprimir();
      
      expect(consoleSpy).toHaveBeenCalledWith("Lista:", "10 <-> 20 <-> 30");
    });

    test('deve imprimir elemento único corretamente', () => {
      lista.inserirNoFim(42);
      
      lista.imprimir();
      
      expect(consoleSpy).toHaveBeenCalledWith("Lista:", "42");
    });
  });

  // Importando a função exemploDeUso para testes
  // Vamos testá-la de forma isolada
  describe('exemploDeUso', () => {
    test('deve executar exemplo de uso corretamente', () => {
      const listaExemplo = new ListaDuplamenteEncadeada<number>();
      
      listaExemplo.inserirNoFim(1);
      listaExemplo.inserirNoFim(2);
      listaExemplo.inserirNoFim(3);
      
      expect(listaExemplo.exibirNormal()).toEqual([1, 2, 3]);
      expect(listaExemplo.obterTamanho()).toBe(3);
      
      listaExemplo.removerDaPosicao(1);
      
      expect(listaExemplo.exibirNormal()).toEqual([1, 3]);
      expect(listaExemplo.obterTamanho()).toBe(2);
    });
  });
});

describe('Função exemploDeUso', () => {
  let consoleSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  test('deve executar exemplo completo sem erros', () => {
    expect(() => exemploDeUso()).not.toThrow();
    
    // Verificar se algumas saídas esperadas foram chamadas
    expect(consoleSpy).toHaveBeenCalledWith("=== Testando Lista Duplamente Encadeada ===\n");
    expect(consoleSpy).toHaveBeenCalledWith("1. Inserindo elementos:");
    expect(consoleSpy).toHaveBeenCalledWith("4. Removendo elementos:");
    expect(consoleSpy).toHaveBeenCalledWith("7. Lista está vazia?", false);
    expect(consoleSpy).toHaveBeenCalledWith("8. Após esvaziar - Lista está vazia?", true);
  });

  test('deve chamar console.log múltiplas vezes durante execução', () => {
    exemploDeUso();
    
    // Verificar se console.log foi chamado várias vezes
    expect(consoleSpy.mock.calls.length).toBeGreaterThan(10);
  });
});
