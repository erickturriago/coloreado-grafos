import Nodo from "../../clases/Nodo"
import Arista from "../../clases/Arista"

export default class Paint{
    constructor(){
        this.canvas = document.querySelector("canvas");
        this.ctx = this.canvas.getContext('2d');
        this.anchoPincel = 5;
        this.radioNodo=35;
        this.nodoMover=null;
        this.idNodo=1;
        this.idArista=undefined;
        this.arista=[]
    }

    drawAll(nodos,arista){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        arista.forEach((arista)=>{
            this.ctx.beginPath(); // Iniciar un nuevo camino de dibujo
            this.ctx.moveTo(arista.nodoA.getX(), arista.nodoA.getY()); // Mover el lápiz al punto A
            this.ctx.lineTo(arista.nodoB.getX(), arista.nodoB.getY()); // Dibujar una línea hasta el punto B
            this.ctx.stroke();
        })
    
        nodos.forEach((nodo)=>{
            this.ctx.beginPath();
            this.ctx.setLineDash([])
            this.ctx.lineWidth=this.anchoPincel
            this.ctx.strokeStyle = nodo.color;
            this.ctx.fillStyle=nodo.color;
            this.ctx.arc(nodo.x, nodo.y, this.radioNodo, 0, 2 * Math.PI);
            this.ctx.stroke()
            this.ctx.fill()
    
            this.ctx.font = '40px Arial'; // Fuente y tamaño
            this.ctx.fillStyle = 'white'; // Color del texto
            if(nodo.getId()>=10){
                this.ctx.fillText(nodo.getId(), nodo.x-22, nodo.y+15);
            }
            else{
                this.ctx.fillText(nodo.getId(), nodo.x-12, nodo.y+15);
            }
        })
    }
    
    getNodoClick(e,nodos){
        let nodoEncontrado = null
        nodos.forEach((nodo)=>{
            let distancia = Math.sqrt(Math.pow((e.offsetX-nodo.getX()),2)+Math.pow((e.offsetY-nodo.getY()),2))
            if(distancia<=this.radioNodo){
                nodoEncontrado=nodo
            }
        })
        return nodoEncontrado
    }
    
    getEdgeClick = (e,aristas)=>{
        let tolerance = 5; // Tolerancia para considerar que el click está sobre la arista
        let aristaEncontrada = null;
    
        aristas.forEach((arista) => {
            let dxc = e.offsetX - arista.nodoA.getX();
            let dyc = e.offsetY - arista.nodoA.getY();
            let dxl = arista.nodoB.getX() - arista.nodoA.getX();
            let dyl = arista.nodoB.getY() - arista.nodoA.getY();
    
            let cross = dxc * dxl + dyc * dyl;
            let alfa = (cross) / (dxl * dxl + dyl * dyl);
            let distancia;
    
            if (alfa < 0) {
                distancia = Math.sqrt((e.offsetX - arista.nodoA.getX()) ** 2 + (e.offsetY - arista.nodoA.getY()) ** 2);
            } else if (alfa > 1) {
                distancia = Math.sqrt((e.offsetX - arista.nodoB.getX()) ** 2 + (e.offsetY - arista.nodoB.getY()) ** 2);
            } else {
                let xc = arista.nodoA.getX() + alfa * dxl;
                let yc = arista.nodoA.getY() + alfa * dyl;
                distancia = Math.sqrt((e.offsetX - xc) ** 2 + (e.offsetY - yc) ** 2);
            }
    
            let aWidth = 5; // Ancho de la arista
    
            // Comprobamos si el click está dentro de la arista
            if (distancia <= aWidth + tolerance) {
                aristaEncontrada = arista;
            }
        });
    
        return aristaEncontrada;
    }
    
    drawNode = (e,grafo)=>{
        let nodoId = 0
        grafo.nodos.forEach((nodo)=>{
            if(nodoId<nodo.id){
                nodoId=nodo.id;
            }
        })

        let nodoExistente = this.getNodoClick(e,grafo.getNodos())
        if(nodoExistente) return; //Si se da click sobre un nodo o muy cerca
        grafo.agregarNodo(new Nodo(nodoId+1,e.offsetX,e.offsetY,'#000'))
    }
    
    drawEdge = (e,grafo)=>{
        let aristaId = 0
        grafo.aristas.forEach((arista)=>{
            if(aristaId<arista.id){
                aristaId=arista.id;
            }
        })
    
        let nodo = this.getNodoClick(e,grafo.getNodos())
    
        if(nodo){
            if(!this.arista.includes(nodo)){
                this.arista.push(nodo)
            }
        }
    
        let isValidEdge = true
    
        if(this.arista.length==2){
            grafo.aristas.forEach((aristaL)=>{
                if(aristaL.nodoA.getId() == this.arista[0].getId() && aristaL.nodoB.getId()==this.arista[1].getId()){
                    isValidEdge=false
                }
                else if(aristaL.nodoA.getId() == this.arista[1].getId() && aristaL.nodoB.getId()==this.arista[0].getId()){
                    isValidEdge=false
                }
            })
    
            if(isValidEdge){
                this.arista[0].addVecino(this.arista[1])
                this.arista[1].addVecino(this.arista[0])
                const aristaN = new Arista(aristaId+1,this.arista[0],this.arista[1],'#000',null)
                grafo.agregarArista(aristaN)
                this.arista=[]
            }
            else{
                this.arista=[]
            }
        }
    }
    
    erase = (e,grafo)=>{
        let nodoBorrar = this.getNodoClick(e,grafo.getNodos());
        if(nodoBorrar){
            //Borrar nodo como vecino
            nodoBorrar.vecinos.forEach((vecino)=>{
                vecino.vecinos = vecino.vecinos.filter((n)=>n.id!=nodoBorrar.id)
            })
            grafo.nodos = grafo.nodos.filter((nodo)=>nodo.getId()!==nodoBorrar.getId())
            grafo.aristas.forEach((arista)=>{
                if(arista.nodoA.getId()==nodoBorrar.getId()){
                    arista.nodoA=null
                }
                if(arista.nodoB.getId()==nodoBorrar.getId()){
                    arista.nodoB=null
                }
            })
            let listaAristasClon = []
            grafo.aristas.forEach((arista)=>{
                if(arista.nodoA!= null && arista.nodoB!=null){
                    listaAristasClon.push(arista)
                }
            })
            grafo.aristas=listaAristasClon
        }
        else{
            let aristaBorrar = this.getEdgeClick(e,grafo.getAristas())
            if(aristaBorrar){
                grafo.aristas = grafo.aristas.filter((arista)=>arista.getId()!==aristaBorrar.getId())
            }
        }
    }

    
    startMove = (e,nodos)=>{
        this.nodeMove = this.getNodoClick(e,nodos);
    }

    endMove = (e)=>{
        this.nodeMove=null;
    }
    
    moverNodo = (e,grafo)=>{
        if(this.nodeMove!=null){
            this.nodeMove.setX(e.offsetX)
            this.nodeMove.setY(e.offsetY)
        }
    }
    
    changeCursor = (e,grafo)=>{
        const nodoEncontrado = this.getNodoClick(e,grafo.getNodos());
        if (nodoEncontrado) {
            this.canvas.style.cursor = "pointer";
        } else {
            this.canvas.style.cursor = "default";
        }
    }
    
    setCoordenadas = (e)=>{
        let divCoordenadas = document.querySelector('.coordenadas')
        divCoordenadas.innerHTML=''
        divCoordenadas.innerHTML=`
            <span>x: ${e.offsetX}</span>
            <span>y: ${e.offsetY}</span>
        `
    }
    
    
    dibujarTabla = (paquetes)=>{
        let tableHead = document.querySelector('.tablaHead')
        let tableBody = document.querySelector('.tableBody')
    
        tableHead.innerHTML=''
        tableBody.innerHTML=''
    
        let headerTabla = `
            <tr>
                <th>Id</th>
                <th>Ruta tomada</th>
            </t>
        `
    
        tableHead.innerHTML=headerTabla;
    
        paquetes.forEach((paquete)=>{
            tableBody.innerHTML+= `
                <tr>
                    <td>${paquete.id}</td>
                    <td>${paquete.nodosVisitados.map((nodo)=>nodo.id)}</td>
                </tr>
            `
        })
    
    
        const divTabla = document.querySelector('.divTabla')
        divTabla.removeAttribute('hidden');
    }
    
    cerrarTabla = ()=>{
    
        const divTabla = document.querySelector('.divTabla')
        divTabla.setAttribute('hidden',"");
    }
}



