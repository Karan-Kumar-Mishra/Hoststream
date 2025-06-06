import Docker from 'dockerode';

export default async function checkDockerImageExists(imageName: string): Promise<boolean> {
    try {
        const docker = new Docker();
        const image = docker.getImage(imageName);
    
        await image.inspect();
        return true;
    } catch (error) {
        if ((error as any).statusCode === 404) {
            return false;
        }
        console.error('Error checking Docker image:', error);
        throw error;
    }
}