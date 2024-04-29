
export default class Arista{
    constructor(id, nodoA, nodoB, color, peso){
        this.id=id; //Identificador de la arista
        this.nodoA=nodoA; //Nodo origen
        this.nodoB=nodoB; //Nodo destino
        this.color= color; //Color de la arista
        this.peso = peso; // Peso de la arista
    }
    // Getter y setter para id
    getId() {
        return this.id;
    }
    setId(id) {
        this.id = id;
    }
    // Getter y setter para nodoA
    getNodoA() {
        return this.nodoA;
    }
    setNodoA(nodoA) {
        this.nodoA = nodoA;
    }
    // Getter y setter para nodoB
    getNodoB() {
        return this.nodoB;
    }
    setNodoB(nodoB) {
        this.nodoB = nodoB;
    }
    getPeso() {
        return this.peso;
    }
}