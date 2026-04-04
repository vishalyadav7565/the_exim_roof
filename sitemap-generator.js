// sitemap-generator.js

import pkg from "react-router-sitemap";
const { default: Sitemap } = pkg;

const router = [
  "/", 
  "/about",
  "/contact",
  "/services",
  "/blog",
  "/blog/:id"
];

function generateSitemap() {
  const sitemap = new Sitemap(router)
    .build("https://theeximroof.com")
    .save("./public/sitemap.xml");
}

generateSitemap();
