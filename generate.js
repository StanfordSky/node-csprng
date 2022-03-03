const rand = require('./lib/nescafe');
const crypto = require('crypto');
const { appendFileSync, readFileSync } = require('fs');
const xlsx = require('node-xlsx');

const generateRealCodesLaminat = async () => {
    const SKU = new Map();

    SKU.set('Ламинат ПППП БП Авокадо 100г 1021 PRO', 665000);
    SKU.set('Ламинат ПППП БП Единороги 100г 1021 PRO', 295000);
    SKU.set('Ламинат ПППП БП Фламинго 100г 1021 PRO', 154000);
    SKU.set('Ламинат ПППП БП Медведи 120г 1021 PRO', 610000);
    SKU.set('Ламинат ПППП БП Медведи 75г 1021 PRO', 682000);
    SKU.set('Ламинат ПППП БП Кошмарики 75г 1021 PRO', 920000);
    SKU.set('Ламинат ПППП БП Машинки 75г 1021 PRO', 2243500);

    SKU.forEach((value, key) => {
        for(let i = 1; i <= value; i++) {
            const hash = `${rand(86, 34)}`
            const length = hash.length
            console.log(`${hash} - ${length}`)
            appendFileSync(`./codes/laminat/new/${key}.txt`, hash + '\n')
        }
    })
}

const generateRealCodesNescafe = async () => {
    const SKU = new Map();
    SKU.set('NESCAFE Classic Doypack 320г', 90000);

    SKU.forEach((value, key) => {
        for(let i = 1; i <= value; i++) {
            const hash = `N${rand(36, 10)}`
            const length = hash.length
            console.log(`${hash} - ${length}`)
            appendFileSync(`./codes/nescafe/addnew/${key}.txt`, hash + '\n')
        }
    })
}

const hashCodes = async () => {
    const CFN = [
        'NESCAFE Classic Doypack 320г.txt',
    ]

    CFN.forEach((fileName) => {

        if(fileName.split('.').pop() === "txt"){
            const fileContent = readFileSync(`./codes/nescafe/addnew/${fileName}`, 'utf8');
            fileContent.split("\n").forEach(value => {
                let hashedString = hashing(value);
                console.log(`- ${value} = ${hashedString}`);
                appendFileSync(`./codes/nescafe/addnew/hashed/${fileName.split('.').shift()}.txt`, hashedString + '\n')
            })
        } else if(fileName.split('.').pop() === "xlsx") {
            let file = xlsx.parse(readFileSync(`./codes/nescafe/addnew/${fileName}`))
            file[0]['data'].forEach(str => {
                let value = str.pop(),
                    hashedString = hashing(value);
                console.log(`- ${value} = ${hashedString}`);
                appendFileSync(`./codes/nescafe/addnew/hashed/${fileName.split('.').shift()}.txt`, hashedString + '\n');
            })
        }
    })
}

const hashing = (value) => {
    const salt = "NESC22hT56DWtVbSqo73X1"
    return hash256(salt + value);

}

const hash256 = (str) => {
    return crypto.createHash('sha256').update(str).digest('hex');
}

const main = async () => {
    await hashCodes();
    //await generateRealCodesLaminat();
    //await generateRealCodesNescafe();
}

main();





/*
console.log('\nТестовые:')
for(let i = 0; i < 6; i++) {
    const hash = `A${rand(48, 22)}`
    const length = hash.length
    console.log(`${hash} - ${length}`)
}

console.log('\nЗапасные:')
for(let i = 0; i < 6; i++) {
    const hash = `NR${rand(44, 22)}`
    const length = hash.length
    console.log(`${hash} - ${length}`)
}*/
