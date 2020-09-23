const environment = process.env.ELEVENTY_ENV;
const PROD_ENV = 'prod';
const prodUrl = 'https://purplypacifier.com';
const devUrl = 'http://localhost:8080';
const baseUrl = environment === PROD_ENV ? prodUrl : devUrl;
const isProd = environment === PROD_ENV;

const folder = {
  assets: 'assets',
};

const dir = {
  img: `/${folder.assets}/img/`,
}

module.exports = {
  siteName: 'Purply Pacifier',
  author: 'Luis M',
  environment,
  isProd,
  folder,
  base: {
    site: baseUrl,
    img: `${baseUrl}${dir.img}`,
  },
  tracking: {
      gtag: 'UA-154998908-3',
  },
};