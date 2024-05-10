package fs

import (
	"io"
	"os"
)

// Some Random file system functions


func CopyFile(src,dest string) (error) {
	srcFile,err := os.Open(src)
	if err !=nil {
		return err
	}
	defer srcFile.Close()
	destFile,err := os.Create(dest)
	if err != nil {
		return err
	}
	defer destFile.Close()

	_,err = io.Copy(destFile,srcFile)
	if err != nil {
		return err
	}
	err = destFile.Sync()
	if err != nil {
		return err
	}
	return nil
}