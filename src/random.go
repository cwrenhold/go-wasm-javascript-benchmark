package main

import (
	"math/rand"
	"syscall/js"
	"time"
)

func main() {
	c := make(chan struct{}, 0)

	js.Global().Set("generateRandom", js.FuncOf(generateRandom))
	js.Global().Set("generateAverage", js.FuncOf(generateAverage))

	<-c
}

func generateRandom(this js.Value, args []js.Value) interface{} {
	rand.Seed(time.Now().UnixNano())
	return rand.Float32()
}

func generateAverage(this js.Value, args []js.Value) interface{} {
	if len(args) != 1 {
		return nil
	}

	numberOfRandoms := args[0].Int()

	rand.Seed(time.Now().UnixNano())

	var sum float32 = 0

	for i := 0; i < numberOfRandoms; i++ {
		sum += rand.Float32()
	}

	return sum / float32(numberOfRandoms)
}
