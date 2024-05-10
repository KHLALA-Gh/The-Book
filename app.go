package main

import (
	"The_Book/internal/appr"
	"The_Book/internal/database"
	"context"
	"path"

	"github.com/wailsapp/wails/v2/pkg/runtime"
	"gorm.io/gorm"
)

// App struct
type App struct {
	ctx context.Context
	db *gorm.DB
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

func (a *App) CreateBook(name,img,bookFile string) (string,error) {
	book := database.Book{
		Name: name,
		Path: "library/"+name,
		PDFileName: "content.pdf",
		ImgExt: path.Ext(img),
	}
	err := book.CreateBookDir(bookFile,img)
	if err != nil {
		return "",err
	}
	// TODO : Insert the book in the database
	return "",err
} 