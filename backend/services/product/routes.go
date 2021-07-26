package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"

	"github.com/gin-gonic/gin"
)

// Will get product from DB by it's ID
func getProductById(context *gin.Context) {
	param := context.Param("id")

	context.JSON(200, gin.H{
		"param": param,
	})
}

func postProduct(context *gin.Context) {
	var productData Product

	jsonBytes, err := ioutil.ReadAll(context.Request.Body)

	if err != nil {
		fmt.Println(err)
		context.JSON(500, gin.H{
			"error": "There was an error posting your product",
		})
	}

	jsonErr := json.Unmarshal(jsonBytes, &productData)

	if jsonErr != nil {
		context.JSON(500, gin.H{
			"error": "There was an error converting json",
		})
	}

	fmt.Println(productData)
}
