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
	app.Get("/api/get-listing/:id", controllers.GetListingById)
	app.Delete("/api/delete-listing/:id", controllers.DeleteListing)
	app.Get("/api/get-listings-landing", controllers.GetListingLanding)
	app.Post("/api/listing-request", controllers.ListingRequest)
	app.Post("/api/create-payment-intent", controllers.CreatePaymentIntent)
	app.Post("/api/sold-listing", controllers.SoldListing)
	app.Get("/api/get-sold-listing", controllers.GetSoldListing)

}
