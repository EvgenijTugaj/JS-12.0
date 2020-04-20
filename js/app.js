'use strict';

let isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n)
}

let money,
  start = function () {
    do {
      money = prompt('Ваш месячный доход?', 90000);
    }
    while (!isNumber(money))
  }

let appData = {
  income: {},
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  mission: 1000000,
  period: 12,
  budget: money,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  asking: function(){
    appData.addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'интернет, ТАКСИ, коммуналка');
    appData.deposit = confirm('Есть ли у вас депозит в банке?');
  },
  getExpensesMonth: function () {
    let sum = 0, checkNum, exp, ex = ['вода', 'еда'], ask;
    for (let i = 0; i < 2; i++) {
      ask = prompt('Введите обязательную статью расходов?', ex[i]);
      do {
        checkNum = +prompt('Во сколько это обойдется?', (i + 1) * 1000);
      }
      while (!isNumber(checkNum))
      appData.expenses[ask] = +checkNum;
      // sum += +checkNum;
    }
    
    appData.expenses.forEach(el => {
      sum += +appData.expenses.el;
    });
    return sum;
  },
  getAccumulatedMonth: function () {
    return appData.budget - appData.getExpensesMonth();
  },
  getTargetMonth: function () {
    return Math.ceil(appData.mission / appData.accumulatedMonth);
  },
  getStatusIncome: function () {
    if (budgetDay >= 1200)
      return 'У вас высокий уровень дохода';
    else if (budgetDay < 1200 && budgetDay >= 600)
      return 'У вас высокий уровень дохода';
    else if (budgetDay < 600 && budgetDay > 0)
      return 'К сожалению у вас уровень дохода ниже среднего';
    else
      return 'Что то пошло не так';
  }
  
}

start();


let accumulatedMonth = appData.getAccumulatedMonth();
let budgetDay = Math.floor(accumulatedMonth / 30);


console.log('appData.expenses: ', appData.expenses);
console.log('getTargetMonth: ', appData.getTargetMonth() > 0 ? `Цель будет достигнута` : 'Цель не будет достигнута');
console.log('budgetDay: ', budgetDay);
console.log('getStatusIncome: ', appData.getStatusIncome(budgetDay));