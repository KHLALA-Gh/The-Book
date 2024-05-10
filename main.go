package main

import (
	"The_Book/internal/appr"
	"The_Book/internal/env"
	"embed"
	"log"
	"path"

	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/options"
	"github.com/wailsapp/wails/v2/pkg/options/assetserver"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

//go:embed all:frontend/dist
var assets embed.FS

func main() {
	err := env.SetEnvs()
	if err != nil {
		log.Fatal(err)
	}
	// Create an instance of the app structure
	app := NewApp()
	// Create an instance of the appr structure
	appres := appr.NewAppResources()
	// Create application with options
	// Connect to the database
	apprDir,err := appr.GetAppResourcesDir()
	if err!=nil {
		log.Fatal(err)
	}
	db,err := gorm.Open(sqlite.Open(path.Join(apprDir,"./database/data.db")))
	if err !=nil {
		log.Fatal(err)
	}
	app.db = db
	err = wails.Run(&options.App{
		Title:  "The_Book",
		Width:  1024,
		Height: 768,
		AssetServer: &assetserver.Options{
			Assets: assets,
		},
		BackgroundColour: &options.RGBA{R: 27, G: 38, B: 54, A: 1},
		OnStartup:        app.startup,
		Bind: []interface{}{
			app,
			appres,
		},
	})

	if err != nil {
		println("Error:", err.Error())
	}
}
