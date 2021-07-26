package main

import (
	"github.com/gin-gonic/gin"
)

var product Product
var productType ProductType
var brand Brand

func main() {
	database := setupDatabase()

	database.AutoMigrate(&Product{}, &ProductType{}, &Brand{})

	server := gin.Default()
	server.GET("/product/:id", func(c *gin.Context) {
		getProductById(c)
	})

	server.POST("/product", func(c *gin.Context) {
		postProduct(c)
	})
	server.Run(":8000") // listen and serve on 0.0.0.0:8080 (for windows "localhost:8080")
}
