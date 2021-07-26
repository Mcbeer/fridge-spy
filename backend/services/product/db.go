package main

import (
	"fmt"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func setupDatabase() *gorm.DB {
	// Setup DB
	dsn := "host=product_db user=user password=pass dbname=db port=5432 sslmode=disable TimeZone=Europe/Copenhagen"
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})

	if err != nil {
		fmt.Println(err)
	}

	return db
}
