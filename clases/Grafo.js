
export default class Grafo {
    constructor() {
        this.nodos = [];
        this.aristas = [];
    }

    getAristas(){
        return this.aristas;
    }
    getNodos(){
        return this.nodos;
    }

    agregarNodo(nodo) {
        this.nodos.push(nodo);
    }
    agregarArista(nodo) {
        this.aristas.push(nodo);
    }

    ordenarNodosPorGrado() {
        this.nodos = this.nodos.sort((a, b) => b.aristas.length - a.aristas.length);
    }
}