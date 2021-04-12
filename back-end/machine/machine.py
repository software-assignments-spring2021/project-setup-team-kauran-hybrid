import numpy as np
import pandas as pd
import sklearn as sl
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import KFold
from sklearn import preprocessing
import matplotlib.pyplot as plt
import json

print('Machine.py triggered')

value = input()
# print("Input value:", value)

jsonval = json.loads(value) # array of dictionaries
# print("JSON Value:", jsonval[0])

def makeDF():
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

    columns = ['CourseNumber', 'CourseSize', 'WaitlistSize']
    df = pd.DataFrame(columns = columns)
    df['CourseNumber'] = courseNums
    df['CourseSize'] = courseSizes
    df['WaitlistSize'] = waitlistSizes

    df.set_index('CourseNumber',inplace=True,drop=True)
    df=df.astype(int)
    print("Exists null data? :",df.isnull().values.any())
    return df
    
df=makeDF()

def linReg(DataFrame:df):
    x=pd.DataFrame(df['CourseSize'])
    y=pd.DataFrame(df['WaitlistSize'])
    model=LinearRegression()
    scores=[]
    kfold=KFold(n_splits=3,shuffle=True,random_state=42)
    for i, (train, test) in enumerate(kfold.split(x,y)):
        model.fit(x.iloc[train,:], y.iloc[train,:])
        score=model.score(x.iloc[test,:],y.iloc[test,:])
        scores.append(score)
    print("Scores: ", scores)

linReg(df)
# def prosterity(classSize,waitListPos):