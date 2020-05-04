const ui= new UI();
const d= new drinks();
const db=new drinksdb();
eventlisteners();
function eventlisteners(){
    document.addEventListener('DOMContentLoaded', documentReady);
    const searchform= document.querySelector('#search-form');
    const resultsDiv= document.querySelector('#results');
    if(searchform){
        searchform.addEventListener('submit', getbyname);
    }
    if(resultsDiv){
       resultsDiv.addEventListener('click', resultDelegation);
    }
}
function getbyname(e){
    e.preventDefault();
    const r= document.querySelector('#search').value;
    if(r===''){
        ui.printmessage('Please fill the form','danger');
    }else{
        let serverresponse;
        const type= document.querySelector('#type').value;
        switch(type){
            case 'name':
                serverresponse=d.getdrinksbyname(r);
                break;
            case 'ingredient':
                serverresponse=d.getdrinksbyingredients(r);
                break;
            case 'category':
                serverresponse=d.getdrinksbycategory(r);
                break;
        }
        
       ui.clearpreviousresponse();
       serverresponse
        .then(results=>{
           if(results.results.drinks === null){
               ui.printmessage('Please enter valid category', 'danger');
           }else{
               if(type === 'name')
               {
               ui.displaythedrinks(results.results.drinks);
               }
               else{
                    //display with ingredient
                   ui.displaydrinks(results.results.drinks);
               }
             }
        });
    }
}
function resultDelegation(e)
{   e.preventDefault();
    if(e.target.classList.contains('get-recipe'))
   {  console.log('clciked');
     d.getsinglerecipe(e.target.dataset.id)
    .then(results=>{
        ui.displaysinglerecipe(results.results.drinks[0]);
    })
   }
  //favorite btn delegation
   if(e.target.classList.contains('favorite-btn'))
   {   if(e.target.classList.contains('is-favorite'))
       {
          e.target.classList.remove('');
          e.target.textContent='+';
           //remove from storage
              db.removefromdb(e.target.dataset.id);
          }else{
              //adding to favorite
               e.target.classList.add('is-favorite');
               e.target.textContent='-';
              
              //getinfo
              const cardbody= e.target.parentElement;
              const drinkinfo={
              id:e.target.dataset.id,
              name:cardbody.querySelector('.card-title').textContent,
              image:cardbody.querySelector('.card-img-top').src 
              }
              db.saveintodb(drinkinfo);
          }
    
   }
}

function documentReady(){
    //display on load
    ui.isfavorite();
    //select the search category
    const searchcategory= document.querySelector('.search-category');
    if(searchcategory){
    ui.displaycategory();
    }
    
    //display favorites
    const favoritestable= document.querySelector('#favorites');
    if(favoritestable){
      const drinks= db.getfromdb();
  console.log(drinks);
      ui.displayfavorite(drinks);
           
        //when view or remove is clicked
         favoritestable.addEventListener('click',e=>{
           e.preventDefault();                                
          if(e.target.classList.contains('get-recipe')){
              d.getsinglerecipe(e.target.dataset.id)
              .then(results=>{
              ui.displaysinglerecipe(results.results.drinks[0]);
          })
          }     
          
          if(e.target.classList.contains('remove-recipe')){
            ui.removefavorite(e.target.parentElement.parentElement);
           db.removefromdb(e.target.dataset.id);
          } 
         })
        }                                       
}
