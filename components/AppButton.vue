<script setup lang="ts">
import { RouterLink } from 'vue-router'

type Variant = 'primary' | 'gold' | 'outline' | 'whatsapp' | 'ghost'
type Size = 'md' | 'lg' | 'sm'

const props = withDefaults(
  defineProps<{
    to?: string
    href?: string
    variant?: Variant
    size?: Size
    external?: boolean
    block?: boolean
    type?: 'button' | 'submit'
    disabled?: boolean
  }>(),
  { variant: 'primary', size: 'md', external: false, block: false, type: 'button', disabled: false },
)

const base =
  'inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-green active:scale-[0.98]'

const variants: Record<Variant, string> = {
  primary: 'bg-brand-green text-white hover:bg-[#0b3230] shadow-card',
  gold: 'bg-gold text-neutral-charcoal hover:bg-[#c39f2e] shadow-card',
  outline:
    'border border-brand-green/30 text-brand-green hover:border-brand-green hover:bg-brand-green/5',
  whatsapp: 'bg-[#25D366] text-white hover:bg-[#1fb857] shadow-card',
  ghost: 'text-brand-green hover:bg-brand-green/5',
}

const sizes: Record<Size, string> = {
  sm: 'px-4 py-2 text-sm min-h-[40px]',
  md: 'px-6 py-3 text-sm sm:text-base min-h-[44px]',
  lg: 'px-7 py-3.5 text-base min-h-[48px]',
}

const classes = computed(() => [
  base,
  variants[props.variant],
  sizes[props.size],
  props.block ? 'w-full' : '',
  props.disabled ? 'pointer-events-none opacity-50' : '',
])
</script>

<template>
  <RouterLink v-if="to" :to="to" :class="classes">
    <slot />
  </RouterLink>
  <a v-else-if="href" :href="href" :class="classes" v-bind="external ? { target: '_blank', rel: 'noopener noreferrer' } : {}">
    <slot />
  </a>
  <button v-else :type="type" :class="classes">
    <slot />
  </button>
</template>
