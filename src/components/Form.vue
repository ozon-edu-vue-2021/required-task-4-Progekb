<template>
  <v-form ref="form">
    <div class="form-group">Личные данные</div>
    <v-row>
      <v-col sm="4">
        <v-text-field
          v-model="formData.sname"
          :rules="[rules.rusOnly]"
          label="Фамилия"
          hide-details="auto"
          dense
          outlined
          validate-on-blur
        />
      </v-col>
      <v-col sm="4">
        <v-text-field
          v-model="formData.fname"
          :rules="[rules.rusOnly]"
          label="Имя"
          hide-details="auto"
          dense
          outlined
          validate-on-blur
        />
      </v-col>
      <v-col sm="4">
        <v-text-field
          v-model="formData.tname"
          :rules="[rules.rusOnly]"
          label="Отчество"
          hide-details="auto"
          dense
          outlined
          validate-on-blur
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col sm="6">
        <v-text-field
          v-model="formData.birthday"
          v-mask="'##.##.####'"
          :rules="[rules.date]"
          placeholder="дд.мм.гггг"
          label="Дата рождения"
          hide-details="auto"
          dense
          outlined
          validate-on-blur
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-text-field
          v-model="formData.email"
          :rules="[rules.email]"
          label="Email"
          hide-details="auto"
          dense
          outlined
          validate-on-blur
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-radio-group
          v-model="formData.sex"
          dense
          hide-details="auto"
          class="d-flex mt-0"
        >
          <template v-slot:label>
            <div class="radio-title">Пол</div>
          </template>
          <v-radio
            v-for="n in ['Мужской', 'Женский']"
            :key="n"
            :label="n"
            :value="n"
          />
        </v-radio-group>
      </v-col>
    </v-row>
    <div class="form-group">Паспортные данные</div>
    <v-row>
      <v-col sm="6">
        <v-autocomplete
          v-model="formData.citizen"
          :items="citizenshipsList"
          :search-input.sync="searchCitizen"
          item-text="nationality"
          item-value="nationality"
          hide-details="auto"
          label="Гражданство"
          dense
          outlined
          no-filter
        />
      </v-col>
    </v-row>
    <v-row v-if="formData.citizen === 'Russia'">
      <v-col sm="3">
        <v-text-field
          v-model="formData.passportSer"
          :rules="[rules.seria]"
          label="Серия паспорта"
          hide-details="auto"
          dense
          outlined
          validate-on-blur
        />
      </v-col>
      <v-col sm="3">
        <v-text-field
          v-model="formData.passportNumber"
          :rules="[rules.number]"
          label="Номер паспорта"
          hide-details="auto"
          dense
          outlined
          validate-on-blur
        />
      </v-col>
      <v-col sm="6">
        <v-text-field
          v-model="formData.passportDate"
          v-mask="'##.##.####'"
          :rules="[rules.date]"
          placeholder="дд.мм.гггг"
          label="Дата выдачи"
          hide-details="auto"
          dense
          outlined
          validate-on-blur
        />
      </v-col>
    </v-row>
    <v-row v-if="formData.citizen !== 'Russia' && formData.citizen !== ''">
      <v-col sm="6">
        <v-text-field
          v-model="formData.snameLat"
          :rules="[rules.engOnly]"
          label="Фамилия на латинице"
          hide-details="auto"
          dense
          outlined
          validate-on-blur
        />
      </v-col>
      <v-col sm="6">
        <v-text-field
          v-model="formData.fnameLat"
          :rules="[rules.engOnly]"
          label="Имя на латинице"
          hide-details="auto"
          dense
          outlined
          validate-on-blur
        />
      </v-col>
      <v-col sm="3">
        <v-text-field
          v-model="formData.passportNumber"
          label="Номер паспорта"
          hide-details="auto"
          dense
          outlined
        />
      </v-col>
      <v-col sm="3">
        <v-autocomplete
          v-model="formData.passportCitizen"
          :items="citizenshipsPassportCitizenList"
          :search-input.sync="searchPassportCitizen"
          item-text="nationality"
          item-value="nationality"
          hide-details="auto"
          label="Страна выдачи"
          dense
          outlined
          no-filter
        />
      </v-col>
      <v-col sm="6">
        <v-select
          v-model="formData.passportType"
          :items="passportTypesList"
          item-text="type"
          item-value="type"
          hide-details="auto"
          label="Тип паспорта"
          dense
          outlined
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-radio-group
          v-model="formData.changeName"
          dense
          hide-details="auto"
          class="d-flex mt-0"
        >
          <template v-slot:label>
            <div class="radio-title">Меняли ли фамилию или имя?</div>
          </template>
          <v-radio v-for="n in ['Нет', 'Да']" :key="n" :label="n" :value="n" />
        </v-radio-group>
      </v-col>
    </v-row>
    <v-row v-if="formData.changeName === 'Да'">
      <v-col sm="6">
        <v-text-field
          v-model="formData.prevSname"
          label="Предыдущая Фамилия"
          hide-details="auto"
          dense
          outlined
        />
      </v-col>
      <v-col sm="6">
        <v-text-field
          v-model="formData.prevFname"
          label="Предыдущее Имя"
          hide-details="auto"
          dense
          outlined
        />
      </v-col>
    </v-row>
    <v-btn class="float-right mt-5 mb-5" color="primary" @click="sendData">
      Отправить
    </v-btn>
  </v-form>
</template>

<script>
import { VueMaskDirective } from "v-mask";
import citizenships from "../assets/data/citizenships.json";
import passporttypes from "../assets/data/passport-types.json";
import { DateTime } from "luxon";

export default {
  data() {
    return {
      citizenshipsList: citizenships,
      citizenshipsPassportCitizenList: citizenships,
      passportTypesList: passporttypes,
      searchCitizen: null,
      searchPassportCitizen: null,
      formData: {
        sname: "",
        snameLat: "",
        fname: "",
        fnameLat: "",
        tname: "",
        prevSname: "",
        prevFname: "",
        birthday: "",
        email: "",
        sex: "",
        citizen: "",
        passportSer: "",
        passportNumber: "",
        passportDate: "",
        passportType: "",
        passportCitizen: "",
        changeName: "",
        changedFname: "",
        changedSname: "",
      },
      rules: {
        seria: (val) => {
          return (
            (/^[0-9\s]+$/.test(val) && val.length === 4) || "Только 4 цифры"
          );
        },
        number: (val) => {
          return (
            (/^[0-9\s]+$/.test(val) && val.length === 6) || "Только 6 цифр"
          );
        },
        rusOnly: (val) => {
          return /^[а-яА-ЯёЁ\s]+$/.test(val) || "Только русские буквы";
        },
        engOnly: (val) => {
          return /^[a-zA-Z\s]+$/.test(val) || "Только английские буквы";
        },
        date: (val) => {
          const dt = DateTime.fromFormat(val, "dd.MM.yyyy");
          return (dt && dt <= DateTime.now()) || "Невалидная дата";
        },
        email: (val) => {
          const re =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return re.test(String(val).toLowerCase()) || "Невалидная почта";
        },
      },
    };
  },
  methods: {
    sendData() {
      if (this.$refs.form.validate()) {
        console.log(this.formData);
      } else {
        console.log("Ошибка валидации");
      }
    },
    searchCitizenDebounce(val) {
      clearTimeout(this._timerId);
      this._timerId = setTimeout(() => {
        console.log("FETCH");
        this.citizenshipsList = citizenships.filter(
          (item) =>
            item.nationality.toLowerCase().indexOf(val.toLowerCase()) > -1
        );
      }, 1000);
    },
    searchPassportCitizenDebounce(val) {
      clearTimeout(this._timerId);
      this._timerId = setTimeout(() => {
        console.log("FETCH");
        this.citizenshipsPassportCitizenList = citizenships.filter(
          (item) =>
            item.nationality.toLowerCase().indexOf(val.toLowerCase()) > -1
        );
      }, 1000);
    },
  },
  watch: {
    searchCitizen(val) {
      if (!val) {
        this.citizenshipsList = citizenships;
        return;
      }
      this.searchCitizenDebounce(val);
    },
    searchPassportCitizen(val) {
      if (!val) {
        this.citizenshipsPassportCitizenList = citizenships;
        return;
      }
      this.searchPassportCitizenDebounce(val);
    },
  },
  directives: {
    mask: VueMaskDirective,
  },
};
</script>

<style scoped>
.form-group {
  margin: 15px 0;
  font-size: 20px;
  font-weight: bold;
}
.radio-title {
  font-size: 16px;
  font-weight: bold;
}
</style>
