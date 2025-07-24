import { Deque } from '../deque/deque';

describe('Deque', () => {
  let deque: Deque<number>;

  beforeEach(() => {
    deque = new Deque<number>();
  });

  test('deve iniciar vazio', () => {
    expect(deque.estaVazia()).toBe(true);
    expect(deque.obterTamanho()).toBe(0);
    expect(deque.exibir()).toEqual([]);
  });

  test('adicionarFim deve inserir elementos no fim', () => {
    deque.adicionarFim(10);
    deque.adicionarFim(20);
    expect(deque.exibir()).toEqual([10, 20]);
    expect(deque.obterTamanho()).toBe(2);
  });

  test('adicionarInicio deve inserir elementos no início', () => {
    deque.adicionarFim(10);
    deque.adicionarInicio(5);
    expect(deque.exibir()).toEqual([5, 10]);
    deque.adicionarInicio(1);
    expect(deque.exibir()).toEqual([1, 5, 10]);
  });

  test('removerInicio deve remover do início', () => {
    deque.adicionarFim(10);
    deque.adicionarFim(20);
    deque.adicionarInicio(5);
    expect(deque.removerInicio()).toBe(5);
    expect(deque.exibir()).toEqual([10, 20]);
    expect(deque.removerInicio()).toBe(10);
    expect(deque.removerInicio()).toBe(20);
    expect(deque.removerInicio()).toBeUndefined();
    expect(deque.estaVazia()).toBe(true);
  });

  test('removerFim deve remover do fim', () => {
    deque.adicionarFim(10);
    deque.adicionarFim(20);
    deque.adicionarInicio(5);
    expect(deque.removerFim()).toBe(20);
    expect(deque.exibir()).toEqual([5, 10]);
    expect(deque.removerFim()).toBe(10);
    expect(deque.removerFim()).toBe(5);
    expect(deque.removerFim()).toBeUndefined();
    expect(deque.estaVazia()).toBe(true);
  });

  test('deve funcionar com tipos diferentes', () => {
    const d = new Deque<string>();
    d.adicionarFim('a');
    d.adicionarInicio('b');
    expect(d.exibir()).toEqual(['b', 'a']);
    expect(d.removerFim()).toBe('a');
    expect(d.removerInicio()).toBe('b');
    expect(d.estaVazia()).toBe(true);
  });

  test('esvaziar deve limpar o deque', () => {
    deque.adicionarFim(1);
    deque.adicionarFim(2);
    deque.esvaziar();
    expect(deque.estaVazia()).toBe(true);
    expect(deque.exibir()).toEqual([]);
    expect(deque.obterTamanho()).toBe(0);
  });

  test('operações intercaladas devem manter integridade', () => {
    deque.adicionarFim(1);
    deque.adicionarInicio(2);
    deque.adicionarFim(3);
    expect(deque.exibir()).toEqual([2, 1, 3]);
    expect(deque.removerInicio()).toBe(2);
    deque.adicionarInicio(4);
    expect(deque.exibir()).toEqual([4, 1, 3]);
    expect(deque.removerFim()).toBe(3);
    expect(deque.exibir()).toEqual([4, 1]);
  });

  test('deque deve suportar muitos elementos', () => {
    for (let i = 0; i < 100; i++) {
      deque.adicionarFim(i);
    }
    expect(deque.obterTamanho()).toBe(100);
    expect(deque.exibir()[0]).toBe(0);
    expect(deque.exibir()[99]).toBe(99);
    for (let i = 0; i < 50; i++) {
      deque.removerInicio();
    }
    expect(deque.obterTamanho()).toBe(50);
    for (let i = 0; i < 50; i++) {
      deque.removerFim();
    }
    expect(deque.estaVazia()).toBe(true);
  });
});
