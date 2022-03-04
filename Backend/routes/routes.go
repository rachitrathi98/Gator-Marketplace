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
	app.Get("/api/login-success", controllers.LoginSuccess)
	app.Post("/api/post-listing", controllers.AddListing)
	app.Put("/api/update-listing/:id", controllers.UpdateListing)
	app.Get("/api/get-listings", controllers.GetListing)
	app.Delete("/api/delete-listing/:id", controllers.DeleteListing)
	app.Get("/api/get-listings-landing", controllers.GetListingLanding)
}
