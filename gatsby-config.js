require(`dotenv`).config()

const shouldAnalyseBundle = process.env.ANALYSE_BUNDLE

module.exports = {
  siteMetadata: {
    // You can overwrite values here that are used for the SEO component
    // You can also add new values here to query them like usual
    // See all options: https://github.com/LekoArts/gatsby-themes/blob/main/themes/gatsby-theme-minimal-blog/gatsby-config.js
    siteTitle: `Ankit Chouhan`,
    siteTitleAlt: `Ankit Chouhan - Frontend Developer`,
    siteHeadline: `Ankit Chouhan`,
    siteUrl: `https://ankitchouhan.netlify.app`,
    siteDescription: `Ankit's space about JS Ecosystem, web performance, react, bundling and other stuff. Frontend Developer at Groww, building design system.`,
    siteLanguage: `en`,
    siteImage: `/favicon.png`,
    author: `@ankit`,
  },
  plugins: [
    {
      resolve: `@lekoarts/gatsby-theme-minimal-blog`,
      // See the theme's README for all available options
      options: {
        navigation: [
          {
            title: `Blog`,
            slug: `/blog`,
          },
          {
            title: `About`,
            slug: `/about`,
          },
        ],
        externalLinks: [
          {
            name: `Twitter`,
            url: `https://twitter.com/ankit__chouhan`,
          },
          {
            name: `Homepage`,
            url: `https://ankitchouhan.netlify.app`,
          },
        ],
      },
    },
    {
      resolve: `gatsby-omni-font-loader`,
      options: {
        enableListener: true,
        preconnect: [`https://fonts.gstatic.com`],
        interval: 300,
        timeout: 30000,
        // If you plan on changing the font you'll also need to adjust the Theme UI config to edit the CSS
        // See: https://github.com/LekoArts/gatsby-themes/tree/main/examples/minimal-blog#changing-your-fonts
        web: [
          {
            name: `IBM Plex Sans`,
            file: `https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&display=swap`,
          },
        ],
      },
    },
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Ankit Chouhan`,
        short_name: `Ankit Chouhan`,
        description: `Ankit's space about JS Ecosystem, web performance, react, bundling and other stuff. Frontend Developer at Groww, building design system.`,
        start_url: `/`,
        background_color: `#fff`,
        // This will impact how browsers show your PWA/website
        // https://css-tricks.com/meta-theme-color-and-trickery/
        // theme_color: `#6B46C1`,
        display: `standalone`,
        icons: [
          {
            src: `/favicon.png`,
            sizes: `512x512`,
            type: `image/png`,
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title: siteTitle
                description: siteDescription
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allPost } }) =>
              allPost.nodes.map((post) => {
                const url = site.siteMetadata.siteUrl + post.slug
                const content = `<p>${post.excerpt}</p><div style="margin-top: 50px; font-style: italic;"><strong><a href="${url}">Keep reading</a>.</strong></div><br /> <br />`

                return {
                  title: post.title,
                  date: post.date,
                  excerpt: post.excerpt,
                  url,
                  guid: url,
                  custom_elements: [{ "content:encoded": content }],
                }
              }),
            query: `
              {
                allPost(sort: { fields: date, order: DESC }) {
                  nodes {
                    title
                    date(formatString: "MMMM D, YYYY")
                    excerpt
                    slug
                  }
                }
              }
            `,
            output: `rss.xml`,
            title: `Ankit Chouhan - Blogs`,
          },
        ],
      },
    },
    `gatsby-plugin-gatsby-cloud`,
    shouldAnalyseBundle && {
      resolve: `gatsby-plugin-webpack-bundle-analyser-v2`,
      options: {
        analyzerMode: `static`,
        reportFilename: `_bundle.html`,
        openAnalyzer: false,
      },
    },
  ].filter(Boolean),
}
