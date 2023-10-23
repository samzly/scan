module.exports = {
  siteMetadata: {
    title: `scan`,
    siteUrl: `https://scan.ru`
  },
  plugins: [
      "gatsby-plugin-styled-components",
      {
        resolve: 'gatsby-plugin-manifest',
        options: {
          icon: 'src/assets/images/favicon.png',
        },
      },
    ]
};