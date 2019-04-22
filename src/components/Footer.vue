<template>
  <footer>
    <div class="footer-container">
      <div class="general-info">
        <div class="contact-info">
          <h2>Contact Information</h2>

          <div class="address">
            <p>
              <i class="fas fa-map-marker-alt map-icon"></i>
              <a
                class="address-link"
                href="https://www.google.com/maps/dir/42.2548317,-83.4222783/beekel+farm+kennel/@42.1652932,-84.3743634,11z/data=!4m9!4m8!1m1!4e1!1m5!1m1!1s0x883cee0088b3b533:0x9d182903b4f7b9b1!2m2!1d-84.1217527!2d41.8753564"
                target="_blank"
              >2890 Whig Hwy, Adrian, MI 49221</a>
            </p>
          </div>
          <div class="phone">
            <p>
              <i class="fas fa-phone phone-icon"></i>
              <span>517-263-0308</span>
            </p>
          </div>
        </div>

        <div class="hours">
          <h2>Hours of Business</h2>

          <div class="hours-container">
            <p>Monday - Saturday : 11:00 am - 1:00 pm, 4:00 pm - 6:00 pm</p>
            <p>Sundays and Holidays : 5:00 pm - 7:00 pm</p>
            <p>The only holidays are: Memorial Day & Labor Day</p>
            <p>Special Holiday hours: Christmas Eve and New Years Eve we are open 11am-1pm ONLY</p>
            <p>We are closed Thanksgiving Day, Christmas Day and New Years Day</p>
          </div>
        </div>
      </div>

      <iframe
        class="map"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2970.8136159001488!2d-84.12394138416545!3d41.875356379222374!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x883cee0088b3b533%3A0x9d182903b4f7b9b1!2sBeekel+Farms+Kennels!5e0!3m2!1sen!2sus!4v1555374070167!5m2!1sen!2sus"
        width="600"
        height="450"
        frameborder="0"
        style="border:0"
        allowfullscreen
      ></iframe>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
/* FOOTER SECTION */

footer {
  background: #001b54;
  padding: 50px 0px 70px 0px;
}

.footer-container {
  width: 90%;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
}

.contact-info h2,
.hours h2 {
  color: #fff;
}

.address .address-link,
.phone span {
  color: #fff;
  margin-left: 10px;
}

.map-icon,
.phone-icon {
  color: #c2b59b;
}

.hours-container p {
  color: #fff;
}

/* MEDIA QUERY SECTION */

@media only screen and (max-width: 1430px) {
  .map {
    width: 350px;
  }
}

@media only screen and (max-width: 1160px) {
  .hours-container {
    width: 450px;
  }
}

@media only screen and (max-width: 993px) {
  /* FOOTER SECTION */

  .footer-container {
    flex-direction: column;
  }

  .general-info {
    margin-bottom: 0 auto;
    text-align: center;
  }

  .hours h2 {
    margin: 40px auto auto auto;
  }

  .hours-container {
    width: 90%;
    margin: 20px auto auto auto;
  }

  .map {
    width: 80%;
    margin: 40px auto auto auto;
  }
}
</style>
