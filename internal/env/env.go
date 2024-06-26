package env

import "os"


var vars =map[string]string{
	"APPNAME" : "The_Book",
	"VERSION" : "0.0.0",
	"UPDATE_HOST" : "the-book-red.vercel.app/",
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
