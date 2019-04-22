  <template>
  <div class="home">
    <Navbar></Navbar>

    <header class="hero">
      <div class="logo-img">
        <img src="../assets/logo.png" alt="Beekel Farms Kennel">
      </div>

      <div class="action-btns">
        <el-button type="primary" @click="$router.push('/reservation')">Check Availability</el-button>
        <el-button type="primary" @click="$router.push('/about')">Learn More</el-button>
      </div>
    </header>

    <main>
      <section class="intro">
        <div class="title-container">
          <h1 class="title">Adrian’s Top Dog Boarding Kennel</h1>
          <h3 class="subtitle">Let us take care of your dogs while you are away from home!</h3>

          <ul class="work-list">
            <h4>What we have for dogs</h4>
            <li class="work-item">
              <i class="fas fa-paw paw-icon"></i>
              <span class="work-item-description">Trained staff with over 25 years of experience</span>
            </li>
            <li class="work-item">
              <i class="fas fa-paw paw-icon"></i>
              <span class="work-item-description">Clean, well-ventilated indoor / outdoor runs</span>
            </li>
            <li class="work-item">
              <i class="fas fa-paw paw-icon"></i>
              <span class="work-item-description">Heated and air-conditioned inside</span>
            </li>
            <li class="work-item">
              <i class="fas fa-paw paw-icon"></i>
              <span class="work-item-description">Secure military prototype fencing</span>
            </li>
            <li class="work-item">
              <i class="fas fa-paw paw-icon"></i>
              <span
                class="work-item-description"
              >Bath and Nail trimming upon request for boarding customers only</span>
            </li>
            <li class="work-item">
              <i class="fas fa-paw paw-icon"></i>
              <span
                class="work-item-description"
              >Secure, grassy, large 1/3 acre turnout area to let your pets get exercise and go to the bathroom</span>
            </li>
          </ul>
        </div>

        <div class="intro-pic">
          <img src="../assets/twin-dogs.jpg" alt="Let us give your dog a home away from home.">
        </div>
      </section>

      <section class="services">
        <section class="services-container">
          <h1>Services</h1>

          <div class="services-cards">
            <div class="uk-card uk-card-default uk-card-body uk-card-hover">
              <h3 class="card-title">Dog Boarding</h3>
              <p
                class="card-body"
              >We serve as an overnight hotel for you dogs. Drop your dog’s off when you go on vacation or need to take a couple personal days.</p>
            </div>
            <div class="uk-card uk-card-default uk-card-body uk-card-hover">
              <h3 class="card-title">Turn Out Services</h3>
              <p
                class="card-body"
              >We let your dog’s run around in our ½ acre fenced-in field to run around and go to the bathroom multiple time throughout the day.</p>
            </div>
            <div class="uk-card uk-card-default uk-card-body uk-card-hover">
              <h3 class="card-title">Bath / Nail Trimming</h3>
              <p
                class="card-body"
              >We offer bath and tail trimmings for boarding customer upon request. Ask us in advance before your drop-off date.</p>
            </div>
          </div>
        </section>
      </section>

      <section class="why">
        <h1>Why Choose Beekel Farms Kennel</h1>

        <div class="why-container">
          <div class="why-1">
            <div class="why-1-container">
              <div class="support">
                <h2>Great Support</h2>
                <p>Our facility design and procedures focus on safety, health, and cleanliness.</p>
              </div>
              <div class="team">
                <h2>Professional Team</h2>
                <p>We have a team with over 25 years of experience of taking care of your pets.</p>
              </div>
            </div>
          </div>
          <div class="why-pic">
            <img src="../assets/dog.png" alt="Let us give your dog a home away from home.">
          </div>
          <div class="why-2">
            <div class="why-2-container">
              <div class="pricing">
                <h2>Affordable Pricing</h2>
                <p>We offer prices that won't break the bank.</p>
              </div>
              <div class="quality-service">
                <h2>Quality Services</h2>
                <p>We over overnight dog boarding, turnout services, baths and nail trimming (upon request for boarding customers).</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>

    <Footer></Footer>
  </div>
</template>

  <script>
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default {
  name: "home",
  components: {
    Footer,
    Navbar
  }
};
</script>

  <style lang="scss" scoped>
/* HEADER SECTION */

.hero {
  background-image: linear-gradient(
      0deg,
      rgba(0, 0, 0, 0.25),
      rgba(0, 0, 0, 0.25)
    ),
    url("../assets/dogs.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  height: 95vh;
  width: 100%;
  margin-bottom: 80px;
}

.logo-img {
  max-width: 500px;
  margin: 0px auto;
  padding-top: 20px;
}

.logo-img img {
  width: 100%;
}

.action-btns {
  display: flex;
  justify-content: center;
  margin-top: 60px;

  & button {
    font-size: 1.2rem;
  }
}

/* INTRO SECTION */

.intro {
  width: 90%;
  margin: 0px auto 100px auto;
  display: flex;
  justify-content: space-between;
}

.title-container {
  max-width: 500px;
}

.title,
.subtitle {
  color: #001b54;
  /* text-align: center; */
}

.subtitle {
  margin-top: -5px;
}

.intro-pic {
  max-width: 550px;
  height: 600px;
}

.intro-pic img {
  width: 100%;
  height: 100%;
}

.work-list {
  list-style: none;
  padding: 0px;
}

.work-list h4 {
  font-size: 1.5rem;
  color: #001b54;
}

.work-item {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  font-size: 1.2rem;
}

.work-item span {
  margin-left: 20px;
  color: #000;
}

.paw-icon {
  color: #001b54;
}

/* SERVICES SECTION */

.services {
  padding: 5px 20px 50px 20px;
  background: #f3f3f3;
}

.services-container {
  width: 95%;
  margin: 70px auto;
}

.services-container h1 {
  text-align: center;
  color: #001b54;
  margin-bottom: 50px;
}

.services-cards {
  display: flex;
  justify-content: space-between;
}

.uk-card {
  color: #001b54;
  width: 370px;
}

.card-title {
  color: #c2b59b;
  text-align: center;
  font-size: 2rem;
}

.card-body {
  font-size: 1.2rem;
}

.why {
  margin: 70px auto;
  width: 90%;
}

.why h1 {
  text-align: center;
  color: #001b54;
}

.why-container {
  display: flex;
  justify-content: space-between;
  width: 95%;
  margin: 0 auto;
}

.why-pic {
  max-width: 950px;
}

.why-pic img {
  width: 100%;
  margin: 0 auto;
}

.why-1-container,
.why-2-container {
  margin: 80px auto;
}

.why-1-container h2,
.why-2-container h2 {
  font-size: 2rem;
}

.why-1-container p,
.why-2-container p {
  font-size: 1.2rem;
  color: #000;
}

.quality-service {
  margin-top: 50px;
}

// Media Queries

@media only screen and (min-width: 1300px) {
  .intro {
    width: 1200px;
  }

  .services-container {
    width: 1200px;
  }

  .why-container {
    margin: 0 auto;
  }

  .quality-service {
    width: 400px;
  }
}

@media only screen and (max-width: 1240px) {
  .uk-card {
    width: 350px;
  }
}

@media only screen and (max-width: 1190px) {
  .intro-pic img {
    width: 450px;
  }
}

@media only screen and (max-width: 1165px) {
  .services-cards {
    flex-direction: column;
    margin: 0 auto;
  }

  .uk-card {
    width: 80%;
    margin: 0px auto 40px auto;
    text-align: center;
  }
}

@media only screen and (max-width: 1093px) {
  .work-list h4 {
    font-size: 1.2rem;
  }

  .work-item {
    width: 400px;
  }
}

@media only screen and (max-width: 993px) {
  /* INTRO SECTION */

  .intro {
    flex-direction: column;
    margin: 0 auto;
  }

  .title-container,
  .intro-pic {
    margin: 0 auto;
  }

  .title-container {
    text-align: center;
  }

  .work-item {
    flex-direction: column;
    margin: 0 auto;
    width: 95%;
  }

  .paw-icon {
    margin-bottom: 10px;
  }

  .intro-pic {
    height: 400px;
    margin-top: 20px;
  }

  /* SERVICES SECTION */

  .services {
    margin-top: 100px;
  }

  /* WHY SECTION */

  .why {
    text-align: center;
  }

  .why-container {
    flex-direction: column;
  }

  .why-pic {
    width: 400px;
    margin: -30px auto 40px auto;
  }

  .support,
  .pricing {
    margin-bottom: 40px;
  }

  .pricing {
    margin-top: -80px;
  }
}

@media only screen and (max-width: 525px) {
  .uk-card {
    width: 95%;
  }
}
</style>

