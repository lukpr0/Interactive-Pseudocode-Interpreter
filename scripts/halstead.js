
const operators_var = `function; QuickSort; (; ,; ,; ); var; begin; if; >; or; <; then; return; end; :=; Partition; (; ,; ,; ); Quicksort; (; ,; ,; -; ); Quicksort; (; ,; +; ,; ); end;
function; Partitio; (; ,; ,; ); var; ,; ,; ,; begin; :=, [; ]; :=; for; in; ..; do; if; [; ]; <=; then; :=; [; ]; [; ]; :=; [; ]; [; ]; :=; :=; +; end; end; :=; [; ]; [; ]; := [; ]; [; ]; :=;  return; end 
`.split(";").map(s => s.trim())

const operators_indent = `function; QuickSort; (; ,; ,; ); if; >; or; <; return; :=; Partition; (; ,; ,; ); Quicksort; (; ,; ,; -; ); Quicksort; (; ,; +; ,; );
function; Partition; (; ,; ,; ); :=, [; ]; :=; for; in; ..; if; [; ]; <=; :=; [; ]; [; ]; :=; [; ]; [; ]; :=; :=; +; :=; [; ]; [; ]; := [; ]; [; ]; :=; return;`.split(";").map(s => s.trim())

const operators_block = `function; QuickSort; (; ,; ,; ); if; >; or; <; then; return; end; :=; Partition; (; ,; ,; ); Quicksort; (; ,; ,; -; ); Quicksort; (; ,; +; ,; ); end;
function; Partition; (; ,; ,; ); :=, [; ]; :=; for; in; ..; do; if; [; ]; <=; then; :=; [; ]; [; ]; :=; [; ]; [; ]; :=; :=; +; end; end; :=; [; ]; [; ]; := [; ]; [; ]; :=;  return; end `.split(";").map(s => s.trim())


const operands = `arr, l, r, p, l, r, l, 0, p, arr, l, r, arr, l, p, 1, arr, p, 1, r
arr, l, r, pivot, i, j, tmp, pivot, arr, r, i, l, j, l, r, arr, j, pivot, tmp, arr, i, arr, i, arr, j, arr, j, tmp, i, i, 1, tmp, arr, i, arr, i, arr, r, arr, r, tmp, i`.split(",").map(s => s.trim())

const pattern = /(function|for|if|then|do|end|in|return|var|begin|or|and|:=|\[|\]|\.\.|<=|=>|=|<|>|,|\d*|\w*|(?:\s*))*/gm

function count(list) {
    const map = new Map()
    for (const word of list) {
        const count = map.has(word) ? map.get(word) + 1 : 0;
        map.set(word, count)
    }
    return map.size
}

function volume(operators, operands) {
    const eta1 = count(operators)
    const eta2 = count(operands)
    const eta = eta1 + eta2

    const N1 = operators.length
    const N2 = operands.length
    const N = N1 + N2

    const length = eta1 * Math.log2(eta1) + eta2 * Math.log2(eta2)
    const volume = N * Math.log2(eta)
    const dificulty = eta1 / 2 * N2 / eta2;
    const effort = dificulty * volume
    const time = effort / 18;
    console.log(`eta1=${eta1}, eta2=${eta2} , N1=${N1} , N2=${N2} `)
    console.log(`HL = ${length}, HV = ${volume}, Aufwand = ${effort}, Difficulty = ${dificulty}, Time to implement T = ${time}s`)
}

console.log("with blocks")
volume(operators_block, operands)
console.log("with variable declaration")
volume(operators_var, operands)
console.log("whitespace indenting")
volume(operators_indent, operands)