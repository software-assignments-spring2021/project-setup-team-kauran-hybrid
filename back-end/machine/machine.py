import numpy as np
import pandas as pd
import sklearn as sl
from faker.providers.person.en import Provider
import json

print('Machine.py triggered')

value = input()
# print("Input value:", value)

jsonval = json.loads(value) # array of dictionaries
# print("JSON Value:", jsonval[0])

courseNums = []
courseSizes = []
waitlistSizes = []
for i in jsonval:
    courseNums.append(i['courseNum'])
    courseSizes.append(i['courseSizes'])
    waitlistSizes.append(i['waitlistSizes'])


columns = ['Course Number', 'Course Size', 'Waitlist Size']
df = pd.DataFrame(columns = columns)
df['Course Number'] = courseNums
df['Course Size'] = courseSizes
df['Waitlist Size'] = waitlistSizes

# this works but it will print ... 
# for df['Course Size] and df['Waitlist Size'] since they are arrays
# print(df) 



# def prosterity(classSize,waitListPos):