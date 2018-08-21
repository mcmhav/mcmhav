// Copyright 2018 Google Inc. All rights reserved.
// Use of this source code is governed by the Apache 2.0
// license that c
package main
import (
        "fmt"
        "net/http"
        "google.golang.org/appengine"
)
func main() {
        // Serve static files from "static" directory.
        http.Handle("/static/", http.FileServer(http.Dir(".")))
        http.HandleFunc("/", homepageHandler)
        appengine.Main()
}
const homepage = `<!doctype html>
<html>
<head>
  <title>Static Files</title>
  <link rel="stylesheet" type="text/css" href="/static/main.css">
  <link rel="stylesheet" type="text/css" href="/static/main.css">
</head>
<body>
  <p>potet. This is a static file serving example.</p>
  <p>jenniiiiiiii</p>
  <p>møøøøøø</p>
</body>
</html>`

func homepageHandler(w http.ResponseWriter, r *http.Request) {
        fmt.Fprint(w, homepage)
}

//package main

//import (
//        "fmt"
//        "net/http"

//        "google.golang.org/appengine"
//)

//func main() {
//        http.HandleFunc("/", handle)
//        appengine.Main()
//}

//func handle(w http.ResponseWriter, r *http.Request) {
//        fmt.Fprintln(w, "Hello, world! poteter")
//}
