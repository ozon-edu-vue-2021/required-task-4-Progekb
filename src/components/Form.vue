<template>
  <v-form
    ref="form"
  >
    <div class="form-group">Личные данные</div>
    <v-row>
      <v-col sm="4">
        <v-text-field
          v-model="formData.sname"
          :error-messages="''"
          label="Фамилия"
          hide-details="auto"
          dense
          outlined
        />
      </v-col>
      <v-col sm="4">
        <v-text-field
          v-model="formData.fname"
          :error-messages="''"
          label="Имя"
          hide-details="auto"
          dense
          outlined
        />
      </v-col>
      <v-col sm="4">
        <v-text-field
          v-model="formData.tname"
          :error-messages="''"
          label="Отчество"
          hide-details="auto"
          dense
          outlined
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col sm="6">
        <v-text-field
          v-model="formData.birthday"
          v-mask="'##.##.####'"
          :error-messages="''"
          placeholder="дд.мм.гггг"
          label="Дата рождения"
          hide-details="auto"
          dense
          outlined
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-text-field
          v-model="formData.email"
          :error-messages="''"
          label="Email"
          hide-details="auto"
          dense
          outlined
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-radio-group
          v-model="formData.sex"
          :error-messages="''"
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
        <v-select
          v-model="formData.citizen"
          :items="citizenshipsList"
          item-text="nationality"
          item-value="nationality"
          hide-details="auto"
          label="Гражданство"
          dense
          outlined
        />
      </v-col>
    </v-row>
    <v-row v-if="formData.citizen === 'Russia'">
      <v-col sm="3">
        <v-text-field
          v-model="formData.passportSer"
          :error-messages="''"
          label="Серия паспорта"
          hide-details="auto"
          dense
          outlined
        />
      </v-col>
      <v-col sm="3">
        <v-text-field
          v-model="formData.passportNumber"
          :error-messages="''"
          label="Номер паспорта"
          hide-details="auto"
          dense
          outlined
        />
      </v-col>
      <v-col sm="6">
        <v-text-field
          v-model="formData.passportDate"
          v-mask="'##.##.####'"
          :error-messages="''"
          placeholder="дд.мм.гггг"
          label="Дата выдачи"
          hide-details="auto"
          dense
          outlined
        />
      </v-col>
    </v-row>
    <v-row v-if="formData.citizen !== 'Russia' && formData.citizen !== ''">
      <v-col sm="6">
        <v-text-field
          v-model="formData.snameLat"
          :error-messages="''"
          label="Фамилия на латинице"
          hide-details="auto"
          dense
          outlined
        />
      </v-col>
      <v-col sm="6">
        <v-text-field
          v-model="formData.fnameLat"
          :error-messages="''"
          label="Имя на латинице"
          hide-details="auto"
          dense
          outlined
        />
      </v-col>
      <v-col sm="3">
        <v-text-field
          v-model="formData.passportNumber"
          :error-messages="''"
          label="Номер паспорта"
          hide-details="auto"
          dense
          outlined
        />
      </v-col>
      <v-col sm="3">
        <v-select
          v-model="formData.passportCitizen"
          :items="citizenshipsList"
          item-text="nationality"
          item-value="nationality"
          hide-details="auto"
          label="Страна выдачи"
          dense
          outlined
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
          :error-messages="''"
          dense
          hide-details="auto"
          class="d-flex mt-0"
        >
          <template v-slot:label>
            <div class="radio-title">Меняли ли фамилию или имя?</div>
          </template>
          <v-radio
            v-for="n in ['Нет', 'Да']"
            :key="n"
            :label="n"
            :value="n"
          />
        </v-radio-group>
      </v-col>
    </v-row>
    <v-row v-if="formData.changeName === 'Да'">
      <v-col sm="6">
        <v-text-field
          v-model="formData.prevSname"
          :error-messages="''"
          label="Предыдущая Фамилия"
          hide-details="auto"
          dense
          outlined
        />
      </v-col>
      <v-col sm="6">
        <v-text-field
          v-model="formData.prevFname"
          :error-messages="''"
          label="Предыдущее Имя"
          hide-details="auto"
          dense
          outlined
        />
      </v-col>
    </v-row>
    <v-btn
      class="float-right mt-5 mb-5"
      color="primary"
      @click="sendData"
    >
      Отправить
    </v-btn>
  </v-form>
</template>

<script>
import {VueMaskDirective} from "v-mask";
import citizenships from "../assets/data/citizenships.json";
import passporttypes from "../assets/data/passport-types.json";

export default {
  data() {
    return {
      citizenshipsList: citizenships,
      passportTypesList: passporttypes,
      formData: {
        sname: '',
        snameLat: '',
        fname: '',
        fnameLat: '',
        tname: '',
        prevSname: '',
        prevFname: '',
        birthday: '',
        email: '',
        sex: '',
        citizen: '',
        passportSer: '',
        passportNumber: '',
        passportDate: '',
        passportType: '',
        passportCitizen: '',
        changeName: '',
        changedFname: '',
        changedSname: '',
      }
    }
  },
  methods: {
    sendData() {
      // if (this.$refs.form.validate()) {
        console.log(this.formData);
      // }
    }
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
