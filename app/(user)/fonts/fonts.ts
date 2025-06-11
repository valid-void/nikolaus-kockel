import localFont from "next/font/local";

export const primaryFont = localFont({
    src: [
      {
        path: '../fonts/Atkinson-Hyperlegible-Regular-102a.woff2',
        weight: '400',
        style: 'normal',
      },
      {
        path: '../fonts/Atkinson-Hyperlegible-Italic-102a.woff2',
        weight: '400',
        style: 'italic',
      },
      {
        path: '../fonts/Atkinson-Hyperlegible-Bold-102a.woff2',
        weight: '700',
        style: 'normal',
      },
      {
        path: '../fonts/Atkinson-Hyperlegible-BoldItalic-102a.woff2',
        weight: '700',
        style: 'italic',
      },
    ],
    // '../fonts/Atkinson-Hyperlegible-Regular-102a.woff2',
    // default, can also use "swap" to ensure custom font always shows
    display: 'swap',
    variable: '--font-primary',
  });
  
export const secondaryFont = localFont({
    src: [
      {
        path: '../fonts/8bitOperatorPlus-Regular.ttf',
        weight: '400',
        style: 'normal',
      }
    ],
    // default, can also use "swap" to ensure custom font always shows
    display: 'swap',
    variable: '--font-secondary',
  });