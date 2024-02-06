// bar open and close
document.querySelector('.bar-icon').addEventListener("click",()=>{
    document.querySelector('.bar').classList.toggle("bar-show")
})
document.querySelector('.bar').addEventListener("click",()=>{
    document.querySelector('.bar').classList.toggle("bar-show")
})
// loading store in sessionStorage
let loading=document.getElementById('loading');
if(sessionStorage.loading!=null){
    loading.classList.add(sessionStorage.loading)
}
setTimeout(()=>{
    loading.classList.add('loading-close')
    sessionStorage.setItem("loading","loading-close")
},2500)
let temp;
// open cart when click icon cart in header and sessionStorage
let btnOpenCart=document.getElementById("cart");
let btnCloseCart=document.getElementById("close-cart");
let cartPage=document.querySelector(".cart-page");
if(sessionStorage.openCart!=null){
    cartPage.classList.add(sessionStorage.openCart)
}
btnOpenCart.onclick=function(){
    cartPage.classList.add("cart-page-open")
    sessionStorage.setItem("openCart","cart-page-open")
}
btnCloseCart.onclick=function(){
    cartPage.classList.remove("cart-page-open")
    sessionStorage.removeItem("openCart")
}

// in click value in input num in section box
let inputBox=document.querySelectorAll(".dishes-box section input")
inputBox.forEach((eo)=>{
    eo.addEventListener("input",(e)=>{
        let price=e.target.parentElement.parentElement.querySelector(".price");
        let countItems=e.target.parentElement.parentElement.querySelector("input");
        let price2=e.target.parentElement.parentElement.querySelector(".price span");
        price2.innerHTML=price.dataset.price*countItems.value
    })
})

// make items 
let btnAddToCart=document.querySelectorAll(".boxes section button")
// condition if local
let arrData;
if(localStorage.product!=null){
    arrData=JSON.parse(localStorage.product)
}else{
    arrData=[];
}
btnAddToCart.forEach((eo)=>{
    eo.addEventListener("click",(e)=>{
        let title=e.target.parentElement.querySelector("#title");
        let img=e.target.parentElement.querySelector("img");
        let price=e.target.parentElement.querySelector(".price span")
        let countItems=e.target.parentElement.querySelector("input")
        let objectData={
            title:title.innerHTML,
            img:img.src,
            price:+price.innerHTML,
            countItems:countItems.value
        }
        arrData.unshift(objectData)
        // localStorage
        localStorage.setItem("product", JSON.stringify(arrData))
        showData()
        NumItems()
        inputCart()
        total()
        let msgAdd=document.createElement("div")
        msgAdd.className="msg-add"
        msgAdd.innerHTML="Successfuly Added"
        let body=document.getElementById('body')
        body.appendChild(msgAdd)
        setTimeout(()=>{
            msgAdd.remove()
        },800)
    })
})

// function show data in page
function showData(){
    let table='';
    for(i=0;i<arrData.length;i++){
        table +=`
        <section>
        <h3>- ${arrData[i].title}</h3>
        <div class="count-items">
        <input id="in1" type="number" max="10" min="1" value="${arrData[i].countItems}">
        <h2 ><span data-price="${arrData[i].price/arrData[i].countItems}" id="price-in-cart">${arrData[i].price}</span> $</h2>
        </div>
        <img src="${arrData[i].img}" alt="">
        <div onclick="deleteItems(${i})" class="delete"><i class="fa-solid fa-trash-can"></i></div>
        </section>
        `
    }
    let cardPage=document.getElementById("cart-items")
    cardPage.innerHTML=table;
}
showData()

// function number items    and not found items   and total price
function NumItems(){
    let numItems=document.getElementById("count-cart");
    let noItems=document.getElementById("null");
    let totalData=document.querySelector(".total");
    if(arrData.length>0){
        numItems.innerHTML=arrData.length;
        numItems.style.display="flex"
        noItems.style.display="none"
        totalData.style.display="block"
    }
    else{
        numItems.style.display="none"
        noItems.style.display="flex"
        totalData.style.display="none"
    }
}
NumItems()

// function delete items
function deleteItems(i){
    arrData.splice(i,1)
    localStorage.product=JSON.stringify(arrData)
    showData()
    NumItems()
    total()
    let msgAdd=document.createElement("div")
    msgAdd.className="msg-add"
    msgAdd.innerHTML="Delete Successfuly "
    cartPage.appendChild(msgAdd)
    setTimeout(()=>{
        msgAdd.remove()
    },800)
}

// function when change value of count in cart
function inputCart(){
    let inputcart=document.querySelectorAll("#in1")
    inputcart.forEach((eo)=>{
    eo.addEventListener("input",(e)=>{
        let newPrice=e.target.parentElement.querySelector("h2 span");
        let newPrice2=e.target.parentElement.querySelector("h2 span").dataset.price;
        newPrice.innerHTML=e.target.value*newPrice2
        let objectData={
            price:newPrice.innerHTML,
        }
        arrData[i]=objectData
        total()
    })
})
}
inputCart()
// total price
function total(){
    let totalData=document.getElementById("totalData");
    let sum=0;
    for(let i=0;i<arrData.length;i++){
        sum+= +arrData[i].price;
    }
    totalData.innerHTML=sum
}
total()

// favourite
let fav=document.querySelectorAll('.dishes-box section .to-fav')
let arrFav;
if(localStorage.favData!=null){
    arrFav= JSON.parse(localStorage.favData)
}
else{
    arrFav=[];
}
// when click
fav.forEach((eo)=>{
    eo.addEventListener("click",(e)=>{
        let title=e.target.parentElement.querySelector('#title')
        let price=e.target.parentElement.querySelector('.price')
        let img=e.target.parentElement.querySelector('img')
        let objectFav={
            title:title.innerHTML,
            price:price.dataset.price,
            img:img.src,
        }
        e.target.innerHTML=`&#128151`
        arrFav.unshift(objectFav)
        // set local storage
        localStorage.setItem("favData", JSON.stringify(arrFav))
        showFavData()
        numFavData()
    })
})
// show favData
function showFavData(){
    let table2='';
    for(let x=0; x<arrFav.length; x++){
        table2 +=`
        <section>
        <div onclick="deleteFavData(${x})" class="to-fav"><i class="fa-solid fa-x"></i></div>
        <div class="img"><img src="${arrFav[x].img}" alt="" srcset=""></div>
        <h3 id="title">${arrFav[x].title}</h3>
        <div class="stars">
            <i class="fa-solid fa-star"></i> <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i> <i class="fa-solid fa-star"></i>
            <i class="fa-regular fa-star-half-stroke"></i>
        </div>
        <div class="priceANDbtn">
            <h3 class="price" data-price="40"><span>${arrFav[x].price}</span> $</h3>
            <input type="number" value="1" min="1" max="10">
        </div>
        <button type="submit" id="btn-add-item">Add To Cart</button>
    </section>
        `
    }
    let favItemsPage=document.getElementById('fav-items')
    favItemsPage.innerHTML=table2;
}
showFavData()
// delet favData
function deleteFavData(x){
    arrFav.splice(x,1)
    localStorage.favData=JSON.stringify(arrFav)
    showFavData()
    numFavData()
}
// count fav
function numFavData(){
    let countFav=document.getElementById("count-fav")
    let noItems=document.getElementById("null2");
    let deleteAllFav=document.getElementById("delete-fav-all");
    if(arrFav.length>0){
        countFav.innerHTML=arrFav.length
        countFav.style.display="flex"
        noItems.style.display="none"
        deleteAllFav.innerHTML=`<button onclick="deleteAll()">Delete All ( <span>${arrFav.length}</span> )</button>`
        deleteAllFav.style.display="block"
    }
    else{
        countFav.style.display="none"
        noItems.style.display="flex"
        deleteAllFav.style.display="none"
    }
}
numFavData()

// delete all fav
function deleteAll(){
    arrFav.splice(0)
    localStorage.removeItem("favData")
    showFavData()
    numFavData()
}

// open and close favourite page
let favBtnOpen=document.getElementById('fav')
let favPage=document.getElementById('favourite')
let favBtnClose=document.querySelector('.close-fav')
if(sessionStorage.openFav!=null){
    favPage.classList.add(sessionStorage.openFav)
}
favBtnOpen.onclick=function(){
    favPage.classList.add("favourite-open")
    sessionStorage.setItem("openFav","favourite-open")
}
favBtnClose.onclick=function(){
    favPage.classList.remove("favourite-open")
    sessionStorage.removeItem("openFav")
}

// check internet
let check=document.querySelector('.check-internet')
    if(window.navigator.onLine){
        check.style.display="none"
    }
    else{
        check.style.display="flex"
    }
window.addEventListener("online",()=>{
    check.style.display="none"
})
window.addEventListener("offline",()=>{
    check.style.display="flex"
})
// setting
document.querySelector('.setting-btn').addEventListener("click",()=>{
    document.querySelector('.setting').classList.toggle("setting-open")
    document.querySelector('.fa-gear').classList.toggle("fa-spin")
})
// change color
if(localStorage.color!=null){
    document.documentElement.style.setProperty('--main-color',localStorage.color);
}
let color=document.getElementById('color')
color.oninput=function(){
    document.documentElement.style.setProperty('--main-color',this.value);
    localStorage.setItem("color",this.value)
}
// reset
let resetSetting=document.getElementById('reset')
resetSetting.onclick=function(){
    localStorage.removeItem("color")
    document.documentElement.style.setProperty('--main-color','#11b011');
}


// -------------- scroll -------------------------------
let dishes=document.getElementById('dishes')
let about=document.getElementById('about')
let menu=document.getElementById('menu')
let review=document.getElementById('review')
let contact=document.getElementById('contact')

window.onscroll=function(){
    if(scrollY <= 500){
        a1.classList.add("active")
        a2.classList.remove("active")
        a3.classList.remove("active")
        a4.classList.remove("active")
        a5.classList.remove("active")
        a6.classList.remove("active")
    }
    if(scrollY >= dishes.offsetTop - 200){
        a1.classList.remove("active")
        a2.classList.add("active")
        a3.classList.remove("active")
        a4.classList.remove("active")
        a5.classList.remove("active")
        a6.classList.remove("active")
    }
    if(scrollY >= about.offsetTop - 200){
        a1.classList.remove("active")
        a2.classList.remove("active")
        a3.classList.add("active")
        a4.classList.remove("active")
        a5.classList.remove("active")
        a6.classList.remove("active")
    }
    if(scrollY >= menu.offsetTop - 200){
        a1.classList.remove("active")
        a2.classList.remove("active")
        a3.classList.remove("active")
        a4.classList.add("active")
        a5.classList.remove("active")
        a6.classList.remove("active")
    }
    if(scrollY >= review.offsetTop - 370){
        a1.classList.remove("active")
        a2.classList.remove("active")
        a3.classList.remove("active")
        a4.classList.remove("active")
        a5.classList.add("active")
        a6.classList.remove("active")
    }
    if(scrollY >= contact.offsetTop - 200){
        a1.classList.remove("active")
        a2.classList.remove("active")
        a3.classList.remove("active")
        a4.classList.remove("active")
        a5.classList.remove("active")
        a6.classList.add("active")
    }
    let menuSEC1=document.getElementById("m1")
    let menuSEC2=document.getElementById("m2")
    let menuSEC3=document.getElementById("m3")
    if(scrollY >= menuSEC1.offsetTop - 100){
        mm1.classList.add("active-menu")
        mm2.classList.remove("active-menu")
        mm3.classList.remove("active-menu")
    }
    if(scrollY >= menuSEC2.offsetTop - 100){
        mm1.classList.remove("active-menu")
        mm2.classList.add("active-menu")
        mm3.classList.remove("active-menu")
    }
    if(scrollY >= menuSEC3.offsetTop - 100){
        mm1.classList.remove("active-menu")
        mm2.classList.remove("active-menu")
        mm3.classList.add("active-menu")
    }
}

