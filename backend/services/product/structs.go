package main

import "gorm.io/gorm"

type ProductType struct {
	gorm.Model
	Name        string
	Description string
}

type Product struct {
	gorm.Model
	ProductTypeID int
	ProductType   ProductType
	BrandID       int
	Brand         Brand
	Name          string
	Description   string
	Barcode       string
	ImageURL      string
}

type Brand struct {
	gorm.Model
	name string
}
