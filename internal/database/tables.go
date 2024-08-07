package database

import "time"



type Book struct {
	ID uint `gorm:"primaryKey" json:"id"`
	Name string `json:"name"`
	Path string `json:"-"`
	Progress float64 `json:"progress"`
	PDFileName string
	ImgExt string
	Favorite *bool `json:"favorite"`
	CreatedAt    time.Time
  	UpdatedAt    time.Time
	LastReaded time.Time
	Img  string `gorm:"-" json:"img"` // The absolute path of the img, used for the frontend .
}