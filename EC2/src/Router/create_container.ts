import express, { Request, Response, Router } from "express";
import Services from "../Services";

const creat_container: Router = express.Router();

creat_container.post('/', async (req: Request, res: Response) => {
    try {
        // Validate required fields
        if (!req.body.name || !req.body.username || !req.body.password) {
             res.status(400).json({
                status: "error",
                message: "Name, username, and password are required"
            });
        }

        // Check if name is available
        const idAvailable = await Services.get_ID(req.body.name);
        if (idAvailable) {
            res.status(400).json({
                status: "error",
                message: "Please change the name, this name is not available!"
            });
        }

        // Process ports input
        let ports: number[] = [];

        if (req.body.ports) {
            // Handle case where ports is a comma-separated string
            if (typeof req.body.ports === 'string') {
                ports = req.body.ports.split(',')
                    .map((port: string) => port.trim())
                    .filter((port: string) => port !== '')
                    .map((port: string) => {
                        const portNum = parseInt(port, 10);
                        if (isNaN(portNum) || portNum < 1 || portNum > 65535) {
                            throw new Error(`Invalid port number: ${port}`);
                        }
                        return portNum;
                    });
            }
            // Handle case where ports is already an array
            else if (Array.isArray(req.body.ports)) {
                ports = req.body.ports.map((port: any) => {
                    const portNum = typeof port === 'string' ? parseInt(port, 10) : port;
                    if (isNaN(portNum) || portNum < 1 || portNum > 65535) {
                        throw new Error(`Invalid port number: ${port}`);
                    }
                    return portNum;
                });
            }
        }

        // Create container object
        const new_container = {
            name: req.body.name,
            username: req.body.username,
            password: req.body.password,
            ports: ports
        };

        // Create and start container
        const id = await Services.create_container(new_container);
        await Services.start_container(id);
        
        res.json({
            status: "ok",
            id: id
        });

    } catch (error) {
        console.error("Request processing error:", error);
        const statusCode = error instanceof Error && error.message.includes('Invalid') ? 400 : 500;
        res.status(statusCode).json({
            status: "error",
            message: "Failed to process request",
            details: error instanceof Error ? error.message : String(error)
        });
    }
});

export default creat_container;