package database

import (
	"The_Book/internal/appr"
	"The_Book/internal/fs"
	"fmt"
	"os"
	"path"
	"unicode/utf8"

	"gorm.io/gorm"
)

// Insert the book in the database, update the id.
func (b *Book) Add(db *gorm.DB) error {
	if  b.Name == "" || utf8.RuneCountInString(b.Name) > 16{
		return fmt.Errorf("invalid Book Name.")
	}
	// if exist is not 0 then there is a book that has the same name as this on.
	var exist int64
	err := db.Model(&Book{}).Where("name = ?",b.Name).Count(&exist).Error
	if err != nil {
		return err
	}
	if exist != 0 {
		return fmt.Errorf("the book with the name '"+b.Name+"' already exist")
	}
	err = db.Create(&b).Error
	if err != nil {
		return err
	}
	return nil
}

// Get the book by it's id,then update the instance
func (b *Book) Get(db *gorm.DB) error {
	if b.ID == 0 {
		return fmt.Errorf("book id not provided")
	}
	err := db.Find(&b,Book{ID: b.ID}).Error
	if err !=nil {
		return err
	}
	return nil
}

// Delete the book using it's id
func (b *Book) Delete(db *gorm.DB) error {
	err := db.Delete(&b,Book{ID: b.ID}).Error
	if err!=nil {
		return err
	}
	return nil
}

// Update the book in the database
func (b Book) Save(db *gorm.DB) error {
	if b.ID == 0 {
		return fmt.Errorf("book id is not provided")
	}
	err := db.Model(&Book{}).Where("id = ?",b.ID).Updates(b).Error
	if err !=nil {
		return err
	}
	return nil
}

// Creates The Book Directory in the app resources
func (b *Book) CreateBookDir(src,img string) (error) {
	apprDirPath,err := appr.GetAppResourcesDir()
	if err !=nil {
		return err
	} 
	bookDirPath := path.Join(apprDirPath,b.Path)
	if _,err = os.Stat(bookDirPath) ; os.IsNotExist(err) {
		err = os.Mkdir(bookDirPath,0777)
		if err != nil {
			return err
		}
	}
	bookFilePath := path.Join(bookDirPath,b.PDFileName)
	if _,err = os.Stat(bookFilePath) ; err == nil {
		return fmt.Errorf(bookFilePath+ " already exists")
	}
	err = fs.CopyFile(src,bookFilePath)
	if err !=nil {
		return err
	}
	if img != "" {
		bookImgPath := path.Join(bookDirPath,"img"+b.ImgExt)
		err = fs.CopyFile(img,bookImgPath)
		if err != nil {
			return err
		}
	}
	return nil
}

// Deletes the book directory from the app resources
func (b *Book) DeleteBookDir(bookPath string) (error) {
	apprPath,err := appr.GetAppResourcesDir()
	if err != nil {
		return err
	}
	bookDirPath := path.Join(apprPath,bookPath)
	err = os.RemoveAll(bookDirPath)
	if err != nil {
		return err
	}
	return nil
}

// Get all the books with the matching conds
func (b *Book) GetAll(db *gorm.DB) ([]Book,error) {
	var results []Book
	err := db.Model(Book{}).Find(&results,b).Error
	if err != nil {
		return []Book{},err
	}
	return results,nil
}

func (b *Book) Exist(db *gorm.DB) (bool,error) {
	var exist int64
	err := db.Model(&Book{}).Where(b).Count(&exist).Error
	if err !=nil{
		return false,err
	}
	if exist == 0 {
		return false,nil
	}
	return true,nil
}