import Paint from "./Paint";

export default class Vista{
    constructor(){
        this.toolActive = undefined
        this.paint = new Paint();
    }

    setToolActive(tool) {
        this.toolActive = tool;
    }

    pintarColoreado(coloreado){
        console.log("Coloreando")
    }

    setNodoMover(e,nodos){
        if(this.toolActive!='move') return;
        this.paint.startMove(e,nodos);
    }

    quitarNodoMover(e){
        this.paint.endMove();
    }

    moverNodo(e,grafo){
        if(this.toolActive!='move') return;
        this.paint.moverNodo(e,grafo);
        this.paint.changeCursor(e,grafo);
        this.paint.drawAll(grafo.getNodos(),grafo.getAristas())
    }

    dibujar(e,grafo){
        if(this.toolActive=='node'){
            this.paint.drawNode(e,grafo);
        }
        else if(this.toolActive=='edge'){
            this.paint.drawEdge(e,grafo);
        }
        else if(this.toolActive=='eraser'){
            this.paint.erase(e,grafo);
        }
        this.paint.drawAll(grafo.getNodos(),grafo.getAristas())
    }

    dibujarTodo(nodos,aristas){
        this.paint.dibujarTodo(nodos,aristas);
    }

    resetApp(){
        console.log("Reseteando app")
    }

}