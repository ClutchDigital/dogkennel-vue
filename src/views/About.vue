<template>
  <div class="about">
    <Navbar></Navbar>

    <div class="about-container">
      <div class="mission">
        <h1>- Our Mission -</h1>
        <p>To provide your pet a home away from home.</p>
      </div>

      <div class="about-description">
        <h2>About Us</h2>

        <p>Beekel Farms Boarding Kennel was founded in 1994 by the Beekel Family. They wanted to create a place for people in Lenawee County to confidently board their dogs while they were away, by giving their pets a home away from home. Our family has been trained to give your dogs the care, safety, and love they deserve!</p>
      </div>

      <div class="about-description">
        <h2>Our Facilities</h2>

        <p>Our Kennel has 20 runs (individual kennels) that can accommodate all varieties of dog breeds and sizes. If you have more than one dog, they can be boarded in the same kennel depending on the size of each dog. Each run has and indoor and outdoor space, not including our turn-out service.</p>

        <p>We offer turnout to every dog that stays at our kennel. Our turn-out space is a 1/3-acre lot that is fenced in to ensure your pets safety. We turn each dog out up to 8-10 times a day. If you are boarding more than one dog, we can let them out at the same time. We only let dogs from each individual owner out at the same time to make sure your dogs remain safe and unharmed.</p>
      </div>

      <div class="about-description">
        <h2>Dietary and Medical Conditions</h2>

        <p>If your dog has a specific diet that they need to maintain, feel free to bring your dog’s food and we will make sure they are fed according to your instructions. If your dog doesn’t have any diet restrictions, we offer our own dog food, free of charge.</p>

        <p>Please let us know if your dog as any medical issues we should be aware of because we are trained to administer all forms of medicine for your pets including pills and shots.</p>
      </div>

      <div class="about-description">
        <h2>Must Have Shot Records</h2>

        <p>All dogs boarding in our facilities must have these shot records in order to board at Beekel Farms Boarding Kennel. We must have your up-to-date shot records prior to boarding with us. We take pride in taking care of your pets and we want to make sure they are not infectious to the other dogs boarding with us. THIS IS NON-NEGOITABLE! If you do not have these shot records below, we will not allow you to board with us. We apologize for the inconvenience.</p>

        <ul class="shots">
          <li class="shot">CANINE BIVALENT INFLUENZA VACCINE</li>
          <li class="shot">DHL</li>
          <li class="shot">PARVO</li>
          <li class="shot">RABIES</li>
          <li class="shot">BORDETELLA</li>
        </ul>
      </div>

      <div class="about-description">
        <h2>Pricing</h2>

        <p>Our pricing is $20 per dog, per day. If you drop your dog off on Monday, and pick your dog up on Tuesday, that is considered 2 days. We hold each run for you pets on a full day basis and we need to take into account that the run you reserved for that day won’t be in use until the day after your departure. This pricing model is non-negotiable</p>

        <p>We do offer bulk pricing for large number of dogs boarding at one time or an extended period of time equaling one-month. Bulk pricing is determined on a circumstantial basis that will need to be discussed with the owners prior to your boarding reservation.</p>
      </div>

      <div class="about-description">
        <h2>What can we bring for our dogs during their stay?</h2>

        <p>You can bring anything you want that will make your dogs stay more enjoyable. You can bring anything from dog beds, treats, and even toys. We are not responsible for any lost or damaged items while you are boarding your dogs.</p>
      </div>
    </div>

    <Footer></Footer>
  </div>
</template>

<script>
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default {
  name: "about",
  components: {
    Footer,
    Navbar
  }
};
</script>

<style lang="scss" scoped>
.about {
  background: #f5f7fa;
  height: 100%;
}

.about-container {
  width: 80%;
  background: #fff;
  height: 100%;
  margin: 0 auto;
}

.mission {
  text-align: center;
  padding-top: 40px;

  & h1 {
    font-weight: 200;
    color: #001b54;
  }

  & p {
    color: #001b54;
  }
}

.about-description {
  margin-bottom: 50px;

  h2 {
    text-align: center;
    color: #001b54;
    font-weight: 200;
  }

  p,
  ul {
    color: #001b54;
    width: 75%;
    margin: 0px auto 20px auto;
  }
}

.leadership {
  margin-top: 60px;

  h2 {
    text-align: center;
    font-weight: 200;
    color: #001b54;
  }

  .leaders {
    display: flex;
    justify-content: space-around;
    margin-bottom: 70px;

    & .leader {
      & p {
        width: 80%;
        margin: 0 auto;
        color: #001b54;
      }

      & .avatar {
        display: flex;
        flex-direction: column;
        margin-bottom: 10px;

        & img {
          margin: 0 auto;
          width: 100px;
          height: 100px;
        }

        & span {
          text-align: center;
          color: #001b54;
        }
      }
    }
  }
}

@media only screen and (max-width: 700px) {
  .leaders {
    flex-direction: column;

    & .leader {
      margin-bottom: 20px;
    }
  }
}

@media only screen and (max-width: 500px) {
  .about-container {
    width: 90%;
  }

  .about-description {
    p {
      width: 90%;
    }
  }
}
</style>

