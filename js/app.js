'use strict';
let money = 90000,
    income = 'фриланс',
    addExpenses = 'интернет, ТАКСИ, коммуналка',
    deposit = false,
    mission = 1000000,
    period = 12,
    budgetDay = money / 30;

console.log(typeof money, typeof income, typeof deposit);
console.log(addExpenses.length);
console.log(`Период равен ${period} месяцев`, `Цель заработать ${mission} рублей`);
console.log('addExpenses: ', addExpenses.toLowerCase().split(' '));
console.log('budgetDay: ', budgetDay);