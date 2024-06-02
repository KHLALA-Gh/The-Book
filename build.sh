
#!/bin/bash

# Set environment variables for cross-compilation
export CGO_ENABLED=1
export GOOS=linux
export GOARCH=amd64
export CC=x86_64-w64-mingw32-gcc

# Clean previous build artifacts
go clean

# Build the Wails project
wails build -platform windows/amd64
