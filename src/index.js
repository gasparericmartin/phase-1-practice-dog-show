document.addEventListener('DOMContentLoaded', () => {
    updateTable()

    document.getElementById('dog-form').addEventListener('submit', editDog)
})

function populateTable(e) {
    const newRow = document.createElement('tr')
    const name = document.createElement('td')
    const breed = document.createElement('td')
    const sex = document.createElement('td')
    const editColumn = document.createElement('td')
    const editButton = document.createElement('button')

    editButton.addEventListener('click', handleEdit)

    name.textContent = e.name
    name.id = e.id
    breed.textContent = e.breed
    sex.textContent = e.sex
    editButton.textContent = 'Edit Dog'

    newRow.appendChild(name)
    newRow.appendChild(breed)
    newRow.appendChild(sex)
    editColumn.appendChild(editButton)
    newRow.appendChild(editColumn)
    document.getElementById('table-body').appendChild(newRow)
}

function handleEdit(e) {
    const sex = e.target.parentNode.previousSibling
    const breed = sex.previousSibling
    const name = breed.previousSibling
    
    document.getElementById('dog-form').childNodes[1].value = name.textContent
    document.getElementById('dog-form').childNodes[1].id = name.id
    document.getElementById('dog-form').childNodes[3].value = breed.textContent
    document.getElementById('dog-form').childNodes[5].value = sex.textContent
}

function editDog(e) {
    e.preventDefault()
    const patchObj = {}
    patchObj.name = e.target[0].value
    patchObj.breed = e.target[1].value
    patchObj.sex = e.target[2].value
    
    fetch(`http://localhost:3000/dogs/${e.target[0].id}`,{
        method: 'PATCH',
        headers: {
            'Content-type': 'application/JSON',
            'Accept': 'application/json'
        },
        body:JSON.stringify(patchObj)
    })
    .then(response => response.json())
    .then(setTimeout(updateTable, 100))

    document.getElementById('dog-form').reset()    
}

function updateTable(e) {
    fetch('http://localhost:3000/dogs')
    .then(response => response.json())
    .then(data => {
        document.getElementById('table-body').innerHTML = ''
        data.forEach(e => populateTable(e))
    })
}
