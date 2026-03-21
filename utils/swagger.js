import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Blog API",
      version: "1.0.0",
      description: "A simple blog API built with Node.js and Express",
    },
    tags: [
      { name: "Blogs", description: "Blog post operations" },
      { name: "Users", description: "User authentication and management" },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: ["./routes/*.js"], // ← fixed path
};

const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;
