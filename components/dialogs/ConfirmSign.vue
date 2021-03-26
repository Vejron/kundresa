<template>
  <base-modal v-if="visible" @close="close(false)" empty :title="title">
    <p class="text-sm leading-5 text-gray-600 mb-6">
      Vi kommer att ta över leveransen den {{ date }} och om allt går bra
      behöver du inte göra nånting. Fakturering kommer att ske på valt vis. bla
      bla. Vi skickar även en bekräftelse till dig på mail avtalet i text och
      massa annat ska in här gissar jag
    </p>
    <FormulateForm
      v-model="formData"
      @submit="sign"
      #default="{ isLoading, hasErrors }"
    >
      <FormulateInput
        name="consent"
        type="checkbox"
        label="ni får göra vad ni vill!"
        validation="required"
      />
      <FormulateInput
        class="mb-3"
        type="text"
        name="pnr"
        label="Personnummer"
        placeholder="xxxxxx-xxxx"
        :validation="[['matches', /^(19|20)?(\d{6}([-+]|\s)\d{4}|(?!19|20)\d{10})$/]]"
      />

      <div
        class="bg-gray-50 px-4 -mx-4 -mb-6 py-6 sm:px-5 flex gap-6 justify-end"
      >
        <simple-button
          :disabled="isLoading || hasErrors"
          class="flex-grow"
          primary
          rounded
          type="submit"
        >
        {{ isLoading? 'Signering pågår...': 'Signera med BankID'}}
          
        </simple-button>
        <simple-button
          class="flex-shrink"
          secondary
          rounded
          type="button"
          @click="close(false)"
        >
          Avbryt
        </simple-button>
      </div>
    </FormulateForm>
  </base-modal>
</template>

<script>
import { defineComponent, reactive, watch} from "@vue/composition-api";
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
    toSign: Object,
    pnr: String,
  },
  emits: ["close"],
  setup(props, { emit }) {
  
    const sign = async (data) => {
      try {
        console.log(data)
        const res = await esign({ pnr: data.pnr, tosign: props.toSign });
        console.log("got it", res.data);
        close(true) // success!
      } catch (error) {
        console.warn("failed to sign");
      }
    };

    const formData = reactive({
      pnr: '',
      consent: true,
    });
    
    watch(() => props.visible, () => {
      console.log(props.pnr)
      formData.pnr = props.pnr
    })

    const close = (e) => {
      emit("close", e);
    };

    
    
    return {
      formData,
      sign,
      close,
    };
  },
});
</script>
