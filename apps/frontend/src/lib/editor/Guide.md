<div id="guide-container">

# General
Statements are separated by newlines.

## Variables and Assignments
Values can be assigned to variables like this.
Variables don't need to be declared explicitly. Just assign a value to an identifier, this will create the variable.
Identifiers can use letters, digits and underscores. They cannot start with a digit.

```
x := 123
```


# Data types
## Numbers
There are integers and floats
```
123 // Integer 
3.14 // Float
```
Addition, subtraction, multiplication and division are available with the operators +, -, * and /
```
x := 2 * (9-7)
y := 1 + (4+6)/5
```

Addition, subtraction and multiplication of integers result in integers.
Mixing floats and integers or dividing integers results in a float.
Integer division and modulo are possible with _div_ and _mod_

```
x := 7 div 4
y := 9 mod 5
```

Numbers can be compared using =, !=, &lt;, &gt;, &lt;=, &gt;=.

```
x := 1 &lt; 2
x := 5 != 7
```
## Strings
Strings can be made with quotes
```
"Hello world"
```

Strings can be concatenated with +.

```
"Hello" + "world"
```

Strings can also be concatenated with other data types.

```
"Hello" + "world" + 123 + [4, 5, 6]
```

Equality and inequality of strings can be compared with = and !=.

```
"Hello" != "world"
```
## Booleans
Booleans using true and false
```
true 
false
```
Boolean values can be connected with _and_ and _not_.
```
a and b
x or y
```
A boolean value can be negated with _not_.
```
not a
```
## Nil
No value (aka. nil/null) with _nil_
```
nil
```
## Lists
There are lists
```
list := [1, 2, 3] 
list := [1, 0.5, "abc"] //Datatypes can be mixed 
```
Their elements can be accessed like this
```
x := list[2] 
list[1] := 3
```
## Objects
There are also objects
```
point := { 
    x: 5, 
    y: 2 
}
```
Their members can be accessed like this
```
point.x := 4 
y := point.y
```
## Sets
Sets can be created like this
```
X := { 1, 2, 3 }
```
Sets can hold any datatype. Even arrays, objects and sets. These shouldn't be mutated after being inserted into a set.
The usual set operators &#x2229;, &#x222A; and &#x2216; can be used.
The union (&#x222A;) of two sets can be computed using the keyword _union_.
```
X := { 1, 2, 3 } union { 3, 4 }
// X = { 1, 2, 3, 4 }
```
The intersection (&#x2229;) of two sets can be computed using the keyword _intersect_.
```
X := { 1, 2, 3 } intersect { 3, 4 }
// X = { 3 };
```
The difference (&#x2216;) of two sets can be computed using the \ Symbol.
```
X := { 1, 2, 3 } \ { 3, 4 }
// X = { 1, 2 };
```
Sets can be queried for their elements using the keyword _in_
```
x := 2 in { 1, 2, 3 } //x = true
```
# Control structures
## If
If statements can be made like this
```
if condition then
    ...
end
```
An alternative path can be given with an else
```
if condition then
    ...
else
    ...
end
```
An else can also be followed by another if
```
if condition then
    ...
else if otherCondition then
    ...
else
    ...
end
```
## While
There are while loops.
```
while condition do
    ...
end
```
There are repeat-until loops. They stop, when the condition turns true.
## Repeat-Until
```
repeat
    ...
until condition
```
## For

And then there are for-loops
They need a name for the loop-variable and a range or an expression that evaluates to a array or set.
The upper limit can be either exclusive, like so:

```
for i in 0 .. 10 do
    ...
end
```

or inclusive, like so:

```
for i in 0 ..= 10 do
    ...
end
```
Arrays and sets can be iterated over like this
```
for i in [1, 2, 3] do
    ...
end
```
or
```
for i in { 1, 2, 3 } do
    ...
end
```
## Jump-Statements

There are break and continue statements
With break the loop is ended.
With continue the program will skip the rest of the current loop iteration

```
while true do
    break
end

while true do
    continue
end
```

# Functions

Functions can be made like this:

```
function myFunction(a, b)
    ...
end
```

Functions can return values using the return statement

```
function myFunction(a, b)
    return a + b
end
```

return can also be used without a value

```
function myFunction(a, b)
    return
end

x := myFunction(1, 2) // x = nil
```

If no value is returned, a function will evaluate to nil

# Built-in functions
There are some built in functions.
## Math
floor
```
floor(x)
```
computes the biggest integer number smaller than the input number
ceil
```
ceil(x)
```
computes the smallest integer number bigger than the input number
max
```
max(x, y)
```
returns the bigger of the two numbers x and y
min
```
min(x, y)
```
returns the smaller of the two numbers x and y
### sqrt
```
sqrt(x)
```
computes the square root of x
### pow
```
pow(b, e)
```
computes b exponentiated with e (b<sup>e</sup>)
## Array
### Array-constructor
```
Array(n, e)
```

Creates an array of length n populated with e.
Note: Arrays and objects are reference-types and thus will all be the same reference.

### len
```
len(a)
```
Returns the length of an array or string.
### push
```
push(a, e)
```
Adds an element e to the end of the array a
### pop
```
pop(a)
```
Removes the last element of array a and returns it.
### dequeue
```
dequeue(a)
```
Removes the first element of array a and returns it.
## String
### codepoint
```
codepoint(s)
```
Returns the Unicode-codepoint of the first character of the given string s
### char
```
char(c)
```
Returns the character encoded by a given Unicode-codepoint c
## Print
```
print(x)
```
Outputs the given argument x
</div>

<style>
    #guide-container {
        margin: 2vh;
    }
    
    pre.language-undefined {
        border: 1px solid var(--border);
        margin-top: 1vh;
        margin-bottom: 1vh;
        padding: 1vh;
        display: block;
    }
</style>