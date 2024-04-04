<template>
  <v-card >
    <v-layout style="height: 100vh">

      <v-navigation-drawer
        v-model="drawer"
        :rail="rail"
        permanent
        @click="rail = false"

      >
        <v-list-item
          prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg"
          title="John Leider"
          nav
        >
          <template v-slot:append>
            <v-btn
              icon="mdi-chevron-left"
              variant="text"
              @click.stop="rail = !rail"
            ></v-btn>
          </template>
        </v-list-item>

        <v-divider></v-divider>

        <v-list density="compact" nav>
          <v-list-item to="/home" prepend-icon="mdi-home-city" title="Home" value="home"></v-list-item>
          <v-list-item prepend-icon="mdi-account" title="My Account" value="account"></v-list-item>
          <v-list-item to="/"  prepend-icon="mdi-account-group-outline" title="Users" value="users"></v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-app-bar :elevation="1" style="height: 55px">
        <template v-slot:prepend>
          <v-app-bar-nav-icon @click.stop="rail = !rail"></v-app-bar-nav-icon>
        </template>

        <v-app-bar-title>Application Bar</v-app-bar-title>

        <template v-slot:append>
          <v-btn icon="mdi-heart"></v-btn>

          <v-btn icon="mdi-magnify"></v-btn>

          <v-btn icon="mdi-dots-vertical"></v-btn>
        </template>
      </v-app-bar>


      <v-main style="height: 100vh" class="p-5" >
        <component :is="currentComponent"></component>
      </v-main>
    </v-layout>
  </v-card>
</template>
<script>
import HelloWorld from './HelloWorld.vue'; // Importa el componente HelloWorld

  export default {
    components: {
      HelloWorld,

    },
    props: {

      componente: {
        type: String,
        required: true,
        default:'HelloWorld'
      }
    },
    data () {
      return {
        currentComponent: this.componente, // Componente inicial que se mostrará
        drawer: true,
        rail: true,
      }
    },
    methods: {
      changeComponent(componentName) {
        this.currentComponent = componentName;
      }
    }
  }
</script>
