
class UI{
    //displays the categories
    displaycategory(){
      const categorylist=d.getcategories()
     .then(results=>{
        const catList= results.results.drinks;
          const firstoption= document.createElement('option');
          firstoption.textContent= '-Select-';
          firstoption.value='';
          document.querySelector('#search').appendChild(firstoption);
          catList.forEach(category=>{
          const option=document.createElement('option');
             option.textContent= category.strCategory;
              option.value=category.strCategory.split(' ').join('_');
                document.querySelector('#search').appendChild(option);
          })
      
      });
       this.isfavorite();
    }
    
    displaythedrinks(drinks){
       const ResultWrapper=document.querySelector('.results-wrapper');
       ResultWrapper.style.display= 'block';
       const resultsDiv= document.querySelector('#results');
       drinks.forEach(drink=>{
           resultsDiv.innerHTML+=`
            <div class="col-md-6">
               <div class="card my-3">
                  <button type="button" data-id="${drink.idDrink}" class="favorite-btn btn-outline-info">
                   +
                   <button>
               <img class="card-img-top" src="" alt="" >
               <div class="card-body">
                  <h2 class="card-title text-center"></h2>
                  <p class="card-text font-weight-bold">Instructions:</p>
                  <p class="card-text">

               <img class="card-img-top" src="${drink.strDrinkThumb}" alt="${drink.strDrink}" >
               <div class="card-body">
                  <h2 class="card-title text-center">${drink.strDrink}</h2>
                  <p class="card-text font-weight-bold">Instructions:</p>
                  <p class="card-text">
                       ${drink.strInstructions}
                  </p>
                  <p class="card-text">
                     <ul class="list-group">
                     <li class="list-group-item alert alert-danger">Ingredients</li>
                     ${this.displayingredients(drink)}
                     </ul>
                  </p>
                  <p class="card-text font-weight-bold">Extra infromation</p>
                  <p class="card-text">
                  <span class="badge badge-pill badge-success">
                  </span>
                  <span class="badge badge-pill badgewarning">
                     Category:
                  ${drink.strAlcoholic}
                  </span>
                  <span class="badge badge-pill badgewarning">
                     Type:   ${drink.strCategory}
                  </span>
                  </p>
                  </div> 
               </div>
            </div>
           
           `;
       });
       this.isfavorite();
    }

    displayingredients(drink){
       let ingredients=[];
        for(let i=1;i<4;i++){
           const ingredientmeasure={};
           if(drink[`strIngredient${i}`] !==''){
            ingredientmeasure.ingredient= drink[`strIngredient${i}`];
            ingredientmeasure.measure= drink[`strMeasure${i}`];
            ingredients.push(ingredientmeasure);
           }
        }
        let ingredientstemplate='';
       ingredients.forEach(ingredient=>{
        ingredientstemplate+=`
        <li class="list-group-item">${ingredient.ingredient}-${ingredient.measure}</li>
        `;
         
       });
       return ingredientstemplate;
    }
    
    //displaying search by ingredients
    displaydrinks(drinks){
         const resultsWrapper=document.querySelector('.results-wrapper');
       resultsWrapper.style.display= 'block';
       const resultsDiv= document.querySelector('#results');
       drinks.forEach(drink=>{
           resultsDiv.innerHTML+=`
            <div class="col-md-4">
               <div class="card my-3">
                <button type="button" data-id="${drink.idDrink}" class="favorite-btn btn-outline-info">
                   +
                 <button>
               <img class="card-img-top" src="${drink.strDrinkThumb}" alt="${drink.strDrink}" >
               <div class="card-body">
                  <h2 class="card-title text-center">${drink.strDrink}</h2>
                
                 <button type="button" data-target="#recipe" data-toggle="modal" data-id="${drink.idDrink}" class="btn btn-success get-recipe" >
     Get Recipe
</button>
                  </div>
               </div>
             </div>`;
                
       });
     this.isfavorite();
    }
   
    displaysinglerecipe(recipe){
      const modaltitle= document.querySelector('.modal-title'),
            modaldescription= document.querySelector('.modal-body .description-text'),
           modalingredients= document.querySelector('.modal-body .ingredient-list');    
     console.log(recipe);
     modaltitle.innerHTML=recipe.strDrink;
     modaldescription.innerHTML=recipe.strInstructions;
     modalingredients.innerHTML=this.displayingredients(recipe);
   }
    
    //display favorite
   displayfavorite(favorites){
     const favoritetable= document.querySelector('#favorites tbody');
     favorites.forEach(drink=>{
       const tr=document.createElement('tr');
       tr.innerHTML=`
           <td><img src="${drink.image}" alt="${drink.name}" width="100px"></td>
           <td>${drink.name}</td>
          
           <td>

                 <button type="button" data-target="#recipe" data-toggle="modal" data-id="${drink.id}" class="btn btn-success get-recipe" >
     View
</button>
               
               </td>
             <td>
               <a href="#" data-id="${drink.id}" class="btn btn-danger remove-recipe">
                   Remove</a>
               </td>
           `;
          favoritetable.appendChild(tr);
    })

    }

   //remove favorites
   removefavorite(element){
  element.remove();
   }
    printmessage(msg, classname){
        const div= document.createElement('div');
        div.innerHTML=`
        <div class="alert alert-${classname}">${msg}</div>
        `
        const reference= document.querySelector('.jumbotron h1');
        const parentnode= reference.parentElement;
        parentnode.insertBefore(div,reference);
        setTimeout(()=>{
            document.querySelector('.alert').remove();
        },3000);

    }

 //clear previous results
clearpreviousresponse(){
   const resultDiv=document.querySelector('#results');
   resultDiv.innerHTML='';
}
  isfavorite()
{  const drinks = db.getfromdb();
   drinks.forEach(drink=>{
  //destructuring
   let {id}= drink;
   //select the favorite
  let favoritedrink= document.querySelector(`[data-id="${id}"]`);
    if(favoritedrink){
     favoritedrink.classList.add('is-favorite');
     favoritedrink.textContent='-';
    }
  })
}
};


/*<a href="#" data-target="#recipe" data-toggle="modal" data-id="${drink.idDrink}" class="btn btn-danger get-recipe" role="button">
                  Get Recipe</a>
<a href="#" data-toggle="modal" data-target="#recipe" data-id="${drink.id}" class="btn btn-success get-recipe">
                   View</a>
*/
