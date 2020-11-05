{
  class BankAccount {
    constructor(type, money, backupAccount = null) {
      this.type = type;
      this.money = money;
      this.transactionHistory = [];
      this.backupAccount = backupAccount;
    }

    withdraw(amount) {
      const previousBalance = this.money;
      this.money = this.money - amount;
      this.transactionHistory.push({
        previousBalance: previousBalance,
        transactionType: "withdrawal",
        transactionAmount: amount,
        currentBalance: this.money,
      });

      if (this.money < 0) {
        //change to positive ammount
        const overdrawnAmount = this.money * -1;
        //withdraw from savingss (backup) account
        this.backupAccount.withdraw(overdrawnAmount);
        //deposit from the savings to checking (this account)
        this.deposit(overdrawnAmount);
        console.log("Account overdraft!");
      }
    }
    deposit(amount) {
      const previousBalance = this.money;
      this.money = this.money + amount;
      this.transactionHistory.push({
        previousBalance: previousBalance,
        transactionType: "deposit",
        transactionAmount: amount,
        currentBalance: this.money,
      });
    }
    showbalance() {
      return this.money;
    }
  }
  const savingsAccount = new BankAccount("savings", 1000);
  const checkingsAccount = new BankAccount("checkings", 0, savingsAccount);
  console.log(checkingsAccount);
  console.log(savingsAccount);

  checkingsAccount.withdraw(100);
  console.log(checkingsAccount);
  console.log(savingsAccount);
}
