## Write-up
* Looking up the ```data.pcap``` file in Wireshark lands us with packet #122

```
HTML Form URL Encoded: application/x-www-form-urlencoded
    Form item: "userid" = "randled"
        Key: userid
        Value: randled
    Form item: "pswrd" = "OFBGRW8wdHRIUQ=="
        Key: pswrd
        Value: OFBGRW8wdHRIUQ==
```
* Trying `OFBGRW8wdHRIUQ==` as the flag results in invalid... but wait, that looks like base64!
```
$ echo "OFBGRW8wdHRIUQ==" | base64 -d
8PFEo0ttHQ
```
Therefore, the flag is `8PFEo0ttHQ`.

# Note
* One can also do a ```strings``` check on the file `data.pcap` before firing up wireshark !! 
```
$ strings data.pcap | grep pswrd
```
* This will result in 
```
userid=randled&pswrd=OFBGRW8wdHRIUQ%3D%3D8
  			<option value="pst">PST</option>
  			<option value="pst">PST</option>
```
* You can easily view the value of `pswrd` :) 
```
$ echo "OFBGRW8wdHRIUQ%3D%3D8" | base64 -d
8PFEo0ttHQ
```
That's It !!
