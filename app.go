package main

import (
	"The_Book/internal/appr"
	"The_Book/internal/database"
	"context"
	"os"
	"path"
	"time"

	"github.com/wailsapp/wails/v2/pkg/runtime"
	"gorm.io/gorm"
)

// App struct
type App struct {
	ctx context.Context
	db *gorm.DB
	apprPath string
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
	// Create appr if not exist
	appr.CreateApprDir()
}

func (a *App) AskForBookPDF() (string, error) {
	dir,err :=  runtime.OpenFileDialog(a.ctx,runtime.OpenDialogOptions{
		Filters: []runtime.FileFilter{
			{
				DisplayName: "*.pdf",
				Pattern: "*.pdf",
			},
		},
	})
	if err !=nil {
		return "",err
	}
	return dir,nil
}

func (a *App) AskForBookImage() (string,error) {
	imgPath ,err := runtime.OpenFileDialog(a.ctx,runtime.OpenDialogOptions{
		Filters: []runtime.FileFilter{
			{
				DisplayName: "Image",
				Pattern: "*.png;*.jpg;*.jpeg",
			},
		},
	})
	if err != nil {
		return "",err
	}
	return imgPath,nil
}

func (a *App) CreateBook(name,img,bookFile string) (uint,error) {
	book := database.Book{
		Name: name,
		Path: "library/"+name,
		PDFileName: "content.pdf",
		ImgExt: path.Ext(img),
	}
	err := book.CreateBookDir(bookFile,img)
	if err != nil {
		return 0,err
	}
	err = book.Add(a.db)
	if err !=nil {

		return 0,err
	}
	return book.ID,err
}

func (a *App) GetBooksCount() (int64,error) {
	var count int64
	err := a.db.Model(&database.Book{}).Count(&count).Error
	if err != nil {
		return 0,err
	}
	return count,nil
}

func (a *App) CheckBookExist(name string) (bool,error) {
	var count int64
	err := a.db.Model(&database.Book{}).Where("name = ?",name).Count(&count).Error
	if err != nil {
		return false,err
	}
	if count == 0 {
		return false , nil
	}
	return true,nil
}


type HomeBooksData struct{
	RecentlyAdded []database.Book `json:"recentlyAdded"`
	LastReaded []database.Book		`json:"lastReaded"`
	FavoriteBooks []database.Book  `json:"favoriteBooks"`
}
// Get the books data for the home page
func (a *App) GetHomeBooks() (HomeBooksData,error) {
	now := time.Now()
	finishDate := now.AddDate(0,0,-15)
	recentlyAdded := []database.Book{}
	err := a.db.Model(&database.Book{}).Where("created_at > ?",finishDate).Find(&recentlyAdded).Error
	if err !=nil {
		return HomeBooksData{},err
	}
	apprPath,err := appr.GetAppResourcesDir()
	if err !=nil {
		return HomeBooksData{},err
	}
	for i,book := range recentlyAdded {
		recentlyAdded[i].Img = path.Join(apprPath,book.Path,"img"+book.ImgExt)
	}
	lastReaded := []database.Book{}
	err = a.db.Model(&database.Book{}).Where("last_readed > ?",finishDate).Find(&lastReaded).Error
	if err != nil {
		return HomeBooksData{},err
	}
	for i,book := range lastReaded {
		lastReaded[i].Img = path.Join(apprPath,book.Path,"img"+book.ImgExt)
	}
	favoriteConds := database.Book {
		Favorite: true,
	}
	favoriteBooks,err := favoriteConds.GetAll(a.db)
	if err != nil {
		return HomeBooksData{},err
	}
	for i,book := range favoriteBooks {
		favoriteBooks[i].Img = path.Join(apprPath,book.Path,"img"+book.ImgExt)
	}
	return HomeBooksData{
		RecentlyAdded: recentlyAdded,
		LastReaded: lastReaded,
		FavoriteBooks: favoriteBooks,
	},nil
}
// Get the book data, usually used for the frontend
func (a *App) GetBook(id uint) (database.Book,error) {
	book := database.Book{
		ID: id,
	}
	err := book.Get(a.db)
	if err !=nil {
		return database.Book{},nil
	}

	book.Img = path.Join(a.apprPath,book.Path,"img"+book.ImgExt)
	return book,nil
}

func (a *App) OpenImage(filename string) ([]byte, error) {
    // Read image file
    file, err := os.Open(filename)
    if err != nil {
        return nil, err
    }
    defer file.Close()

    // Get file info to determine the file size
    fileInfo, err := file.Stat()
    if err != nil {
        return nil, err
    }
    fileSize := fileInfo.Size()

    // Read the file contents into a byte slice
    data := make([]byte, fileSize)
    _, err = file.Read(data)
    if err != nil {
        return nil, err
    }
    return data, nil
}


func (a *App) GetBookPDFData(id uint) (string,error) {

	book := database.Book {
		ID: id,
	}
	err := book.Get(a.db)
	if err != nil {
		return "",err
	}
	pdfBase64,err := appr.GetBookPDFBase64(path.Join(book.Path,book.PDFileName))
	if err != nil {
		return "",err
	}
	return pdfBase64,nil
}

func (a *App) GetLibrary() ([]database.Book,error) {
	conds := database.Book{}
	books,err := conds.GetAll(a.db)
	if err != nil {
		return []database.Book{},err
	}
	apprDir,err := appr.GetAppResourcesDir()
	if err != nil {
		return []database.Book{},err
	}
	for i := 0; i < len(books) ; i++ {
		books[i].Img = path.Join(apprDir,books[i].Path,"img"+books[i].ImgExt)
	}
	return books,nil
}

func (a *App) UpdateLastReaded(id uint) (error) {
	book := database.Book{
		ID: id,
		LastReaded: time.Now(),
	}
	err := book.Save(a.db)
	if err != nil {
		return err
	}
	return nil
}

func (a *App) UpdateProgress(id uint,progress float64) (error) {
	book := database.Book{
		ID: id,
		Progress: progress,
	}
	err := book.Save(a.db)
	if err != nil {
		return err
	}
	return nil
}

func (a *App) GetBookProgress(id uint) (float64,error) {
	book := database.Book{
		ID: id,
	}
	err := book.Get(a.db)
	if err != nil {
		return 0,err
	}
	return book.Progress,nil
}