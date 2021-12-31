import * as readline from 'readline'

export class Reader {

    readLine: readline.Interface
    constructor(){
        this.readLine = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }
    
    question(question: string): Promise<string> { 
        return new Promise((resolve, reject) => {
            this.readLine.question(question, (input) => resolve(input));
        });
    }

    close(){
        this.readLine.close();
    }
}
