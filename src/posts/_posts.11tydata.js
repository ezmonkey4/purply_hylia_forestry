// _posts.11tydata.js
module.exports = {
    eleventyComputed: {
        permalink: data => {
            let postPermalink =
                "/blog/{{ page.date | date: '%Y/%m/%d' }}/{{ slug }}/";

            if (process.env.ELEVENTY_ENV !== "production") return postPermalink;
            else return data.draft ? false : postPermalink;
        }
    }
};