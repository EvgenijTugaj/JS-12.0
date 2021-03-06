'use strict';

let start = document.getElementById('start'),
    btnPlus = document.getElementsByTagName('button'),
    incomePlus = btnPlus[0],
    expensesPlus = btnPlus[1],
    additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
    depositCheck = document.querySelector('#deposit-check'),
    budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
    budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
    expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
    accumulatedMonthValue = document.querySelector('.accumulated_month'),
    additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
    additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
    incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
    targetMonthValue = document.getElementsByClassName('target_month-value')[0],
    salaryAmount = document.querySelector('.salary-amount'),
    incomeTitle = document.querySelector('.income-title'),
    expensesTitle = document.querySelector('.expenses-title'),
    expensesItems = document.querySelectorAll('.expenses-items'),
    additionalExpenses = document.querySelector('.additional_expenses-item'),
    targetAmount = document.querySelector('.target-amount'),
    periodSelect = document.querySelector('.period-select'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    incomeItems = document.querySelectorAll('.income-items'),
    periodAmount = document.querySelector('.period-amount'),
    reset = document.querySelector('#cancel'); 

let isNumber = n => {
    return !isNaN(parseFloat(n) && isFinite(n));
};

class AppData {
    constructor() {
        this.addExpenses = [];
        this.deposit = false;
        this.percentDeposit = 0;
        this.moneyDeposit = 0;
        this.budget = 0;
        this.budgetDay = 0;
        this.budgetMonth = 0;
        this.expensesMonth = 0;
        this.numberMonths = 0;
        this.addIncome = [];
        this.expenses = {};
        this.income = {};
        this.incomeMonth = 0;
    }
    start() {
        if (salaryAmount.value === '') {
            start.setAttribute('disabled', 'true');
            return;
        }
        let allInput = document.querySelectorAll('.data input[type = text]');
        allInput.forEach((item) => {
            item.setAttribute('disabled', 'true');
        });
        incomePlus.style.display = 'none';
        expensesPlus.style.display = 'none';
        start.style.display = 'none';
        reset.style.display = 'block';

        this.budget = +salaryAmount.value;

        this.getExpenses(); //получаем Обязательные расходы
        this.getExpensesMonth(); //складываем Обязательные расходы
        this.getAddExpenses(); //получаем Возможные расходы
        this.getIncome(); //получаем Дополнительный доход
        this.getIncomeMonth(); //складываем Дополнительный доход
        this.getAddIncome(); //получаем Возможный доход
        this.getBudget();
        this.showResult();
    }
    showResult() {
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = this.budgetDay;
        expensesMonthValue.value = this.expensesMonth;
        additionalExpensesValue.value = this.addExpenses.join(', ');
        additionalIncomeValue.value = this.addIncome.join(', ');
        targetMonthValue.value = Math.ceil(this.getTargetMonth());
        incomePeriodValue.value = this.calcPeriod();
        periodSelect.addEventListener('input', () => {
            periodSelect = document.querySelector('.period-select');
            incomePeriodValue.value = this.calcPeriod();
        });

    }
    addExpensesBlock() {
        expensesItems = document.querySelectorAll('.expenses-items');
        if (expensesItems.length === 2) {
            expensesPlus.style.display = 'none';
            // return;
        }
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);

    }
    getExpenses() {
        expensesItems = document.querySelectorAll('.expenses-items');
        expensesItems.forEach((item) => {
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;
            if (itemExpenses !== '' || cashExpenses !== '') {
                this.expenses[itemExpenses] = +cashExpenses;
            }
        });

    }
    getExpensesMonth() {
        for (let key in this.expenses) {
            this.expensesMonth += this.expenses[key];
        }
    }
    addIncomeBlock() {
        incomeItems = document.querySelectorAll('.income-items');
        if (incomeItems.length === 2) {
            incomePlus.style.display = 'none';
            // return;
        }
        let cloneIncomeItem = incomeItems[0].cloneNode(true);
        incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
    }
    getIncome() {
        incomeItems = document.querySelectorAll('.income-items');
        incomeItems.forEach((item) => {
            let itemIncome = item.querySelector('.income-title').value;
            let cashIncome = item.querySelector('.income-amount').value;
            if (itemIncome !== '' || cashIncome !== '') {
                this.income[itemIncome] = +cashIncome;
            }
        });
    }
    getIncomeMonth() {
        for (let key in this.income) {
            this.incomeMonth += +this.income[key];
        }
    }
    getAddExpenses() {
        let addExpenses = additionalExpensesItem.value.split(', ');
        addExpenses.forEach((item) => {
            item = item.trim();
            if (item !== '') {
                this.addExpenses.push(item);
            }
        });
    }
    getAddIncome() {
        additionalIncomeItem.forEach((item) => {
            let itemValue = item.value.trim();
            if (itemValue !== '') {
                this.addIncome.push(itemValue);
            }
        });
    }
    asking() {
        this.deposit = confirm('Есть ли у вас депозит в банке?');
    }
    getBudget() {
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
        this.budgetDay = Math.floor(this.budgetMonth / 30);
    }
    getTargetMonth() {
        return targetAmount.value / this.budgetMonth;
    }
    periodSelectChange() {
        periodSelect = document.querySelector('.period-select');
        periodAmount.textContent = periodSelect.value;
    }
    calcPeriod() {
        return this.budgetMonth * periodSelect.value;
    }
    getInfoDeposit() {

        if (this.deposit) {
            do {
                this.percentDeposit = prompt('Какой годовой процент?', '10');
            }
            while (!isNumber(this.percentDeposit));
            this.percentDeposit = +this.percentDeposit;
            do {
                this.moneyDeposit = prompt('Какая сумма заложена?', 20000);
            }
            while (!isNumber(this.moneyDeposit));
            this.moneyDeposit = +this.moneyDeposit;
        }
    }
    calcSaveMoney() {
        return this.budgetMonth * this.period;
    }
    resetAction() {
        periodSelect.value = '0';
        periodAmount.textContent = periodSelect.value;

        let inputTextData = document.querySelectorAll('.data input[type = text]'),
            resultInputAll = document.querySelectorAll('.result input[type = text]');

        inputTextData.forEach((elem) => {
            elem.value = '';
            elem.removeAttribute('disabled');
        });

        resultInputAll.forEach((item) => {
            item.value = '';
        });
        for (let i = 1; i < incomeItems.length; i++) {     
            incomeItems[i].parentNode.removeChild(incomeItems[i]);  
        }
        for (let i = 1; i < expensesItems.length; i++) {
            expensesItems[i].parentNode.removeChild(expensesItems[i]);   
        }
        incomePlus.style.display = 'block';
        expensesPlus.style.display = 'block';
        this.addExpenses = [];
        this.deposit = false;
        this.percentDeposit = 0;
        this.moneyDeposit = 0;
        this.budget = 0;
        this.budgetDay = 0;
        this.budgetMonth = 0;
        this.expensesMonth = 0;
        this.numberMonths = 0;
        this.addIncome = [];
        this.expenses = {};
        this.income = {};
        this.incomeMonth = 0;
        reset.style.display = 'none';
        start.style.display = 'block';
        start.removeAttribute('disabled');
    }
    eventListener() {
        salaryAmount.addEventListener('input', () => {
            if (isNaN(salaryAmount.value)) {
                salaryAmount.value = salaryAmount.value.slice(0, salaryAmount.value.length - 1);
            }
        });
        start.addEventListener('click',() => this.start());
        expensesPlus.addEventListener('click', this.addExpensesBlock);
        incomePlus.addEventListener('click', this.addIncomeBlock);
        periodSelect.addEventListener('input', this.periodSelectChange);
        reset.addEventListener('click', () => this.resetAction());
    }
}

const appData = new AppData();

appData.eventListener();