package main

import (
	"fmt"

	"github.com/gin-gonic/gin"
)

type ShoppingList struct {
	Id        string             `json:"id"`
	Name      string             `json:"name"`
	Items     []ShoppingListItem `json:"items"`
	AccountId string             `json:"accountId"`
}

type ShoppingListItem struct {
	Id       string  `json:"id"`
	Name     string  `json:"name"`
	Quantity int     `json:"quantity"`
	Price    float64 `json:"price"`
	IsDone   bool    `json:"isDone"`
	// list_id - only found in db, to map it to where it belongs
}

func getShoppingList(context *gin.Context) {
	// Get access token from cookie
	// cookie, err := context.Cookie("access_token")

	// if err != nil {
	// 	context.JSON(401, gin.H{
	// 		"error": "Unauthorized",
	// 	})
	// 	return
	// }

	// Check the access_token against the user-service

	// Check if we have an account id in the path
	accountId, hasAccountId := context.Params.Get("account_id")

	if !hasAccountId {
		context.JSON(400, gin.H{
			"error": "Bad Request",
		})
		return
	}

	fmt.Println(accountId, hasAccountId)

	// Get the list, with the items from DB

	// Return the list to the user
	context.JSON(200, gin.H{
		"id":   "1",
		"name": "Indkøbsliste",
		"items": []ShoppingListItem{
			{
				Id:       "1",
				Name:     "Milk",
				Quantity: 2,
				Price:    2.99,
			},
		},
	})
}

func main() {
	router := gin.Default()
	router.GET("/shopping-lists/:account_id", getShoppingList)
	router.Run()
}
