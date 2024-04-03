<template>
  <v-card
    title="Nutrition"
    flat
  >

  <v-btn
          class="text-none font-weight-regular"
          prepend-icon="mdi-account"
          color="info"
          text="Crea Usuario"
          variant="tonal"
          @click="modal('',true)"
        ></v-btn>

  <modal :titleModal="titulo"  ref="modalRef" :abrir="true" :itemModal="itemActual"></modal>



    <template v-slot:text>
      <v-text-field
        v-model="search"
        label="Search"
        prepend-inner-icon="mdi-magnify"
        variant="outlined"
        hide-details
        single-line
      ></v-text-field>
    </template>



    <v-data-table
      :headers="headers"
      :items="desserts"
      :search="search"
    >


    <template v-slot:item.acciones="{item}">
        <v-row align="center" justify="center">
          <v-col cols="auto">
            <v-btn destiny="compact" color="info" size="small" icon="mdi-pencil" @click="modal(item,false)"></v-btn>
          </v-col>
          <v-col cols="auto">
            <v-btn destiny="compact" color="error" size="small" icon="mdi-delete" @click="eliminar(item)"></v-btn>
          </v-col>
        </v-row>
    </template>



  </v-data-table>
  </v-card>
</template>
<script>
import Modal from './Modal.vue';
  export default {
    data () {
      return {
        search: '',
        headers: [
          {
            align: 'start',
            key: 'email',
            sortable: false,
            title: 'Email',
          },
          { key: 'name', title: 'Nombre' },
          { key: 'lastname', title: 'Apellido' },
          { key: 'cedula', title: 'Cédula' },

          { key: 'acciones', title: 'Acciones' },
        ],
        desserts: [],
        api:'https://65f35054105614e654a05a32.mockapi.io/ineaTest/api/v1/test',
        createItem: true,
        titulo:'',
        dialogo:false,
        itemActual:{
          name:'',
          lastname:'',
          email:'',
          cedula:''
        }
      }


    },
    mounted(){
      this.getList();
    },
    methods:{
      async getList(){
        await this.axios.get(this.api)
        .then((response) => {
          this.desserts = response.data;

        }).catch((error) => {


        });
      },
      eliminar(item){

      },
      modificar(item){
        this.titulo="Modificar Registro";
        this.itemActual={...item};
        console.log('modificar',  this.itemActual);

      },
      crear(item){
        this.titulo="Agregar Registro";
        console.log('crear',item);

      },
      modal(item, accion){
        this.dialogo=true;
        console.log('modal', item, this.dialogo);
        this.$refs.modalRef.abrirModal();
        if(accion){
          this.itemActual={
              name:'',
              lastname:'',
              email:'',
              cedula:''
            };
          this.crear(item);
        }else{

          this.modificar(item);

        }
      },


    }
  }
</script>
