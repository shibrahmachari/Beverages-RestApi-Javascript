class drinks{
   async getdrinksbyname(r){
      const apiresponse= await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${r}`);
       const results= await apiresponse.json();
       return {
           results
       }
    }
  
    async getdrinksbyingredients(ingredient){
      const apiresponse= await fetch(` https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`);
       const results= await apiresponse.json();
       return {
           results
       }
    }
   
    async getsinglerecipe(id){
      const apiresponse= await fetch(` https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
       const results= await apiresponse.json();
       return {
           results
       }
    }
   
   async getcategories(){
      const apiresponse= await fetch(` https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list`);
       const results= await apiresponse.json();
       return {
           results
       }
    }
    async getdrinksbycategory(category){
       
      const apiresponse= await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`);
       const results= await apiresponse.json();
       return {
           results
       }
    }
   
}
