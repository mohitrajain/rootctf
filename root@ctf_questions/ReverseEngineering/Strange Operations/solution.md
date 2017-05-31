
# Solution to "Strange Operations"

_Strange Operations_, a reverse engineering question on python programming.

## Question
Python has its strange sides.
This code gives `QRYLFHROOFFICBLE888` for `NOVICEOL`.
A Fellow Pythonista gave me `LDPGIODJOFFICBLE888`

Here is the code in `tf.py`


```python
import string

tf1 = lambda x: x and True
tf2 = lambda x: x or True
tf3 = lambda x: True or x
tf4 = lambda x: True and x

tf5 = lambda x: x and False
tf6 = lambda x: x or False
tf7 = lambda x: False or x
tf8 = lambda x: False and x

template = string.ascii_uppercase

def play1(x):

    if tf1(x): return string.maketrans(template, template[x:]+template[:x])
    else: return "HOLAHOLA"

def play2(x):

    if tf5(x): return string.maketrans(template[:12]+template[12:], template)
    else: return "OFFICBLE"

def play3(x): 

    return tf6(x) + tf4(x)

if __name__ == "__main__":

    x1, x2, x3 = 3, 1, 4 
    in_data = "NOVICEOL"
print string.translate(in_data, play1(x1)) + play2(x2) + str(play3(x3))*3
```

    QRYLFHROOFFICBLE888


The question has to do with how python evaluates boolean operations `and` and `or`.

In the above code, the lambdas `tf1, tf2, tf3, tf4, tf5, tf6, tf7, tf8` accept single argument of any datatype, returns a bool.

Note `tf2` and `tf3`, don't they seem to be similar?
**Boolean operations are complementary** from Boolean Algebra. 

But Python treats them differently. Look at the following example


```python
tf2(2)
```




    2




```python
tf3(2)
```




    True



The result is dependent to the order of operands used.


```python
2 == True
```




    False




```python
2 is True
```




    False



And `2` is not `True`. **Python treats boolean expression to be non complementary**

## How to Solve the Question

*Brute force ftw*, though essence of ReverseEngineering is analysing the code, understanding the functions `play1, play2, play3` they are simple `if else` statement that returns `string.maketrans` object. 

In the code, it seems clear that

+ `tf5` always returns False
+ `tf1` always returns True
+ Due to 1st, `play2` will always return "OFFICBLE" string and due to 2nd, `play1` returns a `string.maketrans` object.
+ `tf4` and `tf6` returns the input argument given, in this case a number

With these inferences, looking at line 35:
`print string.translate(in_data, play1(x1)) + play2(x2) + str(play3(x3))*3`

Its a concatenation of the translation, string "OFFICBLE" and `x3+x3` converted to string repeated 3 times.

To make things easy, its the `play1`function that has direct relation to the `in_data`. From 3rd point, the `string.maketrans` object's shows a positive shift of by x times i.e `template[x:]+template[:x]`


```python
x = 3
print template, "-->", template[x:]+template[:x]
```

    ABCDEFGHIJKLMNOPQRSTUVWXYZ --> DEFGHIJKLMNOPQRSTUVWXYZABC


Interchange the argument of `string.maketrans` in `play1` func and input the first 8 characters of the given result i.e `LDPGIODJOFFICBLE888` which is `LDPGIODJ`.


```python
out = "LDPGIODJ"
rev_trans = string.maketrans(template[x:]+template[:x], template)
print string.translate(out, rev_trans)
```

    IAMDFLAG


Hence, the result is "IAMDFLAG". In the ctf webpage input the answer as `rootctf{IAMDFLAG}`
