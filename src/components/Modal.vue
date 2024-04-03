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

                required
              ></v-text-field>
            </v-col>

            <v-col
              cols="12"
              md="4"
              sm="6"
            >
              <v-text-field
                label="Email*"
                required
                hint="Correo electrónico"
                v-model="itemModal.email"

              ></v-text-field>
            </v-col>

          </v-row>

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
            text="Save"
            variant="tonal"
            @click="dialog = false"
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
      }

    },
    data(){
      return{
        dialog:false
      }
    },
    methods:{
      abrirModal(){
        this.dialog=true;
      }
    }
  }
</script>
