export default class Controlador{
    constructor(modelo,vista){
        this.modelo=modelo;
        this.vista=vista;
    }

    crearGrafoEjemplo(idGrafo){
        this.modelo.cargarGrafo(idGrafo);
        this.modelo.ordenarNodos();
        this.dibujarTodo();
        console.log("Creando grafo de ejemplo") 
    }

    dibujarTodo(){
        this.vista.dibujarTodo(this.modelo.getGrafo());
    }

    colorearGrafo(){
        let coloreado = this.modelo.calcularColoreado();
        this.dibujarTodo();
        alert(`Colores usados: ${coloreado}`)
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
        this.modelo.ordenarNodos();
    }
}