export default class Controlador{
    constructor(modelo,vista){
        this.modelo=modelo;
        this.vista=vista;
    }

    crearGrafoEjemplo(idGrafo){
        console.log("Creando grafo de ejemplo")
    }

    dibujarTodo(){
        let nodos = this.modelo.getGrafo().getNodos();
        let aristas = this.modelo.getGrafo().getAristas();
        this.vista.dibujarTodo(nodos,aristas);
    }

    colorearGrafo(){
        let coloreado = this.modelo.colorearGrafo();
        this.vista.pintarColoreado(coloreado);
    }

    setNodoMover(e){
        let nodos = this.modelo.getGrafo().getNodos();
        this.vista.setNodoMover(e,nodos);
    }

    quitarNodoMover(e){
        this.vista.quitarNodoMover();
    }

    moverNodo(e){
        let grafo = this.modelo.getGrafo()
        this.vista.moverNodo(e,grafo);
    }

    dibujar(e){
        let grafo = this.modelo.getGrafo()
        this.vista.dibujar(e,grafo);
    }
}