// Classe para representar um nó da lista duplamente encadeada
class No<T> {
    public valor: T;
    public proximo: No<T> | null;
    public anterior: No<T> | null;

    constructor(valor: T) {
        this.valor = valor;
        this.proximo = null;
        this.anterior = null;
    }
}

// Classe para a Lista Duplamente Encadeada
class ListaDuplamenteEncadeada<T> {
    private cabeca: No<T> | null;
    private cauda: No<T> | null;
    private tamanho: number;

    constructor() {
        this.cabeca = null;
        this.cauda = null;
        this.tamanho = 0;
    }

    // Inserção no início da lista
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

    // Inserção no fim da lista
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

    // Inserção em uma posição específica
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

    // Remoção no início da lista
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

    // Remoção no fim da lista
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

    // Remoção de uma posição específica
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

    // Exibição da lista na ordem normal
    exibirNormal(): T[] {
        const resultado: T[] = [];
        let atual = this.cabeca;
        
        while (atual !== null) {
            resultado.push(atual.valor);
            atual = atual.proximo;
        }
        
        return resultado;
    }

    // Exibição da lista na ordem inversa
    exibirInverso(): T[] {
        const resultado: T[] = [];
        let atual = this.cauda;
        
        while (atual !== null) {
            resultado.push(atual.valor);
            atual = atual.anterior;
        }
        
        return resultado;
    }

    // Verificar se a lista está vazia
    estaVazia(): boolean {
        return this.tamanho === 0;
    }

    // Esvaziar a lista
    esvaziar(): void {
        this.cabeca = null;
        this.cauda = null;
        this.tamanho = 0;
    }

    // Exibir o tamanho da lista
    obterTamanho(): number {
        return this.tamanho;
    }

    // Método auxiliar para imprimir a lista (para facilitar testes)
    imprimir(): void {
        if (this.estaVazia()) {
            console.log("Lista vazia");
            return;
        }

        const elementos = this.exibirNormal();
        console.log("Lista:", elementos.join(" <-> "));
    }

    // Método para buscar um valor na lista
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

    // Método para obter valor em uma posição específica
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

// Função para demonstrar o uso da lista
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