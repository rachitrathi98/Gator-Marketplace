package controllers

import (
	"GatorMarketPlace/database"
	"GatorMarketPlace/models"
	"context"
	"time"

	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func ListingRequest(c *fiber.Ctx) error {

	cookie := c.Cookies("jwt")
	_, err := ValidateToken(cookie)
	if err != nil {
		return c.JSON("Error user not Authenticated")
	}

	var request models.Requests
	er := c.BodyParser(&request)

	if er != nil {
		return c.SendString("Body is Empty")
	}
	// fmt.Print(request.Title)
	// fmt.Print(request.Description)
	// fmt.Print(request.Location)
	// fmt.Print(request.Price)
	// fmt.Print(request.Buyer)
	// fmt.Print(request.Seller)
	// fmt.Print(request.ListingId)
	// fmt.Print(request.Status)
	request.Id = primitive.NewObjectID()
	requestsCollections := database.MI.Db.Collection("requests")
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	_, e := requestsCollections.InsertOne(ctx, request)

	if e != nil {
		return c.SendString("error")
	}

	return c.JSON(&fiber.Map{
		"res": "Request Created",
	})
}
