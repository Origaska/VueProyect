<template>
  <div class="root">
    <header>
        <h1>Empleado</h1>
    </header>
        <section class = "seccion registros">
            <h2 >Registro</h2>
            <form >
                <label for="rfc">RFC</label>
                <input v-model="empleado.RFC" type="text" id="rfc" name="rfc" >
                <label  for="nombre">Nombre</label>
                <input v-model="empleado.nombre" type="text" id="nombre" name="nombre" >
                <label for="apellido">Apellido</label>
                <input v-model="empleado.apellido" type="text" id="apellido" name="apellido" >
                <label for="telefono">Telefono</label>
                <input v-model="empleado.telefono" type="number" id="telefono" name="telefono" >
                <label for="direccion">Dirección</label>
                <input v-model="empleado.direccion" type="text" id="direccion" name="direccion">
                <label for="nss">NSS</label>
                <input v-model="empleado.NSS" type="number" id="nss" name="nss" >
                <label for="puesto">Puesto</label>
                <input v-model="empleado.puesto" type="text" id="puesto" name="puesto">
                <div class="botones">
                    <button @click.prevent="guardarDatos()" class=" btn btn-enviar">Enviar</button>
                </div>
            </form>
        </section>
        <section class = "seccion lista">
            <h2>Lista</h2>
            <ul>
                <li v-for="e of Empleados" :key="e"><p>{{e.nombre}} {{e.apellido}}, {{e.puesto}}</p> 
                   <div>
                       <button @click.prevent="eliminarDatos(e.idDoc)" class=" btn-s btn-eliminar">Eliminar</button>
                       <button @click.prevent="editarDatos(e)" class=" btn-s btn-editar">Editar</button>
                   </div>
                </li>
            </ul>
        </section>
    </div>
</template>

<script>
import {db} from "./utils/firebase";
import { collection, getDocs, addDoc,deleteDoc,doc, updateDoc} from "firebase/firestore";

export default {
  name: 'App',
  data() {
    return {
      editable: false,
      Empleados: [],
      empleado:{
        idDoc:"",
        RFC : "",
        nombre : "",
        apellido : "",
        telefono: "",
        direccion: "",
        NSS: "",
        puesto: "",
      }
    };
  },
  methods:{
  // GET / OBTENER / Consulta instantánea 
    async obtenerDatos () { 
      this.Empleados = [];
      const querySnapshot = await getDocs(collection(db, "empleados"));
        querySnapshot.forEach((doc) => {
        let empleado = doc.data()
        empleado.idDoc = doc.id
        this.Empleados.push(empleado)
      });
    },
    async guardarDatos(){
      if (this.editable){
        //si se esta editando
        this.editable = false;
        if (this.empleado.RFC != "" && 
          this.empleado.nombre != "" && 
          this.empleado.apellido != "" && 
          this.empleado.telefono != "" && 
          this.empleado.direccion != "" && 
          this.empleado.NSS != "" && 
          this.empleado.puesto != ""){
            var obj = {
              RFC: this.empleado.RFC,
              nombre: this.empleado.nombre,
              apellido: this.empleado.apellido,
              telefono: this.empleado.telefono,
              direccion: this.empleado.direccion,
              NSS: this.empleado.NSS,
              puesto: this.empleado.puesto
            }
            const empleadoref = doc(db ,"empleados",this.empleado.idDoc);
            await updateDoc(empleadoref,obj);
            this.empleado.RFC="";
            this.empleado.nombre="";
            this.empleado.apellido="";
            this.empleado.telefono="";
            this.empleado.direccion="";
            this.empleado.NSS="";
            this.empleado.puesto="";
          }else{
            alert("Datos incompletos");
          }
          this.obtenerDatos();
      }else{
        //nuevo 
        if (this.empleado.RFC != "" && 
          this.empleado.nombre != "" && 
          this.empleado.apellido != "" && 
          this.empleado.telefono != "" && 
          this.empleado.direccion != "" && 
          this.empleado.NSS != "" && 
          this.empleado.puesto != ""){
            await addDoc(collection(db, "empleados"), {
              RFC: this.empleado.RFC,
              nombre: this.empleado.nombre,
              apellido: this.empleado.apellido,
              telefono: this.empleado.telefono,
              direccion: this.empleado.direccion,
              NSS: this.empleado.NSS,
              puesto: this.empleado.puesto
            })
            .then(() => {
              alert("Documento añadido");
            })
            .catch(function(error) {
              alert("Error al añadir el documento: ",error);
            });
          }else{
            alert("Datos incompletos");
          }
        this.obtenerDatos();
      }
    },
    async editarDatos(e){
      this.empleado.idDoc = e.idDoc;
      this.empleado.RFC = e.RFC;
      this.empleado.nombre = e.nombre;
      this.empleado.apellido = e.apellido;
      this.empleado.telefono = e.telefono;
      this.empleado.direccion = e.direccion;
      this.empleado.NSS = e.NSS;
      this.empleado.puesto = e.puesto;
      this.editable = true;
      this.obtenerDatos()
    },
    async eliminarDatos(id){
      await deleteDoc(doc(db, "empleados", id ));
      this.obtenerDatos()
    }
  },
    mounted() {
      this.$nextTick(function () {
    // Código que se ejecutará solo después de
    // haber renderizado la vista completa
      this.obtenerDatos();
    });
    }
}
</script>

<style>

:root{
    --separacion:1rem;
    --separacion-lista:2.3rem;
    --separacion-top:5rem;
    --separacion-minima:0.3rem;
    --color-primary:#323232;
    --color-titulo-principal:#D8D8D8;
    --color-item-lista:#EFEFEF;
    --color-item-lista-seleccionado:#f0f0f0;
    --color-btn-primary:#0D6EFD;
    --color-btn-primary-hover:#0D6E9D;
    --color-btn-delete:#fd3d0d;
    --color-btn-delete-hover:#fa1c18;
    --color-btn-update:#00da1d;
    --color-btn-update-hover:#06CD85;
}
#app {
  font-family: sans-serif;
}

*{
    padding: 0;
    margin: 0;
    font-family: Roboto,sans-serif;
}

header{
    display: block;
    background-color: var(--color-primary);
    color: var(--color-titulo-principal);
    padding-top: var(--separacion-minima);
    padding-left: var(--separacion);
    height: 3rem;
    /*posicion fija*/
    width: 100%;
    left: 0;
    top: 0;
    position: fixed;
    /*sombra*/
    box-shadow: 5px 5px 10px 10px rgba(75, 75, 75, 0.25);
}
.root{
    display:grid;
    grid-template-columns:50% 50% ;
}
.seccion{
    justify-content: left;
    margin: var(--separacion);
    padding-right: 2rem;
    padding-left: var(--separacion);
    margin-top: var(--separacion-top);
}
.seccion h2{
    width: 100%;
    font-size: 2rem;
    margin-bottom: var(--separacion);
}


/* seccion de registros */

.registros{
    width: 88%;
    height: 40rem;
}

.registros form{
    border: 1px solid var(--color-primary);
    font-size: 1.2rem;
    width: 100%;
    height: 100%;
    padding:var(--separacion);
    box-shadow: 0px 0px 15px 5px rgba(0,0,0,0.75);
}
.registros form input{
    font-size: 1rem;
    width: 90%;    
    border: 1px solid var(--color-titulo-principal);
    border-radius: 20px;
    margin-top: var(--separacion-minima);
    margin-bottom:var(--separacion);
    padding: 5px;
    padding-left: var(--separacion);
}
.botones{
    display:flex;
    justify-content:right;
    padding: var(--separacion);
}


/*Botones*/
.btn{
    font-size:1.2rem;
    padding:0.5rem;
    border-radius: 1rem;
    color: white;
}
.btn-s{
    font-size:0.8rem;
    padding: 0.3rem;
    border-radius: 0.6rem;
    color: white;
}
.btn-enviar{
    background-color: var(--color-btn-primary);
    border:1px solid var(--color-btn-primary);
}
.btn-eliminar{
    background-color: var(--color-btn-delete);
    border:1px solid var(--color-btn-delete);
}
.btn-editar{
    background-color: var(--color-btn-update);
    border:1px solid var(--color-btn-update);
}
.btn-enviar:hover{
    background-color: var(--color-btn-primary-hover);
    border:1px solid var(--color-btn-primary-hover);
}
.btn-eliminar:hover{
    background-color: var(--color-btn-delete-hover);
    border:1px solid var(--color-btn-delete-hover);
}
.btn-editar:hover{
    background-color: var(--color-btn-update-hover);
    border:1px solid var(--color-btn-update-hover);
}



/* seccion de lista */
.lista{
    display: flex;
    justify-content:center;
    flex-wrap: wrap;
}
ul{
    width: 100%;
}
li{
    display: flex;
    border:1px solid var(--color-titulo-principal);
    list-style-type: none;
    padding:var(--separacion);
    justify-content:space-between;
    color: var(--color-primary);
    font-size: 0.8rem;
    align-items: center;
    font-weight: bold;
    margin-bottom: var(--separacion-lista);
    box-shadow: 0px 0px 20px 5px rgba(0,0,0,0.75);
    transition-delay: 200ms;
}
li:hover{
    background-color: var(--color-item-lista-seleccionado);
}



/*Responsive Design*/
@media (max-width:768px) {
    .root{
        display: flex;
        flex-wrap: wrap;
    }
    .seccion{
        width: 100%;
    }
    .seccion form input{
        width:96%;
    }
}
</style>
