'use strict';
let money = +prompt('Ваш месячный доход?', 90000),
    income = 'фриланс',
    addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую','интернет, ТАКСИ, коммуналка'),
    deposit = confirm('Есть ли у вас депозит в банке?'),
    mission = 1000000,
    period = 12,
    budgetDay = money / 30;

console.log(typeof money, typeof income, typeof deposit);
console.log(addExpenses.length);
console.log(`Период равен ${period} месяцев`, `Цель заработать ${mission} рублей`);
console.log('addExpenses: ', addExpenses.toLowerCase().split(' '));
console.log('budgetDay: ', budgetDay);