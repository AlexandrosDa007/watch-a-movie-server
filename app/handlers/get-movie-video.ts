import express from 'express';
import { createReadStream, statSync } from 'fs';
import { getMeta } from '../helpers/get-meta';

/**
 * Returns chunks of video data for a movie
 * @param req Express request
 * @param res Express response
 */
export function getMovieVideo(req: express.Request, res: express.Response) {
    // Ensure there is a range given for the video
    const range = req.headers.range;
    if (!range) {
        return res.status(400).send('Requires Range header!');
    }
    const metadata = getMeta();
    const id = req.params.id;
    const movie = metadata.movies[id];
    if (!movie) {
        return res.status(404).send('No movie found!');
    }

    const videoPath = movie.videoPath;

    if (!videoPath) {
        return res.status(400).send('No video path found for this movie!');
    }

    
    const videoSize = statSync(videoPath).size;

    // Parse Range
    // Example: "bytes=32324-"
    const CHUNK_SIZE = 100 ** 6; // 1MB
    const start = Number(range.replace(/\D/g, ''));
    const end = Math.min(start + CHUNK_SIZE, videoSize - 1);

    // Create headers
    const contentLength = end - start + 1;
    const headers = {
        "Content-Range": `bytes ${start}-${end}/${videoSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": contentLength,
        "Content-Type": "video/mp4",
    };

    // HTTP Status 206 for Partial Content
    res.writeHead(206, headers);

    // create video read stream for this particular chunk
    const videoStream = createReadStream(videoPath, { start, end });

    // Stream the video chunk to the client
    videoStream.pipe(res);
}


