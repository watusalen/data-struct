/**
 * Classe que representa um nó da árvore binária de busca.
 * Cada nó contém um valor e referências para os filhos esquerdo e direito.
 * 
 * @template T - Tipo do valor armazenado no nó
 */
class NoArvore<T> {
    /** O valor armazenado no nó */
    public valor: T;
    /** Referência para o filho esquerdo */
    public esquerda: NoArvore<T> | null;
    /** Referência para o filho direito */
    public direita: NoArvore<T> | null;

    /**
     * Cria uma nova instância de um nó da árvore.
     * 
     * @param valor - O valor a ser armazenado no nó
     */
    constructor(valor: T) {
        this.valor = valor;
        this.esquerda = null;
        this.direita = null;
    }
}

/**
 * Implementação de uma Árvore Binária de Busca (Binary Search Tree - BST).
 * 
 * Uma árvore binária de busca é uma estrutura de dados hierárquica onde cada nó
 * tem no máximo dois filhos (esquerdo e direito). Para qualquer nó, todos os valores
 * na subárvore esquerda são menores que o valor do nó, e todos os valores na
 * subárvore direita são maiores.
 * 
 * ## Características:
 * - Busca O(log n) no caso médio, O(n) no pior caso
 * - Inserção O(log n) no caso médio, O(n) no pior caso
 * - Remoção O(log n) no caso médio, O(n) no pior caso
 * - Percurso em-ordem retorna elementos em ordem crescente
 * - Não permite valores duplicados
 * 
 * ## Operações Principais:
 * - Inserção de elementos
 * - Pesquisa de elementos
 * - Diferentes tipos de percurso (BFS, pré-ordem, em-ordem, pós-ordem)
 * - Cálculo de altura e quantidade de elementos
 * - Busca de valores extremos (menor/maior)
 * 
 * @template T - Tipo dos elementos armazenados na árvore (deve ser comparável)
 * 
 * @example
 * ```typescript
 * const arvore = new ArvoreBinariaBusca<number>();
 * arvore.inserir(50);
 * arvore.inserir(30);
 * arvore.inserir(70);
 * console.log(arvore.emOrdem()); // [30, 50, 70]
 * console.log(arvore.pesquisar(30)); // true
 * ```
 */
class ArvoreBinariaBusca<T> {
    /** Referência para o nó raiz da árvore */
    private raiz: NoArvore<T> | null;
    /** Número atual de elementos na árvore */
    private quantidade: number;

    /**
     * Cria uma nova instância de árvore binária de busca vazia.
     * 
     * @example
     * ```typescript
     * const arvore = new ArvoreBinariaBusca<number>();
     * console.log(arvore.estaVazia()); // true
     * ```
     */
    constructor() {
        this.raiz = null;
        this.quantidade = 0;
    }

    /**
     * Insere um novo elemento na árvore binária de busca.
     * 
     * O elemento é inserido seguindo a propriedade da BST: valores menores
     * vão para a esquerda, valores maiores para a direita. Valores duplicados
     * são ignorados.
     * 
     * Complexidade: O(log n) no caso médio, O(n) no pior caso (árvore degenerada).
     * 
     * @param valor - O valor a ser inserido na árvore
     * 
     * @example
     * ```typescript
     * const arvore = new ArvoreBinariaBusca<number>();
     * arvore.inserir(50);
     * arvore.inserir(30);
     * arvore.inserir(70);
     * console.log(arvore.obterQuantidadeElementos()); // 3
     * ```
     */
    inserir(valor: T): void {
        this.raiz = this.inserirRecursivo(this.raiz, valor);
        this.quantidade++;
    }

    /**
     * Método privado que implementa a inserção recursiva na árvore.
     * 
     * @param no - O nó atual sendo processado
     * @param valor - O valor a ser inserido
     * @returns O nó atualizado após a inserção
     */
    private inserirRecursivo(no: NoArvore<T> | null, valor: T): NoArvore<T> {
        // Se o nó é nulo, cria um novo nó
        if (no === null) {
            return new NoArvore(valor);
        }

        // Insere à esquerda se o valor é menor
        if (valor < no.valor) {
            no.esquerda = this.inserirRecursivo(no.esquerda, valor);
        }
        // Insere à direita se o valor é maior
        else if (valor > no.valor) {
            no.direita = this.inserirRecursivo(no.direita, valor);
        }
        // Se o valor já existe, não insere (BST não permite duplicatas)
        else {
            this.quantidade--; // Decrementa pois não foi inserido
        }

        return no;
    }

    /**
     * Pesquisa se um determinado elemento está presente na árvore.
     * 
     * A pesquisa segue a propriedade da BST para encontrar o elemento
     * de forma eficiente.
     * 
     * Complexidade: O(log n) no caso médio, O(n) no pior caso.
     * 
     * @param valor - O valor a ser pesquisado
     * @returns true se o valor estiver na árvore, false caso contrário
     * 
     * @example
     * ```typescript
     * const arvore = new ArvoreBinariaBusca<number>();
     * arvore.inserir(50);
     * arvore.inserir(30);
     * console.log(arvore.pesquisar(30)); // true
     * console.log(arvore.pesquisar(100)); // false
     * ```
     */
    pesquisar(valor: T): boolean {
        return this.pesquisarRecursivo(this.raiz, valor);
    }

    /**
     * Método privado que implementa a pesquisa recursiva na árvore.
     * 
     * @param no - O nó atual sendo processado
     * @param valor - O valor a ser pesquisado
     * @returns true se o valor for encontrado, false caso contrário
     */
    private pesquisarRecursivo(no: NoArvore<T> | null, valor: T): boolean {
        // Se chegou a um nó nulo, o valor não existe
        if (no === null) {
            return false;
        }

        // Se encontrou o valor
        if (valor === no.valor) {
            return true;
        }

        // Busca à esquerda se o valor é menor
        if (valor < no.valor) {
            return this.pesquisarRecursivo(no.esquerda, valor);
        }
        // Busca à direita se o valor é maior
        else {
            return this.pesquisarRecursivo(no.direita, valor);
        }
    }

    /**
     * Realiza busca em largura (BFS - Breadth-First Search) na árvore.
     * 
     * Visita os nós nível por nível, da esquerda para a direita.
     * Útil para visualizar a estrutura da árvore por níveis.
     * 
     * Complexidade: O(n) onde n é o número de elementos na árvore.
     * 
     * @returns Array com os elementos na ordem de busca em largura
     * 
     * @example
     * ```typescript
     * const arvore = new ArvoreBinariaBusca<number>();
     * arvore.inserir(50);
     * arvore.inserir(30);
     * arvore.inserir(70);
     * arvore.inserir(20);
     * arvore.inserir(40);
     * console.log(arvore.buscaEmLargura()); // [50, 30, 70, 20, 40]
     * ```
     */
    buscaEmLargura(): T[] {
        if (this.raiz === null) {
            return [];
        }

        const resultado: T[] = [];
        const fila: NoArvore<T>[] = [this.raiz];

        while (fila.length > 0) {
            const noAtual = fila.shift()!;
            resultado.push(noAtual.valor);

            // Adiciona os filhos à fila
            if (noAtual.esquerda !== null) {
                fila.push(noAtual.esquerda);
            }
            if (noAtual.direita !== null) {
                fila.push(noAtual.direita);
            }
        }

        return resultado;
    }

    /**
     * Realiza percurso pré-ordem (raiz -> esquerda -> direita) na árvore.
     * 
     * Visita primeiro a raiz, depois a subárvore esquerda e por fim
     * a subárvore direita. Útil para criar uma cópia da árvore.
     * 
     * Complexidade: O(n) onde n é o número de elementos na árvore.
     * 
     * @returns Array com os elementos na ordem pré-ordem
     * 
     * @example
     * ```typescript
     * const arvore = new ArvoreBinariaBusca<number>();
     * arvore.inserir(50);
     * arvore.inserir(30);
     * arvore.inserir(70);
     * console.log(arvore.preOrdem()); // [50, 30, 70]
     * ```
     */
    preOrdem(): T[] {
        const resultado: T[] = [];
        this.preOrdemRecursivo(this.raiz, resultado);
        return resultado;
    }

    /**
     * Método privado que implementa o percurso pré-ordem recursivo.
     * 
     * @param no - O nó atual sendo processado
     * @param resultado - Array para armazenar os elementos visitados
     */
    private preOrdemRecursivo(no: NoArvore<T> | null, resultado: T[]): void {
        if (no !== null) {
            resultado.push(no.valor);           // Visita a raiz
            this.preOrdemRecursivo(no.esquerda, resultado);  // Visita subárvore esquerda
            this.preOrdemRecursivo(no.direita, resultado);   // Visita subárvore direita
        }
    }

    /**
     * Realiza percurso em-ordem (esquerda -> raiz -> direita) na árvore.
     * 
     * Em uma BST, este percurso retorna os elementos em ordem crescente.
     * É o percurso mais útil para obter elementos ordenados.
     * 
     * Complexidade: O(n) onde n é o número de elementos na árvore.
     * 
     * @returns Array com os elementos em ordem crescente
     * 
     * @example
     * ```typescript
     * const arvore = new ArvoreBinariaBusca<number>();
     * arvore.inserir(50);
     * arvore.inserir(30);
     * arvore.inserir(70);
     * arvore.inserir(20);
     * console.log(arvore.emOrdem()); // [20, 30, 50, 70]
     * ```
     */
    emOrdem(): T[] {
        const resultado: T[] = [];
        this.emOrdemRecursivo(this.raiz, resultado);
        return resultado;
    }

    /**
     * Método privado que implementa o percurso em-ordem recursivo.
     * 
     * @param no - O nó atual sendo processado
     * @param resultado - Array para armazenar os elementos visitados
     */
    private emOrdemRecursivo(no: NoArvore<T> | null, resultado: T[]): void {
        if (no !== null) {
            this.emOrdemRecursivo(no.esquerda, resultado);   // Visita subárvore esquerda
            resultado.push(no.valor);                        // Visita a raiz
            this.emOrdemRecursivo(no.direita, resultado);    // Visita subárvore direita
        }
    }

    /**
     * Realiza percurso pós-ordem (esquerda -> direita -> raiz) na árvore.
     * 
     * Visita primeiro as subárvores esquerda e direita, depois a raiz.
     * Útil para operações como calcular o tamanho da árvore ou liberação de memória.
     * 
     * Complexidade: O(n) onde n é o número de elementos na árvore.
     * 
     * @returns Array com os elementos na ordem pós-ordem
     * 
     * @example
     * ```typescript
     * const arvore = new ArvoreBinariaBusca<number>();
     * arvore.inserir(50);
     * arvore.inserir(30);
     * arvore.inserir(70);
     * console.log(arvore.posOrdem()); // [30, 70, 50]
     * ```
     */
    posOrdem(): T[] {
        const resultado: T[] = [];
        this.posOrdemRecursivo(this.raiz, resultado);
        return resultado;
    }

    /**
     * Método privado que implementa o percurso pós-ordem recursivo.
     * 
     * @param no - O nó atual sendo processado
     * @param resultado - Array para armazenar os elementos visitados
     */
    private posOrdemRecursivo(no: NoArvore<T> | null, resultado: T[]): void {
        if (no !== null) {
            this.posOrdemRecursivo(no.esquerda, resultado);  // Visita subárvore esquerda
            this.posOrdemRecursivo(no.direita, resultado);   // Visita subárvore direita
            resultado.push(no.valor);                        // Visita a raiz
        }
    }

    /**
     * Calcula e retorna a altura da árvore.
     * 
     * A altura é definida como o número de arestas no caminho mais longo
     * da raiz até uma folha. Uma árvore vazia tem altura -1.
     * 
     * Complexidade: O(n) onde n é o número de elementos na árvore.
     * 
     * @returns A altura da árvore (-1 se vazia)
     * 
     * @example
     * ```typescript
     * const arvore = new ArvoreBinariaBusca<number>();
     * console.log(arvore.obterAltura()); // -1 (árvore vazia)
     * arvore.inserir(50);
     * console.log(arvore.obterAltura()); // 0 (só a raiz)
     * arvore.inserir(30);
     * arvore.inserir(70);
     * console.log(arvore.obterAltura()); // 1
     * ```
     */
    obterAltura(): number {
        return this.calcularAltura(this.raiz);
    }

    /**
     * Método privado que calcula recursivamente a altura da árvore.
     * 
     * @param no - O nó atual sendo processado
     * @returns A altura da subárvore com raiz no nó dado
     */
    private calcularAltura(no: NoArvore<T> | null): number {
        if (no === null) {
            return -1; // Árvore vazia tem altura -1
        }

        const alturaEsquerda = this.calcularAltura(no.esquerda);
        const alturaDireita = this.calcularAltura(no.direita);

        return Math.max(alturaEsquerda, alturaDireita) + 1;
    }

    /**
     * Retorna o número atual de elementos na árvore.
     * 
     * Complexidade: O(1) - operação de tempo constante.
     * 
     * @returns O número de elementos na árvore
     * 
     * @example
     * ```typescript
     * const arvore = new ArvoreBinariaBusca<number>();
     * console.log(arvore.obterQuantidadeElementos()); // 0
     * arvore.inserir(50);
     * arvore.inserir(30);
     * console.log(arvore.obterQuantidadeElementos()); // 2
     * ```
     */
    obterQuantidadeElementos(): number {
        return this.quantidade;
    }

    /**
     * Verifica se a árvore está vazia.
     * 
     * Complexidade: O(1) - operação de tempo constante.
     * 
     * @returns true se a árvore estiver vazia, false caso contrário
     * 
     * @example
     * ```typescript
     * const arvore = new ArvoreBinariaBusca<number>();
     * console.log(arvore.estaVazia()); // true
     * arvore.inserir(50);
     * console.log(arvore.estaVazia()); // false
     * ```
     */
    estaVazia(): boolean {
        return this.raiz === null;
    }

    /**
     * Imprime a estrutura da árvore no console de forma visual.
     * Método auxiliar para facilitar visualização e debug da estrutura.
     * 
     * @example
     * ```typescript
     * const arvore = new ArvoreBinariaBusca<number>();
     * arvore.inserir(50);
     * arvore.inserir(30);
     * arvore.inserir(70);
     * arvore.imprimirArvore();
     * // Saída:
     * // Estrutura da árvore:
     * // └── 50
     * //     ├── 70
     * //     └── 30
     * ```
     */
    imprimirArvore(): void {
        if (this.estaVazia()) {
            console.log("Árvore vazia");
            return;
        }

        console.log("Estrutura da árvore:");
        this.imprimirArvoreRecursivo(this.raiz, "", true);
    }

    /**
     * Método privado que implementa a impressão recursiva da árvore.
     * 
     * @param no - O nó atual sendo processado
     * @param prefixo - String de prefixo para formatação visual
     * @param isUltimo - Indica se este é o último filho do nível
     */
    private imprimirArvoreRecursivo(no: NoArvore<T> | null, prefixo: string, isUltimo: boolean): void {
        if (no !== null) {
            console.log(prefixo + (isUltimo ? "└── " : "├── ") + no.valor);
            
            const novoPrefixo = prefixo + (isUltimo ? "    " : "│   ");
            
            if (no.esquerda !== null || no.direita !== null) {
                if (no.direita !== null) {
                    this.imprimirArvoreRecursivo(no.direita, novoPrefixo, no.esquerda === null);
                }
                if (no.esquerda !== null) {
                    this.imprimirArvoreRecursivo(no.esquerda, novoPrefixo, true);
                }
            }
        }
    }

    /**
     * Encontra e retorna o menor valor presente na árvore.
     * 
     * Em uma BST, o menor valor está sempre no nó mais à esquerda.
     * 
     * Complexidade: O(log n) no caso médio, O(n) no pior caso.
     * 
     * @returns O menor valor da árvore, ou null se a árvore estiver vazia
     * 
     * @example
     * ```typescript
     * const arvore = new ArvoreBinariaBusca<number>();
     * arvore.inserir(50);
     * arvore.inserir(30);
     * arvore.inserir(70);
     * arvore.inserir(20);
     * console.log(arvore.obterMenorValor()); // 20
     * ```
     */
    obterMenorValor(): T | null {
        if (this.raiz === null) {
            return null;
        }

        let atual = this.raiz;
        while (atual.esquerda !== null) {
            atual = atual.esquerda;
        }

        return atual.valor;
    }

    /**
     * Encontra e retorna o maior valor presente na árvore.
     * 
     * Em uma BST, o maior valor está sempre no nó mais à direita.
     * 
     * Complexidade: O(log n) no caso médio, O(n) no pior caso.
     * 
     * @returns O maior valor da árvore, ou null se a árvore estiver vazia
     * 
     * @example
     * ```typescript
     * const arvore = new ArvoreBinariaBusca<number>();
     * arvore.inserir(50);
     * arvore.inserir(30);
     * arvore.inserir(70);
     * arvore.inserir(80);
     * console.log(arvore.obterMaiorValor()); // 80
     * ```
     */
    obterMaiorValor(): T | null {
        if (this.raiz === null) {
            return null;
        }

        let atual = this.raiz;
        while (atual.direita !== null) {
            atual = atual.direita;
        }

        return atual.valor;
    }

    /**
     * Remove todos os elementos da árvore, deixando-a vazia.
     * 
     * Complexidade: O(1) - operação de tempo constante.
     * 
     * @example
     * ```typescript
     * const arvore = new ArvoreBinariaBusca<number>();
     * arvore.inserir(50);
     * arvore.inserir(30);
     * arvore.limpar();
     * console.log(arvore.estaVazia()); // true
     * console.log(arvore.obterQuantidadeElementos()); // 0
     * ```
     */
    limpar(): void {
        this.raiz = null;
        this.quantidade = 0;
    }

    /**
     * Retorna um array com os valores dos nós ancestrais de um elemento.
     * Os ancestrais são retornados da raiz até o pai do elemento.
     *
     * @param valor - Valor do nó para buscar ancestrais
     * @returns Array com os valores dos ancestrais, ou vazio se não encontrado
     * @example
     * arvore.ancestrais(45); // [50, 30, 40]
     */
    ancestrais(valor: T): T[] {
        const resultado: T[] = [];
        let atual = this.raiz;
        while (atual !== null) {
            if (valor === atual.valor) break;
            resultado.push(atual.valor);
            if (valor < atual.valor) {
                atual = atual.esquerda;
            } else {
                atual = atual.direita;
            }
        }
        // Se não encontrou, retorna vazio
        if (atual === null) return [];
        return resultado;
    }

    /**
     * Retorna um array com os valores dos nós descendentes de um elemento.
     * Os descendentes são todos os nós abaixo do nó especificado.
     *
     * @param valor - Valor do nó para buscar descendentes
     * @returns Array com os valores dos descendentes, ou vazio se não encontrado
     * @example
     * arvore.descendentes(30); // [20, 25, 35, 40, 45]
     */
    descendentes(valor: T): T[] {
        const no = this.localizarNo(this.raiz, valor);
        if (!no) return [];
        const resultado: T[] = [];
        this.descendentesRecursivo(no, resultado);
        // Remove o próprio nó do resultado
        return resultado.filter(v => v !== valor);
    }

    /**
     * Método privado para localizar um nó pelo valor.
     */
    private localizarNo(no: NoArvore<T> | null, valor: T): NoArvore<T> | null {
        if (!no) return null;
        if (valor === no.valor) return no;
        if (valor < no.valor) return this.localizarNo(no.esquerda, valor);
        return this.localizarNo(no.direita, valor);
    }

    /**
     * Método privado para coletar descendentes recursivamente.
     */
    private descendentesRecursivo(no: NoArvore<T> | null, resultado: T[]): void {
        if (!no) return;
        resultado.push(no.valor);
        this.descendentesRecursivo(no.esquerda, resultado);
        this.descendentesRecursivo(no.direita, resultado);
    }

    /**
     * Retorna o nível (profundidade) de um elemento na árvore.
     * Raiz está no nível 0.
     *
     * @param valor - Valor do nó para buscar o nível
     * @returns O nível do nó, ou -1 se não encontrado
     * @example
     * arvore.nivel(45); // 3
     */
    nivel(valor: T): number {
        let atual = this.raiz;
        let nivel = 0;
        while (atual !== null) {
            if (valor === atual.valor) return nivel;
            if (valor < atual.valor) {
                atual = atual.esquerda;
            } else {
                atual = atual.direita;
            }
            nivel++;
        }
        return -1;
    }

    /**
     * Verifica se a árvore é estritamente binária (todo nó tem 0 ou 2 filhos).
     *
     * @returns true se for estritamente binária, false caso contrário
     * @example
     * arvore.ehEstritamenteBinaria(); // true
     */
    ehEstritamenteBinaria(): boolean {
        return this.ehEstritamenteBinariaRec(this.raiz);
    }

    private ehEstritamenteBinariaRec(no: NoArvore<T> | null): boolean {
        if (!no) return true;
        const filhos = [no.esquerda, no.direita].filter(x => x !== null).length;
        if (filhos === 1) return false;
        return this.ehEstritamenteBinariaRec(no.esquerda) && this.ehEstritamenteBinariaRec(no.direita);
    }

    /**
     * Verifica se a árvore é cheia (todos os níveis, exceto o último, estão completos).
     *
     * @returns true se for cheia, false caso contrário
     * @example
     * arvore.ehCheia(); // true
     */
    ehCheia(): boolean {
        const altura = this.obterAltura();
        const totalEsperado = Math.pow(2, altura + 1) - 1;
        return this.obterQuantidadeElementos() === totalEsperado;
    }
}

/**
 * Função de demonstração que mostra como usar a Árvore Binária de Busca.
 * 
 * Esta função executa uma série de operações para demonstrar o funcionamento
 * da árvore binária de busca, incluindo inserções, pesquisas, diferentes tipos
 * de percurso, cálculo de altura, busca de valores extremos e uso com strings.
 * 
 * @example
 * ```typescript
 * // Execute a demonstração
 * exemploUsoArvore();
 * ```
 */
function exemploUsoArvore(): void {
    const arvore = new ArvoreBinariaBusca<number>();

    console.log("=== Testando Árvore Binária de Busca ===\n");

    // Testando inserções
    console.log("1. Inserindo elementos na árvore:");
    const valores = [50, 30, 70, 20, 40, 60, 80, 10, 25, 35, 45];
    valores.forEach(valor => {
        arvore.inserir(valor);
        console.log(`Inserido: ${valor}`);
    });
    
    console.log(`\nQuantidade de elementos: ${arvore.obterQuantidadeElementos()}`);
    console.log(`Altura da árvore: ${arvore.obterAltura()}`);
    console.log();

    // Exibindo a estrutura da árvore
    arvore.imprimirArvore();
    console.log();

    // Testando pesquisas
    console.log("2. Testando pesquisas:");
    [25, 45, 100, 15].forEach(valor => {
        const encontrado = arvore.pesquisar(valor);
        console.log(`Pesquisar ${valor}: ${encontrado ? 'Encontrado' : 'Não encontrado'}`);
    });
    console.log();

    // Testando diferentes tipos de traversal
    console.log("3. Diferentes tipos de percurso:");
    console.log("Busca em largura:", arvore.buscaEmLargura());
    console.log("Pré-ordem:", arvore.preOrdem());
    console.log("Em-ordem (crescente):", arvore.emOrdem());
    console.log("Pós-ordem:", arvore.posOrdem());
    console.log();

    // Testando valores extremos
    console.log("4. Valores extremos:");
    console.log("Menor valor:", arvore.obterMenorValor());
    console.log("Maior valor:", arvore.obterMaiorValor());
    console.log();

    // Testando com strings
    console.log("5. Testando com strings:");
    const arvoreStrings = new ArvoreBinariaBusca<string>();
    const palavras = ["casa", "arvore", "zebra", "banana", "elefante", "agua"];
    
    palavras.forEach(palavra => arvoreStrings.inserir(palavra));
    
    console.log("Palavras em ordem alfabética:", arvoreStrings.emOrdem());
    console.log("Busca em largura:", arvoreStrings.buscaEmLargura());
    console.log(`Pesquisar 'banana': ${arvoreStrings.pesquisar('banana')}`);
    console.log(`Pesquisar 'python': ${arvoreStrings.pesquisar('python')}`);
}

// Descomente a linha abaixo para executar o exemplo
// exemploUsoArvore();

export { ArvoreBinariaBusca, NoArvore, exemploUsoArvore };
