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
	Tags        []string           `json:"tags" bson:"tags"`
	Images      []string           `json:"images" bson:"images"`
	CreatedBy   string             `json:"createdBy" bson:"createdBy"`
	Location    string             `json:"location" bson:"location"`
	Price       string             `json:"price" bson:"price"`
}
