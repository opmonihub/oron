import { useAppConfig } from '@nuxt/ui/runtime/vue/composables/useAppConfig.js'
import { createSharedComposable, useColorMode, useStorage } from '@vueuse/core'
import { watch } from 'vue'

// Palettes from the official Nuxt UI Vue dashboard template.
const colors = [
  'red',
  'orange',
  'amber',
  'yellow',
  'lime',
  'green',
  'emerald',
  'teal',
  'cyan',
  'sky',
  'blue',
  'indigo',
  'violet',
  'purple',
  'fuchsia',
  'pink',
  'rose',
]
const neutrals = ['slate', 'gray', 'zinc', 'neutral', 'stone', 'taupe', 'mauve', 'mist', 'olive']

function initialAppearance(): 'light' | 'dark' | 'auto' {
  if (typeof document === 'undefined') return 'auto'

  const preference = document.cookie.match(/(?:^|;\s*)appearance=(light|dark|system)(?:;|$)/)?.[1]

  return preference === 'light' || preference === 'dark' ? preference : 'auto'
}

export const useTheme = createSharedComposable(() => {
  const appConfig = useAppConfig()
  const primary = useStorage('oron-theme-primary', 'green')
  const neutral = useStorage('oron-theme-neutral', 'zinc')
  const { store: appearance } = useColorMode({ initialValue: initialAppearance() })

  watch(
    primary,
    (color) => {
      if (!colors.includes(color)) primary.value = 'green'
      appConfig.ui.colors.primary = primary.value
    },
    { immediate: true },
  )

  watch(
    neutral,
    (color) => {
      if (!neutrals.includes(color)) neutral.value = 'zinc'
      appConfig.ui.colors.neutral = neutral.value
    },
    { immediate: true },
  )

  watch(
    appearance,
    (mode) => {
      if (!['light', 'dark', 'auto'].includes(mode)) {
        appearance.value = 'auto'
        return
      }

      if (typeof document !== 'undefined') {
        const preference = mode === 'auto' ? 'system' : mode
        document.cookie = `appearance=${preference}; path=/; max-age=31536000; SameSite=Lax`
      }
    },
    { immediate: true },
  )

  return { colors, neutrals, primary, neutral, appearance }
})
