<template>
  <v-app class="myFont">
    <Toolbar />

    <v-dialog
      persistent
      v-model="vis"
      style="background-color:red"
      :overlay-opacity="0.8"
      width="500"
      transition="dialog-bottom-transition"
    >
      <v-img
        class="white--text align-end pa-5"
        style="margin:auto auto;font-size:16px"
        width="500px"
        src="/images/5066.jpg"
      >
        <div style="height:400px">
          <v-row class="mx-4">
            <p
              class="text-center"
              style="width:100%;font-size:20px;font-weight:900"
              v-if="not"
            >
              Welcome to Ashewa SC.
            </p>
            <a
              class="text-center white--text"
              style="text-decoration:none;width:100%"
              v-if="not"
              href="/ashewa.pdf"
              >Read more</a
            >
            <div v-else class="pa-2" style="background-color:#43db80;">
              <p
                class="text-start"
                style="width:100%;font-size:20px;font-weight:900"
              >
                Welcome to Ashewa SC.
              </p>

              <p class=" text-start" style="width:100%;font-size:13px">
                Thanks for subscribing. You will be updated with new information
                as soon as they are released. Stay tuned for any information we
                are going to share you. Ashewa company news, sale notices, email
                alerts, and new product releases.
              </p>
              <p class=" text-start" style="width:100%;font-size:13px">
                Don’t worry we hate overflowing inboxes as much as you do,
                directions for unsubscribing are including in every email we
                send. And we’ll never share your email with anyone.Don’t worry
                we hate overflowing inboxes as much as you do, directions for
                unsubscribing are including in every email we send. And we’ll
                never share your email with anyone.
              </p>
              <p class=" text-start" style="width:100%;font-size:13px">
                If you ever need help, drop an email to our customer service
                experts or call us at TEL: +251976005100 E-Mail:
                ashewainfo@gmail.com
              </p>
            </div>
            <p v-if="not" class="mt-1 text-center" style="width:100%;">
              For more information contact us on telegram
              <v-btn
                class="mx-2 white--text"
                icon
                href="https://t.me/ashewatechnology"
              >
                <v-icon size="30px">
                  mdi-telegram
                </v-icon>
              </v-btn>
            </p>
          </v-row>
        </div>
        <v-btn
          block
          style="background-color:transparent"
          class="text-center mt-5"
          dark
          v-if="not"
          @click="not = false"
          >Read More before subscribing?</v-btn
        >
        <v-row class="mx-4" align="center">
          <v-text-field
            solo
            dense
            flat
            light
            class="mt-7"
            height="50px"
            placeholder="Email Address"
            v-model="email"
          ></v-text-field>
          <v-btn
            @click="addSubscriber"
            block
            color="black"
            dark
            height="50px"
            tile
            >Subscribe</v-btn
          >
        </v-row>
      </v-img>
    </v-dialog>
    <v-main class="text-center">
      <loading />
      <v-container class="pa-0  px-lg-10" fluid>
        <transition name="fade" mode="out-in">
          <router-view />
        </transition>
      </v-container>
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import Toolbar from "@/components/core/Toolbar.vue";
import Loading from "@/components/core/Loading.vue";
import Footer from "@/components/core/Footer.vue";

export default {
  name: "Ashewa Market Place",
  data() {
    return {
      vis: false,
      not: true,
      email: "",
      numPages: undefined,
      test: false,
    };
  },
  mounted() {
    setTimeout(() => {
      this.vis = false;
    }, 30000);
  },
  metaInfo() {
    return {
      title: "Ashewa Market Place",
      meta: [
        { name: "msapplication-TileColor", content: "#ffc40d" },
        { name: "Referrer-Policy", content: "same-origin" },
        { name: "theme-color", content: "#ffffff" },
        {
          name: "apple-mobile-web-app-title",
          content: "Ashewa",
        },
        { name: "application-name", content: "Ashewa" },
        {
          httpEquiv: "Content-Security-Policy",
          content: "upgrade-insecure-requests",
        },
      ],
    };
  },
  components: {
    Toolbar,
    Loading,
    Footer,
  },
  computed: {},
  created() {
    this.parentCats();
    this.getAllProducts();
  },
  methods: {
    addSubscriber() {
      this.$store.dispatch("addSubscriber", this.email);
    },
    async getAllProducts() {
      if (this.$store.getters.categories.length === 0) {
        await this.$store.dispatch("getAllProducts", { page: 1, pageSize: 5 });
      }
    },
    async parentCats() {
      if (this.$store.getters.products.length === 0) {
        this.$store.dispatch("parentCats");
      }
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Nunito+Sans");
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.darkB {
  background-color: #121212;
}
.lightB {
  background-color: white;
}
.myFont {
  font-family: "Nunito Sans";
}
</style>
