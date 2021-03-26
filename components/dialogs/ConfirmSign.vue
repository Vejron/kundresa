<template>
  <base-modal v-if="visible" @close="close(false)" empty :title="title">
    <div class="scrollable">
      <p class="text-sm leading-5 text-gray-600 mb-6">
        Vi kommer att ta över leveransen den {{ date }} och om allt går bra
        behöver du inte göra nånting. Fakturering kommer att ske på valt vis.
        bla bla. Vi skickar även en bekräftelse till dig på mail avtalet i text
        och massa annat ska in här gissar jag

        Vi kommer att ta över leveransen den {{ date }} och om allt går bra
        behöver du inte göra nånting. Fakturering kommer att ske på valt vis.
        bla bla. Vi skickar även en bekräftelse till dig på mail avtalet i text
        och massa annat ska in här gissar jag

        Vi kommer att ta över leveransen den {{ date }} och om allt går bra
        behöver du inte göra nånting. Fakturering kommer att ske på valt vis.
        bla bla. Vi skickar även en bekräftelse till dig på mail avtalet i text
        och massa annat ska in här gissar jag
      </p>
    </div>

    <FormulateForm
      class="pt-2"
      v-model="formData"
      @submit="sign"
      #default="{ isLoading, hasErrors }"
    >
      <FormulateInput
        name="consent"
        type="checkbox"
        label="Jag godkänner allt!"
        validation="required"
        :disabled="isLoading"
      />
      <FormulateInput
        class="mb-3"
        type="text"
        name="pnr"
        label="Personnummer"
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
    </FormulateForm>
  </base-modal>
</template>

<script>
import { defineComponent, reactive, watch } from "@vue/composition-api";
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
        console.log(data);
        const res = await esign({ pnr: data.pnr, tosign: props.toSign });
        console.log("got it", res.data);
        close(true); // success!
      } catch (error) {
        console.warn("failed to sign");
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
    };
  },
});
</script>

<style lang="postcss" scoped>
.scrollable {
  height: 300px;
  max-height: 40vh;
  overflow-y: scroll;
}
</style>
