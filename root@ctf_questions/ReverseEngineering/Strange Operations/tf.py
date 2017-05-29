#!/usr/bin/env python2

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
    in_data = "IAMDFLAG"
    print string.translate(in_data, play1(x1)) + play2(x2) + str(play3(x3))*3
