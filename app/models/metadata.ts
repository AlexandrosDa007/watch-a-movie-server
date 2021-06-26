export interface Metadata {
    movies: Record<string, Movie>;
}

export interface Movie {
    id: string;
    title: string;
    duration: string;
    airDate: string;
    videoPath: string;
    imagePath: string;
    subsPath: string;
}
