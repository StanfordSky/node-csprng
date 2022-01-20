const rand = require('./lib/laminat');
const crypto = require('crypto');
const { appendFileSync, readFileSync } = require('fs');


const generateRealCodes = async () => {
    const SKU = new Map();
    SKU.set('Ламинат ПП/ПП БП Авокадо 100г 10/21 PRO', 665000);
    SKU.set('Ламинат ПП/ПП БП Единороги100г 10/21 PRO', 295000);
    SKU.set('Ламинат ПП/ПП БП Фламинго 100г 10/21 PRO', 154000);
    SKU.set('Ламинат ПП/ПП БП Медведи 120г 10/21 PRO', 610000);
    SKU.set('Ламинат ПП/ПП БП Медведи 75г 10/21 PRO', 682000);
    SKU.set('Ламинат ПП/ПП БП Кошмарики  75г 10/21 PRO', 920000);
    SKU.set('Ламинат ПП/ПП БП Машинки 75г 10/21 PRO', 2243500);

    console.log('\nОсновные:')
    SKU.forEach((value, key) => {
        for(let i = 1; i <= value; i++) {
            const hash = `N${rand(36, 10)}`
            const length = hash.length
            console.log(`${hash} - ${length}`)
            appendFileSync(`./codes/laminat/new/${key}.txt`, hash + '\n')
        }
    })
}

const hashCodes = async () => {
    const CFN = [
        //'12509939  NESCAFE Classic Doypack 12x60g NCP22 RU.txt',
        //'12510128  NESCAFE CLASSIC Jar 12x95g NCP22 RU.txt',
        //'12510134  NESCAFE Black Roast Jar 12x85g NCP22 RU.txt',
        //'12510135  NESC CLASSIC Crema Jar 12x95g NCP22 RU.txt',
        //'12510146  NESCAFE CLASSIC Doy 8x190g NCP22 RU.txt',
        //'12510159  NESC Classic Crema Jar 6x190g NCP22 RU.txt',
        //'12510160  NESC CLASSIC Crema Doy 8x120g NCP22 RU.txt',
        //'12510162  NESCAFE CLASSIC Jar 6x190g NCP22 RU.txt',
        //'NESCAFE CLASSIC Doy 12x130g Y19 RU.txt',
        //'NESCAFE CLASSIC DoyPack 8x320g RU.txt',
        //'Nescafe Classic 320g.txt'
    ]

    CFN.forEach((fileName) => {
        const fileContent = readFileSync(`./codes/nescafe/common/${fileName}`, 'utf8');
        fileContent.split("\n").forEach(value => {
            const salt = "NESC22hT56DWtVbSqo73X1"
            const hashedString = hash256(salt + value);
            console.log(`- ${value} = ${hashedString}`);
            appendFileSync(`./codes/nescafe/common/hashed/${fileName}.txt`, hashedString + '\n')
        })
    })
}

const hash256 = (str) => {
    return crypto.createHash('sha256').update(str).digest('hex');
}

const main = async () => {
    //await hashCodes();
    await generateRealCodes();
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
