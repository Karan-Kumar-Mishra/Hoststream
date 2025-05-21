interface StaticSite {
    id: string;
    site_folder: string;
    location?: string; // Optional property
}

interface Services {
    static_site: StaticSite[];
}

interface User {
    id: string;
    services: Services;
}
export {
    StaticSite,
    Services,
    User
}