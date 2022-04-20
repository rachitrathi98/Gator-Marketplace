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

func TestGetListings(t *testing.T) {

	tests := []struct {
		description  string // description of the test case
		route        string // route path to test
		expectedCode int    // expected HTTP status code
	}{
		// First test case
		{
			description:  "GET HTTP status 200",
			route:        "/api/get-listings",
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
	app.Get("/api/get-listings", func(c *fiber.Ctx) error {
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
			route:        "/api/post-listing",
			expectedCode: 200,
			reqBody:      `{"title": "New Listing", "description" : "This is a new Listing", "tag" : "House", "createdBy" : "gangardiwalam.mg@gmail.com", "location" : "Gainesville", "price" : "3", "seller": ""}`,
			headers:      map[string]string{`Content-Type`: `application/json`},
		},
	}

	app := fiber.New()

	// Create route with POST method for test
	app.Post("/api/post-listing", func(c *fiber.Ctx) error {

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
func TestPutListing(t *testing.T) {

	tests := []struct {
		description  string // description of the test case
		route        string // route path to test
		expectedCode int
		reqBody      string
		headers      map[string]string // expected HTTP status code
	}{
		// First test case
		{
			description:  "PUT HTTP status 200",
			route:        "/api/update-listing/621817ec6fa253d45b6eb2ec",
			expectedCode: 200,
			reqBody:      `{"title": "New Updated Listing", "description" : "This is a new Listing", "tag" : "House", "createdBy" : "gangardiwalam.mg@gmail.com", "location" : "Gainesville", "price" : "3", "seller": ""}`,
			headers:      map[string]string{`Content-Type`: `application/json`},
		},
	}

	app := fiber.New()

	// Create route with PUT method for test
	app.Put("/api/update-listing/:id", func(c *fiber.Ctx) error {

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
			return e
		}

		return c.SendStatus(200)
	})

	for _, test := range tests {

		rbody, _ := json.Marshal(test.reqBody)
		req := httptest.NewRequest("PUT", test.route, bytes.NewReader(rbody))
		req.Header.Add(`Content-Type`, `application/json`)
		resp, _ := app.Test(req, 1)

		assert.Equalf(t, test.expectedCode, resp.StatusCode, test.description)
	}
}
func TestDeleteListing(t *testing.T) {

	tests := []struct {
		description  string // description of the test case
		route        string // route path to test
		expectedCode int
	}{
		// First test case
		{
			description:  "DELETE HTTP status 200",
			route:        "/api/delete-listing/621817ec6fa253d45b6eb2ec",
			expectedCode: 200,
		},
	}

	app := fiber.New()

	// Create route with DELETE method for test
	app.Delete("/api/delete-listing/:id", func(c *fiber.Ctx) error {

		var id primitive.ObjectID
		id, _ = primitive.ObjectIDFromHex(c.Params("id"))
		listingsCollections := database.MI.Db.Collection("listings")
		ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)

		_, e := listingsCollections.DeleteOne(ctx, bson.M{"_id": id})

		if e != nil {
			return e
		}

		return c.SendStatus(400)
	})

	for _, test := range tests {

		req := httptest.NewRequest("DELETE", test.route, nil)
		req.Header.Add(`Content-Type`, `application/json`)
		resp, _ := app.Test(req, 1)

		assert.Equalf(t, test.expectedCode, resp.StatusCode, test.description)
	}
}

func TestGetSpecificListing(t *testing.T) {

	tests := []struct {
		description  string // description of the test case
		route        string // route path to test
		expectedCode int
	}{
		// First test case
		{
			description:  "GET HTTP status 200",
			route:        "/api/get-listing/621817ec6fa253d45b6eb2ec",
			expectedCode: 200,
		},
	}

	app := fiber.New()

	// Create route with GET method for test
	app.Get("/api/get-listing/:id", func(c *fiber.Ctx) error {

		var id primitive.ObjectID
		id, _ = primitive.ObjectIDFromHex(c.Params("id"))
		listingsCollections := database.MI.Db.Collection("listings")
		ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)

		_, e := listingsCollections.Find(ctx, bson.M{"_id": id})

		if e != nil {
			return e
		}

		return c.SendStatus(200)
	})

	for _, test := range tests {

		req := httptest.NewRequest("GET", test.route, nil)
		req.Header.Add(`Content-Type`, `application/json`)
		resp, _ := app.Test(req, 1)

		assert.Equalf(t, test.expectedCode, resp.StatusCode, test.description)
	}
}
func TestPostSoldListing(t *testing.T) {

	tests := []struct {
		description  string // description of the test case
		route        string // route path to test
		expectedCode int
		reqBody      string
		headers      map[string]string
	}{
		// First test case
		{
			description:  "POST HTTP status 200",
			route:        "/api/sold-listing",
			expectedCode: 200,
			reqBody:      `{"title": "A new Listing", "description" : "This is a new Listing", "tag" : "Furniture", "createdBy" : "gangardiwalam.mg@gmail.com", "location" : "Gainesville", "price" : "3", "buyer": "animax698@gmail.com"}`,
			headers:      map[string]string{`Content-Type`: `application/json`},
		},
	}

	app := fiber.New()

	// Create route with GET method for test
	app.Get("/api/sold-listing", func(c *fiber.Ctx) error {

		var listing models.SoldListing
		er := c.BodyParser(&listing)

		if er != nil {
			return c.SendString("Body is Empty")
		}

		listing.Id = primitive.NewObjectID()
		listingsCollections := database.MI.Db.Collection("Sold-listings")
		ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
		_, e := listingsCollections.InsertOne(ctx, listing)

		if e != nil {
			return e
		}

		return c.SendStatus(200)
	})

	for _, test := range tests {

		req := httptest.NewRequest("POST", test.route, nil)
		req.Header.Add(`Content-Type`, `application/json`)
		resp, _ := app.Test(req, 1)

		assert.Equalf(t, test.expectedCode, resp.StatusCode, test.description)
	}
}
func TestGetSoldListings(t *testing.T) {

	tests := []struct {
		description  string // description of the test case
		route        string // route path to test
		expectedCode int
	}{
		// First test case
		{
			description:  "GET HTTP status 200",
			route:        "/api/get-sold-listing",
			expectedCode: 200,
		},
	}

	app := fiber.New()

	// Create route with GET method for test
	app.Get("/api/get-sold-listing", func(c *fiber.Ctx) error {

		var id primitive.ObjectID
		id, _ = primitive.ObjectIDFromHex(c.Params("id"))
		listingsCollections := database.MI.Db.Collection("Sold-listings")
		ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)

		_, e := listingsCollections.Find(ctx, bson.M{"_id": id})

		if e != nil {
			return e
		}

		return c.SendStatus(200)
	})

	for _, test := range tests {

		req := httptest.NewRequest("GET", test.route, nil)
		req.Header.Add(`Content-Type`, `application/json`)
		resp, _ := app.Test(req, 1)

		assert.Equalf(t, test.expectedCode, resp.StatusCode, test.description)
	}
}
