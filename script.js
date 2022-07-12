const inputBill = document.querySelector('#inputBill')
const percentageButton = document.querySelectorAll('.percentage')
const buttonCustom = document.querySelector('#button-custom')
const inputPersons = document.querySelector('#inputPersons')
const buttonReset = document.querySelector('#buttonReset')


inputBill.addEventListener('keyup', () => {
  inputBill.value <= 0 ? activeError(inputBill) : removeError(inputBill)
  if(verifyError()) {
    calculateTip()
  }
})

percentageButton.forEach((item) => {
  item.addEventListener('click', event => {
    addActive(event)
    if(verifyError()) {
      calculateTip()
    }
  })
})

buttonCustom.addEventListener('keyup', () => {
  if(verifyError()){
    calculateTip()
  }
})

inputPersons.addEventListener('keyup', () => {
  verifyError() ? calculateTip() : addError()
}) 

buttonReset.addEventListener('click', event =>  {
  if(buttonReset.classList[1] == 'button-active'){
    reset(event) 
  } 
})

function calculateTip() {
  let percentageTip = document.querySelector('.percentage-active').value
  
  let totalTip = (percentageTip / 100) * inputBill.value
  let tipPerPerson = totalTip / inputPersons.value
  let valuePerPerson = (inputBill.value / inputPersons.value) + tipPerPerson
  
  document.getElementById('tipAmount').innerHTML = tipPerPerson.toFixed(2)
  document.getElementById('total').innerHTML = valuePerPerson.toFixed(2)
  buttonReset.classList.add('button-active')
}

function verifyError() {
  const button = document.querySelector('.percentage-active')

  return button && (inputBill.value > 0) && (inputPersons.value > 0) ? true : false
}

function addError() {
  const button = document.querySelector('.percentage-active')

  if(inputBill.value <= 0) {
    activeError(inputBill)
  }

  inputPersons.value <= 0 ? activeError(inputPersons) : removeError(inputPersons)

  if(!button) {
    addShake()
  }
}

function addShake() {
  percentageButton.forEach((item) => {
    item.classList.add('shake')
  })
}

function removeShake() {
  percentageButton.forEach((item) => {
    item.classList.remove('shake')
  })
}

function activeError(element) {
  const input = element.parentNode
  const divInput = input.parentNode.firstElementChild.lastElementChild
  input.classList.add('error')
  divInput.classList.add('active-error')
}

function removeError(element) {
  input = element.parentNode
  divInput = input.parentNode.firstElementChild.lastElementChild
  input.classList.remove('error')
  divInput.classList.remove('active-error')
}

function reset(element) {
  document.getElementById('inputBill').value = ''
  buttonCustom.value = ''
  removeActive()
  removeShake()
  inputPersons.value = ''
  element.target.classList.remove('button-active')
  document.querySelector('#tipAmount').innerHTML = '0.00'
  document.querySelector('#total').innerHTML = '0.00'
  
}

function removeActive() {
  percentageButton.forEach(item => {
    if(item.classList[1] == 'percentage-active') {
      item.classList.remove('percentage-active')
      if(item.id == 'button-custom') {
        buttonCustom.value = ''
      }
    }
  })
}

function addActive(element) {
  removeActive()
  element.target.classList.add('percentage-active')
}
