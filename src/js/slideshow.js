const segments = 4
function slide(offset) {
    const sliderContainer = document.getElementById('homepage-slider')
    const indexContainer = document.getElementById('homepage-slide-counter')
    const currentIndex = parseInt(indexContainer.textContent, 10) - 1
    const newIndex = currentIndex === 0 && offset == -1 ? segments - 1 : Math.abs(currentIndex + offset) % segments
    indexContainer.innerHTML = leadZeros((newIndex + 1).toString(), 2)
    const barContainer = document.getElementById('slider-container')
    highlightBar(barContainer, newIndex, currentIndex)
}

function leadZeros(n, size) {
    if (size < n.length) {
        return n
    }
    const longNumber = '0'.repeat(size) + n
    return longNumber.substring(longNumber.length - size)
}

function buildStyles(barWidth) {
    document.styleSheets[0].insertRule(
        `.slider-control-upper-bar {
          background-color: #17054b;
      }`,
        0
    )
    document.styleSheets[0].insertRule(
        `.slider-control-lower-bar { 
          width: ${barWidth};
          height: 3px;
          background-color: #d2c8da;
          align-self: flex-start;
          position: relative;
          bottom: 0;
      }`,
        0
    )
}

function buildSlider() {
    const container = document.getElementById('slider-container')
    const barWidth = 100 / segments + '%'
    buildStyles(barWidth)
    for (let i = 0; i < segments; i++) {
        let newElem = document.createElement('div')
        newElem.classList.add('slider-control-lower-bar')
        container.appendChild(newElem)
    }
    highlightBar(container, 0)
}

function highlightBar(container, newIndex, oldIndex = null) {
    if (oldIndex >= 0) {
        let prevBar = container.children.item(oldIndex)
        prevBar.classList.remove('slider-control-upper-bar')
        prevBar.classList.remove('dark-indigo')
    }
    let newBar = container.children.item(newIndex)
    newBar.classList.add('slider-control-upper-bar')
    newBar.classList.add('dark-indigo')
}

buildSlider()
