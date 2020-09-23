const rssPlugin = require('@11ty/eleventy-plugin-rss');
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const fs = require("fs");

// Import filters
const dateFilter = require('./src/filters/date-filter.js');
const markdownFilter = require('./src/filters/markdown-filter.js');
const w3DateFilter = require('./src/filters/w3-date-filter.js');

// Import transforms
const htmlMinTransform = require('./src/transforms/html-min-transform.js');
const parseTransform = require('./src/transforms/parse-transform.js');

// Import data files
const site = require('./src/_data/site.json');

module.exports = function(config) {
  // Filters
  config.addFilter('dateFilter', dateFilter);
  config.addFilter('markdownFilter', markdownFilter);
  config.addFilter('w3DateFilter', w3DateFilter);

  // Layout aliases
  config.addLayoutAlias('home', 'layouts/home.njk');

  // Transforms
  config.addTransform('htmlmin', htmlMinTransform);
  config.addTransform('parse', parseTransform);

  // Passthrough copy
  config.addPassthroughCopy('src/fonts');
  config.addPassthroughCopy('src/images');
  config.addPassthroughCopy('src/js');
  config.addPassthroughCopy('src/admin/config.yml');
  config.addPassthroughCopy('src/admin/previews.js');
  config.addPassthroughCopy('node_modules/nunjucks/browser/nunjucks-slim.js');

  const now = new Date();

  // Custom collections
  const livePosts = post => post.date <= now && !post.data.draft;
  //const bestPost = post => post.data.tags.indexOf('best') >= 0 ;
  const bestPost = post => post.data.best;
  const lazyImagesPlugin = require('eleventy-plugin-lazyimages');
  config.addCollection('posts', collection => {
    return [
      ...collection.getFilteredByGlob('./src/posts/*.md').filter(livePosts)
    ].reverse();
  });

  config.addCollection('postFeed', collection => {
    return [...collection.getFilteredByGlob('./src/posts/*.md').filter(livePosts)]
      .reverse()
      .slice(0, site.maxPostsPerPage);
  });

  config.addCollection('bestOf', collection => {
    return [...collection.getFilteredByGlob('./src/posts/*.md').filter(bestPost)]
      //.reverse()
      .slice(0, site.maxPostsPerPage);
  });

  config.addLiquidShortcode("ahref", function () {
    var many = `<a href="`
    many += arguments[1]
    many += `" target="`
    many += arguments[2] 
    many += `" rel="`
    many += arguments[3] 
    many += `">`
    many += arguments[0] 
    many += `</a>`
    return many
  });



  config.addLiquidShortcode("img", function () {
    var many = `<a href="`
    many += arguments[1]
    many += `" target="`
    many += arguments[2] 
    many += `" rel="`
    many += arguments[3] 
    many += `">`
    many += arguments[0] 
    many += `</a>`
    return many
  });



  config.addLiquidShortcode("sliderTop", function () {
    var many = `<div class="slideshow-container"
      style="max-width:1000px;position:relative;margin:auto;">`
      return many
  });

  config.addLiquidShortcode("sliderMiddle", function () {
    var many = ``
      many +=`<div style="display:none;" class="` 
      many += arguments[0] 
      many +=`"> <p style="text-align:center"> <a href="`
      many += arguments[2] 
      many +=`" 
        rel='sponsored' target="_blank"><img src="`
      many += arguments[1] 
      many += `"  
        style="vertical-align: middle; display: block; margin-left: auto; margin-right: auto;"
        alt="`
      many += arguments[3]
      many += `"
      /><figcaption>`
      many += arguments[3]
      many += `</figcaption>
      </a>
      </p>
        </div>`
    return many
  });
  config.addLiquidShortcode("sliderBottom", function () {
    var many = ``
    many +=`<a class="prev" onclick="plusSlides(-1, '`
    many += parseInt(arguments[0]) -1
    many += `')"
        style="
  background-color: #f1f1f1;
  color:black;
  cursor: pointer;
  position: absolute;
  top: 50%;
  width: auto;
  padding: 16px;
  margin-top: -22px;
  color: white;
  font-weight: bold;
  font-size: 18px;
  transition: 0.6s ease;
  border-radius: 0 3px 3px 0;
  user-select: none;
        " 
        >&#10094;</a>
        <a class="next" onclick="plusSlides(1, '`
        many += parseInt(arguments[0]) -1 
        many += `')"
        style="
  background-color: #f1f1f1;
  color:black;
          right: 0; border-radius: 3px 0 0 3px;
  cursor: pointer;
  position: absolute;
  top: 50%;
  width: auto;
  padding: 16px;
  margin-top: -22px;
  color: white;
  font-weight: bold;
  font-size: 18px;
  transition: 0.6s ease;
  border-radius: 0 3px 3px 0;
  user-select: none;
        "
        >&#10095;</a>
      </div>
      `
      return many
  });
  config.addLiquidShortcode("sliderJs", function () {
    var many = ``
    many +=`<script>
      var slideIndex = [1,1,1,1,1,1,1,1,1,1];
      var slideClass = ["mySlides1","mySlides2","mySlides3","mySlides4","mySlides5",
      "mySlides6","mySlides7","mySlides8","mySlides9"]
      showSlides(1, 0);
      showSlides(1, 1);
      showSlides(1, 2);
      showSlides(1, 3);
      showSlides(1, 4);
      showSlides(1, 5);
      showSlides(1, 6);
      showSlides(1, 7);
      showSlides(1, 8);
      showSlides(1, 9);
      showSlides(1, 10);
      function plusSlides(n, no) {
        var x = document.getElementsByClassName(slideClass[no]);
        if (slideIndex[no] + n > x.length) { n= 0}    
        if (slideIndex[no] + n < 1) {n=0}
        showSlides(slideIndex[no] += n, no);
      }
      function showSlides(n, no) {
        var i;
        var x = document.getElementsByClassName(slideClass[no]);
        //if (n > x.length) {slideIndex[no] = 1}    
        //if (n < 1) {slideIndex[no] = x.length}
        for (i = 0; i < x.length; i++) {
          x[i].style.display = "none";  
        }
        x[slideIndex[no]-1].style.display = "block";  
      }
      </script> `
    console.log(many)
    return many

  });


  // Plugins
  config.addPlugin(rssPlugin);
  config.addPlugin(syntaxHighlight);
  module.exports = function (eleventyConfig) {
    eleventyConfig.addPlugin(lazyImagesPlugin);
  };
  // 404 
  config.setBrowserSyncConfig({
    callbacks: {
      ready: function(err, browserSync) {
        const content_404 = fs.readFileSync('dist/404.html');

        browserSync.addMiddleware("*", (req, res) => {
          // Provides the 404 content without redirect.
          res.write(content_404);
          res.end();
        });
      }
    }
  });

  return {
    dir: {
      input: 'src',
      output: 'dist'
    },
    passthroughFileCopy: true
  };


  
};
