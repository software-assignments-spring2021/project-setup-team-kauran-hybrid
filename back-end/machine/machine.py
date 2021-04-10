import numpy as np
import pandas as pd
import sklearn as sl
from faker.providers.person.en import Provider
import json

print('Machine.py triggered')

value = input()
# print("Input value:", value)

jsonval = json.loads(value) # array of dictionaries
# print("JSON Value:", jsonval[0]['courseNum'])

courseNums = []
for i in jsonval:
    courseNums.append(i['courseNum'])
    
print(courseNums)

columns = ['Course Number', 'Class Size', 'Waitlist Size']
df = pd.DataFrame(columns = columns)
df['Course Number'] = courseNums

print(df)

# df = pd.read_json(value, 'columns')

# def prosterity(classSize,waitListPos):