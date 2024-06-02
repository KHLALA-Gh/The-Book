package updater

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"
	"path"

	"github.com/inconshreveable/go-update"
)

// Check for existing update.
// If there is an update it returns true
func CheckForUpdate() (bool,error){
	version := os.Getenv("VERSION")
	if version == "" {
		return false,fmt.Errorf("there is no provided version")
	}
	url := path.Join(os.Getenv("UPDATE_HOST"),"compare?version="+version)
	resp,err := http.Get(url)
	if err != nil {
		return false,fmt.Errorf("faild to check update %s",err)
	}
	body,err := io.ReadAll(resp.Body)
	if err != nil {
		return false,fmt.Errorf("error when reading resp body : %s",err)
	}
	data := struct{
		Upgrade bool `json:"upgrade"`
	}{}
	err = json.Unmarshal(body,&data)
	if err != nil {
		return false , fmt.Errorf("error when unmarshaling json : %s",err)
	}
	return data.Upgrade,nil
}

// Update the app
func UpdateTheApp(osName string) (error) {
	url := path.Join(os.Getenv("UPDATE_HOST"),"versions/latest",osName)
	resp,err := http.Get(url)
	if err != nil {
		return fmt.Errorf("error fetching the update : %s",err)
	}
	defer resp.Body.Close()
	err = update.Apply(resp.Body,update.Options{})
	if err != nil {
		return fmt.Errorf("error when replacing the executable : %s",err)
	}
	return nil
}