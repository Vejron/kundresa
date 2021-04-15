<template>
  <base-modal v-if="visible" @close="close(false)" empty :title="title">
    <div class="scrollable">
      <p class="text-sm md:text-base text-gray-600 mb-6">
        Om du -
        <span class="text-primary font-semibold"
          >{{ toSign.name }} {{ toSign.surname }}</span
        >
        - väljer att signera avtalet tar vi över leveransen av el till
        <span class="text-primary font-semibold">{{ toSign.address }}</span> den
        <span class="text-primary font-semibold">{{ toSign.startDate }}</span
        >. Fakturering kommer att ske månadsvis via
        <span class="text-primary font-semibold">{{ toSign.invoice }}</span>
      </p>
      <p class="text-sm md:text-base text-gray-600">
        Se
        <a
          class="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
          href="https://google.com"
          >länk</a
        >
        för fullständiga avtalsvilkor
      </p>
    </div>

    <FormulateForm
      class="pt-2"
      v-model="formData"
      @submit="sign"
      #default="{ isLoading, hasErrors }"
    >
      <FormulateInput
        type="text"
        name="pnr"
        label="Ditt personnummer"
        placeholder="xxxxxx-xxxx"
        :validation="[
          ['matches', /^(19|20)?(\d{6}([-+]|\s)\d{4}|(?!19|20)\d{10})$/],
        ]"
        :disabled="isLoading"
      />
      <div class="bg-gray-50 flex gap-6 justify-end">
        <simple-button
          :disabled="isLoading || hasErrors"
          class="flex-grow"
          primary
          rounded
          type="submit"
        >
          <div class="flex items-center justify-between">
            {{ isLoading ? "Signering pågår..." : "Signera med BankID" }}
            <transition name="fade">
              <div v-if="isLoading" class="pb-1 pr-1">
                <div class="dot-bricks"></div>
              </div>
            </transition>
          </div>
        </simple-button>
       
        <simple-button
          class="flex-shrink hidden sm:block"
          secondary
          rounded
          type="button"
          @click="close(false)"
        >
          Avbryt
        </simple-button>
      </div>
      <collapse-transition>
        <simple-alert v-if="signError" @close="signError = false" class="mt-6"
          >Något gick fel..</simple-alert
        >
      </collapse-transition>
    </FormulateForm>
  </base-modal>
</template>

<script>
/*
address: "Pastorsvägen 10"
anlaggning: "manuellt"
anlaggningsId: "735999222222222222"
bank: "NB"
city: "Umeå"
invoice: "efaktura"
mail: "name@mail.com"
name: "John"
startDate: "2021-04-27"
surname: "Doe"
tel: "0721472824"
zip: "90362"
*/
import { defineComponent, reactive, watch, ref } from "@vue/composition-api";
import { esign } from "@/services/esign.service";

export default defineComponent({
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      default: "Ingen titel satt",
    },
    toSign: {
      type: Object,
      default: () => ({
        address: "Pastorsvägen 10",
        anlaggning: "manuellt",
        anlaggningsId: "735999222222222222",
        bank: "NB",
        city: "Umeå",
        invoice: "efaktura",
        mail: "name@mail.com",
        name: "John",
        startDate: "2021-04-27",
        surname: "Doe",
        tel: "0721472824",
        zip: "90362",
      }),
    },
    pnr: String,
  },
  emits: ["close"],
  setup(props, { emit, root }) {
    const signError = ref(false);

    const theEnd = (data) => {
      root.$router.push({
        path: "/tack",
        query: {
          data: JSON.stringify(data),
        },
      });
    };

    const sign = async (data) => {
      try {
        console.log(data);
        if (
          /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
            navigator.userAgent
          )
        ) {
          // true for mobile device. try to open bankid directly
          window.open("https://app.bankid.com/?redirect=null");
        }
        
        const res = await esign({ pnr: data.pnr, tosign: props.toSign });
        console.log("got it", res.data);
        theEnd(res.data);
        close(true); // success!
      } catch (error) {
        signError.value = true;
        console.warn("failed to sign");
        //setTimeout(() => {
        //  theEnd({});
        //}, 2000);
      }
    };

    const formData = reactive({
      pnr: "",
      consent: true,
    });

    // copy pnr from signup when modal becomes visible
    watch(
      () => props.visible,
      () => {
        console.log(props.pnr);
        formData.pnr = props.pnr;
      }
    );

    const close = (e) => {
      emit("close", e);
    };

    return {
      formData,
      sign,
      close,
      signError,
    };
  },
});
</script>

<style lang="postcss" scoped>
.scrollable {
  height: 300px;
  max-height: 30vh;
  overflow-y: auto;
}
</style>
