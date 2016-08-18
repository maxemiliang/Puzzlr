let time = 1
let used_nums = []

// inefficient, men de funkar
for (var i = 1; i < 26; i++) {
  let x = () => { return Math.floor(Math.random() * (25 - 1 + 1)) + 1 }
  let not_found = true
  while (not_found) {
    let num = x()
    if (used_nums.indexOf(num) >= 0) {
      not_found = true
    } else {
      used_nums.push(num)
      not_found = false
    }
  }
}

for (let i = 1; i < 26; i++) {
  if (time === 5) {
    $('.puzzle').append('<img class="dragme" id="img' + used_nums[i - 1] + '" src="/img/img' + used_nums[i - 1] + '.png" alt="puzzle" /><br>')
    time = 1
  } else {
    $('.puzzle').append('<img class="dragme" id="img' + used_nums[i - 1] + '" src="/img/img' + used_nums[i - 1] + '.png" alt="puzzle" />')
    time++
  }
}

$('.dragme').draggable({
  containment: 'parent',
  cursor: 'pointer',
  stack: '.dragme',
  snap: true,
  stop: (event, ui) => {
    let id = ui.helper[0].id
    let snapped = $('#' + id).data('ui-draggable').snapElements

    let snappedTo = $.map(snapped, element => {
      return element.snapping ? element.item : null
    })

    console.log(snappedTo)

    }
})

