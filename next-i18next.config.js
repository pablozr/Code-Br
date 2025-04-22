/** @type {import('next-i18next').UserConfig} */
module.exports = {
  // Não usar a configuração i18n aqui, pois estamos usando middleware
  // para lidar com a internacionalização
  localePath: './public/locales',
  reloadOnPrerender: process.env.NODE_ENV === 'development',
}
