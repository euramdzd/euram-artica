function showMenu(){
  document.querySelector("#menu").classList.toggle('act');
}

function hiddMenu(){
  document.querySelector("#menu").classList.remove('act');
}



// REST ITEMS

fetch('data/portfolio.json').then(res => res.json()).then(res =>{

  let typeItem = res.map(i => i.type)

       // ارجاع عناصر بدون تكرار قيم
  typeItem =[... new Set(typeItem)]
       //   اضافة هده عناصر الى HTML

  let navItem = '';

  for(let i=0;i<typeItem.length;i++){
    navItem+= `<li data-type="${typeItem[i]}">${typeItem[i]}</li>`;
  }
  document.querySelector('#protfolio .nav').innerHTML += navItem

  let items = res.map(i => `<div class="col-lg-3 col-sm-6 box-item" data-type='${i.type}' data-index='${i.id}'><div class="box"> <img src='${i.src}' /> <div class='details'><h2>${i.title}</h2><span>${i.type}</span></div> </div></div>`).join('')
  document.getElementById('content-protfolio').innerHTML = items

  // 

  let liType = Array(...document.querySelectorAll('#protfolio .nav li'))
  let boxItem = Array(...document.querySelectorAll('#content-protfolio .box-item'))

  liType.forEach(i => {
    i.onclick =()=>{
      liType.forEach( j => j.classList.remove("act"))
      i.classList.add("act")
      boxItem.forEach(l => l.classList.remove('hidd'))
      boxItem.forEach(k=>{
        if(i.getAttribute('data-type') != k.getAttribute("data-type") && i.getAttribute("data-type") != "all"){
          k.classList.add('hidd')
        }else if(i.getAttribute("data-type") == "all"){
          boxItem.forEach(l => l.classList.remove('hidd'))
        }
      })
    }
  })

  boxItem.forEach(i=>{
    i.onclick = () =>{
      let id = i.getAttribute('data-index')
      let item = res.filter(i=> i.id == id).map(i => i)
      console.log(item)
      document.getElementById('content-protfolio').innerHTML += `
      <div class="content-details-item">
        <div class="container" style="height:100%; position:relative" >
          <div class='row'>
            <a href="index.html" class="close"> X </a>
            <div class="col-lg-6 col-sm-6"> <img src=${item[0].src} style="width:100%"/> </div>
            <div class="col-lg-6 col-sm-6"> <h2> ${item[0].title}</h2> <p> ${item[0].details} </p> </div>
          </div>
        </div>
      </div>`
    }
  })
})


// content skills

let skills = document.querySelector('#skills')

let spanProgress = skills.querySelectorAll('.prog-ress span')

// content stats

let state = document.querySelector('.stats')
let pCount = state.querySelectorAll('.box .details p')
let start = 0
window.onscroll = () => {
  if(scrollY >= 552){
    document.querySelector('.button-up').classList.add('scroll')
  }else{
    document.querySelector('.button-up').classList.remove('scroll')
  }

  if(scrollY >= skills.offsetTop - 350){
    spanProgress.forEach(span => {span.style.width = span.getAttribute('data-width')})
  }

  if(scrollY >= state.offsetTop - 704){
    
    if(!start) pCount.forEach(p => {setCount(p)})
    start = 1

  }
}

function setCount(num){  
  let numCount = num.getAttribute('data-count')
  let count = setInterval(()=>{
    num.textContent++;  
    if(numCount == num.textContent )
    clearInterval(count)

  } , 1500 / numCount)

}  

document.querySelector('.button-up').onclick = () =>{
  window.scrollTo({
    top:0,
    behavior:"smooth"
  })
}