import inquirer from "inquirer"
type userDataType= {
    'userOneName':string,
    'userTwoName':string,
    'userOneID':string,
    'userTwoID':string,
    'userOnePin':number,
    'userTwoPin': number
}
let userData:userDataType = {
    'userOneName': 'sarosh',
    'userTwoName': 'ahmed',
    'userOneID':'saroshad',
    'userTwoID':'ahmed123',
    'userOnePin':12345,
    'userTwoPin':98765
}
class Bank{
    'gLoginForm': string
    'gBalance':number = Math.floor(Math.random()*20000)
    'gAmount':number
    'gloop':boolean=true
    'gPinGenerator': number = Math.floor(Math.random()*(99999-10000+1))+10000
    'sarosh':string
    async loginOption(){
        let loginPrompt = await inquirer.prompt([{
            type:'list',
            name:'loginSignUp',
            message:'Login or Sign Up',
            choices:['login', 'signUp']
        }])
        this.gLoginForm=loginPrompt.loginSignUp
        if (this.gLoginForm==='login'){
            console.log('user logged in')
            let loginPagePrompt = await inquirer.prompt([{
                type:'input',
                name:'userID',
                message: 'Enter your username',
            },
            {
                type:'password',
                name:'userPassword',
                message:'Enter Password'
            }
        ])
        
        if ((loginPagePrompt.userID===userData.userOneID&&parseInt(loginPagePrompt.userPassword)===userData.userOnePin)||
            loginPagePrompt.userID===userData.userTwoID&&parseInt(loginPagePrompt.userPassword)===userData.userTwoPin){
                console.log('Login successful')
                if(loginPagePrompt.userID===userData.userOneID){
                    console.log('ID DETECTED OF MR '+(userData.userOneName.toUpperCase()))
                }
                else{
                    console.log('ID DETECTED OF MR. '+ userData.userTwoName.toUpperCase())
                }
                this.loginChoice()
            }
            else{
                console.log('Invalid ID or Password')
            }
        }
        else{//signup
            while(this.gloop){
            let SignUpPrompt = await inquirer.prompt([{
                type:'input',
                name:'newName',
                message:'Enter your name'
            },
            {
                 type:'input',
                 name:'newID',
                 message:'Enter your unique ID'
            }
        ])
        if(SignUpPrompt.newID.toLowerCase()===userData.userOneID.toLowerCase()
            ||SignUpPrompt.newID.toLowerCase()===userData.userTwoID.toLowerCase()){
            console.log('Username not available try another username')
        }
        else{
            console.log('username registered successfully')
            console.log('Name: '+SignUpPrompt.newName +' \tusername: '+ SignUpPrompt.newID+ '\t5 Digit Pin: '+ this.gPinGenerator)
            this.gloop=false
            break
        }
    }
        }
    }
    async loginChoice(){
        let loginChoicePrompt = await inquirer.prompt([{
            type:'list',
            name:'loginChoice',
            message:'Select actions',
            choices:['Balance Check', 'Pay via Debit', 'Pay via Credit']
        }])
        switch(loginChoicePrompt.loginChoice){
            case 'Balance Check':
                console.log('Your current Balance is: '+ this.gBalance+'$')
                break
            case 'Pay via Debit':
                this.payDebt()
                break
            case 'Pay via Credit':
                console.log('Pay via Credit')
                this.payCredit()
                break
        }
    }
    async payDebt(){
        console.log('Your existing balance is :'+ this.gBalance+'$')
        let payDebtAmountPrompt = await inquirer.prompt([{
            type:'input',
            name:'payDebtAmount',
            message:'Enter the amount'
        }])
        this.gAmount=parseInt(payDebtAmountPrompt.payDebtAmount)
        if (this.gAmount>=this.gBalance){
            console.log('Amount exceeds current balance,'+ this.gBalance +'$'+'\n transaction cancelled')
        }
        else{
            console.log('Amount Paid: '+ this.gAmount +` Current Balance is:${this.gBalance-=this.gAmount} $`)
        }
    }
    async payCredit(){
        console.log('Your existing balance is: '+this.gBalance+'$')
        let payCreditAmountPrompt = await inquirer.prompt([{
            type:'input',
            name:'payCreditAmount',
            message:'Enter the Amount, tranaction fee 1$'
        }])
        this.gAmount=parseInt(payCreditAmountPrompt.payCreditAmount)
        if (this.gAmount>=this.gBalance){
            console.log('Amount exceeds current balance '+ this.gBalance +'$'+'\n transaction cancelled')
        }
        else{
            this.gBalance--
            console.log('Amount Paid: '+ this.gAmount +` Current Balance is:${this.gBalance-=this.gAmount} $`)
        }
    }
}
let user = new Bank()
user.loginOption()