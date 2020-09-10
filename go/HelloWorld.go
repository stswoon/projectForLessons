package main

import (
	"fmt"
	"net/http"
)

func indexHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Println("indexHandler")
	names := r.URL.Query()["name"]
	name := names[0]
	fmt.Fprint(w, "Hello "+string(name)+"!")
}

func main() {
	fmt.Println("Hello World! - v2")
	fmt.Println("Open localhost:8181/test?name=World")
	http.HandleFunc("/test", indexHandler)
	http.ListenAndServe(":8181", nil)
}
