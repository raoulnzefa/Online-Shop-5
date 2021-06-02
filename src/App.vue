<template>
  <ion-app>
    <Base/>
  </ion-app>
</template>

<script>
import Base from './views/Base'
import { IonApp } from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
  components: {
    Base,
    IonApp,
    // IonRouterOutlet
  }
});
</script>