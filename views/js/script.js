let time = 1
let used_nums = []
let a = []

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
    $('.puzzle').append('<div class="dropme" id="grid' + i + '"><img class="dragme" id="img' + used_nums[i - 1] + '" src="/img/img' + used_nums[i - 1] + '.png" alt="puzzle" /></div><br>')
    time = 1
  } else {
    $('.puzzle').append('<div class="dropme" id="grid' + i + '"><img class="dragme" id="img' + used_nums[i - 1] + '" src="/img/img' + used_nums[i - 1] + '.png" alt="puzzle" /></div>')
    time++
  }
}

$('.dragme').draggable({
  containment: '.puzzle',
  cursor: 'pointer',
  stack: '.dragme',
  snap: '.dropme',
  snapMode: 'outer'
})

$('.dropme').droppable({
  drop: (e, ui) => {
    dropID = e.target.id.substr(4,5)
    dragID = ui.draggable.attr('id').substr(3, 4)
    a[dropID] = Number(dragID)
    if (a[1] === 1 && a[2] === 2 && a[3] === 3 && a[4] === 4 && a[5] === 5 && a[6] === 6 && a[7] === 7 && a[8] === 8 && a[9] === 9 && a[10] === 10 && a[11] === 11 && a[12] === 12 && a[13] === 13 && a[14] === 14 && a[15] === 15 && a[16] === 16 && a[17] === 17 && a[18] === 18 && a[19] === 19 && a[20] === 20 && a[21] === 21 && a[22] === 22 && a[23] === 23 && a[24] === 24 && a[25] === 25) {
      alert('You have WON!')
    }
  }
})


// Discontinued code
// $('.dragme').draggable({
//   containment: 'parent',
//   cursor: 'pointer',
//   stack: '.dragme',
//   snap: true,
//   stop: (event, ui) => {
//     let id = ui.helper[0].id
//     let snapped = $('#' + id).data('ui-draggable').snapElements

//     let snappedTo = $.map(snapped, element => {
//       return element.snapping ? element.item : null
//     })
//     let sid = id.substr(id.length - 1)
//     allSnap[sid - 1] = snappedTo
//     didWin(allSnap)
//   }
// })


// function didWin(snaps) {
//   let snap = snaps
// }

