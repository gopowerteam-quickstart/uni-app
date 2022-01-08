const {
    defaultPreset,
    createPreset
} = require('tailwindcss-miniprogram-preset')

const preset = createPreset({})

preset.content = preset.purge.content
delete preset.darkMode
delete preset.purge

/** @type {import('@types/tailwindcss/tailwind-config').TailwindConfig} */
module.exports = {
    content: defaultPreset.purge.content,
    presets: [preset]
}
