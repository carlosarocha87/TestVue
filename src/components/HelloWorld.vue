<template>

  <v-card
    title="Listado de Usuarios"
    flat
  >
  <modal :titleModal="titulo"  ref="modalRef" :abrir="true" :itemModal="itemActual" :btncrear="btncrear" @form-submitted="accionModal"></modal>





    <!--<template v-slot:text>
      <v-text-field
        v-model="search"
        label="Search"
        prepend-inner-icon="mdi-magnify"
        variant="outlined"
        hide-details
        single-line
      ></v-text-field>
    </template>-->


    <v-card-title class="d-flex align-center pe-2">
      <div class="pa-4 text-center">
      <v-btn
              class="text-none font-weight-regular"
              prepend-icon="mdi-account"
              color="info"
              text="Crea Usuario"
              variant="tonal"
              @click="modal('',true)"
            ></v-btn>
    </div>

      <v-spacer></v-spacer>

      <v-text-field
        v-model="search"
        density="compact"
        label="Search"
        prepend-inner-icon="mdi-magnify"
        variant="solo-filled"
        flat
        hide-details
        single-line
      ></v-text-field>
    </v-card-title>

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
        },
        dataSubmitted:'',
        btncrear:true
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
      console.log(item.id);

      this.$swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Eliminar!"
        }).then((result) => {
          if (result.isConfirmed) {


             this.axios.delete(this.api+"/"+item.id)
            .then((response) => {
              this.getList();
              /*this.$swal.fire({
              position: "top-end",
              title: "Eliminado!",
              text: "El registro ha sido eliminado con exito",
              icon: "success",
              showConfirmButton: false,
              timer: 1500
            });*/

                const Toast = this.$swal.mixin({
                  toast: true,
                  position: "top-end",
                  showConfirmButton: false,
                  timer: 3000,
                  timerProgressBar: true,
                  didOpen: (toast) => {
                    toast.onmouseenter = this.$swal.stopTimer;
                    toast.onmouseleave = this.$swal.resumeTimer;
                  }
                });
                Toast.fire({
                  icon: "success",
                  title: "Eliminado con exito"
                });

            }).catch((error) => {
              console.log(error);
              this.$swal.fire({
              position: "top-end",
              icon: "error",
              title: "Error al eliminar",
              showConfirmButton: false,
              timer: 1500
              });

            });




          }
        });




      },

     async update(item){
      this.dialogo=false;
        await this.axios.put(this.api+"/"+item.id,item)
        .then((response) => {
          this.getList();
          this.$refs.modalRef.cerrarModal();

          const Toast = this.$swal.mixin({
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.onmouseenter = this.$swal.stopTimer;
                toast.onmouseleave = this.$swal.resumeTimer;
              }
            });
            Toast.fire({
              icon: "success",
              title: "Modificado con éxito"
            });

        }).catch((error) => {
          this.$refs.modalRef.cerrarModal();
          this.$swal.fire({
          position: "top-end",
          icon: "error",
          title: "Error al modificar",
          showConfirmButton: false,
          timer: 1500
          });

        });



      },
      async create(item){
        console.log(item);
        this.dialogo=false;
        await this.axios.post(this.api,item)
        .then((response) => {
          this.getList();
          this.$refs.modalRef.cerrarModal();
          const Toast = this.$swal.mixin({
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.onmouseenter = this.$swal.stopTimer;
                toast.onmouseleave = this.$swal.resumeTimer;
              }
            });
            Toast.fire({
              icon: "success",
              title: "guardado con éxito"
            });



        }).catch((error) => {
          this.$refs.modalRef.cerrarModal();
          this.$swal.fire({
          position: "top-end",
          icon: "error",
          title: "Error al guardar ",
          showConfirmButton: false,
          timer: 1500
          });

        });


      },
      accionModal(data){
        if(data.tipo==1){
          //si el tipo es igual a uno es para guardar
          this.create(data.data);
        }else if(data.tipo==2){
          //si el tipo es igual a uno es para guardar
          this.update(data.data);
        }
       // console.log("datos de modal",data);
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
            this.titulo="Agregar Registro";
            this.btncrear=true;
        }else{

          this.titulo="Modificar Registro";
          this.itemActual={...item};
          this.btncrear=false;

        }
      },


    }
  }
</script>
