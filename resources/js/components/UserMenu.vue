<script setup lang="ts">
  import { useTheme } from '@/composables/useTheme'
  import { logout } from '@/routes'
  import { router } from '@inertiajs/vue3'
  import type { DropdownMenuItem } from '@nuxt/ui'

  defineProps<{
    collapsed?: boolean
  }>()

  const { colors, neutrals, primary, neutral, appearance } = useTheme()
  const auth = useAuth()
  const { getInitials } = useInitials()

  const user = computed(() => ({
    name: auth.value.user.name,
    avatar: {
      text: getInitials(auth.value.user.name),
    },
  }))

  const items = computed<DropdownMenuItem[][]>(() => [
    [
      {
        type: 'label',
        label: user.value.name,
        avatar: user.value.avatar,
      },
    ],
    [
      {
        label: 'Profile',
        icon: 'i-lucide-user',
      },
      {
        label: 'Billing',
        icon: 'i-lucide-credit-card',
      },
      {
        label: 'Settings',
        icon: 'i-lucide-settings',
        to: '/settings/profile',
      },
    ],
    [
      {
        label: 'Theme',
        icon: 'i-lucide-palette',
        children: [
          {
            label: 'Primary',
            slot: 'chip',
            chip: primary.value,
            content: { align: 'center', collisionPadding: 16 },
            children: colors.map((color) => ({
              label: color,
              chip: color,
              slot: 'chip',
              type: 'checkbox' as const,
              checked: primary.value === color,
              onSelect(e: Event) {
                e.preventDefault()
                primary.value = color
              },
            })),
          },
          {
            label: 'Neutral',
            slot: 'chip',
            chip: neutral.value === 'neutral' ? 'old-neutral' : neutral.value,
            content: { align: 'end', collisionPadding: 16 },
            children: neutrals.map((color) => ({
              label: color,
              chip: color === 'neutral' ? 'old-neutral' : color,
              slot: 'chip',
              type: 'checkbox' as const,
              checked: neutral.value === color,
              onSelect(e: Event) {
                e.preventDefault()
                neutral.value = color
              },
            })),
          },
        ],
      },
      {
        label: 'Appearance',
        icon: 'i-lucide-sun-moon',
        children: [
          {
            label: 'Light',
            icon: 'i-lucide-sun',
            type: 'checkbox',
            checked: appearance.value === 'light',
            onSelect(e: Event) {
              e.preventDefault()

              appearance.value = 'light'
            },
          },
          {
            label: 'Dark',
            icon: 'i-lucide-moon',
            type: 'checkbox',
            checked: appearance.value === 'dark',
            onSelect(e: Event) {
              e.preventDefault()
              appearance.value = 'dark'
            },
          },
          {
            label: 'System',
            icon: 'i-lucide-monitor',
            type: 'checkbox',
            checked: appearance.value === 'auto',
            onSelect(e: Event) {
              e.preventDefault()
              appearance.value = 'auto'
            },
          },
        ],
      },
    ],
    [
      {
        label: 'Log out',
        icon: 'i-lucide-log-out',
        to: logout(),
        onSelect: () => handleLogout(),
      },
    ],
  ])

  function handleLogout() {
    router.flushAll()
  }
</script>

<template>
  <UDropdownMenu
    :items="items"
    :content="{ align: 'center', collisionPadding: 12 }"
    :ui="{ content: collapsed ? 'w-48' : 'w-(--reka-dropdown-menu-trigger-width)' }"
  >
    <UButton
      v-bind="{
        ...user,
        label: collapsed ? undefined : auth.user.name,
        trailingIcon: collapsed ? undefined : 'i-lucide-chevrons-up-down',
      }"
      color="neutral"
      variant="ghost"
      block
      :square="collapsed"
      class="data-[state=open]:bg-elevated"
      :ui="{
        trailingIcon: 'text-dimmed',
      }"
    />

    <template #chip-leading="{ item }">
      <div class="inline-flex size-5 shrink-0 items-center justify-center">
        <span
          :style="{
            '--chip-light': `var(--color-${(item as any).chip}-500)`,
            '--chip-dark': `var(--color-${(item as any).chip}-400)`,
          }"
          class="size-2 rounded-full bg-(--chip-light) ring ring-bg dark:bg-(--chip-dark)"
        />
      </div>
    </template>
  </UDropdownMenu>
</template>
