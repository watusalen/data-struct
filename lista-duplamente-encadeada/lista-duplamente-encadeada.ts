/**
 * Classe que representa um nó da lista duplamente encadeada.
 * Cada nó contém um valor e referências para o próximo e anterior nó.
 * 
 * @template T - Tipo do valor armazenado no nó
 */
class No<T> {
    /** O valor armazenado no nó */
    public valor: T;
    /** Referência para o próximo nó na lista */
    public proximo: No<T> | null;
    /** Referência para o nó anterior na lista */
    public anterior: No<T> | null;

    /**
     * Cria uma nova instância de um nó.
     * 
     * @param valor - O valor a ser armazenado no nó
     */
    constructor(valor: T) {
        this.valor = valor;
        this.proximo = null;
        this.anterior = null;
    }
}

/**
 * Implementação de uma Lista Duplamente Encadeada (Doubly Linked List).
 * 
 * Uma lista duplamente encadeada é uma estrutura de dados linear onde cada elemento
 * aponta tanto para o próximo quanto para o anterior elemento da lista. Isso permite
 * navegação bidirecional eficiente através da lista.
 * 
 * ## Características:
 * - Inserção e remoção O(1) no início e fim
 * - Inserção e remoção O(n) em posição específica
 * - Busca O(n)
 * - Navegação bidirecional
 * - Uso eficiente de memória (sem desperdício de espaço)
 * 
 * ## Operações Principais:
 * - Inserção (início, fim, posição específica)
 * - Remoção (início, fim, posição específica)
 * - Busca de elementos
 * - Exibição normal e inversa
 * - Verificação de estado (vazia, tamanho)
 * 
 * @template T - Tipo dos elementos armazenados na lista
 * 
 * @example
 * ```typescript
 * const lista = new ListaDuplamenteEncadeada<number>();
 * lista.inserirNoFim(10);
 * lista.inserirNoInicio(5);
 * lista.inserirNaPosicao(1, 7);
 * console.log(lista.exibirNormal()); // [5, 7, 10]
 * ```
 */
class ListaDuplamenteEncadeada<T> {
    /** Referência para o primeiro nó da lista */
    private cabeca: No<T> | null;
    /** Referência para o último nó da lista */
    private cauda: No<T> | null;
    /** Número atual de elementos na lista */
    private tamanho: number;

    /**
     * Cria uma nova instância de lista duplamente encadeada vazia.
     * 
     * @example
     * ```typescript
     * const lista = new ListaDuplamenteEncadeada<string>();
     * console.log(lista.estaVazia()); // true
     * ```
     */
    constructor() {
        this.cabeca = null;
        this.cauda = null;
        this.tamanho = 0;
    }

    /**
     * Insere um novo elemento no início da lista.
     * 
     * Complexidade: O(1) - operação de tempo constante.
     * 
     * @param valor - O valor a ser inserido no início da lista
     * 
     * @example
     * ```typescript
     * const lista = new ListaDuplamenteEncadeada<number>();
     * lista.inserirNoInicio(10);
     * lista.inserirNoInicio(5);
     * console.log(lista.exibirNormal()); // [5, 10]
     * ```
     */
    inserirNoInicio(valor: T): void {
        const novoNo = new No(valor);
        
        if (this.estaVazia()) {
            this.cabeca = novoNo;
            this.cauda = novoNo;
        } else {
            novoNo.proximo = this.cabeca;
            this.cabeca!.anterior = novoNo;
            this.cabeca = novoNo;
        }
        
        this.tamanho++;
    }

    /**
     * Insere um novo elemento no final da lista.
     * 
     * Complexidade: O(1) - operação de tempo constante.
     * 
     * @param valor - O valor a ser inserido no final da lista
     * 
     * @example
     * ```typescript
     * const lista = new ListaDuplamenteEncadeada<number>();
     * lista.inserirNoFim(10);
     * lista.inserirNoFim(20);
     * console.log(lista.exibirNormal()); // [10, 20]
     * ```
     */
    inserirNoFim(valor: T): void {
        const novoNo = new No(valor);
        
        if (this.estaVazia()) {
            this.cabeca = novoNo;
            this.cauda = novoNo;
        } else {
            this.cauda!.proximo = novoNo;
            novoNo.anterior = this.cauda;
            this.cauda = novoNo;
        }
        
        this.tamanho++;
    }

    /**
     * Insere um novo elemento em uma posição específica da lista.
     * 
     * Complexidade: O(n) no pior caso, onde n é a posição de inserção.
     * 
     * @param posicao - A posição onde o elemento será inserido (0-indexado)
     * @param valor - O valor a ser inserido
     * @throws {Error} Quando a posição é inválida (menor que 0 ou maior que o tamanho)
     * 
     * @example
     * ```typescript
     * const lista = new ListaDuplamenteEncadeada<number>();
     * lista.inserirNoFim(10);
     * lista.inserirNoFim(30);
     * lista.inserirNaPosicao(1, 20); // Insere 20 entre 10 e 30
     * console.log(lista.exibirNormal()); // [10, 20, 30]
     * ```
     */
    inserirNaPosicao(posicao: number, valor: T): void {
        if (posicao < 0 || posicao > this.tamanho) {
            throw new Error(`Posição inválida. Deve estar entre 0 e ${this.tamanho}`);
        }

        if (posicao === 0) {
            this.inserirNoInicio(valor);
            return;
        }

        if (posicao === this.tamanho) {
            this.inserirNoFim(valor);
            return;
        }

        const novoNo = new No(valor);
        let atual = this.cabeca;
        
        for (let i = 0; i < posicao; i++) {
            atual = atual!.proximo;
        }

        novoNo.proximo = atual;
        novoNo.anterior = atual!.anterior;
        atual!.anterior!.proximo = novoNo;
        atual!.anterior = novoNo;
        
        this.tamanho++;
    }

    /**
     * Remove e retorna o elemento do início da lista.
     * 
     * Complexidade: O(1) - operação de tempo constante.
     * 
     * @returns O valor removido do início da lista, ou null se a lista estiver vazia
     * 
     * @example
     * ```typescript
     * const lista = new ListaDuplamenteEncadeada<number>();
     * lista.inserirNoFim(10);
     * lista.inserirNoFim(20);
     * const removido = lista.removerDoInicio(); // 10
     * console.log(lista.exibirNormal()); // [20]
     * ```
     */
    removerDoInicio(): T | null {
        if (this.estaVazia()) {
            return null;
        }

        const valorRemovido = this.cabeca!.valor;

        if (this.tamanho === 1) {
            this.cabeca = null;
            this.cauda = null;
        } else {
            this.cabeca = this.cabeca!.proximo;
            this.cabeca!.anterior = null;
        }

        this.tamanho--;
        return valorRemovido;
    }

    /**
     * Remove e retorna o elemento do final da lista.
     * 
     * Complexidade: O(1) - operação de tempo constante.
     * 
     * @returns O valor removido do final da lista, ou null se a lista estiver vazia
     * 
     * @example
     * ```typescript
     * const lista = new ListaDuplamenteEncadeada<number>();
     * lista.inserirNoFim(10);
     * lista.inserirNoFim(20);
     * const removido = lista.removerDoFim(); // 20
     * console.log(lista.exibirNormal()); // [10]
     * ```
     */
    removerDoFim(): T | null {
        if (this.estaVazia()) {
            return null;
        }

        const valorRemovido = this.cauda!.valor;

        if (this.tamanho === 1) {
            this.cabeca = null;
            this.cauda = null;
        } else {
            this.cauda = this.cauda!.anterior;
            this.cauda!.proximo = null;
        }

        this.tamanho--;
        return valorRemovido;
    }

    /**
     * Remove e retorna o elemento de uma posição específica da lista.
     * 
     * Complexidade: O(n) no pior caso, onde n é a posição de remoção.
     * 
     * @param posicao - A posição do elemento a ser removido (0-indexado)
     * @returns O valor removido da posição especificada
     * @throws {Error} Quando a posição é inválida (menor que 0 ou maior/igual ao tamanho)
     * 
     * @example
     * ```typescript
     * const lista = new ListaDuplamenteEncadeada<number>();
     * lista.inserirNoFim(10);
     * lista.inserirNoFim(20);
     * lista.inserirNoFim(30);
     * const removido = lista.removerDaPosicao(1); // 20
     * console.log(lista.exibirNormal()); // [10, 30]
     * ```
     */
    removerDaPosicao(posicao: number): T | null {
        if (posicao < 0 || posicao >= this.tamanho) {
            throw new Error(`Posição inválida. Deve estar entre 0 e ${this.tamanho - 1}`);
        }

        if (posicao === 0) {
            return this.removerDoInicio();
        }

        if (posicao === this.tamanho - 1) {
            return this.removerDoFim();
        }

        let atual = this.cabeca;
        for (let i = 0; i < posicao; i++) {
            atual = atual!.proximo;
        }

        const valorRemovido = atual!.valor;
        atual!.anterior!.proximo = atual!.proximo;
        atual!.proximo!.anterior = atual!.anterior;
        
        this.tamanho--;
        return valorRemovido;
    }

    /**
     * Retorna um array com todos os elementos da lista em ordem normal (do início ao fim).
     * 
     * Complexidade: O(n) onde n é o número de elementos na lista.
     * 
     * @returns Array contendo todos os elementos da lista em ordem normal
     * 
     * @example
     * ```typescript
     * const lista = new ListaDuplamenteEncadeada<number>();
     * lista.inserirNoFim(10);
     * lista.inserirNoFim(20);
     * lista.inserirNoFim(30);
     * console.log(lista.exibirNormal()); // [10, 20, 30]
     * ```
     */
    exibirNormal(): T[] {
        const resultado: T[] = [];
        let atual = this.cabeca;
        
        while (atual !== null) {
            resultado.push(atual.valor);
            atual = atual.proximo;
        }
        
        return resultado;
    }

    /**
     * Retorna um array com todos os elementos da lista em ordem inversa (do fim ao início).
     * 
     * Complexidade: O(n) onde n é o número de elementos na lista.
     * 
     * @returns Array contendo todos os elementos da lista em ordem inversa
     * 
     * @example
     * ```typescript
     * const lista = new ListaDuplamenteEncadeada<number>();
     * lista.inserirNoFim(10);
     * lista.inserirNoFim(20);
     * lista.inserirNoFim(30);
     * console.log(lista.exibirInverso()); // [30, 20, 10]
     * ```
     */
    exibirInverso(): T[] {
        const resultado: T[] = [];
        let atual = this.cauda;
        
        while (atual !== null) {
            resultado.push(atual.valor);
            atual = atual.anterior;
        }
        
        return resultado;
    }

    /**
     * Verifica se a lista está vazia.
     * 
     * Complexidade: O(1) - operação de tempo constante.
     * 
     * @returns true se a lista estiver vazia, false caso contrário
     * 
     * @example
     * ```typescript
     * const lista = new ListaDuplamenteEncadeada<number>();
     * console.log(lista.estaVazia()); // true
     * lista.inserirNoFim(10);
     * console.log(lista.estaVazia()); // false
     * ```
     */
    estaVazia(): boolean {
        return this.tamanho === 0;
    }

    /**
     * Remove todos os elementos da lista, deixando-a vazia.
     * 
     * Complexidade: O(1) - operação de tempo constante.
     * 
     * @example
     * ```typescript
     * const lista = new ListaDuplamenteEncadeada<number>();
     * lista.inserirNoFim(10);
     * lista.inserirNoFim(20);
     * lista.esvaziar();
     * console.log(lista.estaVazia()); // true
     * console.log(lista.obterTamanho()); // 0
     * ```
     */
    esvaziar(): void {
        this.cabeca = null;
        this.cauda = null;
        this.tamanho = 0;
    }

    /**
     * Retorna o número atual de elementos na lista.
     * 
     * Complexidade: O(1) - operação de tempo constante.
     * 
     * @returns O número de elementos na lista
     * 
     * @example
     * ```typescript
     * const lista = new ListaDuplamenteEncadeada<number>();
     * console.log(lista.obterTamanho()); // 0
     * lista.inserirNoFim(10);
     * lista.inserirNoFim(20);
     * console.log(lista.obterTamanho()); // 2
     * ```
     */
    obterTamanho(): number {
        return this.tamanho;
    }

    /**
     * Imprime a lista no console de forma legível.
     * Método auxiliar para facilitar visualização e debug.
     * 
     * @example
     * ```typescript
     * const lista = new ListaDuplamenteEncadeada<number>();
     * lista.inserirNoFim(10);
     * lista.inserirNoFim(20);
     * lista.imprimir(); // "Lista: 10 <-> 20"
     * ```
     */
    imprimir(): void {
        if (this.estaVazia()) {
            console.log("Lista vazia");
            return;
        }

        const elementos = this.exibirNormal();
        console.log("Lista:", elementos.join(" <-> "));
    }

    /**
     * Busca um valor na lista e retorna sua posição.
     * 
     * Complexidade: O(n) onde n é o número de elementos na lista.
     * 
     * @param valor - O valor a ser buscado na lista
     * @returns A posição do valor na lista (0-indexado), ou -1 se não encontrado
     * 
     * @example
     * ```typescript
     * const lista = new ListaDuplamenteEncadeada<number>();
     * lista.inserirNoFim(10);
     * lista.inserirNoFim(20);
     * lista.inserirNoFim(30);
     * console.log(lista.buscar(20)); // 1
     * console.log(lista.buscar(100)); // -1
     * ```
     */
    buscar(valor: T): number {
        let atual = this.cabeca;
        let posicao = 0;

        while (atual !== null) {
            if (atual.valor === valor) {
                return posicao;
            }
            atual = atual.proximo;
            posicao++;
        }

        return -1; // Valor não encontrado
    }

    /**
     * Obtém o valor armazenado em uma posição específica da lista.
     * 
     * Complexidade: O(n) no pior caso, onde n é a posição desejada.
     * 
     * @param posicao - A posição do elemento desejado (0-indexado)
     * @returns O valor na posição especificada, ou null se a posição for inválida
     * 
     * @example
     * ```typescript
     * const lista = new ListaDuplamenteEncadeada<number>();
     * lista.inserirNoFim(10);
     * lista.inserirNoFim(20);
     * lista.inserirNoFim(30);
     * console.log(lista.obterValorNaPosicao(1)); // 20
     * console.log(lista.obterValorNaPosicao(5)); // null
     * ```
     */
    obterValorNaPosicao(posicao: number): T | null {
        if (posicao < 0 || posicao >= this.tamanho) {
            return null;
        }

        let atual = this.cabeca;
        for (let i = 0; i < posicao; i++) {
            atual = atual!.proximo;
        }

        return atual!.valor;
    }
}

/**
 * Função de demonstração que mostra como usar a Lista Duplamente Encadeada.
 * 
 * Esta função executa uma série de operações para demonstrar o funcionamento
 * da lista duplamente encadeada, incluindo inserções, remoções, buscas e
 * verificação de estado.
 * 
 * @example
 * ```typescript
 * // Execute a demonstração
 * exemploDeUso();
 * ```
 */
function exemploDeUso(): void {
    const lista = new ListaDuplamenteEncadeada<number>();

    console.log("=== Testando Lista Duplamente Encadeada ===\n");

    // Testando inserções
    console.log("1. Inserindo elementos:");
    lista.inserirNoFim(10);
    lista.inserirNoFim(20);
    lista.inserirNoInicio(5);
    lista.inserirNaPosicao(2, 15);
    lista.imprimir();
    console.log(`Tamanho: ${lista.obterTamanho()}\n`);

    // Testando exibições
    console.log("2. Exibindo lista normal:", lista.exibirNormal());
    console.log("3. Exibindo lista inversa:", lista.exibirInverso());
    console.log();

    // Testando remoções
    console.log("4. Removendo elementos:");
    console.log("Removido do início:", lista.removerDoInicio());
    console.log("Removido do fim:", lista.removerDoFim());
    console.log("Removido da posição 0:", lista.removerDaPosicao(0));
    lista.imprimir();
    console.log(`Tamanho: ${lista.obterTamanho()}\n`);

    // Testando busca
    console.log("5. Buscando valor 15:", lista.buscar(15));
    console.log("6. Buscando valor 100:", lista.buscar(100));
    console.log();

    // Testando se está vazia
    console.log("7. Lista está vazia?", lista.estaVazia());
    
    // Esvaziando lista
    lista.esvaziar();
    console.log("8. Após esvaziar - Lista está vazia?", lista.estaVazia());
    console.log(`Tamanho: ${lista.obterTamanho()}`);
}

// Descomente a linha abaixo para executar o exemplo
// exemploDeUso();

export { ListaDuplamenteEncadeada, No, exemploDeUso };