# Technical description

### Development workflow

In order to make development as quick and easy as possible we utilized SCSS (a superset of CSS that compiles into CSS).
This allows our group members to work on their own pages in isolation without merge conflics.

### Browser support

All scss files are transpiled at build time to browser compatible css with source maps. In addition we auto-prefix all css properties for older browser support.

All Javascript is transpiled using Babel and modern API's like the `IntersectionObserver` is polyfilled to improve browser support before 2015.

### Size & Performance

Due to our use of sass we are able split our scss into multiple css files for the different pages. This improves page load times.
We also minify all JS and CSS at build time to reduce load times even further.

In addition to this we decided to deploy it on Vercel (free of charge), this allows us to make use of Vercel's Global CDN network (Our users will recieve content from the closest possible server). This is especially important for users with slower internet connections.
