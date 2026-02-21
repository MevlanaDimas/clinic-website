const siteUrl = process.env.NEXT_PUBLIC_API_URL || 'https://clinic.web.id';

module.exports = {
    siteUrl,
    generateRobotsTxt: true,
    sitemapSize: 7000,
    robotsTxtOptions: {
        additionalSitemaps: [
            `${siteUrl}/api/server-sitemap`
        ],
        policies: [
            { 
                userAgent: '*',
                allow: '/', 
            }
        ]
    }
}