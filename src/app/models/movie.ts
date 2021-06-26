export interface Movie {
    id: string;
    title: string;
    duration: number;
    airDate: string;
    videoPath: string;
    imagePath: string;
    subsPath: string;
    // Theese are just for convinience
    videoFile?: File;
    imageFile?: File;
    subsFile?: File
}
