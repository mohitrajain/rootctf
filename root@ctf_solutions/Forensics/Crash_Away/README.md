## Write-up

* Unzip the file ```flag.zip``` and extract it's contents .
* Inside of flag/, there is a `hidden` vim swap file, `.flag.txt.swp` and a `flag.txt` file .
* To recover flag.txt, use vim(as Indicated by `file` command utility):
```
$ vim -r flag.txt
```
Flag:- `rootctfvim_is_better_than_emacs`
# Note

* Alternatively, extract the lines in plaintext at the end of the swap file.
* The lines are separated by null chars and the line order is reversed.
That's It !! :)
