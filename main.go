package main

import (
	"The_Book/internal/appr"
	"embed"
	"log"

	"github.com/joho/godotenv"
	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/options"
	"github.com/wailsapp/wails/v2/pkg/options/assetserver"
)

//go:embed all:frontend/dist
var assets embed.FS

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal(err)
	}
	// Create an instance of the app structure
	app := NewApp()
	// Create an instance of the appr structure
	appres := appr.NewAppResources()
	// Create application with options
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
