package routes

import (
	"GatorMarketPlace/controllers"

	"github.com/gofiber/fiber/v2"
)

func Setup(app *fiber.App) {

	app.Get("/google/login", controllers.GoogleLogin())
	app.Get("/google/callback", controllers.GoogleCallback())
	app.Get("/api/logout", controllers.Logout)
	app.Get("/api/user", controllers.User)

}
