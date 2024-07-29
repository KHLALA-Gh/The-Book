<div align="center">
    <h1 align="center">
        The Book
    </h1>
    <ul align="center" style="list-style-type: none;">
        <li >
            <a style="margin-right:30px;" href="https://the-book-red.vercel.app/">Website</a>
            <a style="margin-right:30px;" href="https://the-book-red.vercel.app/versions">Download</a>
            <a style="margin-right:30px;" href="https://github.com/KHLALA-Gh/The-Book/releases">Releases</a>
        </li>
    </ul>
</div>

A simple desktop application written in Go and JavaScript for reading books. Add your favorite books and enjoy reading with a beautiful and modern interface. It's easy to install just go to the [download page](https://the-book-red.vercel.app/versions), get the latest version, and download it.

> NOTE : The application is not supported for MacOS.

![image](https://the-book-red.vercel.app/_next/image?url=%2Fimg%2Flib.png&w=1920&q=75)

# Features

### Organized

Your books are well organized in the app with a very simple system and beautiful user interface.

### Saved Progress

Your reading progress is saved automatically, you don't need to memorize your last page.

### Simple PDF viewer

Enjoy reading with a simple and nice book viewer that lets you see all the book chapters and the outlines.

# Issues

If you encounter any bugs or problems, feel free to report them in [Issues](https://github.com/KHLALA-Gh/The-Book/issues).

# Run From Source Code

## requirements

To run the app from the source code you will need :

- [Go](https://github.com/golang/go) installed in your system.
- [NodeJS](https://nodejs.org/en) installed in your system.
- [Wails CLI](https://wails.io/docs/gettingstarted/installation/#installing-wails) installed using Go.

## Install packages

**First cd to the project after cloning the repo.**<br/>

To install packages for go run this command :

```shell
$ go mod tidy
```

To install packages for npm run this commands :

```shell
$ cd ./frontend && npm install
```

If you don't have Wails CLI installed you can add it using this command :

```shell
$ go install github.com/wailsapp/wails/v2/cmd/wails@latest
```

## Running the project

Use Wails CLI to run the project

```shell
$ wails dev
```

## Building the project

Use Wails CLI to build the project

```shell
$ wails build
```

more info about building the app using wails CLI [here](https://wails.io/docs/reference/cli#build).

You will find the binaries in **./build/bin**
