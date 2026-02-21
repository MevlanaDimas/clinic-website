import { MetadataRoute } from "next";


export default function robots(): MetadataRoute.Robots {
    const productionUrl = process.env.NEXT_PUBLIC_PRODUCTION_URL || 'https://clinic-admin-panel.id';

    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: [
                    '/server-sitemap.xml',
                ]
            }
        ],
        sitemap: `${productionUrl}/sitemap.xml`
    };
}