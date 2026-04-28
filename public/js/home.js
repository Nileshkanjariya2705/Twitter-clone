
const  model= document.getElementById('model');
const main=document.getElementById('container');
function showModel(){
    main.style.display='none'
    model.style.display='block'

}

document.getElementById('cross').addEventListener('click',()=>{
     model.style.display='none'
     main.style.display='grid'
})