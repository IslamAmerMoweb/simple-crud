const inp = document.querySelector('#input')
const use = document.querySelector('#user')
const act = document.querySelector('#activ')

const readStorage = (key = 'users') => JSON.parse(localStorage.getItem(key)) || []
const setStorage = (val, key = 'users') => localStorage.setItem(key, JSON.stringify(val))

const arry = readStorage("users")

const arr = ['name', 'tel', 'adress']

if (inp) {
    const arry = readStorage("users")
    inp.addEventListener('submit', function (e) {
        e.preventDefault()
        const user = {}
        arr.forEach((el, i) => {
            user[el] = inp.elements[el].value
            inp.elements[el].value = ''
        })
        arry.push(user)
        setStorage(arry)
        use.innerHTML = ''
        item(arry)
    })
}

const cr = (ele, parent, txt = null, clas = null) => {
    const el = document.createElement(ele)
    parent.appendChild(el)
    if (el) el.textContent = txt
    if (el) el.classList = clas
    return el
}

const item = (arry) => {
    arry.forEach((el, i) => {
        let tr = cr('tr', use, null, 'text-center')
        cr('td', tr, el.name)
        cr('td', tr, el.tel)
        cr('td', tr, el.adress)
        del(tr, i, arry)
        show(tr, i, arry)
    })
}

let idex

const show = (tr, i, arry) => {

    const sho = cr('td', tr, 'Edit', 'btn-warning btn')
    sho.addEventListener('click', function () {
        arr.forEach((el) => {
            if (el) inp.elements[el].value = arry[i][el]
        })
        act.classList.remove('d-none')
        document.querySelector('button').classList.add('d-none')
        addEit(i, arry)
        tr.classList = 'bg-secondary p-4'
    })
}

const addEit = (idex, arry) => {
    arry.splice(idex, 1)
    setStorage(arry)
    console.log(arry);
    console.log(idex);
}

const storage = (user) => {
    const neArr = readStorage('users')
    neArr.push(user)
    setStorage(neArr)
    console.log(neArr);
    use.innerHTML = ''
    item(neArr)
}

act.addEventListener('click', function () {
    act.classList.add('d-none')
    document.querySelector('button').classList.remove('d-none')
    const user = {}
    arr.forEach((el, i) => {
        user[el] = inp.elements[el].value
        inp.elements[el].value = ''
    })
    storage(user)
})

const del = (tr, i, arry) => {
    const dd = cr('td', tr, 'Delete', 'btn-danger btn mx-4')
    dd.addEventListener('click', function () {
        arry.splice(i, 1)
        setStorage(arry)
        use.innerHTML = ''
        item(arry)
    })
}

item(arry)
