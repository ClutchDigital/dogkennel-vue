<template>
  <div class="reservation-container">
    <Navbar></Navbar>

    <h1 class="book-title">Book A Reservation Today</h1>

    <div class="res-container">
      <div class="reservation">
        <div class="reservation-form">
          <form class="reservation-container">
            <div class="dates">
              <div class="checkin">
                <label for="checkin">Check In</label>
                <el-date-picker
                  @input="checkTime(reservation.checkin_date)"
                  name="checkin"
                  v-model="reservation.checkin_date"
                  type="date"
                  :picker-options="{ format: 'MM-dd-yyyy' }"
                  placeholder="Select drop off date"
                ></el-date-picker>
                <div class="checkin-times">
                  <el-select
                    v-model="reservation.checkin_time"
                    clearable
                    placeholder="Choose drop off time"
                  >
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                      :disabled="item.disabled"
                    ></el-option>
                  </el-select>
                </div>
              </div>
              <div class="checkout">
                <label for="checkout">Check Out</label>
                <el-date-picker
                  @input="checkTime(reservation.checkout_date)"
                  name="checkout"
                  v-model="reservation.checkout_date"
                  type="date"
                  :picker-options="{ format: 'MM-dd-yyyy' }"
                  placeholder="Select pick up date"
                ></el-date-picker>
                <div class="checkout-times" @click="checkTime(reservation.checkout_date)">
                  <el-select
                    v-model="reservation.checkout_time"
                    clearable
                    placeholder="Choose pick up time"
                  >
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                      :disabled="item.disabled"
                    ></el-option>
                  </el-select>
                </div>
              </div>
            </div>
          </form>

          <div class="dropdowns">
            <div class="dog-numbers">
              <p>Number of Dogs</p>

              <el-input-number
                v-model="reservation.numOfDogs"
                controls-position="right"
                :min="1"
                :max="10"
              ></el-input-number>
            </div>

            <div class="kennel-numbers">
              <p>Number of Kennels</p>

              <el-input-number
                v-model="reservation.numOfKennels"
                controls-position="right"
                :min="1"
                :max="10"
              ></el-input-number>
            </div>
          </div>

          <div class="check-btn">
            <el-button type="primary" @click="check()">Check Availability</el-button>
          </div>
        </div>
      </div>

      <div class="reservation-information">
        <h2>Reservation Information</h2>

        <div class="single">
          <h4>Single Dog / Single Kennel</h4>
          <p>Dogs: $20 per dog per day</p>
        </div>

        <div class="shots-container">
          <h4>Must Have These Shot Records Prior To Boarding</h4>
          <ul class="shots">
            <li class="shot">CANINE BIVALENT INFLUENZA VACCINE</li>
            <li class="shot">DHL</li>
            <li class="shot">PARVO</li>
            <li class="shot">RABIES</li>
            <li class="shot">BORDETELLA</li>
          </ul>
          <el-button class="more-btn" type="primary" @click="$router.push('/about')">More Info</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import db from "../db/db";
import Navbar from "../components/Navbar";
import { mapGetters, mapActions } from "vuex";
import moment from "moment";
import Holidays from "date-holidays";
import uuid from "uuid";
import { Notification } from "element-ui";

const hd = new Holidays("US");

export default {
  name: "reservation",
  components: {
    Navbar
  },
  data() {
    return {
      reservation: {
        checkin_date: "",
        checkout_date: "",
        checkin_time: "",
        checkout_time: "",
        numOfDogs: 1,
        numOfKennels: 1
      },
      options: [
        {
          value: "11am - 1pm",
          label: "11am - 1pm",
          disabled: false
        },
        {
          value: "4pm - 6pm",
          label: "4pm - 6pm",
          disabled: false
        },
        {
          value: "5pm - 7pm",
          label: "5pm - 7pm",
          disabled: true
        }
      ],
      availableKennels: [],
      availableReservations: []
    };
  },
  async created() {
    const daysRef = db.collection("days");

    await daysRef
      .get()
      .then(snapShot => {
        if (!snapShot.empty) {
          snapShot.forEach(doc => {
            doc.ref.update({ currentDay: new Date().getDate() });
            this.$store.commit("setCurrentDay", new Date().getDate());
          });
        }
      })
      .then(() => {
        this.updateKennelStatus();
      });
  },
  computed: {
    ...mapGetters("auth", ["user"]),
    ...mapGetters("profile", ["profile"]),
    checkinDate() {
      return moment(this.reservation.checkin_date).format("MMM Do YYYY");
    },
    checkoutDate() {
      return moment(this.reservation.checkout_date).format("MMM Do YYYY");
    },
    formIsValid() {
      if (
        this.reservation.checkin_date === "" ||
        this.reservation.checkout_date === "" ||
        this.reservation.checkin_time === "" ||
        this.reservation.checkout_time === ""
      ) {
        return false;
      } else {
        return true;
      }
    },
    newReservation() {
      return {
        checkin_date: moment(this.reservation.checkin_date).valueOf(),
        checkout_date: moment(this.reservation.checkout_date).valueOf(),
        checkin_time: this.reservation.checkin_time,
        checkout_time: this.reservation.checkout_time,
        res_id: uuid(),
        numOfDogs: this.reservation.numOfDogs,
        numOfKennels: this.reservation.numOfKennels
      };
    }
  },
  methods: {
    ...mapActions("reservation", [
      "isAvailableMethod",
      "selectedReservation",
      "noMoreKennels",
      "updateKennelStatus"
    ]),
    setWeekendTimeDisabled() {
      this.options[0].disabled = true;
      this.options[1].disabled = true;
      this.options[2].disabled = false;
    },
    setHolidayTimeDisabled() {
      this.options[0].disabled = true;
      this.options[1].disabled = true;
      this.options[2].disabled = true;
    },
    checkTime(date) {
      const newDate = new Date(date);
      const weekdays = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ];
      const day = newDate.getDay();

      this.options[0].disabled = false;
      this.options[1].disabled = false;
      this.options[2].disabled = true;

      if (weekdays[day] === "Sunday") {
        this.setWeekendTimeDisabled();
      } else if (
        hd.isHoliday(date).name === "Christmas Eve" ||
        hd.isHoliday(date).name === "New Year's Eve"
      ) {
        this.options[1].disabled = true;
        this.options[2].disabled = true;
      } else {
        if (hd.isHoliday(date).name === "Christmas Day") {
          this.setHolidayTimeDisabled();
          Notification.error({
            title: "Closed",
            message: `Sorry we are not open on Christmas Day`,
            duration: 4000
          });
        } else if (hd.isHoliday(date).name === "Thanksgiving Day") {
          this.setHolidayTimeDisabled();
          Notification.error({
            title: "Closed",
            message: `Sorry we are not open on Thanksgiving Day`,
            duration: 4000
          });
        } else if (hd.isHoliday(date).name === "New Year's Day") {
          this.setHolidayTimeDisabled();
          Notification.error({
            title: "Closed",
            message: `Sorry we are not open on New Years Day`,
            duration: 4000
          });
        }
      }
    },
    isAvailible: (startDate, checkinDate, endDate, checkoutDate) => {
      if (
        (startDate >= checkinDate && startDate <= checkoutDate) ||
        (endDate >= checkinDate && endDate <= checkoutDate) ||
        (startDate <= checkinDate && endDate >= checkoutDate)
      ) {
        return false;
      } else {
        return true;
      }
    },
    calculateTotalPrice() {
      const numOfDogs = this.reservation.numOfDogs;
      const startDay = moment(this.newReservation.checkin_date);
      const endDay = moment(this.newReservation.checkout_date);
      let total;
      let range;
      let days;

      range = moment.range(startDay, endDay);
      days = range.diff("days");

      if (numOfDogs > 1) {
        total = days * 17 * numOfDogs;
      } else {
        total = days * 20 * numOfDogs;
      }

      return total;
    },
    async check() {
      const reservationsRef = db.collection("reservations");
      const kennelsRef = db
        .collection("kennels")
        .orderBy("id", "asc")
        .where("status", "==", "available");
      let reservedKennels;
      let reservation;

      if (!this.formIsValid) {
        Notification.error({
          title: "Error",
          message: "Please pick dates and time",
          duration: 4000
        });
      } else {
        if (this.reservation.numOfDogs < this.reservation.numOfKennels) {
          Notification.error({
            title: "Error",
            message:
              "The number of kennels you select cannot be more than the number of dogs you reserve",
            duration: 4000
          });
          return;
        } else if (this.calculateTotalPrice() < 0) {
          Notification.error({
            title: "Error",
            message:
              "Please take a look at your dates. They may be out of order.",
            duration: 4000
          });
          return;
        }

        this.isAvailableMethod(true);
        this.noMoreKennels(false);
        await kennelsRef.get().then(snapShot => {
          snapShot.docs.forEach(doc => {
            this.availableKennels.push(doc.data());
          });

          if (this.availableKennels.length < this.reservation.numOfKennels) {
            this.noMoreKennels(true);
            this.$router.push("/reservation/available");
            return;
          }

          this.isAvailableMethod(true);
          const restOfArray =
            this.availableKennels.length - this.reservation.numOfKennels;
          this.availableKennels.splice(
            this.reservation.numOfKennels,
            restOfArray
          );
          reservedKennels = this.availableKennels;

          if (this.user) {
            reservation = {
              ...this.newReservation,
              creator_id: this.user.user_id,
              owner: `${this.profile.firstName.trim()} ${this.profile.lastName.trim()}`,
              reservedKennels
            };
            this.selectedReservation(reservation);
            console.log(reservation);
          } else {
            reservation = { ...this.newReservation, reservedKennels };
            this.selectedReservation(reservation);
            console.log(reservation);
          }

          reservationsRef.get().then(snapShot => {
            if (snapShot.empty) {
              this.isAvailableMethod(true);
              this.selectedReservation(reservation);
              this.$router.push("/reservation/available");
              return;
            }
            const startDate = moment(this.reservation.checkin_date).valueOf();
            const endDate = moment(this.reservation.checkout_date).valueOf();

            snapShot.docs.forEach(doc => {
              this.availableReservations.push(doc.data());
            });
            this.availableReservations.forEach(res => {
              const checkinDate = res.checkin_date;
              const checkoutDate = res.checkout_date;

              if (
                !this.isAvailible(
                  startDate,
                  checkinDate,
                  endDate,
                  checkoutDate
                ) &&
                reservation.reservedKennels[0].kennel_name ===
                  res.reservedKennels[0].kennel_name
              ) {
                this.isAvailableMethod(false);
                this.$router.push("/reservation/available");
                console.log("Not available");
              } else {
                this.$router.push("/reservation/available");
                console.log("Available");
              }
            });
          });
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
/* RESERVATION SECTION */

.book-title {
  text-align: center;
}

.res-container {
  display: flex;
  justify-content: space-around;
  margin: 40px auto auto auto;
}

.reservation-information {
  width: 500px;
}

.reservation {
  width: 500px;
}

.reservation-form {
  display: flex;
  justify-content: space-around;
  margin-bottom: 70px;
  align-items: center;
  flex-direction: column;
}

.dropdowns {
  display: flex;
  width: 460px;
  margin-top: 40px;
}

.dog-numbers {
  margin-right: 50px;
}

.check-btn {
  width: 460px;

  & button {
    font-size: 1.2rem;
    margin-top: 60px;
  }
}

.dates {
  display: flex;
}

.checkout,
.checkin {
  display: flex;
  flex-direction: column;
  margin-right: 10px;
}

.morning {
  margin: 0px;
}

.checkin-times,
.checkout-times {
  margin-top: 10px;
}

.more-btn {
  margin-bottom: 50px;
  font-size: 1.2rem;
}

@media only screen and (max-width: 1050px) {
  .res-container {
    flex-direction: column;
  }

  .reservation-form {
    flex-direction: column;
  }

  .dates {
    margin-bottom: 40px;
  }

  .pet-profiles {
    margin-bottom: 40px;
  }

  .pet-card {
    width: 100%;
  }

  .reservation-information {
    text-align: center;
    margin: 0 auto;
  }

  .shots {
    text-align: left;
  }
}

@media only screen and (max-width: 500px) {
  form.reservation-container {
    margin-right: 75px;
  }

  .dates {
    flex-direction: column;
    width: 95%;
    margin: 0px auto;
  }

  .checkin {
    margin: auto auto 10px auto;
  }

  div.el-date-editor {
    width: 350px;
  }

  .dropdowns {
    margin-right: 20px;
  }

  .pet-profiles {
    margin-bottom: 40px;
    width: 90%;
  }

  .reserve-btn,
  .show-preview,
  .kennel-select-btn {
    width: 90%;
  }

  .pet-info {
    width: 87%;
  }

  .kennel-select-btn button {
    width: 100%;
  }

  .reservation-information {
    width: 90%;
    text-align: center;
    margin: 0 auto;
  }
}
</style>
