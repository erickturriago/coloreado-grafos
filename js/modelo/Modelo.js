import Grafo from "../../clases/Grafo";

export default class Modelo{
    constructor(vista){
        this.vista=vista;
        this.grafo= new Grafo();
    }

    getGrafo(){
        return this.grafo;
    }

    calcularColoreado(){
        return "Coloreado";
    }
}