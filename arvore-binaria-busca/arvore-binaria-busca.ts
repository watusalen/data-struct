// Classe para representar um nó da árvore binária de busca
class NoArvore<T> {
    public valor: T;
    public esquerda: NoArvore<T> | null;
    public direita: NoArvore<T> | null;

    constructor(valor: T) {
        this.valor = valor;
        this.esquerda = null;
        this.direita = null;
    }
}

// Classe para a Árvore Binária de Busca
class ArvoreBinariaBusca<T> {
    private raiz: NoArvore<T> | null;
    private quantidade: number;

    constructor() {
        this.raiz = null;
        this.quantidade = 0;
    }

    // Inserção de elementos na árvore
    inserir(valor: T): void {
        this.raiz = this.inserirRecursivo(this.raiz, valor);
        this.quantidade++;
    }

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

    // Pesquisar se um determinado elemento está ou não na árvore
    pesquisar(valor: T): boolean {
        return this.pesquisarRecursivo(this.raiz, valor);
    }

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

    // Exibir os elementos da árvore utilizando busca em largura (BFS)
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

    // Exibir os elementos da árvore: pré-ordem (raiz -> esquerda -> direita)
    preOrdem(): T[] {
        const resultado: T[] = [];
        this.preOrdemRecursivo(this.raiz, resultado);
        return resultado;
    }

    private preOrdemRecursivo(no: NoArvore<T> | null, resultado: T[]): void {
        if (no !== null) {
            resultado.push(no.valor);           // Visita a raiz
            this.preOrdemRecursivo(no.esquerda, resultado);  // Visita subárvore esquerda
            this.preOrdemRecursivo(no.direita, resultado);   // Visita subárvore direita
        }
    }

    // Exibir os elementos da árvore: em-ordem (esquerda -> raiz -> direita)
    // Em uma BST, isso retorna os elementos em ordem crescente
    emOrdem(): T[] {
        const resultado: T[] = [];
        this.emOrdemRecursivo(this.raiz, resultado);
        return resultado;
    }

    private emOrdemRecursivo(no: NoArvore<T> | null, resultado: T[]): void {
        if (no !== null) {
            this.emOrdemRecursivo(no.esquerda, resultado);   // Visita subárvore esquerda
            resultado.push(no.valor);                        // Visita a raiz
            this.emOrdemRecursivo(no.direita, resultado);    // Visita subárvore direita
        }
    }

    // Exibir os elementos da árvore: pós-ordem (esquerda -> direita -> raiz)
    posOrdem(): T[] {
        const resultado: T[] = [];
        this.posOrdemRecursivo(this.raiz, resultado);
        return resultado;
    }

    private posOrdemRecursivo(no: NoArvore<T> | null, resultado: T[]): void {
        if (no !== null) {
            this.posOrdemRecursivo(no.esquerda, resultado);  // Visita subárvore esquerda
            this.posOrdemRecursivo(no.direita, resultado);   // Visita subárvore direita
            resultado.push(no.valor);                        // Visita a raiz
        }
    }

    // Exibir a altura da árvore
    obterAltura(): number {
        return this.calcularAltura(this.raiz);
    }

    private calcularAltura(no: NoArvore<T> | null): number {
        if (no === null) {
            return -1; // Árvore vazia tem altura -1
        }

        const alturaEsquerda = this.calcularAltura(no.esquerda);
        const alturaDireita = this.calcularAltura(no.direita);

        return Math.max(alturaEsquerda, alturaDireita) + 1;
    }

    // Exibir a quantidade de elementos na árvore
    obterQuantidadeElementos(): number {
        return this.quantidade;
    }

    // Método auxiliar para verificar se a árvore está vazia
    estaVazia(): boolean {
        return this.raiz === null;
    }

    // Método auxiliar para imprimir a árvore de forma visual
    imprimirArvore(): void {
        if (this.estaVazia()) {
            console.log("Árvore vazia");
            return;
        }

        console.log("Estrutura da árvore:");
        this.imprimirArvoreRecursivo(this.raiz, "", true);
    }

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

    // Método para obter o menor valor da árvore
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

    // Método para obter o maior valor da árvore
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

    // Método para limpar a árvore
    limpar(): void {
        this.raiz = null;
        this.quantidade = 0;
    }
}

// Função para demonstrar o uso da árvore
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
