package updater

import (
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"path"

	"github.com/inconshreveable/go-update"
)


type Response struct{
	Upgrade bool `json:"upgrade"`
}
// Check for existing update.
// If there is an update it returns true
func CheckForUpdate() (bool,error){
	version := os.Getenv("VERSION")
	if version == "" {
		return false,fmt.Errorf("there is no provided version")
	}
	
	
	url := "https://" + path.Join(os.Getenv("UPDATE_HOST"),"/api/versions/compare?version="+version)
	
	
	log.Print("Checking for updates from : ",url)
	resp,err := http.Get(url)
	if err != nil {
		return false,fmt.Errorf("faild to check update %s",err)
	}
	body,err := io.ReadAll(resp.Body)
	if err != nil {
		return false,fmt.Errorf("error when reading resp body : %s",err)
	}

	var data Response
	err = json.Unmarshal(body,&data)
	if err != nil {
		return false , fmt.Errorf("error when unmarshaling json : %s",err)
	}
	return data.Upgrade,nil
}

// Update the app
func UpdateTheApp(osName string) (error) {
	
	url := "https://" + path.Join(os.Getenv("UPDATE_HOST"),"/api/versions/latest/bin/",osName)
	

	log.Print("Getting the download url from : ",url)
	resp,err := http.Get(url)
	if err != nil {
		return fmt.Errorf("error fetching the update : %s",err)
	}
	defer resp.Body.Close()
	
	body,err := io.ReadAll(resp.Body)
	if err !=nil {
		return fmt.Errorf("error when reading body : %s",err)
	}
	
	data := struct{
		DownloadUrl string `json:"downloadUrl"`
	}{}
	
	err = json.Unmarshal(body,&data)
	if err != nil {
		return fmt.Errorf("error when unmarshaling the body : %s",err)
	}
	if data.DownloadUrl == "" {
		return fmt.Errorf("error when getting download url for the update : empty url.")
	}

	// Download the new binary
	log.Print("Start downloading update from : ",data.DownloadUrl)
	resp1,err := http.Get(data.DownloadUrl)
	if err != nil {
		return fmt.Errorf("error fetching the update : %s",err)
	}
	defer resp1.Body.Close()
	log.Print("Update downloaded successfully")
	
	// Replace the old binary with the new one
	log.Print("Start applying the update...")
	err = update.Apply(resp1.Body,update.Options{})
	fmt.Println("The new update is applied successfully")
	fmt.Println("restart the app to get the changes")
	if err != nil {
		return fmt.Errorf("error when replacing the executable : %s",err)
	}
	return nil
}