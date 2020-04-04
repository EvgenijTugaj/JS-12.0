'use strict';
let money = +prompt('Ваш месячный доход?', 90000),
    income = 'фриланс',
    addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую','интернет, ТАКСИ, коммуналка'),
    deposit = confirm('Есть ли у вас депозит в банке?'),
    mission = 1000000,
    period = 12,
    budgetDay = money / 30,
    expenses1 = prompt('Введите обязательную статью расходов?', 'Вода'),
    expenses2 = prompt('Введите ещё обязательную статью расходов?', 'Еда'),
    amount1 = +prompt('Во сколько это обойдется?', 1000),
    amount2 = +prompt('Во сколько это ещё обойдется?', 2000),
    budgetMonth = money - amount1 - amount2;
    budgetDay = Math.floor(budgetMonth / 30);
    
if(budgetDay >= 1200)
  console.log('У вас высокий уровень дохода');
else if(budgetDay < 1200 && budgetDay >= 600)
  console.log('У вас высокий уровень дохода');
else if(budgetDay < 600 && budgetDay > 0)
  console.log('К сожалению у вас уровень дохода ниже среднего');
else
  console.log('Что то пошло не так');

console.log('budgetMonth: ', budgetMonth);
console.log(`Миссия будет достигнута через ${Math.ceil(mission / budgetMonth)} месяцев` );
console.log(typeof(money), typeof(income), typeof deposit);
console.log(addExpenses.length);
console.log(`Период равен ${period} месяцев`, `Цель заработать ${mission} рублей`);
console.log('addExpenses: ', addExpenses.toLowerCase().split(' '));
console.log('budgetDay: ', budgetDay);