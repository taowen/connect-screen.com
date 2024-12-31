import { createReadStream, createWriteStream, mkdirSync, existsSync } from 'fs';
import { join } from 'path';

const CHUNK_SIZE = 10 * 1024 * 1024; // 10MB in bytes
const OUTPUT_DIR = 'public/static/download-latest';

export async function splitFile(inputFilePath: string): Promise<string[]> {
    // Create output directory if it doesn't exist
    if (!existsSync(OUTPUT_DIR)) {
        mkdirSync(OUTPUT_DIR, { recursive: true });
    }

    return new Promise((resolve, reject) => {
        const chunks: string[] = [];
        let chunkIndex = 0;
        let currentChunkSize = 0;
        
        let currentWriteStream = createWriteStream(
            join(OUTPUT_DIR, `chunk_${chunkIndex}.dat`)
        );
        
        const readStream = createReadStream(inputFilePath);

        readStream.on('data', (chunk: Buffer) => {
            if (currentChunkSize + chunk.length > CHUNK_SIZE) {
                // Calculate how much of this chunk can fit in the current file
                const remainingSpace = CHUNK_SIZE - currentChunkSize;
                const firstPart = chunk.slice(0, remainingSpace);
                const secondPart = chunk.slice(remainingSpace);

                // Write the first part to current chunk
                currentWriteStream.write(firstPart);
                
                // Close current chunk
                currentWriteStream.end();
                chunks.push(`chunk_${chunkIndex}.dat`);

                // Start new chunk
                chunkIndex++;
                currentChunkSize = secondPart.length;
                currentWriteStream = createWriteStream(
                    join(OUTPUT_DIR, `chunk_${chunkIndex}.dat`)
                );
                currentWriteStream.write(secondPart);
            } else {
                currentWriteStream.write(chunk);
                currentChunkSize += chunk.length;
            }
        });

        readStream.on('end', () => {
            currentWriteStream.end();
            chunks.push(`chunk_${chunkIndex}.dat`);
            resolve(chunks);
        });

        readStream.on('error', reject);
    });
}

if (!process.argv[2]) {
    console.error('missing file path')
    process.exit(1)
}
splitFile(process.argv[2])
