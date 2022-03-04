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
