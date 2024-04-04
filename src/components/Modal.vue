<template>
  <div class="pa-4 text-center">
    <v-dialog
      v-model="dialog"
      max-width="600"
    >





      <v-card
        prepend-icon="mdi-account"
        :title="titleModal"
      >
        <v-card-text>
          <v-form ref="form">
              <v-row dense>
                <v-col
                  cols="12"
                  md="4"
                  sm="6"
                >



                  <v-text-field
                    label="Nombre"
                    required
                    hint="Nombre"
                    v-model="itemModal.name"
                    :rules="nameRules"
                  ></v-text-field>
                </v-col>

                <v-col
                  cols="12"
                  md="4"
                  sm="6"
                >
                  <v-text-field
                    hint="Apellido"
                    label="Apellido"
                    v-model="itemModal.lastname"
                    :rules="lastnameRules"
                  ></v-text-field>
                </v-col>

                <v-col
                  cols="12"
                  md="4"
                  sm="6"
                >
                  <v-text-field
                    hint="Cédula"
                    label="Cédula"
                    v-model="itemModal.cedula"
                    :rules="cedulaRules"
                    required
                  ></v-text-field>
                </v-col>

                <v-col
                  cols="12"
                  md="12"
                  sm="12"
                >
                  <v-text-field
                    label="Email*"
                    required
                    hint="Correo electrónico"
                    v-model="itemModal.email"
                    :rules="emailRules"
                  ></v-text-field>
                </v-col>



              </v-row>




          </v-form>
            <small class="text-caption text-medium-emphasis">*indicates required field</small>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            text="Close"
            variant="plain"
            @click="dialog = false"
          ></v-btn>

          <v-btn
            color="primary"
            text="Guardar"
            variant="tonal"
            @click="Guardar(1);"
            v-if="btncrear"
          ></v-btn>
          <v-btn
            color="primary"
            text="Modificar"
            variant="tonal"
            @click="Guardar(2)"
            v-else
          ></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
  export default {

    props:{
      itemModal:{
        name:'',
        lastname:'',
        email:'',
        cedula:''
      },
      titleModal:{
        type: String,
        required:true
      },
      abrir:{
        type:Boolean,
        required:true
      },
      btncrear:{
        type:Boolean,
        required:true
      }


    },
    data(){

      return{
        name: '',
        nameRules: [
          v => !!v || 'Nombre es requerido',
          v => (v && v.length <= 40) || 'Name must be less than 10 characters',
        ],
        lastnameRules: [
          v => !!v || 'Apellido es requerido',
          v => (v && v.length <= 40) || 'Name must be less than 10 characters',
        ],
        cedulaRules: [
          v => !!v || 'Cédula es requerido',
          v => !!/[0-9-]+/.test(v) || 'Cédula debe ser numérico',
          v => (v && v.length <= 8) || 'Cédula no puede superar los 8 caracteres',
        ],
        emailRules: [
          v => !!v || 'Email es requerido',
          v => !!/^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(v) || 'Debe agregar un email válido',
        ],

        dialog:false,
        formtipe:1,


      }
    },
    methods:{
      abrirModal(){
        this.dialog=true;
      },
      cerrarModal(){
        this.dialog=false;
      },
      async Guardar(tipo){
       /* await this.axios.post(this.api,this. itemModal)
        .then((response) => {


        }).catch((error) => {


        });*/

        const { valid } = await this.$refs.form.validate()

          if (valid){
           // alert('Form is valid')

            this.$emit('form-submitted', {data:this.itemModal,tipo: tipo});
          }


      }

    }
  }
</script>
