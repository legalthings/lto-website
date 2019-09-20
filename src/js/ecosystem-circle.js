//Source https://stackoverflow.com/questions/39428557/css-javascript-how-to-make-rotating-circular-menu-with-multiple-states#answer-39429290
console.log("Test");
const ecosystemButtons = Array.from(document.querySelectorAll('.ecosystemButton'))
const count = ecosystemButtons.length
const increase = Math.PI * 2 / ecosystemButtons.length
const radius = 150
let angle = 0

ecosystemButtons.forEach((ecosystemButton, i) => {
  ecosystemButton.style.top = Math.sin(-Math.PI / 2 + i * increase) * radius + 'px'
  ecosystemButton.style.left = Math.cos(-Math.PI / 2 + i * increase) * radius + 'px'
  ecosystemButton.addEventListener('click', move)
})

function move(e) {
  const n = ecosystemButtons.indexOf(e.target)
  const endAngle = (n % count) * increase
  turn()
  function turn() {
    if (Math.abs(endAngle - angle) > 1/8) {
      const sign = endAngle > angle ? 1 : -1
      angle = angle + sign/8
      setTimeout(turn, 20)
    } else {
      angle = endAngle
    }
    ecosystemButtons.forEach((ecosystemButton, i) => {
      ecosystemButton.style.top = Math.sin(-Math.PI / 2 + i * increase - angle) * radius + 'px'
      ecosystemButton.style.left = Math.cos(-Math.PI / 2 + i * increase - angle) * radius + 'px'
    })
  }
}


//CONTENT
// jQuery('.item').first().addClass('is-active');
// jQuery('.ecosystemButton').on('click', function(){
//     var order = jQuery(this).attr('data-order');
//
//     jQuery('.item').removeClass('is-active');
//     jQuery('.item[data-content="' + order + '"]').addClass('is-active');
// });


let item = document.querySelector('.item');
item.classList.add('is-active');
let ecosystemButtons2 = document.querySelectorAll('.ecosystemButton');
Array.from(ecosystemButtons2).forEach(ecosystemButton => {
   ecosystemButton.addEventListener('click', function() {
       let order = this.getAttribute('data-order');
       let items = document.querySelectorAll('.item');
        Array.from(items).forEach(item => {
            item.classList.remove('is-active')
        })
        document.querySelector('.item[data-content="' + order + '"]').classList.add('is-active')
   })
});
