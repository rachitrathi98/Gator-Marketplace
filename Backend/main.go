package main

import (
	"GatorMarketPlace/database"
	"GatorMarketPlace/routes"
	"log"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/joho/godotenv"
)

func main() {

	err := godotenv.Load()
	if err != nil {
		log.Fatalf("Error loading .env file")
	}

	app := fiber.New()

	app.Use(cors.New(cors.Config{
		AllowCredentials: true,
	}))
	// app.Use(cors.New())

	database.Connect()
	routes.Setup(app)
	app.Listen(":" + os.Getenv("PORT"))
}
