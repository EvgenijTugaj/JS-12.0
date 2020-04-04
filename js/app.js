'use strict';

let isNumber = function(n){
  return !isNaN(parseFloat(n)) && isFinite(n)
}

let showTypeOf = function(tf){
  console.log( tf + ': ', typeof(tf) );
}

let money,
    income = 'фриланс',
    addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую','интернет, ТАКСИ, коммуналка'),
    deposit = confirm('Есть ли у вас депозит в банке?'),
    mission = 1000000,
    period = 12;

let start = function(){
  do{
    money = prompt('Ваш месячный доход?', 90000);
  }
  while(!isNumber(money))
}

start();

let expenses = [];

let getExpensesMonth = function(){
  let sum = 0;
  let checkNum;
  let ex = ['вода', 'еда'];
  for(let i = 0; i < 2; i++){
    expenses[i] = prompt('Введите обязательную статью расходов?', ex[i]);
    do{
      checkNum = +prompt('Во сколько это обойдется?', (i + 1) * 1000);
    }
    while(!isNumber(checkNum))
    sum += +checkNum;
  }
  return sum;
}

let getAccumulatedMonth = function(){
  return money - getExpensesMonth();
}

let accumulatedMonth  = getAccumulatedMonth();

let budgetDay = Math.floor(accumulatedMonth / 30);

let getStatusIncome = function(){
  if(budgetDay >= 1200)
    return 'У вас высокий уровень дохода';
  else if(budgetDay < 1200 && budgetDay >= 600)
    return 'У вас высокий уровень дохода';
  else if(budgetDay < 600 && budgetDay > 0)
    return 'К сожалению у вас уровень дохода ниже среднего';
  else
    return 'Что то пошло не так';
}



let getTargetMonth = function(){
  return Math.ceil(mission / accumulatedMonth);
}

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);
// console.log('getExpensesMonth: ', getExpensesMonth());
console.log('addExpenses: ', addExpenses.toLowerCase().split(' '));
console.log('getTargetMonth: ', getTargetMonth() > 0 ? `Цель будет достигнута` : 'Цель не будет достигнута');
console.log('budgetDay: ', budgetDay);
console.log('getStatusIncome: ', getStatusIncome(budgetDay));


