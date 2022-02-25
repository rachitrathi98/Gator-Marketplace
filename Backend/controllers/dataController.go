package controllers

import (
	"GatorMarketPlace/database"
	"GatorMarketPlace/models"
	"context"
	"time"

	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func AddListing(c *fiber.Ctx) error {

	cookie := c.Cookies("jwt")
	_, err := ValidateToken(cookie)
	if err != nil {
		return c.JSON("Error user not Authenticated")
	}

	var listing models.Listing
	er := c.BodyParser(&listing)

	if er != nil {
		return c.SendString("Body is Empty")
	}

	listing.Id = primitive.NewObjectID()
	listingsCollections := database.MI.Db.Collection("listings")
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	_, e := listingsCollections.InsertOne(ctx, listing)

	if e != nil {
		return c.SendString("error")
	}

	return c.JSON(&fiber.Map{
		"res": "Listing Created",
	})
}

func UpdateListing(c *fiber.Ctx) error {
	cookie := c.Cookies("jwt")
	_, err := ValidateToken(cookie)
	if err != nil {
		return c.JSON("Error user not Authenticated")
	}

	var listing models.Listing

	er := c.BodyParser(&listing)

	if er != nil {
		return c.SendString("Body is Empty")
	}

	listing.Id, _ = primitive.ObjectIDFromHex(c.Params("id"))
	listingsCollections := database.MI.Db.Collection("listings")
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	_, e := listingsCollections.UpdateOne(ctx, bson.M{"_id": listing.Id}, bson.M{"$set": listing})

	if e != nil {
		return c.SendString("error")
	}

	return c.JSON(&fiber.Map{
		"res": "Listing Updated",
	})

}
