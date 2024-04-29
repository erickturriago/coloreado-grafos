import Grafo from "../../clases/Grafo";
import Nodo from "../../clases/Nodo";
import Arista from "../../clases/Arista";
import redes from "../../data/Redes.json"
import colores from "../../data/Colores.json"
export default class Modelo{
    constructor(vista){
        this.vista=vista;
        this.grafo= new Grafo();
        this.colores = this.getColores();
    }

    getGrafo(){
        return this.grafo;
    }

    cargarGrafo(id){
        this.grafo.nodos=[]
        this.grafo.aristas=[]

        redes[id-1].nodos.forEach((nodo)=>{
            let nodoN = new Nodo(nodo.id,nodo.x,nodo.y,null);
            this.grafo.nodos.push(nodoN);
        })

        redes[id-1].nodos.forEach((nodo)=>{
            let nodoGrafo = this.grafo.nodos.find((n)=>n.id==nodo.id);
            nodo.vecinos.forEach((idVecino)=>{
                let vecino = this.grafo.nodos.find((n)=>n.id==idVecino);
                nodoGrafo.vecinos.push(vecino);
            })
        })


        redes[id-1].aristas.forEach((arista)=>{
            let nodoA = this.grafo.nodos.find((n)=>n.id==arista.nodoA);
            let nodoB = this.grafo.nodos.find((n)=>n.id==arista.nodoB);
            let aristaN = new Arista(arista.id,nodoA,nodoB,null,arista.peso);
            this.grafo.aristas.push(aristaN);
        })

        redes[id-1].nodos.forEach((n)=>{
            n.aristas.forEach((idArista)=>{
                let arista = this.grafo.aristas.find((a)=>a.id==idArista);
                let nodo = this.grafo.nodos.find((nn)=>nn.id==n.id)
                nodo.aristas.push(arista);
            })
        })
    }

    calcularColoreado() {
        let coloresUsados = []
        for (let nodo of this.grafo.nodos) {
            for (let color of this.colores) {
                let vecinosCercanos = nodo.vecinos.filter((veci)=>this.getArista(nodo,veci).getPeso()<150);
                let vecinosCercanosConColor = vecinosCercanos.some(veci => veci.color==color.hex);
                if (!vecinosCercanosConColor) {
                    coloresUsados.push(color)
                    nodo.setColor(color.hex);
                    break;
                }
            }
        }
        const coloresUnicos = [...new Set(coloresUsados.map(color => color.nombre))];
        return coloresUnicos;
    }

    getArista(nodoA, nodoB) {
        let arista = this.grafo.aristas.find(arista => (arista.nodoA.id === nodoA.id && arista.nodoB.id === nodoB.id) || (arista.nodoA.id === nodoB.id && arista.nodoB.id === nodoA.id));
        return arista;
    }
    
    getColores() {
        return colores;
    }

    ordenarNodos(){
        this.grafo.ordenarNodosPorGrado();
    }
}