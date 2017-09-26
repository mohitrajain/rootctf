# this script is used to access user accounts by opening their page in headless web browser i.e. phantomjs
# users file comntains list of accounts that are present in database which is updated by another script 
# here headless browser is used to run xss uploaded by the users in order top gain admin credentials .
#!/usr/bin/python3.4
import unittest
from selenium import webdriver
import os,sys
import time,getpass
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.action_chains import ActionChains

path_phantom = os.path.abspath(os.curdir) + '/phantomjs-2.1.1-linux-x86_64/bin/phantomjs'                                                                          # contains the video no. to start downloading from

with open('users','r') as f:
    arr = f.read().split(',')

print(arr)

class mytest(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.driver = webdriver.PhantomJS(executable_path=path_phantom)
        cls.driver.implicitly_wait(10)
        cls.driver.get("http://127.0.0.1:8080/login")

    def test_logging_in(self):
        self.driver.find_element_by_name('username').send_keys('admin')
        self.driver.find_element_by_name('password').send_keys('thisisadmin')
        self.driver.find_element_by_name('submit').click()
        WebDriverWait(self.driver,10).until(expected_conditions.title_contains('Home'))

    def test_my_download(self):
        for i in arr:
            self.driver.get('http://127.0.0.1:8080/user/' + i)
            WebDriverWait(self.driver, 10).until(expected_conditions.title_contains('Profile'))
            print(self.driver.title)

    @classmethod
    def tearDownClass(cls):
        print('task completed')
        cls.driver.delete_all_cookies()
        cls.driver.quit()

if __name__ == '__main__':
    unittest.main(verbosity=1)
