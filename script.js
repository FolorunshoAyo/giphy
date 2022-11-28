// RANDOMIZE GIPHY BAND

// GENERATE RANDOM NUMBER FROM 0 to 255
function generateRGB(){
    const rgbValues = [];

    for(let i = 0; i <= 2; i++){
        rgbValues.push(Math.floor(Math.random() * 255));
    }

    return rgbValues;

}

function rainbowColorBand(){
    const bandBoxes = document.querySelectorAll(".box");

    Array.from(bandBoxes).forEach(bandBox => {
        const rgbValues =  generateRGB();
        bandBox.style.backgroundColor = `rgb(${rgbValues[0]}, ${rgbValues[1]}, ${rgbValues[2]})`
    });
}

setInterval(() => {
    rainbowColorBand();
}, 500);