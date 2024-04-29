import Controlador from './controlador/Controlador';
import Modelo from './modelo/Modelo';
import Vista from './vista/Vista';

//Inicializar clases
let vista = new Vista();
let modelo = new Modelo(vista);
let controlador = new Controlador(modelo,vista);

//Obtener nodos del HTML
const btnRun = document.querySelector('.btnRun')
const btnClear = document.querySelector('.clear')
const canvas = document.querySelector("canvas");
const tools = document.querySelectorAll('.tool');


//Iniciar ejecución del aplicativo
btnRun.addEventListener('click',(e)=>{
    if(modelo.getGrafo().getAristas().length<2){
        alert("Debe seleccionar o crear un grafo")
        return;
    }
    
    controlador.colorearGrafo();
})

btnClear.addEventListener('click',(e)=>{
    vista.resetApp(modelo.getGrafo());
})

tools.forEach((tool)=>{
    tool.addEventListener('click',(e)=>{
        let name = e.target.getAttribute('name');
        if(!name){
            name = e.target.parentElement.getAttribute('name')
        }

        if(!['clear'].includes(name)){
            tools.forEach((tool)=>{tool.classList.remove('active')})
            document.querySelector(`.${name}`).classList.add('active')
        }
        else{
            tools.forEach((tool)=>{tool.classList.remove('active')})
        }
        vista.setToolActive(name);
    })
})



document.querySelectorAll('.example').forEach((example)=>{
    example.addEventListener('click',(e)=>{
        let idEjemplo= parseInt(e.target.getAttribute('id'))
        controlador.crearGrafoEjemplo(idEjemplo)
    })
})

//Listener de eventos en el canvas
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    // requestAnimationFrame(drawAll)
}

//Listener mover nodos
canvas.addEventListener('mouseup',(e)=>{controlador.quitarNodoMover(e)});
canvas.addEventListener('mousedown',(e)=>{controlador.setNodoMover(e)});
canvas.addEventListener('mousemove',(e)=>{controlador.moverNodo(e)});

//Listener cambiar cursor según herramienta
// canvas.addEventListener('mousemove',changeCursor);

//Dibujar según la herramienta seleccionada
canvas.addEventListener('click',(e)=>{controlador.dibujar(e)});

window.onload = resizeCanvas;
window.onresize = resizeCanvas;