import swaggerJSDoc from "swagger-jsdoc";

const swaggerOptions: swaggerJSDoc.Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "LinkCanopy API Documentation",
            version: "1.0.0",
            description: "API documentation for the LinkCanopy application.",
        },
        servers: [
            {
                url: "https://linkcanopy-backend.onrender.com",
                description: "Render Production Server",
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
            schemas: {
                User: {
                    type: "object",
                    properties: {
                        _id: { type: "string", example: "64f0aebc2e1234567890abcd" },
                        handle: { type: "string", example: "alejandrochacin" },
                        firstName: { type: "string", example: "Alejandro" },
                        lastName: { type: "string", example: "Chacín" },
                        phone: { type: "string", example: "5512345678" },
                        email: { type: "string", example: "alejandr28chac1n@gmail.com" },
                        description: {
                            type: "string",
                            example: "Desarrollador backend especializado en Node.js",
                        },
                        img: {
                            type: "string",
                            example: "https://cdn.img.com/profile.jpg",
                        },
                        links: {
                            type: "string",
                            example:
                                '["https://github.com/aChacin8","https://www.linkedin.com/in/alejandro-chacin-nava-296907363/"]',
                        },
                    },
                },
            },
        },
    },
    apis: ["./src/doc/paths/*.yaml"],
};

export const swaggerSpec = swaggerJSDoc(swaggerOptions);
