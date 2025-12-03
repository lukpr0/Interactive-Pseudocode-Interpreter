import fs from 'fs'
import path from 'path'
import { LZW } from './lzw.js'
import { assert } from 'console'
import { Codeli } from './codeli.js'

const basePath = './Algorithms'
fs.readdir(basePath, (err, files) => {
    let data = []

    let sumLZW = 0;
    let sumCodeli = 0;

    for (const file of files) {
        //let file = files[4]
        let filePath = path.join(basePath, file)
        if (fs.lstatSync(filePath).isDirectory()) {
            continue;
        }
        let text = fs.readFileSync(filePath, { encoding: 'utf8' }).toString().replaceAll('\r', '')
        let [compressedLZW, sizeLZW] = LZW.compress(text)
        let [compressedCodeli, sizeCodeli] = Codeli.compress(text);


        const base66codeli = numsToStr(compressedCodeli, sizeCodeli)
        const numsCodeli = strToNums(base66codeli, sizeCodeli)

        const base66lzw = numsToStr(compressedLZW, sizeLZW)
        const numsLZW = strToNums(base66lzw, sizeLZW)

        let decompressedLZW = LZW.decompress(numsLZW)
        let decompressedCodeli = Codeli.decompress(numsCodeli)

        let ratioLZW = base66lzw.length / text.length
        let ratioCodeli = base66codeli.length / text.length

        sumLZW += ratioLZW;
        sumCodeli += ratioCodeli;


        data.push({
            'path': filePath,
            'length': text.length,
            'comp (LZW)': compressedLZW.length,
            'comp (Codeli)': compressedCodeli.length,
            'enc (LZW)': base66lzw.length,
            'enc (Codeli)': base66codeli.length,
            'ratio (LZW)': ratioLZW * 100,
            'ratio (Codeli)': ratioCodeli * 100,
            'size (LZW)': sizeLZW,
            'size (Codeli)': sizeCodeli
        })
        assert(text == decompressedCodeli, "codli")
        assert(text == decompressedLZW, "stock lzw")

    }
    data.sort((a,b) => {
        let x = a['ratio (Codeli)'] 
        let y = b['ratio (Codeli)']
        return x - y
    })
    for (const line of data) {
        console.log(`[${line['path'].replace('Algorithms\\', '').replace('.pseudo', '')}], [${line['enc (LZW)']}], [${line['enc (Codeli)']}], [${round(line['ratio (LZW)'])}%], [${round(line['ratio (Codeli)'])}%], [${line['size (LZW)']}], [${line['size (Codeli)']}], `)
    }
    console.table(data)
    console.log(`avg. LZW = ${(1-sumLZW/files.length)*100}%, avg. Codeli = ${(1-sumCodeli/files.length)*100}`)
})

function round(x) {
    return Math.round(x*10)/10
}

/*let test = `function test()`
let comp = LZW1.compress(test)
let decomp = LZW1.decompress(comp)
console.log(decomp)*/

const urlsafe="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_!-*";

function numsToStr(nums, base) {
    let result = 0n
    for (const num of nums) {
        result *= BigInt(base)
        result += BigInt(num)
    }
    let encoded = ""
    while (result > 0n) {
        const pos = result % BigInt(urlsafe.length)
        encoded += urlsafe[Number(pos)];
        result /= BigInt(urlsafe.length);
    }
    return encoded.split("").reverse().join("")
}

function strToNums(str, base) {
    let num = 0n
    for (const char of str) {
        num *= BigInt(urlsafe.length)
        num += BigInt(urlsafe.indexOf(char))
    }
    let result = []
    while (num > 0n) {
        const pos = num % BigInt(base)
        result.push(Number(pos))
        num /= BigInt(base)
    }
    return result.reverse()
}