
const readline = require('readline')

const radicals = '⼀⼁⼂⼃⼄⼅⼆⼇⼈⼉⼊⼋⼌⼍⼎⼏⼐⼑⼒⼓⼔⼕⼖⼗⼘⼙⼚⼛⼜⼝⼞⼟⼠⼡⼢⼣⼤⼥⼦⼧⼨⼩⼪⼫⼬⼭⼮⼯⼰⼱⼲⼳⼴⼵⼶⼷⼸⼹⼺⼻⼼⼽⼾⼿⽀⽁⽂⽃⽄⽅⽆⽇⽈⽉⽊⽋⽌⽍⽎⽏⽐⽑⽒⽓⽔⽕⽖⽗⽘⽙⽚⽛⽜⽝⽞⽟⽠⽡⽢⽣⽤⽥⽦⽧⽨⽩⽪⽫⽬⽭⽮⽯⽰⽱⽲⽳⽴⽵⽶⽷⽸⽹⽺⽻⽼⽽⽾⽿⾀⾁⾂⾃⾄⾅⾆⾇⾈⾉⾊⾋⾌⾍⾎⾏⾐⾑⾒⾓⾔⾕⾖⾗⾘⾙⾚⾛⾜⾝⾞⾟⾠⾡⾢⾣⾤⾥⾦⾧⾨⾩⾪⾫⾬⾭⾮⾯⾰⾱⾲⾳⾴⾵⾶⾷⾸⾹⾺⾻⾼⾽⾾⾿⿀⿁⿂⿃⿄⿅⿆⿇⿈⿉⿊⿋⿌⿍⿎⿏⿐⿑⿒⿓⿔⿕'

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const lines = []

rl.on('line', (line) => {
    lines.push(line)
})

rl.on('close', () => {
    const result = convert(lines.join('\n'))
    console.log(result)
})

const convert = (input) => {
    const result = []
    result.push(`<?php`)
    result.push(`class Dictionary {`)
    result.push(`public static $radicals = array(`)
    result.push(radicals.split('').map((item) => `"${item}"`).join(', '))
    result.push(`);`)

    result.push(`public static $dictionary = array(`)
    const content = lines.join('\n')
    const arr = JSON.parse(content)
    Object.entries(arr).forEach(([string, kRSUnicode]) => {
        let rs = kRSUnicode
        if(rs.includes(' ')) rs = rs.split(' ').filter((item) => !item.includes('\''))[0]
        const [radical, stroke] = rs.split('.').map((i) => parseInt(i))
        result.push(`"${string}"=>array(${radical}, ${stroke}),`)
    })
    result.push(`);`)
    result.push(`}`)
    result.push(`?>`)
    return result.join('\n')
}
