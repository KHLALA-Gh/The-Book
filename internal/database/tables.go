package database



type Book struct {
	ID uint `gorm:"primaryKey"`
	Name string `json:"name"`
	Path string `json:"-"`
	Progress int 
	PDFileName string
	ImgExt string
}