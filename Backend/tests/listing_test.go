package main

import (
	"GatorMarketPlace/database"
	"GatorMarketPlace/models"
	"bytes"
	"context"
	"encoding/json"
	"net/http/httptest"
	"testing"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/stretchr/testify/assert" // add Testify package
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
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

func TestPostListing(t *testing.T) {

	tests := []struct {
		description  string // description of the test case
		route        string // route path to test
		expectedCode int
		reqBody      string
		headers      map[string]string // expected HTTP status code
	}{
		// First test case
		{
			description:  "POST HTTP status 200",
			route:        "/post-listing",
			expectedCode: 200,
			reqBody:      `{"title": "New Listing", "description" : "This is a new Listing", "tag" : "House", "createdBy" : "61fdd0848cea9423f269f01c", "location" : "Gainesville", "price" : "3"}`,
			headers:      map[string]string{`Content-Type`: `application/json`},
		},
	}

	app := fiber.New()

	// Create route with POST method for test
	app.Post("/post-listing", func(c *fiber.Ctx) error {

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
			return e
		}

		return c.SendStatus(200)
	})

	for _, test := range tests {

		rbody, _ := json.Marshal(test.reqBody)
		req := httptest.NewRequest("POST", test.route, bytes.NewReader(rbody))
		req.Header.Add(`Content-Type`, `application/json`)
		resp, _ := app.Test(req, 1)

		assert.Equalf(t, test.expectedCode, resp.StatusCode, test.description)
	}
}
