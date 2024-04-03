<template>
  <v-card
    title="Nutrition"
    flat
  >

  <v-row align="center" justify="center">
      <v-col cols="auto">
        <v-btn density="compact"  color="info"  size="x-large" icon="mdi-plus"></v-btn> Agregar usuario
      </v-col>
    </v-row>

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
            <v-btn destiny="compact" color="info" size="small" icon="mdi-pencil" @click="modal(item)"></v-btn>
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
import { assertExpressionStatement } from '@babel/types';

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
        createItem: true
      }
    },
    mounted(){
      this.getList();
    },
    methods:{
      async getList(){ console.log('dccdd');
        await this.axios.get(this.api)
        .then((response) => {
          this.desserts = response.data;

        }).catch((error) => {


        });
      },
      eliminar(item){

      },
      modificar(item){

      },
      crear(){

      },
      modal(item){
        if(this.createItem){
          this.crear(item);
        }else{
          this.modificar(item);

        }
      }

    }
  }
</script>
