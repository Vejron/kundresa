<template>
  <base-modal v-if="visible" @close="close(false)" :title="title">
    <p class="text-sm leading-5 text-gray-600">
      Vi kommer att ta över leveransen den {{ date }} och om allt går bra
      behöver du inte göra nånting. Fakturering kommer att ske på valt vis. bla
      bla. Vi skickar även en bekräftelse till dig på mail
    </p>
    <FormulateInput
      class="my-3"
      type="text"
      v-model="pnr"
      label="Personnummer"
      placeholder="xxxxxx-xxxx"
      validation="required"
    />
    <template v-slot:footer>
      <simple-button class="flex-grow" primary rounded @click="sign">
        Signera med BankID
      </simple-button>
      <simple-button
        class="flex-shrink"
        secondary
        rounded
        @click="close(false)"
      >
        Avbryt
      </simple-button>
    </template>
  </base-modal>
</template>

<script>
import { defineComponent, ref, watch } from "@vue/composition-api";
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
    date: {
      type: String,
      default: "xx-xx-xx",
    },
    data: Object
  },
  emits: ["close"],
  setup(props, { emit }) {
    const pnr = ref('');
    const sign = async () => {
      try {
        const res = await esign({ pnr: pnr.value, tosign: "blabla" });
        console.log("got it", res.data);
      } catch (error) {
        console.warn("failed to sign");
      }
    };

    const close = (e) => {
      emit("close", e);
    };
    return {
      sign,
      close,
      pnr,
    };
  },
});
</script>
