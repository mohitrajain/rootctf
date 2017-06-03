# Write-up
* First, we need to convert `significant_image.bmp` to a ASCII binary form, then we need to extract the least significant bit. 
* Secondly make it keep removing front bits till we get "flag"!

```
for iter in range(16):
    with open("significant_image.bmp", "rb") as file:
        data = file.read()
        data = data[iter:]

        bits = ""
        for c in data:
            lsb = str(ord(c) & 0x1)
            bits += lsb

        bytess = [chr(int(bits[i:i+8], 2)) for i in range(0, len(bits), 8)]
        lsbstr = "".join(bytess)
        print(lsbstr)
        if "flag" in lsbstr:
            print "\n\n\n\n\n\n----------"
            offset = lsbstr.find("flag")
            print lsbstr[offset:offset+50]
            break

```
* Putting this into lsb.py and running it, we get,

```
$ python2 lsb.py
# Lots of random crap
ÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿó°¤Ç­?ÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿ
----------
flag{remember_kids_protect_your_headers_f5e8}�����
# Even more random crap
```
* Well, that worked! Therefore, the flag is `flag{remember_kids_protect_your_headers_f5e8}`.

# NOTE

* One can also use a specific stegonography tool for it namely ```Stegsolve```. 




