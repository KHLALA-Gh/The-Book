package database

import "gorm.io/gorm"



func MigrateTables(db *gorm.DB) {
	db.AutoMigrate(&Book{})
}