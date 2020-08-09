console.log("client side js loaded")

const input=document.querySelector('#searchInput')
const button=document.querySelector('#search')
const error=document.querySelector('#error')
const forecast=document.querySelector('#forecast')
const placeName=document.querySelector('#location')
button.addEventListener('click',(e)=>{
    fetch(`http://localhost:3000/weather?address=${input.value}`)
    .then((response)=>{
            response.json()
                .then((data)=>{
                    if(data.error){
                        error.textContent=''
                        forecast.textContent=''
                        placeName.textContent=''
                        error.textContent=data.error
                    }else{
                        error.textContent=''
                        forecast.textContent=''
                        placeName.textContent=''
                        placeName.textContent='Location:'+data.location
                        forecast.textContent='Temperature:'+data.forecast
                        
                    }
                })
    })
    e.preventDefault()
})