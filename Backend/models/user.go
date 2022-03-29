package models

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type User struct {
	Id    primitive.ObjectID `json:"id" bson:"_id,omitempty"`
	Name  string             `json:"name"`
	Email string             `json:"email"`
}

type Listing struct {
	Id          primitive.ObjectID `json:"id" bson:"_id"`
	Title       string             `json:"title" bson:"title"`
	Description string             `json:"description" bson:"description"`
	Tag         string             `json:"tag" bson:"tag"`
	Image       string             `json:"image" bson:"image"`
	CreatedBy   string             `json:"createdBy" bson:"createdBy"`
	Location    string             `json:"location" bson:"location"`
	Price       string             `json:"price" bson:"price"`
}

type Requests struct {
	Id          primitive.ObjectID `json:"id" bson:"_id"`
	ListingId   string             `json:"listingId" bson:"listingId"`
	Title       string             `json:"title" bson:"title"`
	Description string             `json:"description" bson:"description"`
	Location    string             `json:"location" bson:"location"`
	Tag         string             `json:"tag" bson:"tag"`
	Price       string             `json:"price" bson:"price"`
	Seller      string             `json:"seller" bson:"seller"`
	Buyer       string             `json:"buyer" bson:"buyer"`
	Status      string             `json:"status" bson:"status"`
}
