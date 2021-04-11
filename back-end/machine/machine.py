import numpy as np
import pandas as pd
import sklearn as sl
import matplotlib.pyplot as plt
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
'''
for i in jsonval:
    courseNums.append(i['courseNum'])
    courseSizes.append(i['courseSizes'])
    waitlistSizes.append(i['waitlistSizes'])
'''
for i in jsonval:
    courseNum=i['courseNum']
    for j in range(len(i['courseSizes'])):
        courseNums.append(courseNum)
        courseSizes.append(i['courseSizes'][j])
        waitlistSizes.append(i['waitlistSizes'][j])



columns = ['Course Number', 'Course Size', 'Waitlist Size']
df = pd.DataFrame(columns = columns)
df['Course Number'] = courseNums
df['Course Size'] = courseSizes
df['Waitlist Size'] = waitlistSizes




df.set_index('Course Number',inplace=True,drop=True)

#df.plot()

print(df)



# def prosterity(classSize,waitListPos):