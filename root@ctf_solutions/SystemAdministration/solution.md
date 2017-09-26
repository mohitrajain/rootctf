# this problem was related to system administration

## Steps to proceed :
### 1. Scan the machine given the question using nmap or some script.
### 2. You will find that port no. 2000 is open .
### 3. But information about that port shown by namp is wrong . So now you have to use telnet or nc/netcat to find what kind of service is running on that port .
### 4. You will get to know that this is some ftp service and asks for username and password to gain access to ftp server.
### 5. You can chose to brute force login into ftp server using hydra or script .
### 6. You may get login . Or you can just google how to access ftp server without having username and password .
### 7. You will get to know that if anonymous login is enabled on the ftp server then we cna login using anonymous as username and any email id as password .
### 8. Now you have credentials to access ftp server . Now use web browser or terminal to get into ftp server .
### 9. But no file will be shown there on web browser . and output of ls on ftp terminal is also empty .
### 10. In terminal you can try for ls -a and you can see a hidden file .
### 11. Now pull that file and read the file . 
