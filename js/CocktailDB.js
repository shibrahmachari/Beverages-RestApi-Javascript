class drinksdb
{
   //saving in localstorage
   
   saveintodb(drink){
   const drinks=this.getfromdb();
   drinks.push(drink);
   localStorage.setItem('drinks', JSON.stringify(drinks));
   };
   
  
  
  getfromdb(){
  let drinks;
  const drinkls=localStorage.getItem('drinks');
  if(drinkls=== null){
    drinks=[];
  }else{
  drinks=JSON.parse(drinkls);
  }
  return drinks;
  }
   
   //removing from local storage
   removefromdb(id){
   const drinks=this.getfromdb();
   drinks.forEach((drink,index)=>{
   if(drink.id===id){
   drinks.splice(index,1);
   }
   });
      localStorage.setItem('drinks',JSON.stringify(drinks));
   }

};
