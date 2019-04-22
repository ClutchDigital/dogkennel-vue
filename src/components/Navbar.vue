<template>
  <section class="nav-container">
    <div v-if="!isLoggedIn" class="reservation-sign-up">
      <h3>
        <router-link class="auth-btn" to="/signup">Sign Up</router-link>or
        <router-link class="auth-btn" to="/login">Login</router-link>to make a reservation!
      </h3>
    </div>
    <nav class="nav">
      <div class="navbar">
        <div class="navbar-brand">
          <h3>Beekel Farms Kennel</h3>
        </div>
        <ul class="navbar-nav">
          <li class="nav-item link">
            <router-link class="nav-link" to="/">Home</router-link>
          </li>
          <li class="nav-item link">
            <router-link class="nav-link" to="/about">About Us</router-link>
          </li>
          <li class="nav-item link" @click="$router.push('/reservation')">Reservation</li>
          <li v-for="item in menu" :key="item.name" class="nav-item link">
            <router-link :to="item.to" class="nav-link">{{ item.name }}</router-link>
          </li>
          <li @click="onLogout" v-if="isLoggedIn" class="nav-item link">
            <router-link class="nav-link" to="/login">Logout</router-link>
          </li>
          <li class="nav-item menu">
            <a class="menu-btn" href="#sidebar" uk-toggle>
              <i class="fas fa-bars"></i>
            </a>
          </li>
        </ul>
      </div>

      <div id="sidebar" uk-offcanvas>
        <div class="uk-offcanvas-bar sidebar">
          <button class="uk-offcanvas-close" type="button" uk-close></button>

          <div class="navbar-brand">
            <h3>Beekel Farms Kennel</h3>
          </div>

          <ul class="side-nav">
            <li class="side-nav-item">
              <router-link to="/" class="side-nav-link">Home</router-link>
            </li>
            <li class="side-nav-item">
              <router-link to="/about" class="side-nav-link">About Us</router-link>
            </li>
            <li class="side-nav-item">
              <router-link to="/reservation" class="side-nav-link">Reservation</router-link>
            </li>
            <li v-for="item in menu" :key="item.name" class="side-nav-item">
              <router-link :to="item.to" class="side-nav-link">{{ item.name }}</router-link>
            </li>
            <li @click="onLogout" v-if="isLoggedIn" class="side-nav-item">
              <router-link class="side-nav-link" to="/login">Logout</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  computed: {
    ...mapGetters("auth", ["user"]),
    isLoggedIn() {
      return this.user !== null && this.user !== undefined;
    },
    menu() {
      let menuItems = [
        { to: "/signup", name: "Sign Up" },
        { to: "/login", name: "Login" }
      ];
      if (this.isLoggedIn) {
        menuItems = [{ to: `/profile/${this.user.user_id}`, name: "Profile" }];
      }
      return menuItems;
    }
  },
  methods: {
    ...mapActions("auth", ["logout"]),
    ...mapActions("profile", ["resetState"]),
    ...mapActions("reservation", ["resetResState"]),
    onLogout() {
      this.logout();
      this.resetState();
      this.resetResState();
      if (!this.isLoggedIn) {
        this.$router.push("/login");
      }
    }
  }
};
</script>


<style lang="scss" scoped>
// RESERVATION HEADER SECTION

.reservation-sign-up {
  background: #c2b59b;
  height: 100%;
  padding: 8px;
}

.reservation-sign-up h3 {
  margin: 0 auto;
  text-align: center;
  color: #001b54;
}

.reservation-sign-up h3 .auth-btn {
  color: #fff;
}

/* NAVBAR */

.nav {
  padding: 10px;
  background: #001b54;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  margin: 0 auto;
}

.navbar-brand h3 {
  color: #fff;
  margin: 0 auto;
}

.navbar-nav {
  list-style: none;
  display: flex;
  align-items: center;
}

.nav-item {
  margin-left: 10px;
  color: #fff;
  font-size: 1.2rem;
  cursor: pointer;
}

.nav-link {
  color: #fff;
  font-size: 1.2rem;
  text-decoration: none;
}

.nav-link:hover {
  text-decoration: none;
  color: #fff;
}

.menu {
  display: none;
}

.menu-btn {
  font-size: 2rem;
  cursor: pointer;
  color: #fff;
}

.menu-btn:hover {
  color: #fff;
}

.uk-offcanvas-bar {
  background: #001b54 !important;
  width: 350px !important;
}

.side-nav {
  list-style: none;
  padding: 0px;
}

.side-nav-item {
  margin-bottom: 20px;
}

.side-nav-link {
  font-size: 1.2rem;
  color: #fff;
}

.side-nav-link:hover {
  text-decoration: none;
}

@media only screen and (max-width: 993px) {
  /* NAVBAR */

  .link {
    display: none;
  }

  .menu {
    display: block;
  }
}
</style>


