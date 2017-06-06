## Write-up

* In this problem we are asked to restore the `corrupted file`. First, we can analyze the `file signatures`. 
* we can use `xxd` command to view the file `hexdump`.
* One can also use the tool `hexedit` here ! 
* Before going into that the best practice is to use two great commandline utilities, `file` and `strings` . 
* `file` tells you that it's a data file but performing `cat` over it gives you unprintable characters . So let's move on to
`string` command.
```
$ strings duckhead
tar g z ...........   ........flag..
```
* So it clearly gives you an insuation that it is a `tar archive` . But again decompressing with tar throws an error . Hence it  
indicates that there is a problem with the file headers !!
Now check the hexdump of file :)
```
$ xxd duckhead
00000000: 5858 5800 22d1 ed58 0003 edd5 bd0e c220  XXX."..X....... 
00000010: 1486 6166 afa2 9b9b 3914 dade 85b7 40b0  ..af....9.....@.
00000020: 7f36 9a92 508c 1ae3 bd4b 3ba8 71d0 a954  .6..P....K;.q..T
00000030: ebf7 2c27 8485 90bc 50ed 75cd 57ee e4d8  ..,'....P.u.W...
00000040: 78c8 4ba5 1ca6 f73a 8978 c6b8 a04c 8884  x.K....:.x...L..
00000050: 24c5 8cb8 5fc5 2ca2 11cf 7477 e89c b651  $..._.,...tw...Q
00000060: c4ac 316f efe0 d3fe 8f5a 3779 a99c 3dab  ..1o.....Z7y..=.
00000070: 5d53 1466 31f5 7120 b0ca f71f 4fdd bfa4  ]S.f1.q ....O...
00000080: 47ff fe2d 18fa 4fd0 7f08 b9ab 2e1d a9a3  G..-..O.........
00000090: 50ba 6997 4ed5 c6a9 9668 d3a9 6d69 cb2b  P.i.N....h..mi.+
000000a0: 1e84 99eb fb17 53f7 fffc ff0b 42ff 01e1  ......S.....B...
000000b0: ffff 6f7d fff2 abfa 4f87 feb9 44ff 21a0  ..o}....O...D.!.
000000c0: 3146 0003 3842 0403 3038 0000 8079 b901  1F..8B..08...y..
000000d0: dcbd 795f 0028 0000 7461 7220 6720 7a20  ..y_.(..tar g z 
000000e0: 2e2e 2e2e 2e2e 2e2e 2e2e 2e20 2020 2e2e  ...........   ..
000000f0: 2e2e 2e2e 2e2e 666c 6167 2e2e            ......flag..
```
* It clearly shows headers are missing . Our task is to restore the hex value of the file signatures to the original. And we know 
from `strings` that it's an tgz compressed file. 
* A keen eye can also find the original headers hidden in the hexdump of the file i.e ```1F 8B 08```. :)
Or you can [Visit Here](http://www.garykessler.net/library/file_sigs.html) and can check headers for TGZ files and replace it with
corrupted(XXX) headers.
* Hexdump of Uncorrupt file will look like :-

![Imgur](http://i.imgur.com/ADVnFCx.png)
* Now just save it and decompress it with tar . You will get some .txt files, flag is hidden in one of those text files . 
That's It XD. Flag:- ctf{s0_w3_ain't_got_n00bs_here}
