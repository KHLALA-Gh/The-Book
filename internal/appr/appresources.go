package appr

import (
	"encoding/base64"
	"fmt"
	"os"
	"os/user"
	"path"
	"runtime"
)

// Get the app resources directory
func GetAppResourcesDir() (string, error) {
	pathDir := ""
	opsys := runtime.GOOS
	appName := os.Getenv("APPNAME")
	if opsys == "windows" {
		appData := os.Getenv("APPDATA")
		if appData == "" {
			return "",fmt.Errorf("app data path is not defined")
		}
		pathDir = path.Join(appData,appName)
	}else if opsys == "linux" {
		user,err := user.Current()
		if err != nil {
			return "" , err
		}
		pathDir = path.Join(user.HomeDir,"./.local/share/",appName)
	}else {
		return "",fmt.Errorf("unsupported os (getting app resource dir)")
	}
	return pathDir,nil
}

// Check for the app resources directory
func ApprDirExists() (bool, error) {
    apprPath,err := GetAppResourcesDir()
	if err !=nil {
		return false,fmt.Errorf("error when get appr : %s",err)
	}
	fileInfo, err := os.Stat(apprPath)
    if err != nil {
        if os.IsNotExist(err) {
            return false, nil
        }
        return false, err
    }

    if !fileInfo.IsDir() {
        return false, fmt.Errorf("%s is not a directory", apprPath)
    }

    return true, nil
}
// Creates the app resources dir in the system
func CreateApprDir() (error){
	dirPath,err:= GetAppResourcesDir()
	if err !=nil {
		return err
	}
	exist,err := ApprDirExists()
	if err != nil {
		return err
	}
	if exist {
		return fmt.Errorf("resources Dir already exist")
	}
	dirs := []string{"./library","./database"}
	for _,name := range dirs {
		err = os.MkdirAll(path.Join(dirPath,name),0777)
		if err !=nil {
			return err
		}
	}
	return nil
}
// Get how many books the user have
func  GetBooksCount() (int,error) {
	apprPath,err := GetAppResourcesDir()
	if err !=nil {
		return 0,err
	}
	apprDir,err := os.Open(path.Join(apprPath,"./library"))
	if err !=nil {
		return 0,err
	}
	defer apprDir.Close()
	entries,err := apprDir.ReadDir(-1)
	if err !=nil {
		return 0,err
	}
	booksCount := 0
	for _,entry := range entries{
		if entry.IsDir() {
			booksCount++
		}
	}
	return booksCount,nil
}

// Get the book pdf file encoded in base64.
// note : path is the relative path for the book directory in the app resources dir.
// for example : path = library/{book name}/file.pdf
func GetBookPDFBase64(bookPath string) (string,error) {
	apprDir,err := GetAppResourcesDir()
	if err != nil {
		return "" , err
	}
	filePath := path.Join(apprDir,bookPath)
	data,err := os.ReadFile(filePath)
	if err != nil {
		return "",err
	}
	pdfBase64 := base64.StdEncoding.EncodeToString(data)
	return pdfBase64,nil
}

func CreateLibrary()(error){
	apprDir,err := GetAppResourcesDir()
	if err != nil {
		return err
	}
	libDir := path.Join(apprDir,"library")
	if _,err = os.Stat(libDir) ; os.IsNotExist(err) {
		err = os.Mkdir(libDir,0777)
		if err != nil {
			return err
		}
	}
	return nil
}