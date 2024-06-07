package env

import "os"


var vars =map[string]string{
	"APPNAME" : "The_Book",
	"VERSION" : "Beta-1",
	"UPDATE_HOST" : "https://the-book-red.vercel.app/",
}

func SetEnvs() (error) {
	for name,v := range vars {
		err := os.Setenv(name,v)
		if err !=nil {
			return err
		}
	}
	return nil
}
