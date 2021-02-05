<template>
    <component
        class="h-10 px-5 m-2 text-red-100 transition-colors duration-150 bg-red-700 rounded-lg focus:ring hover:bg-red-800"

        :aria-label="ariaLabel"
        :class="classes"
        :disabled="disabled || loading"
        :href="isAnchor ? (disabled ? null : href) : null"
        :is="isAnchor ? 'a' : 'button'"
        :type="isAnchor ? null : buttonType"

        @click="onClick"
    >
        <div class="ui-icon-button__icon" v-if="icon || $slots.default">
            <slot>
                <!--ui-icon :icon="icon"></ui-icon-->
            </slot>
        </div>

        <!--ui-progress-circular
            class="ui-icon-button__progress"

            :color="progressColor"
            :size="size === 'large' ? 24 : 18"
            :stroke="4.5"

            v-if="loading"
        ></ui-progress-circular-->
    </component>
</template>

<script>

export default {
    name: 'u-button',
    props: {
        type: {
            type: String,
            default: 'primary' // 'primary' or 'secondary'
        },
        buttonType: String,
        href: String,
        color: {
            type: String,
            default: 'default' // 'default', 'primary', 'accent', 'green', 'orange', or 'red'
        },
        size: {
            type: String,
            default: 'normal' // 'mini', 'small', normal', or 'large'
        },
        icon: String,
        ariaLabel: String,
        loading: {
            type: Boolean,
            default: false
        },
     
        disabled: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        classes() {
            return [
                `ui-icon-button--type-${this.type}`,
                `ui-icon-button--color-${this.color}`,
                `ui-icon-button--size-${this.size}`,
                { 'is-anchor': this.isAnchor },
                { 'is-loading': this.loading },
                { 'is-disabled': this.disabled || this.loading },
                { 'has-dropdown': this.hasDropdown }
            ];
        },
        isAnchor() {
            return this.href !== undefined;
        },
        progressColor() {
            if (this.type === 'primary') {
                if (this.color === 'default' || this.color === 'black') {
                    return 'black';
                }
                return 'white';
            }
            if (this.color === 'white') {
                return 'white';
            }
            return 'black';
        }
    },
    methods: {
        onClick(e) {
            this.$emit('click', e);
        },
    },
};
</script>