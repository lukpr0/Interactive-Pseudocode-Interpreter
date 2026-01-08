<div id="guide-container">
    <h2>Variables and Assignments</h2>
        Values can be assigned to variables like this.
        Variables don't need to be declared explicitly, just assign a value to an identifier, this will create the variable.
        Identifiers can use letters, digits and underscores. They can not start with a digit.
        <code>
            x := 123
        </code>

    <h2>Data types</h2>
        <p>There are integers and floats</p>
        <code>
            123 // Integer <br>
            3.14 // Float
        </code>
        <p>Strings can be made with quotes</p>
        <code>
            "Hello world"
        </code>
        <p>Booleans using true and false</p>
        <code>
            true <br>
            false
        </code>
        <p>No value (aka. nil/null) with nil</p>
        <code>
            nil
        </code>
        <p>There are lists</p>
        <code>
            list := [1, 2, 3] <br>
            list := [1, 0.5, "abc"] //Datatypes can be mixed <br>
        </code>
        <p>Their elements can be accessed like this</p>
        <code>
            x := list[2] <br>
            list[1] := 3
        </code>
        <p>There are also objects</p>
        <code>
            point := &#123; <br>
            x: 5, <br>
            y: 2 <br>
            &#125;
        </code>
        <p>Their members can be accessed like this</p>
        <code>
            point.x := 4 <br>
            y := point.y
        </code>
    <h2>Control structures</h2>
        <p>If statements can be made like this</p>
        <code>
            if condition then<br>
            &nbsp;&nbsp;&nbsp;&nbsp;...<br>
            end
        </code>
        <p>An alternative path can be given with an else</p>
        <code>
            if condition then<br>
            &nbsp;&nbsp;&nbsp;&nbsp;...<br>
            else<br>
            &nbsp;&nbsp;&nbsp;&nbsp;...<br>
            end
        </code>
        <p>An else can also be followed by another if</p>
        <code>
            if condition then<br>
            &nbsp;&nbsp;&nbsp;&nbsp;...<br>
            else if otherCondition then<br>
            &nbsp;&nbsp;&nbsp;&nbsp;...<br>
            else<br>
            &nbsp;&nbsp;&nbsp;&nbsp;...<br>
            end
        </code>
        <p>There are while loops.</p>
        <code>
            while condition do<br>
            &nbsp;&nbsp;&nbsp;&nbsp;...<br>
            end
        </code>
        <p>There are repeat until loops, they stop, when condition turns true</p>
        <code>
            repeat<br>
            &nbsp;&nbsp;&nbsp;&nbsp;...<br>
            until condition
        </code>
        <p>
            And then there are for-loops<br>
            They need a name for the loop-variable and a range.<br>
            The upper limit can be either exclusive like so:
        </p>
        <code>
            for i in 0 .. 10 do<br>
            &nbsp;&nbsp;&nbsp;&nbsp;...<br>
            end
        </code>
            <p>
                or inclusive like so:
            </p>
        <code>
            for i in 0 ..= 10 do<br>
            &nbsp;&nbsp;&nbsp;&nbsp;...<br>
            end
        </code>
        <p>
            There are break and continue statements<br>
            With break the loop is ended.
            With continue the program will skip the rest of the current loop iteration
        </p>
        <code>
            while true do<br>
            &nbsp;&nbsp;&nbsp;&nbsp;break<br>
            end<br>
            <br>
            while true do<br>
            &nbsp;&nbsp;&nbsp;&nbsp;continue<br>
            end
        </code>

        <h2>Functions</h2>
        <p>
            Functions can be made like this:
        </p>
        <code>
            function myFunction(a, b)<br>
                &nbsp;&nbsp;&nbsp;&nbsp;...<br>
            end<br>
        </code>
        <p>
            Functions can return values using the return statement
        </p>
        <code>
            function myFunction(a, b)<br>
                &nbsp;&nbsp;&nbsp;&nbsp;return a + b<br>
            end<br>
        </code>
        <p>
            return can also be used without a value
        </p>
        <code>
            function myFunction(a, b)<br>
                &nbsp;&nbsp;&nbsp;&nbsp;return<br>
            end

            x := myFunction(1, 2) // x = nil
        </code>
        <p>
            If no value is returned, a function will evaluate to nil
        </p>
        <h2>Built in functions</h2>
            <p>There a some built in functions</p>
            <h3>Math</h3>
                <p>floor</p>
                <code>
                    floor(x)
                </code>
                <p>computes the biggest integer number smaller than the input number</p>
                <p>ceil</p>
                <code>
                    ceil(x)
                </code>
                <p>computes the smallest integer number bigger than the input number</p>
                <p>max</p>
                <code>
                    max(x, y)
                </code>
                <p>returns the bigger of the two numbers x and x</p>
                <p>min</p>
                <code>
                    min(x, y)
                </code>
                <p>returns the smaller of the two numbers x and x</p>
                <h4>sqrt</h4>
                <code>
                    sqrt(x)
                </code>
                <p>computes the square-root of x</p>
                <h4>pow</h4>
                <code>
                    pow(b, e)
                </code>
                <p>computes b exponentiated with e (b<sup>e</sup>)</p>
            <h3>Array</h3>
                <h4>Array-constructor</h4>
                <code>
                    Array(n, e)
                </code>
                <p>
                    Creates an array of length n populated with e.<br>
                    Note: Arrays and Objects are reference-types and thus will be all the same.
                </p>
                <h4>len</h4>
                <code>
                    len(a)
                </code>
                <p>Returns the length of an array or string.</p>
                <h4>push</h4>
                <code>
                    push(a, e)
                </code>
                <p>Adds an element e to the end of the array a</p>
                <h4>pop</h4>
                <code>
                    pop(a)
                </code>
                <p>Removes the last element of array a and returns it.</p>
                <h4>dequeue</h4>
                <code>
                    dequeue(a)
                </code>
                <p>Removes the first element of array a and returns it.</p>
            <h3>String</h3>
                <h4>codepoint</h4>
                <code>
                    codepoint(s)
                </code>
                <p>Returns the Unicode-Codepoint of the first character of the given string s</p>
                <h4>char</h4>
                <code>
                    char(c)
                </code>
                <p>Returns the character encoded by a given Unicode-Codepoint c</p>
            <h3>Print</h3>
                <code>
                    print(x)
                </code>
                <p>
                    Outputs the given argument x
                </p>
</div>

<style>
    #guide-container {
        margin: 2vh;
    }

    code {
        border: 1px solid var(--border);
        margin-top: 1vh;
        margin-bottom: 1vh;
        padding: 1vh;
        display: block;
    }
</style>