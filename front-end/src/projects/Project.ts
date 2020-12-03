export interface StrapiImageFormat {
    name: string;
    hash: string;
    ext: string;
    mime: string;
    width: number;
    height: number;
    size: number;
    path: string | null;
    url: string;
}
export interface StrapiImage {
    id: number;
    name: string;
    alternativeText: string;
    caption: string;
    width: number;
    height: number;
    formats: {
        thumbnail: StrapiImageFormat;
        small: StrapiImageFormat;
        medium: StrapiImageFormat;
        large: StrapiImageFormat;
    }
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl: string | null;
    provider: string;
    provider_metadata: null,
    created_at: string;
    updated_at: string;
}
export interface Project {
    title: string;
    shortDescription: string;
    imageGallery: StrapiImage[];
    coverImage: StrapiImage;
    projectLogo: StrapiImage;
    projectLogoBackgroundColor: string;
    categories: string;
    /** Markdown description for project */
    description: string;
    id: number;
    published_at: string;
    created_at: string;
    updated_at: string;
}
