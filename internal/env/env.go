package env

import "os"


var vars =map[string]string{
	"APPNAME" : "The_Book",
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