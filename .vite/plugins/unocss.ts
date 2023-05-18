import unocss from 'unocss/vite'
import presetWeapp from 'unocss-preset-weapp'
import {
  transformerAttributify,
  transformerClass,
} from 'unocss-preset-weapp/transformer'

export default process.env.UNI_COMPILER !== 'nvue'
  ? unocss({
      presets: [presetWeapp()],
      transformers: [
        // https://github.com/MellowCo/unocss-preset-weapp/tree/main/src/transformer/transformerAttributify
        transformerAttributify(),
        // https://github.com/MellowCo/unocss-preset-weapp/tree/main/src/transformer/transformerClass
        transformerClass(),
      ],
      shortcuts: [['flex-center', 'flex justify-center items-center']],
      safelist: [
        ...Array.from({ length: 10 }, (_, i) => `space-x-${i + 1}`),
        ...Array.from({ length: 10 }, (_, i) => `space-y-${i + 1}`),
      ],
    })
  : undefined
