import numpy as np
import pandas as pd
import sklearn as sl
from sklearn.linear_model import LinearRegression, LogisticRegression
from sklearn.model_selection import KFold, train_test_split
from sklearn import preprocessing
import matplotlib.pyplot as plt
import json
import re

print('Machine.py triggered')

value = input()
# print("Input value:", value)

jsonval = json.loads(value) # array of dictionaries
# print("JSON Value:", jsonval[0])

def makeDF():
    courseNums = []
    courseSizes = []
    waitlistSizes = []
    waitlistPos = []
    target = []
    '''
    for i in jsonval:
        courseNums.append(i['courseNum'])
        courseSizes.append(i['courseSizes'])
        waitlistSizes.append(i['waitlistSizes'])
    '''
    for i in jsonval:
        # print(i)
        courseNum=re.findall("[0-9]+",i['courseNum'])[0]
        # print(courseNum)
        for j in range(np.min([len(i['sizeCaps']),len(i['waitlistSizes']),len(i['droppedSizes'])])):
            if (i['sizeCaps'][j]!=None and i['waitlistSizes'][j]!=None and i['droppedSizes'][j]!=None ):
                for z in range(int(i['waitlistSizes'][j])):
                    courseNums.append(courseNum)
                    courseSizes.append(i['sizeCaps'][j])
                    waitlistSizes.append(i['waitlistSizes'][j])
                    waitlistPos.append(z)
                    if (z<int(i['droppedSizes'][j])):
                        target.append(1)
                    else:
                        target.append(0)

            # courseNums.append(courseNum)
            # courseSizes.append(i['courseSizes'][j])
            # waitlistSizes.append(i['waitlistSizes'][j])
            # droppedSizes.append(i['droppedSizes'][j])

    columns = ['CourseNumber', 'CourseSize', 'WaitlistSize', 'WaitlistPos','Target']
    df = pd.DataFrame(columns = columns)
    df['CourseNumber'] = courseNums
    df['CourseSize'] = courseSizes
    df['WaitlistSize'] = waitlistSizes
    df['WaitlistPos'] = waitlistPos
    df['Target'] = target

    # df.set_index('CourseNumber',inplace=True,drop=True)
    # df[['CourseSize', 'WaitlistSize', 'WaitlistPos','Target']]=df[['CourseSize', 'WaitlistSize', 'WaitlistPos','Target']].astype(int)
    df = df.astype(int)
    print("Exists null data? :",df.isnull().values.any())
    return df
    
df=makeDF()
print(df.iloc[40:80])

def linReg(df):
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

# linReg(df)
# def prosterity(classSize,waitListPos):

def logReg(df):
    X=pd.DataFrame(df[['CourseNumber', 'CourseSize', 'WaitlistSize', 'WaitlistPos']].values)
    y=pd.DataFrame(df['Target'].values)
    model=LogisticRegression()
    X_train, X_test, y_train, y_test = train_test_split( X, y, test_size=0.3, random_state=42)
    print(X_train.shape)
    print(X_test.shape)
    model.fit(X_train, y_train)
    score = model.score(X_test, y_test)
    print("Score: ", score)
    print("class labels:", model.classes_)
    
    fakeX = np.zeros((1,4))
    fakeX[0,:] = [120, 100, 20, 5]
    print("fake prob: ", model.predict_proba(fakeX)[:,1])

logReg(df)

# def test_fake_data(num=121,couseSize=100,wlSize=10,pos=5,model):
#     X = np.zeros((1,4))
#     X[0,:] = [num, courseSize, wlSize, pos]
#     return model.predict_proba(X)

# print(test_fake_data(model=m))