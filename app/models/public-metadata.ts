export interface PublicMetadata {
    movies: Record<string, PublicMovie>;
}

export interface PublicMovie {
    id: string;
    title: string;
    duration: string;
    airDate: string;
}

