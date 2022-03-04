package main

import (
	"GatorMarketPlace/database"
	"context"
	"net/http/httptest"
	"testing"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/stretchr/testify/assert" // add Testify package
	"go.mongodb.org/mongo-driver/bson"
)

func TestGetListing(t *testing.T) {

	tests := []struct {
		description  string // description of the test case
		route        string // route path to test
		expectedCode int    // expected HTTP status code
	}{
		// First test case
		{
			description:  "GET HTTP status 200",
			route:        "/get-listings",
			expectedCode: 200,
		},
		// Second test case
		{
			description:  "GET HTTP status 404, when route is not exists",
			route:        "/not-found",
			expectedCode: 404,
		},
	}

	app := fiber.New()

	// Create route with GET method for test
	app.Get("/get-listings", func(c *fiber.Ctx) error {
		listingsCollections := database.MI.Db.Collection("listings")
		ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
		_, dberr := listingsCollections.Find(ctx, bson.M{})

		if dberr != nil {
			return dberr
		}

		return c.SendStatus(200)
	})

	for _, test := range tests {
		req := httptest.NewRequest("GET", test.route, nil)

		resp, _ := app.Test(req, 1)

		assert.Equalf(t, test.expectedCode, resp.StatusCode, test.description)
	}
}
