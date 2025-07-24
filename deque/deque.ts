/**
 * Implementação de um Deque (Double-Ended Queue) em TypeScript.
 * 
 * Um deque é uma estrutura de dados linear que permite inserção e remoção
 * de elementos tanto no início quanto no fim da fila.
 * 
 * ## Operações principais:
 * - adicionarInicio: insere elemento no início
 * - adicionarFim: insere elemento no fim
 * - removerInicio: remove elemento do início
 * - removerFim: remove elemento do fim
 * - estaVazia: verifica se o deque está vazio
 * - obterTamanho: retorna o número de elementos
 * - exibir: retorna array com os elementos em ordem
 * 
 * @template T - Tipo dos elementos armazenados
 * 
 * @example
 * ```typescript
 * const deque = new Deque<number>();
 * deque.adicionarFim(10);
 * deque.adicionarInicio(5);
 * deque.adicionarFim(20);
 * console.log(deque.exibir()); // [5, 10, 20]
 * deque.removerInicio(); // 5
 * deque.removerFim(); // 20
 * ```
 */
class Deque<T> {
    private itens: T[];

    /**
     * Cria um deque vazio.
     */
    constructor() {
        this.itens = [];
    }

    /**
     * Insere um elemento no início do deque.
     * @param valor - Elemento a ser inserido
     */
    adicionarInicio(valor: T): void {
        this.itens.unshift(valor);
    }

    /**
     * Insere um elemento no fim do deque.
     * @param valor - Elemento a ser inserido
     */
    adicionarFim(valor: T): void {
        this.itens.push(valor);
    }

    /**
     * Remove e retorna o elemento do início do deque.
     * @returns O elemento removido ou undefined se vazio
     */
    removerInicio(): T | undefined {
        return this.itens.shift();
    }

    /**
     * Remove e retorna o elemento do fim do deque.
     * @returns O elemento removido ou undefined se vazio
     */
    removerFim(): T | undefined {
        return this.itens.pop();
    }

    /**
     * Verifica se o deque está vazio.
     * @returns true se vazio, false caso contrário
     */
    estaVazia(): boolean {
        return this.itens.length === 0;
    }

    /**
     * Retorna o número de elementos no deque.
     * @returns O tamanho do deque
     */
    obterTamanho(): number {
        return this.itens.length;
    }

    /**
     * Retorna um array com os elementos do deque em ordem.
     * @returns Array dos elementos
     */
    exibir(): T[] {
        return [...this.itens];
    }

    /**
     * Esvazia o deque.
     */
    esvaziar(): void {
        this.itens = [];
    }
}

export { Deque };
