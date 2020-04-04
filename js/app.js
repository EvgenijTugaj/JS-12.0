'use strict';

let showTypeOf = function(tf){
  console.log( tf + ': ', typeof(tf) );
}

let money = +prompt('Ваш месячный доход?', 90000),
    income = 'фриланс',
    addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую','интернет, ТАКСИ, коммуналка'),
    deposit = confirm('Есть ли у вас депозит в банке?'),
    mission = 1000000,
    period = 12,
    expenses1 = prompt('Введите обязательную статью расходов?', 'Вода'),
    expenses2 = prompt('Введите ещё обязательную статью расходов?', 'Еда'),
    amount1 = +prompt('Во сколько это обойдется?', 1000),
    amount2 = +prompt('Во сколько это ещё обойдется?', 2000);

    let getExpensesMonth = function(){
      return amount1 + amount2;
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
console.log('getExpensesMonth: ', getExpensesMonth());
console.log('addExpenses: ', addExpenses.toLowerCase().split(' '));
console.log('getTargetMonth: ', getTargetMonth());
console.log('budgetDay: ', budgetDay);
console.log('getStatusIncome: ', getStatusIncome(budgetDay));


